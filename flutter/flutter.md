1. 快捷键: 

  1. Alt + enter: 

     1. 给widget包裹另一个widget

     1.  将statelessWidget转成statefullWidget

  2. stless  / stful 快捷生成widget

  3. shift+e快速抽取widget
2. 基本的wedgit 

  1. Text/ Text.rich / TextSpan

  2. 按钮: OutlinedButton, TextButton, ElevatedButton, 使用TextButton来自定义button

  3. 图片Image/Image.asset/ Image.network
     i. 字体图标Icon和Text的关系
     ii. FadeInImage
     iii. ButtonTheme Widget给button添加样式

  4. 表单:  TextField  (TextEditingController)

  5. 布局相关部件:  Column, Row(Row/Column: 继承自Flex), Align, Padding, Stack, Wrap

  6. 滚动相关: 

     - listview: --- list类型的Sliver
       - Listview()  使用List. Generate性能不高
       - Listview.build() 支持懒加载
       - Listview.seperated()
       - Listview.custom()

     - GridView --- Grid类型的Sliver
       - GridView()
         - GridView. count()  可以通过GridView()部件实现
         - GridView.entend() 可以通过GridView()部件实现
         - GridView.builder()支持懒加载

     - Sliver
       - Sliverlist类似于  Listview --- list类型的Sliver
       - SliverFixedExtentList  类似于Listview中每一项固定宽度的--- list类型的Sliver
       - SliverGrid使用这个才可能使得性能高点;
         创建时:参数传入  delegate: SliverChildBuilderDelegate—更加高效; 参数传入  delegate: SliverChildListDelegate—不高效;
         类似于Gridview--- Grid类型的Sliver; 
       - SliverGrid.count, SliverGrid.extent是使用SliverGrid创建sliver的简写, 但是创建方式性能低 
       - SliverPadding
       - SliverAppBar
       - SliverSafeArea / SafeArea

     - CustomScrollView

       - ListView和GridView继承自BoxScrollView,   
       - BoxScrollView和CustomScrollView继承自ScrollView
       - BoxScrollView可以看成特殊的CustomScrollView
         BoxScrollView是单个sliver组成的数组[sliver]
         CustomScrollView是多个sliver组成的数组[slive, sliver,sliver]
         CustomScrollView参数Slivers数组的成员只能是上面的sliver

       - SingleChildScrollView widget

     - 滚动的两种方式可以监听:

       - controller:
         a. 可以设置默认值offset
         b. 2.监听滚动, 也可以监听滚动的位置, 不能监听开始滚动和结束滚动
       - NotificationListener部件
         a. 开始滚动和结束滚动监听
         vi. 其他: ListTile部件

  7. 其他部件: ThemeData, , Container, SizeBox, BoxDecoration, Divider, Expanded

3. MediaQuery.of(context).size.width 媒体查询
4. 其他: viewmodel里面快速生成set和get函数的快捷键: alt + insert
5. 弹窗有关: 
  a. ShowDialog()
  b. SnackBar widget
6. MaterialApp管理着路由和主题
7. When this widget’s parent rebuilds, the parent creates a new instance of ShoppingList, but the framework reuses the _ShoppingListState instance that is already in the tree rather than calling createState again.



> * statelesswidget的生命周期很简单, 只有两个: constructor和build
> * 重点关注的StatefulWidget的生命周期,
> * Statefulwidget的生命周期 => State的生命周期
> * 1. Statefulwidget的生命周期: constructor => createState
> * 2. State的生命周期:
> * constructor => initState(常用) => build(常用) => dispose(常用)
> * setState => build
> * didupdateWidget => build
>
>


 


文档中常见的button: 
1. Flutter里面的本地缓存; 登录并记录登录状态, 下次的登录的时候可以不用校验以及登录的有效期\生命周期
2. 在materialapp里面定义的全局theme, 哪个样式默认应用到哪里; 
style: Theme.of(context).primaryTextTheme.headline6
3. flutter运行的三种模式
4. 动画()
5. 研究Material Widget, 以及使用Material时, 构造函数的参数中那些不能同时存在
6. 

Cookbook
1. Animation- 物理模拟
2. Design- 字体相关










1. The StatefulWidget class is, itself, immutable and can be thrown away and regenerated, but the State class persists over the lifetime of the widget.

Review:
1. 在什么情况下类可以混入TickerProviderStateMixin？
混入TickerProviderStateMixin必须是继承State的情况下；具备有状态类的生命周期下；




Todo:
 理解组件多级选择SelectMultilevel



