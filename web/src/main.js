import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper';
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import Card from './components/Card.vue'
Vue.component('my-card', Card);
import ListCard from './components/ListCard.vue'
Vue.component('my-list-card', ListCard);
import Image from './components/Image.vue'
Vue.component('my-image', Image);

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./assets/logo.png',
    loading:'./assets/loading.gif'
})

import axios from 'axios';
Vue.prototype.$http = axios.create({
  // 接口统一前缀,生产环境所需的不是本机地址
  // 必须VUE_APP开头，_+自定义变量名
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api'
})

// router-link跳转回到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
