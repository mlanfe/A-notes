promise 的几个关键问题 

1. 如何改变 promise 的状态?  
   - resolve(value): 如果当前是 pendding 就会变为resolved
   - reject(reason): 如果当前是 pendding 就会变为 rejected 
   - 抛出异常: 如果当前是 pendding 就会变为 rejected 
2. 一个 promise 指定多个成功/失败回调函数, 都会调用吗? 
   -  当promise 改变为对应状态时都会调用 
3. 改变 promise 状态和指定回调函数谁先谁后? 
   - 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
   - 如何先改状态再指定回调? 
     - 在执行器中直接调用 resolve()/reject() 
     - 延迟更长时间才调用 then() 
   - 什么时候才能得到数据? 
     - 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
     - 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据 
4. promise.then()返回的新 promise 的结果状态由什么决定? 
   - 简单表达: 由 then()指定的回调函数执行的结果决定
   - 详细表达: 
     - 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
     - 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
     - 如果返回的是另一个新 promise, 此 promise 的结果就会成为新promise 的结果
5. promise 如何串连多个操作任务?
   - promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用
   - 通过 then 的链式调用串连多个同步/异步任务 
6. promise 异常传透? 
   - 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调
   - 前面任何操作出了异常, 都会传到最后失败的回调中处理
7. 中断 promise 链? 
   - 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数
   - 办法: 在回调函数中返回一个 pendding 状态的 promise 对象