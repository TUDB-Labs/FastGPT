import Vue from 'vue'

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

// // 检查cookies中是否存在tokenconst
// const tokenExists = Vue.$cookies.isKey('token');
// if (!tokenExists) {
//   //如果token不存在，则生成一个新的token并保存在cookies中
//   const newToken = generateToken();
//   Vue.$cookies.set('token', newToken);
// }