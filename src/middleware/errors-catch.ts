import type { Middleware } from 'koa'
import { Prisma } from '@prisma/client'
import { getColoredText } from '../utils'
import { LogColors } from '../utils/enum'

interface CustomError extends Error {
  status?: number
}

export const errorsCatch: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const err = e as CustomError
    ctx.status = err.status || 500
    if (err.status === 401) {
      ctx.body = { code: '401', message: '请登录后访问' }
    } else {
      ctx.status = 400
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const { code, message, meta } = err
        ctx.body = {
          code,
          message: meta?.cause ? (meta.cause as string) : message,
          meta: meta?.cause ? undefined : meta,
        }
      } else {
        ctx.body = { code: 'P6000', message: err.message }
      }
    }
  }
}
