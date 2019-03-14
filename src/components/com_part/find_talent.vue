<template>
    <div class="find_talent">
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
              <div class="only_fam" :class="{active: this.order == 0}" @click="def">
                默认排序
              </div>
              <div class="only_fam" :class="{active: this.order == 1}" @click="val">
                价值指数
              </div>
              <div class="only_ugent" :class="{active: this.order == 2}" @click="upTime">
                更新时间
              </div>
              <div class="filter_all" @click="job_filter">
                筛选<img src="/static/images/filter.png" alt="filter" >
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
              <div class="filter_part1_cell" >
                省份<span class="fr">贵州省<img src="/static/images/icon_goright.png" alt=""></span>
              </div>
              <div class="filter_part1_cell" data-sign="city" @click="all_choose">
                城市<span class="fr">{{tranCode}}<img src="/static/images/icon_goright.png" alt=""></span>
              </div>
              <div class="filter_part1_cell" data-sign="pos_type" @click="all_choose">
                职位类别<span class="fr">{{tranPosType || '请选择'}}<img src="/static/images/icon_goright.png" alt=""></span>
              </div>
            </div>
            <div class="filter_part2">
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  工作经验
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:index == workExpAct}" :workexp-id="index" @click="workexp_opera" v-for="(item,index) in this.workexpData" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  学历要求
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:index == educationAct}" :education-id="index" @click="education_opera" v-for="(item,index) in educationData" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  工作性质
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:index == natureAct}" :nature-id="index" @click="nature_opera" v-for="(item,index) in natureData" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  薪资要求
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:index == salaryAct}" :salary-id="index" @click="salary_opera" v-for="(item,index) in salaryData" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  到岗时间
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:index == offDayAct}" :offDay-id="index" @click="offDay_opera" v-for="(item,index) in offDayData" :key="index">{{item}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="filter_btn_group">
            <div class="filter_btn reset_btn" @click="reset">
              重置
            </div>
            <div class="filter_btn sub_btn" @click="filter_submit">
              确定
            </div>
          </div>
        </div>
      </div>
      <!--筛选第二层-->
      <div class="filter_all_box" v-show="this.secondBox">
        <div class="filter_bg" @click="secondBoxBg">

        </div>
        <div class="filter_det">
          <div class="filter_s_title">
            <div class="content">
              <img @click="first_back" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">
              <div v-if="showMsg=='city'" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
                {{item}}<img v-show="cityCode[1] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'posType'" v-for="(item,index) in jobClassify" :posType-id="item.value" :key="index" class="filter_part1_cell second" @click="posTypeCode">
                {{item.name}}<img v-show="posTypeNum == item.value" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    </div>
</template>

<script>
    import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature1,transEducation,transWorkexp1,transArrive,transJobs} from '../../../static/js/common.js'
    export default {
        name: "find_talent",
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
          showMsg: '',
          sortNum: 0,
          search_job: '',
          order: 0,
          keyword: '',
          find_jobData: {},
          top_title: '',
          posTypeNum: 0,
          loading: false,
          cityCode: {
            0:'520000',
            1:'520100'
          },
          tranCode: '',
          tranPosType: '全部',
          find_jobParam: {
            page: 1,
            row: 8
          },
          workExpAct: 0,
          educationAct: 0,
          natureAct: 0,
          salaryAct: 0,
          offDayAct: 0,
          workexpData: {

          },
          educationData: {

          },
          natureData: {

          },
          salaryData: {

          },
          offDayData: {

          },
          guiyangData: {
            520100: '贵阳市',
            520200: '六盘水市',
            520300: '遵义市',
            520400: '安顺市',
            520500: '毕节市',
            520600: '铜仁市',
            522300: '黔西南布依族苗族自治州',
            522600: '黔东南苗族侗族自治州',
            522700: '黔南布依族苗族自治州'
          },
          jobClassify: {

          },
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
                transWorkexp1(res.data.data,0);
                transEducation(res.data.data,0);
                transNature1(res.data.data,2);
                transSalary(res.data.data,2);
                this.find_jobData = res.data.data
              }
            })
        },
        // 名企 急聘
        def() {
          this.find_jobParam.order = this.order = 0;
          // this.getjobData(this.find_jobParam)
        },
        val() {
          this.find_jobParam.order = this.order = 1;
          // this.getjobData(this.find_jobParam)
        },
        upTime() {
          this.find_jobParam.order = this.order = 2;
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
          this.firstBox = true;
          this.workexpData = transWorkexp1(this.workexpData,5);
          this.educationData = transEducation(this.educationData,3);
          this.natureData = transNature1(this.natureData,3);
          this.salaryData = transSalary(this.salaryData,3);
          this.offDayData = transArrive(this.offDayData,true,3);
        },
        firstBoxBg() {
          this.outBox = false;
          this.firstBox = false
        },
        secondBoxBg() {
          this.firstBox = false;
          this.secondBox = false
        },
        all_choose(e) {
          let partSign = e.currentTarget.getAttribute('data-sign');
          if (partSign == 'city') {
            this.showMsg = 'city';
            this.top_title = '选择城市'
          } else if (partSign == 'pos_type') {
            this.jobClassify = transJobs(this.jobClassify,5);
            this.showMsg = 'posType';
            this.top_title = '选择职位类别'
          }

          this.secondBox = true
        },
        //返回第一层
        first_back() {
          this.firstBox = true;
          this.secondBox = false
        },
        workexp_opera(e) {
          let wi = e.currentTarget.getAttribute('workexp-id');
          this.workExpAct = wi
        },
        education_opera(e) {
          let wi = e.currentTarget.getAttribute('education-id');
          this.educationAct = wi
        },
        nature_opera(e) {
          let wi = e.currentTarget.getAttribute('nature-id');
          this.natureAct = wi
        },
        salary_opera(e) {
          let wi = e.currentTarget.getAttribute('salary-id');
          this.salaryAct = wi
        },
        offDay_opera(e) {
          let wi = e.currentTarget.getAttribute('offDay-id');
          this.offDayAct = wi
        },
        // 重置
        reset() {
          this.workExpAct = this.educationAct = this.natureAct = this.salaryAct = this.offDayAct = 0;
          this.cityCode[1] = '520100';
          this.tranPosType = '全部';
          this.posTypeNum = 0
        },
        filter_submit() {
          this.find_jobParam.work_exp = this.workExpAct;
          this.find_jobParam.education = this.educationAct;
          this.find_jobParam.nature = this.natureAct;
          this.find_jobParam.salary = this.salaryAct;
          if (this.offDayAct != 0) {
            this.find_jobParam.time = this.offDayAct;
          }
          this.getjobData(this.find_jobParam);
          this.firstBox = false;
        },
        loadMore() {
          //滚动触发事件
          this.loading = true;
          /* setTimeout(() => {
             this.find_jobParam.page +=1;
             let data = this.find_jobParam;
             this.$ajax.get('/company_work',{params: data})
               .then((res)=>{
                 console.log(res);
                 // this.find_jobData = this.find_jobData.assign(res.data.data)
               });
             this.loading = false;
           }, 2500);*/
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[1] = cCode;
          this.firstBox = true;
          this.secondBox = false
        },
        posTypeCode(e) {
          let pos_code = e.currentTarget.getAttribute('posType-id');
          this.posTypeNum = pos_code;
          this.tranPosType = transJobs(pos_code,1);
          this.firstBox = true;
          this.secondBox = false;
          // this.scrollSign = false;
        },
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
              transWorkexp1(res.data.data,0);
              transEducation(res.data.data,0);
              transNature1(res.data.data,2);
              transSalary(res.data.data,2);
              for (let i = 0,len = res.data.data.length;i < len;i++) {
                res.data.data[i].created_time = getDistanceTime(res.data.data[i].created_at,1);
              }
              this.find_jobData = res.data.data
            }
          });
        this.tranCode = tranCity(this.cityCode,true,1)
      },
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
    /*justify-content: space-between;*/
    flex-wrap: wrap;

  }
  .filter_cell{
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    width: 90px; -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 30px;
    background-color: #eaeaea;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
    font-size: 12px;
    color: #666666;
    overflow: hidden;
  }
  /*单元选中样式*/
  .com_active{
    line-height: 28px;
    border: 1px solid #5082E6;
    background-color: #ffffff;
    color: #5082e6;
  }
</style>
