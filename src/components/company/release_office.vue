<template>
    <div class="release_office">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <div class="tal_bas_msg" v-show="this.edit">
        <div class="com_det_title">
          <div class="content">
            发布职位
          </div>
        </div>
        <div class="tal_msg_det">
          <div class="content">
            <div class="top_pic">
              <img :src="this.headPic" alt="">
              <p class="tal_name">{{userInfoMsg.name}}</p>
              <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
            </div>
            <div class="bottom_msg">
              <p><span class="left_lab">手机</span> <span class="right_msg">{{userInfoMsg.phone}}</span></p>
              <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
              <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
              <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status == 1?'已就业':'待就业'}}</span></p>
              <p><span class="left_lab">通讯地址</span> <span class="right_msg">{{userMsg.province + userMsg.city + userMsg.area}}</span></p>
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
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="none"
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
                <span class="edit_lab">身份证号码</span><input type="text" v-model="form.tal_idcard" maxlength="16" placeholder="身份证号码">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">QQ号码</span><input type="text" v-model="form.tal_qq" placeholder="QQ号码">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">电子邮箱</span><input type="text" v-model="form.tal_email" placeholder="电子邮箱">
              </div>
              <div class="edit_cell special_cell">
                <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_province">{{userMsg.province}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city">{{userMsg.city}}<img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area">{{userMsg.area}}<img src="/static/images/font_down.png" alt=""></div></div>
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
              <img @click="first_back" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">
              <div v-if="showMsg =='pro'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
                {{item}}<img v-show="cityCode[0] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'city'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
                {{item}}<img v-show="cityCode[1] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'area'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
                {{item}}<img v-show="cityCode[2] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic,transGender,transEducation,transWorkexp} from '../../../static/js/common.js'
    export default {
        name: "release_office",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          userInfoMsg: {},
          userMsg: {},
          secondBox: false,
          top_title: '',
          cityCode: {

          },
          showMsg: 'pro',
          beginData: {},
          editHeadPic: '/static/images/user-01@2x.png',
          headPic: '/static/images/banner03@2x.png',
          edit: true,
          form: {
            tal_name: '',
            tal_idcard: '',
            tal_qq: '',
            tal_email: '',
            tal_addr: '',
            tal_state: 1
          },
          guiyangData: {

          },
          cityData: {

          },

        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));

        //头像
        if (userInfo.photo != '') {
          this.editHeadPic = this.headPic = splicPic(userInfo.photo, true);
        }
        userInfo.name = userInfo.name == ''?userInfo.phone:userInfo.name;
        this.userInfoMsg = userInfo;
        this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state!= 400) {
              this.beginData = res.data.base_info;
              this.cityCode[0] = res.data.base_info.province;
              this.cityCode[1] = res.data.base_info.city;
              this.cityCode[2] = res.data.base_info.area;
              tranArea(res.data.base_info,true,0);
              tranCity(res.data.base_info,true,0);
              tranProvince(res.data.base_info,true);
              transGender(res.data.base_info,true);
              transEducation(res.data.base_info,1);
              transWorkexp(res.data.base_info,1,'tal');
              this.userMsg = res.data.base_info;
              this.form.tal_name = this.userMsg.name;
              this.form.tal_idcard = this.userMsg.id_card;
              this.form.tal_qq = this.userMsg.qq;
              this.form.tal_email = this.userMsg.email;
              this.form.tal_addr = this.userMsg.address;
              this.form.tal_state = this.userMsg.work_status;

            }
          });

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
        to_edit() {
          this.edit = false;
        },
        to_edited() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/userinfo',{"flag":1, "name": this.form.tal_name, "province": this.cityCode[0], "city": this.cityCode[1], "area": this.cityCode[2], "address": this.form.tal_addr, "email": this.form.tal_email, "qq": this.form.tal_qq, "id_card":  this.form.tal_idcard, "work_status": this.form.tal_state, uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.edit = true;
              }
            })

        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[0] = cCode;
          /*  this.cityCode[1] = '';
            this.cityCode[2] = '';
            // 替换相应位置0*/
          this.secondBox = false
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[1] = cCode;
          this.secondBox = false
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[2] = cCode;
          this.secondBox = false
        },
        secondBoxBg() {
          // this.firstBox = false;
          this.secondBox = false
        },
        first_back() {
          this.firstBox = true;
          this.secondBox = false
        },
        have_job() {
          this.form.tal_state = 1
        },
        wait_job() {
          this.form.tal_state = 0
        },
        upHeadPic(res) {
          console.log(res);
        },
        choose_province() {
          this.guiyangData = tranProvince(this.beginData,true,'pro');
          this.showMsg = 'pro';
          this.secondBox = true;
        },
        choose_city() {
          this.guiyangData = tranCity(this.cityCode,true,2,'city');
          this.showMsg = 'city';
          this.secondBox = true;
        },
        choose_area() {
          this.guiyangData = tranArea(this.cityCode,true,5);
          this.showMsg = 'area';
          this.secondBox = true;
        },
      },
      updated() {
        this.userMsg.province = tranProvince(this.cityCode[0],true,'',2);
        this.userMsg.city = tranCity(this.cityCode,true,3);
        this.userMsg.area = tranArea(this.cityCode,true,3);
      }
    }
</script>

<style scoped>

</style>
