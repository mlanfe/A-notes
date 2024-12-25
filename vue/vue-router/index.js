//配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

// 路由的懒加载
const Home = () => import('../components/Home')
const HomeMessage = () => import('../components/HomeMessage')
const HomeNews = () =>import('../components/HomeNews')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')


//1.通过vue.use(插件名),安装插件
Vue.use(VueRouter)

//2.创建Vuerouter对象
const routes = [
  {
    // 设置路由的默认路径
    path:'',
    redirect:'/home'  
  },
  {
    path:'/home',
    component:Home,
    // 嵌套路由的路径前面不需要加 ' / '
    children:[
      {path:'', redirect:'news'},
      {path:'message', component:HomeMessage},
      {path:'news', component:HomeNews}
    ],
    meta:{
      title:'主页'
    }
  },
  {
    path:'/about',
    component:About,
    meta:{
      title:'About'
    }
  },
  {
    path:'/user/:userId',
    component:User,
    meta:{
      title:'User'
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      title:'Profile'
    }
  },
]
const router = new VueRouter({
  //配置路由和组件的之间的映射关系
  routes,
  // 设置改变路径的方式, 默认是改变路径的hash
  mode:'history',
  // 修改vue为选中状态下的<router-link>添加的类名
  linkActiveClass:"active"
})

// 前置守卫
router.beforeEach((to,from,next) => {
  // console.log(to)
  document.title = to.matched[0].meta.title;
  // 必须调用next方法,否则路由之间无法跳转
  next();
})


//3.将router对象传入Vue实例中
export default router