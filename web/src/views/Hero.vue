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
    <div>
      
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
      model:null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
}
</script>