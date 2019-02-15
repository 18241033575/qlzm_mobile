<template>
  <div class="tal_education" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
                {{item.school}}<span :edu-data="item.id" class="fr"><img src="/static/images/ic_edit.png" alt="">编辑</span>
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
            <span class="edit_lab">学历</span><span class="int_job_det fr">{{0 || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">专业</span><input v-model="operaData.major" type="text" placeholder="专业">
          </div>
          <div class="edit_cell special_cell">
            <span class="edit_lab">在校时间</span>
            <div class="block">
              <!--<span class="demonstration">带快捷选项</span>-->
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-date-picker
                v-model="value1"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <!--<el-checkbox v-model="checked">至今</el-checkbox>-->
            </div>
          </div>
        </div>
      </div>
      <div class="edit_btn_group">
        <div class="content">
          <div class="group_box">
            <div class="edit_btn_cell del_btn">
              删除
            </div>
            <div class="edit_btn_cell save_btn" @click="addEdu">
              保存
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
  import {transEducation} from '../../../static/js/common.js'
  export default {
    name: "tal_education",
    components: {
      main_menu,
      menu_list_pic
    },
    data() {
      return {
        /*总菜单状态*/
        openState: false,
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
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        checked: true
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
      add_work_exp() {
        this.workExpSign = false;
        this.editMsg = '添加教育经历'
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
      addEdu() {
        this.$ajax.post('/resume/eduexp',this.operaData)
          .then((res)=>{
            console.log(res);
          })
      }
    },
    created() {
      let userInfo = JSON.parse(localStorage.getItem('USER'));
      this.$ajax.get('/resume/eduexp',{params: {uid: userInfo.id}})
        .then((res)=>{
          if (res.data.state != 400) {
            console.log(res);
            transEducation(res.data);
            this.eduData = res.data;
            // this.certData = res.data;
          }
        })
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
