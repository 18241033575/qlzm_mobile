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
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "transfer",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          com_name: '',
          bank: '',
          account: '',
          countData: {

          },
        }
      },
      methods: {
        /*总菜单操作s*/
        get_sign(data) {
          this.openState = !data;
        },
        getIsopen(data) {
          this.openState = data;
        },
        /*总菜单操作e*/
      },
      created() {
         let basMsg = JSON.parse(localStorage.getItem('BASSET'));
          basMsg.forEach((item)=>{
            if (item.id == 30) {
              this.com_name = item.value;
            }
            if (item.id == 33) {
              this.bank = item.value;
            }
            if (item.id == 36) {
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
