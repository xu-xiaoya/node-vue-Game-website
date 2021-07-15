module.exports = app=>{

    const router = require('express').Router();
    const mongoose = require('mongoose');
    // const Article = require('../../models/Article');

    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');


    // 导入新闻数据
    router.get('/news/init', async(req, res)=>{
        const parent = await Category.findOne({
            name:'新闻分类'
        });
        const cats = await Category.find().where({
            parent:parent
        }).lean();
        const newsTitles = [
            "“统御圣所”团队副本普通与英雄难度现已开放",
            "“塔扎维什，帷纱集市”地下城现已开放",
            "2021史诗钥石地下城全球锦标赛第2赛季迎接全新升级!",
            "《魔兽世界》联手百度地图与百度输入法，打造全方位游戏化体验",
            "购买180天游戏时间赠送全新蓝玉灼天者坐骑",
            "部分“燃烧的远征”服务器开放免费角色转移服务(7月2日更新)",
            "“统御之链”内容更新现已上线",
            "“暗影国度” “统御之链”更新说明",
            "统御之链”的全新盟约坐骑",
            "假日活动:战场",
            "[媒体推荐]燃烧的远征:集结号插件下载",
            "了解“统御之链”中的史诗钥石评分",
            "“燃烧的远征”竞技场第1赛季现已开始",
            "[媒体推荐]限时福利!上大神领取十万魔兽世界补贴",
            "“暗影国度”:“统御之链”的噬渊更新",
            "谁还没有一两个咕咕队友集合石地下城挑战八强趣闻",
            "假日活动:世界任务",
            "MDI极限冲层赛Skyline专访",
            "飞行预备:准备在“统御之链”中翱翔九天阅读下文，了解如何准备在“统御之链”中翱翔九天。"
        ]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a,b)=>Math.random()-0.5);
            return {
                categories: randomCats.slice(0,2),
                title: title
            }
        })
        // 数据库清空原有数据
        await Article.deleteMany({});
        // 插入newList
        await Article.insertMany(newsList);
        res.send(newsList);
    });


    
     // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //   name: '新闻分类'
        // }).populate({
        //   path: 'children',
        //   populate: {    //调children，再在其内关联newsList
        //     path: 'newsList'
        //   }
        // }).lean()

        // 先找出顶级分类：新闻分类
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        // 聚合查询
        const cats = await Category.aggregate([
            // 第一步：$match阶段，按parent字段过滤数据
            { $match: { parent: parent._id } },
            // 第二步：关联查询
            {
                $lookup: {
                    from: 'articles',   //从关联的表获取数据（collection名，默认模型名小写+s）
                    localField: '_id',          //本地键
                    foreignField: 'categories', //对应外键
                    as: 'newsList'      //别名
                }
            },
            // 第三步：添加字段（修改）
            {
                $addFields: {
                    // slice对数组字段做切片映射,第一个参数：要筛的字段，第二个参数：个数
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
            
        // 新闻公告活动赛事四个分类的id
        const subCats = cats.map(v => v._id);
        // 在头部添加一个热门板块
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                // $in运算符会筛选出字段值等于指定数组中任何值的文档
                // 此处匹配id等于 subCats的四个分类id 的分类
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                // 在热门分类的文章，应显示自身的第一个类型，如非热门，则显示分类栏的名称
                news.categoryName = (cat.name === '热门')
                    ? news.categories[0].name : cat.name
                return news;
            })
            return cat;
        })
        res.send(cats);
    })

    //导入英雄数据 

    app.use('/web/api', router);
}