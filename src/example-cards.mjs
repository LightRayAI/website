import katex from 'katex';
import { dataBusiness } from './data-business.mjs';
import { esc } from './model.mjs';

function examplePanel(id, lang, activeLang) {
  const d = dataBusiness[lang];
  const example = d.products.find(product => product.id === id).example;
  const titleId = `example-${id}-${lang}-title`;
  const content = example.pending
    ? `<p class="example-category">${d.exampleLabel}</p><h4 id="${titleId}">${esc(example.title)}</h4><div class="example-reserved"><span>${esc(example.status)}</span></div>`
    : `<p class="example-category">${esc(example.tag)} · ${d.exampleLabel}</p><h4 id="${titleId}">${esc(example.title)}</h4><div class="example-brief"><p>${esc(example.brief)}</p><div class="example-equation">${katex.renderToString(example.equation, { displayMode: true, output: 'htmlAndMathml', throwOnError: true, strict: 'error', trust: false })}</div><p><span class="example-label">${d.questionLabel}</span>${esc(example.question)}</p></div><details class="example-details"><summary>${d.detailsLabel}</summary><dl class="example-facts"><div><dt>${d.milestonesLabel}</dt><dd>${esc(example.milestones)}</dd></div><div><dt>${d.verificationLabel}</dt><dd>${esc(example.verification)}</dd></div><div><dt>${d.outputLabel}</dt><dd>${esc(example.output)}</dd></div>${example.goal ? `<div><dt>${d.goalLabel}</dt><dd>${esc(example.goal)}</dd></div>` : ''}</dl></details>`;
  return `<div data-example-locale="${lang}" lang="${lang === 'zh' ? 'zh-CN' : 'en'}"${lang === activeLang ? '' : ' hidden'}>${content}</div>`;
}

export function taskExample(product, lang) {
  const d = dataBusiness[lang];
  const pending = product.example.pending;
  return `<section class="task-example${pending ? ' example-pending' : ''}" data-task-example="${pending ? 'pending' : 'ready'}" data-example-card data-example-id="${product.id}" data-example-language="${lang}" aria-labelledby="example-${product.id}-${lang}-title">
    <div class="example-toolbar"><span data-example-language-note lang="${lang === 'zh' ? 'zh-CN' : 'en'}">${lang === 'zh' ? d.translatedLabel : d.originalLabel}</span><button type="button" class="example-language-toggle" data-example-language-toggle aria-controls="example-${product.id}-content" data-label-en="${d.switchToEnglish}" data-label-zh="${d.switchToChinese}" data-status-en="${d.switchedToEnglish}" data-status-zh="${d.switchedToChinese}" lang="${lang === 'zh' ? 'zh-CN' : 'en'}" hidden><span data-example-language-label lang="${lang === 'zh' ? 'en' : 'zh-CN'}">${lang === 'zh' ? 'English' : '中文'}</span><span class="sr-only" data-example-language-description> — ${lang === 'zh' ? d.switchToEnglish : d.switchToChinese}</span></button></div>
    <div id="example-${product.id}-content" class="example-content">${examplePanel(product.id, lang, lang)}${examplePanel(product.id, lang === 'zh' ? 'en' : 'zh', lang)}</div>
    <span class="sr-only" data-example-status role="status"></span>
  </section>`;
}
