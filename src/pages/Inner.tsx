import { CtaBand } from '../components/CtaBand';
import { Arrow } from '../components/Icons';
import { Img } from '../components/Img';
import { Lines } from '../components/Layout';
import { MapEmbed } from '../components/MapEmbed';
import { MenuBrowser } from '../components/MenuBrowser';
import { OpenTable } from '../components/OpenTable';
import { PageHero } from '../components/PageHero';
import { BUSINESS, LINKS, MOVIE_NIGHTS, PRIVATE_DINING_FEATURES, QUOTE } from '../data/site';

/* ─── Menu ─────────────────────────────────────────────────── */
export function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our menu"
        title={['The menu', <em key="m">at Seviche.</em>]}
        intro={<p>Menu is subject to change. Ask your server or bartender about our current selections.</p>}
      >
        <div className="btn-row">
          <a className="btn btn--primary" href="/reservations">
            Reserve a table <Arrow />
          </a>
        </div>
      </PageHero>
      <section className="on-paper menu-page" aria-label="Menu">
        <MenuBrowser />
      </section>
      <CtaBand title={['Hungry yet?', 'Your table is waiting.']} />
    </>
  );
}

/* ─── Chef ─────────────────────────────────────────────────── */
export function ChefPage() {
  return (
    <>
      <PageHero
        eyebrow="Chef Anthony Lamas"
        title={['It’s just', <em key="l">life to me.</em>]}
        intro={
          <p>
            From growing up on a farm to cooking in kitchens across the country, Chef Anthony Lamas brings an uncommon
            voice to Louisville’s culinary landscape.
          </p>
        }
        image="chef-van"
        imageAlt="Chef Anthony Lamas at the wheel of a vintage van, smiling through the open window"
        position="55% 50%"
      />

      <section className="section on-paper chapters" aria-label="An inside look">
        <div className="wrap">
          <p className="eyebrow">An inside look</p>
          <article className="chapter">
            <div className="chapter__num">i.</div>
            <div className="chapter__body">
              <h2 className="h2" data-reveal="">
                Finding his <em>heritage</em>
              </h2>
              <div className="body-copy muted-light" data-reveal="">
                <p>
                  Looking back at Chef Anthony Lamas’ childhood, the man was destined to be an artist using food as his
                  medium. As a child in southern California, his mother’s heirloom recipes sparked his interest in the
                  cuisine of his Mexican and Puerto Rican heritage. His passion for food developed further as a teenager
                  working in his family’s Spanish restaurant.
                </p>
                <p>
                  By helping to prepare meals on the family farm and participating in Future Farmers of America, Lamas
                  was practicing the “farm to table” philosophy long before it was a national movement. To him, it was
                  just a way of life.
                </p>
              </div>
            </div>
            <div className="chapter__media">
              <Img name="chef-archive" alt="Archival family photograph from Chef Lamas’ childhood" sizes="(max-width: 900px) 70vw, 30vw" reveal="mask" />
            </div>
          </article>

          <article className="chapter chapter--flip">
            <div className="chapter__num">ii.</div>
            <div className="chapter__body">
              <h2 className="h2" data-reveal="">
                Finding his <em>point of view</em>
              </h2>
              <div className="body-copy muted-light" data-reveal="">
                <p>
                  Unsure of where to take his agricultural and culinary background after high school, Lamas applied for
                  several jobs as a cook. What he found ended up being a pivotal point in his career. Lamas trained with
                  the San Diego Culinary Apprenticeship Program and worked with Jeff Tunks at the Loews Coronado Bay
                  Resort.
                </p>
                <p>
                  Under Tunks’ tutelage, Lamas explored West Coast flavors while developing Pacific Rim recipes, and he
                  credits the acclaimed chef as his mentor. It was in this environment of mixing traditional recipes with
                  local flavors where Chef Lamas had his aha moment:
                </p>
              </div>
              <blockquote className="chapter__quote" data-reveal="">
                <p>“I could do this with my mama’s food!”</p>
              </blockquote>
            </div>
            <div className="chapter__media">
              <Img name="chef-stove" alt="Chef Lamas working the stove on the line" sizes="(max-width: 900px) 100vw, 34vw" reveal="mask" position="50% 30%" />
            </div>
          </article>

          <article className="chapter">
            <div className="chapter__num">iii.</div>
            <div className="chapter__body">
              <h2 className="h2" data-reveal="">
                Finding his <em>home</em>
              </h2>
              <div className="body-copy muted-light" data-reveal="">
                <p>
                  In 1992, Lamas discovered Louisville, Kentucky as an emerging culinary destination. Always inspired by
                  his Latin heritage, Lamas began crafting innovative recipes with locally sourced Southern ingredients.
                  His style of cooking was unique to the area, and in 2005 he opened Seviche to rave reviews.
                </p>
                <p>
                  Since then, Lamas continues to garner significant national attention for the restaurant. He has cooked
                  at the James Beard House five times, and he was honored as a semifinalist for the James Beard
                  Foundation’s Best Chef: Southeast award in 2010, 2011, 2012, and 2022.
                </p>
                <p>
                  Still, Chef Lamas remains hungry and curious. Today, Seviche is the chef’s pride and joy, but also his
                  playground. Our seasonal menu gives Chef Lamas a place to showcase his ability to bridge cultures,
                  people and flavors with plate after stunning plate.
                </p>
              </div>
            </div>
            <div className="chapter__media">
              <Img name="chef-guest" alt="Chef Lamas greeting a guest in the dining room" sizes="(max-width: 900px) 100vw, 34vw" reveal="mask" position="50% 35%" />
            </div>
          </article>
        </div>
      </section>

      <section className="section on-dark grain" aria-labelledby="jb-title">
        <div className="wrap jb">
          <Lines id="jb-title" className="h1" lines={['Five dinners at the', <em key="j">James Beard House.</em>]} />
          <dl className="facts facts--wide" data-reveal="">
            <div>
              <dt>1992</dt>
              <dd>Discovers Louisville</dd>
            </div>
            <div>
              <dt>2005</dt>
              <dd>Opens Seviche to rave reviews</dd>
            </div>
            <div>
              <dt>5×</dt>
              <dd>Guest chef at the James Beard House</dd>
            </div>
            <div>
              <dt>2010 · 11 · 12 · 22</dt>
              <dd>James Beard semifinalist, Best Chef: Southeast</dd>
            </div>
          </dl>
        </div>
      </section>
      <CtaBand title={['Taste the story', 'at his table.']} />
    </>
  );
}

/* ─── Our story ────────────────────────────────────────────── */
export function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={['One-of-a-kind', <em key="d">dining.</em>]}
        intro={
          <p>
            Inspired by Latin heritage and influenced by local Southern ingredients, we’ve crafted a beautifully
            eclectic experience. Seviche celebrates an innovative yet natural marriage of cultures and cuisines.
          </p>
        }
        image="prep-detail"
        imageAlt="Fresh ingredients being prepared in small dishes on the kitchen pass"
      />

      <section className="section on-paper story-page" aria-labelledby="fresh-title">
        <div className="wrap story-page__grid">
          <div className="story-page__text">
            <p className="eyebrow">Since 2005</p>
            <Lines id="fresh-title" className="h1" lines={['Fresh from', <em key="s">the start.</em>]} />
            <div className="body-copy muted-light" data-reveal="">
              <p>
                Since making a splash in Louisville in 2005, Seviche has showcased the freshest seafood and local artisan
                ingredients. When we opened our doors, we opened the city’s eyes to something new, and we haven’t slowed
                down. Chef Anthony Lamas keeps our seasonally-changing menu fresh with bold and bright flavors that
                transport and comfort at the same time.
              </p>
            </div>
          </div>
          <div className="story-page__media">
            <Img name="plating" alt="A plate being finished with a final garnish" sizes="(max-width: 900px) 100vw, 50vw" reveal="mask" parallax={0.05} />
          </div>
        </div>
      </section>

      <section className="section on-wine grain big-quote" aria-label="Press">
        <div className="wrap">
          <figure>
            <blockquote>
              <Lines as="p" className="display" lines={['“If you have time for', 'one meal in Louisville,', <em key="m">make it Seviche.”</em>]} />
            </blockquote>
            <figcaption data-reveal="">
              — {QUOTE.author}, <cite>{QUOTE.outlet}</cite>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section on-light" aria-labelledby="staple-title">
        <div className="wrap story-page__grid story-page__grid--flip">
          <div className="story-page__media">
            <Img name="dining-guests-1" alt="Guests deep in conversation over dinner" sizes="(max-width: 900px) 100vw, 40vw" reveal="mask" />
          </div>
          <div className="story-page__text">
            <p className="eyebrow">A Louisville staple</p>
            <h2 id="staple-title" className="h1" data-reveal="">
              Every night, <em>a memory.</em>
            </h2>
            <div className="body-copy muted-light" data-reveal="">
              <p>
                Over the years, Seviche has become a staple on the restaurant scene. In a landscape of new, trendy spots,
                we have built a dining experience that guests come back to again and again. Our deep menu and focus on
                innovative plating ensures every night at Seviche becomes a memory just as exciting as the last.
              </p>
            </div>
            <div className="btn-row">
              <a className="btn btn--wine" href="/chef-lamas">
                Meet the chef <Arrow />
              </a>
              <a className="btn btn--ghost" href={LINKS.instagram} target="_blank" rel="noopener">
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ─── Private dining ───────────────────────────────────────── */
export function PrivateDiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Private dining at Seviche"
        title={['Make the', <em key="e">evening yours.</em>]}
        intro={
          <p>
            Whether it’s business or pleasure, Seviche makes your event a night to remember. Escape to our lounge and
            private dining room with rustic accents that add an alluring warmth to the modern space.
          </p>
        }
        image="dining-guests-2"
        imageAlt="A private dinner in full swing, guests gathered around a long candlelit table"
      >
        <div className="btn-row">
          <a className="btn btn--primary" href={LINKS.privateEventForm} target="_blank" rel="noopener">
            Plan your event <Arrow />
          </a>
        </div>
      </PageHero>

      <section className="section on-paper pd" aria-labelledby="pd-title">
        <div className="wrap pd__grid">
          <div className="pd__text">
            <p className="eyebrow">Tailored to you</p>
            <Lines id="pd-title" className="h1" lines={['A menu crafted', <em key="f">for the occasion.</em>]} />
            <p className="lead muted-light" data-reveal="">
              In addition to the long list of Seviche classics, Chef Lamas welcomes the opportunity to craft customized
              menu items to fit the theme of your event.
            </p>
          </div>
          <div className="pd__features">
            <h2 className="eyebrow">Features</h2>
            <ul className="features features--light" role="list">
              {PRIVATE_DINING_FEATURES.map((f) => (
                <li key={f} data-reveal="">
                  {f}
                </li>
              ))}
            </ul>
            <div className="pd__form" data-reveal="">
              <p>Start here to reserve your event date by giving us some more information.</p>
              <div className="btn-row">
                <a className="btn btn--wine" href={LINKS.privateEventForm} target="_blank" rel="noopener">
                  Open the event form <Arrow />
                </a>
                <a className="btn btn--ghost" href={BUSINESS.phoneHref}>
                  Call {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-ink pd-gallery" aria-label="Private dining gallery">
        <div className="wrap pd-gallery__grid">
          <Img name="dining-room-1" alt="The private dining room set for a seated dinner" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" />
          <Img name="table-setting" alt="Linen, glassware and fresh tulips on a long table" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" delay={100} />
          <Img name="dining-room-2" alt="A business dinner in the private room with screen and AV" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" delay={200} />
          <Img name="dining-guests-1" alt="Guests talking across the table" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" />
          <Img name="bar-guests" alt="A long table of guests laughing together" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" delay={100} />
          <Img name="exterior-night" alt="Seviche’s glowing façade on Bardstown Road at night" sizes="(max-width: 760px) 100vw, 33vw" reveal="mask" delay={200} />
        </div>
      </section>
      <CtaBand title={['Dining with us', 'tonight instead?']} />
    </>
  );
}

/* ─── Events: Dinner & a Movie ─────────────────────────────── */
export function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events at Seviche"
        title={['Dinner', <em key="m">& a Movie.</em>]}
        intro={
          <p>
            The Seviche experience, with a twist: a five-course dinner with wine pairings, served alongside a feature
            film.
          </p>
        }
      >
        <div className="btn-row">
          <a className="btn btn--primary" href={BUSINESS.phoneHref}>
            Call {BUSINESS.phoneDisplay} to book <Arrow />
          </a>
        </div>
      </PageHero>

      <section className="section on-paper events" aria-labelledby="events-next">
        <div className="wrap events__grid">
          <div className="events__intro">
            <p className="eyebrow">How it works</p>
            <h2 id="events-next" className="h1" data-reveal="">
              Tickets are booked <em>by phone.</em>
            </h2>
            <p className="lead muted-light" data-reveal="">
              Please call {BUSINESS.phoneDisplay} to book a ticket. For upcoming screenings, follow Seviche on{' '}
              <a href={LINKS.instagram} target="_blank" rel="noopener">
                Instagram
              </a>{' '}
              or{' '}
              <a href={LINKS.facebook} target="_blank" rel="noopener">
                Facebook
              </a>{' '}
              or check back here.
            </p>
            <Img name="dining-guests-1" alt="Guests gathered for dinner in the dining room" sizes="(max-width: 900px) 100vw, 36vw" reveal="mask" className="events__img" />
          </div>
          <div className="events__past">
            <h2 className="eyebrow">Recent features</h2>
            <ol className="reel" role="list">
              {MOVIE_NIGHTS.map((m, i) => (
                <li key={m.title} data-reveal="" style={{ '--d': `${(i % 5) * 50}ms` } as React.CSSProperties}>
                  <span className="reel__dates">{m.dates}</span>
                  <span className="reel__title">{m.title}</span>
                  {'note' in m && m.note && <span className="reel__note">{m.note}</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section on-wine grain" aria-labelledby="ev-private">
        <div className="wrap split-cta">
          <h2 id="ev-private" className="h1" data-reveal="">
            Hosting your own <em>celebration?</em>
          </h2>
          <div>
            <p className="muted" data-reveal="">
              Seating for 50 and cocktail receptions for 75, with full audio-video capabilities and a menu crafted for
              your occasion.
            </p>
            <a className="btn btn--ghost" href="/private-dining">
              Private dining <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Reservations ─────────────────────────────────────────── */
export function ReservationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={['Make a', <em key="r">reservation.</em>]}
        intro={<p>Reserve online through OpenTable, or call us directly.</p>}
      />
      <section className="section on-paper resv" aria-label="Book a table" data-hide-reserve-bar="">
        <div className="wrap resv__grid">
          <div className="resv__book">
            <OpenTable />
          </div>
          <aside className="resv__info">
            <div className="resv__block">
              <h2 className="eyebrow">Contact</h2>
              <p className="resv__big">
                <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                <br />
                <span className="muted-light">{BUSINESS.manager}</span>
              </p>
            </div>
            <div className="resv__block">
              <h2 className="eyebrow">Location</h2>
              <address>
                {BUSINESS.street}
                <br />
                {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postal}
              </address>
              <a className="link-line" href={LINKS.directions} target="_blank" rel="noopener">
                Get directions <Arrow />
              </a>
            </div>
            <div className="resv__block">
              <h2 className="eyebrow">Hours</h2>
              <p>
                {BUSINESS.hoursDays}
                <br />
                {BUSINESS.hoursTime}
              </p>
            </div>
            <div className="resv__block">
              <h2 className="eyebrow">Larger parties</h2>
              <p>
                Planning an event? <a href="/private-dining">Explore private dining</a>.
              </p>
            </div>
          </aside>
        </div>
        <div className="wrap resv__map">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}

/* ─── Gift cards ───────────────────────────────────────────── */
export function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title={['Give the gift', <em key="g">of fine dining.</em>]}
        intro={<p>The perfect gift for any occasion.</p>}
        image="table-setting"
        imageAlt="A table set with linen, glassware and spring flowers"
      >
        <div className="btn-row">
          <a className="btn btn--primary" href={LINKS.giftCards} target="_blank" rel="noopener">
            Buy gift cards <Arrow />
          </a>
        </div>
        <p className="page-hero__fine">Gift cards are sold securely through our partner, QuickGifts.</p>
      </PageHero>
      <CtaBand />
    </>
  );
}

/* ─── 404 ──────────────────────────────────────────────────── */
export function NotFoundPage() {
  return (
    <section className="page-hero page-hero--type grain notfound" aria-labelledby="page-title">
      <div className="wrap page-hero__grid">
        <div className="page-hero__text">
          <p className="eyebrow">Error 404</p>
          <h1 id="page-title" className="page-hero__title">
            <span className="hero__line">
              <span>This table</span>
            </span>
            <span className="hero__line">
              <span>
                <em>isn’t set.</em>
              </span>
            </span>
          </h1>
          <p className="lead page-hero__intro">The page you were looking for has moved or no longer exists.</p>
          <div className="btn-row">
            <a className="btn btn--primary" href="/">
              Back to Seviche <Arrow />
            </a>
            <a className="btn btn--ghost" href="/menu">
              View the menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
