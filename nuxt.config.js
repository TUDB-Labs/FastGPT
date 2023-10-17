
const baseUrl = process.env.NODE_ENV === 'development' ? '/web-server' : ''

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '中科知道 | AIGC',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0' },
      { hid: 'description', name: 'description', content: '中科知道-AIGC平台，根据大模型（LLM）结合领域专业数据或企业私有数据为客户提供定制化的企业级AI解决方案并实现私有化部署，助力企业高效、安全的构建个性化知识库。' },
      { hid: 'keywords', name: 'keywords', content: '中科知道,AIGC,LLM,大模型,私有化部署,定制化,企业级,AI,解决方案,人工智能,数据,知识' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'baidu-site-verification', content: 'codeva-bOa7yJyCmF' },
      { 'http-equiv': 'Content-Type', content: 'text/html;charset=gb2312' },
      { name: 'sogou_site_verification', content: 'ANktMNdNwE' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/styles/base.less',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
  ],

  store: true,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: '~/plugins/storage.js', ssr: false },
    {
      src: '@/plugins/vue-persistedstate',
      // 如果只在浏览器加载的代码, 可以添加一个 属性 ssr: false
      ssr: false
    },
    {
      src: '@/plugins/pdf-viewer.js',
      // 如果只在浏览器加载的代码, 可以添加一个 属性 ssr: false
      ssr: false
    },
    { src: '~/plugins/alife-logger.js', ssr: false },
    "@/plugins/axios",
    '~/plugins/request.js',
    {
      src: "@/plugins/cookies.js",
      // 如果只在浏览器加载的代码, 可以添加一个 属性 ssr: false
      ssr: false
    },
    { src: '@/plugins/bootstrap-vue.js', ssr: false },
    { src: '@/plugins/baidu-analytics.js', ssr: false },
    { src: '~/plugins/console.js', ssr: false },
  ],

  server: {
    port: '3000',
    host: '0.0.0.0'
  },

  proxy: {
    '/web-server': {
      target: 'https://www.sco.tudb.work',  // 后台接口域名
      pathRewrite: { '^/web-server': '' },
      ws: false,        //如果要代理 websockets，配置这个参数
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],

  axios: {
    proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true // 开启 Less 的 JavaScript 支持
        }
      }
    }
  },
  env: {
    // 官网
    VUE_APP_WEBSITE_SERVER: baseUrl + "",
    // 法律
    VUE_APP_LAW_SERVER: baseUrl + "/legal",
    // 购车咨询
    VUE_APP_BUYCAR_SERVER: baseUrl + "/car",
    // 智能机器人
    VUE_APP_GWQA_SERVER: baseUrl + "/gwqa",
    // 牙医
    VUE_APP_DENTIST_SERVER: baseUrl + "/yayi",
    // gas
    VUE_APP_GAS_SERVER: baseUrl + "/gas",

    // 获取ip地址
    VUE_APP_IP_SERVER: "https://ipv4.icanhazip.com",
    // 文件服务地址
    VUE_APP_FILE_SERVER: "https://cdn.tudb.work",
  }
}