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
声明一个基本类型，会分配一个栈空间，声明一个引用类型，会先分配一个栈空间引用地址，引用地址执行的是堆空间，浅拷贝之后，都会修改
:::
## 数据拷贝（深拷贝/浅拷贝）
### 浅拷贝
```javascript
// 1循环赋值
function clone(obj) {
  let newObj = {};
  for (let i of obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}
//2 create
Object.create(obj);
```
### 深拷贝