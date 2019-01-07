<template>
  <div class="main">
    <!--头部-->
    <div class="head">
      <div class="content">
        <div class="head_top">
          <span class="fl">贵阳&nbsp;<img src="/static/images/down3j.png" alt=""></span><img class="logo" src="/static/images/logo.png" alt=""><img class="main_nav fr" src="/static/images/ic_menu@2x.png" alt="">
        </div>
      </div>
    </div>
    <!--搜索栏-->
    <div class="search">
      <div class="content">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="search_btn">

        </div>
      </div>
    </div>
    <!--轮播-->
    <div class="banner">
      <el-carousel height="120px">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--主导航-->
    <div class="main_nav_cell">
      <div class="content">
        <router-link :to="{}">
          <div class="nav_cell">
            <img src="/static/images/ic_jobs@2x.png" alt="">
            <p>全部职位</p>
          </div>
        </router-link>
        <router-link :to="{}">
          <div class="nav_cell">
            <img src="/static/images/ic_findjob@2x.png" alt="">
            <p>找工作</p>
         </div>
        </router-link>
        <router-link :to="{}">
          <div class="nav_cell">
            <img src="/static/images/ic_mingqi@2x.png" alt="">
            <p>名企招聘</p>
          </div>
        </router-link>
        <router-link :to="{}">
          <div class="nav_cell">
            <img src="/static/images/ic_jyzd@2x.png" alt="">
            <p>就业指导</p>
          </div>
        </router-link>
        <router-link :to="{name: 'user_login'}">
          <div class="nav_cell">
            <img src="/static/images/ic_news@2x.png" alt="">
            <p>新闻资讯</p>
          </div>
        </router-link>
      </div>
    </div>
    <!--急聘-->
    <div class="ugent">
      <div class="content">
        <div class="common_title">
          <img src="/static/images/ic_title_zhaopin@2x.png" alt="">急聘职位
        </div>
        <div class="ugent_body">
          <div class="ugent_cell">
            <div class="ugent_top">
              <span class="ugent_sign">急聘</span><span class="pos_name">一级建造师 - 建筑工程</span><span class="salary fr">8K-10K/月</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">贵阳</span> | <span class="tags">3年以上</span> | <span class="tags">大专</span> | <span class="tags">全职</span><span class="update_time fr">3天前</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--名企招聘-->
    <div class="famous">
      <div class="content">
        <div class="common_title">
          <img src="/static/images/ic_title_mq@2x.png" alt="">名企招聘
        </div>
        <div class="famous_body">
          <div class="famous_cell">
            <div class="famous_head fl">
              <img src="" alt="">
            </div>
            <div class="famous_body">
              <div class="famous_name">
                贵州长右岸建设工程有限公司
              </div>
              <p>招聘职位<span>3个</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
          return{
            options: [{
              value: '1',
              label: '找工作'
            }, {
              value: '2',
              label: '找人才'
            }],
            value: '1'
          }
      }
    }
</script>

<style>
  .main{
    background-color: #f0f1f5;
  }
  /*头部*/
  .head_top{
    width: 100%;
    line-height: 44px;
    text-align: center;
  }
  .head_top span{
    font-size: 14px;
    color: #353535;
  }
  .head_top span img{
    width: 20px;
    height: 15px;
  }
  .head_top img{
    display: inline-block;
    vertical-align: middle;
  }
  .main_nav{
    margin-top: 11px;
    width: 22px;
    height: 22px;
  }

  /*搜索栏*/
  .logo{
    width: 88px;
    height: 24px;
  }
  .search{
    width: 100%;
    padding: 10px 0;
    height: 40px;
    background-color: #ffffff;
  }
  .search .el-select{
    margin-top: 0;
    width: 100px;
    height: 40px;
  }
  .search .el-select::placeholder{
    font-size: 12px;
  }
  .search .el-select .el-input::-webkit-scrollbar-thumb{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .search_btn{
    display: inline-block;
    width: 48px;
    height: 40px;
    background: #5082e6 url("../../static/images/search.png") center center /20px 20px no-repeat;
  }
  /*主导航*/
  .main_nav_cell{
    padding-top: 5px;
    width: 100%;
    height: 95px;
    background-color: #ffffff;
  }
  .nav_cell{
    float: left;
    text-align: center;
    width: 20%;
    height: 65px;
    padding: 12px 0 9px;
  }
  .nav_cell img{
    width: 44px;
    height: 44px;
  }
  .main_nav_cell a {
    font-size: 12px;
    color: #919199;
    text-decoration: none;
  }
  /*公共头部栏*/
  .common_title{
    width: 100%;
    line-height: 36px;
    font-size: 14px;
    color: #353535;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .common_title img{
    margin-right: 5px;
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }
  /*急聘*/
  .ugent{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .ugent_cell{
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ECEFF1;
  }
  .ugent_sign{
    display: inline-block;
    margin-right: 10px;
    width: 30px;
    line-height: 16px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #FF8236;
    color: #ff8236;
    font-size: 12px;
  }
  .pos_name{
    font-size: 14px;
    color: #666666;
  }
  .salary{
    font-size: 12px;
    color: #ff5959;
  }
  .ugent_bottom{
    margin-top: 10px;
  }
  .tags{
    font-size: 12px;
    color: #919199;
  }
  .update_time{
    font-size: 12px;
    color: #919199;
  }
  /*名企招聘*/
  .famous{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .famous_cell{
    padding: 15px 0;
  }
  .famous_head{
    width: 60px;
    height: 60px;
    background-color: aqua;
  }
  .famous_head img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }
</style>
