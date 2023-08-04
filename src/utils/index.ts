import { LogColors } from './enum'
import dotEnv from 'dotenv'

export function getColoredText(text: string, colorCode: LogColors) {
  return `\x1b[${colorCode}m${text}\x1b[0m`
}

export function loadEnv() {
  const [envPath] = process.argv.slice(2)
  const { parsed } = dotEnv.config({ path: envPath })
  console.log(getColoredText('\n当前环境变量信息：', LogColors.green))
  console.log(parsed)
}
