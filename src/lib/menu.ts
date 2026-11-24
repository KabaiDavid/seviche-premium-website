import menu from '../data/menu.json';

export type MenuItem = { name: string; desc?: string; price?: string };
export type MenuSection = { title: string; note?: string; items: MenuItem[] };
export type MenuTab = { id: string; label: string; sections: MenuSection[] };

export const MENU = menu as MenuTab[];

export function findDish(name: string, tab = 'main'): MenuItem {
  const t = MENU.find((m) => m.id === tab)!;
  for (const s of t.sections) {
    const key = (n: string) => n.toLowerCase().replace(/\*/g, '').trim();
    const hit = s.items.find((i) => key(i.name) === key(name));
    if (hit) return hit;
  }
  throw new Error(`Dish not on menu: ${name}`);
}

export function sectionOf(tab: string, title: string): MenuSection {
  return MENU.find((m) => m.id === tab)!.sections.find((s) => s.title === title)!;
}

export const countItems = (tab: string) =>
  MENU.find((m) => m.id === tab)!.sections.reduce((n, s) => n + s.items.length, 0);

/** "Sea Scallops*" → { name: "Sea Scallops", raw: true } (* = consumed raw/undercooked notice) */
export function cleanName(name: string) {
  const raw = /\*$/.test(name.trim());
  return { name: name.replace(/\*+$/, '').trim(), raw };
}
