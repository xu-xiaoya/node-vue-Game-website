// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type: String},
    avatar:{type: String},
    banner:{type:String},
    title:{type: String},
    // 多个分类
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],

    items1:[{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},
        description:{type:String},
    }]
})

// 导出mongoose的模型，在需要的地方引用,第三个参数集合名
module.exports = mongoose.model('Hero', schema, 'heroes');