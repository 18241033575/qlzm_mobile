<template>
    <div class="find_job">
      <!--职位搜索-->
      <div class="search_job">
        <input type="text" placeholder="请输入关键词进行搜索！">
        <img class="main_nav fr" src="/static/images/ic_menu@2x.png" alt="">
      </div>
      <!--筛选-->
      <div class="filter">
        排序
      </div>
      <!--急聘-->
      <div class="ugent">
        <div class="content">
          <div class="ugent_body">
            <div class="ugent_cell">
              <div class="ugent_top">
                <span class="ugent_sign">急聘</span><span class="pos_name">一级建造师 - 建筑工程</span><span class="salary fr">8K-10K/月</span>
              </div>
              <div class="ugent_bottom">
                <span class="tags">贵阳</span> | <span class="tags">3年以上</span> | <span class="tags">大专</span> | <span class="tags">全职</span><span class="update_time fr">3天前</span>
                <p><img src="/static/images/ic_fam_comp@2x.png" alt="">贵州大鱼路桥工程有限公司</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "find_job",
      data(){
          return{
            search_job: ""
          }
      }
    }
</script>

<style scoped>
  /*搜索栏*/
  .search_job{
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 44px;
    border-bottom: 1px solid #E1E4E6;
  }
  .search_job .el-input{
    height: 28px;
  }
  .search_job .el-input--suffix .el-input__inner{
    height: 28px;
  }
  .main_nav{
    margin-top: 11px;
    width: 22px;
    height: 22px;
  }
  /*筛选*/
  .filter{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    line-height: 44px;
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
  .ugent_bottom p{
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
    line-height: 12px;
  }
  .ugent_bottom p img{
    margin-right: 5px;
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }
  .tags{
    font-size: 12px;
    color: #919199;
  }
  .update_time{
    font-size: 12px;
    color: #919199;
  }
</style>
