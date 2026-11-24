// Lightweight motion runtime: one IntersectionObserver for reveals, one rAF
// loop for parallax. No animation library needed.
export function initMotion(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  let io: IntersectionObserver | undefined;
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    // Masked elements (clip-path: inset(100%)) never "intersect" in Chrome, so
    // we observe their parent and reveal the children registered against it.
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of revealEls) {
      const t = el.dataset.reveal === 'mask' && el.parentElement ? el.parentElement : el;
      targets.set(t, [...(targets.get(t) || []), el]);
    }
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            targets.get(e.target)?.forEach((el) => el.classList.add('is-in'));
            io!.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    targets.forEach((_, t) => io!.observe(t));
  }

  // Parallax: element moves by (speed * distance from viewport centre)
  const px = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  let raf = 0;
  const visible = new Set<HTMLElement>();
  let pio: IntersectionObserver | undefined;
  const tick = () => {
    raf = 0;
    const vh = window.innerHeight;
    visible.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0');
      const host = (el.closest('.img') as HTMLElement) || el.parentElement!;
      const r = host.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(${1 + Math.abs(speed) * 2.6})`;
    });
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };
  if (!reduce && px.length) {
    // observe the image's container (not the clipped image box itself)
    const hostOf = new Map<Element, HTMLElement>();
    px.forEach((el) => hostOf.set((el.closest('.img') as HTMLElement)?.parentElement || el.parentElement || el, el));
    pio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const el = hostOf.get(e.target)!;
        if (e.isIntersecting) visible.add(el);
        else visible.delete(el);
      });
      onScroll();
    });
    hostOf.forEach((_, h) => pio!.observe(h));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }
  return () => {
    io?.disconnect();
    pio?.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
  };
}
