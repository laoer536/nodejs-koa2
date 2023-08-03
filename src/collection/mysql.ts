import mysql from 'mysql'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'neo',
  password: 'my-secret-pw',
  database: 'test-koa2',
})

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

export { connection }
