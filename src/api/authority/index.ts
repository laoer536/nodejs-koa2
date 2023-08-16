import type { RouterContext } from 'koa-router'
import { connection } from '../../collection/mysql'
import type { ApiItem } from '../../types/type.global'
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
      if (preRandomCode) {
        if (randomCode === preRandomCode) {
          await connection.user.upsert({
            where: { email },
            update: { email },
            create: { email, name: `用户${randomCode}` },
          })
          const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })
          ctx.body = { token }
        } else {
          throw new Error('验证码错误,请60s后重新获取。')
        }
      } else {
        /** 这里逻辑前端需要限制用户需要先点击获取验证码操作 不能在未点击获取验证码按钮的情况下调用这个接口 **/
        const randomCode = (Math.random() * 1000000).toFixed(0)
        redis.set(email, randomCode, 'EX', 60)
        await sendEmail('test', '本次登录验证码是' + randomCode, email)
        success(ctx, { randomCode }, '获取验证码成功')
      }
    },
  },
]
