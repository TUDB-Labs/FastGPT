module.exports = {
  // 在这里添加您的配置
  publicPath: '/',
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      // '/legal': {
      //   target: 'https://aios.sco.tudb',  // 后台接口域名
      //   // pathRewrite: { '^/car': '' },
      //   ws: false,        //如果要代理 websockets，配置这个参数
      //   secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,  //是否跨域
      // },
      // '/car': {
      //   target: 'https://aios.sco.tudb',  // 后台接口域名
      //   // pathRewrite: { '^/car': '' },
      //   ws: false,        //如果要代理 websockets，配置这个参数
      //   secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,  //是否跨域
      // },
      // '/gwqa': {
      //   target: 'https://aios.sco.tudb',  // 后台接口域名
      //   // pathRewrite: { '^/gwqa': '' },
      //   ws: false,        //如果要代理 websockets，配置这个参数
      //   secure: false,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,  //是否跨域
      // },
      '/dentist/': {
        target: 'https://yayi.sco.tudb.work',  // 后台接口域名
        pathRewrite: { '^/dentist': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      },
      '/gas': {
        target: 'https://sqljava.sco.tudb.work',  // 后台接口域名
        pathRewrite: { '^/gas': '' },
        ws: false,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      },
      '/pdf-api': {
        target: 'https://pdf.sco.tudb.work',  // 后台接口域名
        pathRewrite: { '^/pdf-api': '' },
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
  },
  // Babel 相关配置
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          include: /node_modules\/your-dependency-package/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-proposal-private-methods", { "loose": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        }
      ]
    }
  }
}