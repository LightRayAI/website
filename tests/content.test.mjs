import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { load } from 'cheerio';

const data = JSON.parse(readFileSync('team_projects_zh_en.json', 'utf8'));
const published = data.projects.filter(p => p.description.en && p.description.zh);
const html = path => load(readFileSync(`dist/${path}/index.html`, 'utf8'));

test('build publishes both languages and only the six complete projects', () => {
  assert.equal(published.length, 6);
  for (const lang of ['en', 'zh']) {
    for (const page of ['', '/data', '/research', '/team']) {
      assert.ok(existsSync(`dist/${lang}${page}/index.html`), `${lang}${page} is missing`);
    }
    for (const p of published) assert.ok(existsSync(`dist/${lang}/research/${p.id}/index.html`));
    assert.ok(!existsSync(`dist/${lang}/research/loop_diagrams/index.html`));
  }
});

test('research order and attribution match the approved brief', () => {
  for (const lang of ['en', 'zh']) {
    const $ = html(`${lang}/research`);
    assert.deepEqual($('[data-project]').map((_, el) => $(el).attr('data-project')).get(),
      ['collideragent', 'autoresearchclaw', 'detailed_balance', 'phybench', 'prbench', 'rsi_exam']);
    for (const p of published) assert.equal($(`[data-project="${p.id}"]`).attr('data-relationship'), p.relationship);
  }
});

test('every detail retains the complete localized descriptions, results, credits and links', () => {
  for (const lang of ['en', 'zh']) for (const p of published) {
    const $ = html(`${lang}/research/${p.id}`);
    assert.equal($('[data-full-description]').text().replace(/\s+/g, ' ').trim(), p.description[lang].replace(/\s+/g, ' ').trim());
    for (const highlight of p.highlights) assert.ok($('main').text().includes(highlight[lang]));
    if (p.credits[lang]) assert.ok($('main').text().includes(p.credits[lang]));
    for (const metric of p.metrics) {
      assert.ok($('main').text().includes(metric.value));
      assert.ok($('main').text().includes(metric.label[lang]));
    }
    const links = $('a').map((_, el) => $(el).attr('href')).get();
    for (const url of Object.values(p.links).flat().filter(Boolean)) assert.ok(links.includes(url), `${p.id}: missing ${url}`);
    assert.equal($('html').attr('lang'), lang === 'zh' ? 'zh-CN' : 'en');
    assert.equal($('[data-language-switch]').attr('href'), `/website/${lang === 'en' ? 'zh' : 'en'}/research/${p.id}/`);
  }
});

test('all generated local links, images and styles resolve under the deployment base', () => {
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
  for (const file of walk('dist').filter(f => f.endsWith('.html'))) {
    const $ = load(readFileSync(file, 'utf8'));
    assert.equal($('h1').length, 1, `${file}: exactly one heading`);
    for (const el of $('[href], [src]').toArray()) {
      const url = $(el).attr('href') || $(el).attr('src');
      if (!url || /^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
      const path = url.split(/[?#]/)[0];
      const dest = path.startsWith('/website/') ? resolve('dist', path.slice(9)) : resolve(dirname(file), path);
      assert.ok(existsSync(dest), `${file}: broken local link ${url}`);
    }
    assert.ok(!$('main').text().includes('Loop-Diagram Calculations'));
    assert.ok(!$('main').text().includes('圈图计算'));
  }
});

test('team representative publications include authentic figures and direct source links', () => {
  for (const lang of ['en', 'zh']) {
    const $ = html(`${lang}/team`);
    assert.equal($('.publication-card').length, 4);
    for (const id of ['phybench', 'prbench', 'collideragent', 'autoresearchclaw']) {
      const project = published.find(p => p.id === id);
      const card = $(`[data-publication="${id}"]`);
      assert.equal(card.find('img').length, 1, `${id} needs its real research figure`);
      assert.ok(card.find('img').attr('alt').length > 20);
      const links = card.find('a').map((_, el) => $(el).attr('href')).get();
      assert.ok(links.includes(project.links.paper), `${id} needs a direct paper link`);
      if (project.links.github) assert.ok(links.includes(project.links.github));
      assert.ok(links.includes(`/website/${lang}/research/${id}/`));
    }
  }
});

test('data page presents four distinct offerings with brief examples and a results-free trajectory example', () => {
  for (const lang of ['en', 'zh']) {
    const $ = html(`${lang}/data`);
    assert.deepEqual($('[data-offering]').map((_, el) => $(el).attr('data-offering')).get(), ['reasoning', 'agentic', 'trajectories', 'rsi']);
    assert.equal($('[data-task-example="ready"]').length, 4);
    const trajectory = $(`[data-offering="trajectories"] [data-example-locale="${lang}"]`);
    assert.ok(trajectory.find('.example-brief').text().includes('O(N)×O(2)'));
    assert.doesNotMatch(trajectory.text(), /astra|N_c|\d\.\d|REPORT|\/Users\//);
    assert.ok($('[data-offering="reasoning"] .example-brief').text().includes('Majorana'));
    assert.ok($('[data-offering="rsi"] .example-brief').text().includes('DMRG'));
    assert.ok($('[data-offering="rsi"]').text().includes('SOTA'));
    assert.ok($('[data-offering="agentic"]').text().includes('PRBench'));
    assert.ok($('[data-offering="agentic"]').text().includes('Terminal-Bench-Science'));
    assert.equal($('.data-principles article').length, 4);
    assert.ok(!$('main').text().includes('/home/shiqiu/'));
    assert.ok(!$('main').text().includes('answer.json'));
  }
});

test('competition achievements are collective, IPhO-only, and the team still shows two core members and the chief scientist', () => {
  for (const lang of ['en', 'zh']) {
    const $ = html(`${lang}/team`);
    const story = $('.team-prose').text();
    assert.ok(story.includes('IPhO'));
    assert.ok(!story.includes(lang === 'zh' ? '第四名' : 'fourth-place'));
    assert.equal($('.person-identity').length, 3);
    assert.ok(!$('.person-featured').text().includes('IPhO'));
    assert.ok(!$('main').text().includes('宋卓洋'));
  }
});
