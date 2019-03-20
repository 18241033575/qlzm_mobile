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
            {{news_infoData.title}}
          </div>
          <div class="news_info_top_tips">
            <span>{{news_infoData.publish_at}}</span>阅读:<span>{{news_infoData.visit}}</span>
          </div>
        </div>
        <div class="news_info_msg">
          <quill-editor id="pos" v-model="news_infoData.content"
                        :options ="editorOption">
          </quill-editor>
          <!--{{news_infoData.content}}-->
        </div>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {timestampToTime} from '../../../static/js/common.js'
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
          news_infoData: {},
          dialogVisible: false,
          editorOption: {
            modules:{
              toolbar: false,
            },
          }
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
        onEditorBlur() {
          console.log(1);
        },
        onEditorFocus() {
          console.log(2);
        },
        onEditorChange() {
          console.log(3);
        }
      },
      created() {
        let id = this.$route.query.id;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/news/detail/' + id)
          .then((res)=>{
            console.log(res);
            if (res.data.state != 400) {
              res.data.publish_at = timestampToTime(res.data.publish_at);
              this.news_infoData = res.data
            }
          })
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
