<template>
    <!-- 预览简历-->
  <div class="pre_resume">
    <div class="com_det_title">
      <div class="content">
        预览简历
      </div>
    </div>
    <!--基本信息-->
    <div class="tal_msg_det">
      <div class="content">
        <div class="top_pic">
          <img :src="userMsg.photo" alt="">
          <p class="tal_name">{{userMsg.name}}</p>
          <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education==0?'未知学历':userMsg.education}}</span>|<span>{{userMsg.work_exp == 0?'一年以下':userMsg.work_exp + '年'}}</span></p>
        </div>
        <div class="bottom_msg">
          <p><span class="left_lab">手机</span> <span class="right_msg">{{userMsg.phone}}</span></p>
          <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
          <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
          <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status == 1?'已就业':'待就业'}}</span></p>
          <p><span class="left_lab">通讯地址</span> <span class="right_msg">{{(userMsg.province || '未知') + (userMsg.city || '') + (userMsg.area || '')}}</span></p>
          <p><span class="left_lab">街道</span> <span class="right_msg">{{userMsg.address}}</span></p>
        </div>
      </div>
    </div>
    <!--求职意向-->
    <div class="int_bottom">
      <div class="content">
        <div class="rem_title">
          求职意向
        </div>
        <div class="bottom_msg">
          <p><span class="left_lab">求职类型</span> <span class="right_msg">{{intJobData.nature}}</span></p>
          <p><span class="left_lab">意向岗位</span> <span style="flex-grow: inherit;width: auto;margin-right: 5px" v-for="(item,index) in tranJob" class="right_msg">{{item}}</span></p>
          <p><span class="left_lab">期望薪资</span> <span class="right_msg">{{intJobData.salary}}</span></p>
          <p><span class="left_lab">工作地区</span> <span class="right_msg">{{(intJobData.province || '未知') + (intJobData.city || '')}}</span></p>
          <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">{{intJobData.duty_time}}</span></p>
          <p><span class="left_lab">备注</span> <span class="right_msg remark_msg">{{intJobData.remark}}</span></p>
        </div>
      </div>
    </div>
    <!--工作经历-->
    <div class="exp_list">
      <div class="content">
        <div class="rem_title">
          工作经历
        </div>
      </div>
      <div class="exp_cell" v-for="(item,index) in this.workData" :key="index">
        <div class="content">
          <div class="exp_cell_box">
            <div class="exp_head">
              {{item.company}}
            </div>
            <div class="bottom_msg">
              <p><span class="left_lab">职位名称</span> <span class="right_msg">{{item.job}}</span></p>
              <p><span class="left_lab">行业性质</span> <span class="right_msg">{{item.tranJobNature}}</span></p>
              <p><span class="left_lab">工作性质</span> <span class="right_msg">{{item.workNature}}</span></p>
              <p><span class="left_lab">税前月薪(元)</span> <span class="right_msg">{{item.salary}}</span></p>
              <p><span class="left_lab">在职时间</span> <span class="right_msg">{{item.start_time + '-' + (item.end_time == 0?'至今':item.end_time)}}</span></p>
              <p><span class="left_lab">工作职责</span> <span class="right_msg">{{item.duties}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--项目经验-->
    <div class="exp_list">
      <div class="content">
        <div class="rem_title">
          项目经验
        </div>
      </div>
      <div class="exp_cell" v-for="(item,index) in this.proData" :key="index">
        <div class="content">
          <div class="exp_cell_box">
            <div class="exp_head">
              {{item.company}}
            </div>
            <div class="bottom_msg">
              <p><span class="left_lab">项目规模</span> <span class="right_msg">{{item.scale}}万</span></p>
              <p><span class="left_lab">工程周期</span> <span class="right_msg">{{item.start_time + '-' + (item.end_time == 0?'至今':item.end_time)}}</span></p>
              <p><span class="left_lab">项目地点</span> <span class="right_msg">{{item.address}}</span></p>
              <p><span class="left_lab">个人任职</span> <span class="right_msg">{{item.job}}</span></p>
              <p><span class="left_lab">项目介绍</span> <span class="right_msg remark_msg">{{item.introduction}}</span></p>
              <p><span class="left_lab">个人业绩</span> <span class="right_msg remark_msg">{{item.duties}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--教育经历-->
    <div class="exp_list">
      <div class="content">
        <div class="rem_title">
          教育经历
        </div>
      </div>
      <div class="exp_cell" v-for="(item,index) in eduData" :key="index">
        <div class="content">
          <div class="exp_cell_box">
            <div class="exp_head">
              {{item.school}}
            </div>
            <div class="bottom_msg">
              <p><span class="left_lab">学历</span> <span class="right_msg">{{item.education}}</span></p>
              <p><span class="left_lab">专业</span> <span class="right_msg">{{item.major}}</span></p>
              <p><span class="left_lab">在校时间</span> <span class="right_msg">{{item.start_time + '-' + item.end_time}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--行业证书-->
    <div class="exp_list">
      <div class="content">
        <div class="rem_title">
          行业证书
        </div>
      </div>
      <div class="exp_cell" v-for="(item,index) in this.certsData" :key="index">
        <div class="content">
          <div class="exp_cell_box">
            <div class="exp_head">
              {{item.trantype + '-' + item.tranmajor}}
            </div>
            <div class="bottom_msg">
              <p><span class="left_lab">注册情况</span> <span class="right_msg">{{item.tranreg_status}}</span></p>
              <p><span class="left_lab">增项</span> <span class="right_msg"><span v-show="additionData.length ==0">暂无</span><span style="margin-right: 5px;" v-for="(item) in additionData" v-show="additionData.length !=0">{{item}}</span></span></p>
              <p><span class="left_lab">备注</span> <span class="right_msg">{{item.remark}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--自我评价-->
    <div class="eval_body">
      <div class="content">
        <div class="rem_title">
          自我评价
        </div>
        <div class="eval_body_top">
          <div class="adv_cell" v-for="(item,index) in this.selfEvalData.tags" :key="index">
            {{item}}
          </div>
        </div>
        <div class="eval_body_bottom">
          <p>{{evaluation}}</p>
        </div>
      </div>
    </div>.
  </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic,transJobs,transEducation,transWorkexp,transSalary,transCert,transGender,transNature,transArrive,tal_adv} from '../../../static/js/common.js'
    export default {
        name: "pre_resume",
      data() {
          return {
            uid: '',
            userMsg: {},
            intJobData: {},
            workData: {},
            proData: {},
            eduData: {},
            certsData: {},
            selfEvalData: {},
            tranJob: [],
            evaluation: '',
            additionData: '暂无',
          }
      },
      created(){
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.uid = userInfo.id;
        let certs = JSON.parse(localStorage.getItem('CERT'));
        // 基本信息
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              res.data.base_info.photo = splicPic(res.data.base_info.photo,true) || '/static/images/user_avator.png';
              this.userMsg = res.data.base_info;
              this.userMsg.area = tranArea(this.userMsg, true, 3);
              this.userMsg.city = tranCity(this.userMsg,true,3);
              this.userMsg.province = tranProvince(this.userMsg.province,true,'',2);
              this.userMsg.phone = JSON.parse(localStorage.getItem('USER')).phone;
              transGender(this.userMsg,1);
              transEducation(this.userMsg,1);
            }
          });

        // 求职意向
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            console.log(res);
            if (res.data.state!= 400) {
              // 求职意向
              res.data.career_objective.province = res.data.career_objective.work_province;
              res.data.career_objective.city = res.data.career_objective.work_city;
              if (res.data.career_objective.city == 0) {
                res.data.career_objective.city = '';
              } else {
                tranCity(res.data.career_objective,true,0);
              }
              if (res.data.career_objective.province == 0) {
                res.data.career_objective.province = '未知';
              } else {
                tranProvince(res.data.career_objective,true);
              }
              this.intJobData = res.data.career_objective;
              transNature(this.intJobData,1);
              transSalary(this.intJobData,1);
              transArrive(this.intJobData,1);
              this.remark = this.intJobData.remark;

              let job = transJobs('',3);
              this.intJobData.job_id = this.intJobData.job_id.split(',');
              job.forEach((item)=>{
                for (let i = 0,len = this.intJobData.job_id.length;i < len;i++) {
                  if (item.id == this.intJobData.job_id[i]) {
                    this.tranJob.push(item.name);
                  }
                }
              });
            }
          });

        // 工作经历
        this.$ajax.get('/resume/workexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.workData = res.data;
              transSalary(this.workData,2);
              for (let i = 0,len = this.workData.length; i < len; i++) {
                if (this.workData[i].industry == 0) {
                  this.workData[i].tranJobNature = '非建筑行业'
                } else {
                  this.workData[i].tranJobNature = '建筑行业'
                }
                if (this.workData[i].nature == 1) {
                  this.workData[i].workNature = '管理岗'
                } else if (this.workData[i].nature == 2) {
                  this.workData[i].workNature = '技术岗'
                } else {
                  this.workData[i].workNature = '其他'
                }
              }
            }
          });

        // 项目经验
        this.$ajax.get('/resume/projectexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.proData = res.data;
            }
          });

        // 教育经历
        this.$ajax.get('/resume/eduexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              transEducation(res.data,2);
              this.eduData = res.data;
            }
          });
        // 证书
        this.$ajax.get('/resume/certificate',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              // 证书
              let certs = res.data,
                  certData = JSON.parse(localStorage.getItem('CERT')),
                  addData = [];
              certs.forEach(function (item,ids) {
                if (item.reg_status == 0) {
                  item.tranreg_status = '不限'
                } else if (item.reg_status == 1) {
                  item.tranreg_status = '初始'
                } else {
                  item.tranreg_status = '转注'
                }
                for(let i = 0,len = certData.length;i < len;i++) {
                  if (item.type == certData[i].id ) {
                    item.trantype = certData[i].category;
                    for(let j = 0,mlen = certData[i].majors.length; j < mlen; j++) {
                      if (item.major == certData[i].majors[j].id) {
                        item.tranmajor = certData[i].majors[j].major
                      }
                      let addi = item.addition.split(',');
                      for (let k = 0,len = addi.length;k < len;k++){
                        if (addi[k] == certData[i].majors[j].id) {
                          addData.push(certData[i].majors[j].major)
                        }
                      }
                    }
                  }
                }
              });
              this.additionData = addData;
              this.certsData = certs;
              this.$indicator.close();
            }
          });

        // 自我评价
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              this.selfEvalData = res.data.evaluation;
              tal_adv(this.selfEvalData.tags,2);
              this.evaluation = this.selfEvalData.evaluation;
            }
          });
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .bottom_msg .right_msg{
    white-space: normal;
  }
  .exp_list .exp_cell{
    margin-bottom: 0;
  }
  .rem_title{
    line-height: 44px;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    background-color: #ffffff;
    text-align: left;
  }
  .exp_list{
    background-color: #ffffff;
  }
  .tal_msg_det{
    background-color: #ffffff;
  }
  .top_pic{
    text-align: center;
    padding-top: 15px;
    /*  -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #E1E4E6;*/
  }
  .top_pic img{
    width: 75px;
    height: 90px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
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
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .eval_body{
    margin-top: 10px;
    background-color: #ffffff;
    margin-bottom: 74px;
  }
  .eval_body_top{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 5px;
  }
  .adv_cell{
    width: 75px;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .eval_body_bottom{
    text-align: center;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    text-align: left;
    color: #666666;
    line-height: 18px;
  }
  .eval_body_bottom textarea{
    width: 90%;
    min-height: 130px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
  }
  .resume_btn{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #ffffff;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
  }
  .resume_btn_cell{
    width: 33%;
    line-height: 44px;
    font-size: 14px;
    font-weight: bold;
    color: #666666;
  }
  .resume_invite{
    color: #ff8236;
  }
  .resume_buy_btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    font-weight: bold;
    color: #ff8236;
  }
  /*简历购买弹层*/
  .buy_box{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(0,0,0,.5);
    /*z-index: 9999999;*/
  }
  .box{
    margin: 50% auto;
    width: 92%;
    height: 155px;
    background-color: #ffffff;
  }
  .box_title{
    line-height: 44px;
    font-size: 16px;
    color: #353535;
    text-align: center;
    font-weight: bold;
  }
  .box_msg{
    padding: 10px 20px 15px;
    color: #919199;
    text-align: center;
    letter-spacing: 1px;
  }
  .box_btn_group{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 14px;
    font-weight: bold;
  }
  .box_btn{
    display: inline-block;
    margin: 12px 0;
    width: 48%;
    text-align: center;
  }
  .confirm{
    color: #5082e6;
    border-right: 1px solid #E1E4E6;
  }
</style>
