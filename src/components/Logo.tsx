import { LOGO_PATH, LOGO_VIEWBOX } from '../data/logo';

/** The wordmark path is emitted once per page as a <symbol>; every logo
 * instance references it, keeping HTML small. */
export function LogoSymbol() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="seviche-logo" viewBox={LOGO_VIEWBOX}>
        <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
      </symbol>
    </svg>
  );
}

export function Logo({ title = 'Seviche' }: { title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} role="img" aria-label={title} focusable="false">
      <use href="#seviche-logo" />
    </svg>
  );
}
