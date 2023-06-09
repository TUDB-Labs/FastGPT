// 定义一个封装了 fetch 的请求方法
function request(url, method, data, contentType) {
  let options = {
    method: method,
    headers: {
      'Content-Type': contentType || 'application/json'
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
      return response ? response.json() : null;
    })
    .catch(error => {
      console.error('Request failed', error);
    });
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
