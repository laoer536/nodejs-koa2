const errHandle = async (ctx, next) =>
  //配合鉴权
  next().catch((err) => {
    console.log("err信息", err);
    if (err.status === 401) {
      ctx.fail(401, "没有权限访问", err); //处理jwt鉴权
    } else {
      ctx.fail(-1, err.message); //统一处理接口调用产生的错误  此时接口处只需要考虑正常的逻辑 这里统一处理发生错误的逻辑 这里示例一下
    }
  });

module.exports = errHandle;
