import { useEffect, useRef, useState } from 'react';
import { BUSINESS, LINKS, NAV } from '../data/site';
import { Logo } from './Logo';
import { Arrow } from './Icons';

export function Nav({ path, overlay }: { path: string; overlay: boolean }) {
  const [solid, setSolid] = useState(!overlay);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(!overlay || y > 40);
      // hide on fast downward scroll deep in the page, show on any upward scroll
      setHidden(y > 600 && y > last + 4);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const sheet = sheetRef.current!;
    const focusables = () => [toggleRef.current!, ...Array.from(sheet.querySelectorAll<HTMLElement>('a,button'))];
    sheet.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab') {
        const f = focusables();
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    const onResize = () => window.innerWidth > 1080 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const left = NAV.slice(0, 3);
  const right = NAV.slice(3);
  const cur = (href: string) => (path === href ? 'page' : undefined);

  return (
    <>
      <header
        className={`nav ${solid || open ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''}`}
        data-open={open}
      >
        <div className="wrap nav__inner">
          <nav aria-label="Primary">
            <ul className="nav__links" role="list">
              {left.map((l) => (
                <li key={l.href}>
                  <a className="nav__link" href={l.href} aria-current={cur(l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="nav__logo" href="/" aria-label="Seviche — home">
            <Logo />
          </a>
          <ul className="nav__links nav__links--right" role="list">
            {right.map((l) => (
              <li key={l.href}>
                <a className="nav__link" href={l.href} aria-current={cur(l.href)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a className="btn btn--primary nav__reserve" href="/reservations" aria-current={cur('/reservations')}>
                Reserve
              </a>
            </li>
          </ul>
          <div className="nav__right-mobile">
            <a className="btn btn--primary nav__reserve nav__reserve-mobile" href="/reservations">
              Reserve
            </a>
            <button
              ref={toggleRef}
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="menu-sheet"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span className="nav__burger" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        id="menu-sheet"
        ref={sheetRef}
        className="menu-sheet"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul className="menu-sheet__list" role="list">
            <li>
              <a href="/" aria-current={cur('/')}>
                Home <small>01</small>
              </a>
            </li>
            {NAV.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} aria-current={cur(l.href)}>
                  {l.label} <small>{String(i + 2).padStart(2, '0')}</small>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-sheet__foot">
          <a className="btn btn--primary" href="/reservations">
            Reserve your table <Arrow />
          </a>
          <div className="menu-sheet__meta">
            <div>
              <a href={LINKS.directions} target="_blank" rel="noopener">
                {BUSINESS.streetShort}
                <br />
                {BUSINESS.city}, {BUSINESS.regionCode}
              </a>
            </div>
            <div>
              {BUSINESS.hoursShort}
              <br />
              <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
