import { Message } from 'element-ui';

const showToast = ({ content, type }) => {
  if (['danger', 'error'].includes(type)) {
    Message.error(content)
  } else {
    Message[type](content)
  }
  // app.$message({
  //   message: content,
  //   type: type === 'danger' ? "error" : type
  // })
}

export default showToast
