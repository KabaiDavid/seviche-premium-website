// Minimal static server mirroring Cloudflare Pages routing (for local QA).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const tries = [url, url + '.html', path.join(url, 'index.html')];
    for (const t of tries) {
      const f = path.join(root, t);
      if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) {
        const stat = fs.statSync(f);
        const type = types[path.extname(f)] || 'application/octet-stream';
        const range = req.headers.range;
        if (range && type === 'video/mp4') {
          const [s, e] = range.replace('bytes=', '').split('-');
          const start = Number(s), end = e ? Number(e) : stat.size - 1;
          res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
          return fs.createReadStream(f, { start, end }).pipe(res);
        }
        if (/text|javascript|svg|json|xml/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) {
          res.writeHead(200, { 'Content-Type': type, 'Content-Encoding': 'gzip' });
          return fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res);
        }
        res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' });
        return fs.createReadStream(f).pipe(res);
      }
    }
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(root, '404.html')).pipe(res);
  })
  .listen(port, () => console.log(`http://localhost:${port}`));
