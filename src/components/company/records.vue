<template>
  <!--消费记录-->
    <div :class="{records: !emptySign}">
      <div class="com_det_title">
        <div class="content">
          消费记录
        </div>
      </div>
      <div class="record_list">
        <div class="content">
          <div class="record_cell" v-for="(item,index) in this.recordsData" :key="index">
            <div class="record_msg">
              <p class="record_money">金额:<span class="money">￥{{item.amount}}</span></p>
              <p>时间:<span>{{item.rtime}}</span></p>
            </div>
            <div class="record_btn">
              <div class="btn" v-show="item.invoice == 0" :data-id="item.id" @click="demand">
                索取发票
              </div>
              <p v-show="item.invoice == 1">已索取发票</p>
            </div>
          </div>
        </div>
      </div>
      <!--empty-->
      <div class="empty" v-show="emptySign">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {timestampToTime} from '../../../static/js/common.js'
    export default {
        name: "records",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          emptySign: false,
          recordsData: {}
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
        demand(e) {
          let id = e.target.getAttribute('data-id');
          for (let i = 0,len = this.recordsData.length;i < len;i++) {
            if (this.recordsData[i].id = id) {
              this.$router.push({name: 'demand_inv',query:{amount: this.recordsData[i].amount,rtime: this.recordsData[i].rtime}});
            }
          }
        }
      },
      created() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/company/pay-records',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                for (let i = 0,len = res.data.length;i < len;i++) {
                  res.data[i].rtime = timestampToTime(res.data[i].rtime)
                }
                this.recordsData = res.data;
                if (this.recordsData.length == 0 || this.recordsData.length == '') {
                  this.emptySign = true;
                }
              }
            })
      }
    }
</script>

<style scoped>
  .records{
    height: 100vh;
    background-color: #ffffff;
  }
  .record_list{
    padding: 5px 0 15px 0;
    background-color: #ffffff;
  }
  .record_cell{
    display: flex;
    margin-top: 10px;
    padding: 14px 10px;
    background-color: #f9f9f9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .record_msg{
    flex-grow: 1;
  }
  .record_msg p{
    font-size: 12px;
    color: #919199;
    line-height: 24px;
  }
  .record_msg .record_money{
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .record_msg .time{
    margin-left: 5px;
  }
  .record_msg .money{
    margin-left: 5px;
    color: #ff8236;
  }
  .record_btn p{
    margin-top: 16px;
    font-size: 12px;
    color: #919199;
  }
  .btn{
    width: 74px;
    line-height: 32px;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    background-color: #ff8236;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
</style>
