<template>
  <!-- bsscroll的容器元素只会为其第一个子元素添加滚动的功能, 所有要滚动的内容必须包裹在一个元素里 -->
  <!-- 必须要容器元素设置高度 -->
  <div class="wrapper" ref="wrapper">
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll:null,
      }
    },
    props: {
      // 由使用BScroll的人决定是都监听滚动,是否启用上拉加载功能
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      scrollTO(y,time){
        // scroll对象的方法:scrollTo, 在指定时间内滚动到指定位置
        this.scroll.scrollTo(0,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        this.scroll.refresh()
      },
    },
    mounted() {
      // 不能再created钩子函数上使用new BScroll,因为组件被创建时, 模板没有渲染, this.$refs.wrapper可能是undefined
      // ref不仅可以用在自定义组件上, 还可以用在原生html元素上
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 是否监听BScroll里面的点击事件, 默认值为false
        click: true,
        // 默认值：0, 可选值：1、2、3
        // 取值为0和1时候: 不监听滚动位置
        // 取值为2时候: 手指滚动的过程中监听滚动位置,手指离开后(比如手指离开后的惯性滚动)不监听滚动位置
        // 取值为3时候: 监听所有滚动的滚动位置
        probeType: this.probeType,
        // 开启上拉加载功能
        pullUpLoad: this.pullUpLoad
      })
      this.scroll.on("scroll", (positon) => {
        this.$emit('scroll',positon.y)
      }),
      // 发生一次pullingUp事件后, 必须调用scroll对象的finishPullUp(), 才能再次触发pullingUp事件
      // finishPullUp()可以选择在pullingUp的事件处理程序从后端请求完数据后调用
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
