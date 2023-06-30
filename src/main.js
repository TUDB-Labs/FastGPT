import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/base.css'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import 'animate.css';
// import './sse.js'
// Vue.prototype.$SSE = window.SSE

Vue.use(BootstrapVue)

import router from './router'

import store from './store'

Vue.config.productionTip = false

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

//生成一个唯一的token
const generateToken = () => {
  const token = Math.random().toString(36).substr(2); //这里可以根据需要添加更多的逻辑来生成token
  return token;
}
//检查cookies中是否存在tokenconst
const tokenExists = Vue.$cookies.isKey('token');
if (!tokenExists) {
  //如果token不存在，则生成一个新的token并保存在cookies中
  const newToken = generateToken();
  Vue.$cookies.set('token', newToken);
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app





