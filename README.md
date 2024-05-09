# nodejs-koa2

for nodejs network

![WechatIMG375.jpg](https://s2.loli.net/2023/08/11/FOsENU6rkWljHGV.jpg)

- [x] jwt鉴权，token生成，登陆发送邮箱验证码

- [x] 邮箱发送

- [x] 环境变量

- [ ] 静态资源托管

- [ ] HTML history 模式实现，实现web history模式访问

- [x] 统一接口返回体

- [x] 全局错误捕获

- [ ] 文件上传下载

- [x] mysql的数据库链接与操作demo(使用prisma ORM)

- [ ] 定时任务

- [x] jaeger 接口服务监控

- [ ] more

  

## How to use

1. 安装docker

2. 执行
   ```docker
   docker-compose up -d
   ```

3. 下载代码zip并解压进入该项目中

4. 执行

   ```shell
   pnpm i
   ```

   ```shell
   npx prisma migrate dev --name init
   ```

   ```shell
   pnpm dev:local
   ```



OK, finish.

You can see

![截屏2023-08-07 21.50.30.png](https://s2.loli.net/2023/08/07/JAkvecsMoSjN97X.png)

> jaeger监控服务地址：jaeger监控服务 `http://localhost:16686` ,每次请求调用服务后,就会有信息产生。
