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
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell border-none">
                <span class="edit_lab">企业名称</span><input type="text" v-model="infoData.name" maxlength="15" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业性质</span><span class="int_job_det fr" @click="entNature">{{tranNature || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">企业规模</span><span class="int_job_det fr" @click="entScale">{{tranScale || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell special_cell">
                <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_pro">{{tranPro || '请选择'}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city">{{tranCity || '请选择'}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area">{{tranArea || '请选择'}}<img src="/static/images/font_down.png" alt=""></div></div>
                <input type="text" v-model="infoData.address" maxlength="20" placeholder="详细地址，如：街道、门牌号等">
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
              <div v-if="showMsg == 'entNature'" v-for="(item,index) in addrData" :posType-id="index+1" :key="index" class="filter_part1_cell second" @click="ent_nature">
                {{item}}<img v-show="infoData.nature == index+1" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'entScale'" v-for="(item,index) in addrData" :city-id="index+1" :key="index" class="filter_part1_cell second" @click="ent_scale">
                {{item}}<img v-show="infoData.scale == index+1" class="fr" src="/static/images/ic_checked@2x.png" alt="">
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
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {companyNature,companyScale} from '../../../static/js/common.js'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
    export default {
        name: "enterp_info",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          userMsg: {},
          secondBox: false,
          top_title: '',
          scrollSign: false,
          showMsg: '',
          introSign: false,
          editIntro: '',
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
            // debug: 'info',
            modules:{
              toolbar:[
                ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                ['blockquote', 'code-block'],     //引用，代码块


                // [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                // [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                [{ 'direction': 'rtl' }],             // 文本方向


                [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题


                [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                [{ 'font': [] }],     //字体
                [{ 'align': [] }],    //对齐方式


                ['clean'],    //清除字体样式
                // ['image','video']    //上传图片、上传视频

              ]
            },
            // theme:'snow'  // 默认背景
          }
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
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
        // 企业性质
        entNature() {
          this.secondBox = true;
          this.top_title = '企业性质';
          this.showMsg = 'entNature';
          this.addrData = companyNature(this.addrData,3);
        },
        ent_nature(e) {
          this.infoData.nature = e.currentTarget.getAttribute('posType-id');
          this.tranNature = companyNature(this.infoData.nature,2);
          this.secondBox = false;
        },
        // 企业规模
        entScale() {
          this.secondBox = true;
          this.top_title = '企业规模';
          this.showMsg = 'entScale';
          this.addrData = companyScale(this.addrData,3);
        },
        ent_scale(e) {
          this.infoData.scale = e.currentTarget.getAttribute('city-id');
          this.tranScale = companyScale(this.infoData.scale,2);
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
        intro_sub() {
          this.editIntro = this.infoData.introduction;
          this.introSign = false;
        },
        edit_intro() {
          this.introSign = true;
        },
        intro_back() {
          this.introSign = false;
        }
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              this.infoData = res.data;
              this.tranNature = companyNature(this.infoData.nature,2);
              this.tranScale = companyScale(this.infoData.scale,2);
              this.tranPro = tranProvince(this.infoData.province,true,'',2);
              this.tranCity = tranCity(this.infoData,true,3);
              this.tranArea = tranArea(this.infoData,true,3);
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
  .comm_addr{
    display: flex;
    width: 100%;
    padding-bottom: 15px;
  }
  .comm_addr .comm_addr_cell{
    justify-content: space-between;
    margin-right: 10px;
    width: 30%;
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
    margin-left: 20px;
    width: 12px;
    height: 10px;
    vertical-align: middle;
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
  .border-none{
    border: none;
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
    width: 100vw;
    height: 100vh;
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
</style>
