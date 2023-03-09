//文档详见：https://github.com/node-schedule/node-schedule
const schedule = require('node-schedule')

//每分钟的42秒执行一次
const job = schedule.scheduleJob('42 * * * * *', function () {
  console.log('The answer to life, the universe, and everything!')
})

module.exports = job
