<template>
<div id="news-list">
    <div class="nav">
        <div class="nav-item" 
        v-for="(item, index) in newsCates" 
        :key="index"
        :class="{'active': active == index}"
        @click="toggleNav(index, item.name)"
        >
        
            <span class="nav-link">{{ item.name }}</span>
        </div>
    </div>
    <!-- end of nav -->

    <div class="news">
        <div class="news-item" v-for="(item, index) in newsList" :key="index">
          <div class="news-cate" :class="calcNewsClass(item.categoryName)">
            {{ item.categoryName }}
          </div>
          <router-link 
            tag="div" 
            :to="`/article/detail/${item._id}`" 
            class="news-title text-ellipsis">
            {{ item.title }}
          </router-link>
          <div class="news-date">{{ item.createdAt | date }}</div>
        </div>
    </div> 
    <!-- end of news-->
      
        <div class="next">
            <button class="next-btn radius-large" @click="fetchNext">
            {{ hasNext ? '点击加载更多' : '已显示全部内容' }}
            </button>
        </div>
    </div>
  </template>
  
<script>
import dayjs from 'dayjs';
export default {
    name: 'NewsList',
    filters: {
        date(val) {
            return dayjs(val).format('MM/DD');
        }
    },
    data () {
        return {
            active: 0,  // 当前选中的导航
            newsCates: [],  // 新闻分类数据
            newsList: [],  // 新闻列表数据
            newsType: '热门', // 选中的新闻类型
            page: 1,
            pageSize: 5,
            hasNext: true  //是否有下一页 
        }
    },
    mounted () {
        this.fetchNewsListOne()
        this.fetchNewsListTwo()
    },
    methods: {
        // 获取新闻数据, 用于动态渲染导航
        async fetchNewsListOne () {
            const res = await this.$http.get('/news/list');
            this.newsCates = res.data
        },
        // 获取新闻列表数据
        async fetchNewsListTwo () {
            const res = await this.$http.get(`/news/listTwo?newsType=${this.newsType}&page=${this.page}&pageSize=${this.pageSize}`)
            this.newsList = this.newsList.concat(res.data.newsList)
            this.hasNext = res.data.hasNext;
            console.log('pageSize');
        },
        // 切换新闻类型
        toggleNav (index, newsType) {
            // 如果点击的是当前导航，什么都不做
            if (this.active == index) return
            this.active = index
            this.page = 1
            this.newsType = newsType
            this.newsList = []
            this.fetchNewsListTwo()
        },
        // 获取下一页数据
        fetchNext () {
            // 没有下一页
            if (!this.hasNext) return
            this.page = this.page + 1
            this.fetchNewsListTwo()
        },

        // 计算新闻分类类名
        calcNewsClass (categoryName) {
            let className = ''
            switch (categoryName) {
                case '新闻': className = 'news-cate-one'
                    break
                case '公告': className = 'news-cate-two'
                    break
                case '活动': className = 'news-cate-three'
                    break
                case '赛事': className = 'news-cate-four'
                    break
                default: categoryName = 'news-cate-one'
            }
            return className
        }      
    }
}
</script>
  
<style lang="scss" scoped>
#news-list {
    .nav {
        display: flex;
        margin-bottom: 1.5rem; 
        .nav-item {
            position: relative;
            /* border:1px black solid; */
            width: 25%;
            height: 3rem;
            line-height: 3rem;  
            text-align: center;
            font-size: 1.0769rem;
            &.active{
                background:url("../assets/img/video_navBg.png");
                /* width: 50%; */
                border-radius: 3px;
                color: white;
            }
            
        }
        
        
        
    }
    
}
    
</style>  