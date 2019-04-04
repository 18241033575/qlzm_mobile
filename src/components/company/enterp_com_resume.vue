<template>
  <!--企业中心 应聘、购买、收藏、面试邀请、被收藏简历列表-->
    <div class="com_resume" :class="{stop_scroll: this.boxState}">
      <div class="com_det_title">
        <div class="content">
          {{comTitle}}
        </div>
      </div>
      <div class="resume_list">
        <div class="resume_list_cell" v-if="!orignState" v-for="(item,index) in this.commonData" :uid="item.uid" :key="index" @click="tal_det">
          <div class="content">
            <p class="tal_name">{{item.name}}<img v-if="!opera_state" :id="item.id" :uid="item.uid"  @click.stop="moreOpera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""><img :id="item.id" :uid="item.uid"  v-if="opera_state" class="fr" src="/static/images/ic_cm_down@2x.png" alt=""></p>
            <p class="tal_det"><span>{{item.gender==1?'男':'女'}}</span><span>|</span><span>{{item.age}}</span><span>|</span><span>{{item.work_exp}}</span><span>|</span><span>{{item.education}}</span><span>|</span><span>{{item.major==''?'无专业':item.major}}</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">{{item.salary}}</span></p>
          </div>
        </div>
        <div class="resume_list_cell" v-if="orignState" v-for="(item,index) in this.commonData" :uid="item.user_info.uid" :key="index" @click="tal_det">
          <div class="content">
            <p class="tal_name">{{item.user_info.name}}<span class="app_pos" >(应聘职位: {{item.office.office_name}})</span><img v-if="!opera_state" :id="item.id" :uid="item.uid"  @click.stop="moreOpera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""><img :id="item.id" :uid="item.uid"  v-if="opera_state" class="fr" src="/static/images/ic_cm_down@2x.png" alt=""></p>
            <p class="tal_det"><span>{{item.user_info.gender==1?'男':'女'}}</span><span>|</span><span>{{item.age}}</span><span>|</span><span>{{item.user_info.work_exp}}</span><span>|</span><span>{{item.user_info.education}}</span><span>|</span><span>{{item.user_info.major==''?'无专业':item.user_info.major}}</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">{{item.user_info.salary}}</span></p>
          </div>
        </div>
      </div>
      <div class="empty" v-show="emptySign">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
      </div>
      <div class="pos_opera_box" @click="closeState" v-show="this.boxState">
        <div class="opera_list" v-if="this.orign == 'app'">
          <div class="content">
            <div class="opera_cell">
              下载简历
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'buy'">
          <div class="content">
            <div class="opera_cell">
              下载简历
            </div>
            <div class="opera_cell pos_del" @click="del_resume">
              删除记录
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'collect'">
          <div class="content">
            <div class="opera_cell" @click="cancel_col">
              取消收藏
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'invite'">
          <div class="content">
            <div class="opera_cell">
              录用
            </div>
            <div class="opera_cell pos_del">
              未录用
            </div>
            <div class="opera_cell pos_del">
              删除
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'collected'">
          <div class="content">
            <div class="opera_cell" @click="collect_resume">
              加入收藏
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getTrueAge,transSalary,transEducation,transWorkexp} from '../../../static/js/common.js'
    export default {
      name: "enterp_com_resume",
      data() {
        return {
          opera_state: true,
          comTitle: '',
          boxState: false,
          orignState: true,
          info_id: 0,
          uid: 0,
          orign: '',
          emptySign: false,
          commonData: {},
        }
      },
      methods: {
        // 简历操作事件
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
          this.$ajax.post('/resume/collect',{uid: this.uid,info_id: this.info_id,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$message({
                  message: '收藏成功',
                  type: 'success'
                });
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }
            })
        },
        // 简历详情
        tal_det(e) {
          let uid = e.currentTarget.getAttribute('uid');
          this.$router.push({name: 'resume_det',query: {uid: uid}});
        },
        // 取消收藏
        cancel_col() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/resume/cancel-collect',{uid: this.uid,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.commonData.forEach((item,index)=>{
                  if (item.id == this.info_id) {
                    // 删除相应数组
                    this.commonData.splice(index,1);
                    if (this.commonData.length == 0 || this.commonData.length == '') {
                      this.emptySign = true;
                    }else {
                      this.emptySign = false;
                    }
                  }
                });
              }
            })
        },
        // 删除简历
        del_resume() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/resume/delete-already-buy',{cid: companyInfo.id,uid: this.uid})
            .then((res)=>{
              if (res.data.state == 200) {
                for (let i = 0,len = this.commonData.length; i < len;i++) {
                  // 报错 暂时没有找到原因，功能正常
                  if (this.commonData[i].id == this.info_id) {
                    // 删除相应数组
                    this.commonData.splice(i,1);
                    if (this.commonData.length == 0 || this.commonData.length == '') {
                      this.emptySign = true;
                    }else {
                      this.emptySign = false;
                    }
                  }
                }
              }
            })
        }
      },
      created() {
          let  org = this.$route.query.orign;
          this.orignState = org == 'app'?true:false;
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.opera_state = org=='app'? true:false;
          if (org == 'app') {
            this.orign = 'app';
            this.comTitle = '应聘简历';
            this.$ajax.get('/resume/get-apply',{params:{cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  console.log(res.data);
                  for (let i = 0,len = res.data.length;i < len;i++) {
                    res.data[i].age = getTrueAge(res.data[i].user_info.birthday,1);
                    transSalary(res.data[i].user_info,1);
                    transEducation(res.data[i].user_info,1);
                    transWorkexp(res.data[i].user_info,1);
                  }
                  this.commonData = res.data;
                  if (this.commonData.length == 0 || this.commonData.length == '') {
                    this.emptySign = true;
                  }else {
                    this.emptySign = false;
                  }
                }
              })
          }else if (org == 'buy') {
            this.orign = 'buy';
            this.comTitle = '购买的简历';
            this.$ajax.get('/resume/already-buy',{params:{cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,2);
                  transWorkexp(res.data,2);
                  this.commonData = res.data;
                  if (this.commonData.length == 0 || this.commonData.length == '') {
                    this.emptySign = true;
                  }else {
                    this.emptySign = false;
                  }
                }
              })
          }else if (org == 'collect') {
            this.orign = 'collect';
            this.comTitle = '收藏的简历';
            this.$ajax.get('/resume/get-collect',{params:{cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,2);
                  transWorkexp(res.data,2);
                  this.commonData = res.data;
                  if (this.commonData.length == 0 || this.commonData.length == '') {
                    this.emptySign = true;
                  }else {
                    this.emptySign = false;
                  }
                }
              })
          }else if (org == 'invite') {
            this.orign = 'invite';
            this.comTitle = '发出的面试邀请';
            this.$ajax.get('/company/get-interviews',{params:{cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,2);
                  transWorkexp(res.data,2);
                  this.commonData = res.data;
                  if (this.commonData.length == 0 || this.commonData.length == '') {
                    this.emptySign = true;
                  }else {
                    this.emptySign = false;
                  }
                }
              })
          }else if (org == 'collected') {
            this.orign = 'collected';
            this.comTitle = '收藏过我';
            this.$ajax.get('/company/who-collects-me',{params: {cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,2);
                  transWorkexp(res.data,2);
                  this.commonData = res.data;
                  if (this.commonData.length == 0 || this.commonData.length == '') {
                    this.emptySign = true;
                  }else {
                    this.emptySign = false;
                  }
                }
              })
          }
      }
    }
</script>

<style scoped>
  .resume_list_cell{
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
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
  /*职位管理操作弹层*/
  .pos_opera_box{
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
</style>
