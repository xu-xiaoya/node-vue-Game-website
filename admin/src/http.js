import axios from 'axios'

const http = axios.create({
    // 接口统一前缀
    baseURL:'http://localhost:3000/admin/api'
})

export default http