<template>
  <!--面试邀请-->
    <div class="resume_invite">
      <div class="com_det_title">
        <div class="content">
          邀请面试
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">应聘职位</span><input type="text" v-model="job"  placeholder="应聘职位">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">联系人</span><input type="text" v-model="contractData.username"  placeholder="如: 张经理、王先生等(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">手机</span><input type="text" maxlength="11" v-model="contractData.phone" placeholder="手机号码(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">座机</span><input type="text" v-model="contractData.tel" placeholder="座机号码">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">QQ</span><input type="text" v-model="contractData.qq" placeholder="QQ">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">邮箱地址</span><input type="text" v-model="contractData.email"  placeholder="邮箱地址">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">面试地点</span><input type="text" v-model="address"  placeholder="必填">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">面试时间</span>
            <el-date-picker
              v-model="time"
              align="right"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">邀请方式</span><span :class="{int_way_active: this.int_way_sign}" class="int_way" @click="sms_way">短信邀请</span><span @click="email_way" :class="{int_way_active: !this.int_way_sign}" class="int_way">邮件邀请</span>
          </div>
        </div>
      </div>
      <div class="tip">
        <div class="content">
          <div class="eval_body_bottom">
            <textarea  name="evaluation" v-model="remind" placeholder="在这里填写用于提醒应聘者的相关事项"></textarea>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="send_int">
          发送邀请
        </div>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "resume_invite",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            int_way_sign: true,
            // 表单信息
            job: '',
            address: '',
            invite_type: 1,
            time: '',
            remind: '',
            contractData: {},
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              }
            },
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
        email_way() {
          this.invite_type = 1;
          this.int_way_sign = false;
        },
        sms_way() {
          this.invite_type = 2;
          this.int_way_sign = true;
        },
        send_int() {
          if (this.job == '') {
            this.$notify.warning({
              title: '提示',
              message: '请输入应聘职位',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.contractData.username == '') {
            this.$notify.warning({
              title: '提示',
              message: '请输入联系人',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.contractData.phone.length < 11) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的手机号',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.address == '') {
            this.$notify.warning({
              title: '提示',
              message: '请输入面试地址',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.time == '') {
            this.$notify.warning({
              title: '提示',
              message: '请输入面试时间',
              showClose: false,
              duration: 1500
            });
            return
          }
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let uid = this.$route.query.uid;
          this.$ajax.post('/company/send-interview',{ cid: companyInfo.id, uid: uid, job: this.job,username: this.contractData.username, tel: this.contractData.tel, phone: this.contractData.phone,qq: this.contractData.qq,
            wx: this.contractData.wx,email: this.contractData.email,address: this.address,invite_type: this.invite_type,time: this.time,remind: this.remind})
            .then((res)=>{
              console.log(res);
              if(res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '发送面试成功',
                  showClose: false,
                  duration: 800
                });
                setTimeout(()=>{
                  this.$router.push({name: 'resume_det',query:{uid: uid}})
                },1000)
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        }
      },
      created() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/company/get-contact',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                this.contractData = res.data;
              }
            })
      }
    }
</script>

<style scoped>
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
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
  .enterp_button{
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 44px;
    text-align: center;
    color: #ffffff;
    background-color: #5082e6;
    font-size: 14px;
  }
  .tip{
    margin-top: 30px;
    background-color: #ffffff;
  }
  .eval_body_bottom{
    text-align: center;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    text-align: left;
    color: #666666;
    line-height: 18px;
  }
  .eval_body_bottom textarea{
    width: 90%;
    min-height: 130px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
    border: none;
  }
  .eval_body_bottom textarea:focus{
    outline:none;
    border: none;
  }
  .eval_body_bottom textarea::placeholder{
    font-size: 14px;
    color: #c2c2cc;
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
  .edit_cell .int_way{
    display: inline-block;
    margin-left: 20px;
    width: 80px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #666666;
    line-height: 32px;
  }
  .edit_cell .int_way_active{
    background: rgba(80,130,230,.1);
    color: #5082e6;
    border: 1px solid #5082e6;
  }
</style>
