import {debounce} from './utils.js'
import BackTop from 'components/content/backtop/BackTop'

// 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100)  
    //对监听的事件进行保存,以便对其取消监听
    this.itemImgListener =  () => {refresh()}
    this.$bus.$on('itemImgload', this.itemImgListener)
  } 
}

export const backTopMixin = {
  data(){
    return{
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods: {
     //返回顶部按钮发生点击的事件处理程序
     tabTop(){
      this.$refs.scroll.scrollTO(0,300)
    },
  },
}