### 一、在终端中操作数据库

1. 登录mysql:  `mysql -uroot -p`  -> enter-> 输入密码
2. 展示所有的数据库列表: `show databases`;
3. 新建数据库: `create database if not exists tstcreatedatabase;`
4. 查看当前选中的数据库: `select database();`
5. 删除数据库: `drop database if exists tstcreatedatabase;`
6. 修改数据库: `alter database if exists tstcreatedatabase;`
7. 选中某个指定的数据库: `use tstcreatedatabase; `
8. 显示当前选中的数据库中所有的表: `show tables;`
9. 在当前选中的数据库中新建students表: `create table students(name varchar(10), age int, height double);`
10. 删除表: `drop table if exists students;`
11. 查看表中的所有数据: ` select * from students;`
12. 向students表中插入数据:`insert into students(name, age, height) values ('Tom', 18, 1.88);`



### 二、Navicat中操作数据库



1. 以上在cmd中可执行的sql语句也可以在Navicat中执行
2. 查看表结构: `desc student`
3. 查看创建表的sql语句: `show create table student`



### 三、表约束

#### 1. 主键 PRIMARY KEY 

- 不能为空null
- 唯一索引
- 主键也可以是多列索引(联合主键), 联合主键组合的值也要是唯一的
- 建议: 主键字段应该是和业务无关

#### 2. UNIQUE

- 唯一, 不重复
- 对于Unique修饰的可以为空的字段, null值可以重复

#### 3. NOT NULL

#### 4. AUTO_INCREMENT

- 自动递增

#### 5. 外键约束

- 多表关系

```mysql
CREATE TABEL IF NOT EXISTS users (

)


# group by后面不可以用where进行筛选, 必须用having来对分组的结果进行筛选
select brand, avg(price) as avgprice from products where score > 7.5 group by brand having avgprice > 2000

select * form stutdent join guanxi on studdent.id=guanxi.student_id
inner join cousrse on course.id=guanxi.course_id 

select * form stutdent join guanxi on studdent.id=guanxi.student_id
right join cousrse on course.id=guanxi.course_id where student.id is null

select * form stutdent left join guanxi on studdent.id=guanxi.student_id
left join cousrse on course.id=guanxi.course_id 

select * form stutdent left join guanxi on studdent.id=guanxi.student_id
where guanxi.course_id is null
left join cousrse on course.id=guanxi.course_id 
```





### 四、外键约束

1. 创建表时定义外键 `create table products (brand_id int, foreign key(brand_id) references brand(id), title varchar(100))`

2. 将已存在的表中的字段设为外键 `alter table products add foreign key(brand_id) references brand(id)`

3. 更改外键约束

   1. 修改on delete或者on update的值: 

      - restrict: 不允许更新或者删除
      - no action: 和restrict一致
      - cascade: 更新记录时: 更新对应的外键记录; 删除记录时: 删除对应的外键记录
      - set null: 将对应的外键记录的值设为null

   2. 步骤:

      - 查看创建表的sql语句,  获取外键的名称 `show create table products `, 

      - 根据获取的外键名称`products _ibfk_1` , 删除外键 `alter table products drop foreign key products _ibfk_1`

      - 重新添加外键约束 `alter table products add foreign key(brand_id) refrerences brand(id) on update cascade on delete restrict`



### 五、表之间存在多对多的关系, 可以建立一个关系表
