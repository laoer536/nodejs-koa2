const Router = require('koa-router')
const jwtToken = require('jsonwebtoken')
const { sendMail } = require('../setting/nodemailer')
const router = new Router({
  prefix: '/login',
})

/**
 * @api {post} /login/ 用户登陆
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup login
 * @apiHeader {String} Authorization 用户授权token
 * @apiBody {String} name   用户姓名
 * @apiBody {Number} sex   用户性别
 * @apiBody {String} phone   电话号码
 */
router.post('/', async (ctx) => {
  //payload中加入用户唯一信息 例如用户唯一id phoneNumber password等
  const token = jwtToken.sign(ctx.request.body, process.env.JWT_SECRET, {
    expiresIn: '15d', //设置该token的过期时间
  })
  ctx.success(token, '获取token成功')
})

router.post('/email', async (ctx) => {
  const { email } = ctx.request.body
  const code = Math.floor(Math.random() * 10000)
  await sendMail(email, code)
  ctx.success(null, '发送验证码邮件成功')
})

module.exports = router
