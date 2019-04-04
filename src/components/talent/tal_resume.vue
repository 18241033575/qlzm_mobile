<template>
    <div class="tal_resume">
      <div class="com_det_title">
        <div class="content">
          我的简历
        </div>
      </div>
      <!--列表链接-->
      <div class="opera_list">
        <div class="content">
          <div class="opera_list_box">
            <div class="opera_list_cell" @click="resume_flash">
              <img src="/static/images/ic_refresh@2x.png" alt="">
              <p>刷新简历</p>
            </div>
            <router-link :to="{name: 'pre_resume'}" class="opera_list_cell">
              <img src="/static/images/ic_preview@2x.png" alt="">
              <p>预览简历</p>
            </router-link>
           <!-- <router-link :to="{name: 'tal_resume'}" class="opera_list_cell">
              <img src="/static/images/ic_download@2x.png" alt="">
              <p>下载简历</p>
            </router-link>-->
            <router-link :to="{name: 'tal_privacy'}" class="opera_list_cell">
              <img src="/static/images/ic_privacy@2x.png" alt="">
              <p>简历隐私</p>
            </router-link>
          </div>

        </div>
      </div>
      <!--列表-->
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
    export default {
      name: "tal_resume",
      data() {
          return {
            menuList: {
              0: {
                urlName: "基本信息",
                urlRoute: "tal_bas_msg"
              },
              1: {
                urlName: "求职意向",
                urlRoute: "int_job"
              },
              2:{
                urlName: "工作经历",
                urlRoute: "tal_work"
              },
              3:{
                urlName: "项目经验",
                urlRoute: "tal_project"
              },
              4:{
                urlName: "教育经历",
                urlRoute: "tal_education"
              },
              5:{
                urlName: "建筑行业证书",
                urlRoute: "tal_cert"
              },
              6:{
                urlName: "自我评价",
                urlRoute: "self_eval"
              }
            },
          }
      },
      methods: {
        resume_flash() {
            this.$ajax.get('/resume/refresh',{params:{}})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                }
              })
          }
      },
    }
</script>

<style scoped>
  .tal_resume .com_det_title{
    background-color: #ffffff;
  }
  /*列表链接*/
  .opera_list{
    margin-bottom: 10px;
    width: 100%;
    height: 90px;
    background-color: #ffffff;
  }
  .opera_list_box{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .opera_list_cell{
    text-decoration: none;
    padding-top: 12px;
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
    color: #919199;
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
