// 定义一个封装了 fetch 的请求方法
import axios from 'axios'
import showToast from "@/utils/toast.js";
import store from '@/store/index.js';

const axiosService = axios.create({
  timeout: 500000
})

axiosService.interceptors.request.use(config => {
  config.headers.Authorization = store.getters.token // userInfo.token
  return config
}, error => {
  Promise.reject(error)
})

axiosService.interceptors.response.use(
  response => {
    console.log(response.config)
    const url = response.config.url
    const data = response.data
    // console.log('response：', data)
    if (url.includes('/car/upvote')) return response.data
    if (url.includes('ipv4.icanhazip.com')) return response.data
    // if (data.code === 5006 && data.message==="Token身份匹配失败") {
    //   store.mutations.setUserInfo({})
    //   return showToast({
    //     content: '登录信息匹配失败',
    //     type: "danger",
    //   })
    // }
    // 需要捕捉的错误码列表
    // 正确的code列表
    const whiteCodeList = [200, 20000, 2000]
    if (data && whiteCodeList.includes(data.code)) {
      if (response.headers['x-msgid']) {
        data.data.id = response.headers['x-msgid']
      }
      return data
    }
    // 购车的错误报警通过自定义
    if (!url.includes('/car/texttosql/completions')) {
      showToast({
        content: data.message,
        type: "danger",
      })
    }
    return Promise.reject(data)
  },
  error => {
    if (!error.config.url.includes('/texttosql/completions')) {
      showToast({
        content: error.message,
        type: "danger",
      })
    }
    console.log('response错误：', error.message)
      // showToast({
      //   content: '服务器异常,请稍后再试',
      //   type: "danger",
      // })
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
