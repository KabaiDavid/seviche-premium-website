// Single source of truth for verified business facts.
// Every value below was taken from sevicherestaurant.com (audited Nov 2026).

export const SITE_URL = 'https://www.sevicherestaurant.com';

export const BUSINESS = {
  name: 'Seviche',
  legalName: 'Seviche Restaurant',
  descriptor: 'A Latin Restaurant',
  chef: 'Anthony Lamas',
  founded: 2005,
  street: '1538 Bardstown Road',
  streetShort: '1538 Bardstown Rd',
  city: 'Louisville',
  region: 'Kentucky',
  regionCode: 'KY',
  postal: '40205',
  country: 'US',
  phoneDisplay: '(502) 473-8560',
  phoneHref: 'tel:+15024738560',
  email: 'jeff@sevicherestaurant.com',
  manager: 'Jeff Leppert, General Manager',
  hoursDays: 'Monday – Sunday',
  hoursTime: '5 pm – Close',
  hoursShort: 'Nightly from 5 pm',
} as const;

export const LINKS = {
  // Official OpenTable listing used by the existing reservation widget (rid 26617)
  opentable: 'https://www.opentable.com/restref/client/?rid=26617&restref=26617',
  openTableRid: '26617',
  directions: 'https://maps.app.goo.gl/LrGcFhQg9d22jeFC6',
  mapsEmbed:
    'https://www.google.com/maps?q=Seviche+1538+Bardstown+Rd+Louisville+KY+40205&output=embed',
  giftCards: 'https://onelink.quickgifts.com/merchant/seviche-restaurant-louisville',
  privateEventForm: 'https://seviche.tripleseat.com/party_request/16584',
  instagram: 'https://www.instagram.com/sevicherestaurant/',
  facebook: 'https://www.facebook.com/sevicherestaurant/',
  twitter: 'https://twitter.com/sevichelatinres',
} as const;

export const NAV = [
  { href: '/menu', label: 'Menu' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/chef-lamas', label: 'The Chef' },
  { href: '/private-dining', label: 'Private Dining' },
  { href: '/events', label: 'Dinner & a Movie' },
] as const;

// Awards exactly as listed on the official homepage, paired with the issuing
// publication shown on each badge.
export const AWARDS = [
  { source: 'OpenTable', title: 'Diners’ Choice', detail: '2026', featured: true },
  { source: 'James Beard Foundation', title: 'Best Chef: Southeast', detail: 'Semifinalist — 2010, 2011, 2012, 2022' },
  { source: 'Eater Awards', title: 'Restaurant of the Year' },
  { source: 'Chef Magazine', title: 'Chef of the Year', detail: 'Finalist' },
  { source: 'Latina', title: 'Leader of the Latin Food Revolution' },
  { source: 'American Culinary Federation', title: 'Restaurant of the Year Award of Excellence' },
  { source: 'Monterey Bay Aquarium Seafood Watch', title: 'Cooking for Solutions Award Winner' },
  { source: 'LEO Weekly · Louisville’s Best', title: 'Best Restaurant', detail: '2006, 2014' },
  { source: 'LEO Weekly · Louisville’s Best', title: 'Best Chef', detail: '2010, 2014' },
  { source: 'Best of Louisville', title: 'Favorite Restaurant & New Restaurant', detail: '2006' },
  { source: 'Bar Rescue', title: 'Culinary Expert' },
] as const;

export const PRIVATE_DINING_FEATURES = [
  'Seating for 50, cocktail receptions for 75',
  'Full audio-video capabilities',
  'On-site and valet parking',
  'Sound buffering from main public dining areas',
] as const;

// Dinner & a Movie — the series as published on the official events page.
// All listed dates have already taken place; they are shown as an archive.
export const MOVIE_NIGHTS = [
  { title: 'The Birdcage', dates: 'Aug 11 – 15, 2026', note: 'An eclectic celebration — a 5-course dinner with wine pairings.' },
  { title: 'Mamma Mia!', dates: 'Jul 21 – 25, 2026', note: 'A 5-course dinner with wine pairings.' },
  { title: 'Jurassic Park', dates: 'Jun 17 – 20, 2026', note: 'An epic 5-course dinner with wine pairings.' },
  { title: 'Legally Blonde', dates: 'May 26 – 30, 2026' },
  { title: 'Knives Out', dates: 'Apr 22 – 25, 2026', note: 'Opening cocktail 6:00 pm · Showtime 6:30 pm.' },
  { title: 'Pride & Prejudice', dates: 'Feb 5 – 7, 2026', note: 'A 5-course dinner with wine pairings.' },
  { title: 'How the Grinch Stole Christmas', dates: 'Dec 12 – 20, 2025' },
  { title: 'Practical Magic', dates: 'Oct 22 – 25, 2025' },
  { title: 'Tombstone', dates: 'Aug 26 – 28, 2025' },
  { title: 'Pirates of the Caribbean', dates: 'Jun 12 – 14, 2025' },
] as const;

export const QUOTE = {
  text: 'If you have time for one meal in Louisville, make it Seviche.',
  author: 'John Mariani',
  outlet: 'Esquire',
} as const;
