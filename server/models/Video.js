// 模型
const mongoose = require('mongoose');


const schema = mongoose.Schema({
    title: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    // 默认值是文章创建时间,存储的是时间戳
    date: { 
        type: String,
        default: +new Date()
    },
    play: { type: String },
    cover: { type: String },
    video: { type: String }
})

// 导出mongoose的模型，在需要的地方引用
// 第三个参数省略：collection集合名字，默认为根据模型名小写+s，此处为videos
module.exports = mongoose.model('Video', schema);