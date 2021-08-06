<template>
    <div id="video-play">
      <video :src="videoDetail.video" controls width="100%"></video>

      <div class="video-info">
        <div class="title">【标题】{{ videoDetail.title }}</div>

        <div class="author mt-4">
            <div class = "d-flex">
                <img v-lazy="videoDetail.avatar" alt="avatar">
                <div class = "flex-1 ml-3 mt-1">
                    <div class="fs-lg">
                        <strong>作者：</strong> {{ videoDetail.author }}
                    </div>
                    <div class="fans fs-sm mt-2 text-grey">
                        粉丝: {{ videoDetail.fans }}
                    </div>
                    
                </div>
            </div>
            <div class="sign mt-3">
                个性签名: 这个人很懒, 什么都没有留下(〜￣△￣)〜
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'VideoPlay',
      data () {
        return {
          videoDetail: {}
        }
      },
      mounted () {
        this.videoDetail = JSON.parse(localStorage.getItem('video'))
      }
    }
</script>
<style scoped lang = "scss">
#video-play {
    .video-info {
        position: relative;
        margin: 1rem 0.5rem;
        padding-left: 1rem;
        .title {
            font-size: 1.3077rem;
            color: orange;
            line-height:1.5385rem;
            margin-bottom: 0.5rem ;
        }
        .author {
            img {
                width: 45px;
                height: 45px;
            }
        }
        
    }
}
</style>