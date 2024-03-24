import koa from 'koa'
import router from './api'
import { koaBody } from 'koa-body'
import jwt from 'koa-jwt'
import { errorsCatch } from './middleware/errors-catch'
import { loadEnv } from './utils'
import type { DotenvParseOutput } from 'dotenv'

function appRun(envInfo: DotenvParseOutput) {
  const app = new koa()
  app
    .use(errorsCatch)
    .use(
      jwt({
        secret: envInfo.JWT_SECRET,
      }).unless({ path: [/^\/public/, /\/login/] })
    )
    .use(koaBody({ multipart: true }))
    .use(router.routes())
  app.listen(8090)
}

loadEnv().then(appRun)
