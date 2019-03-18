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
    函数重载
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
