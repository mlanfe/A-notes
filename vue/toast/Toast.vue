<template>
  <div class='toast' v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data(){
      return {
        message: '',
        isShow: false
      }
    },  
    methods:{
      showMessage(msg = '提示消息', delay = 2000){
        this.message = msg
        this.isShow = true
        setTimeout(() => {this.isShow = false}, delay)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0 , 0, .7);
    width: 120px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 10px ;
    z-index: 999;
  }
</style>
