import type { RouterContext } from 'koa-router'

export interface ApiRes {
  data: any
  message?: string
}
export interface ApiItem {
  method: 'get' | 'delete' | 'del' | 'post' | 'put' | 'link' | 'unlink' | 'head' | 'options' | 'patch' | 'all'
  path: string
  fn: (ctx: RouterContext) => Promise<ApiRes>
}
