### 基础

1. [模板中的表达式将被沙盒化](https://cn.vuejs.org/guide/essentials/template-syntax.html#restricted-globals-access)，仅能够访问到[有限的全局对象列表](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3)。

2. [动态参数](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamic-arguments)

   ```vue
   // attributeName和url都是动态绑定的
   <a :[attributeName]="url"> ... </a>
   //当 eventName 的值是 "focus" 时，v-on:[eventName] 就等价于 v-on:focus
   <a @[eventName]="doSomething">

3. **Ref **可以持有任何类型的值，[包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#deep-reactivity). 也可以通过 [shallow ref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来放弃深层响应性。

   [额外的 ref 解包细节](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#additional-ref-unwrapping-details)

   - 一个 ref 会在作为 **reactive 对象**(响应式对象: 使用reactive()创建出来的对象)的属性被访问或修改时自动解包
   - 一个 ref 会在作为 **reactive 数组或reactive生集合类型**的成员时不会自动解包
   - 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

   ```vue
   const count = ref(0)
   const state = reactive({count})
   console.log(state.count) // 0
   
   const books = reactive([ref('0'), ref('1)])
   console.log(books[0].value) // 0
   
   const count = ref(0)
   const object = { id: ref(1) } // count 和 object 是顶级属性，但 object.id 不是
   ```

   

   

