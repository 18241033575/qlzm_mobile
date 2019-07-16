<template>
  <!-- 申请技能贷 -->
    <div class="loan_det">
      <div class="com_det_title">
        <div class="content">
          申请技能贷
        </div>
      </div>
      <div class="apply_form">
        <div class="cell_box">
          <div class="cell">
            <div class="lab">姓名<i class="necessary">*</i></div><input v-model="skills_form.name" placeholder="您的真实姓名" maxlength="10" type="text">
          </div>
          <div class="cell">
            <div class="lab">手机号码<i class="necessary">*</i></div><input readonly v-model="skills_form.phone" maxlength="11" placeholder="您的手机号码" type="text">
          </div>
          <div class="cell">
            <div class="lab">身份证号码</div><input v-model="skills_form.id_card" maxlength="18" placeholder="身份证号码" type="text">
          </div>
          <div class="cell">
            <div class="lab">拥有的证书</div><input v-model="skills_form.cert" maxlength="50" placeholder="拥有的证书" type="text">
          </div>
          <div class="cell">
            <div class="lab">备注</div><textarea v-model="skills_form.remark" maxlength="200" placeholder="备注"></textarea>
          </div>
        </div>
        <div class="apply_btn">
          <span @click="submit">提交申请</span>
        </div>
      </div>
      <div class="layer_box" v-show="successSign">
        <div class="msg_box">
          <img src="/static/images/ic_m_success@2x.png" alt="">
          <p>{{successMsg}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "loan_det",
      data() {
          return{
            skills_form:{
              name: '',
              phone: '',
              id_card: '',
              cert: '',
              remark: ''
            },
            successSign: false,
            successMsg: ''
          }
      },
      methods:{
        submit(){
          let space = new RegExp(/\s+/g);
          if (this.skills_form.name === ''){
            this.$notify.error({
              title: '提示',
              message: '名字不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (space.test(this.skills_form.name)){
            this.$notify.error({
              title: '提示',
              message: '名字中不能有空格',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.skills_form.phone)){
            this.$notify.error({
              title: '提示',
              message: '手机号有误',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$ajax.post('/skills_loan/store',this.skills_form)
            .then((res)=>{
                if (res.data.state == 200){
                  this.successSign = true;
                  this.successMsg = res.data.msg;
                  setTimeout(()=>{
                    this.$router.push({name: 'skills_loan'})
                  },3000);
                  this.$indicator.close();
                } else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500
                  });
                  this.$indicator.close();
                }
            })
        }
      },
      created() {
          this.skills_form.name = this.$route.query.name;
          this.skills_form.phone = this.$route.query.phone;
          if (!this.skills_form.phone) {
            this.$router.push({name: 'login'})
          }
      }
    }
</script>

<style scoped>
  .apply_form{
    display: inline-block;
    width: 100%;
    height: calc(100vh - 45px);
    background-color: #ffffff;
  }
  .cell_box{
    margin: 0 auto;
    width: 92%;
  }
  .cell{
    display: flex;
    margin-top: 20px;
  }
  .lab{
    width: 90px;
    line-height: 36px;
    font-size: 14px;
    color: #333333;
  }
  .cell input, .cell textarea{
    flex-grow: 1;
    padding-left: 12px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #DCDCDC;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .cell textarea{
    min-height: 100px;
  }
  .necessary{
    color: #ff4b4b;
  }
  .apply_btn{
    margin-top: 30px;
    text-align: center;
  }
  .apply_btn span{
    display: inline-block;
    width: 230px;
    height: 42px;
    line-height: 42px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #fff;
    font-size: 14px;
    color: #ffffff;
    background: linear-gradient(90deg,rgba(169,122,255,1) 0%,rgba(74,134,254,1) 100%);
    -webkit-border-radius: 21px;
    -moz-border-radius: 21px;
    border-radius: 21px;
  }
  /* 弹层 */
  .layer_box{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.4);
  }
  .msg_box{
    margin: 0 auto;
    width: 92%;
    height: 160px;
    background-color: #ffffff;
    text-align: center;
    font-size: 12px;
    color: #333333;
  }
  .msg_box img{
    margin: 18px 0;
    width: 65px;
    height: 65px;
  }
  .msg_box p{
    margin: 0 auto;
    width: 80%;
    line-height: 18px;
  }
</style>
