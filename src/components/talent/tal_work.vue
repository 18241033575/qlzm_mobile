<template>
    <div class="tal_work">
      <!--工作经历列表-->
      <div class="tal_work_msg" v-show="this.workExpSign">
        <div class="com_det_title">
          <div class="content">
            工作经历
          </div>
        </div>
        <div class="add_item" @click="add_work_exp">
          <p><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加工作经历</span></p>
        </div>
        <div class="exp_list">
          <div class="exp_cell" v-for="(item,index) in this.workData" :key="index">
            <div class="content">
              <div class="exp_cell_box">
                <div class="exp_head">
                  {{item.company}}<span @click="workexp_edit" :work-id="item.id" class="fr"><img src="/static/images/ic_edit.png" alt="">编辑</span>
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
      </div>
      <!--编辑工作经历-->
      <div class="tal_work_edit" v-show="!this.workExpSign">
        <div class="com_det_title">
          <div class="content">
            {{editMsg}}
          </div>
        </div>
        <div class="exp_edit_list">
          <div class="content">
            <div class="edit_cell">
              <span class="edit_lab">公司名称</span><input type="text" v-model="workexpAllData.company" placeholder="公司名称">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">职位名称</span><input type="text" v-model="workexpAllData.job" placeholder="职位名称">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">税前月薪(元)</span><input type="text" v-model="workexpAllData.salary" placeholder="税前月薪">
            </div>
            <div class="edit_cell special_cell">
              <span class="edit_lab">在职时间</span>
              <div class="block">
                <!--<span class="demonstration">带快捷选项</span>-->
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
                  :disabled="checked"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1">
                </el-date-picker>
                <el-checkbox v-model="checked">至今</el-checkbox>
              </div>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">行业性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.jobNature==1}" @click="is_jobNature">建筑行业</span><span class="choose_cell" :class="{choose_active:this.jobNature==0}" @click="isn_jobNature">非建筑行业</span></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab specail_lab">工作性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.workNature==1}" @click="man_workNature">管理岗</span><span class="choose_cell" :class="{choose_active:this.workNature==2}" @click="ski_workNature">技术岗</span><span class="choose_cell" :class="{choose_active:this.workNature==3}" @click="oth_workNature">其他</span></span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div class="content">
            <div class="edit_cell specail_area">
              <span class="edit_lab">工作职责</span>
            </div>
            <textarea placeholder="在这里填写职责内容" maxlength="500" v-model="workexpAllData.duties" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="edit_btn_group" v-if="!this.save_editSign">
          <div class="content">
            <div class="group_box">
              <div class="edit_btn_cell del_btn" @click="workexp_del">
                删除
              </div>
              <div class="edit_btn_cell save_btn" @click="workexp_save">
                保存
              </div>
            </div>
          </div>
        </div>
        <div class="edit_btn_group" v-if="this.save_editSign">
          <div class="content">
            <div class="group_box">
              <div class="save_btn_cell save_btn" @click="workexp_save">
                保存
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {transtime} from '../../../static/js/common.js'
    export default {
      name: "tal_work",
      data() {
          return {
            save_editSign: true,
            workData: {},
            workEditData: {},
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
            workexpAllData: {
              company: '',
              job: '',
              salary: '',
              duties: ''
            },
            workexp_Id: '',
            tranJobNature: '',
            tranWorkNature: ''
          }
      },
      methods: {
        add_work_exp() {
          this.save_editSign = true;
          this.workExpSign = false;
          this.editMsg = '添加工作经历';
          this.workexpAllData.company = '';
          this.workexpAllData.job = '';
          this.workexpAllData.salary = '';
          this.workexpAllData.duties = '';
          // 时间初始化 、行业性质、工作性质初始化

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
        workexp_save() {
          delete this.workexpAllData.state;
          this.workexpAllData.company = this.workexpAllData.company.replace(/^\s*|\s*$/g,"");
          if (this.workexpAllData.company == '') {
            this.$notify.warning({
              title: '提示',
              message: '公司名称不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.workexpAllData.job = this.workexpAllData.job.replace(/^\s*|\s*$/g,"");
          if (this.workexpAllData.job == '') {
            this.$notify.warning({
              title: '提示',
              message: '职位名称不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          let reg = /^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
          if (!reg.test(this.workexpAllData.salary)) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的税前月薪',
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
          if (!this.checked && (transtime(this.value2) == 'null')) {
            this.$notify.warning({
              title: '提示',
              message: '请输入结束时间',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.checked) {
            this.workexpAllData.end_time = 0;
          }else {
            this.workexpAllData.end_time = transtime(this.value2);
          }
          this.workexpAllData.start_time = transtime(this.value1);
          this.workexpAllData.nature = this.workNature;
          this.workexpAllData.industry = this.jobNature;
          this.workexpAllData.id = this.workexp_Id;
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.workexpAllData.uid = userInfo.id;
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$ajax.post('/resume/workexp',this.workexpAllData)
            .then((res)=>{
              if (res.data.state == 200) {
                this.workExpSign = true;
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 1500
                });
                this.workExp();
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
        workexp_del() {
          this.workexpAllData.state = -1;
          if (transtime(this.value1) == 0) {
            this.$notify.warning({
              title: '提示',
              message: '请输入开始时间',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (!this.checked && transtime(this.value2) == 0) {
            this.$notify.warning({
              title: '提示',
              message: '请输入结束时间',
              showClose: false,
              duration: 1500
            });
            return
          }

          if (this.checked) {
            this.workexpAllData.end_time = 0;
          }else {
            this.workexpAllData.end_time = JSON.stringify(this.value2).substring(1,11);
          }
          this.workexpAllData.start_time = JSON.stringify(this.value1).substring(1,11);
          this.workexpAllData.nature = this.workNature;
          this.workexpAllData.industry = this.jobNature;
          this.workexpAllData.id = this.workexp_Id;
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.workexpAllData.uid = userInfo.id;
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$ajax.post('/resume/workexp',this.workexpAllData)
            .then((res)=>{
              if (res.data.state == 200) {
                this.workExpSign = true;
                this.$notify.success({
                  title: '提示',
                  message: '删除成功',
                  showClose: false,
                  duration: 1500
                });
                this.workExp();
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
        workexp_edit(e) {
          let workexpId = e.currentTarget.getAttribute('work-id');
          this.save_editSign = false;
          this.workexp_Id = workexpId;
          this.editMsg = '编辑工作经历';
          this.workExpSign = false;
          for (let i = 0,len = this.workData.length; i < len; i++) {
            if (this.workData[i].id == workexpId) {
              this.value1 = this.workData[i].start_time;
              if (this.workData[i].end_time == 0 || this.workData[i].end_time == '至今') {
                this.checked = true;
              } else {
                this.value2 = this.workData[i].end_time;
                this.checked = false;
              }
              this.workexpAllData.company = this.workData[i].company;
              this.workexpAllData.job = this.workData[i].job;
              this.workexpAllData.salary = this.workData[i].salary;
              this.workexpAllData.duties = this.workData[i].duties;
              this.workNature = this.workData[i].nature;
              this.jobNature = this.workData[i].industry;
            }
          }
        },
        workExp() {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/workexp',{params: {uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                this.workData = res.data;
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
              this.$indicator.close();
            })
        },
      },
      created() {
          this.workExp();
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .tal_work .edit_cell .specail_lab{
    width: 65px;
  }
</style>
