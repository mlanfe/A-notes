# c#

### 基本概念

1. 名称空间
   1. 通过using + SpaceName: 直接使用类
   2. 通过using static + SpaceName.ClassName: 直接使用类的静态方法
   
2. 顶级语句时语法糖, 会被编译器包裹在Main方法里面执行; 所有的顶级语句都应该包含在一个文件里

3. 变量声明
   1. var x = 'hello'
   2. string x = 'hello'
   3. string x = new string('hello')
   4. string x = new('hello')
   
4. 命令行实参

5. 作用域
   1. **变量声明都会被编译器移动到作用域的顶部 ??**
   2. **书本P27作用域实例存疑 ??** 
   3. **c#中有几种作用域 ??**
   
6. 常量
   1. 常量在声明的时候必须初始化
   2. **常量和readonly的区别**
   3. 常量的值必须要编译时可以计算出来
   
7. 可空类型: 可空值类型/可空引用类型
   1. 编译器在没有启用可空引用类型时候, 允许将null赋值给引用类型, 值类型无论是否启用都不可赋值为null
   2. 编译器将可空值类型T? 改为使用`Nullable<T>`类型
   3. 类型成员是可空类型, 可以不初始化
   4. 判断`T? t1`可空类型是否有值: 
      1. 属性: t1.hasValue：只能判断可空值类型
      2. 模式: t1 **is not ** null： 判断可空值类型和引用类型
      3. 操作符: t1 != null
   5. 启用可空引用类型: 在项目文件中配置 `<Nullable>enable</Nullable>`, 目的是减少**运行时报错**, 在**编译阶段**检查是否有空引用问题, 提前报错
      1. `<Nullable>enable</Nullable>`其实是启用了`Nullable<T>`类型, 只有`T?`类型的变量才可以赋值null, 而`T`类型被赋值了null, 在编译阶段静态检查时就会出现报错
      2. 如果没有启用, 其实T类型也会报错, 但是这时候编译器是允许`T`类型赋值null, 所以只有才执行时发生空引用错误时才会出问题
   
8. 预定义**数据类型 **
   1. var x1 = 1; x1的默认类型是**int**; var x2 = 1; x2的默认类型是**double**类型
   2. 有符号: sbyte => short => int => long**(L)**; 
   3. 无符号: byte => ushort => uint**(U)**=> unlong**(UL)**
   4. half => float**(F)** => double => decimal**(M)**
   5. 数字的表示方法
      1. 二进制**0b**, 十六进制**0x**, 没有八进制
      2. 数字分隔符`_`
      3. 数字的字面值
         - var x = 0b100L: 数据类型是long, 值是4
         - var x = 1_3_5: 数据类型是int, 值是135
   
9. 控制程序流语句
   1. swith语句switch(x) {case 1: 执行语句;break; default: 执行语句;break;}
      1. 多个case使用相同的实现
      2. **goto**  case来执行指定的case     
      3. **switch表达式 **  `x switch("a" => "res1", "b"=> "res2", _=>"default res")`
      4. switch支持模式匹配**or and is**
   2. if, if else, for, foreach, while 只有一条执行语句时可以省略花括号
   3. for循环, while循环, do...while和js一样
   4. **foreach**(var x **in** arr){} 其中arr是可迭代对象
   
10. 同一文件中使用不同**命名空间**下的同名class, 要使用完整的类型(或至少较长的名称)

11. 字符串
    1. 字符串类型提供的所有方法不改变字符串的内容, 而是返回一个**新**的字符串
    2. 对于操作字符串, 推荐使用**Stringbuilder**
    3. 插值字符串
       1. `$"hello {msg}"`, 实质是调用string的**Format()**方法

       2. 获取插值字符串的信息**FormattableString**: Format, ArgumentCount, getArgument()

       3. 字符串**格式**:  .net为**数字,日期,时间**定义了默认的格式

       4. 字符串中使用特殊字符\t, \r\n等, 转义: **\\**, **@**  (书本P45, p34)

       5. 截取字符串的片段

          ```c#
          string s = "hello world" ;
          var s1 = s.SubString();
          var s2 = s[0..3];
          var s3 = s[..3];
          var s4 = s[1..^3];
          var s4 = s[^6..^3];
          ```

12. 预处理器指令

    1. 控制代码的那些部分编译或者不编译
    2. 是否启用可空引用类型

13. 编程准则

    1. 命名应该反映变量的**目的**而不是数据类型
    2. **私有成员, 参数名称, 区分同名的两个对象**使用**camel**大小写, 其他推荐使用**Pascal**大小写
    3. 避免名称空间同名
    4. **字段应该总是设为私有的**, 在某些情况可以把常量或者只读字段设置为公有

    

    

### LINQ

1. 编译器会把LINQ查询转化为方法调用, 并在运行时调用扩展方法
2. LINQ为IEnumberable\<T\>接口提供了各种扩展方法
3. 查询表达式必须以from开头, 以select或group结束. 在中间可以使用where, join, orderby,let和其他from子句
4. LINQ语句在定义时不会执行, 在迭代数据项时才会运行. 所以迭代时, 数据源发生变化, 迭代的结果也会发生改变. 
   要让迭代结果不在随着数据源的变化而变化, 可以调用扩展方法ToArray(), ToList()等

#### 1. 扩展方法

存在变量bar是IEnumerable 类型;

1. bar .**where(x, index)**: index可选; LINQ语句无法使用index参数
2. 类型筛选: bar.**OfType\<T\>**(): 只有扩展方法, 没有对应的LINQ语句
3. 复合的from子句: 编译器将复合的from子句和LINQ查询转化为SelectMany()扩张方法
4. 复合的**from**子句: 编译器把复合的from子句转换为**SelectMany()**方法
5. 排序
   - **Orderby** x => **OrderBy**()
   - **Orderby** x **descending** => **OrderByDescending**()
   - **OrderBy** x, y,z => OrderBy(x).**ThenBy(y)**.ThenBy(z)





### 类

#### ques:

1. 已经有了abstract virtual 为什么还需要sealed?

   `abstract`、`virtual` 和 `sealed` 这三个关键字在 C# 中分别用于实现不同的继承和重写行为，它们有各自的作用和用途。尽管它们有重叠的部分，但它们的目的和用法是不同的。

   1. **`abstract`（抽象）：** 使用 `abstract` 关键字标记的类或成员是抽象的，它们必须在派生类中进行实现。抽象类不能被实例化，而抽象方不能有方法体, 必须在派生类中重写。抽象类和方法为继承提供了一个框架，派生类需要提供具体的实现。
   2. **`virtual`（虚方法）：** 使用 `virtual` 关键字标记的方法是可以被派生类重写的方法。基类提供了一个默认的实现，派生类可以选择是否要重写这个方法以提供自己的实现，也可以在重写方法中调用基类的实现。
   3. **`sealed`（密封）：** 使用 `sealed` 关键字标记的类、方法或属性是不允许被继承、重写或继承和重写的。密封的类或成员是最终的，它们的实现不应该再被改变。这可以用于限制继承层次结构或确保某些类或方法的行为不被改变。

   虽然在某些情况下，`sealed` 可能看起来与 `abstract` 或 `virtual` 有些重复，但它们的使用场景是不同的。`sealed` 的主要作用是限制继承和重写，以确保类或成员的最终性。当你想要阻止进一步的继承或修改时，可以使用 `sealed` 关键字。在设计类和继承关系时，这些关键字可以帮助你明确你的意图，从而更好地控制代码的行为。

### 构建

.NET 提供了一些 **默认的主机构建机制**，特别是在使用 `WebApplication.CreateBuilder()` 或 `Host.CreateDefaultBuilder()` 的场景中。即使开发者没有显示调用，框架底层也会自动按照默认配置构建一个主机。

**2. ASP.NET Core 中的默认行为**

如果你使用的是 **WebApplication** 类，以下代码：

```
csharpCopy codevar builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Run();
```

实际上已经隐式地执行了以下几步：

1. 创建并配置 `HostBuilder`。
2. 注册默认的服务集合，包括日志记录（`ILogger`）、配置（`IConfiguration`）和依赖注入（`IServiceProvider`）。
3. 创建一个默认的 `Kestrel` Web 服务器。
4. 加载默认的配置来源（如 `appsettings.json`、环境变量、命令行参数等）。
5. 最终生成一个 `WebApplication` 对象并运行。

**对应等效代码（伪实现）**：

```
csharpCopy codevar hostBuilder = Host.CreateDefaultBuilder(args)  // 创建默认主机构建器
    .ConfigureServices((context, services) =>
    {
        // 注册默认服务（如日志、配置等）
    })
    .ConfigureWebHostDefaults(webBuilder =>
    {
        // 使用 Kestrel 服务器
        webBuilder.UseKestrel();
        webBuilder.UseStartup<Startup>();
    });

var host = hostBuilder.Build();
await host.RunAsync();
```

框架为你隐式处理了大量基础工作，简化了开发流程。

### Dependency Injection

由.net自动注入的依赖

**IOption**

**IHttpContextAccessor**

**IServiceProvider**

**IConfiguration**

**ILogger\<TCategoryName>**

 **IWebHostEnvironment / IHostEnvironment**

**CancellationToken**

**ApplicationLifetime 服务**

- **服务接口**：
  - **IHostApplicationLifetime**：应用程序生命周期事件。
  - **IWebHostApplicationLifetime**：专用于 Web 的生命周期事件（仅限 Web 应用



### 配置外键约束在执行删除操作时的行为

`Microsoft.EntityFrameworkCore.DeleteBehavior` 枚举用于配置外键约束在执行删除操作时的行为。

#### 比较总结

| 枚举类型          | 数据库约束           | 是否级联删除 | 子表字段变 `NULL` | 删除限制 | 适用场景                             |
| ----------------- | -------------------- | ------------ | ----------------- | -------- | ------------------------------------ |
| **Cascade**       | `ON DELETE CASCADE`  | 是           | 否                | 否       | 强依赖关系，如订单和订单明细         |
| **Restrict**      | `ON DELETE RESTRICT` | 否           | 否                | 是       | 需要防止误删除主表记录，如用户和订单 |
| **SetNull**       | `ON DELETE SET NULL` | 否           | 是                | 否       | 弱依赖关系，如分类和产品             |
| **NoAction**      | 无显式约束           | 否           | 否                | 是       | 自定义删除逻辑                       |
| **ClientSetNull** | 内存行为             | 否           | 是                | 否       | 内存中设置外键 `NULL`                |
| **ClientCascade** | 内存行为             | 是           | 否                | 否       | 内存中级联删除                       |

