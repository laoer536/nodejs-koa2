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

2. 执行：[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

   启动mysql

   ```
   docker run --name test-koa2 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8
   ```

   启动redis

   ```
   docker run --name my-redis -p 6379:6379 -d redis
   ```

   [安装和启动jaeger](https://hub.docker.com/r/jaegertracing/all-in-one)
   
   <br/>

   ![屏幕截图 2024-03-25 135427.png](https://s2.loli.net/2024/03/25/aSOXryiFG2cEQTK.png)

3. 下载代码zip并解压进入该项目中

4. 执行

   ```
   pnpm i
   ```

   ```
   npx prisma migrate dev --name init
   ```

   ```
   pnpm dev:local
   ```



OK, finish.

You can see

![截屏2023-08-07 21.50.30.png](https://s2.loli.net/2023/08/07/JAkvecsMoSjN97X.png)

> jaeger监控服务地址：jaeger监控服务 `http://localhost:16686` ,每次请求调用服务后,就会有信息产生。
