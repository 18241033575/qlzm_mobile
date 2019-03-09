<template>
  <!--企业风采-->
    <div class="enterp_mien">
      <div class="com_det_title">
        <div class="content">
          企业风采
        </div>
      </div>
      <div class="mien_det">
        <div class="content">
          <div class="mien_btn">
            <p class="upload_btn">上传图片</p>
            <p class="upload_tips">支持JPG、PNG,大小不要超过2MB,最多可上传8张！</p>
          </div>
          <div class="mien_pic_cell" v-for="(item,index) in infoData" :key="index">
            <img class="mien_pic" :src="item" alt="">
            <img class="mien_pic_del" src="/static/images/ic_cm_delete@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="enterp_button">
        保存
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
        name: "enterp_mien",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          infoData: {

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
        /*总菜单操作e*/
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              this.infoData = JSON.parse(res.data.style);
              for (let i = 0,len = this.infoData.length;i < len;i++) {
                this.infoData[i] = splicPic(this.infoData[i],true);
              }
            }
          })
      }
    }
</script>

<style scoped>
  .mien_det{
    margin-top: 10px;
    background-color: #ffffff;
    margin-bottom: 44px;
    padding-bottom: 15px;
  }
  .mien_btn{
    padding-top: 15px;
    height: 70px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .upload_btn{
    font-size: 14px;
    color: #5082e6;
    font-weight: bold;
    line-height: 14px;
  }
  .upload_tips{
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
    line-height: 12px;
  }
  .mien_pic_cell{
    position: relative;
    width: 100%;
    height: 120px;
    padding-top: 15px;
  }
  .mien_pic{
    width: 100%;
    height: 120px;
  }
  .mien_pic_del{
    position: absolute;
    top: 25px;
    right: 10px;
    width: 36px;
    height: 36px;
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
