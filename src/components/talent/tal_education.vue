<template>
  <div class="tal_education">
    <!--教育经历列表-->
    <div class="tal_work_msg" v-show="this.workExpSign">
      <div class="com_det_title">
        <div class="content">
          教育经历
        </div>
      </div>
      <div class="add_item" @click="add_work_exp">
        <p><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加教育经历</span></p>
      </div>
      <div class="exp_list">
        <div class="exp_cell" v-for="(item,index) in this.eduData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.school}}<span @click="edu_edit" :edu-data="item.id" class="fr"><img src="/static/images/ic_edit.png" alt="">编辑</span>
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
    </div>
    <!--编辑教育经历-->
    <div class="tal_work_edit" v-show="!this.workExpSign">
      <div class="com_det_title">
        <div class="content">
          {{editMsg}}
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">毕业院校</span><input v-model="operaData.school" type="text" placeholder="毕业院校">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">学历</span><span class="int_job_det fr" @click="choose_edu">{{transVal || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">专业</span><input v-model="operaData.major" type="text" placeholder="专业">
          </div>
          <div class="edit_cell special_cell">
            <span class="edit_lab">在校时间</span>
            <div class="block">
              <el-date-picker
                v-model="value1"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="edit_btn_group" v-if="!this.save_editSign">
        <div class="content">
          <div class="group_box">
            <div class="edit_btn_cell del_btn" @click="edu_del">
              删除
            </div>
            <div class="edit_btn_cell save_btn" @click="saveEdu">
              保存
            </div>
          </div>
        </div>
      </div>
      <div class="edit_btn_group" v-if="this.save_editSign">
        <div class="content">
          <div class="group_box">
            <div class="save_btn_cell save_btn" @click="saveEdu">
              保存
            </div>
          </div>
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
            <img @click="first_back" src="/static/images/left.png" alt="left">选择学历
          </div>
        </div>
        <div class="content">
          <div class="filter_part1">
            <div v-for="(item,index) in EduData" v-show="item.name != '不限'" :edu-id="item.id" :key="index" class="filter_part1_cell second" @click="EduCode">
              {{item.name}}<img v-show="selectedVal == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {transEducation,transtime} from '../../../static/js/common.js'
  export default {
    name: "tal_education",
    data() {
      return {
        save_editSign: true,
        eduData: {},
        operaData: {
          school: '',
          education: '',
          major: ''
        },
        workExpSign: true,
        editMsg: '',
        jobNature: 0,
        workNature: 1,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now(),time.getTime() < 0;
          }
        },
        value1: '',
        value2: '',
        checked: true,
        secondBox: false,
        EduData: {},
        selectedVal: '0',
        transVal: '',
        edit_Id: ''
      }
    },
    methods: {
      add_work_exp() {
        this.save_editSign = true;
        this.workExpSign = false;
        this.editMsg = '添加教育经历';
        // 时间初始化 、行业性质、工作性质初始化  ；删除功能 和 新增功能
      },
      is_jobNature() {
        this.jobNature = 1
      },
      isn_jobNature() {
        this.jobNature = 0
      },
      man_workNature() {
        this.workNature = 1
      },
      ski_workNature() {
        this.workNature = 2
      },
      oth_workNature() {
        this.workNature = 3
      },
      saveEdu() {
        delete this.operaData.state;
        this.operaData.school = this.operaData.school.replace(/^\s*|\s*$/g,"");
        if (this.operaData.school == '') {
          this.$notify.warning({
            title: '提示',
            message: '毕业院校不能为空',
            showClose: false,
            duration: 1500
          });
          return
        }
        if (this.operaData.education == '' || this.operaData.education == 0) {
          this.$notify.warning({
            title: '提示',
            message: '请选择学历',
            showClose: false,
            duration: 1500
          });
          return
        }
        if (transtime(this.value1) == 'null') {
          this.$notify.warning({
            title: '提示',
            message: '请输入开始时间',
            showClose: false,
            duration: 1500
          });
          return
        }
        if (transtime(this.value2) == 'null') {
          this.$notify.warning({
            title: '提示',
            message: '请输入结束时间',
            showClose: false,
            duration: 1500
          });
          return
        }
        this.operaData.start_time = transtime(this.value1);
        this.operaData.end_time = transtime(this.value2);
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.operaData.uid = userInfo.id;
        this.operaData.id = this.edit_Id;
        this.operaData.education = this.selectedVal;
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$ajax.post('/resume/eduexp',this.operaData)
          .then((res)=>{
            if (res.data.state == 200) {
              this.workExpSign = true;
              this.$notify.success({
                title: '提示',
                message: '保存成功',
                showClose: false,
                duration: 1500
              });
              this.getEdu();
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
      },
      edu_del() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.operaData.state = -1;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.operaData.uid = userInfo.id;
        this.operaData.id = this.edit_Id;
        this.operaData.education = this.selectedVal;
        this.operaData.start_time = JSON.stringify(this.value1).substring(1,11);
        this.operaData.end_time = JSON.stringify(this.value2).substring(1,11);
        this.$ajax.post('/resume/eduexp',this.operaData)
          .then((res)=>{
            if (res.data.state == 200) {
              this.workExpSign = true;
              this.$notify.success({
                title: '提示',
                message: '删除成功',
                showClose: false,
                duration: 1500
              });
              this.getEdu();
            }else {
              this.$notify.error({
                title: '提示',
                message: res.data.msg,
                showClose: false,
                duration: 1500
              });
            }
            this.$indicator.close();
          });
      },
      EduCode(e) {
        let eduVal = e.currentTarget.getAttribute('edu-id');
        this.selectedVal = eduVal;
        this.operaData.education = this.selectedVal;
        this.transVal = transEducation(eduVal,0);
        this.secondBox = false
      },
      secondBoxBg() {
        // this.firstBox = false;
        this.secondBox = false
      },
      first_back() {
        this.secondBox = false
      },
      choose_edu() {
        this.secondBox = true
      },
      edu_edit(e) {
        let eduId = e.currentTarget.getAttribute('edu-data');
        this.save_editSign = false;
        this.edit_Id = eduId;
        for(let i = 0,len = this.eduData.length;i < len; i++) {
          if (this.eduData[i].id == eduId) {
            this.operaData.school = this.eduData[i].school;
            this.operaData.education = this.eduData[i].education;
            transEducation('',3).forEach((item,index)=> {
              if (item.name === this.eduData[i].education) {
                this.selectedVal = item.id;
              }
            });
            this.transVal = this.eduData[i].education;
            for (let j = 0,len = this.EduData.length;j < len; j++) {
              if (this.EduData[j] == this.transVal) {
                this.selectedVal = j;
              }
            }
            this.operaData.major = this.eduData[i].major;
            this.value1 = this.eduData[i].start_time;
            this.value2 = this.eduData[i].end_time;
            this.workExpSign = false;
            this.editMsg = '编辑教育经历'
          }
        }
      },
      getEdu() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/resume/eduexp',{params: {uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              transEducation(res.data,2);
              this.eduData = res.data;
              // this.certData = res.data;
            }
          });
        this.EduData = transEducation(this.EduData,3);
      }
    },
    created() {
      this.getEdu();
    }
  }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
 /* .special_cell .el-date-editor .el-input__inner{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    height: 44px;
  }*/
</style>
