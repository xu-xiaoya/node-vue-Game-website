module.exports = app => {
    const CategoryModel = require('../../models/Category')
    const ItemModel = require('../../models/Item')
    const HeroModel = require('../../models/Hero')
    const AdModel = require('../../models/Ad')
    const UserModel = require('../../models/AdminUser')
    const ArticleModel = require('../../models/Article')
    const VideoModel = require('../../models/Video')

    const express = require('express');
    const router = express.Router({
        mergeParams:true
    });
    
    // 找出职业下的子分类
    router.get('/heroes/cate', async(req, res) => {
        const data = await CategoryModel.find({ parent: "60ed4d5cdc2a8f37a98b9eab"})
        res.send(data)
    })

    // 找出文章下的子分类
    router.get('/articles/cate', async(req, res) => {
        const data = await CategoryModel.find({ parent: "60ed4d97dc2a8f37a98b9f05"})
        res.send(data)
    })

    // 找出视频下的子分类
    router.get('/videos/cate', async(req, res) => {
        const data = await CategoryModel.find({ parent: "6107a698d274221cb88c197d"})
        res.send(data)
    })
    

    // 获取用于echarts展示的数据
    router.get('/echarts', async(req, res) => {
        const category = await CategoryModel.find().countDocuments()
        const item = await ItemModel.find().countDocuments()
        const article = await ArticleModel.find().countDocuments()
        const hero = await HeroModel.find().countDocuments()
        const ad = await AdModel.find().countDocuments()
        const user = await UserModel.find().countDocuments()
        res.send([
            category,article, item, hero, ad, user
        ])
    })

    // 封装登陆校验中间件
    // const authMiddleware = require('../../middleware/auth');
    app.use('/admin/api/rest', router);
}
    