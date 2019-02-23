<template>
  <!--企业中心-->
    <div class="enterp_center">
      <div class="com_det_title">
        <div class="content">
          企业中心
        </div>
      </div>
      <div class="enterp_msg">
        <div class="content">
          <div class="com_logo fl">
            <img src="/static/images/banner03@2x.png" alt="">
          </div>
          <div class="com_msg fl">
            <p class="com_name">中国石油天然气集团有限公司</p>
            <p class="com_msg_det">
              <span>私营企业</span><span>|</span><span>500-999人</span><span>|</span><span>贵州省贵阳市</span>
            </p>
            <p class="com_msg_iden"><img src="/static/images/ic_cm_authed@2x.png" alt="">未认证<span class="go_iden">[去认证]</span></p>
            <p v-if="false" class="com_msg_idened"><img src="" alt="">已认证</p>
          </div>
        </div>
      </div>
      <!--列表链接-->
      <div class="opera_list">
        <div class="content">
          <div class="opera_list_box">
            <router-link :to="{name: 'release_office'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_post@2x.png" alt="">
              <p>发布职位</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orig: 1}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_resume@2x.png" alt="">
              <p>应聘简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_buyres@2x.png" alt="">
              <p>购买的简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orig: 2}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_collection@2x.png" alt="">
              <p>收藏简历</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--分类链接-->
      <div class="menu_list">
        <div class="content">
          <router-link :to="{name: item.urlRoute}" v-for="(item,index) in menuList" :key="index">
            <div class="menu_list_cell" >
              {{item.urlName}}<img class="fr" src="/static/images/icon_goright.png" alt="">
            </div>
          </router-link>
        </div>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "enterp_center",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
          return {
            /*总菜单状态*/
            openState: false,
            menuList: {
              0: {
                urlName: "招聘管理",
                urlRoute: "recruit_manage"
              },
              1: {
                urlName: "会员服务",
                urlRoute: "find_job"
              },
              2:{
                urlName: "企业信息设置",
                urlRoute: "enterp_info"
              },
              3:{
                urlName: "账号管理",
                urlRoute: "account_manage"
              },
              4:{
                urlName: "消息",
                urlRoute: "news"
              }
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
      }
    }
</script>

<style scoped>
  /*列表链接*/
  .opera_list{
    clear: both;
    margin-bottom: 10px;
    width: 100%;
    height: 110px;
    background-color: #ffffff;
  }
  .opera_list_box{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .opera_list_cell{
    text-decoration: none;
    padding-top: 25px;
    text-align: center;
    width: 25%;
    height: 85px;
  }
  .opera_list_cell img{
    width: 44px;
    height: 44px;
  }
  .opera_list_cell p{
    font-size: 12px;
    color: #666;
  }
  /*企业信息*/
  .enterp_msg{
    padding: 15px 0;
    height: 70px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .com_logo img{
    width: 68px;
    height: 68px;
  }
  .com_msg{
    margin-left: 15px;
  }
  .com_msg .com_name{
    padding-top: 5px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
  }
  .com_msg .com_msg_det{
    margin-top: 7px;
    font-size: 12px;
    color: #919199;
  }
  .com_msg .com_msg_det span{
    padding-right: 10px;
  }
  .com_msg_iden,.com_msg_idened{
    margin-top: 3px;
    font-size: 12px;
    color: #919199;
  }
  .com_msg_iden img, .com_msg_idened img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .go_iden{
    margin-left: 10px;
    color: #5082e6;
  }
  .menu_list{
    background-color: #ffffff;
  }
  .menu_list a{
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }
  .menu_list_cell{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .menu_list_cell img{
    padding-top: 17px;
    width: 10px;
    height: 14px;
    vertical-align: middle;
  }
</style>
