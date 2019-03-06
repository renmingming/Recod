# mongoose

```
 cd /usr/local/bin
 ./mongod --dbpath=./data/db
  // Reids
 redis-server
```

1、链接数据库

```
app.js中引入
const mongoose = require('mongoose);
// mongodb://127.0.0.1:27127/dbs
mongoose.connect(config.dbs, {
    useNewUrlParser: true
})

```

2、操作数据

```
// 创建Schema ：表的描述   person.js文件
let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})
module.exports = mongoose.model('Person', personSchema)

// 添加数据的页面引入 person.js 
const person = new Person({
    name: 'renming',
    age: 123
})
person.save() // await可用

// 更新数据
const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })

// 读取数据
const result = await Person.findOne({ // 单个
    name: ctx.request.body.name
  })
const results = await Person.find({ // 数据集
name:ctx.request.body.name
})

// 删除数据
const result = await Person.where({
    name: ctx.request.body.name
  }).remove()

```