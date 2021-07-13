<template>
    <div class = "about">
        <h1>{{id ? '编辑':'新建'}}分类</h1>
        <el-form label-width = "120px" @submit.native.prevent = "save">
            <el-form-item label = "上级分类">
                <el-select v-model = "model.parent">
                    <!-- label决定显示的是什么，
                        value决定真正存的值：使用id，避免分类名称改变，所属分类失效 -->
                    <el-option 
                        v-for="item in parents"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label = "名称">
                <el-input v-model = "model.name"></el-input>
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
            parents:[],
        }
    },
    methods: {
        async save() {
            // console.log('save');
            
            let res;
            if (this.id) {
                // 在使用${}使用变量时，要使用``模板字符串
                res = await this.$http.put(`rest/categories/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/categories', this.model);
            }
            // 跳转到list页面
            this.$router.push('/categories/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch() {
            // 在serve中的router/index中寻找接口
            const res = await this.$http.get(`rest/categories/${this.id}`);
            this.model = res.data;
        },
        async fetchParents() {
            const res = await this.$http.get(`rest/categories`);
            this.parents = res.data;
        }
    },
    created() {
        this.id && this.fetch(); 
        this.fetchParents();

    }
}
</script>