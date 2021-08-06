<template>
  <div id="strategy">
    <div class="ads-wrap">
      <swiper ref="adsSwiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) in strategyAds" :key="index">
          <a :href="item.url">
            <img width="100%" height="200px" style="display:block" :src="item.image" alt="ads">
          </a>
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      </swiper>
    </div>
    <!-- end of ads -->

    <div class="rank-card mb-2">
      <div class="rank-header">
        <i class="iconfont icon-shipin"></i>
        <div class="title">热门视频</div>
        <div class="cates">
          <span class="cate cate-day" :class="{'active': active == 0}" @click="toggleNav(0)">日</span>
          <span class="cate cate-week" :class="{'active': active == 1}" @click="toggleNav(1)">周</span>
          <span class="cate cate-month" :class="{'active': active == 2}" @click="toggleNav(2)">月</span>
        </div>
      </div>
      <!-- end of videocate -->
      <div class="rank-body">
        <swiper ref="mySwiper" :options="options">
          <swiper-slide v-for="(item, index) in videoRank" :key="index">
            <div class="video" :class="{'down': foldRank}">
              <div class="video-item video-item-1" @click="videoPlay(item.videoList[0])">
                <div class="cover">
                  <img v-lazy="item.videoList[0].cover" class="cover-img" alt="cover">
                </div>
                <div class="info">
                  <div class="title">{{ "1. " + item.videoList[0].title }}</div>
                  <div class="other">
                    <div class="play-wrap">
                      <i class = "iconfont icon-liebiaoicon-bofangliang"></i>
                      <span class="play">{{ item.videoList[0].play }}</span>
                    </div>
                    <div class="date-wrap">
                      <i class = "iconfont icon-liebiaoicon-bofangliang"></i>
                      <span class="play-wrap">{{ item.videoList[0].date | date }}</span>                      
                    </div>
                  </div>
                </div>                
              </div>
              <!-- end of item-1 -->
              <div class="video-item video-item-2" 
                v-for="(video, i) in item.videoList.slice(1, item.videoList.length)"
                 @click="videoPlay(video)"
                :key="i">
                <div class="title text-ellipsis">{{ i + 2 + ". " + video.title }}</div>
                <div class="play-wrap">
                  <i class = "iconfont icon-liebiaoicon-bofangliang"></i>
                  <span class="play">{{ video.play }}</span>
                </div>
              </div>
            </div>
            <div class="rank-more" @click=" foldRank=!foldRank">
              {{ foldRank ? '查看完整榜单' : '收起榜单' }}
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- end of videorank1 -->

    <div class="rank-card mb-3">
      <div class="rank-header">
        <i class="iconfont icon-shipin"></i>
        <div class="title">游戏攻略</div>
      </div>
      <!-- end of cate2 -->
      <div class="rank-body">
        
            <div class="video" :class="{'down': foldStrategy}">
              <div 
              class="video-item video-item-1" 
              v-for="(video, i) in videoStrategy" 
              :key = "i"
              @click="videoPlay(video)">
                <div class="cover">
                  <my-image :src="video.cover" class="cover-img" alt="cover"></my-image>
                </div>
                <div class="info">
                  <div class="title">{{ "1. " + video.title }}</div>
                  <div class="other">
                    <div class="play-wrap">
                      <i class = "iconfont icon-liebiaoicon-bofangliang"></i>
                      <span class="play">{{ video.play }}</span>
                    </div>
                    <div class="date-wrap">
                      <i class = "iconfont icon-liebiaoicon-bofangliang"></i>
                      <span class="play-wrap">{{ video.date | date }}</span>                      
                    </div>
                  </div>
                </div>                
              </div>
              <!-- end of item-1 -->
            </div>
            <div class="rank-more" @click=" foldStrategy=!foldStrategy">
              {{ foldStrategy ? '查看完整榜单' : '收起榜单' }}
            </div>
            
      </div>
    </div>
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
    name: 'Strategy',
    data () {
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
        },
        options: {
          // 每个swiper项高度自动撑开
          autoHeight: true,
          on: {
            // swiper从当前slide开始过渡到另一个slide时执行
            slideChangeTransitionStart: () => {
              let swiper = this.$refs.mySwiper.swiper
              let activeIndex = swiper.activeIndex
              this.active = activeIndex
              this.foldRank = true
            }
          }
        },

        strategyAds: [], // 广告数据
        videoRank: [], // 视频排行数据
        videoStrategy: [], // 攻略视频数据

        active: 0,  // 当前选中的视频排行类型
        foldRank: true, // 控制视频排行榜的折叠
        foldStrategy: true, // 控制攻略视频的折叠
      }
    },
    created(){
      this.fetchStrategyAds();
      this.fetchVideoRank();
      this.fetchVideoStrategy();
    },
    mounted () {
      this.swiper.slideTo(0, 1000, false);
    },
    computed: {
      swiper() {
        return this.$refs.adsSwiper.swiper;
      }
    },
    methods: {
       // 导航切换
      toggleNav (index) {
        this.active = index;
        this.foldRank = true;
        console.log(this.$refs);
        this.$refs.mySwiper.swiper.slideTo(index, 300, false);
      },
      
      // 获取策略中心轮播图数据
      async fetchStrategyAds () {
        const res = await this.$http.get('/strategy/home');
        this.strategyAds = res.data
      },
      // 获取视频排行榜数据
      async fetchVideoRank () {
        const res = await this.$http.get('/video/rank');
        this.videoRank = res.data
      },
      // 获取游戏攻略视频数据
      async fetchVideoStrategy () {
        const res = await this.$http.get('/video/strategy');
        this.videoStrategy = res.data
      },
      // 跳转到视频播放页
      videoPlay (item) {
        // 保存视频数据到本地
        localStorage.setItem('video', JSON.stringify(item))
        this.$router.push('/videoPlay')
      },


    }
  }
</script>

<style lang="scss" scoped>
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
#strategy{
  .rank-card,  {
    background-color: white;
    margin-top: 1rem;
    padding: 0 1.2rem;
    .rank-header {
      padding: 1.5rem 0;
      display: flex;
      justify-content: flex-start;
      height: 4rem;
      line-height:2rem ;
      border-bottom:1px solid gray;
      .title {
        font-size: 13px;
          font-weight: 700;
          margin-left: 0.5rem;
          flex: 1;
          color: black; 
      }
      .cates {
        background-color: white;
        .cate {
          position: relative;
          display: inline-block;
          height: 2.3rem;
          line-height: 2.3rem;
          margin-left: 1.6rem;
          font-size: 0.7692rem;
          color: #343440;         
          &.active {
            color: orange
          }
        }
      }
    }  
  }
  .rank-body {
    .swiper-slide {
      margin-right: 0.1rem;
    }
    .video {
      &.down {
        height: 13rem;
        overflow: hidden;
      }
      .video-item {
        padding: 0.7rem 0;
        border-bottom:1px solid #e6e6e6;
        .title {
          font-size: 1.0769rem;
          color: #343440;
        }
            
        .play-wrap, .date-wrap {
          font-size: 0.6923rem;
          color: #7a7a80;
          margin-right: 0.3rem;
        }
      } 
      .video-item-2 {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .title {
          flex: 1;
        }
        .play-wrap {
          /* margin-left: 1rem; */
          margin-right: 0.5rem;
        }
      }
      .video-item-1 {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .cover{
          position: relative;
          margin-right: 1.5rem; 
          .cover-img {
            display: block;
            width: 10rem;
            height: 70px;
          }  
        }
        .info {
          flex: 1;
          .title {
            height: 3rem;
            line-height: 1.75em;
            margin-bottom: 1.2rem; 
          }
          .other {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
          } 
        }
      }
    }    
    .rank-more {
      height: 3.4rem;
      line-height: 3.4rem;
      text-align: center;
      color: #7a7a80;
      background-color: #fff;
    }
  }
}
</style>
