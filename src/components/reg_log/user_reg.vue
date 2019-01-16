<template>
  <div class="user_reg">
    <h3>用户注册</h3>
    <el-input class="common_input" v-model="input" placeholder="请输入手机号码"></el-input>
    <el-input class="common_input" v-model="input" placeholder="请输入密码"></el-input>
    <el-input class="common_input" v-model="input" placeholder="重复密码"></el-input>
    <div class="sms_group">
      <el-input class="common_input_sms fl" v-model="input" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode">获取验证码</el-button>
    </div>
    <el-button class="common_btn">注册</el-button>
    <p>已有账号?&nbsp;<router-link :to="{name:'user_login'}">去登录</router-link></p>
  </div>
</template>

<script>
    export default {
        name: "reg_log",
      data() {
        return {
          input: ''
        }
      }
    }
</script>

<style>
  .user_reg{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    text-align: center;
  }
  .user_reg h3{
    padding-top: 60px;
    line-height: 30px;
  }

  .user_reg p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .user_reg p a{
    color: #ff8236;
  }
</style>
