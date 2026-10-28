import { copy, figures } from './content.mjs';
import { asset, esc, projects, relationship, shortName, source, trackName, url } from './model.mjs';
import { arrow, button, contactBand, ext, impact, institutionList, layout, metrics, pageHero, projectCard, projectLinks, researchJourney, right, sectionHead } from './components.mjs';

export function homePage(lang, root = false) {
  const c = copy[lang];
  const body = `<section class="home-hero"><div class="container"><p class="eyebrow"><span class="blue-dot" aria-hidden="true"></span>${c.eyebrow}</p><h1>${c.mission[0]}<br><span>${c.mission[1]}</span></h1><div class="hero-bottom"><div><p class="lead">${c.intro}</p><div class="actions">${button(url(lang, 'data'), c.dataCta)}${button(url(lang, 'research'), c.researchCta, true)}</div></div><div class="hero-index" aria-hidden="true"><span>01 <b>AI for Science</b></span><span>02 <b>Physics of AI</b></span><span>03 <b>AI Evaluation</b></span></div></div></div></section>
  ${impact(lang)}
  <section class="data-intro section"><div class="container split-intro"><div><p class="eyebrow">${c.dataBandTag}</p><h2>${c.dataBandTitle}</h2></div><div><p class="lead-small">${c.dataBandText}</p><a class="text-link" href="${url(lang, 'data')}">${c.dataCta} ${right}</a><div class="data-tags">${(lang === 'zh' ? ['科学推理', '科研任务', '可执行验证'] : ['Scientific reasoning', 'Research tasks', 'Executable verification']).map(t => `<span>${t}</span>`).join('')}</div></div></div></section>
  <section class="research-intro section"><div class="container">${sectionHead(c.nav[2], c.homeResearchTitle)}<p class="section-intro">${c.homeResearchText}</p><div class="track-grid">${c.tracks.map((track, i) => `<a class="track-card" href="${url(lang, 'research')}?track=${i + 1}"><div class="track-top"><span class="index-number">0${i + 1}</span>${arrow}</div><h3>${track.title}</h3><p class="track-subtitle">${track.subtitle}</p><p>${track.description}</p></a>`).join('')}</div></div></section>
  <section class="section"><div class="container">${sectionHead(c.selected, c.selectedTitle, `<a class="text-link" href="${url(lang, 'research')}">${c.viewAll} ${right}</a>`)}<div class="project-grid">${projects.filter(p => p.track === 1).map(p => projectCard(p, lang)).join('')}</div></div></section>
  <section class="team-intro section"><div class="container"><div class="split-intro"><div><p class="eyebrow">${c.teamBandTag}</p><h2>${c.teamBandTitle}</h2></div><div><p class="lead-small">${c.teamBandText}</p><a class="text-link" href="${url(lang, 'team')}">${c.teamCta} ${right}</a></div></div><p class="small-label">${c.team.backgrounds}</p>${institutionList(lang)}</div></section>`;
  return layout({ lang, title: lang === 'zh' ? '以 AI 推进科学，以科学理解 AI' : 'Advance Science with AI', description: c.intro, body, root });
}

export function dataPage(lang) {
  const c = copy[lang], d = c.data;
  const body = `${pageHero(d.eyebrow, d.title, d.intro)}
  <section class="section"><div class="container">${sectionHead(d.capabilities, d.capabilitiesTitle)}<div class="capability-grid">${d.products.map(p => `<article class="capability"><span class="index-number">${p.number}</span><h3>${p.title}</h3><p>${p.text}</p><ul class="check-list">${p.items.map(item => `<li>${item}</li>`).join('')}</ul></article>`).join('')}</div></div></section>
  <section class="pipeline-section section"><div class="container">${sectionHead(d.pipelineLabel, d.pipelineTitle)}<ol class="pipeline">${d.pipeline.map(([title, text], i) => `<li><span class="pipeline-number">${String(i + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol></div></section>
  <section class="section"><div class="container split-intro delivery"><div><p class="eyebrow">${lang === 'zh' ? '交付内容' : 'DELIVERABLES'}</p><h2>${d.deliverables}</h2><p>${d.deliverablesText}</p></div><dl class="delivery-list">${d.deliveryItems.map(([title, text]) => `<div><dt>${title}</dt><dd>${text}</dd></div>`).join('')}</dl></div></section>
  <section class="section-sm foundation"><div class="container"><h2>${d.foundation}</h2><p>${d.foundationText}</p><div class="foundation-links">${['phybench', 'prbench', 'collideragent', 'rsi_exam'].map(id => { const p = projects.find(p => p.id === id); return `<a href="${url(lang, `research/${id}`)}">${shortName(p, lang)} ${arrow}</a>`; }).join('')}</div></div></section>
  ${contactBand(lang, d.contactTitle, d.contactText, d.contactCta)}`;
  return layout({ lang, page: 'data', title: c.nav[1], description: d.intro, body });
}

export function researchPage(lang) {
  const c = copy[lang], r = c.research;
  const body = `${pageHero(r.eyebrow, r.title, r.intro)}<section class="research-list section" data-research-list><div class="container">
    <div class="research-filters" data-filters hidden><div class="track-filters" role="group" aria-label="${r.trackFilter}"><button data-filter-track="all" aria-pressed="true">${r.all}</button>${source.site.tracks.map(t => `<button data-filter-track="${t.id}" aria-pressed="false">${t.name[lang]}</button>`).join('')}</div><div class="relationship-filter"><label for="relationship-filter">${r.relationship}</label><select id="relationship-filter"><option value="all">${r.allRelations}</option>${source.site.relationships.map(relation => `<option value="${relation.id}">${relation.label[lang]}</option>`).join('')}</select></div></div>
    <p class="result-count" data-result-count aria-live="polite" data-unit="${r.count}" hidden></p><div class="empty-state" data-empty-state hidden><p>${r.empty}</p><button class="button" data-reset-filters>${r.reset}</button></div>
    ${c.tracks.map((t, i) => `<section class="research-group" data-research-group="${i + 1}" aria-labelledby="track-${i + 1}"><div class="research-group-heading"><span class="index-number">0${i + 1}</span><div><h2 id="track-${i + 1}">${t.title}</h2><p>${t.detail}</p></div></div><div class="project-grid${i === 1 ? ' project-grid-single' : ''}">${projects.filter(p => p.track === i + 1).map(p => projectCard(p, lang)).join('')}</div></section>`).join('')}
    </div></section>${researchJourney(lang)}`;
  return layout({ lang, page: 'research', title: c.nav[2], description: r.intro, body });
}

export function teamPage(lang) {
  const c = copy[lang], t = c.team;
  const selected = ['phybench', 'prbench', 'collideragent', 'autoresearchclaw'].map(id => projects.find(p => p.id === id));
  const body = `${pageHero(t.eyebrow, t.title, t.intro)}<section class="section team-story"><div class="container"><div class="team-prose">${t.paragraphs.map(p => `<p>${p}</p>`).join('')}</div><div class="affiliations"><div><p class="small-label">${t.backgrounds}</p>${institutionList(lang)}</div><div><p class="small-label">${t.collaborations}</p><ul class="institution-list"><li>${lang === 'zh' ? '麻省理工学院' : 'MIT'}</li><li>${lang === 'zh' ? '斯坦福大学' : 'Stanford University'}</li></ul></div></div></div></section>
  ${impact(lang)}
  <section class="section"><div class="container">${sectionHead(t.eyebrow, t.people)}<article class="person-featured"><div class="person-identity"><img class="portrait" src="${asset('images/shi-qiu.png')}" alt="${lang === 'zh' ? '仇是肖像' : 'Portrait of Shi Qiu'}" width="512" height="512" loading="lazy"><h3>${t.shi.name} <span>${t.shi.otherName}</span></h3><p class="person-position">${t.shi.position}</p><p>${t.shi.institution}</p><div class="person-links">${ext('https://stephenqsstarthomas.github.io/', t.shi.homepage)}${ext('https://github.com/StephenQSstarThomas', 'GitHub')}</div></div><div class="person-detail"><div class="interest-tags">${t.shi.interests.map(i => `<span>${i}</span>`).join('')}</div><p>${t.shi.bio}</p><p>${t.shi.contributions}</p><h4>${t.shi.publications}</h4><ul class="publication-list">${selected.map(p => `<li><a href="${url(lang, `research/${p.id}`)}"><strong>${shortName(p, lang)}</strong><span>${esc(p.title[lang].split(/[|｜]/)[1].trim())}</span>${arrow}</a><small>${esc(p.publication[lang])}</small></li>`).join('')}</ul></div></article><div class="people-grid">${[['song', 'detailed_balance', 'ZS'], ['wang', 'rsi_exam', 'BW']].map(([key, id, initials]) => `<article class="person-compact"><div class="person-heading"><span class="initials" aria-hidden="true">${initials}</span><div><h3>${t[key].name} <span>${t[key].otherName}</span></h3><p class="small-label">${t[key].area}</p></div></div><p>${t[key].bio}</p><a class="text-link" href="${url(lang, `research/${id}`)}">${t[key].link} ${right}</a></article>`).join('')}</div></div></section>
  ${contactBand(lang, t.contactTitle, t.contactText, t.contactCta)}`;
  return layout({ lang, page: 'team', title: c.nav[3], description: t.intro, body });
}

export function projectPage(lang, p) {
  const c = copy[lang], d = c.detail;
  const f = figures[p.id];
  const relatedIds = { collideragent: ['autoresearchclaw', 'prbench'], autoresearchclaw: ['collideragent', 'rsi_exam'], phybench: ['prbench', 'rsi_exam'], prbench: ['phybench', 'collideragent'], rsi_exam: ['autoresearchclaw', 'prbench'], detailed_balance: ['autoresearchclaw', 'collideragent'] };
  const body = `<section class="project-hero"><div class="container"><a class="back-link" href="${url(lang, 'research')}">← ${d.back}</a><div class="project-meta"><span class="eyebrow">${trackName(p, lang)}</span><span class="badge ${p.relationship === 'team_led' ? 'badge-led' : ''}">${relationship(p, lang)}</span></div><h1>${esc(shortName(p, lang))}</h1><p class="project-subtitle">${esc(p.title[lang].split(/[|｜]/)[1].trim())}</p><p class="lead">${esc(p.teaser[lang])}</p>${projectLinks(p, lang)}</div></section>
  <div class="container project-detail-layout"><aside class="detail-sidebar"><span class="eyebrow">${lang === 'zh' ? '项目目录' : 'IN THIS PROJECT'}</span><nav aria-label="${lang === 'zh' ? '项目目录' : 'Project sections'}">${[['overview', d.overview], ['results', d.results], ['methods', d.methods], ...(f ? [['figure', d.figure]] : []), ['resources', d.sources]].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav><div class="sidebar-publication"><span class="small-label">${lang === 'zh' ? '发表信息' : 'PUBLICATION'}</span><p>${esc(p.publication[lang])}</p></div></aside>
  <article class="detail-article"><section id="overview"><h2>${d.overview}</h2><p class="full-description" data-full-description>${esc(p.description[lang])}</p></section><section id="results"><h2>${d.results}</h2>${metrics(p, lang)}<p class="scope-note">${c.scopes[p.id]}</p><h3>${d.highlights}</h3><ul class="highlight-list">${p.highlights.map(h => `<li>${esc(h[lang])}</li>`).join('')}</ul></section><section id="methods"><h2>${d.methods}</h2><figure class="method-figure"><ol class="method-flow">${c.workflows[p.id].map((step, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${esc(step)}</li>`).join('')}</ol><figcaption>${d.schematic}</figcaption></figure><p>${d.fullPaper}</p></section>
  ${f ? `<section id="figure"><h2>${d.figure}</h2><figure class="paper-figure"><a href="${asset(`images/${f.file}`)}" target="_blank" rel="noopener noreferrer" aria-label="${d.openFigure}"><img src="${asset(`images/${f.file}`)}" alt="${esc(f.alt[lang])}" loading="lazy" width="1200" height="650"></a><figcaption>${c.originalFigure}<br>${c.figureCredit}: ${ext(f.source, f.credit)}</figcaption></figure></section>` : ''}
  ${p.credits[lang] ? `<section class="contribution-note"><h2>${d.credits}</h2><p>${esc(p.credits[lang])}</p></section>` : ''}
  <section id="resources"><h2>${d.sources}</h2><p>${esc(p.publication[lang])}</p>${projectLinks(p, lang, true)}</section></article></div>
  <section class="connected-research section"><div class="container">${sectionHead(c.nav[2], d.connections)}<div class="connected-grid">${relatedIds[p.id].map(id => { const related = projects.find(p => p.id === id); return `<a class="connected-card" href="${url(lang, `research/${id}`)}"><span class="eyebrow">${trackName(related, lang)}</span><h3>${shortName(related, lang)} ${right}</h3><p>${esc(related.teaser[lang])}</p></a>`; }).join('')}</div></div></section>`;
  return layout({ lang, page: `research/${p.id}`, title: p.title[lang], description: p.teaser[lang], body });
}

export function notFoundPage() {
  const c = copy.en;
  return layout({ lang: 'en', title: 'Page not found', body: `<section class="page-hero not-found"><div class="container"><p class="eyebrow">404</p><h1>${c.notFound}</h1><p class="lead">${c.notFoundText}</p><div class="actions">${button(url('en'), c.backHome)}${button(url('zh'), '返回中文首页', true)}</div></div></section>`, description: c.notFoundText });
}
