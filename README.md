# Recod

## 实用插件
1、js精度计算插件：**BigNumber.js**

2、数据模拟工具：
      **Easy Mock + mock.js**
      
3、时间转化成类似于*** 时间前的描述字符串（3小时前）：
      **timeago.js**
      
4、查看兼容性： **caniuse**

5、根据链接生产二维码： **jr-qrcode**


6、防止xss攻击：**js-xss**




## 实用代码
1、移动适配代码：
  ```
  var scale = 1 / devicePixelRatio;
  document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth / 750) + 'px';
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


