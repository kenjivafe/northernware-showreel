// Lets the showreel drive a page frame by frame (?video). On a normal visit the page runs live.
(function () {
  const q = new URLSearchParams(location.search);
  window.VIDEO = q.has('video');
  window.cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  window.spring = (tau, f = 2.2, z = 0.5) => {
    if (tau <= 0) return 0;
    const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * tau) * (Math.cos(wd * tau) + ((z * w) / wd) * Math.sin(wd * tau));
  };
  window.SC = {
    set(s = {}) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, s.scroll || 0);
      if (window.act) window.act(s);
    },
    rect(sel) { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; },
    top(sel) { const e = document.querySelector(sel); return e ? e.getBoundingClientRect().top + window.scrollY : 0; },
  };
  if (!window.VIDEO) {
    const t0 = performance.now();
    const loop = (n) => { if (window.act) window.act({ t: (n - t0) / 1000, live: true }); requestAnimationFrame(loop); };
    addEventListener('DOMContentLoaded', () => requestAnimationFrame(loop));
  }
})();
