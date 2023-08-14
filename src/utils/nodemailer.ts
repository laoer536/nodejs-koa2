import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
const transporter = nodemailer.createTransport({
  //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
  service: '163', //类型qq邮箱
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_AUTH_EMAIL, // 发送pnp方的邮箱
    pass: process.env.NODEMAILER_AUTH_PASS, // smtp 的授权码
  },
})

export function sendEmail(title: string, content: string, toMail: string) {
  const mailOptions: Mail.Options = {
    from: { name: 'koa-test', address: process.env.NODEMAILER_AUTH_EMAIL }, // 发送方
    to: toMail, //接收者邮箱，多个邮箱用逗号间隔
    subject: title, // 标题
    html: `<div>${content}</div>`, //页面内容
  }
  return transporter.sendMail(mailOptions)
}
