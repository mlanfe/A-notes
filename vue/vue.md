1. 数组的响应式: 

   - 通过索引值改变数组不是响应式
   - 响应式: push, pop, shift, unshift, sort, reverse, splice
   - 操作原数组的 copywithin( ), fill( ), 直接覆盖整个数组是否是响应式

2. vue组件: 

   - 创建组件构造器`Vue.extend()` => 全局`Vue.component()`/局部`components属性`注册组件 => 使用组件

     ```vue
     //组件构造器
     const cpn = Vue.extend({
     	template: `<div>我是一个组件</div>`
     })
     
     //全局注册
     Vue.component('cpn', cpn)
     
     //局部注册
     components: {
     	cpn,
     }
     ```

     

   - 语法糖: 省略了调用Vue.extend()的步骤, 直接在第二步中传入对象

     ```vue
     //全局注册
     Vue.component('cpn', {
     	template: `<div>我是一个组件</div>`
     })
     
     //局部注册
     components: {
     	cpn: {
     		template: `<div>我是一个组件</div>`
     	}
     }
     ```

     

   











































