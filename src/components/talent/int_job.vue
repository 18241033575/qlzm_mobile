<template>
  <!--求职意向-->
  <div class="int_job_all">
    <div class="int_job">
      <div class="com_det_title">
        <div class="content">
          求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">全职</span></p>
            <p><span class="left_lab">意向岗位</span> <span class="right_msg">项目经理</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">8001-10000/月</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">贵州贵阳</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">随时</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">暂无备注</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          编辑
        </div>
      </div>
    </div>
    <div class="int_job_edit" v-show="false">
      <div class="com_det_title">
        <div class="content">
          编辑求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">全职</span></p>
            <p><span class="left_lab">意向岗位</span> <span class="right_msg">项目经理</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">8001-10000/月</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">贵州贵阳</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">随时</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">暂无备注</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "int_job"
    }
</script>

<style scoped>
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 14px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 120px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
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
</style>
