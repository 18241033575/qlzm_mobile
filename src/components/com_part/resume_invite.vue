<template>
  <!--面试邀请-->
    <div class="resume_invite">
      <div class="com_det_title">
        <div class="content">
          邀请面试
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">联系人</span><input type="text" v-model="contractData.username"  placeholder="如: 张经理、王先生等(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">手机</span><input type="text" v-model="contractData.phone" placeholder="手机号码(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">座机</span><input type="text" v-model="contractData.tel" placeholder="座机号码">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">QQ</span><input type="text" v-model="contractData.qq" placeholder="QQ">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">邮箱地址</span><input type="text" v-model="contractData.email"  placeholder="邮箱地址">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">面试地点</span><input type="text" v-model="contractData.address"  placeholder="必填">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">面试时间</span>
            <el-date-picker
              v-model="inviteTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">邀请方式</span><input type="text" v-model="contractData.address"  placeholder="必填">
          </div>
        </div>
      </div>
      <div class="tip">
        <div class="content">
          <div class="eval_body_bottom">
            <textarea  name="evaluation" placeholder="在这里填写用于提醒应聘者的相关事项"></textarea>
          </div>
        </div>
      </div>
      <div class="content">

        <div class="bas_msg_btn" >
          发送邀请
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "resume_invite",
      data() {
          return {
            inviteTime: '',
            contractData: {

            },
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              }
            },
          }
      }
    }
</script>

<style scoped>
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #353535;
  }
  .edit_cell input{
    display: inline-block;
    padding-left: 10px;
    width: 65%;
    line-height: 32px;
    border: none;
    color: #666666;
  }
  .edit_cell input ::placeholder{
    color: #c2c2cc;
  }
  .edit_cell input:focus{
    outline: none;
  }
  .enterp_button{
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 44px;
    text-align: center;
    color: #ffffff;
    background-color: #5082e6;
    font-size: 14px;
  }
  .tip{
    margin-top: 30px;
    background-color: #ffffff;
  }
  .eval_body_bottom{
    text-align: center;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    text-align: left;
    color: #666666;
    line-height: 18px;
  }
  .eval_body_bottom textarea{
    width: 90%;
    min-height: 130px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
    border: none;
  }
  .eval_body_bottom textarea:focus{
    outline:none;
    border: none;
  }
  .eval_body_bottom textarea::placeholder{
    font-size: 14px;
    color: #c2c2cc;
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
