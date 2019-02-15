<template>
  <!--面试邀请记录详情-->
  <div class="invited_det" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <div class="com_det_title">
      <div class="content">
        面试邀请详情
      </div>
    </div>
    <div class="invited_body">
      <div class="content">
        <div class="invite_top">
          <p>“{{inteDetData.name}}”的面试邀请</p>
          <p class="send_time">{{intDetData.created_at}}</p>
        </div>
        <div class="bottom_msg">
          <p><span class="left_lab">职位</span> <span class="right_msg">{{intDetData.job}}</span></p>
          <p><span class="left_lab">联系人</span> <span class="right_msg">{{intDetData.username}}</span></p>
          <p><span class="left_lab">手机</span> <span class="right_msg">{{intDetData.phone}}</span></p>
          <p><span class="left_lab">座机</span> <span class="right_msg">{{intDetData.tel}}</span></p>
          <p><span class="left_lab">QQ</span> <span class="right_msg">{{intDetData.qq}}</span></p>
          <p><span class="left_lab">邮箱</span> <span class="right_msg">{{intDetData.email}}</span></p>
          <p><span class="left_lab">面试地址</span> <span class="right_msg">{{intDetData.address}}</span></p>
          <p><span class="left_lab">提醒事项</span> <span class="right_msg">{{intDetData.remind}}</span></p>
        </div>
      </div>
    </div>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {getDistanceTime} from '../../../static/js/common.js'
    export default {
        name: "tal_invited_det",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          intDetData: {},
          inteDetData: {}
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
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/personal/interview',{params: {uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              let rdata = {};
              for (let i = 0,len = res.data.length; i < len;i++) {
                rdata[i] = res.data[i].company;
                rdata[i].id = res.data[i].id;
                if (id == rdata[i].id) {
                  res.data[i].created_at = getDistanceTime(res.data[i].created_at);
                  this.intDetData = res.data[i];
                  this.inteDetData = rdata[i]
                }
              }
            }
          })
      }
    }
</script>

<style scoped>
  .invited_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .invite_top{
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .invite_top p{
    line-height: 18px;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
  }
  .invite_top .send_time{
    margin-top: 15px;
    font-size: 12px;
    color: #919199;
    font-weight: normal;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg p{
    display: flex;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    min-width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    flex-grow: 1;
    color: #666666;
  }
</style>
