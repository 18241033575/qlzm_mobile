<template>
  <!--面试邀请记录-->
    <div class="invited">
      <div class="com_det_title">
        <div class="content">
          面试邀请
        </div>
      </div>
      <div class="invited_body">
        <div class="content">
          <div class="invited_cell">
            <span class="new_sign"></span>您收到一份来自“贵州长右岸建设工程有限公司”的面试邀请
          </div>
          <div class="invited_cell">
            <span class="new_sign"></span>   您收到一份来自“中国铁建”的面试邀请
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tal_invited"
    }
</script>

<style scoped>
  .invited_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .invited_cell{
    padding: 15px 0;
    font-size: 14px;
    color: #666666;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .new_sign{
    display: inline-block;
    margin: 0 2px 0 4px;
    line-height: 14px;
    vertical-align: middle;
    width: 5px;
    height: 5px;
    background-color: #ff5959;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
</style>
