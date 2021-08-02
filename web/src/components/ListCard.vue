<template>
<my-card :icon = "icon" :title = "title">
    <template v-slot:banner>
        <slot name="banner"></slot>
    </template> 

    <template>
        <!-- 分类导航 -->
        <div class = "nav jc-between">
            <div class = "nav-item" 
            :class = "{active: active === i}"
            v-for = "(category,i) in categories" :key = "i"
            @click = "$refs.list.swiper.slideTo(i)"> <!--滚动到索引值i -->
                <div class = "nav-link">{{category.name}}</div>
            </div>
        </div>
        <!-- end of nav -->
        <div class = "pt-3">
            <!-- 将swiper的真实索引值赋值给active -->
            <swiper ref = "list" :options = "{autoHeight:true}" 
            @slide-change = "() => active = $refs.list.swiper.realIndex">
                <swiper-slide v-for = "(category,i) in categories" :key = "i">
                    <!-- 具名插槽，用name指定名字，对应Home.vue的内容 -->
                   <slot name = "items" :category = "category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </template>
    
    
</my-card>
</template>

<script>
// import Card from './Card'
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        // more: { type: Boolean, default: true },
        categories: {type:Array, required: true},
    },
    data() {
        return {
            active:0
        }
    }
}
</script>

<style>

</style>