import * as pdfjsViewer from "pdfjs-dist/legacy/web/pdf_viewer.js";
import Vue from 'vue'
// export default ({ app }, inject) => {
//   // 将 pdf.js 添加到 Vue.prototype 中，使得它可以在组件中访问
//   console.log(pdfjsViewer)
//   inject('pdfjsViewer', pdfjsViewer);
// };


// // 检查当前是否在浏览器环境中
if (process.client) {
  // 将pdf_viewer.js添加到Vue.prototype中，使得它可以在组件中访问
  Vue.prototype.$pdfjsViewer = pdfjsViewer;
}