# 数据类型
- Boolean
- Null
- Undefined
- Number
- String
- Object 引用类型
- Symbol
- BigInt
## 类型判断
- typeof
- instanceof
- Object.prototype.toString.call()
```javascript
console.log(typeof 1) // number
console.log(typeof '11') // string
console.log(typeof true) // boolean
console.log(typeof function() {}) // function
console.log(typeof {}) // object
console.log(typeof []) // object
console.log(typeof null) // object
console.log(typeof NaN) // number

Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('2') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(NaN) // "[object Number]"

console.log([] instanceof Object) // true Object是否在[]的原型上
console.log([] instanceof Object) // true
```
::: warning 注意
声明一个基本数据类型，栈内存会开辟一个新的内存空间，互相独立，声明一个引用数据类型，引用地址名字会存在栈内存中，值是在堆内存中，浅拷贝之后，都会修改。栈和堆数据存储
:::
## 数据拷贝（深拷贝/浅拷贝）
### 浅拷贝
```javascript
// 1循环赋值
function clone(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let i of obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}
//2 create
var obj = {a: 1, b: {c:2}};
var obj2 = Object.create(obj);
obj2.a = 2;
obj2.b.c = 3;
console.log(obj.b.c); // 3
console.log(obj2.b.c); // 3 都改变了
console.log(obj.a); // 1
console.log(obj2.a); // 2
Object.assign(obj);
// 3 assgin
var obj = {a: 1, b: {c:2}};
var obj2 = Object.assign(obj); // 浅拷贝
var obj3 = Object.assign({}, obj); // 基本数据类型深拷贝，引用类型浅拷贝

//直接赋值
```
::: tip 提醒
Object.create对与属性值是基本数据类型的可达到深拷贝效果，是引用数据类型的话，只能浅拷贝；
Object.assign合并给空对象对基本数据类型可深拷贝，引用类型只浅拷贝
:::
### 深拷贝
```javascript
// 1递归拷贝
var obj = {a: 1, b: {c:2}, d: [1, 2, 3], e: function() {console.log(1)}};
function deepClone(obj) {
  var newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
      }
    }
  }
  return newObj;
}
var obj2 = deepClone(obj);
obj2.b.c = 3;  // obj2 与obj 互不影响
```
::: waring 注意
obj.hasOwnProperty(i)，检测i是否是obj自由属性；typeof null 也是 object
:::
```javascript
// 2 使用json.parse和json.stringify
var obj = {a: 1, b: {c:2}, d: [1, 2, 3], e: function() {console.log(1)}};
var obj2 = JSON.parse(JSON.stringify(obj));
```
::: waring 注意
使用JSON.parse和JSON.stringify,不能拷贝属性方法，obj2.e()会报错
:::
```javascript
// 3 数组拷贝
var arr = [1, 2, 3, 4, [1, 2, 3]];
var arr1 = arr.slice(0);
var arr2 = arr.concat();
// 4 扩展运算符
var arr3 = [...arr];
```
::: waring 注意
slice(start, end),截取数组start到end，返回新的数组，concat合并多个数组或数值，返回新的数组
两个都可以对基本数据类型实现深拷贝，对于引用类型只能浅拷贝(扩展运算符也一样)
:::
### 装箱和拆箱
- 装箱：把基本数据类型转换为对应的引用数据类型的操作
- 拆箱：将引用类型转换为基本数据类型操作
```
var a = 123; // number
var b = new Number(123); // object
b.valueof() // 123 number 引用类型转为基本数据类型
[] + [] // 输出为空 [].valueof()为[], []调toString为‘’
[] + {} // [object Obejct]
{} + [] // [object Object] 或者0
```
::: tip 提醒
toPrimitive(input, type), input 传入值，type类型
1、input如果是原始类型的话，直接返回；2、不是原始类型，调用Input.valueof()
是原始类型直接返回，不是就调input.toString(),是原始类型返回，不是报错
:::
### 栈和队列(数据访问，数据结构)
- 栈：先进后出
- 队列：先进先出
```
// 入栈
var a = [1,2,3];
a.push(4) // [1,2,3,4];
a.unshift(0) // [0,1,2,3]; 
//出栈
var b = a.pop()
var c = a.shift() 
a // [1,2,3]
b // 4
```
::: waring 注意
结尾出入栈，不影响原有数据结构，开头出入，会影响数据原有索引，效率低
:::

### sort排序
- 默认升序排序
- 将元素转为字符串，找对应的字符串的unicode码表,只定义了0-9
- 
```
var a = [1,3,4,2];
a.sort() // [1,2,3,4];
var b = [2,45,32,5];
b.sort() // [2,32,45,5];  先找第一位，排序，再找第二位。。。
b.sort(function(x, y) { return x-y;})// 传入比较器
```