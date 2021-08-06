<template>
  <div>
    <div class = "ads-wrap">
      <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in homeAds" :key="index">
            <a :href="item.url">
              <img :src="item.image" style="display:block; width:100%" alt="ads-img">
            </a>
          </swiper-slide>

          <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div> 
    <!-- end of swiper -->

    <div class = "nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class = "icon d-flex flex-wrap" >
        <div class = "nav-item mb-3">
          <a href="https://www.wowchina.com/zh-cn/" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-game"></i>
            <div class = "py-2">游戏官网</div>
          </a>
        </div>
        <div class = "nav-item mb-3">
          <a href="https://bbs.nga.cn/" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-nga"></i>
            <div class = "py-2">NGA社区</div>
          </a>
        </div>
        <div class = "nav-item mb-3">
          <a href="https://www.blizzardgearstore.cn/" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-shop"></i>
            <div class = "py-2">周边商城</div>
          </a>
        </div>
        <div class = "nav-item mb-3">
          <a href="https://www.wowchina.com/zh-cn/story" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-story"></i>
            <div class = "py-2">故事站</div>
          </a>
        </div>
        <div class = "nav-item mb-3" :class="{'down': !foldIcon}">
          <a href="https://www.wowchina.com/zh-cn/news/17507919/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E3%80%8E%E6%9A%B4%E9%9B%AA%E6%B8%B8%E6%88%8F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83%E3%80%8F%E7%8E%B0%E5%B7%B2%E5%BC%80%E9%80%9A" 
          class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-weixin"></i>
            <div class = "py-2">公众号</div>
          </a>
        </div>
        <div class = "nav-item mb-3" :class="{'down': !foldIcon}">
          <a href="https://www.pvpleaderboard.com/" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-pvp"></i>
            <div class = "py-2">pvp Leader</div>
          </a>
        </div>
        <div class = "nav-item mb-3" :class="{'down': !foldIcon}">
          <a href="https://wago.io/weakauras" class = "text-black" style = "text-decoration: none;">
            <i class = "sprite sprite-wa"></i>
            <div class = "py-2">WA插件</div>
          </a>
        </div>
      </div>
      <div class = "fold bg-light py-2 fs-sm"  @click="foldIcon=!foldIcon">
        <i class = "fold-icon sprite sprite-arrow mr-1" :class="{ 'down': !foldIcon }"></i>
        <span class="fold-txt">{{ foldIcon ? '收起' : '展开' }}</span>
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
      <template v-slot:banner>
        <div class="banner">
          <img src="../assets/img/home_1.jpg" class="news-hero" alt="new_hero" style = "width: 100%;height: 150px;">
        </div>
      </template>
      <!-- 对应ListCard具名插槽，只能在template使用v-slot，v-slot:items简写：#items -->
      <template #items = "{category}">
        <div class = "d-flex flex-wrap" style = "margin:0 -0.5rem">
          <router-link class = "p-2 text-center"
            style = "width: 25%;" 
            tag = "div"
            :to = "`/heroes/${hero._id}`" 
            v-for = "(hero,i) in category.heroList" 
            :key = "i"
          >
            <my-image style = "width: 100%; height:5.7692rem; border-radius: 5px;" :src = "hero.avatar" alt = "">
            </my-image>
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </my-list-card>


    <my-list-card icon = "shipin" title = "精彩视频" :categories= "videoCates" class = "mb-3" >
      <!-- 对应ListCard具名插槽，只能在template使用v-slot，v-slot:items简写：#items -->
      <template #items = "{category}">
        <div class = "d-flex flex-wrap" style = "margin:0 -0.5rem">
          <div class = "p-2 text-center"
            style = "width: 33%;" 
            @click="videoPlay(video)"
            v-for = "(video,i) in category.videoList" 
            :key = "i">
            <div class="cover">
              <my-image style = "width: 100%; height:4.6154rem" 
              :src = "video.cover" alt = ""></my-image>
            </div>
            <div class="title ">
              <span class = "text-ellipsis" style = "width: 120px;">{{ video.title }}</span>
            </div>
            <div class="info d-flex">
              <i class="iconfont icon-liebiaoicon-bofangliang"></i>
              <span class="play ">{{ video.play }}</span>
              <span class="date flex-1">{{ video.date | date }}</span>
            </div>
          </div>
        </div>
      </template>
    </my-list-card>


    <!-- <my-card icon = "qa" title = "图文攻略"></my-card> -->
    
    
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
        
        autoplay: {
          delay: 3000,
          // 无loop情况下才有效，循环轮播
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
      homeAds: [],    // 广告数据
      newsCats:[],    //新闻数据
      heroCats:[],    //职业数据
      videoCates:[],  //视频数据
      foldIcon:false, // 控制图标区域的展开
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
    },
    async fetchHomeAds() {
      const res = await this.$http.get('ads/home');
      this.homeAds = res.data;
    },
    async fetchVideos() {
      const res = await this.$http.get('videos/list');
      this.videoCates = res.data;
    },
    // 跳转到视频播放页
    videoPlay (video) {
      // 保存视频数据到本地
      localStorage.setItem('video', JSON.stringify(video))
      this.$router.push('/videoPlay')
    },
  },
  created(){
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchHomeAds();
    this.fetchVideos();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(0, 1000, false);
    // this.swiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
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

.icon {
  overflow: auto;     
  .down{
     display: none;
  }   
}

@keyframes mycolor {
  0% {
    position: relative;
    background-color: red; 
  }
  /* 50% { 
    
    background-color: red; 
    opacity: 0;
  } */
  100% { 
   
  }

}

.fold  {
        text-align: center;
        .fold-icon {
          &.down {
            transform: rotateX(180deg);
          }   
        }
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