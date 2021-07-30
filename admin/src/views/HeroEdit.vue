<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}职业</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-tabs type = "border-card" value = "basic">
                <el-tab-pane label = "基本信息" name = "basic">
                    <el-form-item label = "名称">
                        <el-input v-model = "model.name"></el-input>
                    </el-form-item>
                    <el-form-item label = "称号">
                        <el-input v-model = "model.title"></el-input>
                    </el-form-item>
                    <el-form-item label = "头像">
                        <el-upload
                        class="avatar-uploader"
                        :action="uploadURl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'avatar', res.url)"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label = "Banner">
                        <el-upload
                        class="avatar-uploader"
                        :action="uploadURl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'banner', res.url)"
                        >
                            <img v-if="model.banner" :src="model.banner" class="avatar">
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
                    <el-form-item label = "专精选择">
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
                    <el-form-item label = "描述">
                        <el-input  type = "textarea" v-model = "model.description"></el-input>
                    </el-form-item>
                    <el-form-item label = "介绍视频链接">
                        <el-input v-model = "model.video"></el-input>
                    </el-form-item>
                    <el-form-item label = "对抗技巧">
                        <el-input  type = "textarea" v-model = "model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label = "使用武器">
                        <el-input  type = "textarea" v-model = "model.tools"></el-input>
                    </el-form-item>
    
                </el-tab-pane>
               

                <el-tab-pane label = "特点" name = "features">
                    <el-button size = "small" @click = "model.features.push({})">
                        <i class = "el-icon-plus"></i>添加特点
                    </el-button>
                    <el-row type = "flex" style = "flex-wrap:wrap">
                        <el-col :md = "12" 
                            v-for = "(item,i) in model.features" 
                            :key = "i">
                            
                            <el-divider></el-divider>
                            <el-form-item label = "特点名称">
                                <el-input v-model = "item.name"></el-input>
                            </el-form-item>
                            <el-form-item label = "图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="uploadURl"
                                    :headers = "getAuthHeaders()"
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
                            <el-form-item>
                                <el-button 
                                    size = "small" 
                                    type = "danger"
                                    @click = "model.features.splice(i,1)"
                                >删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label = "搭档" name = "partners">
                    <el-button size = "small" @click = "model.partners.push({})">
                        <i class = "el-icon-plus"></i>添加搭档
                    </el-button>
                    <el-row type = "flex" style = "flex-wrap:wrap">
                        <el-col :md = "12" 
                            v-for = "(item,i) in model.partners" 
                            :key = "i">
                            <el-form-item label = "职业">
                                <el-select  filterable v-model = "item.hero">
                                    <el-option 
                                    v-for = "hero of heroes" 
                                    :key = "hero._id"
                                    :value = "hero._id"
                                    :label = "hero.name">

                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label = "描述">
                                <el-input v-model = "item.description" type = "textarea"></el-input>
                            </el-form-item>
                            
                            <el-form-item>
                                <el-button 
                                    size = "small" 
                                    type = "danger"
                                    @click = "model.partners.splice(i,1)"
                                >删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                
            </el-tabs>
            <el-form-item style="margin-top: 1rem;">
                <el-button type="primary" native-type="submit">保存</el-button>
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
            items:[],
            categories:[],
            heroes:[],
            model: {
                name: "",
                avatar: "",
                features: [],
                partners: [],
                scores: {
                    difficult: 0
                }
            },
            
        }
    },
    methods: {
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/heroes', this.model);
            }
            // 跳转到list页面
            this.$router.push('/heroes/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/heroes/${this.id}`);
            // console.log(res);
            this.model = Object.assign({}, this.model, res.data);
        },        
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`);
            this.categories = res.data;
        },
        async fetchItems() {
            const res = await this.$http.get(`rest/items`);
            this.items = res.data;
        },
        async fetchHeroes() {
            const res = await this.$http.get(`rest/heroes`);
            this.heroes = res.data;
        }
    },
    created() {
        this.id && this.fetch();
        this.fetchItems();
        this.fetchHeroes();
        this.fetchCategories();
    }
}
</script>

<style>
</style>
  