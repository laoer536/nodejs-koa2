const mongoose = require("mongoose");
let connectUrl = 'mongodb://localhost:27017/test';
mongoose.connect(connectUrl,(err)=>{
    if(err){
        console.log('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+ connectUrl);
    }
})

module.exports = mongoose;
