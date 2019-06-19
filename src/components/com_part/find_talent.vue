<template>
    <div class="find_talent" :class="{stop_scroll: this.outBox}">
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
      <!--找人才-->
      <div class="ugent" v-show="!emptySign" id="findTal">
        <div class="content">
          <div class="load">
            <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomDropText="加载中" ref="loadmore" >
              <div class="resume_list_cell" v-for="(item,index) in this.find_talData" :uid="item.uid" :key="index" @click="tal_det">
                <div class="content">
                  <p class="tal_name">{{item.name}}<span style="color: #919199;font-size: 12px; font-weight: normal; margin-left: 10px;">价值指数:<span style="margin-left: 0;" class="hope_salary">{{item.ability_index}}</span></span><img :id="item.id" :uid="item.uid"  @click.stop="moreOpera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
                  <p class="tal_det"><span>{{item.gender==1?'男':'女'}}</span><span>|</span><span>{{item.age}}</span><span>|</span><span>{{item.work_exp == 0?'一年以下':item.work_exp + '年'}}</span><span>|</span><span>{{item.education==0?'未知学历':item.education}}</span><span>|</span><span>{{item.major==''?'无专业':item.major}}</span></p>
                  <p class="tal_det">期望薪资:<span class="hope_salary">{{item.salary}}</span></p>
                  <p class="tal_det">更新时间:<span style="margin-left: 10px;">{{item.updated_at}}</span></p>
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
                  性别要求
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:item.id == genderAct}" :gender-id="item.id" @click="gender_opera" v-for="(item,index) in genderData" :key="index">{{item.name}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  年龄要求
                </div>
                <div class="part2_cell_body">
                  <span class="filter_cell" :class="{com_active:item.id == ageAct}" :age-id="item.id" @click="age_opera" v-for="(item,index) in ageData" :key="index">{{item.name}}</span>
                </div>
              </div>
              <div class="filter_part2_cell">
                <div class="part2_cell_title">
                  更新时间
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
              <div v-if="showMsg == 'posType'" v-for="(item,index) in jobClassify" :posType-id="item.id" :key="index" class="filter_part1_cell second" @click="posTypeCode">
                {{item.name}}<img v-show="posTypeNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--简历操作-->
      <div class="pos_opera_box" @click="closeState" v-show="this.boxState">

        <div class="opera_list">
          <div class="content">
            <div class="opera_cell" @click="collect_resume">
              加入收藏
            </div>
          </div>
        </div>

      </div>
      <!--空数据-->
      <div class="empty" v-show="emptySign">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
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
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,transJobs,transGender,updateTime,reqAge,getTrueAge,transCert } from '../../../static/js/common.js'
    export default {
        name: "find_talent",
      data() {
        return {
          emptySign: false,
          allLoaded: true,
          req_state: false,
          sort_msg: '默认排序',
          outBox: false,
          firstBox: false,
          secondBox: false,
          doubleBox: false,
          showMsg: '',
          sortNum: 0,
          search_job: '',
          order: 0,
          keyword: '',
          categoryId: '',
          tranCategory: '',
          majorId: '',
          tranMajor: '',
          find_talData: {},
          allPosData: {},
          MajorPosData: {},
          top_title: '',
          posTypeNum: 0,
          loading: false,
          cityCode: {
            0:'520000',
            1:'520000'
          },
          tranCode: '',
          tranPosType: '全部',
          find_talParam: {
            page: 1,
            row: 8,
            work_province: '520000'
          },
          workExpAct: 1,
          educationAct: 9,
          natureAct: 0,
          genderAct: 0,
          salaryAct: 1,
          ageAct: 0,
          offDayAct: 0,
          workexpData: {},
          educationData: {},
          natureData: {},
          genderData: {},
          salaryData: {},
          ageData: {},
          offDayData: {},
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
          boxState: false,
          // 简历ID
          info_id: 0,
          screenH: 0,
        }
      },
      methods: {
        getTalData(param) {
          this.req_state = false;
          this.find_talParam.page = 1;
          this.$ajax.get('/talents',{params: param})
            .then((res)=>{
              if (res.data.data == '') {
                this.emptySign = true;
              } else {
                tranCity(res.data.data,true,2);
                  transEducation(res.data.data,2);
                  transNature(res.data.data,2);
                  transSalary(res.data.data,2);
                  getTrueAge(res.data.data,2);
                  for (let i = 0,len = res.data.data.length;i < len;i++) {
                    res.data.data[i].updated_at = getDistanceTime(res.data.data[i],3);
                  }
                  this.find_talData = res.data.data;
                  this.emptySign = false;
              }
            })
        },
        // 排序条件
        def() {
          this.find_talParam.order = this.order = 0;
          this.getTalData(this.find_talParam);
        },
        val() {
          this.find_talParam.order = this.order = 1;
          this.getTalData(this.find_talParam);
        },
        upTime() {
          this.find_talParam.order = this.order = 2;
          this.getTalData(this.find_talParam);
        },
        //搜索
        search_job_click() {
          this.find_talParam.keyword = this.keyword;
          this.getTalData(this.find_talParam);
        },
        //筛选
        job_filter() {
          this.outBox = true;
          this.firstBox = true;
          this.workexpData = transWorkexp(this.workexpData,3);
          this.educationData = transEducation(this.educationData,3);
          this.natureData = transNature(this.natureData,3);
          this.genderData = transGender(this.genderData,3);
          this.salaryData = transSalary(this.salaryData,3);
          this.ageData = reqAge(this.offDayData,3);
          this.offDayData = updateTime(this.offDayData,3);
        },
        firstBoxBg() {
          this.outBox = false;
          this.firstBox = false
        },
        secondBoxBg() {
          this.firstBox = false;
          this.secondBox = false
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
          this.tranCategory = back_data.category;
          this.tranMajor = back_data.major;
          this.doubleBox = false;
          this.firstBox = true;
          this.outBox = false;
        },
        //返回第一层
        first_back() {
          this.firstBox = true;
          this.secondBox = false
        },
        workexp_opera(e) {
          let wi = e.currentTarget.getAttribute('workexp-id');
          this.workExpAct = wi;
        },
        education_opera(e) {
          let wi = e.currentTarget.getAttribute('education-id');
          this.educationAct = wi;
        },
        nature_opera(e) {
          let wi = e.currentTarget.getAttribute('nature-id');
          this.natureAct = wi;
        },
        gender_opera(e) {
          let wi = e.currentTarget.getAttribute('gender-id');
          this.genderAct = wi;
        },
        salary_opera(e) {
          let wi = e.currentTarget.getAttribute('salary-id');
          this.salaryAct = wi;
        },
        age_opera(e) {
          let wi = e.currentTarget.getAttribute('age-id');
          this.ageAct = wi;
        },
        offDay_opera(e) {
          let wi = e.currentTarget.getAttribute('offDay-id');
          this.offDayAct = wi
        },
        // 重置
        reset() {
          this.workExpAct = this.educationAct = this.natureAct = this.salaryAct = this.offDayAct = 0;
          this.tranPosType = '全部'; // 证书
          this.posTypeNum = 0; // 证书
          this.find_talParam = {};
          this.find_talParam.page = 1;
          this.find_talParam.row = 8;
          this.find_talParam.work_province = '520000';
          this.categoryId = '';
          this.majorId = '';
          this.tranCategory = '';
          this.tranMajor = '';
          this.educationAct = 9;
          this.workExpAct = 1;
          this.salaryAct = 1;
          this.cityCode = {
            0: "520000",
            1: "520000",
          };
          this.tranCode = '';
        },
        filter_submit() {
          this.outBox = false;
          this.find_talParam.page = 1;
          this.allLoaded = true;
          // 经验
          if (this.workExpAct == 1) {
            delete this.find_talParam.work_exp;
          }else {
            this.find_talParam.work_exp = this.workExpAct;
          }
          // 教育
          if (this.educationAct == 9) {
            delete this.find_talParam.education;
          }else {
            this.find_talParam.education = this.educationAct;
          }
          // 性质
          if (this.natureAct == 0) {
            delete this.find_talParam.nature;
          }else {
            this.find_talParam.nature = this.natureAct;
          }
          // 性别
          if (this.genderAct == 0) {
            delete this.find_talParam.gender;
          }else {
            this.find_talParam.gender = this.genderAct;
          }
          // 年龄
          if (this.ageAct == 0) {
            delete this.find_talParam.age;
          }else {
            this.find_talParam.age = this.ageAct;
          }
          // 薪资
          if (this.salaryAct == 1) {
            delete this.find_talParam.salary;
          }else {
            this.find_talParam.salary = this.salaryAct;
          }
          // 发布时间
          if (this.offDayAct == 0) {
           delete this.find_talParam.time;
          }else {
            this.find_talParam.time = this.offDayAct;
          }
          if(this.categoryId){
            this.find_talParam.cert_type = this.categoryId;
          }
          if(this.majorId){
            this.find_talParam.cert_major = this.majorId;
          }
          this.find_talParam.keyword = this.keyword;
          this.getTalData(this.find_talParam);
          this.firstBox = false;
        },
        loadBottom() {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.find_talParam.page++;
          this.$ajax.get('/talents',{params: this.find_talParam})
            .then((res)=>{
              if (res.data.state != 400) {
                if (res.data.data.length == 0) {
                  this.req_state = true;
                }else {
                  this.req_state = false;
                  tranCity(res.data.data,true,2);
                  transEducation(res.data.data,2);
                  transNature(res.data.data,2);
                  transSalary(res.data.data,2);
                  getTrueAge(res.data.data,2);
                  for (let i = 0,len = res.data.data.length;i < len;i++) {
                    res.data.data[i].updated_at = getDistanceTime(res.data.data[i].updated_at,1);
                  }
                  this.find_talData.push.apply(this.find_talData,res.data.data);
                  this.$refs.loadmore.onBottomLoaded();
                }
                this.allLoaded = true;
                this.$indicator.close();
              }
            })
        },
        handleScroll () {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let ch = document.querySelector('#findTal').clientHeight;
          if (this.allLoaded && !this.req_state) {
            if ( scrollTop > (ch - this.screenH ) ) {
              this.allLoaded = false;
            }else{
              this.allLoaded = true;
            }
          }
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[1] = cCode;
          this.find_talParam.work_city = cCode;
          this.tranCode = tranCity(this.cityCode,true,1);
          this.firstBox = true;
          this.secondBox = false
        },
        posTypeCode(e) {
          let pos_code = e.currentTarget.getAttribute('posType-id');
          this.posTypeNum = pos_code;
          this.tranPosType = transJobs(pos_code,0);
          this.firstBox = true;
          this.secondBox = false;
          // this.scrollSign = false;
        },
        tal_det(e) {
          let uid = e.currentTarget.getAttribute('uid');
          this.$router.push({name: 'resume_det',query: {uid: uid}});
        },
        moreOpera(e) {
          this.info_id = e.currentTarget.getAttribute('id');
          this.uid = e.currentTarget.getAttribute('uid');
          this.boxState = true;
        },
        closeState() {
          this.boxState = false;
        },
        // 收藏简历
        collect_resume() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            this.$ajax.post('/resume/collect',{uid: this.uid,info_id: this.info_id,cid: companyInfo.id})
              .then((res)=>{
                if (res.data.state ==200) {
                  this.$notify.success({
                    title: '提示',
                    message: '收藏成功',
                    showClose: false,
                    duration: 1500
                  });
                }else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500
                  });
                }
              })
          }else {
            this.$notify.warning({
              title: '提示',
              message: '只有企业才可以收藏简历',
              showClose: false,
              duration: 1500
            });
          }
        }
      },
      created() {
        //获取屏幕高度
        let h = document.documentElement.clientHeight || document.body.clientHeight;
        // 90搜索栏高度
        this.screenH = h + 65;
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.allPosData = JSON.parse(localStorage.getItem('CERT'));
        if (this.$route.query.province) {
          this.keyword = this.find_talParam.keyword = this.$route.query.office_name;
          this.find_talParam.province = this.$route.query.province;
        }
        let data = this.find_talParam;
        this.$ajax.get('/talents',{params: data})
          .then((res)=>{
            if (res.data.state != 400) {
              tranCity(res.data.data,true,2);
              transEducation(res.data.data,2);
              transNature(res.data.data,2);
              transSalary(res.data.data,2);
              getTrueAge(res.data.data,2);
              for (let i = 0,len = res.data.data.length;i < len;i++) {
                res.data.data[i].updated_at = getDistanceTime(res.data.data[i],3);
              }
              this.find_talData = res.data.data;
              this.$indicator.close();
            }
          });
        this.tranCode = tranCity(this.cityCode,true,1)
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


  /*筛选*/
  .filter {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 3;
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

  /*急聘*/
  .ugent {
    margin-top: 10px;
    background-color: #ffffff;
  }
  .resume_list_cell{
    margin-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    /*height: 100px;*/
    background-color: #ffffff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .tal_name{
    padding: 15px 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .tal_name img{
    vertical-align: middle;
    width: 22px;
    height: 22px;
  }
  .tal_det{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: #919199;
    line-height: 24px;
  }
  .tal_det span{
    margin-right: 10px;
  }
  .hope_salary{
    margin-left: 10px;
    color: #ff5959;
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
  /*加入收藏操作弹层*/
  .pos_opera_box{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(0,0,0,.5);
    z-index: 5;
  }
  .opera_list{
    width: 100%;
    margin: 50% auto;
  }
  .opera_cell{
    background-color: #ffffff;
    font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .pos_del{
    color: #ff5959;
  }
  .app_pos{
    margin-left: 5px;
    font-size: 12px;
    color: #919199;
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
