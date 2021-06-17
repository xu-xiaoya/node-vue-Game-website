// 接收一个app参数
module.exports = app => {
    const express = require('express');
    const router = express.Router();

    Category = require('../../models/Category');


    router.post('/categories', async(req, res)=>{
        const model = await Category.create(req.body);
        res.send(model);
    })
    //挂载子路由
    app.use('/admin/api', router);
}