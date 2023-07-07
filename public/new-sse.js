var SSE = function (url, options) {

  this.listeners = {};

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send(options.method);

  xhr.addEventListener('error', (error) => {
    this.close()
    if (this.listeners['error']) {
      this.listeners['error'](error)
    }
  });
  xhr.addEventListener('progress', () => {
    if (this.listeners['message']) {
      this.listeners['message'](xhr)
    }
  });
  xhr.addEventListener('load', (event) => {
    console.log('load', event)
  });
  xhr.addEventListener('readystatechange', (event) => {
    console.log('readystatechange', event)
  });

  this.xhr = xhr;

  this.stream = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send(options.method);
    this.xhr = xhr;
  }
  this.addEventListener = function (type, listener) {
    listeners[type] = listener
  }
  this.close = function () {
    this.xhr.abort()
  }
}