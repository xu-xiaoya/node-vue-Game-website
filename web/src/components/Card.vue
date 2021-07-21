<template>
<div class = "card bg-white  p-3 mt-3 ">
    <div 
    class = "card-header d-flex ai-center"
    :class = "[(!plain) ? 'border-bottom':'',(!plain) ? 'pb-3':'']"
    
    >
        <i class = "iconfont" :class = "`icon-${icon}`"></i>
        <div class = "fs-xl flex-1 px-2"><strong>{{title}}</strong></div>

        <i class = "iconfont icon-menu" v-if = "!plain"></i>
    </div>
    <div class = "card-body pt-3">
        <!-- 插槽 -->
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
    }
}
</script>

<style>
.card {
    border-bottom: 1px solid #d4d9de;
}
</style>