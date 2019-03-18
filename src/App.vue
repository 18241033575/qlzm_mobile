<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'PingFang-SC','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

  }
  /*初始化*/
  html, body, div, span,
  applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, font, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  dd, dl, dt, li, ol, ul,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .common_input{
    clear: both;
    margin: 15px auto 0;
    width: 92%;
    height: 44px;
  }
  html{
    background-color: #F0F1F5;
  }
  .common_input_sms{
    width: 55%;
  }
  .get_smsCode{
    text-align: center;
    /*line-height: 38px;*/
    width: 44%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f8f8f8;
    border: 1px solid #E1E4E6;
    font-size: 14px;
    color: #ff8236;
  }
  .get_smsCode:focus{
    outline: none;
  }
  .sms_group{
    width: 92%;
    margin: 15px auto 0;
    height: 44px;
  }
  .common_input_sms .el-input__inner{
    display: inline-block;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    border: 1px solid #E1E4E6;
  }
  .common_input .el-input__inner{
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*width: 90%;*/
    line-height: 40px;
    border: 1px solid #E1E4E6;
    margin: 0;
    padding: 0 15px;
  }
  .common_btn{
    margin-top: 20px;
    padding: 0;
    width: 92%;
    line-height: 40px;
    background-color: #5082E6;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
  }
  .common_btn:focus{
    outline: none;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .content{
    margin: 0 auto;
    width: 92%;
  }
  /*公共头部栏*/
  .common_title{
    width: 100%;
    line-height: 36px;
    font-size: 14px;
    color: #353535;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .common_title img{
    margin-right: 5px;
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
  .common_menu{
    position: absolute;
    right: 4%;
    top: 11px;
    width: 22px;
    height: 22px;
    z-index: 88888;
  }
  .stop_scroll{
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .com_det_title{
    line-height: 44px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    background-color: #ffffff;
    text-align: left;
  }
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
  .empty img{
    width: 160px;
    height: 160px;
  }
  .empty p{
    margin-top: 20px;
    font-size: 14px;
    color: #919199;
  }
  /* 底线 */
  .load{
    /*height: auto;*/
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .bottom_line{
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #919199;
  }
</style>
