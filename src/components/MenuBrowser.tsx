import { useEffect, useMemo, useRef, useState } from 'react';
import { MENU, type MenuItem } from '../lib/menu';

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Fast, accessible menu: tabs (deep-linkable via #id), instant search across
 * every list, and plain semantic markup for crawlers (all tabs are in the HTML). */
export function MenuBrowser() {
  const [active, setActive] = useState(MENU[0].id);
  const [q, setQ] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (MENU.some((m) => m.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  // keep the active tab scrolled into view in the horizontal tab bar
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const select = (id: string, focus = false) => {
    setActive(id);
    setQ('');
    history.replaceState(null, '', `#${id}`);
    if (focus) tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${id}"]`)?.focus();
    const top = panelTop.current;
    if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: 'smooth' });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = MENU.length - 1;
    const map: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
    if (e.key in map) {
      e.preventDefault();
      select(MENU[map[e.key]].id, true);
    }
  };

  const results = useMemo(() => {
    const term = norm(q.trim());
    if (term.length < 2) return null;
    const out: { tab: string; section: string; item: MenuItem }[] = [];
    for (const t of MENU)
      for (const s of t.sections)
        for (const item of s.items)
          if (norm(`${item.name} ${item.desc || ''} ${s.title}`).includes(term)) out.push({ tab: t.label, section: s.title, item });
    return out;
  }, [q]);

  return (
    <div className="menu-browser" ref={panelTop}>
      <div className="menu-bar">
        <div className="wrap menu-bar__inner">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories" ref={tabsRef}>
            {MENU.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                data-tab={t.id}
                aria-selected={!results && active === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => select(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className="menu-tab"
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="menu-search">
            <span className="sr-only">Search the menu</span>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" />
            </svg>
            <input
              type="search"
              placeholder="Search dishes, wine, bourbon…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
              enterKeyHint="search"
            />
          </label>
        </div>
      </div>

      <div className="wrap menu-body">
        {results ? (
          <section aria-live="polite" className="menu-results">
            <h2 className="h3">
              {results.length} {results.length === 1 ? 'result' : 'results'} for “{q.trim()}”
            </h2>
            {results.length ? (
              <ul className="menu-items" role="list">
                {results.map((r, i) => (
                  <li key={i} className="menu-item">
                    <div className="menu-item__head">
                      <span className="menu-item__name">{r.item.name}</span>
                      <span className="menu-item__dots" aria-hidden="true" />
                      {r.item.price && <span className="menu-item__price">{r.item.price}</span>}
                    </div>
                    {r.item.desc && <p className="menu-item__desc">{r.item.desc}</p>}
                    <p className="menu-item__where">
                      {r.tab} · {r.section}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted-light">Nothing matches that — try another ingredient or spirit, or ask your server.</p>
            )}
          </section>
        ) : (
          MENU.map((t) => (
            <section
              key={t.id}
              id={`panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${t.id}`}
              hidden={active !== t.id}
              className="menu-panel"
            >
              <h2 className="sr-only">{t.label}</h2>
              <div className={`menu-sections ${t.sections.some((s) => s.items.length > 30) ? 'menu-sections--long' : ''}`}>
                {t.sections.map((s) => (
                  <div className="menu-section" key={s.title}>
                    <h3 className="menu-section__title">{s.title}</h3>
                    {s.note && <p className="menu-section__note">{s.note}</p>}
                    <ul className="menu-items" role="list">
                      {s.items.map((item, i) => (
                        <li key={item.name + i} className="menu-item">
                          <div className="menu-item__head">
                            <span className="menu-item__name">{item.name}</span>
                            <span className="menu-item__dots" aria-hidden="true" />
                            {item.price && <span className="menu-item__price">{item.price}</span>}
                          </div>
                          {item.desc && <p className="menu-item__desc">{item.desc}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
