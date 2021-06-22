<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}英雄</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "名称">
                <el-input v-model = "model.name"></el-input>
            </el-form-item>
            <el-form-item label = "称号">
                <el-input v-model = "model.title"></el-input>
            </el-form-item>
            <el-form-item label = "类型">
                <el-select v-model = "model.categories">
                    <el-option 
                        v-for = "item in categories"
                        :key = "item._id"
                        :label = "item.name"
                        :value = "item._id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label = "头像">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                >
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            categories:[],
            model: {
                name:'',
                avatar:''
            },
        }
    },
    methods: {
        afterUpload(res) {
            // console.log(res);
            // 动态拓展一个属性
            // this.$set(this.model, 'avatar', res.url);
            this.model.avatar = res.url;
        },
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/heros/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/heros', this.model);
            }
            // 跳转到list页面
            this.$router.push('/heros/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/heros/${this.id}`);
            this.model = res.data;
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`);
            this.model = res.data;
        }
    },
    created() {
        this.fetchCategories();
        this.id && this.fetch();
    }
}
</script>

<style>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
  