// 定义一个封装了 fetch 的请求方法
function request(url, method, data) {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Request failed', error);
    });
}

// GET 请求函数
export const get = (url) => {
  return request(url, 'GET');
}

// POST 请求函数
export const post = (url, data) => {
  return request(url, 'POST', data);
}

// PUT 请求函数
export const put = (url, data) => {
  return request(url, 'PUT', data);
}

// DELETE 请求函数
export const del = (url) => {
  return request(url, 'DELETE');
}
