<template>
  <!--求职意向-->
  <div class="int_job_all" :class="{stop_scroll: this.openState}">
    <!--信息列表-->
    <div class="int_job" v-show="this.int_job_edit">
      <div class="com_det_title">
        <div class="content">
          求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">{{intJobData.nature}}</span></p>
            <p><span class="left_lab">意向岗位</span> <span class="right_msg">{{intJobData.tranJob_id}}</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">{{intJobData.transalary}}</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">{{intJobData.province + intJobData.city}}</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">{{intJobData.duty_time}}</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">{{intJobData.remark}}</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="edit_job">
          编辑
        </div>
      </div>
    </div>
    <!--编辑信息-->
    <div class="int_job_edit" v-show="!this.int_job_edit">
      <div class="com_det_title">
        <div class="content">
          编辑求职意向
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg edit_bottom">
            <div class="edit_cell">
              <span class="edit_lab">求职类型</span><span class="fr choose_group"><span class="choose_cell" :class="{choose_active:this.form.work_nature==1}" @click="have_job">全职</span><span class="choose_cell" :class="{choose_active:this.form.work_nature==2}" @click="wait_job">项目</span></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">意向岗位</span><span class="int_job_det fr" @click="init_job">{{intJobData.tranJob_id || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">期望薪资</span><span class="int_job_det fr" @click="salary">{{intJobData.transalary || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">工作地区</span><span class="int_job_det fr" @click="pro_city">{{(intJobData.province + intJobData.city) || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
            <div class="edit_cell">
              <span class="edit_lab">预计到岗时间</span><span class="int_job_det fr" @click="arrive_time">{{intJobData.duty_time || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="content">
          <div class="edit_cell specail_area">
            <span class="edit_lab">备注</span>
          </div>
          <textarea placeholder="这里填写备注内容" v-model="remark" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="save_job">
          保存
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
            <img @click="secondBoxBg" src="/static/images/left.png" alt="left">{{top_title}}
          </div>
        </div>
        <div class="content">
          <div class="filter_part1">
            <div v-if="showMsg =='init_job'" v-for="(item,index) in jobClassify" :city-id="item.value" :key="index" class="filter_part1_cell second" @click="JobCode">
              {{item.name}}<img v-show="intJobData.job_id == item.value" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'salary'" v-for="(item,index) in CommonData" :city-id="index" :key="index" class="filter_part1_cell second" @click="SalaryCode">
              {{item}}<img v-show="intJobData.salary == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
            </div>
            <div v-if="showMsg == 'arr_time'" v-for="(item,index) in CommonData" :city-id="index" :key="index" class="filter_part1_cell second" @click="TimeCode">
              {{item}}<img v-show="ArriveId == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
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
            <img @click="doubleBoxBg" src="/static/images/left.png" alt="left">意向工作地区
          </div>
        </div>
        <div class="content">
          <div class="filter_part1">
            <div class="pro_cell">
              <div v-for="(item,index) in ProData" :city-id="index" :key="index" :class="{pro_active:cityCode[0] == index}" class=" filter_part1_cell  second" @click="WorkAreaCode">
                {{item}}
              </div>
            </div>
            <div class="pro_cell city_cell">
              <div v-for="(item,index) in cityData" :city-id="index" :key="index" class=" filter_part1_cell  second" @click="WorkCityCode">
                {{item}}<img v-show="cityCode[1] == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic, transGender, transEducation, transWorkexp, transNature, transSalary, transArrive} from '../../../static/js/common.js'
    export default {
        name: "int_job",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            int_job_edit: true,
            form: {
              work_nature: 1
            },
            intJobData: {},
            remark: '',
            secondBox: false,
            doubleBox: false,
            showMsg: '',
            top_title: '',
            CommonData: {},
            ProData: {},
            cityData: {},
            ArriveId: '',
            cityCode: {

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
        getIsopen(data) {
          this.openState = data;
        },
        /*总菜单操作e*/
        edit_job() {
          this.int_job_edit = false
        },
        save_job() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/resume/userinfo',{job: this.intJobData.job_id,nature:this.form.work_nature,salary: this.intJobData.salary,duty_time: this.ArriveId,remark: this.remark,flag: 2,job_id: this.intJobData.job_id,work_province: this.cityCode[0],work_city: this.cityCode[1],uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.int_job_edit = true;
              }
            })
          // this.int_job_edit = true
        },
        have_job() {
          this.form.work_nature = 1
        },
        wait_job() {
          this.form.work_nature = 2
        },
        secondBoxBg() {
          this.secondBox = false;
        },
        doubleBoxBg() {
          this.doubleBox = false;
        },
        JobCode(e) {
          let jobId = e.currentTarget.getAttribute('city-id');
          this.intJobData.job_id = jobId;
          for (let i = 0,len = this.jobClassify.length; i < len;i++) {
            if (this.jobClassify[i].value == this.intJobData.job_id) {
              this.intJobData.tranJob_id = this.jobClassify[i].name;
            }
          }
          this.secondBox = false;
        },
        SalaryCode(e) {
          let salaryId = e.currentTarget.getAttribute('city-id');
          this.intJobData.salary = salaryId;
          this.secondBox = false;
          transSalary(this.intJobData,1);
        },
        WorkAreaCode(e) {
          let areaCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[0] = areaCode;
          this.cityData = tranCity(this.cityCode,true,2,'city');
          this.intJobData.province = tranProvince(this.cityCode[0],true,'',2)
        },
        WorkCityCode(e) {
          let areaCityCode = e.currentTarget.getAttribute('city-id');
          this.cityCode[1] = areaCityCode;
          this.doubleBox = false;
          this.intJobData.city = tranCity(this.cityCode,true,1)
        },
        TimeCode(e) {
          let arrId = e.currentTarget.getAttribute('city-id');
          this.ArriveId = arrId;
          this.secondBox = false;
          this.intJobData.duty_time = transArrive(arrId,true,1);
        },
        init_job() {
          this.secondBox = true;
          this.top_title = '意向职位';
          this.showMsg = 'init_job';
        },
        salary() {
          this.secondBox = true;
          this.top_title = '期望薪资';
          this.showMsg = 'salary';
          this.CommonData = transSalary(this.CommonData,3);
        },
        pro_city() {
          this.doubleBox = true;
          this.ProData = tranProvince(this.ProData,true,'pro');
        },
        arrive_time() {
          this.secondBox = true;
          this.top_title = '预计到岗时间';
          this.showMsg = 'arr_time';
          this.CommonData = transArrive(this.CommonData,true,3);
        },
      },
      created() {
        /*navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position.coords);
          showMap(position.coords.latitude,position.coords.longitude)
        });
        //navigator.geolocation.getCurrentPosition(success,error,{
        // enableHeighAccuracy: boolean --是否更精确 更费电
        // timeout: 2000,
        // maximumAge: 0 最近缓存数据
        // })*/
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state!= 400) {
              this.cityCode[0] = res.data.career_objective.work_province;
              this.cityCode[1] = res.data.career_objective.work_city;
              this.ArriveId = res.data.career_objective.duty_time;
              res.data.career_objective.province = res.data.career_objective.work_province;
              res.data.career_objective.city = res.data.career_objective.work_city;
              tranCity(res.data.career_objective,true,0);
              tranProvince(res.data.career_objective,true);
              transArrive(res.data.career_objective,true,0);
              transNature(res.data.career_objective,1);
              transSalary(res.data.career_objective,1);
              this.intJobData = res.data.career_objective;

              for (let i = 0,len = this.jobClassify.length; i < len;i++) {
                if (this.jobClassify[i].value == this.intJobData.job_id) {
                  this.intJobData.tranJob_id = this.jobClassify[i].name;
                }
              }
              this.remark = this.intJobData.remark
            }
          });
      }
    }
</script>

<style scoped>
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 14px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 120px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
  }
  .edit_bottom{
    padding: 0;
  }
  .bas_msg_btn{
    margin-top: 15px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #ffffff;
    background-color: #5082e6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #353535;
  }
  .int_job_det{
    color: #919199;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .choose_group{
    display: inline-block;
    margin-top: 10px;
    width: 65%;
    text-align: right;
    line-height: 24px;
  }
  .choose_cell{
    display: inline-block;
    margin-left: 10px;
    width: 60px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 12px;
    color: #919199;
    background-color: #ffffff;
  }
  .choose_active{
    color: #5082e6;
    background:rgba(80,130,230,.2);
  }
  .remark{
    margin-top: 10px;
    text-align: center;
    background-color: #ffffff;
  }
  .remark textarea{
    padding: 15px;
    width: 85%;
    min-height: 120px;
    border: none;
  }
  .specail_area{
    text-align: left;
    border: none;
  }
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
