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
      <el-input class="common_input" v-model="acount" placeholder="请输入新的手机号码"></el-input>
      <div class="sms_group">
        <el-input class="common_input_sms fl" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button @click="getCode" class="fl get_smsCode">{{getSmsCode}}</el-button>
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
            acount: '',
            sms_code: '',
            getSmsCode: '获取短信验证码',
          }
      },
      created() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.nowPhone = userInfo.phone;
      },
      methods: {
        getCode() {
          if (this.getSmsState) {
            this.getSmsState = false;
            this.$ajax.get('/sms',{params: {type:1,member:1,phone:this.acount}})
              .then((res)=>{
                console.log(res);
              })
          }
        },
        change_submit() {
          this.$router.push({name: 'success_page',query:{orig: 'phone'}})
          /*this.$ajax.post('/perosnal/changephone',{phone: this.acount,sms_code: this.sms_code})
            .then((res)=>{
              this.$router.push({name: 'success_page'})
            })*/
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
