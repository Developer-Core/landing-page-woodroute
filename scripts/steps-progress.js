const PAINT_START = 0.82
const PAINT_END = 0.42

/**
 * Pinta los números de "Cómo funciona" (01–04) de naranja siguiendo el scroll.
 * Cada número se rellena de abajo hacia arriba mientras su borde superior viaja
 * desde el 82 % hasta el 42 % de la altura del viewport, dando un indicador de
 * progreso vivo conforme el usuario recorre los pasos.
 */
export function initStepsProgress() {
  const numbers = [...document.querySelectorAll('.step-number')]
  if (!numbers.length) return

  let ticking = false

  function paint() {
    ticking = false
    const viewportHeight = window.innerHeight
    const start = viewportHeight * PAINT_START
    const end = viewportHeight * PAINT_END
    for (const number of numbers) {
      const { top } = number.getBoundingClientRect()
      const ratio = clamp((start - top) / (start - end), 0, 1)
      number.style.setProperty('--step-fill', `${(ratio * 100).toFixed(1)}%`)
    }
  }

  function requestPaint() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(paint)
  }

  window.addEventListener('scroll', requestPaint, { passive: true })
  window.addEventListener('resize', requestPaint, { passive: true })
  paint()
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
