import type { Middleware } from 'koa'
import { connection } from '../collection/mysql'

export const authUser: Middleware = async (ctx, next) => {
  ctx.state.userInfo = await connection.user.findUnique({ where: { email: ctx.state.user.email } })
  await next()
}
