<template>
<div>
    <div class = "topbar bg-black py-2 px-3 text-white d-flex ai-center">
        <img src = "../assets/img/logo.png" height="30">
        <!-- flex-1：左边和右边不变，中间的占用剩余的空间 -->
        <div class = "px-2 flex-1">
            <div class = "text-white">魔兽世界</div>
            <div class = "text-grey-1 fs-xxs ">团队成就更多</div>
        </div>
        <button type = "button" class = "btn bg-primary">立即下载</button>
    </div>
    <div class = "bg-primary pt-3 pb-2">
        <div class = "nav nav-inverse pb-1 jc-around">
            <div class = "nav-item" :class = "{active: active == 0}" @click = "active=0">
                
                    <router-link class="nav-link  " tag = "div"  to="/" >首页</router-link>
            </div>
            <div class = "nav-item" :class = "{active: active == 1}" @click = "active=1">
                <router-link class="nav-link" tag = "div" to="/strategy" >攻略</router-link>
            </div>
            <div class = "nav-item" :class = "{active: active == 2}" @click = "active=2">
                <router-link class="nav-link" tag = "div" to="/ip" >IP新游</router-link>
            </div>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    data() {
        return {
            active:0
        }
    },
    mounted() {
        this.$router.push('/');
    }
}
</script>

<style>
.topbar {
    position:sticky;
    top: 0;
    z-index: 999;
}
</style>