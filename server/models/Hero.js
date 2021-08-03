// 模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type: String},
    avatar:{type: String},
    banner:{type:String},
    title:{type: String},
    hot: { type: Boolean,default: false},

    // 多个分类
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    scores:{    //分数
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    features:[{   //特点
        icon:{type:String},
        name:{type:String},
        description:{type:String},
    }],

    items1:[{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    
    description:{type:String},
    battleTips:{type:String},
    tools:{type:String},
    
    partners:[{  //搭档
        hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},
        description:{type:String},
    }],

    video:{type:String},
})

// 导出mongoose的模型，在需要的地方引用,第三个参数集合名
module.exports = mongoose.model('Hero', schema, 'heroes');