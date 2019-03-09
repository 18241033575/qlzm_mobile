<template>
  <div class="user_reg">
    <div class="com_det_title">
      <div class="content">
        人才注册
      </div>
    </div>
    <el-input class="common_input" v-model="phone" placeholder="请输入手机号码"></el-input>
    <el-input class="common_input" type="password" v-model="password" placeholder="请输入密码"></el-input>
    <el-input class="common_input" type="password" v-model="password_confirm" placeholder="重复密码"></el-input>
    <div class="sms_group">
      <el-input class="common_input_sms fl" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode" @click="getSmsCode">获取验证码</el-button>
    </div>
    <el-button class="common_btn" @click="tal_reg">注册</el-button>
    <p>已有账号?&nbsp;<router-link :to="{name:'login'}">立即登录</router-link></p>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%">
      <span>{{showMsg}}</span>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "reg_log",
      data() {
        return {
          dialogVisible: false,
          reqSuc: false,
          showMsg: '',
          phone: '',
          password: '',
          password_confirm: '',
          sms_code: '',
        }
      },
      methods: {
        tal_reg() {
          this.$ajax.post('/member/register',{phone: this.phone,password: this.password,password_confirm: this.password_confirm,sms_code: parseInt(this.sms_code),type: 1,member: 1})
            .then((res)=>{
              if (res.data.state != 400) {
                this.reqSuc = true;
                this.dialogVisible = true;
                this.showMsg = '注册成功';
              }
            })
        },
        getSmsCode() {
          this.$ajax.get('/sms',{params: {type : 2,phone: this.phone,member: 1}})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$message({
                  message: '获取验证码成功',
                  type: 'success'
                })
              }
            })
        },
        handleClose() {
          this.dialogVisible = false;
          if (this.reqSuc == true){
            this.$router.push({name: 'login',query:{reg: 'tal'}})
          }
        },
      }
    }
</script>

<style>
  .user_reg{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    text-align: center;
  }
  .user_reg h3{
    padding-top: 60px;
    line-height: 30px;
  }

  .user_reg p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .user_reg p a{
    color: #ff8236;
    text-decoration: none;
  }
</style>
