// 这里我们把获取焦点封装一个函数，根据判断如果是input框或者textarea文本域，直接调用。如果是元素，就往元素里查找再获取。
function fou(el) {
  if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    // 判断如果是input/textarea就直接调用focus
    el.focus()
  } else {
    // 否则就往元素里边找获取
    el = el.querySelector('input').focus() || el.querySelector('textarea').focus()
  }
}

export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    //inserted：被绑定元素插入父节点时调用,一般只执行一次，所以我们在下边使用了update函数
    fou(el)
  },
  update(el) {
    //update代表更新或者多次点击仍然会聚焦
    fou(el)
  }
}
