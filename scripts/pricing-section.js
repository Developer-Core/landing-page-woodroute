export function initPricingSection() {
  const btnMonthly = document.getElementById('pricing-monthly')
  const btnAnnual  = document.getElementById('pricing-annual')

  if (!btnMonthly || !btnAnnual) return

  btnMonthly.addEventListener('click', () => setActiveBilling('monthly'))
  btnAnnual.addEventListener('click',  () => setActiveBilling('annual'))
}

function setActiveBilling(mode) {
  const isAnnual   = mode === 'annual'
  const btnMonthly = document.getElementById('pricing-monthly')
  const btnAnnual  = document.getElementById('pricing-annual')

  btnMonthly.setAttribute('aria-pressed', String(!isAnnual))
  btnAnnual.setAttribute('aria-pressed',  String(isAnnual))

  btnMonthly.classList.toggle('bg-background',      !isAnnual)
  btnMonthly.classList.toggle('text-foreground',    !isAnnual)
  btnMonthly.classList.toggle('shadow-sm',          !isAnnual)
  btnMonthly.classList.toggle('text-muted-foreground', isAnnual)

  btnAnnual.classList.toggle('bg-background',      isAnnual)
  btnAnnual.classList.toggle('text-foreground',    isAnnual)
  btnAnnual.classList.toggle('shadow-sm',          isAnnual)
  btnAnnual.classList.toggle('text-muted-foreground', !isAnnual)

  document.querySelectorAll('.price-monthly').forEach(el => el.classList.toggle('hidden', isAnnual))
  document.querySelectorAll('.price-annual').forEach(el => el.classList.toggle('hidden', !isAnnual))
}
