# 函数对象

## 常见函数的四种类型
- 匿名函数
- 回调函数
- 递归函数
- 构造函数

## 变量和函数的提升

::: tip 提示
js解析：预编译期 与执行期
预编译预解析，解析时，会对所有声明的变量和函数进行处理，先预声明变量在定义函数
变量声明提升，值停留在当前本地，函数整个代码提前，如果使用var fn声明函数，变量提前，函数体停留在本地
:::
```
console.log(a); // undefined
var a = 10;
function test() {
    a = 100;
    console.log(a); // 100 a声明提升
    var a;
    console.log(a); // 100
    console.log(fun); // function fun() {}
    console.log(fun1); // undefined
}
function fun() {};
test();
var fun1 = function() {};
console.log(a) // 10不是100因为函数内的局部变量已经被释放，并且作用域到不了外面

#提升过后的执行的代码

var a,fun1;
console.log(a);
a = 10;
function test() {
    var a; // 没有声明的话，会将外面的a改掉
    a = 100;
    console.log(a); // 100 a声明提升
    console.log(a); // 100
    console.log(fun); // function fun() {}
    console.log(fun1); // undefined
}
function fun() {};
test();
fun1 = function() {};
console.log(a);
```
## 作用域、作用链、执行环境、执行上下文
- 全局作用域 window
- 函数作用域 function(){}
::: tip 提示
函数内可访问到外部的变量，外面访问不到函数内变量；
函数创建时会指向他的作用链，先时他的本身函数作用域，在是全局作用域；
执行环境（执行上下文）：全局执行环境和局部执行环境；变量对象、活动对象
:::

```
function a() {
    function b() {
        var bb = 234;
    }
    var a = 123;
}
var glob = 12;
a();
console.log(b) // 报错获取不到，bb a也一样


#示例
var buttons = [{name: 'n1'}, {name: 'b2'}, {name: 'n3'}];
function bind() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].fun = function() {
            alert(i);
        }
    }
}
bind();
buttons[0].fun(); //3
buttons[1].fun(); // 3
buttons[2].fun(); // 3

// 立即执行可打印出0、1、2
(function(num) {
    buttons[i].fun = function() {
        alert(num);
    }
})(i)
```


## 重载和多态的使用场景
重载：可以定义相同名字，不同参数的形式的不同函数，在调用的函数的时候，自动识别不同参数对应的函数，实现了相同函数名不同函数的调用；
js本身没有重载，可通过arguments实现函数重载

多态：同一个东西在不同情况下表现不同状态：重写和重载

```
// 长方形和正方形面积x*x,x*y
function react() {
    //arguments 类数组
    if (arguments.length >= 1) {
        this.widht = arguments[0];
        this.height = arguments[0];
    }
    if (arguments.length > 1) {
        this.widht = arguments[0];
        this.height = arguments[1];
    }
    this.toString = function() {
        return 'width:' + this.width + ' height:' + this.height;
    }
}
```

## 闭包
本质还是作用域问题；
概念：引用了自由变量的函数，这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造他的环境也不例外；实现信息的驻留（信息的保持，引用在，空间不销毁）；

```
#简单闭包
var Person = function() {
    var count = 0;
    return function getCount() {
        console.log(count++);
    }
}
var p = Person();
p(); // 0
p(); // 1
```

## call、apply、bind使用场景
属于Function对象上
apply方法能劫持另一个对象的方法，继承另一个对象的属性；
Function.apply(obj, args),接受两个参数
obj：这个对象将代替Function类里的this对象，args数组
call，参数是单个传入，apply是数组传入
call和apply立即执行，bind需要一个变量接受之后在执行
```
var stu1 = {
    name: 'jack',
    age: 18,
    say: function(school, grade) {
        console.log(this.name + '今年 ' + school + '年级' + grade);
    }
}
var stu2 = {
    name: 'Tom'
}
stu1.say.apply(stu2, ['清华', '一'])// 此时stu1的方法say中的this。已经指向与stu2，所以name为Tom
stu1.say.call(stu2, '清华', '一')


```
::: tip 提示
lei数组转数组的应用：
var arr = Array.prototype.slice.apply(arguments)；
// 手动实现bind方法
Function.prototype.newBind = function(obj) {
    var self = this;
    return function() {
        self.apply(obj);
    }
}
:::

## new的执行过程

1、创建新对象
var obj = new Object();
2、把obje的proto指向构造函数的prototype对象，实现继承，相关起来
obj.__proto__ = Fn.prototype
3、将obj作为this的上下文
var result = Fn.call(obj);
4、返回创建的对象，如果函数没有返回对象，则返回this
if (type result == 'object') {
    return result;
} else {
    return obj
}

## this 谁调用指向谁
指当前调用的这个对象： 4中绑定规则：默认绑定、隐私绑定、显示绑定、new绑定优先级有底到高
改变this指向使用call、apply、bind
```
var man = {
    name: 'Tom',
    age: 30,
    getName: function() {
        console.log(this.name)
    },
    getAge: function() {
        function aa() { // 局部函数
            console.log(this + ' ' + this.age) // 局部函数this执行的是window,所以this.age为undefined
        }
        aa(); // window.aa()
        console.log(this + ' ' + this.age); // 30
    }
}
man.getName() // getName中的this指向的man，所以打印的是Tom
man.getAge()
```