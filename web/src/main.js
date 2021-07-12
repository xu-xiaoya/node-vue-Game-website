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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
