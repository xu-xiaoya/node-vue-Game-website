<template>
<div>
    <div class = "topbar bg-black py-2 px-3 text-white d-flex ai-center">
        <img src = "../assets/logo.png" height="30">
        <!-- flex-1：左边和右边不变，中间的占用剩余的空间 -->
        <div class = "px-2 flex-1">
            <div class = "text-white">魔兽世界</div>
            <div class = "text-grey-1 font-xxs ">团队成就更多</div>
        </div>
        <button type = "button" class = "btn bg-primary">立即下载</button>
    </div>
    <div class = "bg-primary pt-3 pb-2">
        <div class = "nav nav-inverse pb-1 jc-around">
            <div class = "nav-item active">
                <router-link class="nav-link  " tag = "div"  :to="{name:'/'}">首页</router-link>
            </div>
            <div class = "nav-item">
                <router-link class="nav-link" tag = "div" :to="{name:'/'}">攻略</router-link>
            </div>
            <div class = "nav-item">
                <router-link class="nav-link" tag = "div" :to="{name:'/'}">赛事中心</router-link>
            </div>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>