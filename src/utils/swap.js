/**
 * 由于无法获取隐藏元素的宽高，这里把元素克隆出来，设为显示后append到body中
 * @param  {Element}   elem 需要被克隆的Element对象
 * @param  {Function} cb   回调函数。因为要删除克隆出来的element，在callback后执行
 */
const swap = function(elem, cb) {
  const styles = { position: 'absolute', visibility: 'hidden', display: 'block', top: '10000px' }
  const $wrap = document.createElement('div')
  for (let k in styles) {
    $wrap.style[k] = styles[k]
  }
  $wrap.appendChild(elem.cloneNode(true))
  document.body.appendChild($wrap)
  cb && cb($wrap)
  document.body.removeChild($wrap)
}

export default swap
