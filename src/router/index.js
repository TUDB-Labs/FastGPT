import Vue from 'vue'
import Router from 'vue-router'
const Layout = () => import('@/Layout');
const Home = () => import('@/views/home');
const BuyCar = () => import('@/views/buy-car');
const Law = () => import('@/views/law');
const Expert = () => import('@/views/expert');
const PdfUpload = () => import('@/views/pdf-upload');
const PdfView = () => import('@/views/pdf-view');
const PdfViewDetails = () => import('@/views/pdf-view-details');
const RobotChat = () => import('@/views/robot-chat-view');
const NaturalGas = () => import('@/views/natural-gas');
const DentalConsultation = () => import('@/views/dental-consultation');
const share = () => import('@/views/share');

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
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
          component: PdfView,
          children: [
            {
              path: '/pdf-view/:id',
              name: 'PdfViewDetails',
              component: PdfViewDetails
            }
          ]
        },
        {
          path: '/pdf-upload',
          name: 'PdfUpload',
          component: PdfUpload
        },
        {
          path: '/robot-chat',
          name: 'RobotChat',
          component: RobotChat
        },
        {
          path: '/dental-consultation',
          name: 'DentalConsultation',
          component: DentalConsultation
        },
        {
          path: '/natural-gas',
          name: 'NaturalGas',
          component: NaturalGas
        },
        {
          path: '/share/:id',
          name: 'share',
          component: share
        }
      ]
    },

  ]
})

export default router