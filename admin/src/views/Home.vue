<template>
<div>
    <h2 class = "text-primary text-center">WLECOME TO WOW-ADMIN !</h2>
    <div class = "d-flex">
        <div class="myChart  flex-1 mt-5" 
        :style="{height: '400px'}"></div>
    </div>
   
</div>
</template>

<script>
export default {
    name:'home',
    data () {
      return {
        echartsData: []
      }
    },
    mounted () {
      this.fetchEcharts()
      this.drawEcharts()
    },
    watch: {
      echartsData () {
        this.drawEcharts()
      }
    },
    methods: {
      async fetchEcharts () {
        const res = await this.$http.get('rest/echarts');
        this.echartsData = res.data
      },
      drawEcharts () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.echarts.init(document.querySelector('.myChart'))
        //指定图表的配置项和数据
        myChart.setOption({
            title: { 
                text: '后台数据一览',
                left:'center',
            },
            tooltip: {},
            xAxis: {
                data: ['分类','文章','专精', '英雄', '广告位', '管理员']
            },
            yAxis: {},
            series: [{
                name: '总数',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#db9e3f','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                //   data: [5,10,11,12,13],
                data:this.echartsData,
                
            }]
        })
      }
    }
}
</script>

<style>

</style>