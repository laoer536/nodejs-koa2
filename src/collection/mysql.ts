/** Use prisma ORM  **/
import { PrismaClient } from '@prisma/client'
export const connection = new PrismaClient()
