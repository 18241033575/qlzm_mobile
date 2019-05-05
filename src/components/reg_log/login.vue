<template>
    <div class="user_login">
      <div class="com_det_title">
        <div class="content">
          用户登录
        </div>
      </div>
      <div class="login_type">
        <div :login-type="1" class="login fl" :class="{active : !this.active}" @click="login_type1">
          个人登录
        </div>
        <div :login-type="2" class="login fl" :class="{active : this.active}" @click="login_type2">
          企业登录
        </div>
      </div>
      <el-select v-model="value">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <div class="content">
        <el-input class="common_input" maxlength="11" @keyup.native="onlNum1" v-model="account" placeholder="请输入手机号码"></el-input>
        <el-input class="common_input" v-if="this.loginTypeSign" maxlength="16" v-model="password" type="password" placeholder="请输入密码"></el-input>
      </div>
      <div class="sms_group" v-if="!this.loginTypeSign">
        <el-input class="common_input_sms fl" maxlength="6" @keyup.native="onlNum2" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button @click="getCode" class="fl get_smsCode">{{getSmsCode}}</el-button>
      </div>
      <el-button class="common_btn" @click="comLogin">登录</el-button>
      <p>没有账号?&nbsp;<router-link :to="{name:'reg_type_choose'}">立即注册</router-link></p>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%">
        <span>{{showMsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "login",
      data() {
        return {
          account: '',
          password: '',
          active: false,
          sms_code: '',
          dialogVisible: false,
          reqSuc: false,
          showMsg: '',
          getSmsCode: '获取短信验证码',
          getSmsState: true,
          loginTypeSign: true,
          value: '普通登录',
          options: [{
            value: '1',
            label: '普通登录',
          }, {
            value: '2',
            label: '短信登录',
          }],
        }
      },
      methods: {
        login_type1() {
          this.active = false;
          this.account = '';
          this.getSmsCode = '获取短信验证码';
          this.getSmsState = true;
        },
        login_type2() {
          this.active = true;
          this.account = '';
          this.getSmsCode = '获取短信验证码';
          this.getSmsState = true;
        },
        comLogin() {
          if (this.account.length < 11) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的手机号码',
              showClose: false,
              duration: 1500
            });
            return
          }
          // active == false 用户登录
          if (!this.active) {
            // value 1验证码登录 2密码登录
            if (this.value == 2) {
              if (this.sms_code.length < 4) {
                this.$notify.warning({
                  title: '提示',
                  message: '请输入正确的验证码',
                  showClose: false,
                  duration: 1500
                });
                return
              }
              this.$ajax.post('/sms/login',{"phone": this.account,"type": 1,"member":1,"sms_code": this.sms_code})
                .then((res)=>{
                  if (res.data.state == 400) {
                    this.reqSuc = false;
                    this.dialogVisible = true;
                    this.showMsg = res.data.msg;
                  }else {
                    //  放入本地数据
                    this.reqSuc = true;
                    this.dialogVisible = true;
                    this.showMsg = '登录成功';
                    localStorage.removeItem('COMPANY');
                    localStorage.setItem('USER',JSON.stringify(res.data));
                    this.getSmsState = true;
                  }
                })
            }else {
              if (this.password.length < 6) {
                this.$notify.warning({
                  title: '提示',
                  message: '请输入正确的密码',
                  showClose: false,
                  duration: 1500
                });
                return
              }
              this.$ajax.post('/member/login',{"phone": this.account,"account": this.account,"password": this.password,"type": 1})
                .then((res)=>{
                  if (res.data.state == 400) {
                    this.reqSuc = false;
                    this.dialogVisible = true;
                    this.showMsg = res.data.msg;
                  }else {
                    this.reqSuc = true;
                    this.dialogVisible = true;
                    this.showMsg = '登录成功';
                    localStorage.removeItem('COMPANY');
                    //  放入本地数据
                    localStorage.setItem('USER',JSON.stringify(res.data));
                  }
                })
            }
          }else {
            // 企业登录
            if (this.value == 2) {
              if (this.sms_code.length < 4) {
                this.$notify.warning({
                  title: '提示',
                  message: '请输入正确的验证码',
                  showClose: false,
                  duration: 1500
                });
                return
              }
              this.$ajax.post('/sms/login',{"phone": this.account,"type": 2,"member":2,"sms_code": this.sms_code})
                .then((res)=>{
                  if (res.data.state == 400) {
                    this.reqSuc = false;
                    this.dialogVisible = true;
                    this.showMsg = res.data.msg;
                  }else {
                    //  放入本地数据
                    this.reqSuc = true;
                    this.dialogVisible = true;
                    this.showMsg = '登录成功';
                    localStorage.removeItem('USER');
                    localStorage.setItem('COMPANY',JSON.stringify(res.data));
                    this.getSmsState = true;
                  }
                })
            }else {
              if (this.password.length < 6) {
                this.$notify.warning({
                  title: '提示',
                  message: '请输入正确的密码',
                  showClose: false,
                  duration: 1500
                });
                return
              }
              this.$ajax.post('/member/login',{"phone": this.account,"account": this.account,"password": this.password,"type": 2,member: 2})
                .then((res)=>{
                  if (res.data.state == 400) {
                    this.reqSuc = false;
                    this.dialogVisible = true;
                    this.showMsg = res.data.msg;
                  }else {
                    this.reqSuc = true;
                    this.dialogVisible = true;
                    this.showMsg = '登录成功';
                    localStorage.removeItem('USER');
                    //  放入本地数据
                    localStorage.setItem('COMPANY',JSON.stringify(res.data));
                  }
                })
            }
          }

        },
        handleClose() {
          this.dialogVisible = false;
          if (this.reqSuc == true){
            this.$router.push({name: 'index'});
          }
        },
        getCode() {
          if (this.getSmsState) {
            this.getSmsState = false;
            if(!this.active) {
              this.$ajax.get('/sms',{params: {type:1,member:1,phone:this.account}})
                .then((res)=>{
                  if (res.data.state == 200) {
                    t = 60;
                    localStorage.setItem('SMSTIME',t);
                    this.$notify.success({
                      title: '提示',
                      message: res.data.msg,
                      showClose: false,
                      duration: 1500,
                    });
                    // 验证倒计时
                    this.getSmsState = false;
                    let t = 60;
                    let smsTime = localStorage.getItem('SMSTIME');
                    if (smsTime != '' && smsTime != 0 && smsTime != undefined) {
                      t = smsTime;
                    }
                    this.getSmsCode = t + 's后再次获取';
                    let timer = setInterval(()=>{
                      t--;
                      this.getSmsCode = t + 's后再次获取';
                      if (t < 1) {
                        clearInterval(timer);
                        this.getSmsCode = '再次获取';
                        this.getSmsState = true;
                        t = 60;
                      }
                      localStorage.setItem('SMSTIME',t);
                    },1000);
                  }else {
                    if (false){
                   /*   this.$notify.error({
                        title: '提示',
                        message: '还剩' + res.data.msg + '秒可以再次发送',
                        showClose: false,
                        duration: 1500,
                      });*/
                    }else {
                      this.$notify.error({
                        title: '提示',
                        message: res.data.msg,
                        showClose: false,
                        duration: 1500,
                      });
                    }
                  }
                })
            }else {
              this.$ajax.get('/sms',{params: {type:1,member:2,phone:this.account}})
                .then((res)=>{
                  if (res.data.state == 200) {
                    t = 60;
                    localStorage.setItem('SMSTIME',t);
                    this.$notify.success({
                      title: '提示',
                      message: res.data.msg,
                      showClose: false,
                      duration: 1500,
                    });
                    // 验证倒计时
                    this.getSmsState = false;
                    let t = 60;
                    let smsTime = localStorage.getItem('SMSTIME');
                    if (smsTime != '' && smsTime != 0 && smsTime != undefined) {
                      t = smsTime;
                    }
                    this.getSmsCode = t + 's后再次获取';
                    let timer = setInterval(()=>{
                      t--;
                      this.getSmsCode = t + 's后再次获取';
                      if (t < 1) {
                        clearInterval(timer);
                        this.getSmsCode = '再次获取';
                        this.getSmsState = true;
                        t = 60;
                      }
                      localStorage.setItem('SMSTIME',t);
                    },1000);
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
          }
        },
        onlNum1() {
          this.account = this.account.replace(/[^\.\d]/g,'');
          this.account = this.account.replace('.','');
        },
        onlNum2() {
          this.sms_code = this.sms_code.replace(/[^\.\d]/g,'');
          this.sms_code = this.sms_code.replace('.','');
        }
      },
      updated() {
        this.loginTypeSign = this.value == 2?false:true;
      }
    }
</script>

<style scoped>
  .user_login{
    width: 100%;
    height: 100vh;
    text-align: center;
    background-color: #ffffff;
  }
  .login_type{
    margin: 10px auto 0;
    width: 92%;
    line-height: 36px;
  }
  .login_type .login{
    margin-bottom: 20px;
    width: 50%;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .user_login p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .user_login p a{
    color: #ff8236;
    text-decoration: none;
  }
  .login_type .active{
    border-bottom: 1px solid #FFBF00;
  }
  .user_login .el-select{
    width: 92%;
  }
</style>
