import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper';
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
