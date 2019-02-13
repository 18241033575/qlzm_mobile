<template>
    <!--新闻资讯-->
  <div class="news_total">
    <div class="com_det_title">
      <div class="content">
        新闻资讯
      </div>
    </div>
    <div class="news_total_list">
      <div class="content">
        <div class="news_total_cell" @click="news_total_det">
          <div class="news_total_cell_title">
            <span>一项研究表明，运动所分泌激素可能有助于对抗阿尔茨海默病</span><img v-show="false" src="/static/images/banner03@2x.png" alt="">
          </div>
          <div class="news_total_cell_tip">
            <span>刚刚刚刚刚刚</span>阅读<span>(98)</span>
          </div>
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
        name: "news",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
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
        news_total_det() {
          this.$router.push({name: 'news_info'})
        }
      }
    }
</script>

<style scoped>
  .news_total_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .news_total_cell{
    /*line-height: 90px;*/
    height: 90px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .news_total_cell_title{
    display: flex;
  }
  .news_total_cell_title span{
    flex-grow: 1;
    margin-top: 15px;
    font-size: 14px;
    color: #353535;
    line-height: 22px;
    font-weight: bold;
  }
  .news_total_cell_title img{
    margin-top: 15px;
    width: 88px;
    height: 45px;
    vertical-align: middle;
  }
  .news_total_cell_tip{
    font-size: 12px;
    color: #919199;
  }
  .news_total_cell_tip span{
    margin-right: 20px;
  }
</style>
