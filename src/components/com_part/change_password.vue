<template>
  <!--修改密码-->
  <div class="account_password" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <div class="com_det_title">
      <div class="content">
        修改密码
      </div>
    </div>
    <div class="phone_cell">
      <el-input class="common_input" v-model="acount" placeholder="请输入旧密码"></el-input>
      <el-input class="common_input" v-model="password" type="password" placeholder="设置新密码"></el-input>
      <el-input class="common_input" v-model="config_password" type="password" placeholder="重复新密码"></el-input>
    </div>
    <div class="content">
      <div class="bas_msg_btn" @click="change_submit">
        确定修改
      </div>
    </div>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "change_password",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            acount: '',
            password: '',
            config_password: ''
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
        change_submit() {
          this.$router.push({name: 'success_page',query:{orig: 'password'}})
        }
      }
    }
</script>

<style scoped>
  /*修改密码*/
  .account_password{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
  .bas_msg_btn{
    margin-top: 15px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #ffffff;
    background-color: #5082e6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .phone_cell{
    text-align: center;
  }
</style>
