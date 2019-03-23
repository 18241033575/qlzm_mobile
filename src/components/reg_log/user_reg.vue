<template>
  <div class="user_reg">
    <div class="com_det_title">
      <div class="content">
        人才注册
      </div>
    </div>
    <div class="content">
      <el-input class="common_input" v-model="phone" @keyup.native="onlNum1" maxlength="11" placeholder="请输入手机号码"></el-input>
      <el-input class="common_input" type="password" maxlength="16" v-model="password" placeholder="请输入密码"></el-input>
      <el-input class="common_input" type="password" maxlength="16" v-model="password_confirm" placeholder="重复密码"></el-input>
    </div>
    <div class="sms_group">
      <el-input class="common_input_sms fl" @keyup.native="onlNum2" maxlength="6" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode" @click="getSmsCode">获取验证码</el-button>
    </div>
    <el-button class="common_btn" @click="tal_reg">注册</el-button>
    <p>已有账号?&nbsp;<router-link :to="{name:'login'}">立即登录</router-link></p>
  </div>
</template>

<script>
    export default {
        name: "reg_log",
      data() {
        return {
          showMsg: '',
          phone: '',
          password: '',
          password_confirm: '',
          sms_code: '',
        }
      },
      methods: {
        tal_reg() {
          if (this.phone.length < 11) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的手机号码',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.password.length < 6) {
            this.$notify.warning({
              title: '提示',
              message: '密码长度最少为6位',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.password != this.password_confirm) {
            this.$notify.warning({
              title: '提示',
              message: '两次密码不一致',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$ajax.post('/member/register',{phone: this.phone,password: this.password,password_confirm: this.password_confirm,sms_code: parseInt(this.sms_code),type: 1,member: 1})
            .then((res)=>{
              if (res.data.state != 400) {
                this.$notify.success({
                  title: '提示',
                  message: '注册成功',
                  showClose: false,
                  duration: 800
                });
                localStorage.setItem('USER',JSON.stringify(res.data));
                setTimeout(()=>{
                  this.$router.push({name: 'index'});
                },1000);
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        },
        getSmsCode() {
          if (this.password != this.password_confirm) {
            this.$notify.warning({
              title: '提示',
              message: '两次密码不一致',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$ajax.get('/sms',{params: {type : 2,phone: this.phone,member: 1}})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '获取验证码成功',
                  showClose: false,
                  duration: 1500
                });
              }else {
                this.$notify.warning({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        },
        onlNum1() {
          this.phone = this.phone.replace(/[^\.\d]/g,'');
          this.phone = this.phone.replace('.','');
        },
        onlNum2() {
          this.sms_code = this.sms_code.replace(/[^\.\d]/g,'');
          this.sms_code = this.sms_code.replace('.','');
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
    text-decoration: none;
  }
</style>
