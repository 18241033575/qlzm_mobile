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
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "resume_invite",
      data() {
          return {
            contractData: {

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
</style>
