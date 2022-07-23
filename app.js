const Koa = require('koa')
const mongoose = require('./src/setting/mongoose')
const cors = require('./src/setting/koa2-cors')
const jwt = require('./src/setting/jwt')
const koaBody = require('./src/setting/koa-body')
const koaStatic = require('./src/setting/koa-static')
const htmlHistory = require('./src/setting/html-history')
const routerResponse = require('./src/setting/routerResponse')
const errHandle = require('./src/setting/error-handle')
const app = new Koa()

//api部分
const user = require('./src/api/user')
const login = require('./src/api/login')
const file = require('./src/api/file')

//基础部分
app.use(cors).use(koaBody).use(routerResponse).use(errHandle).use(jwt)
//api部分
app.use(user.routes()).use(login.routes()).use(file.routes())
//静态页面托管
app.use(htmlHistory).use(koaStatic) //因为前端打包的页面文件放在了web文件夹下 前端需要将项目publicPath修改为'/web/' 再打包放入 我这里前端用的是vue-router的history模式
app.listen(9000)
console.log('app started at port 9000...')
