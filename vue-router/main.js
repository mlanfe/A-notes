import Vue from 'vue'
import App from './App'
import router from './router'  //等价于: import router from './router/index' 


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

