<template>
  <div class="empty" v-show="emptySign">
    <div class="empty_img">

    </div>
    <p>暂无数据</p>
  </div>
</template>

<script>
    export default {
      props: [
       "sign"
      ],
        name: "null_page",
      data(){
          return{
            emptySign: false,
          }
      },
    watch: {
      sign (newV, oldV) { // watch监听props里status的变化，然后执行操作
        this.emptySign = this.sign;
      }
    },
    }
</script>

<style scoped>
  .empty{
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 145px;
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: #ffffff;
    z-index: -1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .empty .empty_img{
    margin: 0 auto;
    width: 160px;
    height: 160px;
    background: url("/static/images/ic_empty_data@2x.png") center center;
    background-size: 160px 160px;
  }
  .empty p{
    margin-top: 20px;
    font-size: 14px;
    color: #919199;
  }
</style>
