function splitWords(val) {
  val = val ? val.trim() : ''
  return val.length ? val.replace(/\s+/, ' ').split(' ') : []
}

function joinWords(val) {
  return val && val.length ? val.join(' ') : ''
}

export function addClass(el, classes) {
  return toggleClass(el, classes, true)
}

export function removeClass(el, classes) {
  return toggleClass(el, classes, false)
}

function toggleClass(el, classes, value) {
  const method = (value === undefined || value === null) ? 'toggle' : value ? 'add' : 'remove'
  let list

  if (typeof classes === 'string') {
    classes = splitWords(classes)
  }

  list = splitWords(el.className)
  classes.forEach(c => {
    const hasClass = ~list.indexOf(c)

    if (!hasClass && method !== 'remove') {
      list.push(c)
    }

    if (hasClass && method !== 'add') {
      list = list.filter(el => (el !== c))
    }
  })

  list = joinWords(list)
  list ? (el.className = list) : el.removeAttribute('class')
}

export default toggleClass
