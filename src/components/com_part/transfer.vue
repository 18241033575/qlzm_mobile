<template>
    <!--对公转账-->
  <div class="transfer">
    <div class="com_det_title">
      <div class="content">
        对公转账信息
      </div>
    </div>
    <div class="msg_list">
      <div class="content">
        <div class="msg_cell">
          <p class="cell_top">收款单位名称</p>
          <p class="cell_cont">{{com_name}}</p>
        </div>
        <div class="msg_cell">
          <p class="cell_top">收款单位开户行</p>
          <p class="cell_cont">{{bank}}</p>
        </div>
        <div class="msg_cell">
          <p class="cell_top">收款单位账户</p>
          <p class="cell_cont">{{account}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "transfer",
      data() {
        return {
          com_name: '',
          bank: '',
          account: '',
          countData: {},
        }
      },
      created() {
         let basMsg = JSON.parse(localStorage.getItem('BASSET'));
          basMsg.forEach((item)=>{
            if (item.key == 'cfg_company') {
              this.com_name = item.value;
            }
            if (item.key == 'cfg_kaihuhang') {
              this.bank = item.value;
            }
            if (item.key == 'cfg_payaccount') {
              this.account = item.value;
            }
          })
      }
    }
</script>

<style scoped>
  .transfer{
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
  }
  .msg_cell{
    margin-top: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-weight: bold;
    font-size: 14px;
    color: #666666;
  }
  .cell_top{
    font-size: 12px;
    color: #999999;
    margin-bottom: 5px;
  }
</style>
