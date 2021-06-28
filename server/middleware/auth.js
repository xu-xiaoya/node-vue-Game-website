module.exports = options => {
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../models/AdminUser');

    return async(req, res, next)=>{
        //split用空格分隔，pop()提取最后一个元素
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请先登录');
        // 解析出ID
        const {id} = jwt.verify(token, req.app.get('secret'));
        assert(id, 401, '请先登录');
        // 挂载在req，后续接口也可以使用
        req.user = await AdminUser.findById(id);
        assert(req.user, 401, '请先登录');
        await next();
    }
}
