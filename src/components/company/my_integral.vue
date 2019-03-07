<template>
  <!--我的积分-->
    <div class="my_integral">
      <div class="com_det_title">
        <div class="content">
          我的积分
        </div>
      </div>
      <div class="integ_balance">
        <div class="content">
          <div class="balance">
            <div class="balance_title">
              积分余额
            </div>
            <span class="balance_num">{{integral}}</span><span class="go_charge fr">去充值>></span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="get_integ">
          <div class="get_integ_title">
            做任务,攒积分
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_sign_day@2x.png" alt="">
            <div class="get_obj">
              <p>每日签到</p>
              <p class="add_integ">+5积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去签到
            </div>
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_perfect_info@2x.png" alt="">
            <div class="get_obj">
              <p>完善企业信息</p>
              <p class="add_integ">+5积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去完成
            </div>
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_release_officer@2x.png" alt="">
            <div class="get_obj">
              <p>首次发布职位信息</p>
              <p class="add_integ">+5积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去完成
            </div>
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_send_interview@2x.png" alt="">
            <div class="get_obj">
              <p>首次发送面试邀请</p>
              <p class="add_integ">+5积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去完成
            </div>
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_charge_wubai@2x.png" alt="">
            <div class="get_obj">
              <p>一次性充值达500元</p>
              <p class="add_integ">+5积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去完成
            </div>
          </div>
          <div class="get_integ_cell">
            <img src="/static/images/ic_charge_wuqian@2x.png" alt="">
            <div class="get_obj">
              <p>累计充值达5000元</p>
              <p class="add_integ">+100积分<img src="/static/images/ic_cm_inte@2x.png" alt=""></p>
            </div>
            <div class="do_obj">
              去完成
            </div>
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
        name: "my_integral",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          uploadSign: false,
          integral: 0
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
        this.$ajax.get('/company/current-integral',{params:{cid: companyInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.integral = res.data;
            }
          })
      }
    }
</script>

<style scoped>
  .my_integral{
    background-color: #ffffff;
  }
  .integ_balance{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .balance_title{
    padding: 12px 0;
    font-size: 12px;
    color: #919199;
  }
  .balance_num{
    font-size: 24px;
    color: #ff8236;
  }
  .balance{
    padding: 10px 0 25px 0;
  }
  .get_integ{
    padding: 15px 0;
  }
  .get_integ_title{
    font-size: 14px;
    color: #919199;
    line-height: 24px;
    font-weight: bold;
  }
  .go_charge{
    font-size: 14px;
    color: #5082e6;
  }
  .get_integ_cell{
    display: flex;
    justify-content: start;
    margin-top: 10px;
    width: 100%;
    height: 34px;
    background:rgba(80,130,230,.1);
    padding: 13px 0;
  }
  .get_integ_cell img{
    margin-left: 9px;
    width: 34px;
    height: 34px;
  }
  .get_obj{
    flex-grow: 1;
    margin-left: 12px;
  }
  .get_obj p{
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .get_obj .add_integ{
    font-size: 12px;
    color: #ff8236;
    font-weight: normal;
  }
  .add_integ img{
    margin-left: 0;
    margin-top: 3px;
    width: 12px;
    height: 12px;
    vertical-align: top;
  }
  .do_obj{
    margin-right: 9px;
    margin-top: 5px;
    width: 60px;
    color: #5082e6;
    line-height: 24px;
    height: 24px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #5082E6;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    font-size: 12px;
  }
</style>
