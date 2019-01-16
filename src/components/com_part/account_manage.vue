<template>
  <!--账号管理-->
  <div class="account_mag_all">
    <!--列表-->
    <div class="account_mag" v-show="false">
      <div class="com_det_title">
        <div class="content">
          账号管理
        </div>
      </div>
      <div class="acc_list">
        <div class="content">
          <div class="acc_cell">
            修改手机号码 <img class="fr" src="/static/images/icon_goright.png" alt="">
          </div>
          <div class="acc_cell">
            修改密码 <img class="fr" src="/static/images/icon_goright.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--修改手机-->
    <div class="account_phone" v-show="false">
      <div class="com_det_title">
        <div class="content">
          修改手机号码
        </div>
      </div>
      <div class="content">
        <div class="phone_list">
          <p >当前手机号:<span class="now_phone">18285178316</span></p>
          <p class="tips_msg">注：手机号码用于登录、接收HR来电。更换手机号码后，下次登录请使用新手机号码登录。</p>
        </div>
        <div class="bas_msg_btn">
          确定修改
        </div>
      </div>
    </div>
    <!--修改密码-->
    <div class="account_password" >
      <div class="com_det_title">
        <div class="content">
          修改密码
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          确定修改
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "account_manage"
    }
</script>

<style scoped>
  .acc_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .acc_cell{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    color: #353535;
  }
  .acc_cell img{
    padding-top: 12px;
  }
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
  /*修改密码*/
  .account_password{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
</style>
