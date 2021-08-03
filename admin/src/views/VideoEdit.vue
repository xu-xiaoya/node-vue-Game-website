<template>
    <div>
        <h1>{{id ? '编辑':'新建'}}视频</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "名称">
                <el-input v-model = "model.title" placeholder="请输入视频标题"></el-input>
            </el-form-item>
            <el-form-item label = "作者">
                <el-input v-model = "model.author" placeholder="请输入作者名称"></el-input>
            </el-form-item>
            <el-form-item label = "头像">
                <span class = "text-grey fs-xs">tip:建议使用宽:高=1:1图片</span>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadURl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(model, 'avatar', res.url)"
                >
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label = "粉丝数">
                <el-input v-model = "model.fans" placeholder="请输入作者粉丝数量"></el-input>
            </el-form-item>

            <el-form-item label="所属分类">
                <el-select v-model="model.category" placeholder="请选择">
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>        
            </el-form-item>

            <el-form-item label="播放量">
                <el-input v-model="model.play" placeholder="请输入视频播放量"></el-input>
            </el-form-item>    

            <el-form-item label = "封面">
                <span class = "text-grey fs-xs">tip:建议使用宽屏图片，宽:高=2:1最佳</span>
                <el-upload
                    class="avatar-uploader"
                    :action="uploadURl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(model, 'cover', res.url)"
                >
                <img v-if="model.cover" :src="model.cover" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="视频">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadURl"
                    :show-file-list="false"
                    :headers="getAuthHeaders()"
                    :on-success="res=>$set(model, 'video', res.url)"
                >
                    <video v-if="model.video" controls :src="model.video" class="avatar"></video>
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
            model: {
                title: '',
                category: '',
                play: '',
                cover: '',
                video: ''
            },
            categories:[],// 视频分类
        }
    },
    methods: {
        async save() {
            // console.log('save');
            if (!this.model.title) {   
                this.$message.error('视频标题不能为空')
                return
            }
            //根据id判断是新建还是编辑
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/videos/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/videos', this.model);
            }
            // 跳转到list页面
            this.$router.push('/videos/list');
            this.$message({
                type:'success',
                message:'保存成功'
            });
        },
        async fetch() {
            const res = await this.$http.get(`rest/videos/${this.id}`);
            this.model = Object.assign({},this.model, res.data);
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/videos/cate`);
            this.categories = res.data;
        },
    },
    created() {
        this.id && this.fetch();
        this.fetchCategories();
    }
}
</script>

<style>
</style>