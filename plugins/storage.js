export default ({ app }, inject) => {
  inject('localStorage', {
    getItem(key) {
      // 使用localStorage.getItem()获取指定key的值
      return localStorage.getItem(key)
    },
    setItem(key, value) {
      // 使用localStorage.setItem()设置指定key的值
      localStorage.setItem(key, value)
    },
    removeItem(key) {
      // 使用localStorage.removeItem()删除指定key的值
      localStorage.removeItem(key)
    }
    // 其他需要用到的localStorage方法也可以在这里添加
  })
}
