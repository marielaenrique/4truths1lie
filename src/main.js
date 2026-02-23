import { checkLie } from './src/select.js'

document.querySelectorAll('.statement').forEach(element => {

  const isLie = element.textContent.includes("inst")
  element.onclick = () => checkLie(element, isLie)
})