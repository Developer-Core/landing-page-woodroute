import { switchLanguage, t } from './i18n-loader.js'

export function initNavBar() {
  setupMobileMenu()
  setupLangSwitcher()
  syncLangDisplay()
  setupScrollBorder()
}

function setupMobileMenu() {
  const toggle    = document.getElementById('menu-toggle')
  const menu      = document.getElementById('mobile-menu')
  const iconMenu  = document.getElementById('icon-menu')
  const iconClose = document.getElementById('icon-close')

  if (!toggle || !menu) return

  toggle.addEventListener('click', () => {
    const isOpen = !menu.hidden
    menu.hidden = isOpen
    toggle.setAttribute('aria-expanded', String(!isOpen))
    toggle.setAttribute('aria-label', t(isOpen ? 'nav.open_menu' : 'nav.close_menu'))
    iconMenu.classList.toggle('hidden', !isOpen)
    iconClose.classList.toggle('hidden', isOpen)
  })

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true
      toggle.setAttribute('aria-expanded', 'false')
      toggle.setAttribute('aria-label', t('nav.open_menu'))
      iconMenu.classList.remove('hidden')
      iconClose.classList.add('hidden')
    })
  })
}

function setupLangSwitcher() {
  const handleSwitch = async () => {
    const current = localStorage.getItem('wr-lang') || 'es'
    const next = current === 'es' ? 'en' : 'es'
    await switchLanguage(next)
    syncLangDisplay()
  }

  document.getElementById('lang-toggle')?.addEventListener('click', handleSwitch)
  document.getElementById('lang-toggle-mobile')?.addEventListener('click', handleSwitch)
}

function setupScrollBorder() {
  const header = document.getElementById('nav-bar')
  if (!header) return

  const update = () => {
    const scrolled = window.scrollY > 0
    header.classList.toggle('border-transparent', !scrolled)
    header.classList.toggle('border-border', scrolled)
  }

  window.addEventListener('scroll', update, { passive: true })
}

function syncLangDisplay() {
  const lang = localStorage.getItem('wr-lang') || document.documentElement.lang || 'es'
  const desktop = document.getElementById('lang-current')
  const mobile  = document.getElementById('lang-current-mobile')
  if (desktop) desktop.textContent = lang
  if (mobile)  mobile.textContent  = lang
}
