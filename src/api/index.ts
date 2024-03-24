import Router from 'koa-router'
import { userApis } from './user'
import { authorityApis } from './authority'
import { tracerFn } from '../record'

const apis = {
  '/user': userApis,
  '/authority': authorityApis,
}
const router = new Router()

let prefix: keyof typeof apis
for (prefix in apis) {
  for (const apiItem of apis[prefix]) {
    const realPath = prefix + apiItem.path
    router[apiItem.method](realPath, (ctx) => tracerFn(ctx, apiItem.fn, `${apiItem.method.toUpperCase()} ${realPath}`))
  }
}

export default router
