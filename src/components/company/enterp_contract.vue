<template>
  <!--联系信息-->
    <div class="enterp_contract">
      <div class="com_det_title">
        <div class="content">
          联系信息
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">联系人</span><input type="text" maxlength="15" v-model="contractData.username"  placeholder="如: 张经理、王先生等(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">手机号码</span><input type="text" maxlength="11" :onkeypress="onlyNum1()" v-model="contractData.phone" placeholder="手机号码(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">座机号码</span><input type="text" maxlength="20" :onkeypress="onlyNum2()" v-model="contractData.tel" placeholder="座机号码">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">微信</span><input type="text" maxlength="20" v-model="contractData.wx" placeholder="微信">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">QQ</span><input type="text" maxlength="20" :onkeypress="onlyNum3()" v-model="contractData.qq" placeholder="QQ">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">电子邮箱</span><input type="text" maxlength="20" v-model="contractData.email"  placeholder="电子邮箱">
          </div>
        </div>
      </div>
      <div class="enterp_button" @click="save_contract">
        保存
      </div>
    </div>
</template>

<script>
    export default {
      name: "enterp_contract",
      data () {
        return {
          contractData: {}
        }
      },
      methods: {
        save_contract() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.contractData.cid = companyInfo.id;
          if (this.contractData.username == undefined || this.contractData.username == '') {
            this.$notify.warning({
              title: '提示',
              message: '联系人不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.contractData.phone == undefined || this.contractData.phone.length < 11) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的手机号码',
              showClose: false,
              duration: 1500
            });
            return
          }
          // 邮箱验证
          let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
          if (this.contractData.email != '' && !re.test(this.contractData.email)) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的邮箱地址',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$ajax.post('/company/contact-set', this.contractData)
            .then((res)=>{
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 800
                });
                setTimeout(()=>{
                  this.$router.push({name: 'enterp_info_set'})
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
        },
        onlyNum1() {
          /*this.contractData.phone = this.contractData.phone.replace(/[^\.\d]/g,'');
          this.contractData.phone = this.contractData.phone.replace('.','');*/
        },
        onlyNum2() {
         /* this.contractData.tel = this.contractData.tel.replace(/[^\.\d]/g,'');
          this.contractData.tel = this.contractData.tel.replace('.','');*/
        },
        onlyNum3() {
         /* this.contractData.qq = this.contractData.qq.replace(/[^\.\d]/g,'');
          this.contractData.qq = this.contractData.qq.replace('.','');*/
        },
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/company/get-contact',{params:{cid: companyInfo.id}})
            .then((res)=>{
              if (res.data) {
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
</style>
