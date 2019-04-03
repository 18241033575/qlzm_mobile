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
          <quill-editor id="msg" v-model="msgDetData.content"
                        @ready="onEditorReady($event)"
                        :options ="editorOption">
          </quill-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDistanceTime} from '../../../static/js/common.js'
    export default {
      name: "sys_msg_det",
      data() {
        return {
          msgDetData: {},
          editorOption: {
            modules:{
              toolbar: false,
            },
          }
        }
      },
      methods: {
        onEditorReady(val) {
          val.enable(false);
        },
      },
      created() {
        let id = this.$route.query.id;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          this.$ajax.get('/personal/sysmsg',{params: {uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                for (let i = 0,len = res.data.length; i < len;i++) {
                  if (res.data[i].id == id) {
                    this.msgDetData = res.data[i];
                  }
                }
              }
            });
        }
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        if (companyInfo) {
          this.$ajax.get('/company/get-messages',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                for (let i = 0,len = res.data.length; i < len;i++) {
                  if (res.data[i].id == id) {
                    this.msgDetData = res.data[i];
                    this.msgDetData.created_at = getDistanceTime(this.msgDetData.created_at,0);
                  }
                }
              }
            })
        }
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
