import { RouterContext } from 'koa-router'
import { Next } from 'koa'

export interface ApiItem {
  method: 'get' | 'delete' | 'del' | 'post' | 'put' | 'link' | 'unlink' | 'head' | 'options' | 'patch' | 'all'
  path: string
  fn(ctx?: RouterContext, next?: Next): Promise<void>
}
