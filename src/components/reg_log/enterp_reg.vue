<template>
  <!--建筑企业注册-->
    <div class="enterp_reg">
      <div class="com_det_title">
        <div class="content">
          建筑企业注册
        </div>
      </div>
      <div class="content">
        <el-input class="common_input" v-model="company" maxlength="20" placeholder="企业名称"></el-input>
        <el-input class="common_input" v-model="phone" @keyup.native="onlNum1" maxlength="11" placeholder="手机号码"></el-input>
        <el-input class="common_input" type="password" v-model="password" maxlength="16" placeholder="设置密码"></el-input>
        <el-input class="common_input" type="password" v-model="password_confirm" maxlength="16" placeholder="重复密码"></el-input>
      </div>
      <div class="sms_group">
        <el-input class="common_input_sms fl" maxlength="6" @keyup.native="onlNum2" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode" @click="getSmsCode">获取验证码</el-button>
      </div>
      <el-button class="common_btn" @click="ent_reg">注册</el-button>
      <p>已有账号?&nbsp;<router-link :to="{name:'login'}">立即登录</router-link></p>
    </div>
</template>

<script>
    export default {
        name: "enterp_reg",
      data() {
          return {
            dialogVisible: false,
            reqSuc: false,
            showMsg: '',
            company: '',
            phone: '',
            password: '',
            password_confirm: '',
            sms_code: ''
          }
      },
      methods: {
        ent_reg() {
          if (this.company == '') {
            this.$notify.warning({
              title: '提示',
              message: '请输入企业名称',
              showClose: false,
              duration: 1500
            });
            return
          }
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
          this.$ajax.post('/member/register',{company: this.company,phone: this.phone,password: this.password,password_confirm: this.password_confirm,sms_code: parseInt(this.sms_code),type: 2,member: 2})
            .then((res)=>{
              if (res.data.state != 400) {
                this.$notify.success({
                  title: '提示',
                  message: '注册成功',
                  showClose: false,
                  duration: 800
                });
                localStorage.setItem('COMPANY',JSON.stringify(res.data));
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
          this.$ajax.get('/sms',{params: {type : 2,phone: this.phone,member: 2}})
            .then((res)=> {
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '获取验证码成功',
                  showClose: false,
                  duration: 1500
                });
              } else {
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
