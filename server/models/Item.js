// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type: String},
    icon:{type: String},
})

// 导出mongoose的模型，在需要的地方引用
module.exports = mongoose.model('Item', schema);