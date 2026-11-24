import { Hero } from '../components/Hero';
import { Img } from '../components/Img';
import { Lines } from '../components/Layout';
import { Lime } from '../components/Lime';
import { Arrow } from '../components/Icons';
import { MapEmbed } from '../components/MapEmbed';
import { AWARDS, BUSINESS, LINKS, PRIVATE_DINING_FEATURES, QUOTE } from '../data/site';
import { MENU, countItems, findDish, sectionOf } from '../lib/menu';

const SIGNATURES = [
  'Ostiones a la Lamas',
  'Kentucky Bison Empanadas',
  'Pecan Crusted Brie',
  'Churrascos de Argentina*',
  'Sea Scallops*',
  'Sustainable Salmon*',
].map((n) => findDish(n));

const CEVICHES = sectionOf('main', 'Seviche/Ceviche/Cebiche').items;
const SPIRITS = countItems('bourbon');

export function Home() {
  return (
    <>
      <Hero />

      {/* ── 02 Brand statement ─────────────────────────────── */}
      <section className="section on-paper statement" id="experience" aria-labelledby="statement-title">
        <div className="wrap statement__grid">
          <p className="eyebrow" data-reveal="">
            Louisville · Since {BUSINESS.founded}
          </p>
          <Lines
            id="statement-title"
            className="display statement__title"
            lines={[
              'Inspired by heritage.',
              <>
                Influenced by <em className="accent">locality.</em>
              </>,
            ]}
          />
          <div className="statement__body" data-reveal="" style={{ '--d': '200ms' } as React.CSSProperties}>
            <p className="lead">
              Seviche explores the natural marriage of Latin traditions and classic Southern ingredients. Our innovative
              approach offers an explosion of flavors and a delight for all of your senses.
            </p>
            <a className="link-line" href="/our-story">
              Our story <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── 03 The Seviche experience — three pillars ───────── */}
      <section className="section on-paper pillars" aria-labelledby="pillars-title">
        <h2 id="pillars-title" className="sr-only">
          The Seviche experience
        </h2>
        <div className="wrap">
          <article className="pillar pillar--one">
            <div className="pillar__media">
              <Img
                name="chef-archive"
                alt="Archival family photograph from Chef Anthony Lamas’ childhood"
                sizes="(max-width: 760px) 70vw, 26vw"
                reveal="mask"
              />
              <p className="caption">From the Lamas family archive</p>
            </div>
            <div className="pillar__text" data-reveal="">
              <span className="numeral">i.</span>
              <h3 className="h2">
                Latin <em>heritage</em>
              </h3>
              <p>
                As a child in southern California, his mother’s heirloom recipes sparked Chef Anthony Lamas’ interest
                in the cuisine of his Mexican and Puerto Rican heritage — and still shape the kitchen today.
              </p>
            </div>
          </article>

          <article className="pillar pillar--two">
            <div className="pillar__text" data-reveal="">
              <span className="numeral">ii.</span>
              <h3 className="h2">
                Southern <em>roots</em>
              </h3>
              <p>
                Louisville has been home since 1992. Kentucky bison folded into empanadas, pecans crusting warm brie,
                and a back bar of {SPIRITS} bourbons and ryes — locally sourced Southern ingredients, seen through a
                Latin lens.
              </p>
            </div>
            <div className="pillar__media">
              <Img
                name="bourbon-cocktail"
                alt="A bourbon cocktail glowing under warm light on the Seviche bar"
                sizes="(max-width: 760px) 100vw, 58vw"
                reveal="mask"
                parallax={0.06}
              />
            </div>
          </article>

          <article className="pillar pillar--three">
            <div className="pillar__media">
              <Img
                name="plating"
                alt="A hand finishing a plate of blistered peppers with a final garnish"
                sizes="(max-width: 760px) 100vw, 46vw"
                reveal="mask"
                parallax={0.05}
              />
            </div>
            <div className="pillar__text" data-reveal="">
              <span className="numeral">iii.</span>
              <h3 className="h2">
                Culinary <em>artistry</em>
              </h3>
              <p>
                A seasonally changing menu, bold and bright flavors, and a focus on innovative plating ensure every
                night at Seviche becomes a memory just as exciting as the last.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ── 04 Culinary philosophy — the namesake ───────────── */}
      <section className="section on-wine ceviche grain" aria-labelledby="ceviche-title" data-hide-reserve-bar="">
        <div className="wrap ceviche__grid">
          <div className="ceviche__visual">
            <Lime />
            <p className="ceviche__hint">Move to turn the light</p>
          </div>
          <div className="ceviche__text">
            <p className="eyebrow">The namesake</p>
            <h2 id="ceviche-title" className="ceviche__spellings" data-reveal="">
              <span>Seviche</span>
              <span>
                <em>Ceviche</em>
              </span>
              <span>Cebiche</span>
            </h2>
            <p className="lead ceviche__lead" data-reveal="">
              However you spell it, it begins with citrus and the freshest seafood — the dish this restaurant was
              named for, and the one Seviche has showcased since {BUSINESS.founded}.
            </p>
            <ul className="ceviche__list" role="list">
              {CEVICHES.map((c, i) => (
                <li key={c.name} data-reveal="" style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                  <span className="ceviche__name">{c.name}</span>
                  <span className="ceviche__desc">{c.desc}</span>
                  <span className="ceviche__price">{c.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 05 Signature food ──────────────────────────────── */}
      <section className="section on-ink plates" aria-labelledby="plates-title">
        <div className="wrap plates__grid">
          <div className="plates__media">
            <div className="plates__sticky">
              <Img
                name="churrascos"
                alt="Churrascos de Argentina — grilled skirt steak with bright green chimichurri"
                sizes="(max-width: 900px) 100vw, 50vw"
                reveal="fade"
                className="plates__img"
              />
              <p className="caption">Churrascos de Argentina — skirt steak, chimichurri</p>
            </div>
          </div>
          <div className="plates__text">
            <p className="eyebrow">From the kitchen</p>
            <Lines id="plates-title" className="h1" lines={['Plates worth', <em key="c">crossing town for.</em>]} />
            <ol className="plates__list" role="list">
              {SIGNATURES.map((d, i) => (
                <li key={d.name} data-reveal="">
                  <span className="plates__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h3">{d.name.replace(/\*$/, '')}</h3>
                    <p>{d.desc}</p>
                  </div>
                  <span className="plates__price">{d.price}</span>
                </li>
              ))}
            </ol>
            <div className="btn-row">
              <a className="btn btn--ghost" href="/menu">
                Explore the full menu <Arrow />
              </a>
            </div>
            <p className="plates__note">Our menu changes with the seasons. Ask your server about today’s selections.</p>
          </div>
        </div>
      </section>

      {/* ── 06 Chef Anthony Lamas ──────────────────────────── */}
      <section className="section on-dark chef grain" aria-labelledby="chef-title">
        <div className="wrap chef__grid">
          <div className="chef__media">
            <Img
              name="chef-stove"
              alt="Chef Anthony Lamas cooking at the stove in the Seviche kitchen"
              sizes="(max-width: 900px) 100vw, 44vw"
              reveal="mask"
              parallax={0.05}
              position="50% 30%"
            />
          </div>
          <div className="chef__text">
            <p className="eyebrow">Chef Anthony Lamas</p>
            <Lines id="chef-title" className="display" lines={['The man', <em key="b">behind the menu.</em>]} />
            <blockquote className="chef__quote" data-reveal="">
              <p>“I could do this with my mama’s food!”</p>
            </blockquote>
            <p className="body-copy muted" data-reveal="">
              From growing up on a farm to cooking in kitchens across the country, Chef Lamas brings an uncommon voice
              to Louisville’s culinary landscape. With insatiable creativity, he has put the city on the culinary map —
              bridging cultures, people and flavors with plate after stunning plate.
            </p>
            <dl className="facts" data-reveal="">
              <div>
                <dt>1992</dt>
                <dd>Arrives in Louisville</dd>
              </div>
              <div>
                <dt>2005</dt>
                <dd>Opens Seviche</dd>
              </div>
              <div>
                <dt>5×</dt>
                <dd>Cooked at the James Beard House</dd>
              </div>
              <div>
                <dt>4×</dt>
                <dd>James Beard semifinalist, Best Chef: Southeast</dd>
              </div>
            </dl>
            <a className="btn btn--ghost" href="/chef-lamas">
              Meet the chef <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── 07 Our story ───────────────────────────────────── */}
      <section className="section on-light story" aria-labelledby="story-title">
        <div className="wrap">
          <figure className="story__quote">
            <blockquote>
              <Lines
                as="p"
                className="h1"
                lines={['“If you have time for one meal', <>in Louisville, make it <em className="accent">Seviche.</em>”</>]}
              />
            </blockquote>
            <figcaption data-reveal="">
              — {QUOTE.author}, <cite>{QUOTE.outlet}</cite>
            </figcaption>
          </figure>

          <div className="story__head">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="h2" data-reveal="">
              Fresh from the <em>start.</em>
            </h2>
          </div>
          <ol className="timeline" role="list">
            {[
              ['Origins', 'Southern California', 'A family farm, Future Farmers of America, and his mother’s heirloom recipes — “farm to table” long before it was a movement.'],
              ['Craft', 'San Diego', 'Trained with the San Diego Culinary Apprenticeship Program under mentor Jeff Tunks, mixing traditional recipes with local flavors.'],
              ['Louisville', '1992', 'Discovers Louisville as an emerging culinary destination and begins crafting Latin recipes with Southern ingredients.'],
              ['Seviche', '2005', 'Opens Seviche on Bardstown Road to rave reviews — and opens the city’s eyes to something new.'],
              ['Evolution', 'Today', 'A seasonal menu that remains the chef’s pride and joy — and his playground.'],
            ].map(([k, y, t], i) => (
              <li key={k} data-reveal="" style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <span className="timeline__k">{k}</span>
                <span className="timeline__y">{y}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
          <a className="link-line" href="/our-story">
            Read our story <Arrow />
          </a>
        </div>
      </section>

      {/* ── 08 Menu index ──────────────────────────────────── */}
      <section className="section on-paper menu-index" aria-labelledby="menu-index-title">
        <div className="wrap menu-index__grid">
          <div className="menu-index__head">
            <p className="eyebrow">The menu</p>
            <Lines id="menu-index-title" className="h1" lines={['Read it slowly.', <em key="o">Order boldly.</em>]} />
            <p className="muted-light">
              Aperitivos to postres, Latin classics to a deep list of Kentucky’s finest bourbon. Menu is subject to
              change.
            </p>
            <a className="btn btn--wine" href="/menu">
              View the menu <Arrow />
            </a>
          </div>
          <ul className="menu-index__list" role="list">
            {MENU.map((t, i) => (
              <li key={t.id} data-reveal="" style={{ '--d': `${i * 50}ms` } as React.CSSProperties}>
                <a href={`/menu#${t.id}`}>
                  <span className="menu-index__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="menu-index__label">{t.label}</span>
                  <span className="menu-index__meta">{t.sections.map((s) => s.title).slice(0, 3).join(' · ')}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 09 Atmosphere ──────────────────────────────────── */}
      <section className="section on-ink atmos" aria-labelledby="atmos-title">
        <div className="wrap">
          <div className="atmos__head">
            <p className="eyebrow">The atmosphere</p>
            <Lines id="atmos-title" className="display" lines={['An evening on', <em key="b">Bardstown Road.</em>]} />
            <p className="muted atmos__lede" data-reveal="">
              Warm light, white linen, rustic accents and a modern room — a place guests come back to again and again.
            </p>
          </div>
          <div className="atmos__grid">
            <Img name="chef-guest" alt="Chef Lamas sharing a laugh with a guest in the dining room" sizes="(max-width: 760px) 100vw, 40vw" className="atmos__a" reveal="mask" position="50% 35%" />
            <Img name="bar-guests" alt="Guests laughing together at a long table" sizes="(max-width: 760px) 100vw, 30vw" className="atmos__b" reveal="mask" delay={120} />
            <Img name="table-setting" alt="A long table set with linen, glassware and spring flowers" sizes="(max-width: 760px) 50vw, 24vw" className="atmos__c" reveal="mask" delay={200} />
            <Img name="dining-guests-2" alt="A full table of guests enjoying dinner in the warmly lit room" sizes="(max-width: 760px) 50vw, 26vw" className="atmos__d" reveal="mask" delay={80} />
            <Img name="kitchen-line" alt="Chef Lamas and his team plating on the kitchen line" sizes="(max-width: 760px) 100vw, 50vw" className="atmos__e" reveal="mask" delay={160} />
          </div>
        </div>
      </section>

      {/* ── 10 Events & private dining ─────────────────────── */}
      <section className="section on-wine events-home grain" aria-labelledby="events-title">
        <div className="wrap events-home__grid">
          <div className="events-home__media">
            <Img name="dining-room-2" alt="The private dining room set for a gathering, with a screen for presentations" sizes="(max-width: 900px) 100vw, 40vw" reveal="mask" />
          </div>
          <div className="events-home__text">
            <p className="eyebrow">Private dining</p>
            <Lines id="events-title" className="display" lines={['Make the', <em key="e">evening yours.</em>]} />
            <p className="lead" data-reveal="">
              Whether it’s business or pleasure, Seviche makes your event a night to remember — in a lounge and private
              dining room with rustic accents that add an alluring warmth to the modern space.
            </p>
            <ul className="features" role="list" data-reveal="">
              {PRIVATE_DINING_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="btn-row">
              <a className="btn btn--primary" href="/private-dining">
                Plan your event <Arrow />
              </a>
            </div>
          </div>
          <aside className="movie-card" data-reveal="" aria-labelledby="movie-title">
            <p className="eyebrow eyebrow--plain">A Seviche tradition</p>
            <h3 id="movie-title" className="h2">
              Dinner <em>&amp;</em> a Movie
            </h3>
            <p>The Seviche experience, with a twist — a five-course dinner with wine pairings, set to a feature film.</p>
            <a className="link-line" href="/events">
              See the series <Arrow />
            </a>
          </aside>
        </div>
      </section>

      {/* ── 11 Recognition ─────────────────────────────────── */}
      <section className="section on-light awards" aria-labelledby="awards-title">
        <div className="wrap awards__grid">
          <div className="awards__head">
            <p className="eyebrow">Recognition</p>
            <Lines id="awards-title" className="h1" lines={['Two decades,', <em key="w">well noticed.</em>]} />
            <Img name="opentable-diners-choice-2026" alt="OpenTable Diners’ Choice 2026 badge" sizes="140px" className="awards__badge" />
          </div>
          <ul className="awards__list" role="list">
            {AWARDS.map((a, i) => (
              <li key={a.title + i} data-reveal="" style={{ '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}>
                <span className="awards__source">{a.source}</span>
                <span className="awards__title">{a.title}</span>
                {'detail' in a && a.detail && <span className="awards__detail">{a.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 12 Reservation ─────────────────────────────────── */}
      <section className="reserve grain" aria-labelledby="reserve-title" data-hide-reserve-bar="">
        <Img name="kitchen-line" alt="" fill sizes="100vw" className="reserve__bg" parallax={0.08} />
        <div className="reserve__shade" />
        <div className="wrap reserve__inner">
          <p className="eyebrow">Reservations</p>
          <Lines id="reserve-title" className="display" lines={['Your table', <em key="w">is waiting.</em>]} />
          <p className="lead" data-reveal="">
            Dinner is served nightly from 5 pm, Monday through Sunday. Book online through OpenTable or call us
            directly.
          </p>
          <div className="btn-row reserve__ctas">
            <a className="btn btn--primary" href="/reservations">
              Reserve your table <Arrow />
            </a>
            <a className="btn btn--ghost" href={BUSINESS.phoneHref}>
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
          <p className="reserve__gift">
            Give the gift of fine dining —{' '}
            <a href={LINKS.giftCards} target="_blank" rel="noopener">
              buy a gift card
            </a>
          </p>
        </div>
      </section>

      {/* ── 13 Location ────────────────────────────────────── */}
      <section className="section on-paper location" aria-labelledby="location-title">
        <div className="wrap location__grid">
          <div className="location__media">
            <Img name="entrance" alt="The Seviche entrance on Bardstown Road, framed by palms and summer planters" sizes="(max-width: 900px) 70vw, 28vw" reveal="mask" />
          </div>
          <div className="location__text">
            <p className="eyebrow">Find us</p>
            <h2 id="location-title" className="h1" data-reveal="">
              1538 Bardstown <em>Road</em>
            </h2>
            <dl className="location__dl">
              <div>
                <dt>Address</dt>
                <dd>
                  <address>
                    {BUSINESS.street}
                    <br />
                    {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postal}
                  </address>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  {BUSINESS.hoursDays}
                  <br />
                  {BUSINESS.hoursTime}
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Parking</dt>
                <dd>On-site and valet parking</dd>
              </div>
            </dl>
            <div className="btn-row">
              <a className="btn btn--wine" href={LINKS.directions} target="_blank" rel="noopener">
                Get directions <Arrow />
              </a>
              <a className="btn btn--ghost" href="/reservations">
                Reservations
              </a>
            </div>
          </div>
          <div className="location__map">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
