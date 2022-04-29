const setting = {
  successCode: 0,
  successMsg: "接口调用成功",
  failCode: -1, //异常码还有很多 不同的错误需要给与不同的异常码 这里只做示例 所以异常码统一为-1
  failMsg: "接口调用失败", //异常消息还有很多 不同的错误需要给与不同的异常消息 这里只做示例 所以异常消息统一为‘接口调用失败’
};

function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (code, msg, data) {
      console.log("ctx.type", ctx.type);
      ctx.type = option.type || "json";
      ctx.body = {
        rsCode: code || option.successCode,
        rsCause: msg || option.successMsg,
        data: data,
      };
    };

    ctx.fail = function (code, msg) {
      ctx.type = option.type || "json";
      ctx.body = {
        rsCode: code || option.failCode,
        rsCause: msg || option.failMsg,
        data: null,
      };
      console.log(ctx.body);
    };

    await next();
  };
}

module.exports = routerResponse(setting);
