<template>
  <!--企业资料-->
    <div class="enterp_info">
      <div class="com_det_title">
        <div class="content">
          企业资料
        </div>
      </div>
      <div class="tal_msg_edit">
        <div class="tal_edit_det">
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell border-none">
                <span class="edit_lab">企业名称</span><input type="text" maxlength="15" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业性质</span><span class="int_job_det fr">{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业规模</span><span class="int_job_det fr">{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell special_cell ">
                <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell">请选择<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell">请选择<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" >请选择<img src="/static/images/font_down.png" alt=""></div></div>
                <input type="text" maxlength="20" placeholder="详细地址，如：街道、门牌号等">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业简介</span><span class="int_job_det fr" >请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="bas_msg_btn">
          保存
        </div>
      </div>
      <!--筛选第二层-->
      <div class="filter_all_box" v-show="this.secondBox">
        <div class="filter_bg" @click="secondBoxBg">

        </div>
        <div class="filter_det">
          <div class="filter_s_title">
            <div class="content">
              <img @click="secondBoxBg" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">
              <div v-if="showMsg == 'posType'" v-for="(item,index) in CommonData" :posType-id="item.value" :key="index" class="filter_part1_cell second" @click="posTypeCode">
                {{item.name}}<img v-show="posTypeNum == item.value" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg =='cert_type'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="CertCode">
                {{item.category}}<img v-show="certTypeNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'cert_major'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="MajorCode">
                {{item.major}}<img v-show="certMajorNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'salary'" v-for="(item,index) in CommonData" :city-id="index" :key="index" class="filter_part1_cell second" @click="SalaryCode">
                {{item}}<img v-show="salaryNum.salary == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'education'" v-for="(item,index) in CommonData" :city-id="index" :key="index" class="filter_part1_cell second" @click="EduCode">
                {{item}}<img v-show="educationNum == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'workexp'" v-for="(item,index) in CommonData" :city-id="index" :key="index" class="filter_part1_cell second" @click="WorkexpCode">
                {{item}}<img v-show="workexpNum == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
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
        name: "enterp_info",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          userMsg: {},
          secondBox: false,
          top_title: '',
          isUgent: true,
          scrollSign: false,
          cityCode: {

          },
          showMsg: '',
          beginData: {},
          //弹层数据标识、转换数据
          posTypeNum: '0',
          tranPosType: '',
          tranGender: '',
          certTypeNum: 0,
          tranCertType: '',
          certMajorNum: 0,
          tranCertMajor: '',
          salaryNum: {
            salary: 0
          },
          tranSalary: '',
          educationNum: 0,
          tranEdu: '',
          workexpNum: 0,
          tranWorkexp: '',
          //遍历数据
          CommonData: {

          }
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
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
      }
    }
</script>

<style scoped>
  .tal_edit_det{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 80px;
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
  .edit_cell input ::placeholder{
    color: #c2c2cc;
  }
  .edit_cell input:focus{
    outline: none;
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
    margin-left: 20px;
    width: 12px;
    height: 10px;
    vertical-align: middle;
  }
  .int_job_det{
    color: #919199;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .border-none{
    border: none;
  }
  .special_cell input{
    width: 90%;
    padding-left: 15px;
    margin-bottom: 20px;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /*筛选弹层*/
  .filter_all_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
    z-index: 9999999;
  }
  .filter_bg{
    width: 10%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .filter_det{
    width: 90%;
    height: 100vh;
    overflow-y: scroll;
    background-color: #ffffff;
  }
  .filter_part1_cell{
    line-height: 44px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #EAEAEA;
    color: #353535;
  }
  .filter_part1_cell span{
    color: #919199;
  }
  .filter_part1_cell img{
    margin-left: 5px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  /*第二层*/
  .filter_s_title{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #353535;
    border-bottom: 1px solid #E1E4E6;
  }
  .filter_s_title img{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .second{
    color: #919199;
  }
  .second img{
    padding-top: 14px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .bas_msg_btn{
    position: fixed;
    bottom: 0;
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
</style>
