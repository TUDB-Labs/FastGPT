// 定义一个封装了 fetch 的请求方法
import axios from 'axios'
import app from '@/main.js'
import showToast from "@/utils/toast.js";

const axiosService =  axios.create()

axiosService.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

axiosService.interceptors.response.use(
  response => {
    if (response.request.responseURL.indexOf('ipv4.icanhazip.com') > -1) return response.data
    // 需要捕捉的错误码列表
    if (response.data && (response.data.code !== 200 && response.data.code !== 20000)) {
    console.log('response错误：', response)
      showToast(app, {
        content: response.data.message,
        type: "danger",
      })
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    console.log('response错误：', error)
      showToast(app, {
        content: '远端服务器错误,请稍后重试',
        type: "danger",
      })
    return Promise.reject(error)
  }
)

// function request(url, method, data) {
//     const options = {
//       method: method,
//       url: url,
//       headers: {
//         //  'Content-Type': contentType || 'application/json'
//       }
//     }
//     if (method === 'get') {
//       options.params = data
//     } else {
//       options.data = data
//     }
//     return axios(options).then(response => {
//       if (response.data.code !== 200) {
//         return 
//       }
//       return response.data
//     })
// }

// GET 请求函数
export const get = (url, config={}) => {
  return axiosService.get(url, config)
}

// POST 请求函数
export const post = (url, data, config = {}) => {
  return axiosService.post(url, data, config)
}

// PUT 请求函数
// export const put = (url, data, contentType) => {
//   return request(url, 'PUT', data, contentType);
// }

// // DELETE 请求函数
// export const del = (url) => {
//   return request(url, 'DELETE');
// }
