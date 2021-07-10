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
    <i class = "iconfont icon-menu1 text-primary"></i>

  </div>
  
  
  
</template>

<script>
export default {
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
      }
    };
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