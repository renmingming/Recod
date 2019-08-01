# Redis 命令

1、set($key, $val) ===> 设定指定key的值，可以已存储其他值，覆盖旧值

2、get($key) ===> 获取指定key的值，不存在，返回null，key存储的值不是字符串，返回错误

3、expire($key, $time)  ===>  设置$key的过期时间

4、del($key)   ===>   删除已存在的健,不存在的key忽略

5、incr($key)  ===>   将key中存储的数字值增一

## 有序集合

1、zcard($key) ===>  返回集合中元素的数量，没有返回0

2、zrevrange($key, start, stop) ===>  返回有序集中，start到stop区间内的成员（从大到小排序）

3、zrange($key, start, stop)  ===> 从小到大排序，-1最后一个成员

4、zadd($key, $num, $val)  ===>  将一个或多个元素及分数值添加到有序集中

5、sadd($key, $val) ===>  将一个或多个元素加到集合中

6、zrem($key, $val)  ===>  移除有序集中的一个或多个成员，不存在的忽略

7、zincrby($key, 1, $val)  ===>  对有序集合中指定成员的分数加上增量 +1

8、zscore($key, $val)  ===>  返回有序集中，成员的分数值，不是有序集key的成员🔥key不存在，返回nil

9、sismember($key, $val)  ===>  判断元素是否是集合的成员

## 哈希

1、hget($key, $field)  ===>  返回哈希表中指定字断的值

2、hset($key, $field, $val) ===>  为哈希表中的字断赋值，已存在的旧值被覆盖

3、hmset($key, [$field => $val, $field1 => $val2])  ===>  同时将多个field-val对设置到哈希表中

4、hgetall()  ===>  返回哈希表中所有的字断和值