import { initI18n } from './i18n-loader.js'
import { initNavBar } from './nav-bar.js'
import { initPricingSection } from './pricing-section.js'
import { initScrollAnimations } from './scroll-animations.js'
import { initStepsProgress } from './steps-progress.js'

const lang = detectLanguage()
document.documentElement.lang = lang

await initI18n(lang)
initNavBar()
initPricingSection()
initScrollAnimations()
initStepsProgress()

function detectLanguage() {
  const stored = localStorage.getItem('wr-lang')
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language?.startsWith('en') ? 'en' : 'es'
}
