import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
 
// 安装自定义的toast插件(安装时,自动调用toast的install方法)
Vue.use(toast)
//解决图片的懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/loading.png')
})
//解决移动端300ms延迟的问题
FastClick.attach(document.body);

// 添加事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


