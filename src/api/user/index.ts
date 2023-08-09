import type { RouterContext } from 'koa-router'
import { connection } from '../../collection/mysql'
import { ApiItem } from '../../type.global'
import { Prisma } from '@prisma/client'
export const userApis: ApiItem[] = [
  {
    method: 'get',
    path: '',
    fn: async (ctx: RouterContext) => {
      ctx.body = await connection.user.findMany()
    },
  },
  {
    method: 'get',
    path: '/getUserInfo',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.query
      ctx.body = await connection.user.findUnique({ where: { id: Number(id) } })
    },
  },
  {
    method: 'post',
    path: '/add',
    fn: async (ctx: RouterContext) => {
      const newUserInfo = Prisma.validator<Prisma.UserCreateInput>()(ctx.request.body)
      console.log('用户信息', newUserInfo)
      await connection.user.create({ data: newUserInfo })
      ctx.body = '用户信息提交成功'
    },
  },
  {
    method: 'put',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      const { email: newEmail } = ctx.request.body
      await connection.user.update({ where: { id: Number(id) }, data: { email: newEmail } })
      ctx.body = `成功修改ID为${id}的用户的email为${newEmail}`
    },
  },
  {
    method: 'delete',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      await connection.user.delete({ where: { id: Number(id) } })
      ctx.body = `成功删除id为${id}的用户`
    },
  },
]
