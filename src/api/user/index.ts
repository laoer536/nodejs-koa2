import type { RouterContext } from 'koa-router'
import { connection } from '../../collection/mysql'
import type { ApiItem } from '../../types/type.global'
import { Prisma } from '@prisma/client'

export const userApis: ApiItem[] = [
  {
    method: 'get',
    path: '',
    fn: async () => {
      const data = await connection.user.findMany()
      return {
        data,
      }
    },
  },
  {
    method: 'get',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      const data = await connection.user.findUnique({ where: { id: +id } })
      return {
        data,
      }
    },
  },
  {
    method: 'post',
    path: '',
    fn: async (ctx: RouterContext) => {
      const newUserInfo = Prisma.validator<Prisma.UserCreateInput>()(ctx.request.body)
      const data = await connection.user.create({ data: newUserInfo })
      return {
        data,
        message: '用户信息提交成功',
      }
    },
  },
  {
    method: 'put',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      const { email: newEmail } = ctx.request.body
      const data = await connection.user.update({ where: { id: Number(id) }, data: { email: newEmail } })
      return {
        data,
        message: `成功修改ID为${id}的用户的email为${newEmail}`,
      }
    },
  },
  {
    method: 'delete',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      const data = await connection.user.delete({ where: { id: Number(id) } })
      return {
        data,
        message: `成功删除id为${id}的用户`,
      }
    },
  },
]
