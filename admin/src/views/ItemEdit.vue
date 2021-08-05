<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}专精</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "名称">
                <el-input v-model = "model.title" placeholder="请输入专精名称" style = "width: 15rem;"></el-input>
            </el-form-item>
            <el-form-item label = "图标">
                <!-- http.js中baseURL+一个后缀形成一个完整的地址 -->
                <el-upload
                    class="avatar-uploader"
                    :action="uploadURl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="warning" native-type = "el-submit">保存</el-button>  
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
        afterUpload(res) {
            // console.log(res);
            // 动态拓展一个属性
            this.$set(this.model, 'icon', res.url);
        },
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/items/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/items', this.model);
            }
            // 跳转到list页面
            this.$router.push('/items/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/items/${this.id}`);
            this.model = res.data;
        }
    },
    created() {
        this.id && this.fetch();
    }
}
</script>

<style>
</style>
  