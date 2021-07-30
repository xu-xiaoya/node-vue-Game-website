<template>
<el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: #eef1f6">
        <!-- 
        :default-opened = "['1']" 默认打开第一个组件
        unique-opened唯一展开 
        :default-active = "$route.path" 高亮显示-->
        <el-menu router 
          unique-opened :default-active = "$route.path">

            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>内容管理</template>
                <!-- 物品管理 -->
                <el-menu-item-group>
                  <template slot="title">天赋</template>
                  <el-menu-item index="/items/create">新建专精</el-menu-item>
                  <el-menu-item index="/items/list">专精列表</el-menu-item>
                </el-menu-item-group>
                <!-- 英雄管理 -->
                <el-menu-item-group>
                  <template slot="title">职业</template>
                  <el-menu-item index="/heroes/create">新建职业</el-menu-item>
                  <el-menu-item index="/heroes/list">职业列表</el-menu-item>
                </el-menu-item-group>
                <!-- 文章管理 -->
                <el-menu-item-group>
                  <template slot="title">文章</template>
                  <el-menu-item index="/articles/create">新建文章</el-menu-item>
                  <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>运营管理</template>
              <!-- 广告管理 -->
              <el-menu-item-group>
                <template slot="title">广告位</template>
                <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                <el-menu-item index="/ads/list">广告位列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-message"></i>系统设置</template>
              <!-- 分类 -->
              <el-menu-item-group>
                <template slot="title">分类</template>
                <!-- 跳转到index指定的路由 -->
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>
              <!-- 管理员管理 -->
              <el-menu-item-group>
                <template slot="title">管理员</template>
                <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
                <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>

    <el-container>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        <span>erya</span>
    </el-header>

    <el-main>
        <router-view :key = "$route.path"></router-view>
        <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        </el-table> -->
    </el-main>
    </el-container>
</el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>