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