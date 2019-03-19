# HTTP

1、CORS跨域
```
    预请求：
        允许的方法：GET、HEAD、POST
        允许的Content-Type: text/plain、multipart/form-data、application/x-www-form-urlencoded------表单可以设置
        请求头的设置：自定义

    Access-Control-Allow-Origin:'*' // 允许所有
    Access-Control-Allow-Headers: '自定义请求头' // 允许的自定义请求头
    Access-Control-Allow-Methods: 'PUT,GET,OPSTIONS,POST' 等允许的方法
    Access-Control-Max-Age: '1000' 最长时间，不需要发起预请求
```

2、缓存Cache-Control

```
    可缓存性：
        public--------所有可缓存
        private-------只有发起请求的浏览器
        no-cache------任何都不可以。可以存缓存要等服务器验证过

    到期：
        max-age= s ------ s 多少秒到期
        s-maxage= s ----- 覆盖上面的
        max-stale= s ----- 发起请求携带的，上面的过去了，也可以访问过期的缓存

    重新验证：
        must-revalidate   设置了max-age过期了，从愿服务器获取是否真的过期了
        proxy-revalidate
    
    其他：
        no-store：永远都要去获取最新的
        no-transform: 告诉代理不要改动-压缩什么的

```

3、验证头，验证资源能否使用缓存

```
    Last-Modified:上次修改时间
        配合If-Modified-Since或者If-Unmodified-Since使用
        服务器判断相同则可以使用
    Etag：数据签名
        配合If-Match或者If-Non-Match
        服务器判断签名是否相同
```

4、cookie

```
    设置头：set-cookie: ['id=123;max-age:2','ab=2，domain=test.com']
             // domain=test.com,test.com所有二级域名都可以访问这个cookie
    属性：
        max-age和expires设置过期时间
        secure只在https的时候发送
        httpOnly无法通过document.cookie访问
```

5、http长链接
 tcp是否关闭，不关闭有请求可以直接在这个tcp请求 // 浪费开销
 关闭有请求就的重新打开一个tcp // 有延迟
```
connection:keep-alive/close
```

6、数据协商

```
Accept:
    Accept：信息类型
    Accept-Encoding：压缩方式
    Accept-Language：语言
    User-Agent: 浏览器信息
Content：
    Content-Type
    Content-Encoding
    Content-Language
```
