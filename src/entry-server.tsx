import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ROUTES, type Route } from './routes';
import { SITE_URL } from './data/site';

export { ROUTES };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function render(route: Route) {
  const html = renderToString(<App path={route.path}>{route.render()}</App>);
  const canonical = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  const schemas = [...(route.schema?.() ?? [])];
  if (route.breadcrumb) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: route.breadcrumb, item: canonical },
      ],
    });
  }
  const head = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    route.path === '/404' ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="${route.path === '/' ? 'restaurant.restaurant' : 'website'}">`,
    `<meta property="og:site_name" content="Seviche Restaurant">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${SITE_URL}/og-image.jpg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Fresh ingredients being prepared in the Seviche kitchen">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:site" content="@sevichelatinres">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${SITE_URL}/og-image.jpg">`,
    ...schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
  return { html, head };
}
