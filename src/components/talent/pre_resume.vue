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
          <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
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
          <p><span class="left_lab">意向岗位</span> <span v-for="(item,index) in tranJob" class="right_msg">{{item}}</span></p>
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
    <!--教育经历-->
    <div class="exp_list">
      <div class="content">
        <div class="rem_title">
          教育经历
        </div>
      </div>
      <div class="exp_cell" v-for="(item,index) in this.eduData" :key="index">
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
              <p><span class="left_lab">增项</span> <span class="right_msg">{{additionData}}</span></p>
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
  import {splicPic,transJobs,transEducation,transWorkexp,transSalary} from '../../../static/js/common.js'
    export default {
        name: "pre_resume",
      data() {
          return {
            uid: '',
            userMsg: {},
            intJobData: {},
            workData: {},
            eduData: {},
            certsData: {},
            selfEvalData: {},
            tranJob: [],
            evaluation: '',
            additionData: '暂无',
          }
      },
      created(){
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.uid = userInfo.id;
        let certs = JSON.parse(localStorage.getItem('CERT'));
        // 基本信息
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              res.data.base_info.photo = splicPic(res.data.base_info.photo,true) || '/static/images/user_avator.png';
              this.userMsg = res.data.base_info;
            }
          });

        // 求职意向
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              // 求职意向
              res.data.career.province = res.data.career.work_province;
              res.data.career.city = res.data.career.work_city;
              if (res.data.career.city == 0) {
                res.data.career.city = '';
              } else {
                tranCity(res.data.career,true,0);
              }
              if (res.data.career.province == 0) {
                res.data.career.province = '未知';
              } else {
                tranProvince(res.data.career,true);
              }
              this.intJobData = res.data.career;
              this.remark = this.intJobData.remark;

              let job = transJobs('',3);
              this.intJobData.job_id = this.intJobData.job_id.split(',');
              job.forEach((item)=>{
                for (let i = 0,len = this.intJobData.job_id.length;i < len;i++) {
                  if (item.value == this.intJobData.job_id[i]) {
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
              console.log(res.data);
              this.workData = res.data.work_exp;
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

        // 教育经历
        this.$ajax.get('/resume/eduexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              transEducation(res.data.edu_exp,2);
              this.eduData = res.data.edu_exp;
            }
          });

        // 证书
        this.$ajax.get('/resume/certificate',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
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
                    }
                  }
                }
              });
              this.certsData = certs;
            }
          });

        // 自我评价
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              this.selfEvalData = res.data.evaluation;
              this.evaluation = this.selfEvalData.evaluation;
            }
          });
      }
    }
</script>

<style scoped>

</style>
