import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync, watch } from 'node:fs';
import { resolve, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const port = Number(process.env.PORT || 4173);
const base = (process.env.BASE_PATH || '/website').replace(/\/$/, '');
const root = resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain', '.woff2': 'font/woff2' };
const build = () => spawnSync(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
if (!existsSync(root) || process.argv.includes('--watch')) build();
if (process.argv.includes('--watch')) {
  let timer;
  for (const path of ['src', 'public', 'team_projects_zh_en.json']) watch(path, { recursive: true }, () => {
    clearTimeout(timer); timer = setTimeout(build, 100);
  });
}
createServer((req, res) => {
  try {
    const parsed = new URL(req.url, 'http://localhost');
    let path = decodeURIComponent(parsed.pathname);
    if (path === '/' && base) { res.writeHead(302, { Location: `${base}/` }); res.end(); return; }
    if (path === base) { res.writeHead(301, { Location: `${base}/${parsed.search}` }); res.end(); return; }
    if (base && !path.startsWith(`${base}/`)) throw new Error('Not found');
    path = path.slice(base.length);
    let file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(`${root}/`)) throw new Error('Not found');
    if (statSync(file).isDirectory()) {
      if (!parsed.pathname.endsWith('/')) { res.writeHead(301, { Location: `${parsed.pathname}/${parsed.search}` }); res.end(); return; }
      file = resolve(file, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(readFileSync(resolve(root, '404.html')));
  }
}).listen(port, '127.0.0.1', () => console.log(`LightRay preview: http://127.0.0.1:${port}${base}/`));
