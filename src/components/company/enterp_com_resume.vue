<template>
  <!--企业中心 应聘、购买、收藏、面试邀请、被收藏简历列表-->
    <div class="com_resume">
      <div class="com_det_title">
        <div class="content">
          {{comTitle}}
        </div>
      </div>
      <div class="resume_list">
        <div class="resume_list_cell" v-for="(item,index) in this.commonData" :key="index">
          <div class="content">
            <p class="tal_name">{{item.name}}<img v-if="!opera_state" :id="item.id" :uid="item.uid"  @click="moreOpera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""><img :id="item.id" :uid="item.uid"  v-if="opera_state" class="fr" src="/static/images/ic_cm_down@2x.png" alt=""></p>
            <p class="tal_det"><span>{{item.gender==1?'男':'女'}}</span><span>|</span><span>{{item.age}}</span><span>|</span><span>{{item.work_exp}}</span><span>|</span><span>{{item.education}}</span><span>|</span><span>{{item.major==''?'无专业':item.major}}</span></p>
            <p class="tal_det">期望薪资:<span class="hope_salary">{{item.transalary}}</span></p>
          </div>
        </div>
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
              删除记录
            </div>
            <div class="opera_cell">
              下载简历
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'collect'">
          <div class="content">
            <div class="opera_cell">
              取消收藏
            </div>
          </div>
        </div>
        <div class="opera_list" v-if="this.orign == 'invite'">
          <div class="content">
            <div class="opera_cell">
              删除
            </div>
            <div class="opera_cell">
              未录用
            </div>
            <div class="opera_cell pos_del">
              录用
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
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {getTrueAge,transSalary,transEducation,transWorkexp} from '../../../static/js/common.js'
    export default {
        name: "enterp_com_resume",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          opera_state: true,
          comTitle: '',
          boxState: false,
          info_id: 0,
          uid: 0,
          orign: '',
          commonData: {

          },
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
        // 简历操作事件
        moreOpera(e) {
          this.info_id = e.currentTarget.getAttribute('id');
          this.uid = e.currentTarget.getAttribute('uid');
          this.boxState = true;
        },
        closeState() {
          this.boxState = false;
        },
        collect_resume() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/resume/collect',{uid: this.uid,info_id: this.info_id,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$message({
                  message: '收藏成功',
                  type: 'success'
                });
              }
            })
        }
      },
      created() {
          let  org = this.$route.query.orign;
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.opera_state = org=='app'? true:false;
          if (org == 'app') {
            this.orign = 'app';
            this.comTitle = '应聘简历';
            this.$ajax.get()
              .then((res)=>{
                console.log(res);
              })
          }else if (org == 'buy') {
            this.orign = 'buy';
            this.comTitle = '购买的简历';
            this.$ajax.get('/company_by_resume',{params:{cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,0);
                  transWorkexp(res.data,0);
                  this.commonData = res.data;
                }
              })
          }else if (org == 'collect') {
            this.orign = 'collect';
            this.comTitle = '收藏的简历'
          }else if (org == 'invite') {
            this.orign = 'invite';
            this.comTitle = '发出的面试邀请'
          }else if (org == 'collected') {
            this.orign = 'collected';
            this.comTitle = '收藏过我';
            this.$ajax.get('/company/who-collects-me',{params: {cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  transSalary(res.data,2);
                  getTrueAge(res.data,2);
                  transEducation(res.data,0);
                  transWorkexp(res.data,0);
                  this.commonData = res.data;
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
    position: absolute;
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
</style>
