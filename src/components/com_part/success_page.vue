<template>
    <div class="success_page">
      <div class="com_det_title">
        <div class="content">
          提示
        </div>
      </div>
      <div class="sign_pic">
        <img src="/static/images/ic_success@2x.png" alt="">
        <p class="success_msg">{{success_msg}}</p>
        <p class="tips_msg">{{tips_msg}}</p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "success_page",
      data() {
          return {
            success_msg: '成功',
            tips_msg: '提示信息'
          }
      },
      created() {
          let orig = this.$route.query.orig;
          if (orig == 'phone') {
            this.success_msg = '手机号码修改成功！';
            this.tips_msg = '3s后返回登录页面。'
          }else if(orig == 'password') {
            this.success_msg = '密码修改成功！';
            this.tips_msg = '3s后返回登录页面。'
          }
          setTimeout(()=>{
            this.$router.push({name: 'login'});
          },3000);
      }
    }
</script>

<style scoped>
  .success_page{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
  .sign_pic{
    padding-top: 30px;
    text-align: center;
  }
  .sign_pic img{
    width: 118px;
    height: 118px;
  }
  .sign_pic .success_msg{
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .sign_pic .tips_msg{
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
  }
</style>
