<template>
    <div class="release_office">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <div class="tal_msg_edit" v-show="this.edit">
        <div class="com_det_title">
          <div class="content">
            发布职位
          </div>
        </div>
        <div class="tal_edit_det">
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell">
                <span class="edit_lab">职位名称</span><input type="text" maxlength="15" v-model="form.tal_name" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">招聘人数</span><input type="text" v-model="form.tal_idcard" maxlength="16" placeholder="招聘人数，默认为“若干”">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位类别</span><span class="int_job_det fr" >{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.tal_state==1}" @click="have_job">全职</span><span class="choose_cell" :class="{choose_active:this.form.tal_state==0}" @click="wait_job">项目</span></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">持证要求</span><input type="text" v-model="form.tal_email" placeholder="电子邮箱">
              </div>
              <div class="edit_cell special_cell">
                <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_province">{{userMsg.province}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city">{{userMsg.city}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area">{{userMsg.area}}<img src="/static/images/font_down.png" alt=""></div></div>
              </div>
              <div class="edit_cell">
                <input type="text" maxlength="20" v-model="form.tal_addr" placeholder="详细地址，如：街道、门牌号等">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">薪资待遇</span><span class="int_job_det fr" >{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">学历要求</span><span class="int_job_det fr" >{{(1) || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作年限</span><span class="int_job_det fr" >{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">性别限制</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.tal_state==0}" @click="have_job">不限</span><span class="choose_cell" :class="{choose_active:this.form.tal_state==1}" @click="have_job">男</span><span class="choose_cell" :class="{choose_active:this.form.tal_state==0}" @click="wait_job">女</span></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位亮点</span><span class="int_job_det fr" >{{(1) || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位描述</span><span class="int_job_det fr" >{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">加急招聘</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="bas_msg_btn" @click="to_edited">
            保存
          </div>
        </div>
      </div>
      <!--筛选第二层-->
      <div class="filter_all_box" v-show="this.secondBox">
        <div class="filter_bg" @click="secondBoxBg">

        </div>
        <div class="filter_det">
          <div class="filter_s_title">
            <div class="content">
              <img @click="first_back" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">
              <div v-if="showMsg =='pro'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
                {{item}}<img v-show="cityCode[0] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'city'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
                {{item}}<img v-show="cityCode[1] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'area'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
                {{item}}<img v-show="cityCode[2] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic,transGender,transEducation,transWorkexp} from '../../../static/js/common.js'
    export default {
        name: "release_office",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          userInfoMsg: {},
          userMsg: {},
          secondBox: false,
          top_title: '',
          cityCode: {

          },
          showMsg: 'pro',
          beginData: {},
          editHeadPic: '/static/images/user-01@2x.png',
          headPic: '/static/images/banner03@2x.png',
          edit: true,
          form: {
            tal_name: '',
            tal_idcard: '',
            tal_qq: '',
            tal_email: '',
            tal_addr: '',
            tal_state: 1
          },
          guiyangData: {

          },
          cityData: {

          },

        }
      },
      created() {


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
        to_edit() {
          this.edit = false;
        },
        to_edited() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/userinfo',{"flag":1, "name": this.form.tal_name, "province": this.cityCode[0], "city": this.cityCode[1], "area": this.cityCode[2], "address": this.form.tal_addr, "email": this.form.tal_email, "qq": this.form.tal_qq, "id_card":  this.form.tal_idcard, "work_status": this.form.tal_state, uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.edit = true;
              }
            })

        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[0] = cCode;
          /*  this.cityCode[1] = '';
            this.cityCode[2] = '';
            // 替换相应位置0*/
          this.secondBox = false
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[1] = cCode;
          this.secondBox = false
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[2] = cCode;
          this.secondBox = false
        },
        secondBoxBg() {
          // this.firstBox = false;
          this.secondBox = false
        },
        first_back() {
          this.firstBox = true;
          this.secondBox = false
        },
        have_job() {
          this.form.tal_state = 1
        },
        wait_job() {
          this.form.tal_state = 0
        },
        upHeadPic(res) {
          console.log(res);
        },
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
      },
      updated() {
        this.userMsg.province = tranProvince(this.cityCode[0],true,'',2);
        this.userMsg.city = tranCity(this.cityCode,true,3);
        this.userMsg.area = tranArea(this.cityCode,true,3);
      }
    }
</script>

<style scoped>
  .top_pic img{
    width: 75px;
    height: 90px;
  }
  .top_pic .tal_name{
    padding-bottom: 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .top_pic p{
    padding: 10px 0;
  }
  .top_pic p span{
    padding: 0 5px;
    font-size: 12px;
    color: #919199;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
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
  /*编辑*/
  .tal_edit_det{
    background-color: #ffffff;
  }
  .top_pic img {
    width: 70px;
    height: 95px;
  }
  .top_msg{
    margin-left: 15px;
    padding-top: 15px;
    color: #919199;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
  }
  .upload_btn{
    display: inline-block;
    margin-top: 10px;
    /*width: 80px;
    line-height: 30px;
    text-align: center;

    */
  }
  .upload_btn .el-button{
    color: #ffffff;
    background-color: #ff8236;
    border-color: #ff8236;
  }
  .upload_btn .el-upload__tip{
    color: #919199;
    font-size: 12px;
  }
  .upload_btn .el-upload-list--none{
    display: none;
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
  .edit_cell input ::placeholder{
    color: #c2c2cc;
  }
  .edit_cell input:focus{
    outline: none;
  }
  .choose_group{
    display: inline-block;
    margin-top: 10px;
    width: 65%;
    text-align: right;
    line-height: 24px;
  }
  .choose_cell{
    display: inline-block;
    margin-left: 10px;
    width: 60px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 12px;
    color: #919199;
    background-color: #ffffff;
  }
  .choose_active{
    color: #5082e6;
    background:rgba(80,130,230,.2);
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
</style>
