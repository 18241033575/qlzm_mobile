<template>
    <!--会员服务-->
  <div class="mem_server">
    <div class="com_det_title">
      <div class="content">
        会员服务
      </div>
    </div>
    <div class="com_mem">
      <div class="com_logo">
        <img :src="this.companyData.tranLogo" alt="">
        <div class="vip_sign" v-show="false">
          <img src="/static/images/diamond-blue-small.png" alt="">
        </div>
      </div>
      <p class="com_name">{{companyData.name}}</p>
      <p v-if="(companyData.level < 1)" class="iden_msg">您当前还未认证！<span class="go_iden">[去认证]</span></p>
      <p v-if="(companyData.level > 0)" class="consumption">累计消费<span class="consumption_total">￥{{sonsumptRecord}}</span>元</p>
    </div>
    <div class="mem_opera">
      <div class="content">
        <div class="mem_opera_list">
          <router-link :to="{name: 'my_integral'}" class="mem_opera_cell">
            <img src="/static/images/ic_cm_integral@2x.png" alt="">
            <p>我的积分</p>
          </router-link>
          <router-link :to="{name: 'index'}" class="mem_opera_cell">
            <img src="/static/images/ic_cm_record@2x.png" alt="">
            <p>消费记录</p>
          </router-link>
          <router-link :to="{name: 'invoice_msg'}" class="mem_opera_cell">
            <img src="/static/images/ic_cm_invoice@2x.png" alt="">
            <p>发票信息设置</p>
          </router-link>
        </div>
      </div>
    </div>
    <!--会员等级说明-->
    <div class="data_count">
      <div class="content">
        <p class="count_title">会员等级说明</p>
        <div class="data_cell">
            <p class="data_cell_label">普通会员</p>
            <p class="">完成企业认证，无优惠！</p>
        </div>
        <div class="data_cell" v-for="(item,index) in this.memData">
          <p class="data_cell_label">{{item.name}}</p>
          <p class="">累计充值达{{item.condition}}元，充值享<span class="discount">{{item.sale}}折</span>优惠</p>
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
  import {splicLogo} from '../../../static/js/common.js'
    export default {
        name: "mem_server",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          memData: {

          },
          companyData: {

          },
          sonsumptRecord: 0
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
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        splicLogo(companyInfo,1);
        this.$ajax.get('/company/base',{params:{cid: companyInfo.id}})
          .then((res)=>{
            if (res.state != 400) {
              this.companyData = res.data;
              this.companyData.tranLogo = splicLogo(this.companyData.info.logo,2)
            }
          });
        this.$ajax.get('/vip/levels')
          .then((res)=>{
            if (res.data.state != 400) {
              this.memData = res.data;
              let param = JSON.stringify(res.data);
              localStorage.setItem('VIP',param);
            }
          });
        this.$ajax.get('/company/recharge/lump-sum',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.sonsumptRecord = res.data;
            }
          })
      }
    }
</script>

<style scoped>
  .com_mem{
    padding-top: 15px;
    text-align: center;
    background-color: #ffffff;
  }
  .com_logo{
    position: relative;
    margin: 0 auto;
    width: 68px;
    height: 68px;
    /*overflow: hidden;*/


  }
  .com_logo img{
    width: 68px;
    height: 68px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 300px;
    -moz-border-radius: 300px;
    border-radius: 300px;
  }
  .vip_sign{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 27px;
    height: 27px;
    background-color: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
    border-radius: 200px;
  }
  .vip_sign img{
    margin-top: 4px;
    width: 20px;
    height: 20px;
    text-align: center;
    border: none;
  }

  .com_name{
    margin-top: 15px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
  }
  .consumption, .iden_msg{
    padding: 12px 0;
    font-size: 12px;
    color: #919199;
  }
  .go_iden{
    margin-left: 5px;
    color: #5082e6;
  }
  .consumption_total{
    color: #ff8236;
  }
  .mem_opera{
    margin-top: 10px;
    background-color: #ffffff;
    height: 110px;
  }
  .mem_opera_list{
    display: flex;
    justify-content: space-between;
  }
  .mem_opera_cell{
    display: inline-block;
    padding-top: 25px;
    width: 33%;
    text-align: center;
    text-decoration: none;
  }
  .mem_opera_cell img{
    width: 42px;
    height: 42px;
  }
  .mem_opera_cell p{
    padding-top: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #666666;
  }
  /*会员等级说明*/
  .data_count{
    margin-top: 10px;
    background-color: #ffffff;
    padding: 15px 0;
  }
  .count_title{
    font-size: 14px;
    color: #919199;
    font-weight: bold;
  }
  .data_cell{
    margin-top: 10px;
    padding: 15px 10px;
    background-color: #f9f9f9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    font-size: 14px;
    color: #919199;
  }
  .data_cell p{

  }
  .data_cell_label{
    color: #666666;
    font-weight: bold;
  }
  .data_cell_label span{
    display: inline-block;
    width: 100%;
  }
  .discount{
    color: #ff8236;
  }
</style>
