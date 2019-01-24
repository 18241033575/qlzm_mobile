<template>
    <div class="tal_work" :class="{stop_scroll: this.openState}">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
                  {{item.company}}<span :work-id="item.id" class="fr"><img src="/static/images/ic_add_item@2x.png" alt="">编辑</span>
                </div>
                <div class="bottom_msg">
                  <p><span class="left_lab">职位名称</span> <span class="right_msg">{{item.job}}</span></p>
                  <p><span class="left_lab">行业性质</span> <span class="right_msg">{{item.industry}}</span></p>
                  <p><span class="left_lab">工作性质</span> <span class="right_msg">{{item.nature}}</span></p>
                  <p><span class="left_lab">税前月薪(元)</span> <span class="right_msg">{{item.salary}}</span></p>
                  <p><span class="left_lab">在职时间</span> <span class="right_msg">{{item.start_time + '-' + item.end_time}}</span></p>
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
              <span class="edit_lab">公司名称</span><input type="text"  placeholder="公司名称">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">职位名称</span><input type="text" placeholder="职位名称">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">税前月薪(元)</span><input type="text"  placeholder="税前月薪">
            </div>
            <div class="edit_cell special_cell">
              <span class="edit_lab">工程周期</span>
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
                <el-checkbox v-model="checked">至今</el-checkbox>
              </div>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">行业性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.jobNature==1}" @click="is_jobNature">建筑业</span><span class="choose_cell" :class="{choose_active:this.jobNature==0}" @click="isn_jobNature">非建筑业</span></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">工作性质</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.workNature==1}" @click="man_workNature">管理岗</span><span class="choose_cell" :class="{choose_active:this.workNature==2}" @click="ski_workNature">技术岗</span><span class="choose_cell" :class="{choose_active:this.workNature==3}" @click="oth_workNature">其他</span></span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div class="content">
            <div class="edit_cell specail_area">
              <span class="edit_lab">工作职责</span>
            </div>
            <textarea placeholder="在这里填写职责内容" name="remark" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="edit_btn_group">
          <div class="content">
            <div class="group_box">
              <div class="edit_btn_cell del_btn">
                删除
              </div>
              <div class="edit_btn_cell save_btn">
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
    export default {
        name: "tal_work",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            workData: {},
            workEditData: {},
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
          this.editMsg = '添加工作经历'
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
      },
      created() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/workexp',{params: {uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                console.log(res);
                this.workData = res.data;
              }
            })
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
</style>
