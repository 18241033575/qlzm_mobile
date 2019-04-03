<template>
  <div class="tal_project_all">
    <!--项目经验列表-->
    <div class="tal_work_msg" v-show="this.workExpSign">
      <div class="com_det_title">
        <div class="content">
          项目经验
        </div>
      </div>
      <div class="add_item" @click="add_work_exp">
        <p><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加项目经验</span></p>
      </div>
      <div class="exp_list">
        <div class="exp_cell" v-for="(item,index) in this.projcetData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.project}}<span @click="pro_edit" :projcet-id="item.id" class="fr"><img src="/static/images/ic_edit.png" alt="">编辑</span>
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">项目规模</span> <span class="right_msg">{{item.scale}}万</span></p>
                <p><span class="left_lab">工程周期</span> <span class="right_msg">{{item.start_time + '-' + (item.end_time == 0?'至今':item.end_time)}}</span></p>
                <p><span class="left_lab">项目地点</span> <span class="right_msg">{{item.address}}</span></p>
                <p><span class="left_lab">个人任职</span> <span class="right_msg">{{item.job}}</span></p>
                <p><span class="left_lab">项目介绍</span> <span class="right_msg">{{item.introduction}}</span></p>
                <p><span class="left_lab">个人业绩</span> <span class="right_msg pro_msg">{{item.duties}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--编辑项目经验-->
    <div class="tal_work_edit" v-show="!this.workExpSign">
      <div class="com_det_title">
        <div class="content">
          {{editMsg}}
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">项目名称</span><input type="text" v-model="proAllData.project" placeholder="项目名称">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">项目地点</span><input type="text" v-model="proAllData.address" placeholder="项目地点">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">项目规模(万)</span><input type="text" v-model="proAllData.scale" placeholder="项目规模">
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
                :disabled="checked"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-checkbox v-model="checked">至今</el-checkbox>
            </div>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">个人职位</span><input v-model="proAllData.job" type="text" placeholder="个人职位">
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="content">
          <div class="edit_cell specail_area">
            <span class="edit_lab">项目介绍</span>
          </div>
          <textarea placeholder="简单的描述一下这个项目吧" v-model="proAllData.introduction"></textarea>
        </div>
      </div>
      <div class="remark">
        <div class="content">
          <div class="edit_cell specail_area">
            <span class="edit_lab">个人业绩</span>
          </div>
          <textarea placeholder="在这里填写你在项目中的业绩" v-model="proAllData.duties"></textarea>
        </div>
      </div>
      <div class="edit_btn_group" v-if="!this.save_editSign">
        <div class="content">
          <div class="group_box">
            <div class="edit_btn_cell del_btn" @click="pro_del">
              删除
            </div>
            <div class="edit_btn_cell save_btn" @click="pro_save">
              保存
            </div>
          </div>
        </div>
      </div>
      <div class="edit_btn_group" v-if="this.save_editSign">
        <div class="content">
          <div class="group_box">
            <div class="save_btn_cell save_btn" @click="pro_save">
              保存
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tal_project",
    data() {
      return {
        save_editSign: true,
        projcetData: {},
        workExpSign: true,
        editMsg: '',
        jobNature: 0,
        workNature: 1,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        checked: true,
        proAllData: {
          project: '',
          scale: '',
          address: '',
          job: '',
          introduction: '',
          duties: ''
        },
        pro_Id: ''
      }
    },
    methods: {
      add_work_exp() {
        this.save_editSign = true;
        this.workExpSign = false;
        this.editMsg = '添加项目经验';
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
      pro_save() {
        this.proAllData.project = this.proAllData.project.replace(/^\s*|\s*$/g,"");
        if (this.proAllData.project == '') {
          this.$notify.warning({
            title: '提示',
            message: '项目名称不能为空',
            showClose: false,
            duration: 1500
          });
          return
        }
        this.proAllData.address = this.proAllData.address.replace(/^\s*|\s*$/g,"");
        if (this.proAllData.address == '') {
          this.$notify.warning({
            title: '提示',
            message: '项目地点不能为空',
            showClose: false,
            duration: 1500
          });
          return
        }
        let reg = /^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*))$/;
        if (!reg.test(JSON.parse(this.proAllData.scale))) {
          this.$notify.warning({
            title: '提示',
            message: '请输入正确的项目规模',
            showClose: false,
            duration: 1500
          });
          return
        }
        this.proAllData.job = this.proAllData.job.replace(/^\s*|\s*$/g,"");
        if (this.proAllData.job == '') {
          this.$notify.warning({
            title: '提示',
            message: '个人职位不能为空',
            showClose: false,
            duration: 1500
          });
          return
        }
        if (this.checked) {
          this.proAllData.end_time = 0;
        }else {
          this.proAllData.end_time = transtime(this.value2);
        }
        this.proAllData.start_time = transtime(this.value1);
        if (this.value1 == '') {
          this.$notify.warning({
            title: '提示',
            message: '请选择开始时间',
            showClose: false,
            duration: 1500
          });
          return
        }
        if (this.value2 == '' && this.value2 != 0) {
          this.$notify.warning({
            title: '提示',
            message: '请选择结束时间',
            showClose: false,
            duration: 1500
          });
          return
        }
        this.proAllData.id = this.pro_Id;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.proAllData.uid = userInfo.id;
        this.$ajax.post('/resume/projectexp',this.proAllData)
          .then((res)=>{
            if (res.data.state == 200) {
              this.workExpSign = true;
              this.$notify.success({
                title: '提示',
                message: '保存成功',
                showClose: false,
                duration: 1500
              });
              this.getPro();
            }else {
              this.$notify.error({
                title: '提示',
                message: res.data.msg,
                showClose: false,
                duration: 1500
              });
            }
          })
      },
      pro_del() {
        this.proAllData.state = -1;
        if (this.checked) {
          this.proAllData.end_time = 0;
        }else {
          this.proAllData.end_time = JSON.stringify(this.value2).substring(1,11);
        }
        this.proAllData.start_time = JSON.stringify(this.value1).substring(1,11);
        this.proAllData.id = this.pro_Id;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.proAllData.uid = userInfo.id;
        this.$ajax.post('/resume/projectexp',this.proAllData)
          .then((res)=>{
            if (res.data.state == 200) {
              this.workExpSign = true;
              this.$notify.success({
                title: '提示',
                message: '删除成功',
                showClose: false,
                duration: 1500
              });
              this.getPro();
            }else {
              this.$notify.error({
                title: '提示',
                message: res.data.msg,
                showClose: false,
                duration: 1500
              });
            }
          })
      },
      pro_edit(e) {
        let proId = e.currentTarget.getAttribute('projcet-id');
        this.save_editSign = false;
        this.pro_Id = proId;
        this.editMsg = '编辑项目经验';
        this.workExpSign = false;
        for (let i = 0,len = this.projcetData.length; i < len; i++) {
          if (this.projcetData[i].id == proId) {
            this.value1 = this.projcetData[i].start_time;
            if (this.projcetData[i].end_time == 0) {
              this.checked = true;
            } else {
              this.value2 = this.projcetData[i].end_time;
              this.checked = false;
            }
            this.proAllData.project = this.projcetData[i].project;
            this.proAllData.scale = this.projcetData[i].scale;
            this.proAllData.address = this.projcetData[i].address;
            this.proAllData.job = this.projcetData[i].job;
            this.proAllData.introduction = this.projcetData[i].introduction;
            this.proAllData.duties = this.projcetData[i].duties;
          }
        }
      },
      getPro() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/resume/projectexp',{params: {uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.projcetData = res.data;
            }
          })
      }
    },
    created() {
      this.getPro();
    }
  }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .bottom_msg .pro_msg{
    word-break: break-all;
    overflow: auto;
  }
</style>
