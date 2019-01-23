<template>
  <div class="tal_bas_msg_all">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
            <p class="tal_name">{{userInfoMsg.name}}</p>
            <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
          </div>
          <div class="bottom_msg">
            <p><span class="left_lab">手机</span> <span class="right_msg">{{userInfoMsg.phone}}</span></p>
            <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
            <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
            <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status}}</span></p>
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
                <span class="upload_btn">上传图片</span>
                <p>支持JPG、PNG，大小不要超过500k 建议使用一寸证件照70*100像素</p>
              </div>
            </div>
          </div>
        </div>
        <div class="edit_bottom">
          <div class="content">
            <div class="edit_cell">
              <span class="edit_lab">真实姓名</span><input type="text" v-model="form.tal_name" placeholder="真实姓名">
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
              <span class="edit_lab">通讯地址</span><div class="comm_addr"><div class="comm_addr_cell">贵州省<img src="/static/images/down3j.png" alt=""></div><div class="comm_addr_cell">贵阳市<img src="/static/images/down3j.png" alt=""></div><div class="comm_addr_cell">南明区<img src="/static/images/down3j.png" alt=""></div></div>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">详细地址</span><input type="text" v-model="form.tal_addr" placeholder="详细地址">
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
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>
<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {splicPic,transGender,transEducation,transWorkexp} from '../../../static/js/common.js'
    export default {
        name: "tal_bas_msg",
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
            editHeadPic: '/static/images/user-01@2x.png',
            headPic: '/static/images/banner03@2x.png',
            edit: true,
            form: {
                tal_name: '1',
                tal_idcard: '2',
                tal_qq: '3',
                tal_email: '4',
                tal_addr: '4',
                tal_state: 1
              }
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
                transGender(res.data.base_info,true);
                transEducation(res.data.base_info,1);
                transWorkexp(res.data.base_info,1,'tal');
                console.log(res.data.base_info);
                this.userMsg = res.data.base_info;
                this.form.tal_name = this.userMsg.name;
                this.form.tal_idcard = this.userMsg.id_card;
                this.form.tal_qq = this.userMsg.qq;
                this.form.tal_email = this.userMsg.email;
                this.form.tal_addr = this.userMsg.address;
                this.form.tal_state = this.userMsg.work_status;

                userInfo.ability_index = this.userMsg.ability_index;
                userInfo = JSON.stringify(userInfo);
                localStorage.setItem('USER',userInfo);
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
          this.$ajax.post('/resume/userinfo',{"flag":1, "name": this.form.tal_name, "province": 520000, "city": 520100, "area": 520103, "address": this.form.tal_addr, "email": this.form.tal_email, "qq": this.form.tal_qq, "id_card":  this.form.tal_idcard, "work_status": this.form.tal_state})
            .then((res)=>{
              if (res.data.state == 200) {
                this.edit = true;
              }
            })

        },
        have_job() {
          this.form.tal_state = 1
        },
        wait_job() {
          this.form.tal_state = 0
        }
      }
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
    width: 80px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #ff8236;
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
    height: 6px;
    vertical-align: middle;
  }
</style>
