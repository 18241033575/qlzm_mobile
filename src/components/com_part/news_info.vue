<template>
  <!--新闻详情-->
    <div class="news_info">
      <div class="com_det_title">
        <div class="content">
          资讯详情
        </div>
      </div>
      <div class="content">
        <div class="news_info_top">
          <div class="news_info_top_title">
            广东通报一镇纪委书记把《举报信》微信转给被举报人
          </div>
          <div class="news_info_top_tips">
            <span>2018-12-11 16:23</span>阅读:<span>98</span>
          </div>
        </div>
        <div class="news_info_msg">
          <p>未经请示汇报便将该问题线索直接签批给覃巴镇党委书记张阁良和镇党委委员、纪委书记吴永洪处理。吴永洪经与分管扫黑除恶工作的覃巴镇党委副书记庄一峰商议后，严重违反线索管理规定，将《举报信》复印给被举报人之一的覃巴镇党委委员、副镇长宁伯承。其后，宁伯承经由覃巴镇那碌村村民潘添将《举报信》复印件照片通过微信转发给主要被举报对象那碌村原村长潘观景和那碌村委会原副主任潘阮平，导致了泄密事件的发生，潘观景通过他人打电话并到举报人家中质问和威胁举报人，造成恶劣的社会影响。</p>
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
        name: "news_info",
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
      }
    }
</script>

<style scoped>
  .news_info_top{
    margin-top: 10px;
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
    padding-top: 20px;
    text-indent: 2em;
    font-size: 14px;
    color: #666666;
  }
  .news_info_msg p{
    line-height: 24px;
  }
</style>
