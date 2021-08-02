<template>
  <div class="page-hero" v-if = "model">
    
    <div class = "topbar bg-black py-2 px-3 text-white d-flex ai-center">
      <img src = "../assets/logo.png" height="30">
      <!-- flex-1：左边和右边不变，中间的占用剩余的空间 -->
      <div class = "px-2 flex-1">
          <span class = "text-white">魔兽世界</span>
          <span class = " ml-2 text-grey-1 fs-xxs ">攻略站</span>
      </div>
      <router-link tag = "div" to = "/">返回首页&gt;
      </router-link>
    </div>
    <!-- end of topbar -->
    <div class = "top" :style = "{'background-image':`url(${model.banner})`}">
      <div class = "info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class = "fs-sm">{{model.title}}</div>
        <h2 class = "my-2">{{model.name}}</h2>
        <div class = "fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class = "d-flex jc-between py-2">
          <div class = "scores d-flex ai-center" v-if = "model.scores">
            <span>难度</span>
            <span class = "badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class = "badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class = "badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class = "badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link tag = "span" class = "text-grey">
            皮肤: 2&gt;
          </router-link>
        </div>
      </div>
    </div>  
    <!-- end of top -->

    <div>
      <!-- <div class = " bg-white px-3">
        <div class = "nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class = "nav-item active">
            <div class = "nav-link">职业介绍</div>
          </div>
          <div class = "nav-item">
            <div class = "nav-link">进阶攻略</div>
          </div>
        </div>
      </div> -->

      <div class = " bg-white px-3">
        <div class = "nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class = "nav-item" :class = "{active: active === 0}"
          @click = "$refs.list.swiper.slideTo(0); active=0;">
            <div class = "nav-link">职业介绍</div>
          </div>
          <div class = "nav-item" :class = "{active: active === 1}"
          @click = "$refs.list.swiper.slideTo(1); active=1;">
            <div class = "nav-link">进阶攻略</div>
          </div>
        </div>
      </div>


      <swiper ref = "list" :options = "{autoHeight:true}" 
      @slide-change = "() => active = $refs.list.swiper.realIndex">
        <swiper-slide>
          <div>
            <div class = "p-3 bg-white border-bottom">

              <div class = "m-2">{{model.description}}</div>
              <br>

              <div class ="d-flex">
                <router-link tag = "button" to = "/" class = "btn btn-lg flex-1">
                  <i class = "iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag = "button" to = "/" class = "btn btn-lg flex-1 ml-2">
                  <i class = "iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
              </div>

            </div>
            
            <!-- features -->
            <my-card plain icon = "tedian" title = "特点">
              <div class = "skills bg-white mt-4">
                <div class = "d-flex jc-around">
                  <img
                  class = "icon"
                  @click = "currentSkillIndex = i"
                  :class = "currentSkillIndex === i?'active': ''" 
                  :src = "item.icon" 
                  v-for = "(item,i) in model.features" 
                  :key = "item.name"
                  >
                </div>
                <div v-if = "currentSkill">
                  <div class = "py-4 text-center">
                    <h3 class = "m-0">{{currentSkill.name}}</h3>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class = "border-bottom"></div>
                </div>
              </div>
            </my-card>

            <my-card plain icon ="jineng" title = "专精" class = "hero-items">
              <div class = "d-flex jc-around text-center mt-3">
                <div v-for = "item in model.items1" :key = "item.name">
                  <img :src = "item.icon" class = "icon">
                  <div class = "fs-xxs">{{item.name}}</div>
                </div>
              </div>
            </my-card>
            
          </div>
        </swiper-slide>

        <swiper-slide>
          <div>
            <my-card plain icon ="shipin" title = "视频介绍">
              <div>
                
                <iframe :src="model.video" scrolling="no" border="0" 
                frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
              </div>

            </my-card>

            <my-card plain icon ="duikang" title = "对抗技巧">
              <div class = "m-0">{{model.battleTips}}</div>
            </my-card>
            <my-card plain icon ="wuqiku" title = "使用武器">
              <div class = "m-0">{{model.tools}}</div>
            </my-card>

            <my-card plain icon ="guanxi" title = "英雄关系">
              <div class = "fs-xl">最佳搭档</div>
              <router-link 
              :to = "`/heroes/${item.hero._id}`"
              v-for = "item in model.partners" 
              :key = "item._id"
              class = "d-flex pt-3">
                <img :src = "item.hero.avatar" alt = "" height="50px">
                <p class = "flex-1 ml-2">
                  <strong>{{item.hero.name}}：</strong>{{item.description}}
                </p>  
              </router-link>

              <div class = "border-bottom mt-2"></div>
            </my-card>

          </div>
        </swiper-slide>
        
      </swiper>
    </div>
    
  </div>
</template>
<script>
export default {
  props: {
    id: {required:true}
  },
  data() {
    return {
      model:null,
      currentSkillIndex:0,
      // nav切换
      active:0,
    }
  },
  // 监视id变化并更新页面
  watch: {
    id: 'fetch'
    // id () {
    //   this.fetch();
    // }
  },
  computed:{
    currentSkill() {
      return this.model.features[this.currentSkillIndex];
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  },
}
</script>
<style>
  .page-hero .top {
    height: 50vw;
    background:#fff no-repeat top center;
    background-size: 100% auto;
  }
  .page-hero .info {
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
  }
  .page-hero .info  .scores .badge{
    margin: 0 0.25rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    line-height: 0.9rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.6rem;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .skills img{
    width: 70px;
    height: 70px;
    border:3px solid #fff;
    border-radius: 50%;
  }
  .skills img.active {
    border:3px solid #db9e3f;
    border-radius: 50%;
  }
  .hero-items img.icon{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>