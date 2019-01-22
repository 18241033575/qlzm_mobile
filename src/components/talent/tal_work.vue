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
              <span class="edit_lab">在职时间</span>
              <div class="block">
                <!--<span class="demonstration">带快捷选项</span>-->
                <el-date-picker
                  v-model="value2"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
              <div class="block">
                <!--<span class="demonstration">带快捷选项</span>-->
                <el-date-picker
                  v-model="value1"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
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
      </div>
    </div>
</template>

<script>
    export default {
        name: "tal_work",
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
          }
      },
      methods: {
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
      }
    }
</script>

<style scoped>
  .add_item{
    margin-top: 10px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    background-color: #ffffff;
  }
  .add_item img{
    margin-right: 5px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .add_item span{
    font-size: 14px;
    color: #919199;
  }
  .exp_list{
    margin-top: 10px;
  }
  .exp_cell{
    display: flex;
    padding: 20px 0;
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .exp_head{
    justify-self: flex-end;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .exp_head img{
    margin-right: 5px;
    width: 12px;
    height: 14px;
    vertical-align: middle;
  }
  .exp_head span{
    font-weight: normal;
    color: #919199;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
  }
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .exp_edit_cell{

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
</style>
