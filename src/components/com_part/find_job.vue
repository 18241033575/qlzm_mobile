<template>
  <div class="find_job" :class="{stop_scroll: this.outBox}">
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
      </div>
    </div>
    <!--找工作-->
    <div class="ugent" id="findJob">
      <div class="content">
        <div class="load">
          <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomDropText="加载中" ref="loadmore" >
            <div class="ugent_cell" v-for="(item,index) in find_jobData" :key="index" :cid="item.cid" :id="item.id" @click="to_pos_det">
              <div class="ugent_top">
                <span v-if="item.is_urgent" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
              </div>
              <div class="ugent_bottom">
                <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span>| <span class="tags">{{item.hire_num == 0?'若干人':item.hire_num + '人'}}</span> | <span class="tags">{{item.education}}</span> | <span
                class="tags">{{item.nature}}</span><span class="update_time fr">{{item.created_time}}</span>
                <p><img v-if="item.has_m" src="/static/images/ic_fam_comp@2x.png" alt="">{{item.company_name}}</p>
              </div>
            </div>
            <div class="bottom_line" v-show="req_state">
              我也是有底线的
            </div>
          </mt-loadmore>
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
              城市<span class="fr">{{tranCode || '请选择'}}<img src="/static/images/icon_goright.png" alt=""></span>
            </div>
            <div class="filter_part1_cell" data-sign="cert" @click="all_choose">
              证书<span class="fr">{{(tranCategory + (tranMajor == undefined?'':tranMajor)) || '请选择'}}<img src="/static/images/icon_goright.png" alt=""></span>
            </div>
          </div>
          <div class="filter_part2">
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作经验
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:item.id == workExpAct}" :workexp-id="item.id" @click="workexp_opera" v-for="(item,index) in this.workexpData" :key="index">{{item.name}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                学历要求
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:item.id == educationAct}" :education-id="item.id" @click="education_opera" v-for="(item,index) in educationData" :key="index">{{item.name}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                工作性质
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:item.id == natureAct}" :nature-id="item.id" @click="nature_opera" v-for="(item,index) in natureData" :key="index">{{item.name}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                薪资要求
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:item.id == salaryAct}" :salary-id="item.id" @click="salary_opera" v-for="(item,index) in salaryData" :key="index">{{item.name}}</span>
              </div>
            </div>
            <div class="filter_part2_cell">
              <div class="part2_cell_title">
                发布时间
              </div>
              <div class="part2_cell_body">
                <span class="filter_cell" :class="{com_active:item.id == offDayAct}" :offDay-id="item.id" @click="offDay_opera" v-for="(item,index) in offDayData" :key="index">{{item.name}}</span>
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
    <!-- 空 -->
    <div class="empty" v-show="emptySign">
      <img src="/static/images/ic_empty_data@2x.png" alt="">
      <p>暂无数据</p>
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
          </div>
        </div>
      </div>
    </div>
    <!--双层筛选-->
    <div class="filter_all_box" v-show="this.doubleBox">
      <div class="filter_bg" @click="doubleBoxBg">

      </div>
      <div class="filter_det">
        <div class="filter_s_title">
          <div class="content">
            <img @click="doubleBoxBg" src="/static/images/left.png" alt="left">证书类型专业
          </div>
        </div>
        <div class="content">
          <div class="filter_part1 toTop" >
            <div class="pro_cell">
              <div v-for="(item,index) in allPosData" :data-id="item.id" :key="index" :class="{pro_active:categoryId == item.id}" class=" filter_part1_cell  second" @click="chooseType">
                {{item.category}}
              </div>
            </div>
            <div class="pro_cell city_cell">
              <div data-id="0"  class=" filter_part1_cell  second" @click="chooseMajor">
                全部<img v-show="majorId == 0" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-for="(item,index) in MajorPosData" :data-id="item.id" :key="index" class=" filter_part1_cell  second" @click="chooseMajor">
                {{item.major}}<img v-show="majorId == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,transArrive,transCert,tranOffice_time} from '../../../static/js/common.js'
  export default {
    name: "find_job",
    data() {
      return {
        emptySign: false,
        allLoaded: true,
        req_state: false,
        sort_msg: '默认排序',
        outBox: false,
        firstBox: false,
        doubleBox: false,
        secondBox: false,
        showMsg: '',
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
        },
        tranCode: '',
        sortList: {
          0: "默认排序",
          1: "薪资水平",
          2: "更新时间"
        },
        find_jobParam: {
          page: 1,
          row: 8,
          province: '520000'
        },
        categoryId: '',
        tranCategory: '',
        majorId: '',
        tranMajor: '',
        // 筛选条件状态
        workExpAct: 1,
        educationAct: 9,
        natureAct: 0,
        salaryAct: 1,
        offDayAct: 1,
        allPosData: {},
        MajorPosData: {},
        workexpData: {},
        educationData: {},
        natureData: {},
        salaryData: {},
        offDayData: {},
        // 上拉次数标识
        screenH: 0,
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
        jobClassify: {},
      }
    },
    methods: {
      //排序
      sort_opera(e) {
        let sort_index = e.currentTarget.getAttribute('sort-num');
        if (this.sortNum == sort_index) {

        } else {
          this.sortNum = sort_index;
          this.find_jobParam.order = sort_index;
          this.getjobData(this.find_jobParam)
        }
        this.sort_msg = this.sortList[sort_index];
        this.sort_sign = false
      },
      getjobData(param) {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$ajax.get('/company_work',{params: param})
          .then((res)=>{
            if (res.data.code == 200) {
              tranCity(res.data.data,true,2);
              transWorkexp(res.data.data,2);
              transEducation(res.data.data,2);
              transNature(res.data.data,2);
              transSalary(res.data.data,2);
              for (let i = 0,len = res.data.data.length;i < len;i++) {
                res.data.data[i].created_time = getDistanceTime(res.data.data[i].created_at,1);
              }
              this.find_jobData = res.data.data;
              if (this.find_jobData.length == 0 || this.find_jobData.length == '' || this.find_jobData == undefined) {
                this.emptySign = true;
                this.req_state = false;
              }else {
                this.emptySign = false;
              }
              this.$indicator.close();
            }
          });
        this.tranCode = tranCity(this.cityCode,true,1);
      },
      chooseType(e){
        this.categoryId = e.currentTarget.getAttribute('data-id');
        this.allPosData.forEach((item)=>{
          if (item.id == this.categoryId) {
            this.MajorPosData = item.majors;
          }
        });
      },
      chooseMajor(e){
        this.majorId = e.currentTarget.getAttribute('data-id');
        let back_data = transCert(this.categoryId,this.majorId);
        console.log(back_data);
        this.tranCategory = back_data.category;
        console.log(this.tranCategory);
        this.tranMajor = back_data.major;
        this.doubleBox = false;
        this.firstBox = true;
        this.outBox = false;
      },
      // 名企 急聘
      only_fam() {
        this.find_jobParam.page = 1;
        this.famFlag = !this.famFlag;
        if (this.famFlag) {
          this.find_jobParam.has_m = 1;
        }else {
          delete this.find_jobParam.has_m;
        }
        this.getjobData(this.find_jobParam);
      },
      only_ugent() {
        this.find_jobParam.page = 1;
        this.ugentFlag = !this.ugentFlag;
        if (this.ugentFlag) {
          this.find_jobParam.urgent = 1;
        }else {
          delete this.find_jobParam.urgent;
        }
        this.getjobData(this.find_jobParam);
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
        this.firstBox = true;
        this.workexpData = transWorkexp(this.workexpData,3);
        this.educationData = transEducation(this.educationData,3);
        this.natureData = transNature(this.natureData,3);
        this.salaryData = transSalary(this.salaryData,3);
        this.offDayData = tranOffice_time(this.offDayData,3);
      },
      firstBoxBg() {
        this.outBox = false;
        this.firstBox = false
      },
      secondBoxBg() {
        this.firstBox = false;
        this.secondBox = false;
        this.outBox = false;
      },
      doubleBoxBg() {
        this.doubleBox = false;
        this.firstBox = true;
        this.outBox = false;
      },
      all_choose(e) {
        let partSign = e.currentTarget.getAttribute('data-sign');
        if (partSign == 'city') {
          this.showMsg = 'city';
          this.top_title = '选择城市';
          this.secondBox = true;
        } else if (partSign == 'cert') {
          this.doubleBox = true;
          this.firstBox = false;
        }
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
        this.tranCode = '';
        this.workExpAct = this.salaryAct = this.offDayAct = 1;
        this.educationAct = 9;
        this.natureAct = 0;
        this.$route.query.job_id = '';
        this.find_jobParam = {};
        this.find_jobParam.page = 1;
        this.find_jobParam.row = 8;
        this.find_jobParam.province = '520000';
        this.categoryId = '';
        this.majorId = '';
        this.tranCategory = '';
        this.tranMajor = '';
        this.cityCode = {
          0:'520000',
        };
      },
      filter_submit() {
        this.outBox = false;
        this.find_jobParam.page = 1;
        this.allLoaded = true;
        // 工作经验判断
        if (this.workExpAct == 1){
          delete this.find_jobParam.work_exp;
        } else {
          this.find_jobParam.work_exp = this.workExpAct;
        }
        // 学历
        if (this.educationAct == 9){
          delete this.find_jobParam.education;
        } else {
          this.find_jobParam.education = this.educationAct;
        }
        // 工作性质
        if (this.natureAct == 0) {
          delete this.find_jobParam.nature;
        }else {
          this.find_jobParam.nature = this.natureAct;
        }
        // 薪资
        if (this.salaryAct == 1){
          delete this.find_jobParam.salary;
        } else {
          this.find_jobParam.salary = this.salaryAct;
        }
        // 发布时间
        if (this.offDayAct == 1){
          delete this.find_jobParam.time;
        } else {
          this.find_jobParam.time = this.offDayAct;
        }
        if (this.cityCode[1] != 0 && this.cityCode[1] != undefined) {
          this.find_jobParam.city = this.cityCode[1];
        }
        if(this.categoryId){
          this.find_jobParam.category = this.categoryId;
        }
        if(this.majorId){
          this.find_jobParam.major = this.majorId;
        }
        this.getjobData(this.find_jobParam);
        this.firstBox = false;
      },
      loadBottom() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.find_jobParam.page++;
        this.$ajax.get('/company_work',{params: this.find_jobParam})
          .then((res)=>{
            if (res.data.code == 200) {
              if (res.data.data.length == 0) {
                this.req_state = true;
              }else {
                this.req_state = false;
                tranCity(res.data.data,true,2);
                transWorkexp(res.data.data,2);
                transEducation(res.data.data,2);
                transNature(res.data.data,2);
                transSalary(res.data.data,2);
                for (let i = 0,len = res.data.data.length;i < len;i++) {
                  res.data.data[i].created_time = getDistanceTime(res.data.data[i].created_at,1);
                }
                this.find_jobData.push.apply(this.find_jobData,res.data.data);
                this.$refs.loadmore.onBottomLoaded();
              }
              this.allLoaded = true;
              this.$indicator.close();
            }
          })
      },
      CityCode(e) {
        let cCode = e.currentTarget.getAttribute('city-id');
        this.cityCode[1] = cCode;
        this.find_jobParam.city = cCode;
        this.tranCode = tranCity(this.cityCode,true,1);
        this.firstBox = true;
        this.secondBox = false
      },
      to_pos_det(e) {
        let id = e.currentTarget.getAttribute('id');
        let cid = e.currentTarget.getAttribute('cid');
        this.$router.push({name: 'pos_det',query: {id: id,cid: cid}});
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let ch = document.querySelector('#findJob').clientHeight;
        if (this.allLoaded && !this.req_state) {
          if (scrollTop > (ch - this.screenH)) {
            this.allLoaded = false;
          }else{
            this.allLoaded = true;
          }
        }
      },
    },
    created() {
      this.allPosData = JSON.parse(localStorage.getItem('CERT'));
      if (this.$route.query.category) {
        this.categoryId = this.find_jobParam.category = this.$route.query.category;
        this.allPosData.forEach((item)=>{
          if (item.id == this.categoryId) {
            this.MajorPosData = item.majors;
          }
        });
        if (this.$route.query.major) {
          this.majorId = this.find_jobParam.major = this.$route.query.major;
        }
        let back_data = transCert(this.categoryId,this.majorId);
        this.tranCategory = back_data.category;
        this.tranMajor = back_data.major;
      }

      if (this.$route.query.province) {
        this.keyword = this.find_jobParam.office_name = this.$route.query.office_name;
        this.find_jobParam.province = this.$route.query.province;
      }

      if (this.$route.query.ugent) {
        this.ugentFlag = true;
        this.find_jobParam.urgent = 1;
      }
      this.getjobData(this.find_jobParam);
    },
    //获取屏幕高度
    beforeMount() {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      // 90搜索栏高度
      this.screenH = h + 65;
    },
    mounted() {
      document.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
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
    z-index: 9999;
  }

  .filter_box {
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    line-height: 44px;
    background-color: #ffffff;
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
  .ugent .mint-loadmore-content{
    margin-right: 50px!important;
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
  /* 证书选择 */
  .pro_cell{
    float: left;
    width: 50%;
  }
  .pro_active{
    background-color: #f0f1f5;
  }
  .city_cell{
    background-color: #f0f1f5;
  }
</style>
