# DOM

## 加载过程

1、在浏览器输入url，交给dns域名解析，找到ip，想服务器发起请求；
2、服务器返回数据，浏览器接受文件（html,cdd,js）
- 构建dom树：HTML解析器；根是‘document’对象，Node：HTMLDivElement等节点对象
- 解析过程：
    1、遇到link的外部css会进行css的加载，并行下载index.css，不影响构建dom树，解析和下载并行
    2、遇到script，html解析会停下来，先去执行js的内容，知道脚本js完成，才继续构建dom。所以在底部引入js，或者加async、defer、window.onload
- 构建css树：css解析器
- 构建render树：渲染树=DOM树+css树
- 布局layout与绘制paint：回流reflow：影响布局的属性（宽高边距等）相当与刷新页面；重绘repaint，不印象布局（颜色等）；重绘不一定引起回流，回流一定引起重绘


::: tip 提示
解析器遇到async、defer，开始下载文件并行继续解析文档，脚本会在下载完之后执行，解析不会停下来。script设置该属性，浏览器会异步下载该文件，不会影响后续的dom渲染；如果有多个设置了defer的script，会按照顺序执行，设置了async谁先加载完，先执行谁；defer脚本会在文档渲染完后，DOMConentLoaded时间调用前执行，脚本会被延迟到整个页面都解析完毕后在运行 
:::

## 三种事件绑定
- html事件
- dom0级事件: 事件绑定
- dom2级事件：事件监听

```
 //html事件
<input type='button' id='btn' onclik="fun()">
// dom0级事件
document.getElementById('btn').onclick = function() {}
// dom2级事件 IE8：attachEvent
document.addEventListener('clik', function() {}, usecapture) // usecapture 是否捕获或冒泡执行：true捕获，false冒泡 
```
::: tip 提示
事件监听可以绑定多个事件，事件绑定只能绑定最后一个：js不支持事件重载，绑定事件相当于变量存储的是函数地址，在绑定一个事件，相当于变量指向到另一个函数地址了；事件监听相当于订阅发布这，改变了函数，触发了事件，订阅这个事件的函数被执行
:::
事件周期；事件捕获、事件对象的触发、冒泡触发；可使用冒泡进行事件委托
阻止冒泡事件：stopPropagation 阻止默认事件：preventDefault或return false

## History和location
- history
history.back() 后退 history.forward() 前进 history.go(n)
history.pushState() 向地址内添加一个 history.replaceState() 替换地址中一个
- location
href: url; protocl: 协议包括冒号；host：主机包括端口；hostname：主机名；
pathname：url路径部分，从/开始；search：查询部分，从？开始；hash：从#开始； 

----------------------
    Document
----------------------
HTMLHtmlELMENT
----------------------
HTMLBodyELEMENT
----------------------
HTMLParagraphElement | HTMLDivElement | HTMLIMageElement

