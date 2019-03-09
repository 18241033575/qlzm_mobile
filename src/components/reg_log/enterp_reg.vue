<template>
  <!--建筑企业注册-->
    <div class="enterp_reg">
      <div class="com_det_title">
        <div class="content">
          建筑企业注册
        </div>
      </div>
      <el-input class="common_input" v-model="company" placeholder="企业名称"></el-input>
      <el-input class="common_input" v-model="phone" placeholder="手机号码"></el-input>
      <el-input class="common_input" v-model="password" placeholder="设置密码"></el-input>
      <el-input class="common_input" v-model="password_confirm" placeholder="重复密码"></el-input>
      <div class="sms_group">
        <el-input class="common_input_sms fl" v-model="sms_code" placeholder="请输入验证码"></el-input><el-button class="fl get_smsCode" @click="getSmsCode">获取验证码</el-button>
      </div>
      <el-button class="common_btn" @click="ent_reg">注册</el-button>
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
        name: "enterp_reg",
      data() {
          return {
            dialogVisible: false,
            reqSuc: false,
            showMsg: '',
            company: '',
            phone: '',
            password: '',
            password_confirm: '',
            sms_code: ''
          }
      },
      methods: {
        ent_reg() {
          this.$ajax.post('/member/register',{company: this.company,phone: this.phone,password: this.password,password_confirm: this.password_confirm,sms_code: parseInt(this.sms_code),type: 2,member: 2})
            .then((res)=>{
              if (res.data.state != 400) {
                this.reqSuc = true;
                this.dialogVisible = true;
                this.showMsg = '注册成功';
              }
            })
        },
        getSmsCode() {
          this.$ajax.get('/sms',{params: {type : 2,phone: this.phone,member: 2}})
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
            this.$router.push({name: 'login',query:{reg: 'ent'}})
          }
        },
      }
    }
</script>

<style scoped>
  .enterp_reg{
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    text-align: center;
  }
  .enterp_reg p{
    margin-top: 50px;
    font-size: 14%;
    color: #919199;
  }
  .enterp_reg p a{
    color: #ff8236;
    text-decoration: none;
  }
</style>
