# postgresql

1、进入命令
```
psql -U postgres
```

2、启动
```
pg_ctl start
```

3、创建表
```
create table 表名(
  id serial PRIMARY key not null,
  name VARCHAR(255),
)
```