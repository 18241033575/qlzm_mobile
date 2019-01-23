<template>
  <!--弹出菜单-->
  <div class="main_menu" v-if="this.give_shade&&this.isOpen">
    <!--阴影-->
    <div class="bg_shawed" @click="nav_close" v-show="this.give_shade&&this.isOpen">

    </div>
    <div class="menu_box" v-show="this.give_shade&&this.isOpen">
      <div class="menu_top">
        <div class="content">
          <div class="msg" v-if="isLogin">
            <div class="msg_head">
              <img :src="this.default_headPic" alt="">
            </div>
            <div class="msg_det">
              <p class="msg_name">HI，<span class="user_name">{{userName}}</span></p>
              <p class="greeting">欢迎回来，<span>下午好!</span></p>
            </div>
          </div>
          <div class="btn_group" v-if="isLogin">
            <router-link :to="{name: 'tal_center'}">
              <div class="sub_btn btn_size">
                个人中心
              </div>
            </router-link>
            <router-link :to="{}">
              <div class="cancel_btn btn_size" @click="exit_login">
                退出登录
              </div>
            </router-link>
          </div>
          <div class="btn_group" v-if="!isLogin">
            <router-link :to="{name: 'user_login'}">
              <div class="sub_btn btn_size">
                登录
              </div>
            </router-link>
            <router-link :to="{name: 'user_reg'}">
              <div class="cancel_btn btn_size">
                注册
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="menu_list">
        <div class="content">
          <router-link :to="{name: item.urlRoute}" v-for="(item,index) in menuList" :key="index">
            <div class="menu_list_cell" >
              {{item.urlName}}<img class="fr" src="/static/images/icon_goright.png" alt="">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {splicPic} from '../../../static/js/common.js'
    export default {
      props: {
        give_shade:{
          default: true
        }
      },
        name: "main_menu",
      data() {
        return {
          menuList: {
            0: {
              urlName: "首页",
              urlRoute: "index"
            },
            1: {
              urlName: "找工作",
              urlRoute: "find_job"
            },
            2:{
              urlName: "名企招聘",
              urlRoute: "famous_pos"
            },
            3:{
              urlName: "就业指导",
              urlRoute: "index"
            },
            4:{
              urlName: "新闻资讯",
              urlRoute: "index"
            },
            5:{
              urlName: "关于我们",
              urlRoute: "index"
            },
          },
          isOpen: true,
          openSign: false,
          isLogin: false,
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
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        // console.log(userInfo);
        if (userInfo) {
          this.isLogin = true;
          if (userInfo.photo != '') {
            this.default_headPic = splicPic(userInfo.photo, true);
          }
          this.userName = userInfo.name || userInfo.phone;
        }else {
          this.isLogin = false;
        }

      }
    }
</script>

<style scoped>
  /*弹出菜单*/
  .zIndex{
    /*z-index: 0!important;*/
  }
  .main_menu{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 77777;
  }
  .bg_shawed{
    width: 40%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .menu_box{
    width: 60%;
    height: 100vh;
    background-color: #fff;
  }
  .menu_top{
    padding: 35px 0 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .msg{
    display: flex;
    margin-bottom: 25px;
  }
  .msg_head{
    width: 60px;
    height: 60px;
  }
  .msg_head img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }
  .msg_det{
    margin-left: 15px;
    padding: 10px 0;
    width: 57%;
  }
  .msg_name{
    flex-grow: 1;
    text-overflow: ellipsis;
    min-width: 100px;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .greeting{
    padding-top: 5px;
    font-size: 12px;
    color: #919199;
  }
  /*按钮组*/
  .btn_group{
    clear: both;
    display: flex;
    justify-content: space-between;
  }
  .menu_top a{
    display: inline-block;
    width: 45%;
    text-decoration: none;
  }
  .menu_top a .btn_size{
    width: 100%;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .sub_btn{
    background-color: #5082e6;
    color: #ffffff;
  }
  .cancel_btn{
    /*margin-left: 15px;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E0E0E0;
    color: #666666;
  }
  .menu_list a{
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }
  .menu_list_cell{
    margin-top: 15px;
    padding: 10px 15px;
  }
  .menu_list_cell img{
    width: 10px;
    height: 14px;
    vertical-align: middle;
  }
</style>
