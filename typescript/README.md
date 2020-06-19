# typescript

1、引入第三方插件：如jquery
```
cnpm install @type/jquery jquery--save

import * as $ from 'jquery
```

2、数组对象定义：{}[]

3、数组

    let data: number[]; // 数组只能存数字

    数组存多个类型使用元组tuple：let data:[number, string,boolean];// 顺序要对应

    超出越界部分，采用联合类型：data[3] = false, // 3可以存number，string,boolean

4、联合类型：可以存不同类型

    let a: string|number;
    a = 'm'; a = 1;

5、枚举:为数据赋予友好的名字

    enum color {red, green} // 元素编号默认从0
    color.red // 0

6、函数

    使用noImplicitThis选项取消默认this的any设置

    fn(this:Document) {}
    在ts中函数的第一个this参数是用来设置this的类型约束的，是一个假参数，运行中不存在，是给ts检测使用的
```
    没有返回值：void
    function fn(x:number, y:string):string{
        return x+y
    }
    let fn: (x:number, y:string) => string = function fn(x:number, y:string):string{
        return x+y
    }
```
6-1、函数重载
```
function fn(x:number, y:number):number;
function fn(x:string, y:string):string;

fn(x:any,y:any):any {
    return x+y
}
fn(1,2);
fn('a','b')
```

7、类
```
public公开的，所有地方可访问
protected受保护的，在内部或子类中可以访问
proivate私有的，只能内部访问
get a() {return this.age} // a为类的属性

抽象类：abstract

abstract class Person { // 抽象类不能实例化
    username: string;
    constructor(username:string) {
        this.username = username;
    }
    say() {
        console.log('234)
    }

    abstract study(): void // 抽象方法
}
clss Studen extends Person { // 继承抽象类必须实现所有的抽象方法，否则此类也必须是抽象类
    study() {
        console.log(‘学生方法’)
    }
}

```

8、接口：定义的一种契约，ts用这个检测数据

```
// 只有抽象描述，不能有具体值
    interface Options{
        width: number,
        height: number,
        color?: string,  // 可选的
        size: number
    }

// 只要包含其中一些规则即可
    -- 可选  ？
    -- 断言 as
    function fn(opts: Options) {}
    fn({
        heidht:100,
        width:50
    } as Options) // as 断言告诉其符号Options规则

**参数过于规则项，可先赋值给一个变量，绕开检测**
    let obj = {
        width: 50,
        height:10,
        size: 2,
        a:1
    }
    fn(obj) // 可以

 **一组数字作为key值命名的， dom Node节点------索引签名**
    // interface Options{
        0:string,
        1:string
    }
    // 索引签名key可以是number，也可以是string
    interface Options{
        // key是number，value是any类型
        [attr: number]: any,
        length: number
    }

**函数类型接口**

    定义一个事件函数，那么必须定义一定的规则，不能随便吧一个函数赋值给事件
    // 函数接口
    interface IFn {
        (x:number,y:number):number
    }
    let fn: IFn = function(x:number,y:number):number{return x + y}

    // 定义一个接受MouseEvent类型参数的函数结构
    interface MouseEveatCallBack{
        (e: MouseEvent): any
    }
```

9、强制转换类型--类型断言

    比如 let someValue: any = 'renmingming';
    1-使用<string>使用尖括号
        let strlength: number = (<string>someValue).length;
    2-使用as
        let strlength: number = (someValue as string).length

10、对象结构制定类型

    let o = {a: 1, b: 2};
    不能这样：let {a: aa, b: bb} = o;这样是属性重命名
    应该这样 let {a,b}: {a: number, b: number} = o;

11、只读属性

    interface Point {
        readonly x: number
        readonly y: number
    }

    泛型只读数组： ReadOnlyArray
    let a: number[] = [1,2,3,4]
    let ro: ReadOnlyArray<number> = a // 不能对ro修改push等

    变量使用const，属性使用Readonly

12、额外属性检查-----索引签名

    interface Point {
        color?: string
        // 除了color，可是有其他任意属性名
        [propName: string]: any  // 索引属性名为字符串，值为any任意类型
    }
    interface Person {
        [index: number]: string
    }
    let arr: Person = ['ren','ming','ming']

13、定义类的接口：

    1、类的实例接口


    2、类的构造器接口  //静态部分

    ```
        interface ClockInterface {
        tick()
        }

        interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface
        }

        function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute)
        }

        class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) {

        }
        tick() {
            console.log('beep bepp digitalclock')
        }
        }

        class AnglogClock implements ClockInterface{
        constructor(h: number, m: number) {

        }
        tick() {
            console.log('anglogclock tick')
        }
        }

        let digital = createClock(DigitalClock, 12, 17)
        let anglog = createClock(AnglogClock, 20, 28)
    ```

14、混合类型

    ```
        interface Counter{
        (start: number): string
        interval: number
        reset(): void
        }
        function getCounter(): Counter{
        let counter = (function(start: number) {

        }) as Counter
        counter.interval = 123
        counter.reset = function() {}

        return counter
        }
    ```

15、接口继承类
    ```
    class Control{
    private state: any
    }

    interface SelectionControl extends Control{
    select()
    }

    class Button extends Control implements SelectionControl{
    select() {}
    }
    class TextBox extends Control{
    select() {}
    }
    class ImageC implements SelectionControl{
        // 错误
    select() {

    }
    }
```

16、类静态属性修改

```
    // 修改静态属性值
    class Greeter{
    static greeting = 'hello'
    }
    let greeterMaker: typeof Greeter = Greeter
    greeterMaker.greeting = 'hello word'
    let greeter2: Greeter = new greeterMaker();
```

17、泛型函数-----保持参数类型和返回类型一致

    // 泛型类型变量

```
function identity<T>(age: T): T{
    // T帮助我们捕获用户传入类型
    return arg
}
// let output = identity<string>('myString')
let output2 = identity('myString')
```

18、泛型接口

```
function identity<T>(arg: T): T{
    return arg
}
interface GenericIdentityFn<T> {
    (arg: T): T
}

//interface GenericIdentityFn {
//    <T>(arg: T): T
//}

let myIdentity:GenericIdentityFn<number> = identity

19、 泛型类

```
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 1
myGenericNumber.add = function(x, y) {
  return x + y
}
```

20、 泛型约束

```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
let x = {a: 1, b: 2, c: 3, d: 4}
getProperty(x, 'a')
getProperty(x, 'm') // m参数报错，m是不是x的key

function createInstance<T>(c: new() => T): T {
  return new c()
}
```
21、 联合类型
```
interface Bird{
  fly()
  layEggs()
}
interface Fish{
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {

}
let pet = getSmallPet()
pet.layEggs()
pet.swim() //报错，不是Fish和Bird共有的
```

22、类型保护机制

    --- 用户自定义

    --- typeof

    --- instanceof
```
if(isFish(pet)) {
    pet.swim()
} else {
    pet.fily()
}
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}
```

23、null的类型保护

```
function broken(name: string | null): string {
    function postfix(epither: string) {
        // !断言不为null
        return name!.charAt(0) + '. the ' + epither
    }

    name = name || 'Bob'
    return postfix(name)
}
broken(null)
```

24、vue中声明全局Window

```
在.d.ts中添加
  interface Window {
    test: string
  }
```

25、特殊符号用法

```
1.属性或参数中使用？：表示属性或参数为可选项
2.属性或参数总使用!: 表示强制解析，告诉typescript编译器，这里一定有值
    const { resolved, rejected } = arr.shift()!
    rejected在arr中是可选项，如果不加!就会报错
3.变量后使用! ： 表示类型推断排除null、undefined
```