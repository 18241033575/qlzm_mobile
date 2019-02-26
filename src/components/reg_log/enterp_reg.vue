<template>
  <!--建筑企业注册-->
    <div class="enterp_reg">
      <div class="com_det_title">
        <div class="content">
          建筑企业注册
        </div>
      </div>
      <el-input class="common_input" v-model="input" placeholder="企业名称"></el-input>
      <el-input class="common_input" v-model="input" placeholder="手机号码"></el-input>
      <el-input class="common_input" v-model="input" placeholder="设置密码"></el-input>
      <el-input class="common_input" v-model="input" placeholder="重复密码"></el-input>
      <div class="sms_group">
        <el-input class="common_input_sms fl" v-model="input" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode">获取验证码</el-button>
      </div>
      <el-button class="common_btn">注册</el-button>
      <p>已有账号?&nbsp;<router-link :to="{name:'login'}">立即登录</router-link></p>
    </div>
</template>

<script>
    export default {
        name: "enterp_reg"
    }
</script>

<style scoped>
  .enterp_reg{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    text-align: center;
  }
  .enterp_reg p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .enterp_reg p a{
    color: #ff8236;
    text-decoration: none;
  }
</style>
