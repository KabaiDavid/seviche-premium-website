import { useEffect, useRef, useState } from 'react';
import { BUSINESS, LINKS } from '../data/site';
import { Arrow } from './Icons';

/** Official OpenTable widget for Seviche (rid 26617), loaded on demand so the
 * page stays fast. A direct OpenTable link is always available as a fallback. */
export function OpenTable() {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'failed'>('idle');

  const load = () => {
    if (state !== 'idle' || !host.current) return;
    setState('loading');
    const s = document.createElement('script');
    s.src = `https://www.opentable.com/widget/reservation/loader?rid=${LINKS.openTableRid}&type=standard&theme=tall&color=1&dark=false&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website`;
    s.async = true;
    s.onload = () => setTimeout(() => setState(host.current?.querySelector('iframe') ? 'ready' : 'failed'), 1500);
    s.onerror = () => setState('failed');
    host.current.appendChild(s);
  };

  // auto-load once the booking panel is near the viewport
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (io.disconnect(), load()), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ot">
      <div className="ot__head">
        <h2 className="h2">
          Book a <em>table</em>
        </h2>
        <p className="muted-light">Choose your party size, date and time — confirmation comes straight from OpenTable.</p>
      </div>
      <div className={`ot__widget ot__widget--${state}`} ref={host}>
        {state !== 'ready' && (
          <div className="ot__placeholder" aria-live="polite">
            {state === 'failed' ? 'The booking widget could not load here.' : 'Loading availability…'}
          </div>
        )}
      </div>
      <div className="ot__alt">
        <a className="btn btn--wine" href={LINKS.opentable} target="_blank" rel="noopener">
          Open OpenTable <Arrow />
        </a>
        <a className="btn btn--ghost" href={BUSINESS.phoneHref}>
          Call {BUSINESS.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
