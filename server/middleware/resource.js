module.exports = options => {
    return async(req, res, next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        // 找models中的模板
        req.Model = require(`../models/${modelName}`);
        next();
    }
}
