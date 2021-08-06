<template>
<div class = "">
    <div 
    class = "ip-card mt-2 d-flex "
    v-for = "(item,i) in iplist" 
    :key = "i">
        <div class = "ai-start" >
            <a :href="item.url">
                <img v-lazy="item.image" 
                style="display:block; width:100%" alt="ads-img">
            </a>
            <div class = "text-center mb-3">
                <span>{{item.title}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'home',
    data() {
        return {
            iplist:[],
        }
    },
    mounted() {
        this.fetch();
    },
    methods:{
        async fetch() {
            const res = await this.$http.get('/ip/home');
            this.iplist = res.data;
        },
    },
    
}
</script>

<style lang = "scss" scoped>
.ip-card {
    background-color: white;
    img {
        width: 100%;
        padding: 1rem 1rem 1rem;
    }
    span {
        /* padding: 0s 25%; */
    }
}
</style>