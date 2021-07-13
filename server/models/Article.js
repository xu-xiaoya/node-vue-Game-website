// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    categories:[{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    title:{type: String},
    body:{type: String},
}, {
    timestamp:true
})

// 导出mongoose的模型，在需要的地方引用
module.exports = mongoose.model('Article', schema);