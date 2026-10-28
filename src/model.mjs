import { readFileSync } from 'node:fs';

export const source = JSON.parse(readFileSync(new URL('../team_projects_zh_en.json', import.meta.url), 'utf8'));
export const projects = source.projects
  .filter(project => project.description.en.trim() && project.description.zh.trim())
  .sort((a, b) => a.track - b.track || a.order - b.order);
export const base = (process.env.BASE_PATH || '/website').replace(/\/$/, '');
export const origin = 'https://lightrayai.github.io';
export const url = (lang, page = '') => `${base}/${lang}/${page ? `${page}/` : ''}`;
export const assetVersion = Date.now().toString(36);
export const asset = path => `${base}/${path}${['styles.css', 'client.js'].includes(path) ? `?v=${assetVersion}` : ''}`;
export const esc = text => String(text ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const shortName = (project, lang) => project.title[lang].split(/[|｜]/)[0].trim();
export const relationship = (project, lang) => source.site.relationships.find(item => item.id === project.relationship).label[lang];
export const trackName = (project, lang) => source.site.tracks.find(item => item.id === project.track).name[lang];
