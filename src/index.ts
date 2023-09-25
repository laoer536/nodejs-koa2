import koa from 'koa'
import router from './api'
import koaBody from 'koa-body'
import jwt from 'koa-jwt'
import { errorsCatch } from './middleware/errors-catch'
import { loadEnv } from './utils'
import record from './record'
loadEnv()
record()

const app = new koa()
app
  .use(errorsCatch)
  .use(
    jwt({
      secret: process.env.JWT_SECRET as string,
    }).unless({ path: [/^\/public/, /\/login/] })
  )
  .use(koaBody({ multipart: true }))
  .use(router.routes())

app.listen(8080)
