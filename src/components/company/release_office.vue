<template>
    <div class="release_office" :class="{stop_scroll: this.openState || scrollSign}">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <div class="tal_msg_edit">
        <div class="com_det_title">
          <div class="content">
            发布职位
          </div>
        </div>
        <div class="tal_edit_det">
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell border-none">
                <span class="edit_lab">职位名称</span><input type="text" maxlength="15" v-model="form.office_name" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">招聘人数</span><input type="text" v-model="form.hire_num" maxlength="8" placeholder="招聘人数，默认为“若干”">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位类别</span><span class="int_job_det fr" @click="pos_type" >{{tranPosType || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.JobNature == 1}" @click="all_nature">全职</span><span class="choose_cell" :class="{choose_active:this.JobNature==2}" @click="pro_nature">项目</span></span>
              </div>
              <div class="edit_cell db_special_cell">
                <span class="edit_lab">持证要求</span>
                <div class="block">
                  <div class="edit_cell border-none" @click="certType">
                    <span class="edit_lab">{{tranCertType || '请选择证书类型'}}</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
                  </div>
                  <div class="edit_cell" @click="certMajor">
                    <span class="edit_lab">{{tranCertMajor || '请选择证书专业'}}</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
                  </div>
                </div>
              </div>
              <div class="edit_cell special_cell ">
                <span class="edit_lab">工作地点</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_province">{{userMsg.province || '请选择'}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city">{{userMsg.city || '请选择'}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area">{{userMsg.area || '请选择'}}<img src="/static/images/font_down.png" alt=""></div></div>
                <input type="text" maxlength="20" v-model="form.tal_addr" placeholder="详细地址，如：街道、门牌号等">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">薪资待遇</span><span class="int_job_det fr" @click="choose_salary">{{tranSalary || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">学历要求</span><span class="int_job_det fr" @click="choose_edu">{{tranEdu || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作年限</span><span class="int_job_det fr" @click="choose_workexp">{{tranWorkexp || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">性别限制</span><span class="fr choose_group la_choose_group"><span class="choose_cell" :class="{choose_active:this.genderNum == 0}" @click="all_sex">不限</span><span class="choose_cell" :class="{choose_active:this.genderNum == 1}" @click="man_sex">男</span><span class="choose_cell" :class="{choose_active:this.genderNum == 2}" @click="woman_sex">女</span></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位亮点</span><span class="int_job_det fr" >{{(1) || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">职位描述</span><span class="int_job_det fr" >{{1 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">加急招聘</span><span class="int_job_det fr" > <el-switch class="switch_btn" v-model="isUgent"></el-switch></span>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="bas_msg_btn" @click="release">
            发布
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
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transWorkexp,transEducation,transSalary,transJobs} from '../../../static/js/common.js'
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
          //性别、工作性质标识
          JobNature: 1,
          genderNum: 0,
          form: {
            office_name: '',
            hire_num: '',
            tal_qq: '',
            tal_email: '',
            tal_addr: '',
            tal_state: 1
          },
          //遍历数据
          CommonData: {

          }
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
        release() {
          console.log('发布成功');
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
          this.secondBox = false;
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[2] = cCode;
          this.secondBox = false;
        },
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
        //工作性质选择
        all_nature() {
          this.JobNature = 1
        },
        pro_nature() {
          this.JobNature = 2
        },
        //性别限制选择
        all_sex() {
          this.genderNum = 0
        },
        man_sex() {
          this.genderNum = 1
        },
        woman_sex() {
          this.genderNum = 2
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
        //职位类别选择
        pos_type() {
          this.secondBox = true;
          this.top_title = '职位类别';
          this.showMsg = 'posType';
          this.scrollSign = true;
          this.CommonData = transJobs(this.CommonData,5);
        },
        posTypeCode(e) {
          let pos_code = e.currentTarget.getAttribute('posType-id');
          this.posTypeNum = pos_code;
          this.tranPosType = transJobs(pos_code,1);
          this.secondBox = false;
          this.scrollSign = false;
        },
        //证书类型
        certType() {
          this.secondBox = true;
          this.scrollSign = true;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
          this.showMsg = 'cert_type';
          this.CommonData = certData;
          this.top_title = '选择证书类型'
        },
        CertCode(e) {
          let certId = e.currentTarget.getAttribute('city-id');
          this.certTypeNum = certId;//certTypeNum
          this.tranCertMajor = '';
          this.secondBox = false;
          this.scrollSign = false;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == certId) {
              this.tranCertType = certData[i].category;
            }
          }
        },
        //证书专业
        certMajor() {
          this.secondBox = true;
          this.scrollSign = true;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
          this.showMsg = 'cert_major';
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeNum) {
              this.CommonData = certData[i].majors;
            }
          }
          this.top_title = '选择证书专业'
        },
        MajorCode(e) {
          let majorId = e.currentTarget.getAttribute('city-id');
          this.certMajorNum = majorId;
          this.secondBox = false;
          this.scrollSign = false;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeNum) {
              for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                if (certData[i].majors[j].id == majorId) {
                  this.tranCertMajor = certData[i].majors[j].major
                }
              }
            }
          }
        },
        //薪资待遇
        choose_salary() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'salary';
          this.top_title = '薪资待遇';
          this.CommonData = transSalary(this.CommonData,3);
        },
        SalaryCode(e) {
          let salaryId = e.currentTarget.getAttribute('city-id');
          this.salaryNum.salary = salaryId;
          this.scrollSign = false;
          this.secondBox = false;
          transSalary(this.salaryNum,1);
          this.tranSalary = this.salaryNum.transalary;
        },
        //学历要求
        choose_edu() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'education';
          this.top_title = '学历要求';
          this.CommonData = transEducation(this.CommonData,3);
        },
        EduCode(e) {
          let eduId = e.currentTarget.getAttribute('city-id');
          this.educationNum = eduId;
          this.scrollSign = false;
          this.secondBox = false;
          this.tranEdu = transEducation(eduId,4);
        },
        //工作年限要求
        choose_workexp() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'workexp';
          this.top_title = '工作年限';
          this.CommonData = transWorkexp(this.CommonData,5);
        },
        WorkexpCode(e) {
          let expId = e.currentTarget.getAttribute('city-id');
          this.workexpNum = expId;
          this.scrollSign = false;
          this.secondBox = false;
          this.tranWorkexp = transWorkexp(expId,4);
        },
      },
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
    margin-top: 10px;
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
  .db_special_cell{
    display: flex;
    justify-content: start;
  }
  .db_special_cell span{
    line-height: 88px;
  }
  .db_special_cell .block{
    flex-grow: 1;
    /*width: 65%;*/
  }
  .db_special_cell .block span{
    line-height: 44px;
  }
  .db_special_cell .block .edit_lab{
    color: #919199;
    width: 80%;
  }
  .la_choose_group{
    width: 72%;
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
</style>
