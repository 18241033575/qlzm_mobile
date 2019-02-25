<template>
  <div class="invoice_all">
    <!--增值税发票-->
    <div class="tax_invoice" v-show="false">
      <div class="com_det_title">
        <div class="content">
          增值税发票
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">单位名称</span><input type="text"  placeholder="单位名称(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">纳税人识别号</span><input type="text"  placeholder="纳税人识别号(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">企业注册地址</span><input type="text"  placeholder="企业注册地址(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">企业注册电话</span><input type="text"  placeholder="企业注册电话(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">开户银行</span><input type="text"  placeholder="开户银行(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">银行账户</span><input type="text"  placeholder="银行账户(必填)">
          </div>
        </div>
      </div>
    </div>
    <!--普通发票-->
    <div class="total_inv" v-show="false">
      <div class="com_det_title">
        <div class="content">
          普通发票
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">发票抬头</span><input type="text"  placeholder="发票抬头(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">纳税人识别号</span><input type="text"  placeholder="纳税人识别号(必填)">
          </div>
        </div>
      </div>
    </div>
    <!--收件信息-->
    <div class="in_inv">
      <div class="com_det_title">
        <div class="content">
          收件信息
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">收件人姓名</span><input type="text"  placeholder="收件人姓名(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">收件人手机</span><input type="text"  placeholder="收件人手机(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">E-mail</span><input type="text"  placeholder="用于接收电子发票(必填)">
          </div>
          <div class="edit_cell special_cell ">
            <span class="edit_lab">收件地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_province"><span class="place_msg">{{userMsg.province || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city"><span class="place_msg">{{userMsg.city || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area"><span class="place_msg">{{userMsg.area || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div></div>
            <input type="text" maxlength="20"  placeholder="详细地址，如：街道、门牌号等">
          </div>
        </div>
      </div>
    </div>
    <div class="enterp_button">
      保存
    </div>
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transWorkexp,transEducation,transSalary,transJobs} from '../../../static/js/common.js'
    export default {
        name: "tax_invoice",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          userMsg: {},
          secondBox: false,
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
        choose_province() {
          /* this.guiyangData = tranProvince(this.beginData,true,'pro');
           this.showMsg = 'pro';
           this.secondBox = true;*/
        },
        choose_city() {
          /* this.guiyangData = tranCity(this.cityCode,true,2,'city');
           this.showMsg = 'city';
           this.secondBox = true;*/
        },
        choose_area() {
          /*this.guiyangData = tranArea(this.cityCode,true,5);
          this.showMsg = 'area';
          this.secondBox = true;*/
        },
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
  .edit_cell .place_msg{
    display: inline-block;
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .comm_addr{
    display: flex;
    width: 100%;
    padding-bottom: 15px;
  }
  .comm_addr .comm_addr_cell{
    justify-content: space-between;
    margin-right: 10px;
    width: 30%;
    overflow: hidden;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
  .comm_addr img{
    width: 12px;
    height: 10px;
    vertical-align: middle;
  }
  .special_cell input{
    margin-bottom: 20px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
  }
</style>
