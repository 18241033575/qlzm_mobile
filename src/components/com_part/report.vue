<template>
  <!--公共举报-->
    <div class="report">
      <div class="com_det_title">
        <div class="content">
          举报
        </div>
      </div>
      <div class="content">
        <div class="com_title">
          举报类型
        </div>
        <div class="report_type">
          <div class="report_type_cell" :class="{active: reportType==1}" @click="honest_rep">
            诚信举报
          </div>
          <div class="report_type_cell" :class="{active: reportType==2}" @click="med_rep">
            中介举报
          </div>
          <div class="report_type_cell" :class="{active: reportType==3}" @click="oth_rep">
            其它
          </div>
        </div>
        <div class="com_title">
          举报原因
        </div>
        <div class="report_reason">
          <textarea placeholder="在这里填写职责内容" v-model="content"  id="" cols="30" rows="10"></textarea>
        </div>
        <div class="report_sub_btn" @click="sub_report">
          提交举报
        </div>
        <div class="report_tips">
          <p>骑驴找马是一个垂直于建筑行业的人才供需免费平台,平台依托建筑行业人力资源大数据,旨在解决建筑行业解决人才稀缺、人力资源信息不对称、中介泛滥导致人才成本居高不下、纠纷不断等问题为了保障诚信就业及诚信招聘的一方净土、 维护广大用户利益,我们提供了举报机制,欢迎广大用户举报中介及不诚信的企业或求职者。</p>
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
        name: "report",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          reportType: 1,
          content: '',
          member_id: 0,
          member_type: 1
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
        honest_rep() {
          this.reportType = 1;
        },
        med_rep() {
          this.reportType = 2;
        },
        oth_rep() {
          this.reportType = 3;
        },
        sub_report() {
          let uid = this.$route.query.uid;
          let cid = this.$route.query.cid;
          if (uid) {
            this.member_id = uid;
            this.member_type = 1
          } else {
            this.member_id = cid;
            this.member_type = 2
          }
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            this.$ajax.post('/company/complaint',{cid: companyInfo.id,member_id: this.member_id,member_type: this.member_type,type: this.reportType,content: this.content})
              .then((res)=>{
                console.log(res);
              })
          }

        }
      }
    }
</script>

<style scoped>
  .report{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
  }
  .com_title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #999999;
  }
  .report_type{
    display: flex;
    justify-content: space-between;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
  .report_type .active{
    color: #5082e6;
    border: 1px solid #5082e6;
    background: rgba(80,130,230,.1);
  }
  .report_type_cell{
    width: 90px;
    line-height: 32px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    font-weight: bold;
  }
  .report_reason textarea{
    width: 100%;
    height: 130px;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
  }
  .report_sub_btn{
    margin-top: 30px;
    width: 100%;
    line-height: 44px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #ff8236;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }
  .report_tips p{
    margin-top: 50px;
    line-height: 18px;
    font-size: 12px;
    color: #999999;
  }
</style>
