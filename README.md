# Recod

## 实用插件
1、js精度计算插件：**BigNumber.js**

2、数据模拟工具：
      **Easy Mock + mock.js**

3、时间转化成类似于*** 时间前的描述字符串（3小时前）：
      **timeago.js**

4、日期转换 **moment**

4、查看兼容性： **caniuse**

5、根据链接生产二维码： **jr-qrcode**


6、防止xss攻击：**js-xss**

7、vue后台管理系统： **iview-admin**

8、思维图：百度脑图 http://naotu.baidu.com/

9、有限状态机的函数库javascript-state-machine

10、UMl类图工具：processon

11、终端请求：curl -d 'name=renming&&age=12' http://127.0.0.1:8080/addPerson

12、mongodb可视化工具  **Robo 3T**

13、mongodb库  **mongoose**

14、Redis 高速读写

15、加密 **crypto-js**

16、汉字转拼音 **js-pinyin**

17、移动端组件库vue：Mand Mobile

18、雪碧图：https://www.toptal.com/developers/css/sprite-generator

19、前端错误收集：**jstracker**

20、快速搭建各类管理页面：**amis**

21、博客搭建：**docsite**

22、**docker**

23、web端播放amr格式音频：参考地址 **https://www.npmjs.com/package/amr-js**

24、**convert** 命令处理图像

25、web播放svga动画：**svgaplayerweb**

26、查看css未使用的代码--谷歌: **Sources->Coverage**

## 实用代码
1、移动适配代码：
  ```
  (function(doc, win){
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };
        if (!doc.addEventListener) return;
        recalc();
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window)
  ```
2、判断回文（'aba','bfcfb'等）

  实用栈判断字符串是否为回文。将字符串从左到右push压入栈内，栈内保存的是反转的字符串，最后一个字符在在栈顶，第一个在栈底，实用pop取出栈内字符串，与原始字符串对比，相等则为回文

3、字符替换：
  ```
  // x被替换字符，y替换新的字符
  str.replace(/x/g,'y')

   匹配路由#和？后的任意字符为空
  str.replace(/#|\?.*$/g, '')
  ```
4、判断方法：给数组索引index + 1，不能溢出>数组length，与索引index - 1，不能小于 0

  ```
  let arr = [x,x,x,x,x];
  let index = x ; // 获取当前的index值
  let newIndex = null; // 新index;
  let arrLenth = arr.length;
  // index + 1的判断
  newIndex = (index + 1) % arrLenth;
  // index - 1的判断 防止index为0，出现负数
  newInde = (index - 1 + arrLenth) % arrLenth;
  ```

5、DNS 预解析技术 DNS-prefetch

  浏览器在加载网页时对网页中的域名进行解析缓存，这样在点击当前网页中的链接时就无需进行DNS解析，减少等待时间，DNS解析，需要用域名解析匹配IP，这个需要时间，加了dns-prefetch，浏览器就回缓存这个解析，直接请求，不需要在dns解析了

6、导航递归

  ```
  renderMenu = (data) => {
    return data.map((item) => {
      if(item.children) { // 判断是否还有子菜单
        return this.renderMenu(item.children)
      }
    })
  }
  ```

  7、字典：

    ```
      let config = {
        "a": "renming",
        "b": "mingming",
        "c": "renmingming"
      }

      config[a]
    ```

8、权限设计模式：**rbac模式**

9、文字渐变：**背景渐变加-webkit-background-clip:text**

10、通过rel="preload"进行内容预加载：如下

```
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
<link rel="preload" href="sintel-short.mp4" as="video" type="video/mp4">
<link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">
// crossorigin="anonymous" 跨域，字体必须
<link rel="preload" href="fonts/cicle_fina-webfont.woff" as="font" type="font/woff" crossorigin="anonymous">
```

在其他地方使用就可以了

11、img srcset 属性：image-set()支持根据用户分辨率适配图像。

```

<img src="source.jpg" srcset="source_2x.jpg 2x, source_3x.jpg 3x">
<img src="source.jpg" srcset="source_400.jpg 400w, source_1280.jpg 1280w">
// 视口为 320px 时图片宽度为 300px，其他情况为 1200px。
<img src="images/gun.png" sizes="(max-width: 320px) 300w, 1200w"/>
background-image: image-set( url(../images/pic-1.jpg) 1x, url(../images/pic-2.jpg) 2x, url(../images/pic-3.jpg) 600dpi);

```


12、查看属性是否是对象自身下的属性，而不是原型上的: **hasOwnProperty**

非系统生产的属性可以使用for in找到



13、**instanceof** 对象于构造函数在原型上是否有关系
```
function obj (){}
var str1 = new obj();
console.log(str1 instanceof obj) // true;
```

也可以使用instanceof做类型判断
```
var str = '';
var arr = [];
console.log(str instanceof Object) // true;
console.log(arr instanceof Array) // true;
console.log(arr instanceof Object) // false;
```
也可以使用**Objec.prototype.toString.call(arr) == [object Array]**


14、使用正则对字符串中的数字进行操作
```
var str = 'sdkf34lk00j234l23k4';
var newStr = str.replace(//g,function(){
     return "["+arguments[0]+"]";
})
newStr // sdkf[34]lk[00]j[234]l[23]k[4]
```

15、Object.defineProperty 属性变化监听

```
Object.defineProperty(data, 'b', {
     set: function(newValue) {
          // 当data.b的直改变时，更新#test视图
          var view = document.getElementById('test');
          view.textContent = newValue;
     },
     get: function() {

     }
})
 ```

 16、节流函数

 ```
 // func需要执行的方法，wait不重复执行该方法的时间
function throttle(func, wait) {
    let lastTime = null;
    let timeout;
    return function() {
        let context = this;
        let now = new Date();
        // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
        if (now - lastTime - wait > 0) {
            // 如果之前有了定时任务则清除
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(context, arguments);
            lastTime = now;
        } else if (!timeout) {
            timeout = setTimeout(() => {
                // 改变执行上下文环境
                func.apply(context, arguments);
            }, wait);
        }
    };
}
let throttleRun = throttle(() => {
    console.log(123);
}, 0);
 ```

 17、防抖

 ```
 function debounce(func, wait) {
    let lastTime = null;
    let timeout;
    return function() {
        let context = this;
        let now = new Date();
        // 判定不是一次抖动
        if (now - lastTime - wait > 0) {
            setTimeout(() => {
                func.apply(context, arguments);
            }, wait);
        } else {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                func.apply(context, arguments);
            }, wait);
        }
        // 注意这里lastTime是上次的触发时间
        lastTime = now;
    }
}
```

18、使用contenteditable模拟input输入，换行光标不再末尾，而显示在开始位置
做一下处理

```
在需要的地方使用，content是获取焦点的元素
var range = window.getSelection(); //创建range
range.selectAllChildren(content); //range 选择obj下所有子内容
range.collapseToEnd(); //光标移至最后

```

19、防止xss攻击：如（输入框输入<script>alert('123')</script>,被执行,可使用下插件



20、获取光标位置


```
    let range = window.getSelection().getRangeAt(0);
    let Dleft = range.getBoundingClientRect().x;
    let Dtop = range.getBoundingClientRect().y;
```


21、光标定位到最后一位

```
     selectionToEnd(el) {
      let range = window.getSelection(); //创建range
      range.selectAllChildren(el); //range 选择obj下所有子内容
      range.collapseToEnd(); //光标移至最后
    },
```


22、深拷贝

```
	// 深拷贝
	deepClone(obj) {
		let objClone = Array.isArray(obj) ? [] : {};
		if (obj && typeof obj === "object") {
			let key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					//判断ojb子元素是否为对象，如果是，递归复制
					if (obj[key] && typeof obj[key] === "object") {
						objClone[key] = this.deepClone(obj[key]);
					} else {
						//如果不是，简单复制
						objClone[key] = obj[key];
					}
				}
			}
		}
		return objClone;
	}
     deepClone(obj){
         let _obj = JSON.stringify(obj),
             objClone = JSON.parse(_obj);
         return objClone
     }

```


23、localStorage/sessionStorage使用JSON.parse存取数组

```
	let gChat = sessionStorage.setItem("groupsChat"); //localStorage
	let groupChat = JSON.parse(gChat) || []; // 取出来的可以是数组
	存之前JSON.stringify(groupChat)
```

24、获取剪贴板内容

```
	dom.addEventListener('paste', function(e){
		// e.clipboardData.getData('Text') // 复制的文字
		// 图片文件等
		if ( !(e.clipboardData && e.clipboardData.items) ) {
		    return ;
		}
		for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
		    var item = e.clipboardData.items[i];
		    if (item.kind === "file" && item.type.indexOf('image') >= 0) {
			var pasteFile = item.getAsFile();
			// pasteFile就是获取到的文件
		    }
		}
	})
```


25、路由地址中的参数携带&等一些于url有冲突：参数使用**encodeURIComponent**包括

25、返回字符串中带有换行符'↵'，在不使用v-html的情况下，使其保持换行使用css属性：**white-space：pre-line/pre-wrap**

26、return、break、continue ---容易出错---

	return:跳出当前方法；

	break:结束当前循环，继续执行循环体外的下面的代码；

	continue: 结束本次循环，继续执行下次循环；

27、判断对象是否相等

```
	function isObjectValueEqual(a,b){
		var aProps = Object.getOwnPropertyNames(a);
		var bProps = Object.getOwnPropertyNames(b);

		if(aProps.length != bProps.length) {
			return false;
		}
		for(var i = 0; i< aProps.length; i++) {
			var propName = aProps[i];
			if(a[propName] !== b[propName]){
				return false;
			}
		}
		return true;
	}
```

28、video标签层级问题，video播放时层级最高：ios

```

	controls="controls"

	x5-playsinline=""

	playsinline="true"

	webkit-playsinline="true"

	x-webkit-airplay="true"

	x5-video-player-type="h5"

	x5-video-player-fullscreen=""

	x5-video-orientation="portraint"

```
视频自动播放：video.play();

29、js操作History路由：

	history.pushState(状态对象, 标题，url)

	history.replaceState(状态对象, 标题，url)

	都会操作浏览器的历史记录，而不会引起页面的刷新;

	不同之处在于，pushState会增加一条新的历史记录，而replaceState则会替换当前的历史记录。

30、使用transform与定位，导致层级问题，z-index无效时，给使用transform的父元素也加上transform

31、iphonex全屏填充 meta标签中的viewport，content：viewport-fit=cover,有fixed定位的时候使用媒体查询把底部的空白加上（34px);
```
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  body,html,.dialog,.share-dialog{
    height: -moz-calc(100% + 34px);
    height: -webkit-calc(100% + 34px);
    height: calc(100% + 34px);
  }
}
```

32、XMLHttpRequest,ajax
```
function ajax(opt){
	opt = opt || {};
	opt.method = opt.method.toUpperCase() || 'POSt';
	opt.url = opt.url || '';
	opt.async = opt.async || true;
	opt.data = opt.data || null;

	opt.success = opt.success || function () {};
	opt.error = opt.error || function() {};
	var xmlHttp = null;
	if(XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}

	var params = [];
	for(var key in opt.data) {
		params.push(key + '=' + opt.data[key])
	}
	var postData = params.join('&');
	if(opt.method.toUpperCase() === 'POST') {
		xmlHttp.open(opt.method, opt.url, opt.async);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttp.send(postData);
	}
	if(opt.method.toUpperCase() === 'GET') {
		xmlHttp.open(opt.method, opt.url + '?' + postData, opt,async);
		xmlHttp.send(null);
	}
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4) {
			if(xmlHttp.status == 200) {
				opt.success(JSON.parse(xmlHttp.responseText));
			}else{
				opt.error('网络异常')
			}
		}
	}
 }
 -- 响应：responseText  字符串形式的数据
 --- onreadystatechange事件： readyState属性改变时，就会调用改函数
 --- readyState ： XMLHttpRequest状态
                    0: 请求未初始化
                    1: 服务器连接已建立
                    2: 请求已接收
                    3: 请求处理中
                    4: 请求已完成，且响应已就绪
---- status： 200‘ok’ 404:未找到页面
---- onerror错误事件
---- ontimeout 请求超时事件
```

33、循环迭代器

	es6中使用for(let item of data){}就可以，其中data必须要有Symbol.iterator,才能使用for...of

34、自定义虚线边框

```
	div {
	    padding: 1em;
	    border: 1px dashed transparent;
	    background: linear-gradient(white,white) padding-box,
	    repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em);
	}
```

35、复制功能:多个复制、兼容ios

```
    var jsCopy = function (obj) {

    function fn() {
      var copyDOM = obj.parentNode.children[0]

        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(copyDOM);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        var successful = document.execCommand('copy');
        try {
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('copy is' + msg);
        } catch (err) {
          console.log('Oops, unable to copy');
        }
        // 移除选中的元素
        window.getSelection().removeAllRanges();
      // 安卓系统的UC浏览器
      if (u.indexOf('Android') > -1 && u.indexOf('UCBrowser') > -1) {
        // obj.innerHTML = '点击复制文案';
        alert('若点击复制文案无效，请长按内容手动复制！');
      }
    }
    obj.addEventListener('click', fn, false);
  };

  //
  let copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach((obj) => {
    jsCopy(obj);
  });
```

36、array.fill('替换字符',start, end)
```
    let arr = [1,2,3,4,5,6];
    arr.fill('*',2, 4)
    // arr=>[1,2,*,*,56]
```

38、随机字符串：Math.random().toString(16).slice(2,6)

39、字符串网址替换成链接

```
urlStrToLink(url) {
    let reg=/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    let msgText = url.replace(reg, function() {
      return `<a target='_blank' href='${arguments[0]}'>${arguments[0]}</a>`
    })
    return msgText;
  }
```

40、获取月份的最后一天或者每月总攻多少天

```
new Date('2019','5',0).getDate()  // 获取5的前一个月的天数，也就是4月的总天数
```

41、通过两点计算距离p(x,y) p1(x1, y1)
```
var dx = Math.abs(p.x - p1.x1); // 计算x的差的绝对值
var dy = Match.abs(p.y - p1.y1);
Math.sqrt(Math.pow(dx, 2) + Math.pow(dy,2))  // dx,dy的平方和，的平方根
```

42、amr音频文件播放2:
```
    引入示例代码中的amr2.js
    对音频文件进行base64，使用PHP
        $video = file_get_contents('http://meet-development.oss-cn-hangzhou.aliyuncs.com/chats/audio/normal/20190821/5d5cf65676db3.amr');
        info(base64_encode($video));

        RongIMLib.RongIMVoice.init();
        $('#paly-btn').click(function() {
            RongIMLib.RongIMVoice.play(base64_encode($video));
        })
```

43、上下拉动滚动条时卡顿、慢
```
body {
-webkit-overflow-scrolling: touch;
overflow-scrolling: touch;
}
```

44、图片六边形
```
clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
```


## vue常遇问题

1、监听对象中的某个属性：
  ```
  'xxx.xxx': {
    handler: function(val, old) {
      // 变化时代码
    },
    deep: true
  }
  ```

2、vue中组件重新加载：

  ```
  <router-view v-if="isRouterAlive">
  -------------------------------------
  data() {
    return {isRouterAlive: true}
  }
  // methods中
  reload() {
    this.isRouterAlive = false;
    this.$nextTick(() => {
      this.isRouterAlive = true;
    })
  }
  ```
3、组件通信：

    a: 可以使用vuex

    b: 父子组件通信
      ```
        // 子组件
        this.$emit('aaa', obj)
        // 父组件
        this.$on('aaa', function(obj) {
          // 代码
        })
      ```

4、flow：javascript静态类型检查工具
     如Vue: Class<Component> 和 const vm: Component = this

6、向数组里添加新的元素，视图并更新，**向第一位添加问题**

    ```
    // 向数组第一位添加可行
    arr.splice(0,0,newArr)
    // 向后添加使用
    this.$set(arr,key, val)
    ```

7、vue中v-for=“(item,index) in arr”循环下使用index，去改变data中的属性时，会报一下错误：
**You may have an infinite update loop in a component render function**
可以data


8、在给变量赋值vuex中的对象时，要注意深拷贝，以免对赋值之后的变量操作，改变了vuex中的数据

9、本地测试无法定位到源代码位置，修改config中build的devtool为**#source-map**

10、vue组件异步加载
```
const later = Vue.component('later', function(resolve) {
    setTimeout(function() {
        require(['./later.vue'], resolve)
    }, 3000);
})

2.3新增

const AsyncComp = () => ({
    // 需要加载的组件，应当是一个Promise
    component: import('./My.vue'),
    // 加载中应当渲染的组件
    loading: Loading,
    // 出错时渲染的组件
    error: ErrorComp,
    // 渲染加载组件前等待时间，默认200ms
    delay: 200,
    // 最长等带时间，超出此时间则渲染错误组件
    timeout: 3000
})
```



### nuxt问题记录

1、第三方插件/js引入，报window/navigator等 is not defined

因为在服务端获取不到window对象，可以设置使这些文件在服务端使不引入，如下：
在plugins目录下新建文件如：cookie.js
```
     import Vue from 'vue'
     import VueCookie from 'vue-cookie'
     Vue.use(VueCookie)
```
或者jsencrypt.js
```
    import JSEncrypt from 'jsencrypt'
    window.JSEncrypt = JSEncrypt;
```
然后在nuxt.config.js中的plugins项中添加
```
    [{
          src: '~plugins/jsencrypt.js',
          ssr: false
    },{
          src: '~plugins/cookie.js',
          ssr: false
    }]

```

2、生命周期

```
    Incoming Request // 浏览器发起请求

    // 服务端接收到请求，检查是否有这个，有的话执行
    nuxtServerInit （store active)操作vuex

    middleware // 想要做的功能

    validate() // 动态验证，可配合高级路由，比如：是否能进入该页面

    asyncData() && fetch() // 获取数据asyncData时获取渲染数据设置data中的值，fetch是修改vuex数据的

    render()
```

3、layouts模版组件，pages页面组件

    在页面组件中使用对应的模版组件
    export default {
        layout: 'about', // 对应的layouts模版组件名称
    }

4、nuxt识别import等

```
    安装babel-cli: sudo cnpm install -g babel-cli
    给package.json中的dev和start命令后面添加 --exec babel-node
    继续安装babel-preset-env：cnpm i babel-preset-env --save-dev
    根目录创建.babelrc文件
    {
        "presets": ["env"]
    }
```


## React记录

1、生命周期

  ```
    componentWillMount() {
        // render 之前
        console.log('will mount')
    }
    componentDidMount() {
        // render之后，不回立即调用，所有子组件都render之后
        console.log('did mount')
    }
    componentWillReceiveProps(newProps) {
        // 组件传值是调用
        console.log('will props' + newProps.name)
    }
    // 修改render之后update都会触发
    shouldComponentUpdate() {
        console.log('should update')
        return true;
    }
    componentWillUpdate() {
        console.log('will update')
    }
    componentDidUpdate() {
        console.log('did update')
    }
    render() {}
  ```

  2、在事件使用箭头函数并要传参数时如下使用：

     ```
       handle = (id) => {
        // 代码
       }
       render() {
        return (
          <div onClick={() => this.handle(id)}></div>
        )
       }
     ```

3、在创建编辑功能中(同一个表单)使用antd的form时，在创建提交成功之后要重置表单：this.props.from.resetFields()，不然编辑时数据为创建时的数据

4、在react+antd中使用less修改antd主题，使用less的2.7.3以前版本


