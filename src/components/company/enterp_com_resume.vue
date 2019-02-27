<template>
  <!--企业中心 应聘、购买、收藏、面试邀请、被收藏简历列表-->
    <div class="com_resume">
      <div class="com_det_title">
        <div class="content">
          应聘简历
        </div>
      </div>
      <div class="resume_list">
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name">张三<img v-if="!opera_state" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""><img v-if="opera_state" class="fr" src="/static/images/ic_cm_down@2x.png" alt=""></p>
            <p class="tal_det"><span>男</span><span>|</span><span>33岁</span><span>|</span><span>无经验</span><span>|</span><span>博士及以上</span><span>|</span><span>建筑工程</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">6001 - 8000/月</span></p>
          </div>
        </div>
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name">张三<img class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span>男</span><span>|</span><span>33岁</span><span>|</span><span>无经验</span><span>|</span><span>博士及以上</span><span>|</span><span>建筑工程</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">6001 - 8000/月</span></p>
          </div>
        </div>
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name">张三<img class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span>男</span><span>|</span><span>33岁</span><span>|</span><span>无经验</span><span>|</span><span>博士及以上</span><span>|</span><span>建筑工程</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">6001 - 8000/月</span></p>
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
    export default {
        name: "enterp_com_resume",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          opera_state: true,
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
          let  org = this.$route.query.orign;
          console.log(org);
      }
    }
</script>

<style scoped>
  .resume_list_cell{
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
  }
  .tal_name{
    padding: 15px 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .tal_name img{
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
  .tal_det{
    font-size: 12px;
    color: #919199;
    line-height: 24px;
  }
  .tal_det span{
    margin-right: 10px;
  }
  .hope_salary{
    margin-left: 10px;
    color: #ff5959;
  }
</style>
