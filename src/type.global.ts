import type { RouterContext } from 'koa-router'
import type { Next } from 'koa'
export interface ApiItem {
  method: 'get' | 'delete' | 'del' | 'post' | 'put' | 'link' | 'unlink' | 'head' | 'options' | 'patch' | 'all'
  path: string
  fn(ctx?: RouterContext, next?: Next): Promise<void>
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      MYSQL_HOST: string
      MYSQL_PORT: string
      MYSQL_USER: string
      MYSQL_PASSWORD: string
      MYSQL_DATABASE: string
    }
  }
}
