<template>
  <div id="home">
    <scroll class="content" 
            ref='scroll'
            @scroll='scrollPostion'
            @pullingUp='loadMore'
            :probeType='3'
            :pullUpLoad='true'>
            <ul>
              <li>需要滚动的内容</li>
              <li>需要滚动的内容</li>
              <li>需要滚动的内容</li>
              <li>需要滚动的内容</li>
              <li>需要滚动的内容</li>
              <li>需要滚动的内容</li>
            </ul>
    </scroll>
    <back-top @click.native="tabTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  
  import BackTop from 'components/content/backtop/BackTop'
  import {debounce} from 'common/utils'

  export default {
    name: 'Home',
    components:{
      Scroll,
      BackTop
    },
    data(){
      return {
        isShowBackTop: false
      }
    },
    mounted(){
      // 防抖函数
      // 1.图片是异步加载的,在网络环境差的情况下,bsScroll内部存储的可滚动区域的长度可能
      //   比实际的可滚动区域的长度短,造成无法滚动页面的bug,所以要在图片加载完成后调用
      //   bsScroll的refresh方法,更新bsscroll内部存储的可滚动区域的长度
      // 2.在图片较多的情况下,会在短时间内频繁调用refresh方法,性能低且服务器压力大,需要防抖(debounce)
      // 3.不能再created钩子里调用this.$refs.scroll.refresh(),因为此时this.$refs.scroll可能为null
      //ps:注意传入debouce函数的refresh不能写成refresh()      
      const refresh = debounce(this.$refs.scroll.refresh,100) 
      this.$bus.$on('itemImgLoad', refresh)
    },
    methods:{
      tabTop(){
        // 回到顶部按钮发生点击: 在1秒内回到顶部
        this.$refs.scroll.scrollTO(0,1000)
      },
      // 判断是否显示回到顶部按钮
      scrollPostion(position){
        this.isShowBackTop = -position > 1000 ? true : false
      },
      loadMore(){
        // 发生上拉加载更多事件, 从后台请求数据
      },        
    }
      
  }
</script>

<style scoped>
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
