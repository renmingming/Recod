# Object
    1、assign()

    2、create()

        Object.create({x:123}),将对象继承到了__proto__属性上了
        Object.create = function (o) {
            var F = function() {};
            F.prototype = o;
            return new F();
        }
    3、defineProperty(obj, prop, descriptor)

        参数：
            obj(要在其上定义属性的对象)
            prop(要定义或者修改的属性名称)
            descriptor(将要被定义或者修改的属性的描述符)

        示例：
            var o = {};
            // 在对象中添加一个属性与数据描述符
            Object.defineProperty(o, 'a', {
                value: 3, // o.a值
                writalbe: true, // 是否读写
                enumerable: true, // 可枚举
                configurable: true, 可改变并可从对象上删除
            })
            // 对象o拥有了属性a，只为3

            // 在对象中添加一个属性和存取描述符
            var bValue;
            Object.defineProperty(o, "b", {
                get: function() {
                    return bValue;
                },
                set: function(newValue) {
                    bVallue = newValue;
                },
                enumerable: true,
                configurable: true
            })
            o.b = 8;
            // o拥有了属性b，值为8；
            o.b的值总是回与bValue相同，除非重新定义o.b
            

    4、defineProperties(obj, props)
    

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