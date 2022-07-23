const koaBody = require('koa-body')
const path = require('path')
const setting = {
  multipart: true, // 支持文件上传
  formidable: {
    maxFieldsSize: 30 * 1024 * 1024, // 文件上传大小限制30M
  },
}
module.exports = koaBody(setting)
