import { LogColors } from './enum'
import { parse } from 'dotenv'
import { RouterContext } from 'koa-router'
import { DefaultContext } from 'koa'
import { readFileSync } from 'fs'

export function getColoredText(text: string, colorCode: LogColors) {
  return `\x1b[${colorCode}m${text}\x1b[0m`
}

export function loadEnv() {
  const [envPath] = process.argv.slice(2)
  const allEnvString = readFileSync('.env', 'utf-8') + '\n' + readFileSync(envPath, 'utf-8')
  const allEnv = parse(allEnvString)
  console.log(getColoredText('当前环境变量：', LogColors.green))
  console.log(allEnv)
  for (const key in allEnv) {
    process.env[key] = allEnv[key]
  }
}

export function success<T>(ctx: RouterContext | DefaultContext, data: T, message = 'success') {
  ctx.body = { code: '200', message, data }
}
