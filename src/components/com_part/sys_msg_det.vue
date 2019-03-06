<template>
    <!--消息详情-->
  <div class="sys_msg_det">
    <div class="com_det_title">
      <div class="content">
        消息详情
      </div>
    </div>
    <div class="sys_body">
      <div class="content">
        <div class="news_info_top">
          <div class="news_info_top_title">
            {{msgDetData.title}}
          </div>
          <div class="news_info_top_tips">
            <span>{{msgDetData.created_at}}</span>
          </div>
        </div>
        <div class="news_info_msg">
          {{msgDetData.content}}
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
  import {getDistanceTime} from '../../../static/js/common.js'
    export default {
        name: "sys_msg_det",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          msgDetData: {

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
        let id = this.$route.query.id;
        /*let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/company/get-messages' + id)
          .then((res)=>{
            console.log(res);
            if (res.data.state != 400) {
              res.data.publish_at = timestampToTime(res.data.publish_at);
              this.news_infoData = res.data
            }
          })*/
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-messages',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              for (let i = 0,len = res.data.length; i < len;i++) {
                  if (res.data[i].id == id) {
                    this.msgDetData = res.data[i];
                    this.msgDetData.created_at = getDistanceTime(this.msgDetData.created_at,0);
                    console.log(this.msgDetData);
                  }
              }
              this.msgData = res.data;
              /* for (let i = 0,len = res.data.length; i < len;i++) {
                 rdata[i] = res.data[i].company;
                 rdata[i].id = res.data[i].id;
                 rdata[i].isRead = res.data[i].user_is_read
               }
               this.invitedData = rdata;*/
            }
          })
      }
    }
</script>

<style scoped>
  .sys_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .news_info_top{

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .news_info_top_title{
    padding: 15px 0;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
    line-height: 22px;
  }
  .news_info{
    min-height: 100vh;
    background-color: #ffffff;
  }
  .news_info_top_tips{
    padding-bottom: 15px;
    font-size: 12px;
    color: #919199;
  }
  .news_info_top_tips span{
    margin-right: 20px;
  }
  .news_info_msg{
    padding: 20px 0;
    text-indent: 2em;
    font-size: 14px;
    color: #666666;
  }
  .news_info_msg p{
    line-height: 24px;
  }
</style>
