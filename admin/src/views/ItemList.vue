<template>
    <div>
        <el-card>
            <div class = "d-flex">
                <div class = "flex-1">
                    <i class="el-icon-document"></i>
                    <span class="title">数据列表</span>
                </div>
                <div>
                    <el-button type="info" size="small" @click="$router.push('/items/create')">添加</el-button>
                </div>
            </div>
        </el-card>

        <h1>专精列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="220"></el-table-column>
            <el-table-column prop="name" label="专精名称"></el-table-column>
            <el-table-column prop="icon" label="图标">
                <template slot-scope="scope">
                    <img v-lazy = "scope.row.icon" style = "height: 3rem;">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                
                <template slot-scope="scope">
                    <el-button 
                        type = "warning" 
                        size = "small"
                        @click = "$router.push(`/items/edit/${scope.row._id}`)"
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
            const res = await this.$http.get('rest/items');
            this.items = res.data;
        },
        async remove(row) {
            this.$confirm(`是否确定要继续删除专精"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async() => {
                const res = await this.$http.delete(`rest/items/${row._id}`)
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