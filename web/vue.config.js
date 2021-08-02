module.exports={
    chainWebpack:config=>{
          config.plugins.delete("prefetch")
          //删除index.html开头的带有prefetch属性的link
          //不要异步下载暂时不需要的页面组件文件
    }
}