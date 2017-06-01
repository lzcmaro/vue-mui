import getStyles from './getStyles'

function isVisibleElement(element) {
  const display = getStyles(element).getPropertyValue('display')
  return display && display !== 'none'
}

export default isVisibleElement
