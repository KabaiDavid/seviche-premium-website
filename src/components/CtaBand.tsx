import { BUSINESS } from '../data/site';
import { Arrow } from './Icons';
import { Lines } from './Layout';

export function CtaBand({ title = ['Your table', 'is waiting.'] }: { title?: [string, string] }) {
  return (
    <section className="cta-band on-wine grain" aria-labelledby="cta-title" data-hide-reserve-bar="">
      <div className="wrap cta-band__inner">
        <Lines id="cta-title" className="h1" lines={[title[0], <em key="t">{title[1]}</em>]} />
        <div className="cta-band__side">
          <p className="muted">
            {BUSINESS.hoursDays}, {BUSINESS.hoursTime.toLowerCase()} · {BUSINESS.streetShort}
          </p>
          <div className="btn-row">
            <a className="btn btn--primary" href="/reservations">
              Reserve your table <Arrow />
            </a>
            <a className="btn btn--ghost" href={BUSINESS.phoneHref}>
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
