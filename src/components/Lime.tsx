import { useEffect, useRef, useState } from 'react';
import { FRAG, VERT } from '../lib/limeShader';

/** Interactive WebGL lime slice. Lazy: initialises only when scrolled near,
 * renders only while visible, static for reduced motion, image fallback. */
export function Lime() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current!;
    let cleanup = () => {};
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        cleanup = start();
      },
      { rootMargin: '300px' },
    );
    io.observe(host);
    return () => {
      io.disconnect();
      cleanup();
    };

    function start() {
      const canvas = canvasRef.current!;
      const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true });
      if (!gl) return () => {};
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
        return s;
      };
      let prog: WebGLProgram;
      try {
        prog = gl.createProgram()!;
        gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
      } catch {
        return () => {};
      }
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, 'uRes');
      const uTime = gl.getUniformLocation(prog, 'uTime');
      const uTilt = gl.getUniformLocation(prog, 'uTilt');
      const uLight = gl.getUniformLocation(prog, 'uLight');

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2);
      const resize = () => {
        const r = canvas.getBoundingClientRect();
        canvas.width = Math.round(r.width * dpr);
        canvas.height = Math.round(r.height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      };
      const onLeave = () => {
        target.x = 0;
        target.y = 0;
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', onLeave);

      let visible = true;
      const vio = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
      });
      vio.observe(host);

      let raf = 0;
      const t0 = performance.now();
      const draw = (t: number) => {
        cur.x += (target.x - cur.x) * 0.06;
        cur.y += (target.y - cur.y) * 0.06;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uTilt, Math.sin(t * 0.25) * 0.22 + cur.x * 0.45, 0.5 + Math.cos(t * 0.21) * 0.07 + cur.y * 0.28);
        gl.uniform2f(uLight, -0.6 + cur.x * 1.2, 0.8 - cur.y * 1.2);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      const frame = (now: number) => {
        raf = 0;
        if (!visible || document.hidden) return;
        draw((now - t0) / 1000);
        raf = requestAnimationFrame(frame);
      };
      if (reduce) draw(4);
      else raf = requestAnimationFrame(frame);
      const onVis = () => !document.hidden && visible && !raf && !reduce && (raf = requestAnimationFrame(frame));
      document.addEventListener('visibilitychange', onVis);
      setReady(true);
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        vio.disconnect();
        window.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVis);
      };
    }
  }, []);

  return (
    <div className={`lime ${ready ? 'is-ready' : ''}`} ref={hostRef} aria-hidden="true">
      <img className="lime__fallback" src="/img/lime.webp" alt="" width={640} height={640} loading="lazy" decoding="async" />
      <canvas ref={canvasRef} className="lime__canvas" />
      <div className="lime__shadow" />
    </div>
  );
}
