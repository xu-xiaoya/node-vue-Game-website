<template>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex ai-center" 
      :class="{'border-bottom': !plain, 'pb-3': !plain}">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">
          <strong>{{title}}</strong>
        </div>
        <i class="iconfont icon-menu" v-if="!plain" @click = "showMore()"></i>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean},
        // more: { type: Boolean, default: false }
    },
    methods: {
        // 点击查看更多跳转不同路由
        showMore () {
            let path = ''
            switch (this.title) {
            case '新闻资讯': path = '/newsList'
                break
            case '职业列表': path = '/heroList'
                break
            case '精彩视频': path = '/strategy'
                break
            }
            this.$router.push(path);
        }
    }
}
</script>

<style>
.card {
    border-bottom: 1px solid #d4d9de;
}
</style>