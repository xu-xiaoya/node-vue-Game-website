// 接收一个app参数
module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../../models/AdminUser');
       
    const router = express.Router({
        mergeParams:true
    });

    // Category = require('../../models/Category');
    // 创建资源
    router.post('/',  async(req, res)=>{
        const model = await  req.Model.create(req.body);
        res.send(model);
    })
    // 更新资源
    router.put('/:id', async(req, res)=>{
        const model = await  req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })
    // 删除资源
    router.delete('/:id',  async(req, res)=>{
        await  req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success:true
        })
    })
    // 资源列表
    router.get('/', async(req, res)=>{        
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        // 限制查找到十条数据
        const items = await req.Model.find().setOptions(queryOptions).limit(100);
        res.send(items);
    })
    //资源详情 
    router.get('/:id', async(req, res)=>{
        const model = await  req.Model.findById(req.params.id);
        res.send(model);
    })
    
    // 封装登陆校验中间件
    const authMiddleware = require('../../middleware/auth');
    // 封装自动获取模型中间件
    const resourceMiddleware = require('../../middleware/resource');


    //  挂载子路由
    //  通用接口：/:resource, 使用req.Model
    //  使用两个中间件，第一个是用户登录，第二个是自动获取模型
    app.use('/admin/api/rest/:resource', 
        authMiddleware(), resourceMiddleware(), router);


    const multer = require('multer');
    // 文件传到的地址
    const upload = multer({dest: __dirname+'/../../uploads'})
    // upload.single('file')单个文件上传
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res)=>{
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })  



    app.post('/admin/api/login', async(req, res)=>{
        // res.send('ok');
        const {username, password} = req.body;
       
        //1.根据用户名找用户 
        //在模型中默认密码查询false，此时需要设置select('+password')
        const user = await AdminUser.findOne({
            username: username
        }).select('+password');
        // http-assert错误处理，第一个参数检查的变量，第二参数错误码，第三个参数message
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }

        //2.校验密码
        const isVaild = require('bcryptjs').compareSync(password, user.password);
        assert(isVaild, 422, '密码错误')

        //3.返回token
        const token = jwt.sign({ id: user._id}, app.get('secret'));
        res.send({token});
    })

    // 错误处理函数
    app.use(async(err, req, res, next)=>{
        // console.log(err);
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}