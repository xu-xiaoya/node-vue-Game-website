<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}职业</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <!-- value值，默认到skills，开发方便 -->
            <el-tabs  value = "skills" type = "border-card">
                <el-tab-pane label = "基本信息">
                    <el-form-item label = "名称">
                        <el-input v-model = "model.name"></el-input>
                    </el-form-item>
                    <el-form-item label = "称号">
                        <el-input v-model = "model.title"></el-input>
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
        
                    <el-form-item label = "类型">
                        <!-- multiple多选 -->
                        <el-select v-model = "model.categories" multiple>
                            <el-option 
                                v-for = "item of categories"
                                :key = "item._id"
                                :label = "item.name"
                                :value = "item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label = "难度">
                        <el-rate style = "margin-top:0.6rem"
                            :max = "9"
                            show-score
                            v-model = "model.scores.difficult"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label = "技能">
                        <el-rate style = "margin-top:0.6rem"
                            :max = "9"
                            show-score
                            v-model = "model.scores.skills"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label = "攻击">
                        <el-rate style = "margin-top:0.6rem"
                            :max = "9"
                            show-score
                            v-model = "model.scores.attack"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label = "生存">
                        <el-rate style = "margin-top:0.6rem"
                            :max = "9"
                            show-score
                            v-model = "model.scores.survive"
                        ></el-rate>
                    </el-form-item>
        
                    <el-form-item label = "顺风出装">
                        <el-select v-model = "model.items1" multiple>
                            <el-option 
                                v-for = "item of items"
                                :key = "item._id"
                                :label = "item.name"
                                :value = "item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label = "逆风出装">
                        <el-select v-model = "model.items2" multiple>
                            <el-option 
                                v-for = "item of items"
                                :key = "item._id"
                                :label = "item.name"
                                :value = "item._id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
        
                    <el-form-item label = "使用技巧">
                        <el-input  type = "textarea" v-model = "model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label = "对抗技巧">
                        <el-input  type = "textarea" v-model = "model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label = "团战思路">
                        <el-input  type = "textarea" v-model = "model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label = "专精" name = "skills">
                    <el-button size = "small" @click = "model.skills.push({})">
                        <i class = "el-icon-plus"></i>添加专精
                    </el-button>
                    <el-row type = "flex" style = "flex-wrap:wrap">
                        <el-col :md = "12" 
                            v-for = "(item,i) in model.skills" 
                            :key = "i">
                            
                            <el-form-item label = "名称">
                                <el-input v-model = "item.name"></el-input>
                            </el-form-item>
                            <el-form-item label = "图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/upload'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item, 'icon', res.url)"
                                >
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label = "描述">
                                <el-input v-model = "item.description" type = "textarea"></el-input>
                            </el-form-item>
                            <el-form-item label = "小提示">
                                <el-input v-model = "item.tips" type = "textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button 
                                    size = "small" 
                                    type = "danger"
                                    @click = "model.skills.splice(i,1)"
                                >删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <el-form-item style = "margin-top:1rem;">
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
            items:[],
            model: {
                name:'',
                avatar:'',
                scores:{
                    difficult:0
                },
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

        // 获取数据
        async fetch() {
            const res = await this.$http.get(`rest/heros/${this.id}`);
            //优先赋this.model值，res.data数据不会完整覆盖（this.model没有的数据就赋过来)
            this.model = Object.assign({}, this.model, res.data);
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        async fetchItems() {
            const res = await this.$http.get(`rest/items`);
            this.items = res.data;
        }
    },
    created() {
        // 请求获取数据
        this.fetchCategories();
        this.fetchItems();
        this.id && this.fetch();
    }
}
</script>

<style>
</style>