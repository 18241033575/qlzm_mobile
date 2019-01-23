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
        <div class="exp_cell">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                贵州知商网络开发有限公司<span class="fr"><img src="/static/images/ic_add_item@2x.png" alt="">编辑</span>
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">职位</span> <span class="right_msg">项目经理</span></p>
                <p><span class="left_lab">联系人</span> <span class="right_msg">王先生</span></p>
                <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
                <p><span class="left_lab">座机</span> <span class="right_msg">0851-8595321</span></p>
                <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
                <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
                <p><span class="left_lab">面试地址</span> <span class="right_msg">贵州省贵阳市南明区花果园财富广场1栋8楼</span></p>
                <p><span class="left_lab">提醒事项</span> <span class="right_msg">亲爱的应聘者您好，根据公司的要求你需要自
带一份纸质简历前来应聘哦！</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="exp_cell">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                贵州知商网络开发有限公司<span class="fr"><img src="/static/images/ic_edit.png" alt="">编辑</span>
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">职位</span> <span class="right_msg">项目经理</span></p>
                <p><span class="left_lab">联系人</span> <span class="right_msg">王先生</span></p>
                <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
                <p><span class="left_lab">座机</span> <span class="right_msg">0851-8595321</span></p>
                <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
                <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
                <p><span class="left_lab">面试地址</span> <span class="right_msg">贵州省贵阳市南明区花果园财富广场1栋8楼</span></p>
                <p><span class="left_lab">提醒事项</span> <span class="right_msg">亲爱的应聘者您好，根据公司的要求你需要自
带一份纸质简历前来应聘哦！</span></p>
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
            <span class="edit_lab">毕业院校</span><input type="text" placeholder="毕业院校">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">项目地点</span><input type="text" placeholder="项目地点">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">专业</span><input type="text" placeholder="专业">
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
              <el-checkbox v-model="checked">至今</el-checkbox>
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
            <div class="edit_btn_cell save_btn">
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
    name: "tal_education",
    data() {
      return {
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
    }
  }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
</style>
