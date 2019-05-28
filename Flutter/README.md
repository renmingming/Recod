# flutter相关知识

1、flutter环境安装
```
先下载fluter SDK包
git clone -b beta https://github.com/flutter/flutter.git

vim $HOME/.bash_profile

export PUB_HOSTED_URL=https://pub.flutter-io.cn //国内用户需要设置
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn //国内用户需要设置
//添加以下行并更改[PATH_TO_FLUTTER_GIT_DIRECTORY]为克隆Flutter的git repo的路径:
export PATH=PATH_TO_FLUTTER_GIT_DIRECTORY/flutter/bin:$PATH
```

2、flutter在VSCode中常用的快捷键

```
R 键重新启动
r 键热重载
q 退出
p 显示网格
P 显示帧率
o 切换Android与iOS的预览模式
```