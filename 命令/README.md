# 常用命令

1、文件拷贝

  scp 本地文件路径 服务器用户名@地址:/复制到的路径
  复制文件夹 scp -r
  ```
  scp -r /Users/apple/self/react/react-admin/dist root@1.1.1.1:/home/user/www
  ```

  2、登录远程服务器

```
ssh -p 端口号 root#ip
```

3、git
  新建本地git仓库
  ```
  git init
  ```
  将项目的所有文件添加到本地仓库中
  ```
  git add .
  ```
  提交之前对本地仓库的修改注视
  ```
  git commit -m "注释语句"
  ```
  关联远程仓库
  ```
  git remote add origin https://github.com/abc/abc.git
  ```
  上传前pull一下
  ```
  git pull origin master
  ```
  上传远程仓库
  ```
  git push -u origin master
  ```

  4、进程

    查询进程
    ```
      ps aux|grep php-fpm 名字
    ```
    停止重启进程
    ```
    kill -HUP PID
    ```
    优雅结束进程
    ```
     kill -l PID
     ```

  5、pm2

    启动程序
      ```
      pm2 start app.js --name test
      ```
    终止进程
      ```
      pm2 stop
      ```
    列举启动的程序
    ```
      pm2 list
    ```

    ```
    pm2 logs 显示所有进程日志
$ pm2 stop all 停止所有进程
$ pm2 restart all 重启所有进程
$ pm2 reload all 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0 停止指定的进程
$ pm2 restart 0 重启指定的进程
$ pm2 startup 产生 init 脚本 保持进程活着
$ pm2 web 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0 杀死指定的进程
$ pm2 delete all 杀死全部进程
 

运行进程的不同方式：
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动3个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件
```