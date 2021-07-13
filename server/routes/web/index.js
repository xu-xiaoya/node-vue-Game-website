module.exports = app=>{
    const router = require('express').Router();
    const mongoose = require('mongoose');
    // const Article = require('../../models/Article');


    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
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
        "飞行预备:准备在“统御之链”中翱翔九天阅读下文，了解如何准备在“统御之链”中翱翔九天。",]
        const newList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a,b)=>Math.random()-0.5);
            return {
                Categories:randomCats.slice(0,2),
                title:title
            }
        })
        await Article.deleteMany({});
        await Article.insertMany(newList);
        res.send(newList);
    });

    app.use('/web/api', router);
}