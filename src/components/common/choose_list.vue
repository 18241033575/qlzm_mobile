<template>
  <!--选择列表-->
  <div class="choose_list">


    <!--筛选第一层-->
    <div class="filter_all_box" v-show="this.isShow">
      <div class="filter_bg">

      </div>
      <div class="filter_det">
        <div class="choose_title">
          <div class="content">
            <img @click="go_back" src="/static/images/left-arrow.png" alt=""><span>{{chooseTitle}}</span>
          </div>
        </div>
        <div class="content">
          <div class="classify_cell">
            一级建造师<img class="fr" src="/static/images/ic_checked@2x.png" alt="">
          </div>
          <div class="classify_cell">
            一级建造师<img class="fr" src="/static/images/ic_checked@2x.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      give_shade:{
        default: true
      }
    },
    name: "choose_list",
    data() {
      return {
        chooseTitle: '请选择证书类型',
        isShow: true,
        default_headPic: '/static/images/ic_user_def@2x.png',
        userName: ''
      }
    },
    methods: {
      nav_close() {
        this.isOpen = true;
        this.$emit('give_sign', this.isOpen);
      },
      exit_login() {
        localStorage.clear();
        this.isLogin = false;
        this.$router.push({name:'index'})
      },
      go_back() {
        this.isShow = false
      }
    },
  }
</script>

<style scoped>
  /*筛选弹层*/
  .filter_all_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
    z-index: 9999999;
  }
  .filter_bg{
    width: 10%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .filter_det{
    width: 90%;
    height: 100vh;
    overflow-y: scroll;
    background-color: #ffffff;
  }
  .choose_title{
    width: 100%;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .choose_title img{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .choose_title{
    font-size: 14px;
    color: #353535;
  }
  .classify_cell{
    line-height: 44px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #EAEAEA;
    color: #353535;
  }
  .classify_cell span{
    color: #919199;
  }
  .classify_cell img{
    margin-top: 11px;
    margin-left: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
</style>
