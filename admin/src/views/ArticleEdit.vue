<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}文章</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "所属分类">
                <el-select v-model = "model.categories" multiple>
                    <el-option 
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label = "标题">
                <el-input v-model = "model.title"></el-input>
            </el-form-item>
            
            <el-form-item label = "文章详情">
                <!-- 第三步 使用vue2-editor -->
                <vue-editor useCustomImageHandler 
                @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>

            <el-form-item>
              <el-button type = "primary" native-type = "el-submit">保存</el-button>  
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 富文本编辑器 安装npm install vue2-editor
// 第一步 引入vue2-editor
import { VueEditor } from "vue2-editor";

export default {
    // 第二步 加上组件vue2-editor
    components: {
         VueEditor
    },
    //props接收id
    //与this.$router.params.id效果相同
    props:{
        id:{}
    },
    data() {
        return {
            categories:[],
            model: {},
        }
    },
    methods: {
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/articles/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/articles', this.model);
            }
            // 跳转到list页面
            this.$router.push('/articles/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        // 请求接口获取数据
        async fetch() {
            const res = await this.$http.get(`rest/articles/${this.id}`);
            this.model = res.data;
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await this.$http.post('upload', formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    },
    created() {
        this.fetchCategories();
        this.id && this.fetch();
    }
}
</script>

<style>
</style>