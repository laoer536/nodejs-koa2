import Router from 'koa-router'
import { userApis } from './user'
import { authorityApis } from './authority'

const apis = {
  '/user': userApis,
  '/authority': authorityApis,
}
const router = new Router()

let prefix: keyof typeof apis
for (prefix in apis) {
  for (const apiItem of apis[prefix]) {
    router[apiItem.method](prefix + apiItem.path, apiItem.fn)
  }
}

export default router
