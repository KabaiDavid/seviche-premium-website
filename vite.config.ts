import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preact (via its React-compatible layer) keeps the same component code while
// cutting ~45 kB gzipped of runtime from every page.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^react-dom\/server$/, replacement: 'preact/compat/server' },
      { find: /^react-dom\/client$/, replacement: 'preact/compat/client' },
      { find: /^react-dom$/, replacement: 'preact/compat' },
      { find: /^react\/jsx-runtime$/, replacement: 'preact/jsx-runtime' },
      { find: /^react\/jsx-dev-runtime$/, replacement: 'preact/jsx-dev-runtime' },
      { find: /^react$/, replacement: 'preact/compat' },
    ],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
});
