import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/views/home');
const BuyCar = () => import('@/views/buy-car');
const Law = () => import('@/views/law');
const Expert = () => import('@/views/expert');
const PdfUpload = () => import('@/views/pdf-upload');
const PdfView = () => import('@/views/pdf-view');

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/buy-car',
      name: 'BuyCar',
      component: BuyCar
    },
    {
      path: '/law',
      name: 'Law',
      component: Law
    },
    {
      path: '/expert',
      name: 'Expert',
      component: Expert
    },
    {
      path: '/pdf-view',
      name: 'PdfView',
      component: PdfView
    },
    {
      path: '/pdf-upload',
      name: 'PdfUpload',
      component: PdfUpload
    }
  ]
})

export default router