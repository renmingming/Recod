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
                enumerable: true, // 可枚举，决定了属性是否能被for...in 遍历到
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

    5、entries()

        Object.entries(obj) 可以返回其可枚举属性的键值对的对象

        示例：
            const obj = {foo: 'bar', baz: 4};
            Object.entries(obj)  // [ ['foo', 'bar'], ['baz', 4] ]

            const obj = {100: 'a', 3: 'b', 5: 'c'};
            Object.entries(obj) // [ ['3', 'b'], ['5', 'c'], ['100', 'a']]

            const myobj = {a:5, b:7};
            for(const [key, vlaue] of Object.entries(myobj)) {
                // key - value : 'a - 5', 'b - 7'
            }
    
    6、freeze()

        Object.freeze(obj) // 冻结一个对象。不能被修改，不能向其添加新的属性，不能删除已有属性，原型也不可修改等

    7、getOwnPropertyDescriptor()

        Object.getOwnpropertyDescriptor(obj, prop)
        obj: 需要查找的目标对象
        prop：目标对象内属性名称
        指定的属性存在与对象，返回其属性描述符对象，否则返回undefined

    8、getOwnPropertyDescriptors()

        克隆obj
            const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

    9、getOwnPropertyNames()

        Object.getOwnPropertyNames(obj)返回指定对象的所有自身属性的属性名组成的数组（不包括Symbol）
    
    10、getPrototypeOf()

        Object.getPrototypeOf(obj) 返回制定对象的原型（内部[[prototype]]属性的值)
    
    11、is()

        Object.is(value1,valule2） 判断两个值是否是相同的值（不会做类型转换)
        is(0, false) // false
        is(0, -0)// false
        is(NaN, NaN) // true

    12、isExtensible()

        Object.isExtensible(obj) 判断一个对象是否是可扩展的

    13、isFrozen() 判断对象是否被冻结

    14、keys() 返回对象的自身可枚举属性组成的数组

        values() 返回对象自身可枚举属性值组成的数组

    15、preventExtensions() 阻止对象扩展，不能添加新的属性

    16、setPrototypeOf(obj, prototype) 设置对象的原型

# 枚举

    js基本类型中的原型属性是不可枚举的，可以使用for...in循环遍历；
    Ojbect.propertylsEnumerable()方法可以判断对象中是否包含某个属性，并且其是否可枚举；
    如果判断的属性存在与Object对象的原型内，不管是否可枚举都会返回false

    枚举的作用：
        for...in
        Object.keys() // 只返回本身可枚举属性
        JSON.stringify // 只返回本身可枚举属性

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