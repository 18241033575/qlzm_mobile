<template>
  <!--求职意向-->
  <div class="int_job_all" :class="{stop_scroll: secondBox || doubleBox}">
    <!--信息列表-->
    <div class="int_job" v-show="this.int_job_edit">
      <div class="com_det_title">
        <div class="content">
          求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">{{intJobData.nature}}</span></p>
            <p><span class="left_lab">意向岗位</span> <span v-for="(item,index) in this.tranIntJob" :key="index" class="right_msg">{{item}}</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">{{intJobData.salary==0?'暂无':intJobData.salary}}</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">{{(intJobData.province) + (intJobData.city=='未知'?'':intJobData.city)}}</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">{{intJobData.duty_time==0?'暂无':intJobData.duty_time}}</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">{{intJobData.remark}}</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="edit_job">
          编辑
        </div>
      </div>
    </div>
    <!--编辑信息-->
    <div class="int_job_edit" v-show="!this.int_job_edit">
      <div class="com_det_title">
        <div class="content">
          编辑求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg edit_bottom">
            <div class="edit_cell">
              <span class="edit_lab">求职类型</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.work_nature==1}" @click="have_job">全职</span><span class="choose_cell" :class="{choose_active:this.form.work_nature==2}" @click="wait_job">项目</span></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">意向岗位</span><span class="int_job_det job_det fr" @click="init_job"><span style="margin-right: 5px" v-for="(item,index) in this.tranIntJob" :key="index">{{item || '请选择'}}</span><img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">期望薪资</span><span class="int_job_det fr" @click="salary">{{intJobData.salary || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">工作地区</span><span class="int_job_det fr" @click="pro_city">{{(intJobData.province + (intJobData.city=='未知'?'':intJobData.city)) || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">预计到岗时间</span><span class="int_job_det fr" @click="arrive_time">{{intJobData.duty_time || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="content">
          <div class="edit_cell specail_area">
            <span class="edit_lab">备注</span>
          </div>
          <textarea placeholder="这里填写备注内容" maxlength="200" v-model="remark" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="save_job">
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
            <img @click="secondBoxBg" src="/static/images/left.png" alt="left">{{top_title}}
          </div>
        </div>
        <div class="content">
          <div class="filter_part1">
            <div v-if="showMsg =='init_job'" v-for="(item,index) in jobClassify" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="JobCode">
              {{item.name}}<img v-show="item.choose == 1" class="fr" src="/static/images/checkbox.png" alt="">
            </div>
            <div v-if="showMsg == 'salary'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="SalaryCode">
              {{item.name}}<img v-show="intJobData.salary == item.name" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'arr_time'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="TimeCode">
              {{item.name}}<img v-show="ArriveId == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--双层筛选-->
    <div class="filter_all_box" v-show="this.doubleBox">
      <div class="filter_bg" @click="doubleBoxBg">

      </div>
      <div class="filter_det">
        <div class="filter_s_title">
          <div class="content">
            <img @click="doubleBoxBg" src="/static/images/left.png" alt="left">意向工作地区
          </div>
        </div>
        <div class="content">
          <div class="filter_part1 toTop" >
            <div class="pro_cell">
              <div v-for="(item,index) in ProData" :city-id="index" :key="index" :class="{pro_active:cityCode.province == index}" class=" filter_part1_cell  second" @click="WorkAreaCode">
                {{item}}
              </div>
            </div>
            <div class="pro_cell city_cell">
              <div v-for="(item,index) in cityData" :city-id="index" :key="index" class=" filter_part1_cell  second" @click="WorkCityCode">
                {{item}}<img v-show="cityCode.city == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transJobs, transNature, transSalary, transArrive} from '../../../static/js/common.js'
    export default {
      name: "int_job",
      data() {
          return {
            int_job_edit: true,
            form: {
              work_nature: 1
            },
            intJobCode: [],
            tranIntJob: [],
            intJobData: {},
            remark: '',
            secondBox: false,
            doubleBox: false,
            showMsg: '',
            top_title: '',
            CommonData: {},
            ProData: {},
            cityData: {},
            ArriveId: 0,
            cityCode: {},
            jobClassify: {},
            upSalary: 0,
            midPro: 0
          }
      },
      methods: {
        edit_job() {
          this.int_job_edit = false
        },
        save_job() {
          if (this.intJobCode == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择意向岗位',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.intJobData.salary == '0' || this.intJobData.salary == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择期望薪资',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.cityCode == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择工作地区',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.ArriveId == 0) {
            this.$notify.warning({
              title: '提示',
              message: '请选择到岗时间',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/userinfo',{nature:this.form.work_nature,salary: this.upSalary,duty_time: this.ArriveId,remark: this.remark,flag: 2,job_id: this.intJobCode.join(','),work_province: this.cityCode.province,work_city: this.cityCode.city,uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.int_job_edit = true;
                this.getIntJob();
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 1500
                });
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
              this.$indicator.close();
            })
          // this.int_job_edit = true
        },
        have_job() {
          this.form.work_nature = 1
        },
        wait_job() {
          this.form.work_nature = 2
        },
        secondBoxBg() {
          this.secondBox = false;
        },
        doubleBoxBg() {
          this.doubleBox = false;
        },
        JobCode(e) {
          let jobId = e.currentTarget.getAttribute('city-id');
          // this.intJobData.job_id = jobId;
          // 如果存在则删除，如果不存在则添加
          let h = true;
          for (let k = 0,len = this.intJobCode.length;k < len;k++){
            if (jobId == this.intJobCode[k]){
              this.intJobCode.splice(k,1);
              h = false;
            }
          }
          if (h){
            if (this.intJobCode.length < 3){
              this.intJobCode.push(jobId);
              for (let i = 0,len = this.jobClassify.length;i < len;i++) {
                  if (this.jobClassify[i].id == jobId) {
                    this.jobClassify[i].choose = 1;
                    this.tranIntJob.push(this.jobClassify[i].name);
                  }
              }
            } else{
              this.$notify.warning({
                title: '提示',
                message: '最多选择三个意向职位',
                showClose: false,
                duration: 1500
              });
            }
          }else{
            // 相应choose = 0
            for (let i = 0,len = this.jobClassify.length;i < len;i++) {
                if (this.jobClassify[i].id == jobId) {
                  // vue 对对象里的数组不会响应式的变化
                  this.$set(this.jobClassify,i,{choose: 0,id: jobId,type: this.jobClassify[i].type,salary: this.jobClassify[i].salary,name: this.jobClassify[i].name});
                  for(let j = 0,len = this.tranIntJob.length;j < len;j++){
                    if (this.jobClassify[i].name == this.tranIntJob[j]) {
                      this.tranIntJob.splice(j,1);
                    }
                  }
                }

            }
          }
        },
        SalaryCode(e) {
          let salaryId = e.currentTarget.getAttribute('city-id');
          this.upSalary = this.intJobData.salary = salaryId;
          this.secondBox = false;
          transSalary(this.intJobData,1);
        },
        WorkAreaCode(e) {
          let areaCode = e.currentTarget.getAttribute('city-id');
          this.cityCode.province = areaCode;
          this.cityData = tranCity(this.cityCode,true,2,'city');
          this.intJobData.province = tranProvince(this.cityCode.province,true,'',2);
          this.cityCode.city = 0;
          this.intJobData.city = '';
        },
        WorkCityCode(e) {
          let areaCityCode = e.currentTarget.getAttribute('city-id');
          this.cityCode.city = areaCityCode;
          this.doubleBox = false;
          this.intJobData.city = tranCity(this.cityCode,true,3)
        },
        TimeCode(e) {
          let arrId = e.currentTarget.getAttribute('city-id');
          this.ArriveId = arrId;
          this.secondBox = false;
          this.intJobData.duty_time = transArrive(arrId,0);
        },
        init_job() {
          this.secondBox = true;
          this.top_title = '意向职位';
          this.showMsg = 'init_job';
        },
        salary() {
          this.secondBox = true;
          this.top_title = '期望薪资';
          this.showMsg = 'salary';
          this.CommonData = transSalary(this.CommonData,3);
        },
        pro_city() {
          this.doubleBox = true;
          this.ProData = tranProvince(this.ProData,true,'pro');
          this.cityData = tranCity(this.cityCode,true,2,'city');
        },
        arrive_time() {
          this.secondBox = true;
          this.top_title = '预计到岗时间';
          this.showMsg = 'arr_time';
          this.CommonData = transArrive(this.CommonData,3);
        },
        getIntJob() {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state!= 400) {
                this.upSalary = res.data.career_objective.salary;
                this.cityCode.province = res.data.career_objective.work_province;
                this.cityCode.city = res.data.career_objective.work_city;
                this.ArriveId = res.data.career_objective.duty_time;
                res.data.career_objective.province = res.data.career_objective.work_province;
                res.data.career_objective.city = res.data.career_objective.work_city;
                tranCity(res.data.career_objective,true,0);
                tranProvince(res.data.career_objective,true);
                transArrive(res.data.career_objective,true,0);
                transNature(res.data.career_objective,1);
                transSalary(res.data.career_objective,1);
                this.intJobData = res.data.career_objective;
                // 意向职位处理
                if (res.data.career_objective.job_id != '') {
                  this.intJobCode = res.data.career_objective.job_id.split(',');
                }
                this.jobClassify.forEach((item)=>{
                    for(let i = 0,len = this.intJobCode.length;i <len;i++){
                      if (item.id == this.intJobCode[i]){
                        this.tranIntJob.push(item.name);
                        item.choose = 1;
                      }
                    }
                });

                for (let i = 0,len = this.jobClassify.length; i < len;i++) {
                  if (this.jobClassify[i].value == this.intJobData.job_id) {
                    this.intJobData.tranJob_id = this.jobClassify[i].name;
                  }
                }
                this.remark = this.intJobData.remark;
              }
              this.$indicator.close();
            });
        }
      },
      created() {
        this.jobClassify = transJobs(this.jobClassify,3);
        this.getIntJob();
      }
    }
</script>

<style scoped>
  .int_bottom .bottom_msg p{
    white-space: normal;
  }
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 14px;
  }
  .bottom_msg p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 120px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
  }
  .edit_bottom{
    padding: 0;
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
    width: 90px;
    color: #353535;
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
  .remark{
    margin-top: 10px;
    text-align: center;
    background-color: #ffffff;
  }
  .remark textarea{
    padding: 15px;
    width: 85%;
    min-height: 120px;
    border: none;
  }
  .specail_area{
    text-align: left;
    border: none;
  }
  .pro_cell{
    float: left;
    width: 50%;
  }
  .pro_active{
    background-color: #f0f1f5;
  }
  .city_cell{
    background-color: #f0f1f5;
  }
  /* 意向职位多选框 */
  .check_box{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #5082e6;
  }
  .check_box img{

  }
  .job_det{
    width: 65%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
</style>
