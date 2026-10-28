document.documentElement.classList.add('js');

const languageSwitch = document.querySelector('[data-language-switch]');
if (languageSwitch) {
  if (window.location.search && window.location.pathname.endsWith('/research/')) {
    languageSwitch.search = window.location.search;
  }
  languageSwitch.addEventListener('click', () => {
    try { localStorage.setItem('lightray-language', document.body.dataset.lang === 'en' ? 'zh' : 'en'); } catch { /* Storage may be disabled. Links still work. */ }
  });
  if (document.body.dataset.root) {
    try {
      if (localStorage.getItem('lightray-language') === 'zh') window.location.replace(languageSwitch.href);
    } catch { /* Default English remains accessible. */ }
  }
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  function setMenu(open, focus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    nav.classList.toggle('is-open', open);
    if (focus) (open ? nav.querySelector('a') : toggle).focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true', true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', () => setMenu(false));
}

const research = document.querySelector('[data-research-list]');
if (research) {
  const filters = research.querySelector('[data-filters]');
  const cards = [...research.querySelectorAll('[data-project]')];
  const groups = [...research.querySelectorAll('[data-research-group]')];
  const buttons = [...research.querySelectorAll('[data-filter-track]')];
  const select = research.querySelector('#relationship-filter');
  const count = research.querySelector('[data-result-count]');
  const empty = research.querySelector('[data-empty-state]');
  let track = 'all';

  function restoreQuery() {
    const query = new URLSearchParams(window.location.search);
    const requestedTrack = query.get('track');
    track = buttons.some(button => button.dataset.filterTrack === requestedTrack) ? requestedTrack : 'all';
    const requestedRelation = query.get('contribution');
    select.value = [...select.options].some(option => option.value === requestedRelation) ? requestedRelation : 'all';
  }
  function updateFilters(writeUrl = true) {
    let visible = 0;
    for (const card of cards) {
      card.hidden = !((track === 'all' || card.dataset.track === track) && (select.value === 'all' || card.dataset.relationship === select.value));
      if (!card.hidden) visible += 1;
    }
    for (const group of groups) group.hidden = ![...group.querySelectorAll('[data-project]')].some(card => !card.hidden);
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filterTrack === track));
    count.textContent = `${visible} ${count.dataset.unit}`;
    empty.hidden = visible !== 0;
    if (writeUrl) {
      const current = new URL(window.location.href);
      if (track === 'all') current.searchParams.delete('track'); else current.searchParams.set('track', track);
      if (select.value === 'all') current.searchParams.delete('contribution'); else current.searchParams.set('contribution', select.value);
      window.history.replaceState(null, '', current);
    }
    if (languageSwitch) languageSwitch.search = window.location.search;
  }
  filters.hidden = false;
  count.hidden = false;
  restoreQuery();
  updateFilters(false);
  for (const button of buttons) button.addEventListener('click', () => { track = button.dataset.filterTrack; updateFilters(); });
  select.addEventListener('change', () => updateFilters());
  research.querySelector('[data-reset-filters]').addEventListener('click', () => {
    track = 'all'; select.value = 'all'; updateFilters(); buttons[0].focus();
  });
  window.addEventListener('popstate', () => { restoreQuery(); updateFilters(false); });
}

for (const card of document.querySelectorAll('[data-example-card]')) {
  const button = card.querySelector('[data-example-language-toggle]');
  const note = card.querySelector('[data-example-language-note]');
  const status = card.querySelector('[data-example-status]');
  button.hidden = false;
  button.addEventListener('click', () => {
    const current = card.dataset.exampleLanguage;
    const next = current === 'zh' ? 'en' : 'zh';
    const oldPanel = card.querySelector(`[data-example-locale="${current}"]`);
    const newPanel = card.querySelector(`[data-example-locale="${next}"]`);
    oldPanel.hidden = true;
    newPanel.hidden = false;
    card.dataset.exampleLanguage = next;
    card.setAttribute('aria-labelledby', `example-${card.dataset.exampleId}-${next}-title`);
    note.textContent = next === 'zh' ? '（翻译）' : 'English original';
    note.lang = next === 'zh' ? 'zh-CN' : 'en';
    const label = button.querySelector('[data-example-language-label]');
    label.textContent = next === 'zh' ? 'English' : '中文';
    label.lang = next === 'zh' ? 'en' : 'zh-CN';
    button.querySelector('[data-example-language-description]').textContent = ` — ${next === 'zh' ? button.dataset.labelEn : button.dataset.labelZh}`;
    status.textContent = next === 'zh' ? button.dataset.statusZh : button.dataset.statusEn;
  });
}

const contactTrigger = document.querySelector('[data-contact-open]');
const contactDialog = document.querySelector('#contact-dialog');
if (contactTrigger && contactDialog) {
  contactTrigger.hidden = false;
  contactTrigger.addEventListener('click', () => contactDialog.showModal());
  contactDialog.addEventListener('click', event => {
    const rect = contactDialog.getBoundingClientRect();
    if (event.target === contactDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) contactDialog.close();
  });
  contactDialog.addEventListener('close', () => contactTrigger.focus());
}

// Detect deployments even when GitHub Pages serves cached HTML.
let checkingVersion = false;
async function checkSiteVersion() {
  if (checkingVersion || document.hidden || document.querySelector('dialog[open]')) return;
  const { build, versionUrl } = document.body.dataset;
  if (!build || !versionUrl) return;
  checkingVersion = true;
  try {
    const response = await fetch(`${versionUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return;
    const { version } = await response.json();
    const target = new URL(window.location.href);
    if (typeof version !== 'string' || !/^[a-z0-9]+$/.test(version) || version === build || target.searchParams.get('v') === version) return;
    try { sessionStorage.setItem('lightray-update-scroll', JSON.stringify({ path: target.pathname, y: window.scrollY })); } catch { /* Storage is optional. */ }
    target.searchParams.set('v', version);
    window.location.replace(target.href);
  } catch { /* Offline or a transient deployment failure: keep the current page. */ }
  finally { checkingVersion = false; }
}
try {
  const saved = JSON.parse(sessionStorage.getItem('lightray-update-scroll') || 'null');
  sessionStorage.removeItem('lightray-update-scroll');
  if (saved?.path === window.location.pathname && Number.isFinite(saved.y)) {
    window.addEventListener('load', () => window.scrollTo({ top: saved.y, behavior: 'instant' }), { once: true });
  }
} catch { /* Storage is optional. */ }
window.addEventListener('pageshow', checkSiteVersion);
window.addEventListener('focus', checkSiteVersion);
document.addEventListener('visibilitychange', checkSiteVersion);
setInterval(checkSiteVersion, 60000);
