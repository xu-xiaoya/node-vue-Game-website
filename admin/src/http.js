import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // 接口统一前缀,生产环境所需的不是本机地址
    // 必须VUE_APP开头，_+自定义变量名
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL:'http://localhost:3000/admin/api'
})


http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer '+ localStorage.token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


//拦截响应 通用的错误拦截
http.interceptors.response.use(res => {
    return res;
},err=>{
    // console.log(err.response.data.message);
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        // console.log(err.response)
        if (err.response.status === 401) {
            router.push('/login');
        }
    }
    
    return Promise.reject(err);
})

export default http