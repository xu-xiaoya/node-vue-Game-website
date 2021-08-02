module.exports = app => {
    const CategoryModel = require('../../models/Category')
    const ItemModel = require('../../models/Item')
    const HeroModel = require('../../models/Hero')
    const AdModel = require('../../models/Ad')
    const UserModel = require('../../models/AdminUser')
    const ArticleModel = require('../../models/Article')

    const express = require('express');
    const router = express.Router({
        mergeParams:true
    });

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
    const authMiddleware = require('../../middleware/auth');
    app.use('/admin/api/rest', router);
}
    