<template>
    <div class="tal_cert">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <!--证书列表-->
      <div class="tal_work_msg" v-show="this.workExpSign">
        <div class="com_det_title">
          <div class="content">
            建筑行业证书
          </div>
        </div>
        <div class="add_item" @click="add_work_exp">
          <p><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加证书</span></p>
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
              <span class="edit_lab">证书类型</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">证书专业</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">建造师增项</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">注册情况</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.workNature==1}" @click="man_workNature">不限</span><span class="choose_cell" :class="{choose_active:this.workNature==2}" @click="ski_workNature">初始</span><span class="choose_cell" :class="{choose_active:this.workNature==3}" @click="oth_workNature">转注</span></span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div class="content">
            <div class="edit_cell specail_area">
              <span class="edit_lab">备注</span>
            </div>
            <textarea placeholder="在这里填写备注内容" name="remark"></textarea>
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
        name: "tal_cert",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
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
          this.editMsg = '编辑证书'
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
