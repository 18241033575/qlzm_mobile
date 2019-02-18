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
          <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="8">
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
          </ul>
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
              职位类别<span class="fr">{{tranValue}}<img src="/static/images/icon_goright.png" alt=""></span>
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
                <span class="filter_cell" :class="{com_active:index == educationAct}" :education-id="index" @click="education_opera" v-for="(item,index) in this.educationData" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作性质
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:index == natureAct}" :nature-id="index" @click="nature_opera" v-for="(item,index) in this.natureData" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                薪资要求
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:index == salaryAct}" :salary-id="index" @click="salary_opera" v-for="(item,index) in this.salaryData" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                发布时间
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:index == offDayAct}" :offDay-id="index" @click="offDay_opera" v-for="(item,index) in this.offDayData" :key="index">{{item}}</span>
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
            <div v-if="showMsg" v-for="(item,index) in guiyangData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
              {{item}}<img v-show="cityCode[1] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="!showMsg" v-for="(item,index) in jobClassify" :classify-id="item.value" :key="index" class="filter_part1_cell second" @click="ClassifyVal">
              {{item.name}}<img v-show="classifyValue == item.value" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
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
        showMsg: true,
        sortNum: 0,
        search_job: '',
        famFlag: false,
        ugentFlag: false,
        sort_sign: false,
        keyword: '',
        find_jobData: {},
        top_title: '',
        loading: false,
        cityCode: {
          0:'520000',
          1:'520100'
        },
        classifyValue: '0',
        tranCode: '',
        tranValue: '全部',
        sortList: {
          0: "默认排序",
          1: "薪资水平",
          2: "更新时间"
        },
        find_jobParam: {
          page: 1,
          row: 8
        },
        workexpData: {
          0: "不限",
          1: "1年以下",
          2: "1-3年",
          3: "3-5年",
          4: "5-10年",
          5: "10年以上"
        },
        workExpAct: 0,
        educationData: {
          0: "不限",
          1: "小学及以下",
          2: "初中",
          3: "中专",
          4: "高中",
          5: "大专",
          6: "本科",
          7: "硕士研究生",
          8: "博士及以上"
        },
        educationAct: 0,
        natureData: {
          0: "不限",
          1: "全职",
          2: "项目"
        },
        natureAct: 0,
        salaryData: {
          0: "面议",
          1: "2000以下",
          2: "2001-4000",
          3: "4001-6000",
          4: "6001-8000",
          5: "8001-10000",
          6: "10001-15000",
          7: "15001-25000",
          8: "2.5w-5w",
          9: "5w-10w",
          10: "10w以上"
        },
        salaryAct: 0,
        offDayData: {
          0: "不限",
          1: "今天",
          2: "三天内",
          3: "一周内",
          4: "十五天内",
          5: "一个月内"
        },
        offDayAct: 0,
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
        jobClassify: [
          {"name": "意向职位选择", "value": 0, "type": "optgroup"},
          {"name": "工程项目管理", "value": 16, "type":1, 'salary':15000},
          {"name": "工程监理", "value": 17, "type":1, 'salary':10000},
          {"name": "安全管理/安全员", "value": 18, "type":1, 'salary':7000},
          {"name": "建筑工程验收", "value": 19, "type":1, 'salary':4500},
          {"name": "建筑施工现场管理", "value": 20, "type":1, 'salary':6000},
          {"name": "施工队长", "value": 21, "type":1, 'salary':10000},
          {"name": "施工员", "value": 22, "type":1, 'salary':6000},
          {"name": "工程设备管理", "value": 23, "type":1, 'salary':6000},
          {"name": "建筑工程安全管理", "value": 24, "type":1, 'salary':7500},
          {"name": "工程总监", "value": 25, "type":1, 'salary':15000},
          {"name": "建筑工程师/总工", "value": 1, "type": 2, 'salary':20000},
          {"name": "土木/土建工程师", "value": 2, "type": 2, 'salary':9000},
          {"name": "造价师/预算师", "value": 3, "type": 2, 'salary':10000},
          {"name": "幕墙工程师", "value": 4, "type": 2, 'salary':8000},
          {"name": "安防工程师", "value": 5, "type": 2, 'salary':7000},
          {"name": "道路桥梁技术", "value": 6, "type": 2, 'salary':8000},
          {"name": "给排水/制冷/暖通", "value": 7, "type": 2, 'salary':6000},
          {"name": "岩土工程师", "value": 8, "type": 2, 'salary':10000},
          {"name": "水利/港口工程技术", "value": 9, "type": 2, 'salary':8000},
          {"name": "市政工程师", "value": 10, "type": 2, 'salary':15000},
          {"name": "综合布线/弱电", "value": 11, "type": 2, 'salary':11000},
          {"name": "爆破工程师", "value": 12, "type": 2, 'salary':12000},
          {"name": "楼宇自动化", "value": 13, "type": 2, 'salary':20000},
          {"name": "架线和管道工程技术", "value": 14, "type": 2, 'salary':7000},
          {"name": "土建勘察", "value": 15, "type": 2, 'salary':12000},
          {"name": "测绘/测量", "value": 26,"type":3, 'salary':6000},
          {"name": "园林/景观设计", "value": 27,"type":3, 'salary':8000},
          {"name": "建筑设计师/制图师", "value": 28,"type":3, 'salary':6000},
          {"name": "建筑制图", "value": 29,"type":3, 'salary':8500},
          {"name": "室内装潢设计", "value": 30,"type":3, 'salary':7000},
          {"name": "城市规划与设计", "value": 31,"type":3, 'salary':12500},
          {"name": "软装设计师", "value": 32,"type":3, 'salary':10000},
          {"name": "硬装设计师", "value": 33,"type":3, 'salary':9000},
          {"name": "橱柜设计师", "value": 34,"type":3, 'salary':10500},
          {"name": "资料员", "value": 35, "type":4, 'salary':6000},
          {"name": "开发报建", "value": 36, "type":4, 'salary':6000},
          {"name": "工程资料管理", "value": 37, "type":4, 'salary':5000}
        ]
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
      },
      secondBoxBg() {
        this.firstBox = false;
        this.secondBox = false
      },
      all_choose(e) {
        let partSign = e.currentTarget.getAttribute('data-sign');
        if (partSign == 'city') {
          this.showMsg = true;
          this.top_title = '选择城市'
        } else if (partSign == 'pos_type') {
          this.showMsg = false;
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
        this.tranValue = '全部';
        this.classifyValue = '0'
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
      ClassifyVal(e) {
        let cClassify = e.currentTarget.getAttribute('classify-id');
        this.classifyValue = cClassify;
        this.firstBox = true;
        this.secondBox = false
      }
    },
    created() {
      if (this.$route.query.province) {
        this.keyword = this.find_jobParam.office_name = this.$route.query.office_name;
        this.find_jobParam.province = this.$route.query.province;
      }
      let data = this.find_jobParam;
     /* this.$ajax.get('/company_work',{params: data})
        .then((res)=>{
          if (res.data.code == 200) {
            tranCity(res.data.data,true,2);
            transWorkexp(res.data.data,0);
            transEducation(res.data.data,0);
            transNature(res.data.data,2);
            transSalary(res.data.data,2);
            this.find_jobData = res.data.data
          }
        });*/
      this.tranCode = tranCity(this.cityCode,true,1)
    },
    updated() {
      this.tranCode = tranCity(this.cityCode,true,1);
      this.find_jobParam.city = this.cityCode[1];
      for (let i = 0,len = this.jobClassify.length; i < len; i++) {
        if (this.jobClassify[i].value == this.classifyValue) {
          this.tranValue = this.jobClassify[i].name;
        }
      }
      if (this.classifyValue == '0') {
        this.tranValue = '全部';
      }


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
  /*第二层*/
  .filter_s_title{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #353535;
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
