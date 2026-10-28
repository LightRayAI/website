import { copy, figures, institutions } from './content.mjs';
import { asset, esc, origin, projects, relationship, shortName, url } from './model.mjs';

export const arrow = '<span aria-hidden="true">↗</span>';
export const right = '<span aria-hidden="true">→</span>';
export const mark = '<svg class="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 25 18 5M13 27 25 7M4 17 10 7" stroke="currentColor" stroke-width="3"/></svg>';
export const ext = (href, text, className = '') => `<a class="${className}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(text)} ${arrow}</a>`;
export const button = (href, text, secondary = false) => `<a class="button${secondary ? ' button-secondary' : ''}" href="${esc(href)}">${esc(text)} ${right}</a>`;
export const sectionHead = (eyebrow, title, extra = '') => `<div class="section-heading"><div><p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(title)}</h2></div>${extra}</div>`;

export function layout({ lang, page = '', title, description, body, root = false }) {
  const c = copy[lang];
  const paths = ['', 'data', 'research', 'team'];
  const otherLang = lang === 'en' ? 'zh' : 'en';
  const canonical = origin + url(lang, page);
  const pageTitle = `${title} | LightRay AI`;
  const structured = { '@context': 'https://schema.org', '@type': 'ResearchOrganization', name: 'LightRay AI', url: `${origin}/website/`, description: copy.en.intro, sameAs: ['https://github.com/LightRayAI'] };
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageTitle)}</title><meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#f8fafc"><link rel="icon" type="image/svg+xml" href="${asset('favicon.svg')}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en" href="${origin + url('en', page)}"><link rel="alternate" hreflang="zh-CN" href="${origin + url('zh', page)}"><link rel="alternate" hreflang="x-default" href="${origin + url('en', page)}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="LightRay AI"><meta property="og:title" content="${esc(pageTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_US'}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="${asset('styles.css')}"><script src="${asset('client.js')}" defer></script>
  <script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>
</head>
<body data-lang="${lang}"${root ? ' data-root="true"' : ''}>
  <a class="skip-link" href="#main">${c.skip}</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="${url(lang)}" aria-label="LightRay AI · ${c.nav[0]}">${mark}<span>LightRay<span class="brand-ai"> AI</span></span></a>
    <nav class="main-nav" id="main-nav" aria-label="${lang === 'zh' ? '主导航' : 'Main navigation'}">${paths.map((p, i) => `<a href="${url(lang, p)}"${page === p || (p === 'research' && page.startsWith('research/')) ? ' aria-current="page"' : ''}>${c.nav[i]}</a>`).join('')}</nav>
    <div class="header-controls"><a class="language-switch" data-language-switch href="${url(otherLang, page)}" hreflang="${otherLang === 'zh' ? 'zh-CN' : 'en'}" lang="${otherLang}" aria-label="${c.language}"><span aria-hidden="true">◎</span> ${c.langLabel}</a><button class="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="${c.menu}" data-open-label="${c.menu}" data-close-label="${c.close}"><span></span><span></span></button></div>
  </div></header>
  <main id="main" tabindex="-1">${body}</main>
  <footer class="site-footer"><div class="container"><div class="footer-main"><div><a class="brand" href="${url(lang)}">${mark}<span>LightRay<span class="brand-ai"> AI</span></span></a><p>${c.footer}</p></div><nav aria-label="${lang === 'zh' ? '页脚导航' : 'Footer navigation'}">${paths.map((p, i) => `<a href="${url(lang, p)}">${c.nav[i]}</a>`).join('')}</nav><div class="footer-contact"><span class="eyebrow">${c.contact}</span><a href="mailto:stephenshiqiu@gmail.com">stephenshiqiu@gmail.com ${arrow}</a>${ext('https://github.com/LightRayAI', 'GitHub')}</div></div><div class="footer-bottom"><span>© 2026 ${c.rights}</span><span>${c.updated}</span></div></div></footer>
</body></html>`;
}

export function impact(lang) {
  const c = copy[lang];
  return `<section class="impact section-sm" aria-labelledby="impact-heading"><div class="container"><div class="impact-heading"><h2 id="impact-heading">${c.impact}</h2><p>${c.impactNote}</p></div><div class="impact-grid">${c.impacts.map(([value, label, note], i) => `<div class="impact-item"><div class="impact-value${i === 2 ? ' impact-conferences' : ''}">${value}</div><h3>${label}</h3><p>${note}</p></div>`).join('')}</div></div></section>`;
}

export function projectLinks(project, lang, includeRelated = false) {
  const c = copy[lang];
  const labels = { paper: c.paper, github: c.github, website: c.project, journal: c.journal };
  return `<div class="project-links">${Object.entries(labels).filter(([key]) => project.links[key]).map(([key, label]) => ext(project.links[key], label)).join('')}${includeRelated ? project.links.related.map((link, i) => ext(link, `${c.detail.related} ${i + 1}`)).join('') : ''}</div>`;
}

export function metrics(project, lang, limit = 3) {
  return `<dl class="project-metrics">${project.metrics.slice(0, limit).map(m => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label[lang])}</dd></div>`).join('')}</dl>`;
}

export function miniVisual(project, lang) {
  const c = copy[lang];
  if (figures[project.id]) {
    const f = figures[project.id];
    return `<div class="project-visual paper-thumbnail"><img src="${asset(`images/${f.file}`)}" alt="${esc(f.alt[lang])}" loading="lazy" width="900" height="440"></div>`;
  }
  if (project.id === 'phybench') return `<div class="project-visual mini-chart"><span class="visual-label">${lang === 'zh' ? '初始评测 · 2025' : 'INITIAL EVALUATION · 2025'}</span><div><span>Gemini 2.5 Pro</span><div class="chart-track"><i style="width:36.9%"></i></div><strong>36.9%</strong></div><div><span>${lang === 'zh' ? '人类专家' : 'Human experts'}</span><div class="chart-track"><i class="human" style="width:61.9%"></i></div><strong>61.9%</strong></div></div>`;
  if (project.id === 'detailed_balance') return `<div class="project-visual balance-visual"><span class="visual-label">${lang === 'zh' ? '状态转移 · 示意图' : 'STATE TRANSITIONS · SCHEMATIC'}</span><div class="state-diagram"><span class="state">f</span><span class="state-arrows">⇄<small>P(g | f) · P(f | g)</small></span><span class="state">g</span></div><p>${lang === 'zh' ? '从状态转移到有效势函数' : 'From state transitions to an effective potential'}</p></div>`;
  return `<div class="project-visual workflow-mini"><span class="visual-label">${project.id === 'rsi_exam' ? 'RSI-EXAM' : 'PRBENCH'}</span><div>${c.workflows[project.id].filter((_, i) => i !== 2 || project.id !== 'rsi_exam').map((step, i) => `<span><b>${String(i + 1).padStart(2, '0')}</b>${esc(step)}</span>`).join('')}</div></div>`;
}

export function projectCard(project, lang) {
  const c = copy[lang];
  const title = shortName(project, lang);
  return `<article class="project-card" data-project="${project.id}" data-track="${project.track}" data-relationship="${project.relationship}">
    <a class="visual-link" href="${url(lang, `research/${project.id}`)}" aria-label="${esc(title)}">${miniVisual(project, lang)}</a>
    <div class="project-card-body"><div class="project-meta"><span class="badge ${project.relationship === 'team_led' ? 'badge-led' : ''}">${relationship(project, lang)}</span><span>${project.publication[lang].includes('PRX') ? 'PRX Intelligence · 2026' : project.publication[lang].includes('NeurIPS') ? 'NeurIPS · 2025' : '2026'}</span></div>
    <h3><a href="${url(lang, `research/${project.id}`)}">${esc(title)} ${right}</a></h3><p class="project-teaser">${esc(project.teaser[lang])}</p>
    ${metrics(project, lang, 2)}
    ${project.metrics.length < 2 ? `<p class="card-highlight">${esc(project.highlights[1][lang])}</p>` : ''}
    ${project.id === 'autoresearchclaw' ? `<p class="metric-scope">${lang === 'zh' ? '54.7% 增益基于原始 25 个机器学习课题；55 题为后续扩展版本。' : '54.7% gain: original 25 ML topics. The 55-topic release is a later extension.'}</p>` : ''}
    <div class="card-bottom">${projectLinks(project, lang)}<a class="text-link" href="${url(lang, `research/${project.id}`)}">${c.readProject} ${right}</a></div></div>
  </article>`;
}

export function contactBand(lang, title, text, cta) {
  return `<section class="contact-band section"><div class="container contact-inner"><div><p class="eyebrow">${copy[lang].contact}</p><h2>${esc(title)}</h2><p>${esc(text)}</p></div>${button('mailto:stephenshiqiu@gmail.com', cta)}</div></section>`;
}

export function institutionList(lang) {
  return `<ul class="institution-list">${institutions.map(i => `<li>${esc(i[lang])}</li>`).join('')}</ul>`;
}

export function pageHero(eyebrow, title, intro) {
  return `<section class="page-hero"><div class="container"><p class="eyebrow"><span class="blue-dot" aria-hidden="true"></span>${esc(eyebrow)}</p><h1>${title.split('\n').map(esc).join('<br>')}</h1><p class="lead">${esc(intro)}</p></div></section>`;
}

export function researchJourney(lang) {
  const c = copy[lang].research;
  const node = id => { const p = projects.find(project => project.id === id); return `<a class="journey-node" href="${url(lang, `research/${id}`)}"><strong>${esc(shortName(p, lang))}</strong><span>${c.nodeLabels[id]}</span>${right}</a>`; };
  return `<section class="journey section"><div class="container">${sectionHead(c.journey, c.journeyTitle)}<div class="journey-row"><h3>${c.agentLine}</h3><div>${node('collideragent')}${node('autoresearchclaw')}</div></div><div class="journey-row"><h3>${c.theoryLine}</h3><div>${node('detailed_balance')}</div></div><div class="journey-row"><h3>${c.evaluationLine}</h3><div>${node('phybench')}${node('prbench')}${node('rsi_exam')}</div></div></div></section>`;
}
