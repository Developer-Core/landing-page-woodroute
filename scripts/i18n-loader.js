let translations = {}

export async function initI18n(lang) {
  translations = await fetchTranslations(lang)
  applyTranslations()
  updateMeta()
}

export async function switchLanguage(lang) {
  localStorage.setItem('wr-lang', lang)
  document.documentElement.lang = lang
  translations = await fetchTranslations(lang)
  applyTranslations()
  updateMeta()
}

export function t(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], translations) ?? key
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n)
  })
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml)
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder)
  })
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nLabel))
  })
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    el.alt = t(el.dataset.i18nAlt)
  })
}

function updateMeta() {
  document.title = t('meta.title')

  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.content = t('meta.description')

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = t('meta.title')

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.content = t('meta.description')
}

async function fetchTranslations(lang) {
  const res = await fetch(`/i18n/${lang}.json`)
  if (!res.ok) throw new Error(`i18n: no se pudo cargar ${lang}.json`)
  return res.json()
}
