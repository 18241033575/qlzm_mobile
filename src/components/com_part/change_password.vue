<template>
  <!--修改密码-->
  <div class="account_password">
    <div class="content">
      <div class="com_det_title">
          修改密码
      </div>
      <div class="phone_cell">
        <el-input class="common_input" maxlength="16" minlength="6" v-model="param.old_password" placeholder="请输入旧密码"></el-input>
        <el-input class="common_input" maxlength="16" minlength="6"  v-model="param.password" type="password" placeholder="设置新密码"></el-input>
        <el-input class="common_input" maxlength="16" minlength="6"  v-model="param.password_confirm" type="password" placeholder="重复新密码"></el-input>
      </div>
      <div class="bas_msg_btn" @click="change_submit">
        确定修改
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "change_password",
      data() {
          return {
            param:　{
              old_password: '',
              password: '',
              password_confirm: ''
            }
          }
      },
      methods: {
        change_submit() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (companyInfo) {
            this.param.cid = companyInfo.id;
            this.$ajax.post('/company/changepasswd',this.param)
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$notify.success({
                    title: '提示',
                    message: '保存成功',
                    showClose: false,
                    duration: 800
                  });
                  setTimeout(()=>{
                    this.$router.push({name: 'success_page',query: {orig: 'password'}})
                  },1000)
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
          if (userInfo) {
            this.param.uid = userInfo.id;
            this.$ajax.post('/personal/changepasswd',this.param)
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'success_page',query: {orig: 'password'}})
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
        },
       }
    }
</script>

<style scoped>
  /*修改密码*/
  .account_password{
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
