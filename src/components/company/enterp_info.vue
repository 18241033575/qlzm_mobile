<template>
  <!--企业资料-->
    <div class="enterp_info">
      <div class="com_det_title">
        <div class="content">
          企业资料
        </div>
      </div>
      <div class="tal_msg_edit">
        <div class="tal_edit_det">
          <div class="edit_top">
            <div class="content">
              <p class="logo_tit">企业LOGO</p>
              <div class="edit_top_box">
                <div class="top_pic">
                  <img :src="this.logoPic" alt="">
                </div>
                <div class="top_msg">
                  <div slot="tip" class="el-upload__tip">支持JPG、PNG，大小不要超过500k 建议使用一寸证件照70*100像素</div>
                  <el-upload
                    class="avatar-uploader upload_btn"
                    :action="this.loadAddr"
                    list-type="none"
                    :data="{type: 'image'}"
                    :show-file-list="false"
                    accept=".jpg,.jpeg,.png,.gif,.bmp"
                    :on-success="upHeadPic">
                    <el-button size="small" type="primary">上传LOGO</el-button>
                  </el-upload>
                  <!--<span class="upload_btn">上传图片</span>-->
                  <!--<p>支持JPG、PNG，大小不要超过500k 建议使用一寸证件照70*100像素</p>-->
                </div>
              </div>
            </div>
          </div>
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell">
                <span class="edit_lab">企业名称</span><input type="text" v-model="infoData.name" maxlength="20" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业性质</span><span class="int_job_det fr" @click="entNature">{{tranNature || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业规模</span><span class="int_job_det fr" @click="entScale">{{tranScale || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell special_cell">
                <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_pro"><span class="place">{{tranPro || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city"><span class="place">{{tranCity || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area"><span>{{tranArea || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div></div>
                <input type="text" v-model="infoData.address" maxlength="50" placeholder="详细地址，如：街道、门牌号等">
              </div>
              <div class="edit_cell" @click="edit_intro">
                <span class="edit_lab">企业简介</span><span class="int_job_det fr"><img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="bas_msg_btn" @click="infoSave">
          保存
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
              <div v-if="showMsg =='pro'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
                {{item}}<img v-show="infoData.province == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'city'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
                {{item}}<img v-show="infoData.city == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'area'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
                {{item}}<img v-show="infoData.area == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'entNature'" v-for="(item,index) in addrData" :posType-id="item.id" :key="index" class="filter_part1_cell second" @click="ent_nature">
                {{item.name}}<img v-show="infoData.nature == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'entScale'" v-for="(item,index) in addrData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="ent_scale">
                {{item.name}}<img v-show="infoData.scale == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>

            </div>
          </div>
        </div>
      </div>
      <!--企业简介-->
      <div class="ent_intro" v-show="introSign">
        <div class="filter_s_title">
          <div class="content">
            <img @click="intro_back" src="/static/images/left.png" alt="left">企业简介
          </div>
        </div>
        <div class="content">
          <!--<textarea v-model="infoData.introduction" placeholder="请填写职位描述" name="evaluation"></textarea>-->
          <quill-editor v-model="infoData.introduction"
                        placeholder="请填写职位描述"
                        :options="editorOption">
          </quill-editor>
        </div>
        <div class="bas_msg_btn" @click="intro_sub">
          确定
        </div>
      </div>
    </div>
</template>

<script>
  import {file_upload,splicPic,transComNature,transComScale} from '../../../static/js/common.js'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
    export default {
      name: "enterp_info",
      data() {
        return {
          userMsg: {},
          secondBox: false,
          top_title: '',
          scrollSign: false,
          showMsg: '',
          introSign: false,
          editIntro: '',
          logoPic: '/static/images/company_def_logo.png',
          // 转换文字
          tranNature: '',
          tranScale: '',
          tranPro: '',
          tranCity: '',
          tranArea: '',
          //遍历数据
          addrData: {},
          infoData: {},
          editorOption: {
            modules:{
              toolbar: false
            },
          }
        }
      },
      methods: {
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
        // 企业性质
        entNature() {
          this.secondBox = true;
          this.top_title = '企业性质';
          this.showMsg = 'entNature';
          this.addrData = transComNature(this.addrData,3);
        },
        ent_nature(e) {
          this.infoData.nature = e.currentTarget.getAttribute('posType-id');
          this.tranNature = transComNature(this.infoData.nature,0);
          this.secondBox = false;
        },
        // 企业规模
        entScale() {
          this.secondBox = true;
          this.top_title = '企业规模';
          this.showMsg = 'entScale';
          this.addrData = transComScale(this.addrData,3);
        },
        ent_scale(e) {
          this.infoData.scale = e.currentTarget.getAttribute('city-id');
          this.tranScale = transComScale(this.infoData.scale,0);
          this.secondBox = false;
        },
        // 地址选择
        choose_pro() {
          this.secondBox = true;
          this.showMsg = 'pro';
          this.top_title = '选择省份';
          this.addrData = tranProvince(this.infoData,true,'pro');
        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.province = cCode;
          this.tranPro = tranProvince(this.infoData.province,true,'',2);
          this.tranCity = '';
          this.tranArea = '';
          this.secondBox = false
        },
        choose_city() {
          this.secondBox = true;
          this.showMsg = 'city';
          this.top_title = '选择城市/地区';
          this.addrData = tranCity(this.infoData,true,2,'city');
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.city = cCode;
          this.tranCity = tranCity(this.infoData,true,3);
          this.tranArea = '';
          this.secondBox = false
        },
        choose_area() {
          this.secondBox = true;
          this.showMsg = 'area';
          this.top_title = '选择区/县';
          this.addrData = tranArea(this.infoData,true,5);
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.area = cCode;
          this.tranArea = tranArea(this.infoData,true,3);
          this.secondBox = false
        },
        // 保存
        infoSave() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (this.infoData.name == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写企业名称',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.infoData.nature == '' || this.infoData.nature == 0) {
            this.$notify.warning({
              title: '提示',
              message: '请选择企业性质',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranPro == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择省份',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranCity == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择城市',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranArea == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择地区',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.infoData.address == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写详细地址',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.editIntro == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写企业简介',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.$ajax.post('/company/info-set',{cid: companyInfo.id,logo: this.infoData.logo,name: this.infoData.name,nature: this.infoData.nature,scale: this.infoData.scale,province: this.infoData.province,city: this.infoData.city,area: this.infoData.area,address: this.infoData.address,introduction: this.editIntro})
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
                },1000);
                this.$indicator.close();
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
                this.$indicator.close();
              }
            })
        },
        intro_sub() {
          this.editIntro = this.infoData.introduction;
          this.introSign = false;
        },
        edit_intro() {
          this.introSign = true;
        },
        intro_back() {
          this.introSign = false;
        },
        upHeadPic(res) {
          if (res.code == 200) {
            let url = res.data.success[0].url;
            this.logoPic = splicPic(url, true);
            this.infoData.logo = url;
          }
        },
      },
      created() {
        this.loadAddr = file_upload();
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              this.infoData = res.data;
              if (this.infoData.logo != ''){
                this.logoPic = splicPic(this.infoData.logo, true);
              }
              this.tranScale = transComScale(this.infoData.scale,0);
              this.tranNature = transComNature(this.infoData.nature,0);
              if (this.infoData.area != 0){
                this.tranArea = tranArea(this.infoData,true,3);
              }
             if (this.infoData.city != 0){
               this.tranCity = tranCity(this.infoData,true,3);
             }
             if (this.infoData.province != 0) {
               this.tranPro = tranProvince(this.infoData.province,true,'',2);
             }
              this.editIntro = this.infoData.introduction;
            }
          })
      }
    }
</script>

<style scoped>
  .tal_edit_det{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 80px;
    color: #666666;
    font-weight: bold;
  }
  .logo_tit{
    margin-bottom: 15px;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .tal_msg_edit{
    padding-bottom: 60px;
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
  .int_job_det{
    color: #919199;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .special_cell input{
    width: 90%;
    padding-left: 15px;
    margin-bottom: 20px;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /*筛选弹层*/
  .filter_all_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
    z-index: 9999999;
  }
  .filter_bg{
    width: 10%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .filter_det{
    width: 90%;
    height: 100vh;
    overflow-y: scroll;
    background-color: #ffffff;
  }
  .filter_part1_cell{
    line-height: 44px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #EAEAEA;
    color: #353535;
  }
  .filter_part1_cell span{
    color: #919199;
  }
  .filter_part1_cell img{
    margin-left: 5px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  /*第二层*/
  .filter_s_title{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #353535;
    border-bottom: 1px solid #E1E4E6;
  }
  .filter_s_title img{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .second{
    color: #919199;
  }
  .second img{
    padding-top: 14px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .bas_msg_btn{
    position: fixed;
    bottom: 0;
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
  /*企业简介*/
  .ent_intro{
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 40px;
    width: 100vw;
    min-height: 100vh;
    background-color: #ffffff;
    z-index: 999999999;
  }
  .ent_intro .filter_s_title{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .ent_intro textarea{
    width: 90%;
    min-height: 130px;
    height: 400px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
    border: none;
  }
  .ent_intro textarea::placeholder{
    font-size: 14px;
    color: #c2c2cc;
  }
  .ent_intro textarea:focus{
    outline: none;
  }
  .ent_intro .quill-editor .ql-toolbar{
    display: none!important;
  }
  .edit_top {
    padding: 15px 0;
    font-size: 12px;
  }
  .edit_top_box{
    display: flex;
  }
  .top_pic img {
    width: 75px;
    height: 75px;
  }
  .top_msg{
    margin-left: 15px;
    padding-top: 5px;
    color: #919199;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
  }
  .top_msg .el-upload__tip{
    margin-top: 0;
    margin-bottom: 7px;
  }
  .upload_btn .el-button{
    color: #ffffff;
    background-color: #ff8236;
    border-color: #ff8236;
  }
  .upload_btn .el-upload__tip{
    color: #919199;
    font-size: 12px;
  }
  .upload_btn .el-upload-list--none{
    display: none;
  }
</style>
