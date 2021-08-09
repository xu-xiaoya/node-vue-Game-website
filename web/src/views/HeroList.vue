<template>
    <div id="hero-list ">
        <div class="nav jc-around  bg-white">
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
            <router-link 
            class="hero-item mb-3" 
            tag = "div"
            :to="`/heroes/${item._id}`" 
            v-for="(item, index) in heroList" 
            :key="index">
                <div class="banner">
                    <img v-lazy="item.banner" class="banner-img" alt="banner">
                </div>
                <div 
                class="name"
                :class="calcNewsClass(item.name)"
                >
                  <span><strong>{{ item.name }}</strong></span>
                </div>
            </router-link>
        </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'HeroList',
        data () {
        return {
          currentSkillIndex:0,

          heroList: [], // 当前分类下的英雄数据
          heroCates: [], //英雄分类
          active: 0,  // 当前选中的英雄分类
          heroType: '全部'
        }
      },
      computed:{
        currentSkill() {
        return this.model.features[this.currentSkillIndex];
        },
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
        },
        calcNewsClass (heroName) {
            let className = ''
            switch (heroName) {
                case '猎人': className = 'Hunter'
                    break
                case '牧师': className = 'Priest'
                    break
                case '法师': className = 'Mage'
                    break
                case '武僧': className = 'Monk'
                    break
                case '恶魔猎手': className = 'Demon-Hunter'
                    break
                case '圣骑士': className = 'Paladin'
                    break
                case '潜行者': className = 'Rogue'
                    break
                case '萨满祭司': className = 'Shaman'
                    break
                case '术士': className = 'Warlock'
                    break
                case '死亡骑士': className = 'Death-Knight'
                    break
                case '战士': className = 'Worrior'
                    break
                case '德鲁伊': className = 'Druid'
                    break
                default: heroName = 'hero'
            }
            return className
        }      
      }
    }
</script>
<style scoped lang = "scss">
.nav {
    display: flex;
    margin-bottom: 1.5rem; 
    .nav-item {
        position: relative;
        /* border:1px black solid; */
        width: 25%;
        height: 2.5rem;
        line-height: 2.5rem;  
        text-align: center;
        font-size: 1rem;
        
        &:after{
          background-color: transparent;
        }
        &.active {
          color: orange
        } 
        &.active:after{
          background-color: orange 
        }
    }
}
.hero {
    margin: 0 -0.7rem 3rem;
    .hero-item{
        text-align: center;
        box-sizing: border-box;
        .banner img {
            width: 85%;
            height: 150px;
        }
        .name {
          width: 85%;
          margin-left: 7.5%;
          margin-top: -1%;
          background-color: #fff;
          span{
            display: inline-block;
            height:25px;
            line-height:25px;
          }
          &.Hunter {
            color: green;
          }
          &.Priest {
            color: rgb(255, 255, 255);
            background-color: rgb(212, 212, 212);
          }
          &.Mage {
            color: rgb(0, 164, 214);
          }
          &.Monk {
            color: #00FF96;
          }
          &.Demon-Hunter {
            color: rgb(161, 8, 199);
          }
          &.Paladin {
            color: rgb(230, 124, 156);
          }
          &.Rogue {
            color: rgb(221, 218, 60);
          }
          &.Shaman {
            color: rgb(47, 53, 139);
          }
          &.Warlock {
            color: rgb(109, 114, 184)
          }
          &.Death-Knight {
            color: red;
          }
          &.Worrior {
            color: rgb(133, 117, 104);
          }
          &.Druid {
            color: orange;
          }
          &.hero {
            color: #000;
          }
        }
    }
}
</style>