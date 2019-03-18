<template>
    <!--在线充值-->
  <div class="charge_online">
    <div class="com_det_title">
      <div class="content">
        在线充值
      </div>
    </div>
    <div class="tal_edit_det">
      <div class="edit_bottom">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">充值金额</span><span class="int_job_det fr" ><input type="number" v-model="money" maxlength="10" placeholder="请输入金额">.00</span>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">支付方式</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
          <div class="charge_num">
            <div class="pay_num">支付金额￥<span v-show="!vipScale" class="pay_number">{{money || '0.00'}}</span><span v-show="vipScale" class="pay_number">{{(money * vipDiscount /10) || '0.00'}}</span>元</div>
            <p>您是<span>{{vipLevel}}</span>，<span v-show="vipScale">充值享<span>{{vipDiscount}}</span>折优惠！</span><span v-show="!vipScale">暂时不享受优惠！</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="bas_msg_btn">
        去付款
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
        name: "charge_online",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          charge_num: '',
          money: '',
          level: 1,
          vipScale: false,
          vipLevel: '',
          vipDiscount: '',
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
       this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
         .then((res)=>{
           if (res.data.state != 400) {
             this.level = res.data.level;
             if (this.level > 1) {
               let vip = JSON.parse(localStorage.getItem('VIP'));
               this.vipScale = true;
               this.vipLevel = vip[this.level - 2].name;
               this.vipDiscount = vip[this.level - 2].sale;
             } else {
               this.vipLevel = '普通会员';
               this.vipScale = false;
             }
           }
         });

      }
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
    color: #666666;
    font-weight: bold;
  }
  .int_job_det{
    /*color: #C2C2CC;*/
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .edit_cell input{
    display: inline-block;
    padding-right: 10px;
    text-align: right;
    width: 85px;
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
  .charge_num{
    padding: 17px 0;
    text-align: right;
    font-size: 12px;
  }
  .charge_num p{
    margin-top: 5px;
    color: #ff8236;
  }
  .pay_number{
    font-size: 18px;
    color: #ff8236;
    font-weight: bold;
  }
</style>
