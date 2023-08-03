import koa from 'koa'
import router from './api'
const app = new koa()
app.use(router.routes())
app.listen(8080)
