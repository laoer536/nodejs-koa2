/** Use prisma ORM  **/
import { PrismaClient } from '@prisma/client'
const connection = new PrismaClient()
connection.$use(async (params, next) => {
  const now = new Date()
  console.log({
    time: `${now.toLocaleDateString()}-${now.toLocaleTimeString()}`,
    [`${params.model}.${params.action}`]: params.args,
  })
  return next(params)
})

export { connection }
