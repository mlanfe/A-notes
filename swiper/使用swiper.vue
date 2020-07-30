<template>
  <swiper>
    <swiper-item v-for='(item,key) in banners' :key='key'>
      <a :href="item.link">
      <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from './swiper组件/Swiper'
  import SwiperItem from './swiper组件/SwiperItem'
  
  export default {
    name:'HomeSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },




    //确认swiper的图片是否加载完成,以便进行其他操作,与swiper本身无关
    methods:{
      swiperImgLoad(){
        //利用isImgLoad,避免每张图片加载完都向外发出一次事件,造成性能损失
        //如果图片加载过慢,homeSwiper的高度可能在短时间内为零,从而导致其他组件获取的自身位置信息有误. 而只要有一张图片加载完成后,homeSWiper的高度就是准确的了.所以只要向外发出一次图片加载完的信息即可
        if(!this.isImgLoad){this.isImgLoad=true;this.$emit('swiperImgLoad');}
      }
    }
  }
</script>