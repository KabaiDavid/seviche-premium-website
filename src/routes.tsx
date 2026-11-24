import type { ReactNode } from 'react';
import { Home } from './pages/Home';
import {
  ChefPage,
  EventsPage,
  GiftCardsPage,
  MenuPage,
  NotFoundPage,
  PrivateDiningPage,
  ReservationsPage,
  StoryPage,
} from './pages/Inner';
import { TermsPage } from './pages/Terms';
import { BUSINESS, LINKS, SITE_URL } from './data/site';
import { MENU } from './lib/menu';

export type Route = {
  path: string;
  title: string;
  description: string;
  render: () => ReactNode;
  schema?: () => object[];
  breadcrumb?: string;
  priority?: number;
};

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.city,
  addressRegion: BUSINESS.regionCode,
  postalCode: BUSINESS.postal,
  addressCountry: BUSINESS.country,
};

export const restaurantSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: BUSINESS.legalName,
  alternateName: 'Seviche, A Latin Restaurant',
  description:
    'Seviche explores the natural marriage of Latin traditions and classic Southern ingredients — Chef Anthony Lamas’ restaurant on Bardstown Road, Louisville, since 2005.',
  url: SITE_URL,
  telephone: '+1-502-473-8560',
  email: BUSINESS.email,
  image: [`${SITE_URL}/og-image.jpg`],
  logo: `${SITE_URL}/logo.svg`,
  address: ADDRESS,
  hasMap: LINKS.directions,
  servesCuisine: ['Latin', 'Southern', 'Seafood'],
  priceRange: '$$$',
  acceptsReservations: 'True',
  hasMenu: `${SITE_URL}/menu`,
  foundingDate: '2005',
  founder: { '@type': 'Person', name: 'Anthony Lamas' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '17:00',
    },
  ],
  potentialAction: {
    '@type': 'ReserveAction',
    target: { '@type': 'EntryPoint', urlTemplate: LINKS.opentable, inLanguage: 'en-US' },
    result: { '@type': 'FoodEstablishmentReservation', name: 'Reserve a table at Seviche' },
  },
  sameAs: [LINKS.instagram, LINKS.facebook, LINKS.twitter],
});

const menuSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Seviche Menu',
  url: `${SITE_URL}/menu`,
  inLanguage: 'en-US',
  hasMenuSection: MENU.map((t) => ({
    '@type': 'MenuSection',
    name: t.label,
    hasMenuSection: t.sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      hasMenuItem: s.items.map((i) => {
        const price = i.price?.match(/\$\s?(\d+(?:\.\d+)?)/)?.[1];
        return {
          '@type': 'MenuItem',
          name: i.name.replace(/\*$/, ''),
          ...(i.desc ? { description: i.desc } : {}),
          ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD' } } : {}),
        };
      }),
    })),
  })),
});

const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anthony Lamas',
  jobTitle: 'Chef',
  worksFor: { '@id': `${SITE_URL}/#restaurant` },
  url: `${SITE_URL}/chef-lamas`,
  award: 'James Beard Foundation Best Chef: Southeast semifinalist (2010, 2011, 2012, 2022)',
});

const eventSeriesSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'Dinner & a Movie at Seviche',
  description: 'A five-course dinner with wine pairings, served alongside a feature film.',
  location: { '@type': 'Place', name: BUSINESS.legalName, address: ADDRESS },
  organizer: { '@id': `${SITE_URL}/#restaurant` },
});

export const ROUTES: Route[] = [
  {
    path: '/',
    title: 'Seviche | Latin Restaurant in Louisville, KY — Chef Anthony Lamas',
    description:
      'Latin soul, Southern roots. Chef Anthony Lamas’ Seviche has paired Latin tradition with classic Southern ingredients on Bardstown Road since 2005. Reserve your table.',
    render: () => <Home />,
    schema: () => [restaurantSchema()],
    priority: 1,
  },
  {
    path: '/menu',
    title: 'Menu | Seviche — Ceviche, Latin Cuisine & Bourbon in Louisville',
    description:
      'Explore the Seviche menu: aperitivos, ceviche, entradas, desserts, Latin cocktails, wine and a deep list of Kentucky bourbon and rye.',
    render: () => <MenuPage />,
    schema: () => [menuSchema()],
    breadcrumb: 'Menu',
    priority: 0.9,
  },
  {
    path: '/chef-lamas',
    title: 'Chef Anthony Lamas | Seviche, Louisville',
    description:
      'Meet Chef Anthony Lamas — Mexican and Puerto Rican heritage, five dinners at the James Beard House and four-time James Beard Best Chef: Southeast semifinalist.',
    render: () => <ChefPage />,
    schema: () => [personSchema()],
    breadcrumb: 'Chef Anthony Lamas',
    priority: 0.8,
  },
  {
    path: '/our-story',
    title: 'Our Story | Seviche — One-of-a-Kind Latin Dining Since 2005',
    description:
      'Inspired by Latin heritage and influenced by local Southern ingredients, Seviche has brought fresh seafood and bold flavors to Louisville since 2005.',
    render: () => <StoryPage />,
    breadcrumb: 'Our Story',
    priority: 0.7,
  },
  {
    path: '/private-dining',
    title: 'Private Dining & Events | Seviche, Louisville',
    description:
      'Host your event at Seviche: seating for 50, cocktail receptions for 75, full audio-video, valet parking and custom menus from Chef Lamas.',
    render: () => <PrivateDiningPage />,
    breadcrumb: 'Private Dining',
    priority: 0.8,
  },
  {
    path: '/events',
    title: 'Dinner & a Movie | Events at Seviche, Louisville',
    description:
      'The Seviche experience, with a twist: a five-course dinner with wine pairings served alongside a feature film. Call (502) 473-8560 to book.',
    render: () => <EventsPage />,
    schema: () => [eventSeriesSchema()],
    breadcrumb: 'Dinner & a Movie',
    priority: 0.6,
  },
  {
    path: '/reservations',
    title: 'Reservations | Seviche, 1538 Bardstown Road, Louisville',
    description:
      'Reserve a table at Seviche through OpenTable or call (502) 473-8560. Open Monday–Sunday from 5 pm at 1538 Bardstown Road, Louisville, KY 40205.',
    render: () => <ReservationsPage />,
    schema: () => [restaurantSchema()],
    breadcrumb: 'Reservations',
    priority: 0.9,
  },
  {
    path: '/gift-cards',
    title: 'Gift Cards | Seviche, Louisville',
    description: 'Give the gift of fine dining — Seviche gift cards, the perfect gift for any occasion.',
    render: () => <GiftCardsPage />,
    breadcrumb: 'Gift Cards',
    priority: 0.5,
  },
  {
    path: '/terms-conditions',
    title: 'Terms & Conditions | Seviche',
    description: 'Terms and conditions for the use of the Seviche Restaurant website.',
    render: () => <TermsPage />,
    breadcrumb: 'Terms & Conditions',
    priority: 0.2,
  },
  {
    path: '/404',
    title: 'Page not found | Seviche',
    description: 'The page you were looking for could not be found.',
    render: () => <NotFoundPage />,
  },
];

export const findRoute = (path: string) => ROUTES.find((r) => r.path === path) ?? ROUTES[ROUTES.length - 1];
