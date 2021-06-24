<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}广告位</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "名称">
                <el-input v-model = "model.name"></el-input>
            </el-form-item>

            <el-form-item label = "广告">
                <el-button size = "small" @click = "model.items.push({})">
                    <i class = "el-icon-plus"></i>添加广告
                </el-button>
                <el-row type = "flex" style = "flex-wrap:wrap">
                    <el-col :md = "24" 
                        v-for = "(item,i) in model.items" 
                        :key = "i">
                        
                        <el-form-item label = "跳转链接（URL)">
                            <el-input v-model = "item.url"></el-input>
                        </el-form-item>
                        <el-form-item label = "图片" style="margin-top: 0.5rem;">
                            <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL+'/upload'"
                                :show-file-list="false"
                                :on-success="res=>$set(item, 'image', res.url)"
                            >
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
    
                        <el-form-item>
                            <el-button 
                                size = "small" 
                                type = "danger"
                                @click = "model.items.splice(i,1)"
                            >删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                items:[]
            },
        }
    },
    methods: {
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/ads/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/ads', this.model);
            }
            // 跳转到list页面
            this.$router.push('/ads/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/ads/${this.id}`);
            this.model = Object.assign({},this.model, res.data);
        }
    },
    created() {
        this.id && this.fetch();
    }
}
</script>

<style>
</style>