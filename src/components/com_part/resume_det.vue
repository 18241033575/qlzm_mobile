<template>
  <!--简历详情-->
    <div class="resume_det" :class="{stop_scroll: this.openState || this.resume_buy}">
      <div class="com_det_title">
        <div class="content">
          简历详情
        </div>
      </div>
      <!--基本信息-->
      <div class="tal_msg_det">
        <div class="content">
          <div class="top_pic">
            <img :src="userMsg.photo" alt="">
            <p class="tal_name">{{userMsg.name}}</p>
            <p><span>{{userMsg.gender}}</span>|<span>{{userMsg.age}}岁</span>|<span>{{userMsg.education}}</span>|<span>{{userMsg.work_exp}}</span></p>
          </div>
          <div class="bottom_msg" v-show="isBuy">
            <p><span class="left_lab">手机</span> <span class="right_msg">{{userMsg.phone}}</span></p>
            <p><span class="left_lab">QQ</span> <span class="right_msg">{{userMsg.qq}}</span></p>
            <p><span class="left_lab">邮箱</span> <span class="right_msg">{{userMsg.email}}</span></p>
            <p><span class="left_lab">就业情况</span> <span class="right_msg">{{userMsg.work_status == 1?'已就业':'待就业'}}</span></p>
            <p><span class="left_lab">通讯地址</span> <span class="right_msg">{{(userMsg.province || '未知') + (userMsg.city || '') + (userMsg.area || '')}}</span></p>
            <p><span class="left_lab">街道</span> <span class="right_msg">{{userMsg.address}}</span></p>
          </div>
        </div>
      </div>
      <!--求职意向-->
      <div class="int_bottom">
        <div class="content">
          <div class="rem_title">
            求职意向
          </div>
          <div class="bottom_msg">
            <p><span class="left_lab">求职类型</span> <span class="right_msg">{{intJobData.nature}}</span></p>
            <p><span class="left_lab">意向岗位</span> <span v-for="(item,index) in tranJob" class="right_msg">{{item}}</span></p>
            <p><span class="left_lab">期望薪资</span> <span class="right_msg">{{intJobData.salary}}</span></p>
            <p><span class="left_lab">工作地区</span> <span class="right_msg">{{(intJobData.province || '未知') + (intJobData.city || '')}}</span></p>
            <p><span class="left_lab">预计到岗时间</span> <span class="right_msg">{{intJobData.duty_time}}</span></p>
            <p><span class="left_lab">备注</span> <span class="right_msg">{{intJobData.remark}}</span></p>
          </div>
        </div>
      </div>
      <!--工作经历-->
      <div class="exp_list" v-show="isBuy">
        <div class="content">
          <div class="rem_title">
            工作经历
          </div>
        </div>
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
      <!--教育经历-->
      <div class="exp_list" v-show="isBuy">
        <div class="content">
          <div class="rem_title">
            教育经历
          </div>
        </div>
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
      <!--行业证书-->
      <div class="exp_list" v-show="isBuy">
        <div class="content">
          <div class="rem_title">
            行业证书
          </div>
        </div>
        <div class="exp_cell" v-for="(item,index) in this.certsData" :key="index">
          <div class="content">
            <div class="exp_cell_box">
              <div class="exp_head">
                {{item.trantype + '-' + item.tranmajor}}
              </div>
              <div class="bottom_msg">
                <p><span class="left_lab">注册情况</span> <span class="right_msg">{{item.tranreg_status}}</span></p>
                <p><span class="left_lab">增项</span> <span class="right_msg">{{additionData}}</span></p>
                <p><span class="left_lab">备注</span> <span class="right_msg">{{item.remark}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--自我评价-->
      <div class="eval_body" v-show="isBuy">
        <div class="content">
          <div class="rem_title">
            自我评价
          </div>
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
      <!--操作-->
      <div class="resume_btn" v-show="isBuy">
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
      <div class="resume_buy_btn" v-show="!isBuy" @click="buyResume">
        购买简历，查看完整信息
      </div>
      <!--购买简历-->
      <div class="buy_box" v-show="resume_buy">
        <div class="box">
          <div class="box_title">
            提示
          </div>
          <div class="box_msg">
            当前积分:{{integral}}，本次花费积分:{{spend}},确定要购买么?
          </div>
          <div class="box_btn_group">
            <span class="box_btn confirm" @click="resume_confirm">确定</span>
            <span class="box_btn cancel" @click="resume_cancel">取消</span>
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
  import {splicPic,transJobs,transEducation,transWorkexp} from '../../../static/js/common.js'
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
          uid: '',
          isBuy: false,
          resume_buy: false,
          userMsg: {},
          intJobData: {},
          workData: {},
          eduData: {},
          certsData: {},
          selfEvalData: {},
          tranJob: [],
          evaluation: '',
          integral: 0,
          spend: 30,
          additionData: '暂无',
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
          this.$router.push({name: 'resume_invite',query: {uid: this.uid}})
        },
        // 人才举报
        report() {
          this.$router.push({name: 'report',query: {uid: this.uid}})
        },
        // 购买简历
        buyResume() {
          this.resume_buy = true;
        },
        resume_cancel() {
          this.resume_buy = false;
        },
        resume_confirm() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (companyInfo) {
            if (this.integral >= this.spend) {
              this.$ajax.get('/company_by_resume',{params: {cid: companyInfo.id,uid: this.uid,type: 'index'}})
                .then((res)=>{
                  console.log(res);
                })
            } else {





              // 关闭弹层 ---去充值
              this.$notify.warning({
                title: '提示',
                message: '积分不足',
                showClose: false,
                duration: 1500
              });



            }
          }else if(userInfo){
            this.$notify.warning({
              title: '提示',
              message: '个人无法购买简历',
              showClose: false,
              duration: 1500
            });
          }else {
            this.$notify.warning({
              title: '提示',
              message: '请先登录',
              showClose: false,
              duration: 800
            });
            setTimeout(()=>{
              this.$router.push({name: 'login'});
            },1000);
          }
        }
      },
      created() {
        this.uid = this.$route.query.uid;
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
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        if (companyInfo) {

          this.$ajax.get('/company/current-integral',{params:{cid: companyInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                this.integral = res.data;
              }
            })

          this.$ajax.get('/resume/view/' + this.uid,{params: {cid: companyInfo.id}})
            .then((res)=>{
              // 已购买
              if (res.data.is_buy == 1) {
                  this.isBuy = true;
                   // 基本信息
                 if (res.data.base_info.area == 0) {
                   res.data.base_info.area = '';
                 } else {
                   tranArea(res.data.base_info,true,0);
                 }
                 if (res.data.base_info.city == 0) {
                   res.data.base_info.city = '';
                 } else {
                   tranCity(res.data.base_info,true,0);
                 }
                 if (res.data.base_info.province == 0) {
                   res.data.base_info.province = '未知';
                 } else {
                   tranProvince(res.data.base_info,true);
                 }

                 // 工作经历
                 this.workData = res.data.work_exp;
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

                 // 项目经验
                 transEducation(res.data.edu_exp);
                 this.eduData = res.data.edu_exp;

                 // 证书
                 let certs = JSON.parse(res.data.user_certs);
                    certs.forEach(function (item,ids) {
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

                            /* if (item.addition == certData[i].majors[j].id) {
                               item.tranaddition = certData[i].majors[j].major
                             }*/
                          }
                        }
                      }
                    });
                 this.certsData = certs;

                 // 自我评价
                 // res.data.evaluation.tags = tal_adv(res.data.evaluation.tags,true);
                 this.selfEvalData = res.data.evaluation;
                 this.evaluation = this.selfEvalData.evaluation;
                }else {
                  this.isBuy = false;
                }
                // 公共部分
                transWorkexp(res.data.base_info,1,'tal');
                res.data.base_info.photo = splicPic(res.data.base_info.photo,true) || '/static/images/user_avator.png';
                this.userMsg = res.data.base_info;
                // 求职意向
                res.data.career.province = res.data.career.work_province;
                res.data.career.city = res.data.career.work_city;
                if (res.data.career.city == 0) {
                  res.data.career.city = '';
                } else {
                  tranCity(res.data.career,true,0);
                }
                if (res.data.career.province == 0) {
                  res.data.career.province = '未知';
                } else {
                  tranProvince(res.data.career,true);
                }
                // transArrive(res.data.career,true,0);
                // transNature(res.data.career,1);
                // transSalary(res.data.career,1);
                this.intJobData = res.data.career;
                this.remark = this.intJobData.remark;

                let job = transJobs('',5);
                this.intJobData.job_id = this.intJobData.job_id.split(',');
                job.forEach((item)=>{
                  for (let i = 0,len = this.intJobData.job_id.length;i < len;i++) {
                    if (item.value == this.intJobData.job_id[i]) {
                      this.tranJob.push(item.name);
                    }
                  }
                });
            });
        } else {
          this.$ajax.get('/resume/view/' + this.uid)
            .then((res)=>{
              console.log(res);
            });
        }
      }
    }
</script>

<style scoped>
  @import "../../../static/css/tal_resume.css";
  .exp_list .exp_cell{
    margin-bottom: 0;
  }
  .rem_title{
    line-height: 44px;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    background-color: #ffffff;
    text-align: left;
  }
  .exp_list{
    background-color: #ffffff;
  }
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
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
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
  /*简历购买弹层*/
  .buy_box{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: rgba(0,0,0,.5);
    z-index: 9999999;
  }
  .box{
    margin: 50% auto;
    width: 92%;
    height: 155px;
    background-color: #ffffff;
  }
  .box_title{
    line-height: 44px;
    font-size: 16px;
    color: #353535;
    text-align: center;
    font-weight: bold;
  }
  .box_msg{
    padding: 10px 20px 15px;
    color: #919199;
    text-align: center;
    letter-spacing: 1px;
  }
  .box_btn_group{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 14px;
    font-weight: bold;
  }
  .box_btn{
    display: inline-block;
    margin: 12px 0;
    width: 48%;
    text-align: center;
  }
  .confirm{
    color: #5082e6;
    border-right: 1px solid #E1E4E6;
  }
</style>
