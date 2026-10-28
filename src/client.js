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

const contactTrigger = document.querySelector('[data-contact-open]');
const contactDialog = document.querySelector('#data-contact-dialog');
if (contactTrigger && contactDialog) {
  contactTrigger.hidden = false;
  contactTrigger.addEventListener('click', () => contactDialog.showModal());
  contactDialog.addEventListener('click', event => {
    const rect = contactDialog.getBoundingClientRect();
    if (event.target === contactDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) contactDialog.close();
  });
  contactDialog.addEventListener('close', () => contactTrigger.focus());
}
