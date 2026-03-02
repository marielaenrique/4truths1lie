import { checkLie } from './select.js'

document.querySelectorAll('.statement').forEach(element => {

  const isLie = element.textContent.includes("born")
  element.onclick = () => checkLie(element, isLie)
})
