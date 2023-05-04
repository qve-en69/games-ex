export function getStyle (element, name) {
  const cs = document.defaultView.getComputedStyle(element, '')
  return cs && cs.getPropertyValue(name)
}

export function setStyle (element, name, value) {
  element.style[name] = value
}

export function unsetStyle (element, name) {
  element.style[name] = null
}

export function getHeight (element) {
  return parseInt(getStyle(element, 'height'), 10) || 0
}

export function getWidth (element) {
  return parseInt(getStyle(element, 'width'), 10) || 0
}

export function setHeight (element, height) {
  setStyle(element, 'height', height + 'px')
}

export function setWidth (element, width) {
  setStyle(element, 'width', width + 'px')
}
