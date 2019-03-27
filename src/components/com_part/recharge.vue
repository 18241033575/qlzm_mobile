<template>
    <!--充值-->
  <div class="recharge">
    <div class="com_det_title">
      <div class="content">
        充值
      </div>
    </div>
    <div class="tal_edit_det">
      <div class="edit_bottom">
        <div class="content">
          <div class="edit_cell" @click="charge_online">
            <span class="edit_lab">在线充值</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
          <div class="edit_cell" @click="to_transfer">
            <span class="edit_lab">对公转账</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
        </div>
      </div>
    </div>
    <div class="recharge_tip">
      <div class="content">
        <div class="tip_title">
          充值须知
        </div>
        <div class="tip_body">
          <p>1、充值获取积分的比例为1:10;</p>

          <p>2、本站提供在线充值和人工充值两种方式(在线充值实时到账,无需传真底单,建议使用);</p>

          <p>3、选择对公转账的用户,需要将汇款底单确认中上传底单扫描件,若不做汇款确认,将不能为您及时入账;</p>

          <p>4、如果您需要相关发票,请确保会员所有人名称与发票抬头一致,发票需要在支付后3个月内索取;</p>

          <p>5、邮寄纸质发票所产生的邮费从账户余额中按照积分比例扣除相应积分(如:邮费15元,则扣除150积分),单笔充值500元以上可享包邮服务;</p>
          <p class="tip_import">6、对公转账的用户在转账后请联系客服,并提供转账回执单,才能完成本次充值;</p>
          <p>7、充值过程中如有任何疑问请联系客服。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
      name: "recharge",
      data() {
        return {
          countData: {},
        }
      },
      methods: {
        to_transfer() {
          this.$router.push({name: 'transfer'})
        },
        charge_online() {
          this.$router.push({name: 'charge_online'})
        }
      },
    }
</script>

<style scoped>
  /*编辑*/
  .tal_edit_det{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
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
    width: 80px;
    color: #353535;
  }
  .int_job_det{
    color: #C2C2CC;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  /*提示*/
  .recharge_tip{
    margin-top: 10px;
    padding: 20px 0;
    background-color: #ffffff;
    color: #666666;
    font-weight: bold;
    font-size: 16px;
  }
  .tip_body{
    font-size: 12px;
    line-height: 18px;
  }
  .tip_body p{
    margin-top: 20px;
  }
  .tip_import{
    color: #ff5959;
  }
</style>
