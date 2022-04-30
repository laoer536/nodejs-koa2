const errHandle = async (ctx, next) =>
  //全局异常处理 如果接口调用时有错误发生 但是真正逻辑处遗漏了对该异常的处理 就会到这里来执行
  next().catch((err) => {
    console.log("err信息", err);
    if (err.status === 401) {
      ctx.fail("没有权限访问", 401); //处理jwt的token鉴权
    } else {
      ctx.fail(err.message); //处理主要是接口调用产生的错误
    }
  });

module.exports = errHandle;
