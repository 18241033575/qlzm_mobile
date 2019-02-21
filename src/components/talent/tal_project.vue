<template>
  <div class="tal_project_all" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
                <p><span class="left_lab">个人业绩</span> <span class="right_msg">{{item.duties}}</span></p>
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
            <span class="edit_lab">项目规模(元)</span><input type="text" v-model="proAllData.scale" placeholder="项目规模">
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
                :picker-options="pickerOptions1">
              </el-date-picker>
              <el-date-picker
                v-model="value2"
                :disabled="checked"
                align="right"
                type="date"
                placeholder="选择日期"
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
      <div class="edit_btn_group">
        <div class="content">
          <div class="group_box">
            <div class="edit_btn_cell del_btn">
              删除
            </div>
            <div class="edit_btn_cell save_btn" @click="pro_save">
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
    name: "tal_project",
    components: {
      main_menu,
      menu_list_pic
    },
    data() {
      return {
        /*总菜单状态*/
        openState: false,
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
        this.editMsg = '添加项目经验'
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
            }
          })
      },
      pro_edit(e) {
        let proId = e.currentTarget.getAttribute('projcet-id');
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
      }
    },
    created() {
      let userInfo = JSON.parse(localStorage.getItem('USER'));
      this.$ajax.get('/resume/projectexp',{params: {uid: userInfo.id}})
        .then((res)=>{
          console.log(res);
          if (res.data.state != 400) {
            this.projcetData = res.data
          }
        })
    }
  }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
</style>
