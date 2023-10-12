// 移除 console.log()
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
}
