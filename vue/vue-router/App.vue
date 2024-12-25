<template>
  <div id="app">
    <router-link to = '/home' >首页</router-link>
    <router-link to = '/about'>关于</router-link>
    
    <!-- 传递参数 -->
    <!-- 方式一:  <router-link> -->
    <router-link :to = "'/user/'+userId">用户</router-link>
    <!-- <router-link :to = '{path: "/profile", query:{name: "userA", age:18, height: 1.88}}'>档案</router-link> -->
    <!-- 方式二:JavaScript方式 -->
    <button @click="profileClick">档案</button>
    
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function () {
    return{
      userId:'rachiel'
    }
  },
  methods:{
    profileClick(){
      this.$router.push({
        path:'/profile',
        query:{
          name:'userA',
          age:18
        }
      })
    }
  }
}
</script>

<style>

</style>
