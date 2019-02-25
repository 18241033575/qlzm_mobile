<template>
    <!--发票信息-->
  <div class="invoice">
    <div class="com_det_title">
      <div class="content">
        发票信息
      </div>
    </div>
    <!--分类链接-->
    <div class="menu_list">
      <div class="content">
        <router-link :to="{name: item.urlRoute}" v-for="(item,index) in menuList" :key="index">
          <div class="menu_list_cell" >
            {{item.urlName}}<img class="fr" src="/static/images/icon_goright.png" alt="">
          </div>
        </router-link>
      </div>
    </div>
    <!--发票信息提示-->
    <div class="inv_tips">
      <div class="content">
        <div class="inv_tips_title">发票索取须知</div>
        <p>1、请仔细核对发票抬头，并正确填写纳税人识别号、开户账号等信息。若因信息错误导致需要更换发票，收费50元/次。</p>
        <p>2、纸质发票需邮寄，请填写真实有效的收件地址、收信人及联系信息。因地址不详、联系不上收件人、以及丢件等原因，我司不重新开具发票。</p>
        <p>3、索取发票请前往“消费记录”页面，点击对应消费记录的“索取发票”按钮，工作人员将在收到申请后3个工作日内寄出发票。</p>
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
        name: "invoice_msg",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          menuList: {
            0: {
              urlName: "增值税发票信息设置",
              urlRoute: "tax_invoice"
            },
            1: {
              urlName: "普通发票信息设置",
              urlRoute: "tax_invoice"
            },
            2:{
              urlName: "收件信息设置",
              urlRoute: "tax_invoice"
            }
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
      }
    }
</script>

<style scoped>
  .menu_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .menu_list a{
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }
  .menu_list_cell{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .menu_list_cell img{
    padding-top: 17px;
    width: 10px;
    height: 14px;
    vertical-align: middle;
  }
  .inv_tips{
    margin-top: 10px;
    font-size: 14px;
    color: #ff8236;
    background-color: #ffffff;
  }
  .inv_tips_title{
    padding: 20px 0;
  }
  .inv_tips p{
    padding-bottom: 20px;
    line-height: 18px;
    font-size: 12px;
    text-indent: 2em;
  }
</style>
