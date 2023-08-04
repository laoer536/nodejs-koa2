import mysql from 'mysql2/promise'
import { loadEnv } from '../utils'
loadEnv()
const { MYSQL_HOST, MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env
const connection = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  port: Number(MYSQL_PORT),
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  multipleStatements: true, // Enable multiple SQL statements to query at the same time.
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

export { connection }
