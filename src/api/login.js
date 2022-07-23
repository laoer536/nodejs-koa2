const Router = require('koa-router')
const jwtToken = require('jsonwebtoken')
const router = new Router({
  prefix: '/login',
})
router.post('/', async (ctx) => {
  //payload中加入用户唯一信息 例如用户唯一id phoneNumber password等
  const token = jwtToken.sign(ctx.request.body, process.env.JWT_SECRET, {
    expiresIn: '15d', //设置该token的过期时间
  })
  ctx.success(token, '获取token成功')
})

module.exports = router
