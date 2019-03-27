<template>
  <!--修改手机-->
  <div class="account_phone">
    <div class="com_det_title">
      <div class="content">
        修改手机号码
      </div>
    </div>
    <div class="content">
      <div class="phone_list">
        <p >当前手机号:<span class="now_phone">{{nowPhone}}</span></p>
        <p class="tips_msg">注：手机号码用于登录、接收HR来电。更换手机号码后，下次登录请使用新手机号码登录。</p>
      </div>
    </div>
    <div class="phone_cell">
      <div class="content">
        <el-input class="common_input" v-model="param.phone" maxlength="11" minlength="11"  :validate-event="true" @keyup.native="test" placeholder="请输入新的手机号码"></el-input>
      </div>
      <div class="sms_group">
        <el-input class="common_input_sms fl" maxlength="6" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button @click="getCode" class="fl get_smsCode">{{getSmsCode}}</el-button>
      </div>
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
      name: "change_phone",
      data() {
          return {
            nowPhone: '',
            param: {
              phone: '',
              type: 4
            },
            sms_code: '',
            getSmsCode: '获取短信验证码',
            getSmsState: true
          }
      },
      created() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (userInfo) {
            this.nowPhone = userInfo.phone;
          }
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        if (companyInfo) {
          this.nowPhone = companyInfo.phone;
        }
      },
      methods: {
        getCode() {
          if (this.param.phone.length < 11) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的手机号码',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.getSmsState) {
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
              if (t < 2) {
                clearInterval(timer);
                this.getSmsCode = '再次获取';
                this.getSmsState = true;
                t = 60;
              }
              localStorage.setItem('SMSTIME',t);
            },1000);

            let userInfo = JSON.parse(localStorage.getItem('USER'));
            let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
            if (userInfo) {
              this.param.member = 1;
            }
            if (companyInfo) {
              this.param.member = 2;
            }
            this.$ajax.get('/sms',{params: this.param})
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
                }
              })
          }
        },
        change_submit() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (userInfo) {
            let uid = userInfo.id;
            this.$ajax.post('/personal/changephone',{phone: this.param.phone,sms_code: this.sms_code,uid: uid})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'success_page',query:{orig: 'phone'}})
                } else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500,
                  });
                }
              })
          }

          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            let cid = companyInfo.id;
            this.$ajax.post('/company/changephone',{phone: this.param.phone,sms_code: this.sms_code,cid: cid})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'success_page',query:{orig: 'phone'}})
                } else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500,
                  });
                }
              })
          }
        },
        test() {
          this.param.phone = this.param.phone.replace(/[^\.\d]/g,'');
          this.param.phone = this.param.phone.replace('.','');
        }
      }
    }
</script>

<style scoped>
  /*修改手机号码*/
  .phone_list{
    padding: 30px 0 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .phone_list p{
    font-size: 14px;
    color: #666666;
  }
  .phone_list .tips_msg{
    padding-top: 10px;
    font-size: 12px;
    color: #919199;
  }
  .account_phone{
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
