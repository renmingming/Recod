# koa2

    脚手架：koa-generator

## 中间件
1、案例
```
// m1.js
function m1(ctx) {
    global.console.log('m1' + ctx.path)
}

module.exports = function () {
    return async function(ctx, next) {
        m1(ctx)
        await next() // 当前中间件完毕，交给下一个中间件
        global.console.log('m1 end')
    }
}

// m2.js
function m2(ctx) {
    global.console.log('m2' + ctx.path)
}

module.exports = function () {
    return async function(ctx, next) {
        m2(ctx)
        await next() // 当前中间件完毕，交给下一个中间件
        global.console.log('m2 end')
    }
}
// m3.js
function m3(ctx) {
    global.console.log('m3' + ctx.path)
}

module.exports = function () {
    return async function(ctx, next) {
        m3(ctx)
        await next() // 当前中间件完毕，交给下一个中间件
        global.console.log('m3 end')
    }
}

在app.js引入三个文件并：
app.use(m1())
app.use(m2())
app.use(m3())
打印结果：
m1 /  =>   m2 /   =>  m3 /   =>    m3 end     =>    m2 end    => m1 end

先进入中间件，等从中间件进去之后，然后从最后一个中间件往出走；出去的代码在 next()之后

```
2、koa-generic-session
    koa-redis
app.use(session({
  key: 'mt',
  prefix: 'mtpr', // 修改在cookie中名称前缀
  store: new Redis() // session存放于redis
}))

怎样使用session
    
    ctx.session.count++ 设置了session；通过ctx.session可以获取

3、koa-passport // 用户鉴权中间件

4、passport-local // 本地验证用

## 路由

```
const router = require('koa-router')()

router.prefix('/users') // 访问改文件下所些的路由时，必须在路由前面加上/users前缀
router.get('/', async (ctx, next) => {
    ctx.render() // 写入页面中
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
    // ctx.body 做接口使用
  ctx.body = {
    title: 'koa2 json'
  }
})
module.exports = router

在app.js引入
app.user(users.routers(), users.allowedMethods())
```

## cookie

// 设置cookie
ctx.cookies.set('pvid', Math.random())
// 读取
ctx.cookies.get('pvid')

## ctx

1、ctx.request.boxy.** 所传参数 psot请求  get请求为query

## 遇到的问题

1、延时返回结果
```
直接写setTimeout(() => {
    ctx.body = {}
}, 1000) 没有用
应该
function delay(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  await delay(3000)
```

## vscode node 调试
.launch.json
```
"configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/lib/login.js",
      "sourceMaps": true,
      "preLaunchTask": "build" // 等于下面`label`值
    }
  ]
```
tasks.json
```
{
  "version": "2.0.0",
  "command": "npm",
  "tasks": [
    {
      "label": "build",
      // 合起来就是`npm run build`
      "type": "npm",
      "script": "build"
    }
  ]
}
```