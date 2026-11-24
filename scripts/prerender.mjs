// Static site generation: renders every route to HTML (crawlable, instant first
// paint), then React hydrates. Also emits sitemap.xml.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
let template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
// Inline the (small, ~10 kB gzipped) stylesheet: removes the render-blocking request.
const cssHref = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (cssHref) {
  const css = await fs.readFile(path.join(dist, cssHref[1]), 'utf8');
  template = template.replace(cssHref[0], () => `<style>${css}</style>`);
}
const { render, ROUTES } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const SITE = 'https://www.sevicherestaurant.com';

for (const route of ROUTES) {
  const { html, head } = render(route);
  const page = template
    .replace('<!--app-head-->', head)
    .replace('data-route=""', `data-route="${route.path}"`)
    .replace('<!--app-html-->', html);
  // Cloudflare Pages serves /menu from menu.html; 404.html for unknown paths.
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  await fs.writeFile(path.join(dist, file), page);
  console.log('  ✓', route.path, '→', file, `${(page.length / 1024).toFixed(1)} kB`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => r.path !== '/404')
  .map((r) => `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority ?? 0.5}</priority></url>`)
  .join('\n');
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await fs.rm(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log('  ✓ sitemap.xml');
