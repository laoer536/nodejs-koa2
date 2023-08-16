import type { RouterContext } from 'koa-router'
import type { Next } from 'koa'
export interface ApiItem {
  method: 'get' | 'delete' | 'del' | 'post' | 'put' | 'link' | 'unlink' | 'head' | 'options' | 'patch' | 'all'
  path: string
  fn(ctx?: RouterContext, next?: Next): Promise<void>
}
