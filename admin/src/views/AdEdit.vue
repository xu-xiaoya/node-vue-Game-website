<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}广告位</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "名称">
                <el-input v-model = "model.name" placeholder="请输入广告位名称" style = "width: 30rem;"></el-input>
            </el-form-item>

            <el-form-item label = "广告">
                <el-button type="info" plain size = "small" @click = "addAd">
                    <i class = "el-icon-plus"></i>添加广告
                </el-button>
                <el-row type = "flex" style = "flex-wrap:wrap">
                    <el-col :md = "24" 
                        v-for = "(item,i) in model.items" 
                        :key = "i">
                        <el-divider></el-divider>
                        <el-form-item label = "跳转链接（URL)">
                            <el-input v-model = "item.url" placeholder="请输入图片跳转链接" style = "width: 30rem;"></el-input>
                        </el-form-item>
                        <el-form-item label = "标题">
                            <el-input v-model = "item.title" placeholder="请输入标题" style="margin-top: 0.5rem; width: 15rem;"></el-input>
                        </el-form-item>
                        <el-form-item label = "广告图" style="margin-top: 0.5rem;">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadURl"
                                :show-file-list="false"
                                :headers="getAuthHeaders()"
                                :on-success="res=>$set(item, 'image', res.url)"
                            >
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
    
                        <el-form-item>
                            <el-button size = "small" type = "danger" @click = "delAd(i)"
                            >删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
            

            <el-form-item>
              <el-button type="warning"  native-type = "el-submit">保存</el-button>  
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
            if (!this.model.name) {   
                this.$message.error('广告位名称不能为空')
                return
            }
            //根据id判断是新建还是编辑
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
            });
        },
        // 添加一个广告项
        addAd () {
            this.model.items.push({
                image: '',
                url: ''
            })
        },
        // 删除一个广告项
        delAd (index) {
            this.$confirm(`确认要删除该广告项?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 先前端删除数据，点保存时再提交
                this.model.items.splice(index, 1)
                this.$message.success('删除成功')
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
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 40rem;
    margin: 24px 0;
}
</style>