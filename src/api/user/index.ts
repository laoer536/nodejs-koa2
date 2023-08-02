import type { RouterContext } from 'koa-router'
import type { ApiItem } from './types'
export const userApis: ApiItem[] = [
  {
    method: 'get',
    path: '/',
    fn: async (ctx: RouterContext) => {
      console.log(ctx.state.user) //这里能拿到当前token里面的用户信息 全局可用
    },
  },
  {
    method: 'get',
    path: '/getUserInfo',
    fn: async (ctx: RouterContext) => {
      const { id } = ctx.params
      console.log(`获取id为${id}的用户`)
    },
  },
  {
    method: 'post',
    path: '/add',
    fn: async (ctx: RouterContext) => {
      console.log(ctx.request.res, '用户信息提交成功')
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
