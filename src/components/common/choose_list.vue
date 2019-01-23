<template>
  <!--选择列表-->
  <div class="choose_list" v-if="this.give_shade&&this.isOpen">
    <!--弹出菜单-->
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
            <div class="menu_list_cell">
              {{item.urlName}}<img class="fr" src="/static/images/icon_goright.png" alt="">
            </div>
          </router-link>
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

</style>
