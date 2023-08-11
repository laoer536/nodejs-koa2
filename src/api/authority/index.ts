import type { RouterContext } from 'koa-router'
import { connection } from '../../collection/mysql'
import { ApiItem } from '../../type.global'
import { redis } from '../../collection/redis'
import jsonwebtoken from 'jsonwebtoken'
import { success } from '../../utils'
import { sendEmail } from '../../utils/nodemailer'
export const authorityApis: ApiItem[] = [
  {
    method: 'post',
    path: '/login',
    fn: async (ctx: RouterContext) => {
      const { email, randomCode } = ctx.request.body
      const preRandomCode = await redis.get(email)
      console.log(preRandomCode)
      if (preRandomCode) {
        if (randomCode === preRandomCode) {
          await connection.user.upsert({
            where: { email },
            update: { email },
            create: { email },
          })
          const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })
          ctx.body = { token }
        } else {
          throw new Error('验证码错误,请60s后重新获取。')
        }
      } else {
        const randomCode = (Math.random() * 1000000).toFixed(0)
        redis.set(email, randomCode, 'EX', 60)
        await sendEmail('test', randomCode, email)
        success(ctx, { randomCode }, '获取验证码成功')
      }
    },
  },
]
