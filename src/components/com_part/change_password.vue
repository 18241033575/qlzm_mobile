<template>
  <!--修改密码-->
  <div class="account_password">
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
  </div>
</template>

<script>
    export default {
        name: "change_password",
      data() {
          return {
            acount: '',
            password: '',
            config_password: ''
          }
      },
      methods: {
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
