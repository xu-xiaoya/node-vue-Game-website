module.exports = app => {
    const mongoose = require('mongoose');

    /* 解决以下警告： DeprecationWarning: 
    Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` 
    without the `useFindAndModify` option set to false are deprecated. 

    原因是因为:`findOneAndUpdate()` and `findOneAndDelete()` 
    等内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告！*/
    mongoose.set('useFindAndModify', false)


    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-Game-Website', {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

    require('require-all')(__dirname +'/../models')
}