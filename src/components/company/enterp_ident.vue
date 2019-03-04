<template>
  <!--企业认证-->
    <div class="enterp_ident">
      <div class="com_det_title">
        <div class="content">
          企业认证
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">企业名称</span><input type="text"  placeholder="企业名称">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">营业执照</span><span class="fr uppic_ident" v-show="identData.state != 1">上传图片</span><span class="fr uppic_ident" v-show="identData.state != 1">重新上传</span><span class="fr idented" v-show="identData.state == 1"><img src="/static/images/ic_cm_auth.png" alt="">已认证</span>
          </div>
          <div class="ident_img">
            <img v-show="identData.state == 1" class="license" :src="identData.license" alt="">
            <img v-show="identData.state != 1" src="/static/images/ic_cm_pic@2x.png" alt="">
            <p>支持JPG、PNG，大小不要超过2MB！</p>
          </div>
        </div>
      </div>
      <div class="enterp_button" v-show="identData.state != 1">
        提交认证
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {splicPic} from '../../../static/js/common.js'
    export default {
        name: "enterp_ident",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          identData: {

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
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-auth',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              splicPic(res.data.license,true);
              this.identData = res.data;
              console.log(this.identData);

            }
          })
      }
     }
</script>

<style scoped>
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
    padding-bottom: 15px;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    font-weight: bold;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #919199;
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
  .uppic_ident{
    font-size: 14px;
    color: #5082e6;
  }
  .uppic_ident img{
    width: 13px;
    height: 14px;
    vertical-align: middle;
  }
  .ident_img{
    position: relative;
    width: 100%;
    height: 180px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    border-top: none;
    background-color: #f9f9f9;
    text-align: center;
  }
  .ident_img img{
    margin-top: 44px;
    width: 53px;
    height: 53px;
  }
  .ident_img .license{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 180px;
  }
  .ident_img p{
    margin-top: 15px;
    font-size: 12px;
    color: #919199;
  }
  .idented{
    font-size: 14px;
    color: #ff8236;
  }
  .idented img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
</style>
