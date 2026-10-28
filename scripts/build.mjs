import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { assetVersion, base, origin, projects, url } from '../src/model.mjs';
import { dataPage, homePage, notFoundPage, projectPage, researchPage, teamPage } from '../src/pages.mjs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
cpSync('src/styles.css', 'dist/styles.css');
cpSync('src/client.js', 'dist/client.js');
const write = (path, content) => { mkdirSync(dirname(`dist/${path}`), { recursive: true }); writeFileSync(`dist/${path}`, content); };
const routes = ['', 'data', 'research', 'team', ...projects.map(p => `research/${p.id}`)];
for (const lang of ['en', 'zh']) {
  write(`${lang}/index.html`, homePage(lang));
  write(`${lang}/data/index.html`, dataPage(lang));
  write(`${lang}/research/index.html`, researchPage(lang));
  write(`${lang}/team/index.html`, teamPage(lang));
  for (const project of projects) write(`${lang}/research/${project.id}/index.html`, projectPage(lang, project));
}
write('index.html', homePage('en', true));
write('404.html', notFoundPage());
write('.nojekyll', '');
write('version.json', JSON.stringify({ version: assetVersion }));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}${base}/sitemap.xml\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes.flatMap(route => ['en', 'zh'].map(lang => `<url><loc>${origin + url(lang, route)}</loc><xhtml:link rel="alternate" hreflang="en" href="${origin + url('en', route)}"/><xhtml:link rel="alternate" hreflang="zh-CN" href="${origin + url('zh', route)}"/></url>`)).join('')}</urlset>\n`);
console.log(`Built 22 HTML pages, including ${projects.length} complete projects in both languages. Base: ${base}/`);
