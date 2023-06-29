module.exports = {
  // 在这里添加您的配置
  publicPath: '/',
  devServer: {
    disableHostCheck: true,
    port: 9100,
    proxy: {
      '/legal': {
        target: 'https://aios.sco.tudb.work',  // 后台接口域名
        // pathRewrite: { '^/car': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      },
      '/car': {
        target: 'https://aios.sco.tudb.work',  // 后台接口域名
        // pathRewrite: { '^/car': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      },
      '/gwqa': {
        target: 'https://aios.sco.tudb.work',  // 后台接口域名
        // pathRewrite: { '^/gwqa': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      },
      '': {
        target: 'https://aios.sco.tudb.work',  // 后台接口域名
        // pathRewrite: { '^/car': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      }
    }
  }
}