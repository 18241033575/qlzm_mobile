<template>
  <div class="tal_bas_msg_all" :class="{stop_scroll: this.openState || this.secondBox}">
    <div class="tal_bas_msg" v-show="this.edit">
      <div class="com_det_title">
        <div class="content">
          基本信息
        </div>
      </div>
      <div class="tal_msg_det">
        <div class="content">
          <div class="top_pic">
            <img :src="this.headPic" alt="">
            <p class="tal_name">{{userMsg.name}}</p>
            <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
          </div>
          <div class="bottom_msg">
            <p><span class="left_lab">手机</span> <span class="right_msg">{{userInfoMsg.phone}}</span></p>
            <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
            <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
            <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status == 1?'已就业':'待就业'}}</span></p>
            <p><span class="left_lab">通讯地址</span> <span class="right_msg">{{(tranPro || '未知') + (tranCity || '') + (tranArea || '')}}</span></p>
            <p><span class="left_lab">街道</span> <span class="right_msg">{{userMsg.address}}</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="to_edit">
          编辑
        </div>
      </div>
    </div>
    <div class="tal_msg_edit" v-show="!this.edit">
      <div class="com_det_title">
        <div class="content">
          编辑基本信息
        </div>
      </div>
      <div class="tal_edit_det">
        <div class="edit_top">
          <div class="content">
            <div class="edit_top_box">
              <div class="top_pic">
                <img :src="this.editHeadPic" alt="">
              </div>
              <div class="top_msg">
                <el-upload
                  class="avatar-uploader upload_btn"
                  :action="this.loadAddr"
                  list-type="none"
                  :data="{type: 'image'}"
                  :show-file-list="false"
                  accept=".jpg,.jpeg,.png,.gif,.bmp"
                  :on-success="upHeadPic">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">支持JPG、PNG，大小不要超过500k 建议使用一寸证件照70*100像素</div>
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
              <span class="edit_lab">真实姓名</span><input type="text" maxlength="15" v-model="form.tal_name" placeholder="真实姓名">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">身份证号码</span><input type="text" v-model="form.tal_idcard" maxlength="18" placeholder="身份证号码">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">QQ号码</span><input type="text" v-model="form.tal_qq" placeholder="QQ号码">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">电子邮箱</span><input type="text" v-model="form.tal_email" placeholder="电子邮箱">
            </div>
            <div class="edit_cell special_cell">
              <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_pro"><span class="place">{{tranPro}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city"><span class="place">{{tranCity}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area"><span class="place">{{tranArea}}</span><img src="/static/images/font_down.png" alt=""></div></div>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">详细地址</span><input type="text" maxlength="20" v-model="form.tal_addr" placeholder="详细地址">
            </div>
            <div class="edit_cell">
              <span class="edit_lab">就业状态</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.tal_state==1}" @click="have_job">已就业</span><span class="choose_cell" :class="{choose_active:this.form.tal_state==0}" @click="wait_job">待就业</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="to_edited">
          保存
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
            <div v-if="showMsg =='pro'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
              {{item}}<img v-show="cityCode.province == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'city'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
              {{item}}<img v-show="cityCode.city == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'area'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
              {{item}}<img v-show="cityCode.area == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic,transGender,transEducation,transWorkexp,file_upload} from '../../../static/js/common.js'
    export default {
        name: "tal_bas_msg",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            userInfoMsg: {},
            userMsg: {},
            secondBox: false,
            top_title: '',
            cityCode: {},
            showMsg: 'pro',
            beginData: {},
            editHeadPic: '/static/images/user-01@2x.png',
            headPic: '/static/images/user-01@2x.png',
            edit: true,
            tranPro: '',
            tranCity: '',
            tranArea: '',
            form: {
                tal_name: '',
                tal_idcard: '',
                tal_qq: '',
                tal_email: '',
                tal_addr: '',
                tal_state: 1
              },
            guiyangData: {},
            cityData: {},
            loadAddr: ''
          }
      },
      methods: {
        to_edit() {
          this.edit = false;
        },
        // 保存信息
        to_edited() {
          if (this.form.tal_name == '') {
            this.$notify.warning({
              title: '提示',
              message: '姓名不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
          if (!reg.test(this.form.tal_idcard)) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的身份证号',
              showClose: false,
              duration: 1500
            });
            return
          }
          // 邮箱验证
          let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
          if (!re.test(this.form.tal_email)) {
            this.$notify.warning({
              title: '提示',
              message: '请输入正确的邮箱地址',
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
          if (this.form.tal_addr == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写详细地址',
              showClose: false,
              duration: 1500
            });
            return
          }
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/userinfo',{"flag": 1,photo: this.userMsg.photo,"name": this.form.tal_name, "province": this.userMsg.province, "city": this.userMsg.city, "area": this.userMsg.area, "address": this.form.tal_addr, "email": this.form.tal_email, "qq": this.form.tal_qq, "id_card":  this.form.tal_idcard, "work_status": this.form.tal_state, uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                // 提交但是没有生效
                // 重新给userMsg赋值并处理数据
                this.headPic = this.editHeadPic;
                this.edit = true;
                this.getInfo();
              }
            })

        },
        // 地址选择
        choose_pro() {
          this.secondBox = true;
          this.showMsg = 'pro';
          this.top_title = '选择省份';
          this.guiyangData = tranProvince(this.userMsg,true,'pro');
        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.userMsg.province = cCode;
          this.tranPro = tranProvince(this.userMsg.province,true,'',2);
          this.tranCity = '';
          this.tranArea = '';
          this.secondBox = false
        },
        choose_city() {
          this.secondBox = true;
          this.showMsg = 'city';
          this.top_title = '选择城市/地区';
          this.guiyangData = tranCity(this.userMsg,true,2,'city');
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.userMsg.city = cCode;
          this.tranCity = tranCity(this.userMsg,true,3);
          this.tranArea = '';
          this.secondBox = false
        },
        choose_area() {
          this.secondBox = true;
          this.showMsg = 'area';
          this.top_title = '选择区/县';
          this.guiyangData = tranArea(this.userMsg,true,5);
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.userMsg.area = cCode;
          this.tranArea = tranArea(this.userMsg,true,3);
          this.secondBox = false
        },
        secondBoxBg() {
          this.secondBox = false
        },
        have_job() {
          this.form.tal_state = 1
        },
        wait_job() {
          this.form.tal_state = 0
        },
        upHeadPic(res) {
          if (res.code == 200) {
            let url = res.data.success[0].url;
            this.editHeadPic = splicPic(url, true);
            this.userMsg.photo = url;
          }
        },
        getInfo() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.userInfoMsg = userInfo;
          this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state!= 400) {
                //头像
                if (res.data.base_info.photo != '') {
                  this.editHeadPic = this.headPic = splicPic(res.data.base_info.photo, true);
                }
                this.beginData = res.data.base_info;
                this.cityCode.province = res.data.base_info.province;
                this.cityCode.city = res.data.base_info.city;
                this.cityCode.area = res.data.base_info.area;
                /*    tranArea(res.data.base_info,true,0);
                    tranCity(res.data.base_info,true,0);
                    tranProvince(res.data.base_info,true);*/

                transGender(res.data.base_info,true);
                transEducation(res.data.base_info,1);
                transWorkexp(res.data.base_info,1,'tal');
                this.userMsg = res.data.base_info;
                this.tranPro = tranProvince(this.userMsg.province,true,'',2);
                this.tranCity = tranCity(this.userMsg,true,3);
                this.tranArea = tranArea(this.userMsg,true,3);
                this.userMsg.name = this.userMsg.name == ''?this.userMsg.phone:this.userMsg.name;
                this.form.tal_name = this.userMsg.name;
                this.form.tal_idcard = this.userMsg.id_card;
                this.form.tal_qq = this.userMsg.qq;
                this.form.tal_email = this.userMsg.email;
                this.form.tal_addr = this.userMsg.address;
                this.form.tal_state = this.userMsg.work_status;
              }
            });
        }
      },
      created() {
        this.loadAddr = file_upload();
        this.getInfo();
      },
    }
</script>

<style scoped>
  .tal_msg_det{
    background-color: #ffffff;
  }
  .top_pic{
    text-align: center;
    padding-top: 15px;
  /*  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;*/
  }
  .top_pic img{
    width: 75px;
    height: 90px;
  }
  .top_pic .tal_name{
    padding-bottom: 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .top_pic p{
    padding: 10px 0;
  }
  .top_pic p span{
    padding: 0 5px;
    font-size: 12px;
    color: #919199;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
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
  /*编辑*/
  .tal_edit_det{
    background-color: #ffffff;
  }
  .edit_top {
    padding: 15px 0;
    font-size: 12px;
  }
  .edit_top_box{
    display: flex;
  }
  .top_pic img {
    width: 70px;
    height: 95px;
  }
  .top_msg{
    margin-left: 15px;
    padding-top: 15px;
    color: #919199;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
  }
  .upload_btn{
    display: inline-block;
    margin-top: 10px;
    /*width: 80px;
    line-height: 30px;
    text-align: center;

    */
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
</style>
