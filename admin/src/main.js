import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import * as echarts from 'echarts'


import './scss/style.scss'
import './style.css'
import './scss/transition.scss'
import http from './http'



import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'./assets/logo.png',
    loading:'https://img.lanrentuku.com/img/allimg/1212/5-121204193951.gif'
})

Vue.prototype.$http = http
Vue.prototype.echarts = echarts


Vue.mixin({
  computed:{
    uploadURl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
