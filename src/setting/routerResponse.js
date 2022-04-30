const option = {
  successCode: 0,
  successMsg: "接口调用成功",
  failCode: -1, //默认的异常码
  failMsg: "接口调用失败", //默认的异常消息
};

function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, msg) {
      //接口成功时我们更期望得到接口调用成功后的数据，虽然成功调用后提示消息可能不是很重要，但是有时也需要，所以加上
      ctx.type = option.type || "json";
      ctx.body = {
        rsCode: option.successCode,
        rsCause: msg || option.successMsg,
        data: data || null,
      };
    };

    ctx.fail = function (msg, code) {
      //发生异常时前端期望得到异常信息描述和对应的状态码
      ctx.type = option.type || "json";
      ctx.body = {
        rsCode: code || option.failCode,
        rsCause: msg || option.failMsg,
        data: null,
      };
    };

    await next();
  };
}

module.exports = routerResponse(option);
