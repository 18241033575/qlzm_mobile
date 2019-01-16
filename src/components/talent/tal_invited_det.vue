<template>
  <!--面试邀请记录详情-->
  <div class="invited_det">
    <div class="com_det_title">
      <div class="content">
        面试邀请详情
      </div>
    </div>
    <div class="invited_body">
      <div class="content">
        <div class="invite_top">
          <p>“中铁十二局集团有限公司海外公路工程项目部”的面试邀请</p>
          <p class="send_time">刚刚</p>
        </div>
        <div class="bottom_msg">
          <p><span class="left_lab">职位</span> <span class="right_msg">项目经理</span></p>
          <p><span class="left_lab">联系人</span> <span class="right_msg">王先生</span></p>
          <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
          <p><span class="left_lab">座机</span> <span class="right_msg">0851-8595321</span></p>
          <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
          <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
          <p><span class="left_lab">面试地址</span> <span class="right_msg">贵州省贵阳市南明区花果园财富广场1栋8楼</span></p>
          <p><span class="left_lab">提醒事项</span> <span class="right_msg">亲爱的应聘者您好，根据公司的要求你需要自
带一份纸质简历前来应聘哦！</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tal_invited_det"
    }
</script>

<style scoped>
  .invited_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .invite_top{
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .invite_top p{
    line-height: 18px;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
  }
  .invite_top .send_time{
    margin-top: 15px;
    font-size: 12px;
    color: #919199;
    font-weight: normal;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
  }
</style>
