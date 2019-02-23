<template>
  <!--招聘管理-->
    <div class="recruit_manage">
      <div class="com_det_title">
        <div class="content">
          招聘管理
        </div>
      </div>
      <!--列表链接-->
      <div class="opera_list">
        <div class="content">
          <div class="opera_list_box">
            <router-link :to="{name: 'recruit_set'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_seeting@2x.png" alt="">
              <p>招聘设置</p>
            </router-link>
            <router-link :to="{name: 'release_office'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_post@2x.png" alt="">
              <p>发布职位</p>
            </router-link>
            <router-link :to="{name: 'pos_manage'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_mannage@2x.png" alt="">
              <p>职位管理</p>
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
            <router-link :to="{name: 'enterp_com_resume'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_ms@2x.png" alt="">
              <p>面试邀请</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orig: 2}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_colme@2x.png" alt="">
              <p>收藏过我</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--数据统计-->
      <div class="data_count">
        <div class="content">
          <p class="count_title">数据统计</p>
          <div class="data_cell">
            <span class="data_cell_label">发布的职位</span><span class="fr"><span class="data_num">12</span>个</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">发出的面试邀请</span><span class="fr"><span class="data_num">125</span>次</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">下载简历</span><span class="fr"><span class="data_num">201</span>份</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">收藏简历</span><span class="fr"><span class="data_num">500</span>份</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">职位浏览量</span><span class="fr"><span class="data_num">1889</span>次</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">职位被收藏</span><span class="fr"><span class="data_num">2078</span>次</span>
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
        name: "recruit_manage",
      components: {
        main_menu,
        menu_list_pic,
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
      }
    }
</script>

<style scoped>
  /*列表链接*/
  .opera_list{
    clear: both;
    width: 100%;
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
  /*数据统计*/
  .data_count{
    background-color: #ffffff;
    padding: 15px 0;
  }
  .count_title{
    font-size: 14px;
    color: #919199;
    font-weight: bold;
  }
  .data_cell{
    margin-top: 10px;
    padding: 0 10px;
    line-height: 60px;
    background-color: #f9f9f9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    font-size: 14px;
    color: #919199;
  }
  .data_cell_label{
    color: #666666;
    font-weight: bold;
  }
  .data_num{
    margin-right: 5px;
    font-size: 18px;
    color: #5082e6;
    line-height: 24px;
  }
</style>
