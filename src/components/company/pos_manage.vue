<template>
  <!--职位管理-->
    <div class="pos_manage">
      <div class="com_det_title">
        <div class="content">
          职位管理
        </div>
      </div>
      <div class="resume_list">
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name"><span>一级建造师</span>-<span>建筑工程</span><img @click="pos_opera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span class="s_sign ugent">急聘</span><span v-show="false" class="s_sign unrelease">未发布</span><span class="s_sign releaseing">发布中</span><span class="s_sign auto">自动</span><span>三天前</span><span>|</span><span>5人投递</span></p>
            <p class="tal_det"><span class="hope_salary">6001 - 8000/月</span><span>贵阳</span><span>|</span><span>三年以上</span><span>|</span><span>大专</span><span>|</span><span>全职</span></p>
          </div>
        </div>
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name"><span>一级建造师</span>-<span>建筑工程</span><img class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span class="s_sign ugent">急聘</span><span v-show="false" class="s_sign unrelease">未发布</span><span class="s_sign releaseing">发布中</span><span class="s_sign auto">自动</span><span>三天前</span><span>|</span><span>5人投递</span></p>
            <p class="tal_det"><span class="hope_salary">6001 - 8000/月</span><span>贵阳</span><span>|</span><span>三年以上</span><span>|</span><span>大专</span><span>|</span><span>全职</span></p>
          </div>
        </div>
        <div class="resume_list_cell">
          <div class="content">
            <p class="tal_name"><span>一级建造师</span>-<span>建筑工程</span><img class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span class="s_sign ugent">急聘</span><span v-show="false" class="s_sign unrelease">未发布</span><span class="s_sign releaseing">发布中</span><span class="s_sign auto">自动</span><span>三天前</span><span>|</span><span>5人投递</span></p>
            <p class="tal_det"><span class="hope_salary">6001 - 8000/月</span><span>贵阳</span><span>|</span><span>三年以上</span><span>|</span><span>大专</span><span>|</span><span>全职</span></p>
          </div>
        </div>
      </div>
      <!--职位管理操作弹层-->
      <div class="pos_opera_box" @click="cancel_opera" v-show="this.opera_state">
        <div class="opera_list">
          <div class="content">
            <div class="opera_cell">
              发布
            </div>
            <div class="opera_cell">
              编辑
            </div>
            <div class="opera_cell pos_del">
              删除
            </div>
            <div class="opera_cell">
              撤回
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
        name: "pos_manage",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          opera_state: false
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
        pos_opera(e) {
          this.opera_state = true;
        },
        cancel_opera() {
          this.opera_state = false;
        }
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
  .tal_det .s_sign{
    padding: 3px 4px;
    line-height: 16px;
  }
  .tal_det .ugent{
    color: #ff8236;
    border: 1px solid #FF8236;
  }
  .tal_det .unrelease{
    color: #919199;
    border: 1px solid #919199;
  }
  .tal_det .releaseing{
    color: #5082E6;
    border: 1px solid #5082E6;
  }
  .tal_det .auto{
    color: #49B779;
    border: 1px solid #49B779;
  }
  .tal_det span{
    margin-right: 10px;
  }
  .hope_salary{
    color: #ff5959;
  }
  /*职位管理操作弹层*/
  .pos_opera_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(0,0,0,.5);
    z-index: 9999999;
  }
  .opera_list{
    width: 100%;
    margin: 50% auto;
  }
  .opera_cell{
    background-color: #ffffff;
    font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .pos_del{
    color: #ff5959;
  }
</style>
