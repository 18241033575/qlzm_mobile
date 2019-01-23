<template>
    <div class="success_page">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <div class="com_det_title">
        <div class="content">
          提示
        </div>
      </div>
      <div class="sign_pic">
        <img src="/static/images/ic_success@2x.png" alt="">
        <p class="success_msg">{{success_msg}}</p>
        <p class="tips_msg">{{tips_msg}}</p>
      </div>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "success_page",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            success_msg: '成功',
            tips_msg: '提示信息'
          }
      },
      created() {
          let orig = this.$route.query.orig;
          if (orig == 'phone') {
            this.success_msg = '手机号码修改成功！';
            this.tips_msg = '下次登录请使用新手机号码登录。'
          }else if(orig == 'password') {
            this.success_msg = '密码修改成功！';
            this.tips_msg = '下次登录请使用新密码登录。'
          }
      },
      methods: {
        /*总菜单操作s*/
        get_sign(data) {
          this.openState = !data;
        },
        getIsopen(data) {
          this.openState = data;
        },
        /*总菜单操作e*/
      }
    }
</script>

<style scoped>
  .success_page{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
  .sign_pic{
    padding-top: 30px;
    text-align: center;
  }
  .sign_pic img{
    width: 118px;
    height: 118px;
  }
  .sign_pic .success_msg{
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .sign_pic .tips_msg{
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
  }
</style>
