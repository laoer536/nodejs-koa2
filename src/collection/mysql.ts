import mysql from 'mysql2/promise'

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'my-secret-pw',
  database: 'test-koa2',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

export { connection }
