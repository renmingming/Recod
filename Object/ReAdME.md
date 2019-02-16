# Object
    1、assign()
    2、create()
        Object.create = function (o) {
            var F = function() {};
            F.prototype = o;
            return new F();
        }

# 原型链
    只有对象有__proto__属性；
    Object.prototype是所有对象最顶层的
    ```
    function A(a) {
        this.a = a;
    }
    var b = new A('aa');
    b.__proto__执行了构造函数A的prototype属性
    console.log(A.prototype)
    console.log(b.__proto__)
    A.prototype === b.__proto__


    什么是原型链，对象都有一个toString方法，实例化对象b可以toString;但是他本身并没有toString方法，他是沿着他的__proto__向他的构造函数A的prototype对象对寻找，而A的prototype也没有toString这个方法，那么就继续沿着A的prototype的__proto__向上找，而A.prototype.__proto__指向的就是Object.prototype
    ```