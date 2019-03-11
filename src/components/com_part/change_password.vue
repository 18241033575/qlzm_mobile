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
      <el-input class="common_input" maxlength="16" minlength="6" v-model="param.old_password" placeholder="请输入旧密码"></el-input>
      <el-input class="common_input" maxlength="16" minlength="6"  v-model="param.password" type="password" placeholder="设置新密码"></el-input>
      <el-input class="common_input" maxlength="16" minlength="6"  v-model="param.password_confirm" type="password" placeholder="重复新密码"></el-input>
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
            param:　{
              old_password: '',
              password: '',
              password_confirm: ''
            }
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
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (companyInfo) {
            this.param.cid = companyInfo.id;
            this.$ajax.post('/company/changepasswd',this.param)
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'success_page',query: {orig: 'password'}})
                }else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500,
                  });
                }
              })
          }
          if (userInfo) {
            this.param.uid = userInfo.id;
            this.$ajax.post('/personal/changepasswd',this.param)
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'success_page',query: {orig: 'password'}})
                }else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500,
                  });
                }
              })
          }
          // this.$router.push({name: 'success_page',query:{orig: 'password'}})
          /*this.$ajax.post('/perosnal/changepasswd',{old_password: this.old_password,password: this.password,config_password: this.config_password})
            .then((res)=>{

            })*/
        },
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
