<template>
    <div id="hero-list ">
      <div class="nav jc-around bg-white">
            <div class="nav-item" 
            v-for="(item, index) in heroCates" 
            :key="index"
            :class="{'active': active == index}"
            @click="toggleNav(index, item.name)">
                <span class="nav-link">{{ item.name }}</span>
            </div>
        
      </div>
      <!-- end of nav -->
      <div class="hero">
        <div class="hero-item mb-3" v-for="(item, index) in heroList" :key="index">
          <div class="banner">
            <img :src="item.banner" class="banner-img" alt="banner">
          </div>
          <div class="name"><strong>{{ item.name }}</strong></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'HeroList',
      data () {
        return {
          heroList: [], // 当前分类下的英雄数据
          heroCates: [], //英雄分类
          active: 0,  // 当前选中的英雄分类
          heroType: '全部'
        }
      },
      mounted () {
        this.fetchHeroCate()
      },
      methods: {
        // 获取英雄列表数据
        async fetchHeroListTwo () {
          // 传参
          const res = await this.$http.get(`/heroes/listTwo?heroType=${this.heroType}`);
          this.heroList = res.data
        },
        // 获取英雄分类
        async fetchHeroCate () {
          const res = await this.$http.get('/heroes/cate');
          this.heroCates = res.data;
          this.fetchHeroListTwo()
        },
        // 英雄类型切换
        toggleNav (index, heroType) {
          // 点击的是当前导航, 什么都不做
          if (this.active == index) return
          this.active = index
          this.heroType = heroType
          this.fetchHeroListTwo()
        }
      }
    }
</script>
<style scoped lang = "scss">
.hero {
    margin: 0 -0.7rem 1rem;
    .hero-item{
        text-align: center;
        box-sizing: border-box;
        .banner img {
            width: 85%;
            height: 150px;
        }
    }
}
</style>