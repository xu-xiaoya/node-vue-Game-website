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
        
        <div class="news-item d-flex" v-for="(item, index) in newsList" :key="index">
          <div class="news-cate" :class="calcNewsClass(item.categoryName)">
            {{ item.categoryName }}
          </div>
          <router-link 
            tag="div" 
            :to="`/articles/${item._id}`" 
            class="fs-xl text-ellipsis flex-1">
            {{ item.title }}
          </router-link>
          <div class="news-date fs-sm">{{ item.createdAt | date }}</div>
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
            pageSize: 7,
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
    .news {
        padding: 0 0.8rem;
        .news-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            margin-bottom: 2rem;
            .news-cate {
                font-size:1rem;
                padding: 0 0.3rem;
                margin-right: 1rem;
                margin-left: 0.15rem; 
                
                &.news-cate-one {
                    border:2px solid green;
                    color: green;
                }
                &.news-cate-two {
                    border:2px solid #d59b40;
                    color: #d59b40
                } 
                &.news-cate-three {
                    border:2px solid red;
                    color: red
                }
                &.news-cate-four {
                    border:2px solid #4d9cff;
                    color: #4d9cff
                }  
                .news-date {
                    margin-left: 1rem;
                    color: gray
                }
            }   
        }
    }
    .next {
        margin-bottom: 1.5rem;
        .next-btn {
            width: 100%;
            height: 3.5rem;
            line-height: 3.5rem ;
            font-size: 1.3rem ;
            &:active {
                background-color: #e6e6e6;
                color: #858587;
            }
        }
    }
}
    
</style>  