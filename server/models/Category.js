// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type: String},
    parent:{type: mongoose.SchemaTypes.ObjectId, ref:'Category'},
})

// 虚拟，不会存储在数据库中
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})


// 导出mongoose的模型，在需要的地方引用
module.exports = mongoose.model('Category', schema);