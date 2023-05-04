function fixedString (text, pattern, width) {
  if (typeof text !== 'string' && text !== undefined && text !== null) text = text.toString()
  if (text === null || text === undefined) {
    text = ''
  }
  const padding = width - text.length
  return padding > 0 ? pattern.repeat(padding) + text : text
}

export function toDatetimeString (d) {
  return `${fixedString(d.getFullYear(), '0', 4)}-${fixedString(d.getMonth() + 1, '0', 2)}-${fixedString(d.getDate(), '0', 2)} ${fixedString(d.getHours(), '0', 2)}:${fixedString(d.getMinutes(), '0', 2)}`
}

export function toDateString (d) {
  return `${fixedString(d.getFullYear(), '0', 4)}-${fixedString(d.getMonth() + 1, '0', 2)}-${fixedString(d.getDate(), '0', 2)}`
}

export function toTimeString (d) {
  return `${fixedString(d.getHours(), '0', 2)}:${fixedString(d.getMinutes(), '0', 2)}`
}
