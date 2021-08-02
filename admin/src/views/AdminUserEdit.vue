<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}管理员</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">

            <el-form-item label = "名称">
                <el-input v-model = "model.username" style = "width:300px" 
                placeholder="请输入管理员名称"></el-input>
            </el-form-item>
            <el-form-item label = "密码">
                <el-input  type = "text" v-model = "model.password" 
                style = "width:300px" placeholder="请输入密码"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type = "primary" native-type = "el-submit">保存</el-button>  
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    //props接收id
    //与this.$router.params.id效果相同
    props:{
        id:{}
    },
    data() {
        return {
            model: {},
        }
    },
    methods: {
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/admin_users', this.model);
            }
            // 跳转到list页面
            this.$router.push('/admin_users/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/admin_users/${this.id}`);
            this.model = res.data;
        }
    },
    created() {
        this.id && this.fetch(); 
    }
}
</script>