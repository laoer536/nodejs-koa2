import Router from 'koa-router'
import { userApis } from './user'
const apis = {
  '/user': userApis,
}
const router = new Router()

let prefix: keyof typeof apis
for (prefix in apis) {
  for (const apiItem of apis[prefix]) {
    router.prefix(prefix)[apiItem.method](apiItem.path, apiItem.fn)
  }
}

export default router
