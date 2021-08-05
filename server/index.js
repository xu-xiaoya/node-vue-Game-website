const express = require("express");

const app = express();

app.set('secret', 'djojoqhfuq561');

app.use(require('cors')());

app.use(express.json());
// 静态文件路由托管
app.use('/', express.static(__dirname+'/web'));
app.use('/admin', express.static(__dirname+'/admin'));
app.use('/uploads', express.static(__dirname+'/uploads'));

require('./routes/admin/index1')(app);
require('./routes/admin/index')(app);
require('./plugins/db')(app);
require('./routes/web')(app);


app.listen(3000, ()=>{
    console.log("http://localhost:3000");
})