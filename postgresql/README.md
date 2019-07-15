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

自动增长：serial || smallserial || bigserial
```

4、常用命令

```
创建数据库： create database [数据库名];

查看现存的数据库： \l;

从一个数据库跳到另一个： \c [调走的数据库名];

查看表： \dt;

查看表结构： \d [表名];

删除数据库： drop database [name];

删除表数据；TRUNCATE TABLE  table_name;
          truncate table talbe_name;

删除用户：drop user renming；
```

5、创建模式

```
create schema myschema;
//常见表格
create table myschema.company(
  id Int NOt NULL
)
```

6、插入多行
```
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00, '2007-12-13' ), (5, 'David', 27, 'Texas', 85000.00, '2007-12-13');
```

7、事务

```
开始一个事务
begin; || begin transaction;

确认事务
commit;  ||  end transaction;

撤销回滚事务
rollback;
```

8、锁-lock

  排它锁 exclusive locks  ： 其他的事务不能对他读取和修改

  共享锁 share locks ： 可以被其他事务读取，但不能修改

  lock_mode:  ACCESS SHARE，ROW SHARE， ROW EXCLUSIVE， SHARE UPDATE EXCLUSIVE， SHARE，SHARE ROW EXCLUSIVE，EXCLUSIVE，ACCESS EXCLUSIVE。

  lock语句只在事务模式下工作

  ```
  begin;
  lock table table_name in acess exclusive mode;
 
  table_name表被锁定，知道事务结束，并且要完成事务，必须回滚或者提交事务 commit|| end transaction || rollback;
  ```

  9、权限

  ```
  设置权限语法
    grant privilege [,...] 
    on object [,...] 
    to {public | GROUP group | username}

    privilege − 值可以为：SELECT，INSERT，UPDATE，DELETE， RULE，ALL。
    object − 要授予访问权限的对象名称。可能的对象有： table， view，sequence。
    PUBLIC − 表示所有用户。
    GROUP group − 为用户组授予权限。
    username − 要授予权限的用户名。PUBLIC 是代表所有用户的简短形式。

  取消权限：revoke

  示例：

    创建用户：
    create user renmingming with password 'password';

    GRANT ALL on company to renmingming;  // 信息grant表示所有权限已经分配给了“renmingming”用户

  ```

