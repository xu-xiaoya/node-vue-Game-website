// 接收一个app参数
module.exports = app => {
    const express = require('express');
    const router = express.Router({
        mergeParams:true
    });

    // Category = require('../../models/Category');

    router.post('/', async(req, res)=>{
        const model = await  req.Model.create(req.body);
        res.send(model);
    })
    router.put('/:id', async(req, res)=>{
        const model = await  req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })
    router.delete('/:id', async(req, res)=>{
        await  req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })
    router.get('/', async(req, res)=>{        
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        // 限制查找到十条数据
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    })
    router.get('/:id', async(req, res)=>{
        const model = await  req.Model.findById(req.params.id);
        res.send(model);
    })
    //挂载子路由
    // 通用接口：/:resource, 使用req.Model
    app.use('/admin/api/rest/:resource',async(req,res, next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        // 找models中的模板
        req.Model = require(`../../models/${modelName}`);
        next();
    }, router);
}