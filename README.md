# nodejs-koa2

for nodejs network

![截屏2023-08-11 22.44.22.png](https://s2.loli.net/2023/08/11/RPSYJeNK47kp2Vd.png)

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

- [ ] more

  

## How to use

1. 安装docker

2. 执行：[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

   ```
   docker run --name test-koa2 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8
   ```

   

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
