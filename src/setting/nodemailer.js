const nodemailer = require('nodemailer') //引入模块
let transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  service: '163', //类型qq邮箱
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_AUTH_EMAIL, // 发送方的邮箱
    pass: process.env.NODEMAILER_AUTH_PASS, // smtp 的授权码
  },
})
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

async function sendMail(mail, code, call) {
  // 发送的配置项
  let mailOptions = {
    from: '"laoer536" <laoer536@163.com>', // 发送方
    to: mail, //接收者邮箱，多个邮箱用逗号间隔
    subject: '欢迎来到"koa2-demo"', // 标题
    html: `<p>这是你本次登陆的邮箱验证码：${code}</p><a href="https://neo-liu.netlify.app/">点击跳转</a>`, //页面内容
  }

  //发送函数
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error
    } else {
      call && call(true) //因为是异步 所有需要回调函数通知成功结果
    }
  })
}

module.exports = {
  sendMail,
}
