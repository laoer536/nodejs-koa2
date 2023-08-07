import type { RouterContext } from 'koa-router'
import { connection } from '../../collection/mysql'
import { ApiItem } from '../../type.global'
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
      ctx.body = `获取id为${id}的用户sss`
    },
  },
  {
    method: 'post',
    path: '/add',
    fn: async (ctx: RouterContext) => {
      console.log(ctx.request.body, '用户信息提交成功')
      await connection.user.create({ data: ctx.request.body })
      ctx.response.body = '用户信息提交成功'
    },
  },
  {
    method: 'put',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      console.log(`修改id为${id}的用户`)
    },
  },
  {
    method: 'delete',
    path: '/:id',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      console.log(`删除id为${id}的用户`)
    },
  },
]
