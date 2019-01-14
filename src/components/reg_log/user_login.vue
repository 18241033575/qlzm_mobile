<template>
    <div class="user_login">
      <h3>登录骑驴找马</h3>
      <div class="login_type">
        <div login-type="1" class="login fl" :class="{active : !this.active}" @click="login_type1">
          短信登录
        </div>
        <div login-type="2" class="login fl" :class="{active : this.active}" @click="login_type2">
          普通登录
        </div>
      </div>

      <el-input class="common_input" v-model="acount" placeholder="请输入手机号码"></el-input>
      <el-input class="common_input" v-if="this.active" v-model="password" type="password" placeholder="请输入密码"></el-input>
      <div class="sms_group" v-if="!this.active">
        <el-input class="common_input_sms fl" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode">获取验证码</el-button>
      </div>
      <el-button class="common_btn" @click="user_login">登录</el-button>
      <p>没有账号?&nbsp;<router-link :to="{name:'user_reg'}">去注册</router-link></p>
    </div>
</template>

<script>
    export default {
        name: "user_login",
      data() {
        return {
          acount: '',
          password: '',
          active: true,
          sms_code: ''
        }
      },
      methods: {
        login_type1() {
          this.active = false;
        },
        login_type2() {
          this.active = true;
        },
        user_login() {
          this.$ajax.post('/member/login',{acount: this.acount,password: this.password,type:1})
            .then((res)=>{
              console.log(res);
            })
        }
      }
    }
</script>

<style scoped>
  .user_login{
    padding-top: 60px;
    text-align: center;
    background-color: #ffffff;
  }
  .login_type{
    margin: 40px auto 0;
    width: 92%;
    line-height: 36px;
  }
  .login_type .login{
    margin-bottom: 20px;
    width: 50%;
    text-align: center;
  }
  .user_login p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .user_login p a{
    color: #ff8236;
  }
  .active{
    border-bottom: 1px solid #FFBF00;
  }
</style>
