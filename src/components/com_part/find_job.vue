<template>
  <div class="find_job" :class="{stop_scroll: this.openState || this.outBox}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <!--职位搜索-->
    <div class="search_job">
      <div class="content">
        <div class="search_box">
          <input type="text" v-model="keyword" placeholder="请输入关键词进行搜索！"><span @click="search_job_click" class="search_job_btn"><img src="/static/images/ic_search_gray@2x.png" alt=""></span>
        </div>
      </div>
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
            <div class="filter_all" @click="job_filter">
              筛选<img src="/static/images/filter.png" alt="filter" >
            </div>
          </div>
        </div>
      </div>
      <div class="sort_list" v-show="sort_sign">
        <div class="sort_list_cell" :sort-num="index" v-for="(item,index) in this.sortList" :key="index" @click="sort_opera">
          <div class="content">
            <div class="sort_list_cell_box">
              {{item}} <img v-show="index==sortNum" src="/static/images/ic_checked@2x.png" alt="checked">
            </div>
          </div>
        </div>
       <!-- <div class="sort_list_cell">
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
        </div>-->
      </div>
    </div>
    <!--找工作-->
    <div class="ugent">
      <div class="content">
        <div class="ugent_body">
          <div class="ugent_cell" v-for="(item,index) in find_jobData" :key="index">
            <div class="ugent_top">
              <span v-if="item.is_urgent" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span> | <span class="tags">{{item.education}}</span> | <span
              class="tags">{{item.nature}}</span><span class="update_time fr">{{item.created_at}}</span>
              <p><img v-if="item.has_m" src="/static/images/ic_fam_comp@2x.png" alt="">{{item.company_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--筛选第一层-->
    <div class="filter_all_box" v-show="this.firstBox">
      <div class="filter_bg" @click="firstBoxBg">

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
    <div class="filter_all_box" v-show="this.secondBox">
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
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,company_adv} from '../../../static/js/common.js'
  export default {
    name: "find_job",
    components: {
      main_menu,
      menu_list_pic
    },
    data() {
      return {
        /*总菜单状态*/
        openState: false,
        sort_msg: '默认排序',
        outBox: false,
        firstBox: false,
        secondBox: false,
        sortNum: 0,
        search_job: '',
        famFlag: false,
        ugentFlag: false,
        sort_sign: false,
        keyword: '',
        find_jobData: {},
        sortList: {
          0: "默认排序",
          1: "薪资水平",
          2: "更新时间"
        },
        find_jobParam: {
          page: 1,
          row: 8
        }
      }
    },
    methods: {
      /*总菜单操作s*/
      get_sign(data) {
        this.openState = !data;
      },
      //排序
      sort_opera(e) {
        let sort_index = e.currentTarget.getAttribute('sort-num');
        if (this.sortNum == sort_index) {

        } else {
          this.sortNum = sort_index;
          console.log('请求数据');
          this.find_jobParam.order = sort_index;
          this.getjobData(this.find_jobParam)
        }
        this.sort_msg = this.sortList[sort_index];
        this.sort_sign = false
      },
      getIsopen(data) {
        this.openState = data;
      },
      /*总菜单操作e*/
      getjobData(param) {
        let data = param;
        this.$ajax.get('/company_work',{params: data})
          .then((res)=>{
            if (res.data.code == 200) {
              tranCity(res.data.data,true,2);
              transWorkexp(res.data.data,0);
              transEducation(res.data.data,0);
              transNature(res.data.data,2);
              transSalary(res.data.data,2);
              this.find_jobData = res.data.data
            }
          })
      },
      // 名企 急聘
      only_fam() {
        this.famFlag = !this.famFlag;
        this.find_jobParam.has_m = this.famFlag == true?1:0;
        this.getjobData(this.find_jobParam)
      },
      only_ugent() {
        this.ugentFlag = !this.ugentFlag;
        this.find_jobParam.is_urgent = this.ugentFlag == true?1:0;
        this.getjobData(this.find_jobParam)
      },
      rotate() {
        this.sort_sign = !this.sort_sign
      },
      //搜索
      search_job_click() {
        this.find_jobParam.office_name = this.keyword;
        this.find_jobParam.province = '520000';
        this.getjobData(this.find_jobParam)
      },
      //筛选
      job_filter() {
        this.outBox = true;
        this.firstBox = true
      },
      firstBoxBg() {
        this.outBox = false;
        this.firstBox = false
      }
    },
    created() {
      if (this.$route.query.province) {
        this.keyword = this.find_jobParam.office_name = this.$route.query.office_name;
        this.find_jobParam.province = this.$route.query.province;
      }
      let data = this.find_jobParam;
      this.$ajax.get('/company_work',{params: data})
        .then((res)=>{
          if (res.data.code == 200) {
            tranCity(res.data.data,true,2);
            transWorkexp(res.data.data,0);
            transEducation(res.data.data,0);
            transNature(res.data.data,2);
            transSalary(res.data.data,2);
            this.find_jobData = res.data.data
          }
        })
    }
  }
</script>

<style scoped>
  /*搜索栏*/
  .search_job {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 44px;
    height: 44px;
    border-bottom: 1px solid #E1E4E6;
    background-color: #ffffff;
  }
  .search_box{
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    line-height: 44px;
    height: 44px;
  }
  .search_box input {
    width: 75%;
    padding: 0;
    padding-left: 10px;
    border-width: 0;
    height: 28px;
    border: none;
    background-color: #eaeaea;
  }
  .search_box input:focus{
    outline: none;
  }
  .search_job_btn{
    display: inline-block;
    line-height: 28px;
    width: 28px;
    text-align: center;
    background-color: #eaeaea;
  }
  .search_job_btn img{
    width: 22px;
    height: 22px;
    vertical-align: middle;
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
    position: sticky;
    top: 0;
    background-color: #ffffff;
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
    top: 45px;
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
    color: #e1e4e6;
  }
  .ugent_bottom p {
    margin-top: 10px;
    font-size: 12px;
    line-height: 12px;
    color: #919199;
  }

  .ugent_bottom p img {
    margin-right: 5px;
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }

  .tags {
    font-size: 12px;
    color: #666666;
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
    overflow-y: scroll;
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
  .filter_part2{
    margin-bottom: 52px;
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
