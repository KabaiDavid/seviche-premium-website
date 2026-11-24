import { useEffect, useState } from 'react';
import { BUSINESS } from '../data/site';
import { Arrow, Close, Phone } from './Icons';

/** Mobile-only persistent reservation bar. Appears after the hero, hides near
 * the footer / reservation sections, and can be dismissed for the session. */
export function ReserveBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('reserve-bar') === 'off') setDismissed(true);
    } catch {
      /* storage unavailable */
    }
    const blockers = Array.from(document.querySelectorAll('[data-hide-reserve-bar]'));
    const inView = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
      update();
    });
    blockers.forEach((b) => io.observe(b));
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.7 && inView.size === 0);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, []);

  if (dismissed) return null;
  return (
    <div className={`reserve-bar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
      <a className="btn btn--primary" href="/reservations">
        Reserve your table <Arrow />
      </a>
      <a className="reserve-bar__call" href={BUSINESS.phoneHref} aria-label={`Call Seviche at ${BUSINESS.phoneDisplay}`}>
        <Phone />
      </a>
      <button
        className="reserve-bar__close"
        aria-label="Hide reservation bar"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem('reserve-bar', 'off');
          } catch {
            /* ignore */
          }
        }}
      >
        <Close />
      </button>
    </div>
  );
}
