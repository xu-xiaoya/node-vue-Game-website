import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
// import Article from '../views/Article.vue'
// import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children:[
      {path:'/', name:'home', component:Home },
      {
        path:'/articles/:id', 
        name:'article', 
        props:true,
        component:()=>import('../views/Article.vue'),
      },
    ]
  },
  {
    path: '/heroes/:id',
    name:'hero',
    props:true,
    component: () => import('../views/Hero.vue'),
  },
]

const router = new VueRouter({
  routes,
  // 路由改变时滚动到顶部，而返回上一级时滚动到之前位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
