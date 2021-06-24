// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type:String },
    password: { 
        type:String,
        // false查不出来 
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val,10)
        }
    },
})

// 导出mongoose的模型，在需要的地方引用
module.exports = mongoose.model('AdminUser', schema);