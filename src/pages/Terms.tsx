import { PageHero } from '../components/PageHero';
import terms from '../data/terms.json';

/* ─── Terms ────────────────────────────────────────────────── */
export function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={['Terms &', <em key="c">conditions.</em>]} />
      <section className="section on-paper" aria-label="Terms and conditions">
        <div className="wrap legal">
          {(terms as [string, string][]).slice(1).map(([k, t], i) =>
            k === 'h' ? (
              <h2 key={i} className="h3">
                {t}
              </h2>
            ) : k === 'li' ? (
              <p key={i} className="legal__li">
                {t}
              </p>
            ) : (
              <p key={i}>{t}</p>
            ),
          )}
        </div>
      </section>
    </>
  );
}

