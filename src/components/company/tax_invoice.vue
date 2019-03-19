<template>
  <div class="invoice_all">
    <!--增值税发票-->
    <div class="tax_invoice" v-show="org=='tax'">
      <div class="com_det_title">
        <div class="content">
          增值税发票
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">单位名称</span><input type="text" v-model="invTax.title" maxlength="20" placeholder="单位名称(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">纳税人识别号</span><input type="text" :validate-event="true"  :onkeypress="onlyNum1()" v-model="invTax.number" minlength="15" maxlength="20" placeholder="纳税人识别号(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">企业注册地址</span><input type="text" maxlength="20" v-model="invTax.reg_address"  placeholder="企业注册地址(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">企业注册电话</span><input maxlength="20" minlength="10" type="text" :onkeypress="onlyNum2()" v-model="invTax.reg_tel" placeholder="企业注册电话(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">开户银行</span><input type="text" maxlength="15" v-model="invTax.bank" placeholder="开户银行(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">银行账户</span><input type="text" minlength="16" maxlength="20" :onkeypress="onlyNum3()" v-model="invTax.bank_account" placeholder="银行账户(必填)">
          </div>
        </div>
      </div>
    </div>
    <!--普通发票-->
    <div class="total_inv" v-show="org=='total'">
      <div class="com_det_title">
        <div class="content">
          普通发票
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">发票抬头</span><input type="text" maxlength="20" v-model="invTotal.title" placeholder="发票抬头(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">纳税人识别号</span><input type="text" maxlength="20" :onkeypress="onlyNum4()" v-model="invTotal.number"  placeholder="纳税人识别号(必填)">
          </div>
        </div>
      </div>
    </div>
    <!--收件信息-->
    <div class="in_inv" v-show="org=='msg'">
      <div class="com_det_title">
        <div class="content">
          收件信息
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">收件人姓名</span><input type="text" maxlength="10" v-model="invMsg.name" placeholder="收件人姓名(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">收件人手机</span><input type="text" :onkeypress="onlyNum5()" maxlength="11" v-model="invMsg.phone" placeholder="收件人手机(必填)">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">E-mail</span><input type="text" maxlength="20" v-model="invMsg.email" placeholder="用于接收电子发票(必填)">
          </div>
          <div class="edit_cell special_cell ">
            <span class="edit_lab">收件地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_pro"><span class="place_msg">{{transPro || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city"><span class="place_msg">{{transCity || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area"><span class="place_msg">{{transArea || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div></div>
            <input type="text" maxlength="20" v-model="invMsg.address" placeholder="详细地址，如：街道、门牌号等">
          </div>
        </div>
      </div>
    </div>
    <div class="enterp_button" @click="inv_save">
      保存
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
            <div v-if="showMsg =='pro'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
              {{item}}<img v-show="invMsg.province == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'city'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
              {{item}}<img v-show="invMsg.city == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'area'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
              {{item}}<img v-show="invMsg.area == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
    export default {
        name: "tax_invoice",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          secondBox: false,
          scrollSign: false,
          org: '',
          backData: true,
          top_title: '',
          showMsg: '',
          tranPro: '',
          tranCity: '',
          tranArea: '',
          invTotal: {
            title: '',
            number: ''
          },
          invTax: {
            title: '',
            number: '',
            reg_address: '',
            reg_tel: '',
            bank: '',
            bank_account: ''
          },
          invMsg: {
            name: '',
            phone: '',
            email: '',
            province: '',
            city: '',
            area: '',
            address: ''
          },
          transPro: '',
          transCity: '',
          transArea: '',
          addData: {

          },
          addrData: {

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
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
        /*总菜单操作e*/
        // 地址选择
        choose_pro() {
          this.secondBox = true;
          this.showMsg = 'pro';
          this.top_title = '选择省份';
          this.addrData = tranProvince(this.invMsg,true,'pro');
        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.invMsg.province = cCode;
          this.transPro = tranProvince(this.invMsg.province,true,'',2);
          this.transCity = '';
          this.transArea = '';
          this.secondBox = false
        },
        choose_city() {
          this.secondBox = true;
          this.showMsg = 'city';
          this.top_title = '选择城市/地区';
          this.addrData = tranCity(this.invMsg,true,2,'city');
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.invMsg.city = cCode;
          this.transCity = tranCity(this.invMsg,true,3);
          this.transArea = '';
          this.secondBox = false
        },
        choose_area() {
          this.secondBox = true;
          this.showMsg = 'area';
          this.top_title = '选择区/县';
          this.addrData = tranArea(this.invMsg,true,5);
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.invMsg.area = cCode;
          this.transArea = tranArea(this.invMsg,true,3);
          this.secondBox = false
        },
        inv_save() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (this.org == 'tax') {
            if (this.invTax.title == '') {
              this.$notify.warning({
                title: '提示',
                message: '单位名称不能为空',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTax.number.length < 15) {
              this.$notify.warning({
                title: '提示',
                message: '纳税人识别号不能少于15位',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTax.address == '') {
              this.$notify.warning({
                title: '提示',
                message: '注册地址不能为空',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTax.reg_tel.length < 10) {
              this.$notify.warning({
                title: '提示',
                message: '注册电话不能少于10位',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTax.bank == '') {
              this.$notify.warning({
                title: '提示',
                message: '开户银行不能为空',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTax.bank_account.length < 16) {
              this.$notify.warning({
                title: '提示',
                message: '银行账户不能少于16位',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (!this.backData) {
              this.$ajax.post('/company/add-vat-invoice',{cid: companyInfo.id,title: this.invTax.title,taxpayer_identification_number: this.invTax.number,reg_address:  this.invTax.reg_address,
                reg_tel: this.invTax.reg_tel,bank: this.invTax.bank,bank_account: this.invTax.bank_account})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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
            } else {
              this.$ajax.post('/company/vat-invoice-set',{cid: companyInfo.id,title: this.invTax.title,taxpayer_identification_number: this.invTax.number,reg_address:  this.invTax.reg_address,
                reg_tel: this.invTax.reg_tel,bank: this.invTax.bank,bank_account: this.invTax.bank_account})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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
          }
          if (this.org == 'total') {
            if (this.invTotal.title == '') {
              this.$notify.warning({
                title: '提示',
                message: '发票抬头不能为空',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invTotal.number.length < 15) {
              this.$notify.warning({
                title: '提示',
                message: '纳税人识别号不能少于15位',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (!this.backData) {
              this.$ajax.post('/company/add-general-invoice',{cid: companyInfo.id,title: this.invTotal.title,taxpayer_identification_number: this.invTotal.number})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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
            } else {
              this.$ajax.post('/company/general-invoice-set',{cid: companyInfo.id,title: this.invTotal.title,taxpayer_identification_number: this.invTotal.number})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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

          }
          if (this.org == 'msg') {
            if (this.invMsg.name == '') {
              this.$notify.warning({
                title: '提示',
                message: '收件人姓名不能为空',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invMsg.phone.length < 11) {
              this.$notify.warning({
                title: '提示',
                message: '请填写正确的手机号',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invMsg.email.length < 4) {
              this.$notify.warning({
                title: '提示',
                message: '请填写正确的邮箱地址',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.transPro == '') {
              this.$notify.warning({
                title: '提示',
                message: '请选择省份',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.transCity == '') {
              this.$notify.warning({
                title: '提示',
                message: '请选择城市',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.transArea == '') {
              this.$notify.warning({
                title: '提示',
                message: '请选择地区',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (this.invMsg.address == '') {
              this.$notify.warning({
                title: '提示',
                message: '请填写详细地址',
                showClose: false,
                duration: 1500
              });
              return
            }
            if (!this.backData) {
              this.$ajax.post('/company/add-addressee',{cid: companyInfo.id,name: this.invMsg.name,phone : this.invMsg.phone,email : this.invMsg.email,province : this.invMsg.province,city : this.invMsg.city,area : this.invMsg.area,address : this.invMsg.address})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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
            } else {
              this.$ajax.post('/company/set-addressee',{cid: companyInfo.id,name: this.invMsg.name,phone : this.invMsg.phone,email : this.invMsg.email,province : this.invMsg.province,city : this.invMsg.city,area : this.invMsg.area,address : this.invMsg.address})
                .then((res)=>{
                  if (res.data.state == 200) {
                    this.$notify.success({
                      title: '提示',
                      message: '保存成功',
                      showClose: false,
                      duration: 800
                    });
                    setTimeout(()=>{
                      this.$router.push({name: 'invoice_msg'})
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

          }
        },
        // 数字限制
        onlyNum1() {
          this.invTax.number = this.invTax.number.replace(/[^\.\d]/g,'');
          this.invTax.number = this.invTax.number.replace('.','');
        },
        onlyNum2() {
          this.invTax.reg_tel = this.invTax.reg_tel.replace(/[^\.\d]/g,'');
          this.invTax.reg_tel = this.invTax.reg_tel.replace('.','');
        },
        onlyNum3() {
          this.invTax.bank_account = this.invTax.bank_account.replace(/[^\.\d]/g,'');
          this.invTax.bank_account = this.invTax.bank_account.replace('.','');
        },
        onlyNum4() {
          this.invTotal.number = this.invTotal.number.replace(/[^\.\d]/g,'');
          this.invTotal.number = this.invTotal.number.replace('.','');
        },
        onlyNum5() {
          this.invMsg.phone = this.invMsg.phone.replace(/[^\.\d]/g,'');
          this.invMsg.phone = this.invMsg.phone.replace('.','');
        }
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.org = this.$route.query.org;
        if (this.org == 'tax') {
          this.$ajax.get('/company/vat-invoice',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data != null) {
                this.backData = true;
                this.invTax.title = res.data.title;
                this.invTax.number = res.data.taxpayer_identification_number;
                this.invTax.reg_address = res.data.reg_address;
                this.invTax.reg_tel = res.data.reg_tel;
                this.invTax.bank = res.data.bank;
                this.invTax.bank_account = res.data.bank_account;
              } else {
                this.backData = false;
              }
            })
        }
        if (this.org == 'total') {
            this.$ajax.get('/company/general-invoice',{params: {cid: companyInfo.id}})
              .then((res)=>{
                if (res.data != null) {
                  this.backData = true;
                  this.invTotal.title = res.data.title;
                  this.invTotal.number = res.data.taxpayer_identification_number;
                } else {
                  this.backData = false;
                }
              })
          }

        if (this.org == 'msg') {
          this.$ajax.get('/company/get-addressee',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data != null) {
                this.backData = true;
                this.invMsg.name = res.data.name;
                this.invMsg.phone = res.data.phone;
                this.invMsg.email = res.data.email;
                this.invMsg.province = res.data.province;
                this.invMsg.city = res.data.city;
                this.invMsg.area = res.data.area;
                this.invMsg.address = res.data.address;
                this.transPro = tranProvince(this.invMsg.province,true,'',2);
                this.transCity = tranCity(this.invMsg,true,3);
                this.transArea = tranArea(this.invMsg,true,3);
              } else {
                this.backData = false;
              }
            })
        }

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
  .edit_cell .place_msg{
    display: inline-block;
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .comm_addr{
    display: flex;
    width: 100%;
    padding-bottom: 15px;
  }
  .comm_addr .comm_addr_cell{
    justify-content: space-between;
    margin-right: 10px;
    width: 30%;
    overflow: hidden;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
  .comm_addr img{
    width: 12px;
    height: 10px;
    vertical-align: middle;
  }
  .special_cell input{
    margin-bottom: 20px;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
  }
</style>
