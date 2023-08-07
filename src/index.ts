import koa from 'koa'
import router from './api'
import { koaBody } from 'koa-body'
const app = new koa()
app.use(koaBody()).use(router.routes())
app.listen(8080)
