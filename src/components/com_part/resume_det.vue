<template>
  <!--简历详情-->
    <div class="resume_det">
      <div class="com_det_title">
        <div class="content">
          简历详情
        </div>
      </div>
      <div class="tal_msg_det">
        <div class="content">
          <div class="top_pic">
            <img :src="this.headPic" alt="">
            <p class="tal_name">{{userMsg.name}}</p>
            <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
          </div>
          <div class="bottom_msg">
            <p><span class="left_lab">手机</span> <span class="right_msg">{{userMsg.phone}}</span></p>
            <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
            <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
            <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status == 1?'已就业':'待就业'}}</span></p>
            <p><span class="left_lab">通讯地址</span> <span class="right_msg">{{(userMsg.province || '未知') + (userMsg.city || '') + (userMsg.area || '')}}</span></p>
            <p><span class="left_lab">街道</span> <span class="right_msg">{{userMsg.address}}</span></p>
          </div>
        </div>
      </div>
      <div class="int_bottom">
        <div class="content">
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">{{intJobData.nature}}</span></p>
            <p><span class="left_lab">意向岗位</span> <span class="right_msg">{{intJobData.tranJob_id}}</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">{{intJobData.transalary}}</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">{{(intJobData.province || '未知') + (intJobData.city || '')}}</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">{{intJobData.duty_time}}</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">{{intJobData.remark}}</span></p>
          </div>
        </div>
      </div>
      <div class="exp_list">
        <div class="exp_cell" v-for="(item,index) in this.workData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.company}}
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">职位名称</span> <span class="right_msg">{{item.job}}</span></p>
                <p><span class="left_lab">行业性质</span> <span class="right_msg">{{item.tranJobNature}}</span></p>
                <p><span class="left_lab">工作性质</span> <span class="right_msg">{{item.workNature}}</span></p>
                <p><span class="left_lab">税前月薪(元)</span> <span class="right_msg">{{item.salary}}</span></p>
                <p><span class="left_lab">在职时间</span> <span class="right_msg">{{item.start_time + '-' + (item.end_time == 0?'至今':item.end_time)}}</span></p>
                <p><span class="left_lab">工作职责</span> <span class="right_msg">{{item.duties}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exp_list">
        <div class="exp_cell" v-for="(item,index) in this.eduData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.school}}
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">学历</span> <span class="right_msg">{{item.education}}</span></p>
                <p><span class="left_lab">专业</span> <span class="right_msg">{{item.major}}</span></p>
                <p><span class="left_lab">在校时间</span> <span class="right_msg">{{item.start_time + '-' + item.end_time}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exp_list">
        <div class="exp_cell" v-for="(item,index) in this.certsData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.trantype + '-' + item.tranmajor}}
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">注册情况</span> <span class="right_msg">{{item.tranreg_status}}</span></p>
                <p><span class="left_lab">增项</span> <span class="right_msg">{{item.tranaddition}}</span></p>
                <p><span class="left_lab">备注</span> <span class="right_msg">{{item.remark}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="eval_body">
        <div class="content">
          <div class="eval_body_top">
            <div class="adv_cell" v-for="(item,index) in this.selfEvalData.tags" :key="index">
              {{item}}
            </div>
          </div>
          <div class="eval_body_bottom">
            <p>{{evaluation}}</p>
          </div>
        </div>
      </div>
      <div class="resume_btn" v-show="true">
        <div class="resume_invite resume_btn_cell" @click="interview">
          面试邀请
        </div>
        <div class="resume_btn_cell">
          下载简历
        </div>
        <div class="resume_btn_cell" @click="report">
          举报
        </div>
      </div>
      <div class="resume_buy_btn" v-show="false">
        购买简历，查看完整信息
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {splicPic,transGender,transEducation,transWorkexp,transArrive,transNature,transSalary,tal_adv} from '../../../static/js/common.js'
    export default {
        name: "resume_det",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          headPic: '/static/images/banner03@2x.png',
          uid: '',
          userMsg: {

          },
          intJobData: {

          },
          workData: {

          },
          eduData: {

          },
          certsData: {

          },
          selfEvalData: {

          },
          evaluation: '',
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
        interview() {
          this.$router.push({name: 'resume_invite'})
        },
        report() {
          this.$router.push({name: 'report',query: {uid: this.uid}})
        }
      },
      created() {
        this.uid = this.$route.query.uid;
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              tranArea(res.data.base_info,true,0);
              tranCity(res.data.base_info,true,0);
              tranProvince(res.data.base_info,true);
              transGender(res.data.base_info,true);
              transEducation(res.data.base_info,1);
              transWorkexp(res.data.base_info,1,'tal');
              this.userMsg = res.data.base_info;
            }
          });
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              // this.ArriveId = res.data.career_objective.duty_time;
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
        this.$ajax.get('/resume/workexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.workData = res.data;
              for (let i = 0,len = this.workData.length; i < len; i++) {
                if (this.workData[i].industry == 0) {
                  this.workData[i].tranJobNature = '非建筑行业'
                } else {
                  this.workData[i].tranJobNature = '建筑行业'
                }
                if (this.workData[i].nature == 1) {
                  this.workData[i].workNature = '管理岗'
                } else if (this.workData[i].nature == 2) {
                  this.workData[i].workNature = '技术岗'
                } else {
                  this.workData[i].workNature = '其他'
                }
              }
            }
          });
        this.$ajax.get('/resume/eduexp',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              transEducation(res.data);
              this.eduData = res.data;
              // this.certData = res.data;
            }
          });
        // this.EduData = transEducation(this.EduData,3);
        let certData = JSON.parse(localStorage.getItem('CERT'));
        if (!certData) {
          this.$ajax.get('/allcerts')
            .then((res)=>{
              //  放入本地数据
              let params = {};
              params = JSON.stringify(res.data);
              localStorage.setItem('CERT',params);
              sessionStorage.setItem('CERT',params);
            })
        }
        this.$ajax.get('/resume/certificate',{params: {uid: this.uid}})
          .then((res)=>{
            if (res.data.state != 400) {
              // this.certAllData = res.data;
              res.data.forEach(function (item,ids) {
                if (item.reg_status == 0) {
                  item.tranreg_status = '不限'
                } else if (item.reg_status == 1) {
                  item.tranreg_status = '初始'
                } else {
                  item.tranreg_status = '转注'
                }
                for(let i = 0,len = certData.length;i < len;i++) {
                  if (item.type == certData[i].id ) {
                    item.trantype = certData[i].category;
                    for(let j = 0,mlen = certData[i].majors.length; j < mlen; j++) {
                      if (item.major == certData[i].majors[j].id) {
                        item.tranmajor = certData[i].majors[j].major
                      }
                      if (item.addition == certData[i].majors[j].id) {
                        item.tranaddition = certData[i].majors[j].major
                      }
                    }
                  }
                }
              });
              this.certsData = res.data;
            }
          });
        this.$ajax.get('/resume/userinfo',{params:{uid: this.uid}})
          .then((res)=>{
            if (res.data.state!= 400) {
              res.data.evaluation.tags = tal_adv(res.data.evaluation.tags,true);
              this.selfEvalData = res.data.evaluation;
              this.evaluation = this.selfEvalData.evaluation
            }
          });
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .tal_msg_det{
    background-color: #ffffff;
  }
  .top_pic{
    text-align: center;
    padding-top: 15px;
    /*  -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #E1E4E6;*/
  }
  .top_pic img{
    width: 75px;
    height: 90px;
  }
  .top_pic .tal_name{
    padding-bottom: 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .top_pic p{
    padding: 10px 0;
  }
  .top_pic p span{
    padding: 0 5px;
    font-size: 12px;
    color: #919199;
  }
 /* .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
  }*/
  .int_bottom{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .eval_body{
    margin-top: 10px;
    background-color: #ffffff;
    margin-bottom: 74px;
  }
  .eval_body_top{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 5px;
  }
  .adv_cell{
    width: 75px;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .eval_body_bottom{
    text-align: center;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    text-align: left;
    color: #666666;
    line-height: 18px;
  }
  .eval_body_bottom textarea{
    width: 90%;
    min-height: 130px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
  }
  .resume_btn{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: #ffffff;
    text-align: center;
  }
  .resume_btn_cell{
    width: 33%;
    line-height: 44px;
    font-size: 14px;
    font-weight: bold;
    color: #666666;
  }
  .resume_invite{
    color: #ff8236;
  }
  .resume_buy_btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    font-weight: bold;
    color: #ff8236;
  }
</style>
