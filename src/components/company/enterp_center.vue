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
            <img :src="centerDetData.logo || '/static/images/company_def_logo.png'" alt="">
          </div>
          <div class="com_msg fl">
            <p class="com_name">{{enterp_centerData.name}}</p>
            <p class="com_msg_det">
              <span>{{centerDetData.nature}}</span><span>|</span><span>{{centerDetData.scale}}</span><span>|</span><span>{{(centerDetData.province || '') + (centerDetData.city || '')}}</span>
            </p>
            <p v-if="enterp_centerData.state != 1" class="com_msg_iden"><img src="/static/images/ic_cm_authed@2x.png" alt="">未认证<span @click="go_ident" class="go_iden">[去认证]</span></p>
            <p v-if="enterp_centerData.state == 1" class="com_msg_idened"><img src="/static/images/ic_cm_auth.png" alt="">已认证</p>
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
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'app'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_resume@2x.png" alt="">
              <p>应聘简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query:{orign: 'buy'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_buyres@2x.png" alt="">
              <p>购买的简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'collect'}}" class="opera_list_cell">
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
    </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transComNature,transComScale,splicLogo} from '../../../static/js/common.js'
    export default {
      name: "enterp_center",
      data () {
          return {
            menuList: {
              0: {
                urlName: "招聘管理",
                urlRoute: "recruit_manage"
              },
              1: {
                urlName: "会员服务",
                urlRoute: "mem_server"
              },
              2:{
                urlName: "企业信息设置",
                urlRoute: "enterp_info_set"
              },
              3:{
                urlName: "账号管理",
                urlRoute: "account_manage"
              },
              4:{
                urlName: "消息",
                urlRoute: "sys_msg"
              }
            },
            enterp_centerData: {

            },
            centerDetData: {

            },
          }
      },
      methods: {
        go_ident() {
          this.$router.push({name: 'enterp_ident'})
        }
      },
      created() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/company/base',{params:{cid: companyInfo.id}})
            .then((res)=>{
              if (res.state != 400) {
                this.enterp_centerData = res.data;
                transComScale(res.data.info,true);
                transComNature(res.data.info,true,1);
                splicLogo(res.data.info,1);
                tranCity(res.data.info,true,0);
                tranProvince(res.data.info,true);
                this.centerDetData = res.data.info;
              }
            })
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
  .com_logo{
    width: 68px;
    height: 68px;
    border-radius: 200px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    overflow: hidden;
  }
  .com_logo img{
    width: 100%;
    height: 100%;
  }
  .com_msg{
    margin-left: 15px;
    width: 70%;
  }
  .com_msg p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    padding-right: 5px;
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
    vertical-align: top;
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
