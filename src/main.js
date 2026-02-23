import { checkLie } from './select.js'

document.querySelectorAll('.statement').forEach(element => {
  // Esta línea detecta automáticamente cuál es la mentira por el texto
  const isLie = element.textContent.includes("inst")
  
  element.onclick = () => checkLie(element, isLie)
})