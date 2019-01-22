<template>
  <!--求职意向-->
  <div class="int_job_all">
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
            <p><span class="left_lab">求职类型</span> <span class="right_msg">全职</span></p>
            <p><span class="left_lab">意向岗位</span> <span class="right_msg">项目经理</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">8001-10000/月</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">贵州贵阳</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">随时</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">暂无备注</span></p>
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
              <span class="edit_lab">求职类型</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.work_nature==1}" @click="have_job">全职</span><span class="choose_cell" :class="{choose_active:this.form.work_nature==0}" @click="wait_job">项目</span></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">意向岗位</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">期望薪资</span><span class="int_job_det fr">面议<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">工作地区</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">预计到岗时间</span><span class="int_job_det fr">请选择<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="content">
          <div class="edit_cell specail_area">
            <span class="edit_lab">备注</span>
          </div>
          <textarea placeholder="这里填写备注内容" name="remark" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="save_job">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "int_job",
      data() {
          return {
            int_job_edit: true,
            form: {
              work_nature: 1
            }
          }
      },
      methods: {
        edit_job() {
          this.int_job_edit = false
        },
        save_job() {
          this.int_job_edit = true
        },
        have_job() {
          this.form.work_nature = 1
        },
        wait_job() {
          this.form.work_nature = 0
        }
      }
    }
</script>

<style scoped>
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 14px;
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
</style>
