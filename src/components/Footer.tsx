import { BUSINESS, LINKS, NAV } from '../data/site';
import { Logo } from './Logo';
import { Facebook, Instagram, XIcon } from './Icons';

export function Footer() {
  return (
    <footer className="footer grain" id="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" aria-label="Seviche — home" style={{ display: 'inline-block' }}>
              <Logo />
            </a>
            <p className="footer__tag">Inspired by heritage. Influenced by locality.</p>
          </div>
          <div>
            <h2>Visit</h2>
            <address>
              <a href={LINKS.directions} target="_blank" rel="noopener">
                {BUSINESS.street}
                <br />
                {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postal}
              </a>
            </address>
            <p style={{ marginTop: '1rem' }}>
              {BUSINESS.hoursDays}
              <br />
              {BUSINESS.hoursTime}
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <ul role="list">
              <li>
                <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
              <li>
                <a href="/reservations">Reservations</a>
              </li>
              <li>
                <a href={LINKS.giftCards} target="_blank" rel="noopener">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul role="list">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Seviche Restaurant · Louisville, Kentucky ·{' '}
            <a href="/terms-conditions">Terms &amp; Conditions</a>
          </p>
          <div className="footer__social">
            <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Seviche on Instagram">
              <Instagram />
            </a>
            <a href={LINKS.facebook} target="_blank" rel="noopener" aria-label="Seviche on Facebook">
              <Facebook />
            </a>
            <a href={LINKS.twitter} target="_blank" rel="noopener" aria-label="Seviche on X (Twitter)">
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
