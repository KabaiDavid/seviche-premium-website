import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../data/site';
import { Img } from './Img';
import { Arrow } from './Icons';

// Scene timings mirror scripts/hero-video.py (shot length − 0.8s dissolve).
const SCENES = {
  desktop: [
    { t: 0, label: 'Preparation' },
    { t: 2.1, label: 'The line' },
    { t: 4.2, label: 'Plating' },
    { t: 6.3, label: 'The bar' },
    { t: 8.2, label: 'The table' },
  ],
  mobile: [
    { t: 0, label: 'Preparation' },
    { t: 2.2, label: 'The line' },
    { t: 4.4, label: 'Plating' },
    { t: 6.6, label: 'The table' },
  ],
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [variant, setVariant] = useState<'desktop' | 'mobile' | null>(null);
  const [scene, setScene] = useState(0);

  // Video never blocks first paint: we only attach a source after the page is
  // idle, and skip it for reduced-motion / data-saver visitors.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (reduce || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || '')) return;
    const start = () => setVariant(window.matchMedia('(max-aspect-ratio: 4/5)').matches ? 'mobile' : 'desktop');
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
    const go = () => (w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 900));
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !variant) return;
    v.load();
    v.play().catch(() => {});
    // pause when off-screen to save battery
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!paused) v.play().catch(() => {});
    });
    io.observe(v);
    return () => io.disconnect();
  }, [variant, paused]);

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !variant) return;
    const list = SCENES[variant];
    let i = 0;
    for (let k = 0; k < list.length; k++) if (v.currentTime >= list[k].t) i = k;
    if (i !== scene) setScene(i);
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  const scenes = SCENES[variant || 'desktop'];

  return (
    <section className="hero" aria-labelledby="hero-title" data-hide-reserve-bar="">
      <div className="hero__media" aria-hidden="true">
        <Img
          name="prep-detail"
          alt=""
          priority
          fill
          sizes="100vw"
          className="hero__poster"
          position="42% 50%"
        />
        {variant && (
          <video
            ref={videoRef}
            className={`hero__video ${playing ? 'is-playing' : ''}`}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            onPlaying={() => setPlaying(true)}
            onTimeUpdate={onTime}
          >
            <source src={`/video/hero-${variant}.mp4`} type="video/mp4" />
          </video>
        )}
        <div className="hero__shade" />
      </div>

      <div className="wrap hero__content">
        <p className="hero__kicker" data-reveal="fade">
          <span>Est. {BUSINESS.founded}</span>
          <span aria-hidden="true">·</span>
          <span>Bardstown Road, Louisville</span>
        </p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">
            <span>Latin soul.</span>
          </span>
          <span className="hero__line">
            <span>
              <em>Southern</em> roots.
            </span>
          </span>
        </h1>
        <div className="hero__foot">
          <p className="hero__lede">
            Chef Anthony Lamas’ celebrated Louisville kitchen, where Latin tradition meets classic Southern ingredients.
          </p>
          <div className="btn-row hero__ctas">
            <a className="btn btn--primary" href="/reservations">
              Reserve your table <Arrow />
            </a>
            <a className="btn btn--ghost" href="#experience">
              Experience Seviche
            </a>
          </div>
        </div>
      </div>

      <div className="hero__aside wrap" aria-hidden={!playing}>
        <div className="hero__scenes">
          {playing && (
            <>
              <span className="hero__scene-num">{String(scene + 1).padStart(2, '0')}</span>
              <span className="hero__scene-bar">
                <span style={{ transform: `scaleX(${(scene + 1) / scenes.length})` }} />
              </span>
              <span className="hero__scene-label" key={scene}>
                {scenes[scene].label}
              </span>
            </>
          )}
        </div>
        {playing && (
          <button className="hero__pause" onClick={togglePause} aria-label={paused ? 'Play background film' : 'Pause background film'}>
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>
    </section>
  );
}
