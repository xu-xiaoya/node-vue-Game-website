<template>
<div class = "login-container">
     <el-card header = "请先登录"  class="login-card">
        <!--
        监听： 
        native：监听el-form表单里面的原生事件
        prevent：阻止表单的默认提交不要跳转页面
         -->
        <el-form @submit.native.prevent = "login">
            <el-form-item label = "用户名">
                <el-input v-model = "model.username"></el-input>
            </el-form-item>
            <el-form-item label = "密码">
                <el-input  type = "password" v-model = "model.password"></el-input>
             </el-form-item>
            <el-form-item>
                <el-button type = "warning" native-type = "submit">登录</el-button>
             </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model:{}
        }
    },
    methods: {
        async login() {
            // 将model的数据发送过去
            const res = await this.$http.post('login',this.model);
            // 关掉浏览器下次还有
            localStorage.token = res.data.token;
            // console.log(res.data);
            this.$router.push('/');
            this.$message({
                type:'success',
                message:'登陆成功'
            })
        }
    }
}
</script>

<style>
.login-container {
    width: 25rem;
    margin: 5rem auto;
}
</style>