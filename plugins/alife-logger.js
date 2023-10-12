import BrowserLogger from "alife-logger";
import Vue from 'vue'

// // 检查当前是否在浏览器环境中
if (process.client) {
  // 将BrowserLogger添加到Vue.prototype中，使得它可以在组件中访问
  Vue.prototype.$BrowserLogger = BrowserLogger;
}