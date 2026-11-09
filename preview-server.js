const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const candidate = path.resolve(root, `.${urlPath === '/' ? '/portafolio/' : urlPath}`);
  if (!candidate.startsWith(root + path.sep) && candidate !== root) { res.writeHead(403).end('Forbidden'); return; }
  const file = fs.existsSync(candidate) && fs.statSync(candidate).isDirectory() ? path.join(candidate, 'index.html') : candidate;
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
  fs.createReadStream(file).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173/portafolio/'));
