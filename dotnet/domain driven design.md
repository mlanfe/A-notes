# Domain Driver Design

## Domain Primitive

**Domain Primitive 是一个在特定领域里，拥有精准定义的、可自我验证的、拥有行为的 Value Object 。**

- DP是一个传统意义上的Value Object，拥有Immutable的特性
- DP是一个完整的概念整体，拥有精准定义
- DP使用业务域中的原生语言
- DP可以是业务域的最小组成部分、也可以构建复杂组合

### 1. 使用 Domain Primitive 的三原则

- 让隐性的概念显性化
- 让隐性的上下文显性化
- 封装多对象行为

### 2. Domain Primitive 和 DDD 里 Value Object 的区别

- Domain Primitive 是 Value Object 的进阶版，在原始 VO 的基础上要求每个 DP 拥有概念的整体，而不仅仅是值对象。在 VO 的 Immutable 基础上增加了 Validity 和行为。当然同样的要求无副作用（side-effect free）。

### 3. 常见的 DP 的使用场景包括：

- 有格式限制的 `String`：比如`Name`，`PhoneNumber`，`OrderNumber`，`ZipCode`，`Address`等
- 有限制的`Integer`：比如`OrderId`（>0），`Percentage`（0-100%），`Quantity`（>=0）等
- 可枚举的 `int `：比如 `Status`（一般不用Enum因为反序列化问题）
- `Double`` `或 `BigDecimal`：一般用到的 `Double`` `或 `BigDecimal `都是有业务含义的，比如 `Temperature`、`Money`、`Amount`、`ExchangeRate`、`Rating`` `等
- 复杂的数据结构：比如 `Map<String, List<Integer>> `等，尽量能把 `Map`` `的所有操作包装掉，仅暴露必要行为

## 应用架构

### 抽象数据存储层

Entity Object: 一个实体（Entity）是拥有ID的域对象，除了拥有数据之外，同时拥有行为。Entity和数据库储存格式无关，在设计中要以该领域的通用严谨语言（Ubiquitous Language）为依据。

IReposiory: IReposiory只负责Entity对象的存储和读取，而IReposiory的实现类完成数据库存储的细节。通过加入IReposiory接口，底层的数据库连接可以通过不同的实现类而替换。

### 抽象第三方服务

### 抽象中间件



### **封装业务逻辑**





### 概念

1. DP：data primitive
2. DO: data object, 单纯的和数据库表的映射关系，每个字段对应数据库表的一个column. 只有数据，没有行为。
3. DTO: data transfer object, 
4. DAO: data access object, 例: dbcontext



通过Entity、Domain Primitive和Domain Service封装所有的业务逻辑：

### Entity Object, IRepository, DAO,  DO

repository类中的方法的参数和返回值都是关于entity object. 
repository通过dao获取do, 将do转成entity object

##### 1. Entity Object实体类和DO数据类的对比如下：

- Data Object数据类：DO是单纯的和数据库表的映射关系，每个字段对应数据库表的一个column，这种对象叫Data Object。DO只有数据，没有行为。DO的作用是对数据库做快速映射，避免直接在代码里写SQL。无论你用的是MyBatis还是Hibernate这种ORM，从数据库来的都应该先直接映射到DO上，但是代码里应该完全避免直接操作 DO。
- Entity实体类：实体类基于领域逻辑，它的字段和数据库储存不需要有必然的联系。Entity包含数据，同时也应该包含行为。在 Account 里，字段也不仅仅是String等基础类型，而应该尽可能用上一讲的 Domain Primitive 代替，可以避免大量的校验代码。

##### 2. DAO 和 IRepository类的对比如下：

- DAO对应的是一个特定的**数据库类型**的操作，相当于SQL的封装。所有操作的对象都是DO类，所有接口都可以根据数据库实现的不同而改变。比如，insert 和 update 属于数据库专属的操作。
- IRepository对应的是Entity对象读取储存的抽象，在接口层面做统一，不关注底层实现。比如，通过 save 保存一个Entity对象，但至于具体是 insert 还是 update 并不关心。IRepository的具体实现类通过调用DAO来实现各种操作，通过Builder/Factory对象（MyBatis框架）实现AccountDO 到 Account之间的转化

##### 3. IRepository和Entity

- 通过Entity对象，避免了其他业务逻辑代码和数据库的直接耦合，避免了当数据库字段变化时，大量业务逻辑也跟着变的问题。
- 通过IRepository，改变业务代码的思维方式，让业务逻辑不再面向数据库编程，而是面向领域模型编程。
- Entity属于一个完整的内存中对象，可以比较容易的做完整的测试覆盖，包含其行为。
- IRepository作为一个接口类，可以比较容易的实现Mock或Stub，可以很容易测试。
- Repository实现类，由于其职责被单一出来，只需要关注Entity到DO的映射关系和IRepository方法到DAO方法之间的映射关系，相对于来说更容易测试。







