#### setState() 的异步和同步

1. 异步其实是react在自己实现的上下文中的异步,(本质上是同步);  在js原生的异步里面, setState是同步
2. 通过addEventListener添加的事件处理程序里是同步的(通过onClick添加的事件处理程序里面是异步的, 因为此时的事件处理程序是在react自己的执行上下文中),   settimeout, promise里面是同步
3. 多个state会合成到一起进行批量更新, 会发生setState的合并, 例如异步执行的this.setState({couter: this.state.counter+1});this.setState({couter: this.state.counter+1});其实最终被合并为只执行了一次this.setState({couter: this.state.counter+1}); 要想避免合并: (1) 使得setState同步执行; (2)this.setState((prevState, props) => {return {counter: prevState.counter + 1 }) 注意:要使用prevState, 如此此时依旧调用this.state还是不能获取到state更新后值





`import PropTypes from 'prop-types'; ` 属性验证 

`React.CreateContext(传入默认值)`

```react
import { EventEmitter } from 'events';
const eventBus = new EventEmitter();

eventBus.addListener("sayHello", 事件处理程序的名字);
eventBus.removeListener("sayHello", 事件处理程序的名字);

eventBus.emit("sayHello", 123, "Hello Home");
```

` ReactDOM.createPortal(ComPonentName, HTMLElment)`  portal的使用

`React.CreateRef()`

`React.forwardRef(FunctionComponentName)	`	函数式组件中ref的使用





#### styled-components:

1.  props穿透(元素的原生属性可以用在被styled处理后的组件上), 也可以结合使用attrs

```
 const HYInput = styled.input.attrs({
   placeholder: "coderwhy",
   bColor: "red"
 })
```

​    等同于:

​    `<HYInput placeholder:"coderwhy" />`

​    并且向`attrs`中传入的属性和直接在`<HYInput>`中写的属性, 可以用在模板字符串中的箭头函数中

2.  props可以被传递给styled组件(作为props的属性)
3.  支持继承
4. 它支持类似于CSS预处理器一样的样式嵌套
5.  支持主题





####  yarn add @craco/craco      修改react中的配置



#### react-transition

```react
yarn add react-transition-group

import { CSSTransition } from 'react-transition-group'

      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        appear
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
          <div>要添加动画的内容</div>
      </CSSTransition>
```



#### redux:

*手动联系react和redux*

```react
import {redux} from 'redux'
function reducer(state = initialState, action) {}
const store = redux.createStore(reducer)

store.getState()
store.dispatch({type: `action的名字`, value:''})

const unSubscribe = store.subscribe(() => {})
unSubscribe() 取消对state的订阅
```

****

*利用react-redux库 ( 实现了connect ) 来在react使用redux*       `yarn add react-redux`



1. ***redux-thunk***  `yarn add redux-thunk`

​		未使用redux-thunk时, store.dispatch() 只可以传入对象; redux-thunk使得store.dispatch()可以传入函数, 且传入的函数调用时会传入dispatch和getState



- 如果使用thunk

  ```javascript
  // react组件里面
  dispatch(changeName)
  
  // actionCreators.js里面, 把changeName看成是异步请求
  export const changeName = (dispatch, getState) => {
    setTimeout(() => {
      dispatch({
        type: "changeName",
        value: "Amy",
      })
    }, 3000);
  }
  ```

  

- 如果不使用thunk

  - 如果异步请求传入dispatch函数

    ```javascript
    // react组件里面
    dispatch(changeName())
    
    // actionCreators.js里面, 把changeName看成是异步请求
    export const changeName = () => {
      setTimeout(() => {
        store.dispatch({
          type: "changeName",
          value: "Amy",
        })
        
      }, 3000);
      // 必须有返回值, 且是包含type属性的对象, 否则reducer函数无法读取type属性
      return {
        type: "",
      }
    }
    ```

    缺点:  changeName多了一个返回对象(包含无意义type属性)的操作; 并且changeName和store耦合了

  - 如果异步请求在组件中完成

    ```javascript
    // 发生了点击事件handleClick
    function handleClick = () => {
        // 把setTimeout看成是异步请求
        setTimeout(() => {
            store.dispatch({
              type: "changeName",
              value: "Amy",
            })
      }, 3000);
    }
    ```

    缺点: 发送网络请求的代码写在了组件中了, 没有做到逻辑与ui布局分离, 代码分离不够优美








2. ***redux-saga***



#### react-router

`yarn add react-router-dom` 会自动帮助安装 `react-router`

`yarn add react-router-config` react-router的v6版本中`useRoutes`已经可以取代该库



只有通过路由跳转渲染的组件或者通过withRoute()高阶组件处理过的组件才能使用下列属性: 

`this.props.match`: 保存着传入`<route>`组件的相关属性

`this.props.location`: 保存着传入`<Link> <NavLink>`组件的相关属性

`this.props.history`: 与页面跳转相关





#### react-hooks Tips

- 只能在 **React 的函数组件**中调用 Hook。

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。

只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。



#### 函数式组件与钩子函数理解

函数式组件没有使用memo, 父组件只要重新渲染, 子组件都会整体重新执行

函数式组件在使用memo后, 父组件改变传递给子组件的数据时, 子组件才会重新整体执行;                                                                                                                              但是:  当子组件使用了来自父组件的context或者其他数据, 且这些数据是引用类型值, 那么父组件重新渲染时, 相当于重新创建了新的引用类型的值, 那么传递给子组件的数据其实每次都是不同的, 所以当传递这些类型的数据时, 无论其是否真的改变, 都会引起子组件的重新渲染; 当这些数据是基本类型值的时候, 那么父组件重新渲染, 子组件不会重新执行

不是改变state, 函数式组件不会整体重新执行

函数式组件: 如果子组件使用了父组件中不是state的数据, 该数据改变, 父组件和子组件都不会重新渲染; 但是该值在父组件和子组件中其实都已经改变, 并且可以访问到修改以后的值. 但是如果修改了state, 因为是函数式组件, 函数整体重新执行, 该数据的修改后的值不会保留, 返回最初的状态



#### useState

- 不像 class 中的 `this.setState`， 函数式组件更新 state 变量总是**替换** 它而不是合并它。



#### 纯函数

1. 函数返回结果只依赖它的参数。确定的输入，一定会产生确定的输出
2. 函数执行过程中不会对外产生可观察的变化。 函数在执行过程中，不能产生副作用；

无论是函数还是class声明一个组件，这个组件都必须像纯函数一样，保护它们的props不被修改; redux中，reducer也被要求是一个纯函数。

#### useEffect ####

1. effect( 副作用 )是相对于纯函数的概念:  指函数或者表达式的行为依赖于外部世界。

- 1. 函数或者表达式修改了它的 scope 之外的状态

- 1. 函数或者表达式除了返回语句外还与外部世界或者它所调用的函数有明显的交互行为

     纯函数



可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

**`useEffect` 会在每次渲染后都执行**. React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`。并且每次执行useEffect, 都会生成*新的* effect ( 这个effect就是指传递给useEffect钩子的函数 )，替换掉之前的,  这正是可以在 effect 中获取最新的state值，而不用担心其过期的原因。

`useEffect`会在调用一个新的 effect 之前对前一个 effect 进行清理.

如果使用了useEffect的第二个参数,  请确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。



需要清除和不需要的清除副作用

不需要清除的副作用: 发送网络请求，手动变更 DOM，记录日志

需要清除的副作用: 订阅外部数据源

#### useCallback, useMemo

* 传入子组件的数据为引用类型时, 即便是使用了memo(), 无论数据是否改变, 函数式组件在重新执行时,  相当于重新创建了新的引用类型的数据, 导致传入子组件的数据不是同一个, 引起子组件渲染, 导致性能浪费 . 使用useCallback, useMemo可以解决以上造成的性能问题

* 这两个钩子, 在依赖不变的情况下，多次定义的时候，返回的值是相同的, 所以将他们的返回值传入子组件, 不会造成不必要的渲染

* 另一种理解 (正确性与否存疑): 依赖不改变时, 传入两个钩子的第一个参数也就是回调函数在函数式组件的的重新执行时候**不会执行**,但是又保留着对之前执行后返回对象的引用,  所以返回值还是之前的值

* 理解: 

  ```javascript
  let bar = useCallback(fn, deps); 
  let foo = useMemo(() => fn, deps);
  ```

Tips:

* `useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

* useCallback返回的是传入的回调函数的memoried版本,                                                                               
  useMemo返回的是是传入的回调函数执行后的返回值的memoried版本

  依赖不变时, 保证返回值不变

* 传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。



#### useRef

* 作用一: 改变useRef.current不会引起页面重新渲染, 又能保留当前值, 不会因为函数式组件重新执行而回到最初值; 相当于不会引起页面重新渲染的state
* 作用一: 引入DOM（或者组件，但是需要是class组件）元素





#### useDispatch

#### useSelector(() => {}, shallowEqual)  

- `import { shallowEqual, useDispatch, useSelector } from "react-redux";`

- `shallowEqual`: 避免其他state改变时, 引起组件的渲染





#### 自定义Hook:

	1. 必须以use开头, 函数内部可以调用其他的 Hook
	2. 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。







#### immutable

`yarn add immutable`

`yarn add redux-immutable `





#### react哲学

1. 将设计好的 UI 划分为组件层级
   + 根据`单一功能原则`来判定组件的范围。也就是说，一个组件原则上只能负责一个功能
2. 用 React 创建一个静态版
   + 将渲染 UI 和添加交互这两个过程分开
   + 自上而下构建应用：自上而下意味着首先编写层级较高的组件, 适用于比较简单的项目
   + 自下而上构建应用: 自下而上意味着从最基本的组件开始编写, 适用于较为大型的项目
3. 确定 UI state 的最小（且完整）表示
   - 只保留应用所需的可变 state 的最小集合，其他数据均由它们计算产生。
4. 确定 state 放置的位置, 让state数据流顺着组件层级从上往下传递
5. 添加反向数据流, 处于较低层级的组件更新较高层级的 组件中的 state。



`const [count, setCount] = useState(0)`

当我们更新状态的时候，React会重新渲染组件。每一次渲染都能拿到独立的`count` 状态，这个状态值是函数中的一个常量。任意一次渲染中的`count`常量都不会随着时间改变。渲染输出会变是因为我们的组件被一次次调用，而每一次调用引起的渲染中，它包含的`count`值独立于其他渲染。

组件函数每次渲染都会被调用，但是每一次调用中`count`值都是常量，并且它被赋予了当前渲染中的状态值。

1. 每一次渲染都有它自己的事件处理函数

this.setState和useState不同, 前者是合并, 后者是替换(如果是常量, 直接覆盖, 如果是应用类型, 那么指针指向新的state);  所以每次渲染中, 常量state指向的数据(无论是基本类型还是应用类型), 都是独立的



每次函数式组件执行, 里面的内容都是重新创建的, 收到新的state的影响

该避免直接修改state。通过调用`setSomething(newObj)`的方式去生成一个新的对象而不是直接修改它是更好的选择，因为这样能保证之前渲染中的state不会被污染。直接修改state, , 不同于useState的替换, 而仅仅实在原state上修改. 不会导致函数式组件重新渲染;  因为state是常量(用const定义的变量), 所以直接修改基本类型值的State会报错



useEffect钩子中的effect函数, 和useState中的State一样, 每次渲染都对应一个新的effect函数



函数式组件中**每一个**组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获某次渲染中定义的props和state。

effect的清除并不会读取“最新”的props。它只能读取到定义它的那次渲染中的props值：



给effect添加依赖(即第二个参数), 可以让effect在依赖改变时获取最新值并且执行; 有时候依赖频繁改变, 会导致effec里面的函数或者其他对象频繁的创建和重置, 这时候可以使用一些技巧, 在实现目的的同时, 减少effect的执行, 从而减少相关对象和函数的频繁创建和销毁



**当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用`useReducer`去替换它们。**

当你写类似`setSomething(something => ...)`这种代码的时候，也许就是考虑使用reducer的契机。reducer可以让你**把组件内发生了什么(actions)和状态如何响应并更新分开表述。**



让useEffect可以正常运行 => 第一种: 添加依赖; 第二种: 直接通过技巧不使用依赖 ( 应该从第一种开始，然后在需要的时候应用第二种。)

添加依赖如果频繁变动 => 导致useEffect内部频繁创建和销毁某些函数例如: setInterval, setTimeout => 使用技巧不使用依赖





#### context的缺点

1. 耦合度高, 不利于组件复用

2. 受到shouldcomponent影响, 可能不会重新渲染

- 当context的provider提供的值改变, provider的shouldComponentUpdate返回false时, provider不会重新渲染,

​    此时即便value改变, consumer也不会重新渲染

- 当context的provider提供的值改变, 且provider重新渲染, 即便consumer的祖先组件的shouldComponentUpdate

​    返回false, consumer也会重新渲染

3. 相当于全局变量, 不利于追溯数据的来源





#### 事件绑定

  在jsx里面时间绑定直接通过this.bar调用函数bar的话, 因为react内部使用类似于bar.bind(null, e)的语法调用事件的回调函数, 导致bar内部的this指向undefined

  事件处理程序: 

  html方式: 传入函数的调用: oncick=bar(...args)

  dom0级方式 : 传入函数名: btn.onclick = bar

  dom1级方式: 传入函数名: btn.addEventListener("click", bar)





#### `yarn add @craco/craco`   配置webpack

初始化项目目录,

重置css

配置页面基本的路由跳转

配置axios

`yarn add antd`

`yarn add axios`

`yarn add react-redux`

`yarn add redux-thunk`

`yarn add react-router-dom` 

`yarn add react-router-config`

`yarn add styled-components`

`yarn add redux-immutable`





