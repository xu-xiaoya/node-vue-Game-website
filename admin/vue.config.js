module.exports={
    chainWebpack:config=>{
          config.plugins.delete("prefetch")
          //删除index.html开头的带有prefetch属性的link
          //不要异步下载暂时不需要的页面组件文件
    },

    //项目部署
    outputDir: __dirname + '/../server/admin',  //指定build生成路径

    // 若应用被部署在 https://xxx/admin/，则设置publicPath为/admin/
    publicPath: process.env.NODE_ENV === 'production' 
        ? '/admin/'     //如果是生产环境
        : '/'           //开发环境
    
}