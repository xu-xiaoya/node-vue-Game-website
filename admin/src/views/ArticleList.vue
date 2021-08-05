<template>
    <div id="ads-list">
        <el-card>
            <div class = "d-flex">
                <div class = "flex-1">
                    <i class="el-icon-document"></i>
                    <span class="title">数据列表</span>
                </div>
                <div>
                    <el-button type="info" size="small" @click="$router.push('/articles/create')">添加</el-button>
                </div> 
            </div>
        </el-card>


        <h1>文章列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="220"></el-table-column>
            <!-- <el-table-column prop="categories.name" label="所属分类"></el-table-column> -->
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                
                <template slot-scope="scope">
                    <el-button 
                        type="warning" 
                        size = "small"
                        @click = "$router.push(`/articles/edit/${scope.row._id}`)"
                    >编辑</el-button>

                    <el-button 
                        type = "warning"
                        size = "small"
                        @click = "remove(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items:[]
        }
    },
    methods:{
        async fetch() {
            const res = await this.$http.get('rest/articles');
            this.items = res.data;
        },
        async remove(row) {
            this.$confirm(`是否确定要删除文章《${row.title}》`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async() => {
                const res = await this.$http.delete(`rest/articles/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 删除成功后要重新获取list
                this.fetch();
            })
        }
    },
    created() {
        this.fetch();
    }
    
}
</script>
<style lang = "scss">
</style>