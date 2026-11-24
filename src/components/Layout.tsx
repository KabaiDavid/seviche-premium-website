import { useEffect, type ReactNode } from 'react';
import { initMotion } from '../lib/motion';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { LogoSymbol } from './Logo';
import { ReserveBar } from './ReserveBar';

export function Layout({ path, overlay = true, children }: { path: string; overlay?: boolean; children: ReactNode }) {
  useEffect(() => initMotion(), []);
  return (
    <>
      <LogoSymbol />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav path={path} overlay={overlay} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ReserveBar />
    </>
  );
}

/** Splits a headline into masked lines for the editorial reveal. */
export function Lines({
  as: Tag = 'h2',
  className = '',
  lines,
  id,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  lines: ReactNode[];
  id?: string;
}) {
  return (
    <Tag className={`lines ${className}`} data-reveal="" id={id}>
      {lines.map((l, i) => (
        <span className="ln" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
