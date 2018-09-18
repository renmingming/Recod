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
