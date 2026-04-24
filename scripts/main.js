import { initI18n } from './i18n-loader.js'

const lang = detectLanguage()
document.documentElement.lang = lang

initI18n(lang)

function detectLanguage() {
  const stored = localStorage.getItem('wr-lang')
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language?.startsWith('en') ? 'en' : 'es'
}
