<template>
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
</style>