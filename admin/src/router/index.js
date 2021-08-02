import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login.vue"

import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:Login,
    meta:{ isPublic:true }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children:[
      {
        path:'/home',
        component: ()=>import("../views/Home.vue")
      },

      // category
      // props:true 代表可以把id传入到CategoryEdit组件中 =》 应在CategoryEdit组件中写props接收参数id！
      {
        path:'/categories/create', 
        component: ()=>import("../views/CategoryEdit.vue")
      },
      {
        path:'/categories/edit/:id', 
        props:true,
        component: ()=>import("../views/CategoryEdit.vue")
      },
      {
        path:'/categories/list', 
        component: ()=>import("../views/CategoryList.vue")
      },


      // item
      {
        path:'/items/create', 
        component: ()=>import("../views/ItemEdit.vue")
      },
      {
        path:'/items/edit/:id', 
        props:true,
        component: ()=>import("../views/ItemEdit.vue"),
      },
      {
        path:'/items/list', 
        component: ()=>import("../views/ItemList.vue")
      },


      // hero
      {
        path:'/heroes/create', 
        component: ()=>import("../views/HeroEdit.vue")
      },
      {
        path:'/heroes/edit/:id', 
        props:true,
        component: ()=>import("../views/HeroEdit.vue"), 
      },
      {
        path:'/heroes/list', 
        component: ()=>import("../views/HeroList.vue")
      },


      //article 
      {
        path:'/articles/create', 
        component: ()=>import("../views/ArticleEdit.vue")
      },
      {
        path:'/articles/edit/:id', 
        props:true,
        component: ()=>import("../views/ArticleEdit.vue"), 
      },
      {
        path:'/articles/list', 
        component: ()=>import("../views/ArticleList.vue")
      },
      
      
      //ad 
      {
        path:'/ads/create', 
        component: ()=>import("../views/AdEdit.vue")
      },
      {
        path:'/ads/edit/:id', 
        props:true,
        component: ()=>import("../views/AdEdit.vue"), 
      },
      {
        path:'/ads/list', 
        component: ()=>import("../views/AdList.vue")
      },


      // admin
      {
        path:'/admin_users/create', 
        component: ()=>import("../views/AdminUserEdit.vue")
      },
      {
        path:'/admin_users/edit/:id', 
        props:true,
        component: ()=>import("../views/AdminUserEdit.vue"), 
        
      },
      {
        path:'/admin_users/list', 
        component: ()=>import("../views/AdminUserList.vue")
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})
// 限制客户端进入页面：在每一个路由加上限制条件，并跳转到指定页面
router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next();
})

export default router