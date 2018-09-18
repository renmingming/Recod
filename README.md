# Recod

## 实用插件
1、js精度计算插件：**BigNumber.js**

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
