<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <div class="swiper-slide">
        <img class = "w-100" src = "../assets/img/轮播图1.jpg">
      </div>
      <div class="swiper-slide w-100">
        <img class = "w-100" src = "../assets/img/轮播图2.jpg">
      </div>
      <div class="swiper-slide w-100">
        <img class = "w-100" src = "../assets/img/轮播图3.jpg">
      </div>
      <div class="swiper-slide w-100">
        <img class = "w-100" src = "../assets/img/轮播图4.jpg">
      </div>
      <div class="swiper-slide w-100">
        <img class = "w-100" src = "../assets/img/轮播图5.jpg">
      </div>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- end of swiper -->

    <div class = "nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class = "d-flex flex-wrap">
        <div class = "nav-item mb-3" 
          v-for = "n in 10" :key = "n">
          <i class = "sprite sprite-news"></i>
          <div class = "py-2">爆料站</div>
        </div>
      </div>
      <div class = "bg-light py-2 fs-sm">
        <i class = "sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nav icons -->

    <!-- <my-card icon = "menu1" title = "新闻资讯">
      <div class = "nav jc-between">
        <div class = "nav-item active">
          <div class = "nav-link">热门</div>
        </div>
        <div class = "nav-item">
          <div class = "nav-link">新闻</div>
        </div>
        <div class = "nav-item">
          <div class = "nav-link">新闻</div>
        </div>
        <div class = "nav-item">
          <div class = "nav-link">新闻</div>
        </div>
        <div class = "nav-item">
          <div class = "nav-link">新闻</div>
        </div>
      </div>
      <div class = "pt-3">
        <swiper>
          <swiper-slide v-for = "m in 5" :key = "m">
            <div class = "py-2" v-for = "n in 5" :key = "n">
                <span>[新闻]</span>
                <span>|</span>
                <span>《魔兽世界》9.1新版本即将7月上线</span>
                <span>06/25</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </my-card> -->
    <my-list-card icon = "new" title = "新闻资讯" :categories= "newsCats">
      <!-- 对应ListCard具名插槽，只能在template使用v-slot-，v-slot:items简写：#items -->
      <template #items = "{category}">
        <router-link 
        tag = "div"
        :to = "`/articles/${news._id}`"
        class = "py-2 fs-lg d-flex" v-for = "(news,i) in category.newsList" :key = "i">
          <span class = "text-primary">[{{news.categoryName}}]</span>
          <span class = "px-2"> | </span>
          <span class = "flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <!-- 过滤器： + ‘ | 过滤器名’ -->
          <span class = "text-grey-1">{{news.createdAt | date}}</span>
        </router-link>
      </template>
      
    </my-list-card>

    <my-list-card icon = "card-hero" title = "职业列表" :categories= "heroCats">
      <!-- 对应ListCard具名插槽，只能在template使用v-slot，v-slot:items简写：#items -->
      <template #items = "{category}">
        <div class = "d-flex flex-wrap" style = "margin:0 -0.5rem">
          <router-link class = "p-2 text-center"
            style = "width: 25%;" 
            tag = "div"
            :to = "`/heroes/${hero._id}`" 
            v-for = "(hero,i) in category.heroList" :key = "i">
            <img style = "width: 100%; border-radius: 5px;" :src = "hero.avatar" alt = "">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
      
    </my-list-card>
    <my-card icon = "shipin" title = "精彩视频"></my-card>
    <my-card icon = "qa" title = "图文攻略"></my-card>


  </div>
  
  
  
</template>

<script>
import dayjs from 'dayjs';
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD');
    }
  },
  name: 'Home',
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      newsCats:[],
      heroCats:[]
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list');
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list');
      this.heroCats = res.data;
    }
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  }
} 
</script>
  
<style lang = "scss">
.pagination-home  .swiper-pagination-bullet {
  opacity: 1;
  border-radius: 0.1538rem;
  background: #fff;
}
.pagination-home .swiper-pagination-bullet-active {
  background: orange;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background-image: url("../assets/箭头l.png") !important;
  left: 5px !important;
  right: auto;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background-image: url("../assets/箭头r.png") !important;
  right: 5px !important;
  left: auto;
}
.nav-icons {
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
}
.nav-icons .nav-item {
  width: 25%;
  border-right: 1px solid #d4d9de;
}
.nav-icons .nav-item:nth-child(4n) {
  border-right: none;
}
</style>