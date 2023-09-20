
import showToast from "@/utils/toast.js";

export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export const SSE = function (url, options) {

  this.listeners = {};

  this.stream = function() {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url);

    xhr.setRequestHeader('Authorization', options.token)
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(options.payload));

    xhr.addEventListener('error', (error) => {
      console.log('error', error)
      showToast({
        content: `服务器异常,请稍后再试`,
        type: "danger",
      })
      this.close()
      if (this.listeners['error']) {
        this.listeners['error'](error)
      }
    });

    xhr.addEventListener('progress', () => {
      if (this.listeners['message']) {
        if (xhr.status !== 200 || isValidJSON(xhr.responseText)) {
          showToast({
            content: `服务器异常,请稍后再试`,
            type: "danger",
          })
          return this.listeners['error'](xhr)
        }
        let data = xhr.responseText
        if (!data) return
        if (data.includes("EOF")) {
          data = data.replace("EOF", "");
          this.listeners['load']()
          this.close()
        }
        data = data.replace(/data:/g, "")
        this.listeners['message'](data)
      }
    });

    xhr.addEventListener('load', () => {
      this.listeners['load']()
      this.close()
    });

    // xhr.addEventListener('readystatechange', () => {
    //   console.log('readystatechange', xhr)
    // });

    this.xhr = xhr;
  }

  this.stream()
  
  this.addEventListener = function (type, listener) {
    this.listeners[type] = listener
  }

  this.close = function () {
    this.xhr.abort()
  }
}

export const getCountInfo = (type) => {
  const obj = localStorage.getItem('webCountInfo')
  let webCountInfo = {}
  if (obj) {
    webCountInfo = JSON.parse(obj)
  }
  // 還沒有值
  if (!webCountInfo[type]) {
    webCountInfo[type] = {
      date: new Date().toLocaleDateString(),
      num: 0
    }
  } else {
    // 有值但是过期了
    if (webCountInfo[type].date !== new Date().toLocaleDateString()) {
      webCountInfo[type] = {
        date: new Date().toLocaleDateString(),
        num: 0
      }
    }
  }
  return webCountInfo
}

export const isExceedLimit = (type) => {
  const webCountInfo = getCountInfo(type)
  const maxObj = {
    pdfUpload: 5,
    pdfUploadNoAuth: 3,
    pdfContact: 50,
    pdfContactNoAuth: 20,
    lawContact: 10,
    buyCar: 10,
    chatGas: 10,
    dentalConsultation: 10
  }
  // 如果次数已到达最大则提示超次数
  if (webCountInfo[type].num >= maxObj[type]) {
    return true
  }
}

export const addWebCount = (type) => {
  const webCountInfo = getCountInfo(type)
  webCountInfo[type].num += 1
  localStorage.setItem(
    "webCountInfo",
    JSON.stringify(webCountInfo)
  )
}