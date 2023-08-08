import koa from 'koa'
import router from './api'
import koaBody from 'koa-body'
import { errorsCatch } from './middleware/errors-catch'

const app = new koa()
app
  .use(errorsCatch)
  .use(koaBody({ multipart: true }))
  .use(router.routes())

app.listen(8080)
