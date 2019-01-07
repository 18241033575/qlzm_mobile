<template>
  <div class="main">
    <div class="head">
      <div class="content">
        <div class="head_top">
          <span class="fl">贵阳&nbsp;<img src="/static/images/down3j.png" alt=""></span><img class="logo" src="/static/images/logo.png" alt=""><img class="main_nav fr" src="/static/images/ic_menu@2x.png" alt="">
        </div>
      </div>
    </div>

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
    <div class="banner">
      <el-carousel height="120px">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main_nav_cell">
      <div class="content">

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
    width: 100%;
    height: 100px;
  }
</style>
