// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    categories:[{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    title:{type: String},
    body:{type: String},
}, {
    // 时间戳
    timestamps:true
})

// 导出mongoose的模型，在需要的地方引用
// 第三个参数省略：collection集合名字，默认为根据模型名小写+s，此处为articles
module.exports = mongoose.model('Article', schema);