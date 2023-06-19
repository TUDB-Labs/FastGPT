// 定义一个封装了 fetch 的请求方法
import axios from 'axios'

function request(url, method, data) {
    const options = {
      method: method,
      url: url,
      headers: {
        //  'Content-Type': contentType || 'application/json'
      }
    }
    if (method === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    return axios(options).then(response => {
      return response.data
    })
}

// GET 请求函数
export const get = (url, contentType) => {
  return request(url, 'GET', null, contentType);
}

// POST 请求函数
export const post = (url, data, contentType) => {
  return request(url, 'POST', data, contentType);
}

// PUT 请求函数
export const put = (url, data, contentType) => {
  return request(url, 'PUT', data, contentType);
}

// DELETE 请求函数
export const del = (url) => {
  return request(url, 'DELETE');
}
