# 常用命令

1、文件拷贝

  scp 本地文件路径 服务器用户名@地址:/复制到的路径
  复制文件夹 scp -r
  ```
  scp -r /Users/apple/self/react/react-admin/dist root@1.1.1.1:/home/user/www
  ```
  --- 删除文件、文件夹
  ```
  rm -rf name     // name 文件、文件夹名称  -rf删除文件夹
  ```

  2、登录远程服务器

  ```
  ssh -p 端口号 root@ip
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
  结束
  ```
  kill -9 2071
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
  pm2命令大全
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

6、查找软件安装的路径位置

```
which 'name'
```

7、解压

```
tar –xvf file.tar //解压 tar包
tar -xzvf file.tar.gz //解压tar.gz
```

8、环境变量

```
vim ~/.bash_profile
source ~/.bash_profile
```

9、查看当前文件下的文件权限

```
ls -l
```

10、修改当前所有文件的权限为apple

```
sudo chown -R apple ./
```

11、当前管理用户
```
whoami
```

12、MAC查看端口占用情况
```
lsof -i tcp:port
```

13、文件变化实时显示新的内容
```
tail -f development.log 
// 显示指定内容
tail -f development.log | grep 'online_status'
```

14、输出到指定文件
```
php cli.php async start >> log/async.log 
// 后台进程
./ssdb-server -d ssdb.conf
```

15、liunx命令crontab定时任务

```
crontab -e
```

16、翻墙https://cp.v2tun.com/aff.php?aff=172

```
手机需要shadowrocket 
电脑软件clashx
软路由：https://conversun.com/2019/08/19/OpenClash-SmartDns/
```