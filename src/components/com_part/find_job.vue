<template>
  <div class="find_job">
    <!--职位搜索-->
    <div class="search_job">
      <input type="text" placeholder="请输入关键词进行搜索！">
      <img class="main_nav fr" src="/static/images/ic_menu@2x.png" alt="">
    </div>
    <!--筛选-->
    <div class="filter">
      <div class="filter_box">
        <div class="content">
          <div class="filter_box_det">
            <div class="sort" @click="rotate">
              {{sort_msg}}<img :class="{rotate: this.sort_sign}" class="trans" src="/static/images/ic_drop_down@2x.png"
                               alt="down">
            </div>
            <div class="only_fam" :class="{active: this.famFlag}" @click="only_fam">
              只看名企
            </div>
            <div class="only_ugent" :class="{active: this.ugentFlag}" @click="only_ugent">
              只看急聘
            </div>
            <div class="filter_all">
              筛选<img src="/static/images/filter.png" alt="filter">
            </div>
          </div>
        </div>
      </div>
      <div class="sort_list" v-show="sort_sign">
        <div class="sort_list_cell">
          <div class="content">
            <div class="sort_list_cell_box">
              默认排序 <img src="/static/images/ic_checked@2x.png" alt="checked">
            </div>
          </div>
        </div>
        <div class="sort_list_cell">
          <div class="content">
            <div class="sort_list_cell_box">
              薪资水平 <img v-show="false" src="/static/images/ic_checked@2x.png" alt="checked">
            </div>
          </div>
        </div>
        <div class="sort_list_cell">
          <div class="content">
            <div class="sort_list_cell_box">
              更新时间 <img v-show="false" src="/static/images/ic_checked@2x.png" alt="checked">
            </div>
          </div>
        </div>
      </div>
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
              <span class="tags">贵阳</span> | <span class="tags">3年以上</span> | <span class="tags">大专</span> | <span
              class="tags">全职</span><span class="update_time fr">3天前</span>
              <p><img src="/static/images/ic_fam_comp@2x.png" alt="">贵州大鱼路桥工程有限公司</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--筛选第一层-->
    <div class="filter_all_box" v-show="false">
      <div class="filter_bg">

      </div>
      <div class="filter_det">
        <div class="content">
          <div class="filter_part1">
            <div class="filter_part1_cell">
              省份<span class="fr">贵州省<img src="/static/images/icon_goright.png" alt=""></span>
            </div>
            <div class="filter_part1_cell">
              城市<span class="fr">贵阳市<img src="/static/images/icon_goright.png" alt=""></span>
            </div>
            <div class="filter_part1_cell">
              职位类别<span class="fr">全部<img src="/static/images/icon_goright.png" alt=""></span>
            </div>
          </div>
          <div class="filter_part2">
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span><span class="filter_cell">高中</span>
              </div>
            </div>
          </div>
        </div>
        <div class="filter_btn_group">
          <div class="filter_btn reset_btn">
            重置
          </div>
          <div class="filter_btn sub_btn">
            确定
          </div>
        </div>
      </div>
    </div>
    <!--筛选第二层-->
    <div class="filter_all_box" v-show="false">
      <div class="filter_bg">

      </div>
      <div class="filter_det">
        <div class="filter_s_title">
          <div class="content">
            <img src="/static/images/left.png" alt="left">选择城市
          </div>
        </div>
        <div class="content">
          <div class="filter_part1">
            <div class="filter_part1_cell second">
              贵阳市<img class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div class="filter_part1_cell second">
              贵阳市<img class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div class="filter_part1_cell second">
              贵阳市<img class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
          </div>
        </div>
        <div class="filter_btn_group">
          <div class="filter_btn reset_btn">
            重置
          </div>
          <div class="filter_btn sub_btn">
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "find_job",
    data() {
      return {
        sort_msg: '默认排序',
        search_job: '',
        famFlag: false,
        ugentFlag: false,
        sort_sign: false
      }
    },
    methods: {
      // 名企 急聘
      only_fam() {
        this.famFlag = !this.famFlag
      },
      only_ugent() {
        this.ugentFlag = !this.ugentFlag
      },
      rotate() {
        this.sort_sign = !this.sort_sign
      }
    }
  }
</script>

<style scoped>
  /*搜索栏*/
  .search_job {
    display: flex;
    justify-content: space-between;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 44px;
    height: 44px;
    border-bottom: 1px solid #E1E4E6;
  }

  .search_job .el-input {
    height: 28px;
  }

  .search_job .el-input--suffix .el-input__inner {
    height: 28px;
  }

  .main_nav {
    margin-top: 11px;
    width: 22px;
    height: 22px;
  }

  /*筛选*/
  .filter {

  }

  .filter_box {
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    line-height: 44px;

    font-size: 12px;
    color: #919199;
  }
  .filter_box_det{
    display: flex;
    justify-content: space-between;
  }
  .filter_box img {
    margin-left: 5px;
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }

  .active {
    color: #5082e6;
  }

  .sort {
    color: #5082e6;
  }
  .sort_list{
    position: absolute;
    top: 88px;
    width: 100%;
    background-color: #ffffff;
    z-index: 999999;
  }
  .sort_list_cell {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 44px;
    font-size: 14px;
    color: #919199;
    border-bottom: 1px solid #E1E4E6;
  }

  .sort_list_cell_box {
    display: flex;
    justify-content: space-between;
  }

  .sort_list_cell img {
    padding-top: 13px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  .trans {
    -webkit-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    -o-transition: .5s;
    transition: .5s;
  }

  .rotate {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  /*急聘*/
  .ugent {
    margin-top: 10px;
    background-color: #ffffff;
  }

  .ugent_cell {
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ECEFF1;
  }

  .ugent_sign {
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

  .pos_name {
    font-size: 14px;
    color: #666666;
  }

  .salary {
    font-size: 12px;
    color: #ff5959;
  }

  .ugent_bottom {
    margin-top: 10px;
  }

  .ugent_bottom p {
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
    line-height: 12px;
  }

  .ugent_bottom p img {
    margin-right: 5px;
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }

  .tags {
    font-size: 12px;
    color: #919199;
  }

  .update_time {
    font-size: 12px;
    color: #919199;
  }

  /*筛选弹层*/
  .filter_all_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
    z-index: 9999999;
  }
  .filter_bg{
    width: 10%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .filter_det{
    width: 90%;
    height: 100vh;
    background-color: #ffffff;
  }
  .filter_btn_group{
    position: fixed;
    bottom: 0;
    width: 90%;
    display: flex;
  }
  .filter_btn{
    width: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
  }
  .reset_btn{
    color: #999999;
    background-color: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #EAEAEA;
  }
  .sub_btn{
    background-color: #5082e6;
    color: #ffffff;
  }
  .filter_part1_cell{
    line-height: 44px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #EAEAEA;
    color: #353535;
  }
  .filter_part1_cell span{
    color: #919199;
  }
  .filter_part1_cell img{
    margin-left: 5px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  .part2_cell_title{
    line-height: 36px;
    font-size: 12px;
    color: #999999;
  }
  .part2_cell_body{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .filter_cell{
    display: inline-block;
    margin-bottom: 10px;
    width: 90px;
    line-height: 30px;
    background-color: #eaeaea;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
    font-size: 12px;
    color: #666666;
  }
  /*第二层*/
  .filter_s_title{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .filter_s_title img{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .second{
    color: #919199;
  }
  .second img{
    padding-top: 14px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
</style>
