import { hydrateRoot } from 'react-dom/client';
import type { ComponentType } from 'react';
import { App } from './App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/home.css';
import './styles/pages.css';

// Route-level code splitting: each page only downloads its own component code.
const pages: Record<string, () => Promise<ComponentType>> = {
  '/': () => import('./pages/Home').then((m) => m.Home),
  '/menu': () => import('./pages/Inner').then((m) => m.MenuPage),
  '/chef-lamas': () => import('./pages/Inner').then((m) => m.ChefPage),
  '/our-story': () => import('./pages/Inner').then((m) => m.StoryPage),
  '/private-dining': () => import('./pages/Inner').then((m) => m.PrivateDiningPage),
  '/events': () => import('./pages/Inner').then((m) => m.EventsPage),
  '/reservations': () => import('./pages/Inner').then((m) => m.ReservationsPage),
  '/gift-cards': () => import('./pages/Inner').then((m) => m.GiftCardsPage),
  '/terms-conditions': () => import('./pages/Terms').then((m) => m.TermsPage),
  '/404': () => import('./pages/Inner').then((m) => m.NotFoundPage),
};

const root = document.getElementById('root')!;
// The prerendered route is authoritative (404.html is served for unknown URLs).
const path = root.dataset.route || '/404';
(pages[path] || pages['/404'])().then((Page) => {
  hydrateRoot(
    root,
    <App path={path}>
      <Page />
    </App>,
  );
});
