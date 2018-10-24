# Recod

## 实用插件
1、js精度计算插件：**BigNumber.js**

2、数据模拟工具：
      **Easy Mock + mock.js**
      
3、时间转化成类似于*** 时间前的描述字符串（3小时前）：
      **timeago.js**
      
4、查看兼容性： **caniuse**

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


