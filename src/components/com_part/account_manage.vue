<template>
  <!--账号管理-->
  <div class="account_mag_all">
    <!--列表-->
    <div class="account_mag">
      <div class="com_det_title">
        <div class="content">
          账号管理
        </div>
      </div>
      <div class="acc_list">
        <div class="content">
          <router-link :to="{name:'change_phone'}" class="acc_cell">
            修改手机号码 <img class="fr" src="/static/images/icon_goright.png" alt="">
          </router-link>
          <router-link :to="{name:'change_password'}" class="acc_cell">
            修改密码 <img class="fr" src="/static/images/icon_goright.png" alt="">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "account_manage",
      data() {
          return {

          }
      },
      methods: {

      }
    }
</script>

<style scoped>
  .acc_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .acc_cell{
    display: inline-block;
    width: 100%;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    text-decoration: none;
    color: #353535;
  }
  .acc_cell img{
    padding-top: 12px;
  }


</style>
