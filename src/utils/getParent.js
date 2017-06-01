function getParent(element, selector) {
  if (!selector) {
    return element.parentNode
  }
  let node = element.parentNode
  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1) {
    if (node.parentNode.querySelector(selector) === node) {
      return node
    }
    node = node.parentNode
  }
  return node
}

export default getParent
