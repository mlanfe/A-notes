<template>
  <div>
      <h2>我是主页</h2>
      <p>我是主页内容</p>
      <!-- 必须是完整的路径.不能省略前面的"/home" -->
      <router-link to = '/home/news'>新闻</router-link>
      <router-link to = '/home/message'>消息</router-link>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      path:'/home/news'
    }
  },
  activated() {
    this.$router.push(this.path)
  },
  // 组件内的守卫
  beforeRouteLeave (to, from, next) {
    // console.log(this.$route.path);
    // 保存当前组件对应的路径
    this.path = this.$route.path;
    next()  
  },
}
</script>

<style>

</style>
