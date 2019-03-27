<template>
  <!--索要发票-->
    <div class="demand_inv">
      <div class="com_det_title">
        <div class="content">
          索要发票
        </div>
      </div>
      <div class="content">
        <div class="record">
          <div class="record_money">
            <p class="lab">消费金额</p>
            <p>￥{{amount}}</p>
          </div>
          <div class="record_time">
            <p class="lab">日期</p>
            <p>{{rtime}}</p>
          </div>
        </div>
        <!--开票信息-->
        <div class="inv_msg">
          <div class="part_title">
            选择开票信息
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "demand_inv",
      data () {
        return {
          amount: 0,
          rtime: ''
        }
      },
      created() {
          this.amount = this.$route.query.amount;
          this.rtime = this.$route.query.rtime;
      }
    }
</script>

<style scoped>
  .demand_inv{
    height: 100vh;
    background-color: #ffffff;
  }
  .record{
    display: flex;
    margin-top: 15px;
    padding: 20px 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #f3f4f5;
    font-size: 14px;
  }
  .record .lab{
    margin-bottom: 10px;
    color: #919199;
    font-size: 12px;
  }
  .record_money{
    margin-right: 30px;
    color: #ff5959;
  }
  .record_time{
    color: #666666;
  }
</style>
