const CompressionPlugin = require('compression-webpack-plugin')
module.exports={
    // gzip
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }
    },
    chainWebpack:config=>{
          config.plugins.delete("prefetch")
          //删除index.html开头的带有prefetch属性的link
          //不要异步下载暂时不需要的页面组件文件
    },
    //项目部署
    outputDir: __dirname + '/../server/web',  //指定build生成路径
 
    // 若应用被部署在 https://xxx/admin/，则设置publicPath为/admin/
    publicPath: process.env.NODE_ENV === 'production' 
        ? '/'           //如果是生产环境
        : '/'           //开发环境
    
}