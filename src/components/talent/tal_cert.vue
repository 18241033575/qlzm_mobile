<template>
    <div class="tal_cert">
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
          <div class="exp_cell" v-for="(item,index) in this.certData" :key="index">
            <div class="content">
              <div class="exp_cell_box">
                <div class="exp_head">
                  {{item.trantype}}-{{item.tranmajor || ''}}<span :cert-id="item.id" class="fr" @click="certEdit"><img src="/static/images/ic_edit.png" alt="">编辑</span>
                </div>
                <div class="bottom_msg">
                  <p><span class="left_lab">注册情况</span> <span class="right_msg">{{item.tranreg_status}}</span></p>
                  <p><span class="left_lab">增项</span> <span class="right_msg">{{item.tranaddition}}</span></p>
                  <p><span class="left_lab">备注</span> <span class="right_msg">{{item.remark}}</span></p>
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
              <span class="edit_lab">证书类型</span><span class="int_job_det fr" @click="certType">{{this.certData.category || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">证书专业</span><span class="int_job_det fr" @click="certMajor">{{this.certData.major || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell" v-show="certTypeId == 1 || certTypeId == 2">
              <span class="edit_lab">建造师增项</span><span class="int_job_det fr" @click="certAddition">{{this.certData.addition || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab specail_lab">注册情况</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.regState==0}" @click="man_workNature">不限</span><span class="choose_cell" :class="{choose_active:this.regState==1}" @click="ski_workNature">初始</span><span class="choose_cell" :class="{choose_active:this.regState==2}" @click="oth_workNature">转注</span></span>
            </div>
          </div>
        </div>
        <div class="remark">
          <div class="content">
            <div class="edit_cell specail_area">
              <span class="edit_lab">备注</span>
            </div>
            <textarea placeholder="在这里填写备注内容" v-model="remark" name="remark"></textarea>
          </div>
        </div>
        <div class="edit_btn_group" v-if="!this.save_editSign">
          <div class="content">
            <div class="group_box">
              <div class="edit_btn_cell del_btn" @click="cert_del">
                删除
              </div>
              <div class="edit_btn_cell save_btn" @click="certSave">
                保存
              </div>
            </div>
          </div>
        </div>
        <div class="edit_btn_group" v-if="this.save_editSign">
          <div class="content">
            <div class="group_box">
              <div class="save_btn_cell save_btn" @click="certSave">
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
              <img @click="secondBoxBg" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">
              <div v-if="showMsg =='cert_type'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="CertCode">
                {{item.category}}<img v-show="certTypeId == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'cert_major'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="MajorCode">
                {{item.major}}<img v-show="certMajorId == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'cert_add'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="AddCode">
                {{item.major}}<img v-show="certAddId == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "tal_cert",
      data() {
        return {
          save_editSign: true,
          workExpSign: true,
          certData: {},
          editMsg: '',
          regState: 0,
          certTypeId: '0',
          certMajorId: '0',
          certAddId: '0',
          remark: '',
          secondBox: false,
          top_title: '',
          showMsg: '',
          certEdit_id: '',
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },
          value1: '',
          value2: '',
          checked: true,
          CommonData: {},
          certAllData: {}
        }
      },
      methods: {
        add_work_exp() {
          this.save_editSign = true;
          this.workExpSign = false;
          this.editMsg = '添加证书';
          // 时间初始化 、行业性质、工作性质初始化  ；删除功能 和 新增功能
        },
        man_workNature() {
          this.regState = 0
        },
        ski_workNature() {
          this.regState = 1
        },
        oth_workNature() {
          this.regState = 2
        },
        secondBoxBg() {
          this.secondBox = false
        },
        certType() {
          this.secondBox = true;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          this.showMsg = 'cert_type';
          this.CommonData = certData;
          this.top_title = '选择证书类型'
        },
        certMajor() {
          this.secondBox = true;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          this.showMsg = 'cert_major';
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeId) {
              this.CommonData = certData[i].majors;
            }
          }
          this.top_title = '选择证书专业'
        },
        certAddition() {
          this.secondBox = true;
          this.showMsg = 'cert_add';
          this.top_title = '选择增项';
          let certData = JSON.parse(localStorage.getItem('CERT'));
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeId) {
              certData[i].majors.forEach((item,index)=>{
                if (item.id == this.certMajorId) {
                  certData[i].majors.splice(index,1);
                  this.CommonData =  certData[i].majors;
                }
              });
            }
          }
        },
        CertCode(e) {
          let certId = e.currentTarget.getAttribute('city-id');
          this.certTypeId = certId;
          this.secondBox = false;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == certId) {
              this.certData.category = certData[i].category;
            }
          }
        },
        MajorCode(e) {
          let majorId = e.currentTarget.getAttribute('city-id');
          this.certMajorId = majorId;
          this.secondBox = false;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeId) {
              for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                if (certData[i].majors[j].id == majorId) {
                  this.certData.major = certData[i].majors[j].major
                }
              }
            }
          }
        },
        AddCode(e) {
          let addId = e.currentTarget.getAttribute('city-id');
          this.certAddId = addId;
          this.secondBox = false;
          let certData = JSON.parse(localStorage.getItem('CERT'));
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeId) {
              for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                if (certData[i].majors[j].id == addId) {
                  this.certData.addition = certData[i].majors[j].major
                }
              }
            }
          }
        },
        certEdit(e) {
          let certEditId = e.currentTarget.getAttribute('cert-id');
          this.save_editSign = false;
          this.certEdit_id = certEditId;
          this.workExpSign = false;
          this.editMsg = '编辑证书';

          for (let i = 0,len = this.certAllData.length; i < len; i++) {
            if (certEditId == this.certAllData[i].id) {
              this.certTypeId = this.certAllData[i].type;
              this.certMajorId = this.certAllData[i].major;
              this.remark = this.certAllData[i].remark;
              this.regState = this.certAllData[i].reg_status;
            }
          }
          let certData = JSON.parse(localStorage.getItem('CERT'));
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeId) {
              this.certData.category = certData[i].category;
              for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                if (certData[i].majors[j].id == this.certMajorId) {
                  this.certData.major = certData[i].majors[j].major
                }
              }
            }
          }
        },
        certSave() {
          if (this.certTypeId == '0') {
            this.$notify.warning({
              title: '提示',
              message: '请选择证书类型',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.certMajorId == '0') {
            this.$notify.warning({
              title: '提示',
              message: '请选择证书专业',
              showClose: false,
              duration: 1500
            });
            return
          }

          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/certificate',{type: this.certTypeId,major: this.certMajorId,reg_status: this.regState,remark: this.remark,id:this.certEdit_id,uid: userInfo.id,addition: this.certAddId})
            .then((res)=>{
              if (res.data.state == 200) {
                this.workExpSign = true;
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 1500
                });
                this.getCert();
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
        cert_del() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/certificate',{state: -1, type: this.certTypeId,major: this.certMajorId,reg_status: this.regState,remark: this.remark,id:this.certEdit_id,uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.workExpSign = true;
                this.$notify.success({
                  title: '提示',
                  message: '删除成功',
                  showClose: false,
                  duration: 1500
                });
                this.getCert();
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
        getCert() {
          // 证书数据添加到缓存中
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/certificate',{params: {uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                this.certAllData = res.data;
                res.data.forEach(function (item,ids) {
                  if (item.reg_status == 0) {
                    item.tranreg_status = '不限'
                  } else if (item.reg_status == 1) {
                    item.tranreg_status = '初始'
                  } else {
                    item.tranreg_status = '转注'
                  }
                  for(let i = 0,len = certData.length;i < len;i++) {
                    if (item.type == certData[i].id ) {
                      item.trantype = certData[i].category;
                      for(let j = 0,mlen = certData[i].majors.length; j < mlen; j++) {
                        if (item.major == certData[i].majors[j].id) {
                          item.tranmajor = certData[i].majors[j].major
                        }
                        if (item.addition == certData[i].majors[j].id) {
                          item.tranaddition = certData[i].majors[j].major
                        }
                      }
                    }
                  }
                });
                this.certData = res.data;
              }
            });
        }
      },
      created() {
        this.getCert();
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .tal_cert .edit_cell .specail_lab{
    width: 65px;
  }
</style>
