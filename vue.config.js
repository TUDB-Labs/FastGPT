module.exports = {
  // 在这里添加您的配置
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    port: 9100,
    allowedHosts: [
      'fe3a2sy.nat.ipyingshe.com'
    ],
    proxy: {
      '/car-sql': {
        target: 'https://text2sql.tudb.work',  // 后台接口域名
        pathRewrite: { '^/car-sql': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      }
    }
  }
}