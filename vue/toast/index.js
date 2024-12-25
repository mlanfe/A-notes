import Toast from './Toast.vue'

const obj = {}
//install函数执行时,会接受vue作为第一个参数
obj.install = function(Vue){
  console.log('toast/index.js: 执行了obj的install函数');
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //new的方式,根据组件构造器,可以创建出一个组件对象
  const toast = new toastConstructor()
  //将组件对象手动挂载到某个元素上,此时toast对应的$el就是'div'
  toast.$mount(document.createElement('div'))
  //将组件对象的模板添加到body元素中,使其显示到页面上
  document.body.appendChild(toast.$el)
  //将toast放在原型对象上,以便在其他组件中通过this.$toast调用toast组件的方法
  Vue.prototype.$toast = toast
}
export default obj

//使用插件的逻辑:
  // 1.将组件模板插入body元素中,以便在页面中显示. 并在组件中定义方法和样式等,以便控制组件的显示
  // 2.如何在任何地方都可以控制组件的显示:将组件添加到Vue的原型对象中,通过'this.$组件名',调用组
  //   件中的方法,来控制组件的显示方式

// 逻辑正确,但错误的方法:此时Toast的$el还没有挂载,Toast.$el = undefined
// obj.install = function(){
//   document.body.appendChild(Toast.$el)
//   Vue.prototype.$toast = Toast
// }

