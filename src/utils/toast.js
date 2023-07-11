import app from '@/main.js'

const showToast = ({ content, type }) => {
  app.$message({
    message: content,
    type: type === 'danger' ? "error" : type
  })
}

export default showToast
