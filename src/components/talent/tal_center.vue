<template>
    <div class="tal_center">
      <!--顶部-->
      <div class="tal_center_top">
        <div class="com_det_title">
          <div class="content">
            个人中心
          </div>
        </div>
        <div class="tal_point">
          <div class="content">
            <div class="tal_point_box">
              <div class="mark tal_point_cell">
                <p><span>个人价值指数</span><img src="/static/images/ic_doubt@2x.png" alt=""></p>
                <p class="sign_num">{{ability_index}}</p>
              </div>
              <div class="salary tal_point_cell">
                <p><span>预估薪资水平</span><img src="/static/images/ic_doubt@2x.png" alt=""></p>
                <p class="sign_num">{{estimate_salary}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--列表链接-->
      <div class="opera_list">
        <div class="content">
          <div class="opera_list_box">
            <router-link :to="{name: 'tal_resume'}" class="opera_list_cell">
              <img src="/static/images/ic_resume@2x.png" alt="">
              <p>我的简历</p>
            </router-link>
            <router-link :to="{name: 'tal_del_col',query: {orig: 1}}" class="opera_list_cell">
              <img src="/static/images/iic_resume_record@2x.png" alt="">
              <p>投递记录</p>
            </router-link>
            <router-link :to="{name: 'tal_invited'}" class="opera_list_cell">
              <img src="/static/images/ic_offer@2x.png" alt="">
              <p>面试邀请</p>
            </router-link>
            <router-link :to="{name: 'tal_del_col',query: {orig: 2}}" class="opera_list_cell">
              <img src="/static/images/ic_collection@2x.png" alt="">
              <p>收藏职位</p>
            </router-link>
            <router-link :to="{name: 'account_manage'}" class="opera_list_cell">
              <img src="/static/images/ic_count_manage@2x.png" alt="">
              <p>账号管理</p>
            </router-link>
            <router-link :to="{name: 'tal_shield'}" class="opera_list_cell">
              <img src="/static/images/ic_shield@2x.png" alt="">
              <p>屏蔽企业</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--消息-->
      <div class="system_msg">
        <div class="content">
          <div class="system_msg_box" @click="to_msg">
            <img class="msg_pic" src="/static/images/ic_news_me@2x.png" alt="">
            <div class="msg_list">
              <ul>
                <li v-for="(item,index) in msgData">{{item.title || '系统消息'}}<span>{{item.created_at}}</span></li>
              </ul>
            </div>
            <div class="msg_tip" v-show="this.newNews">

            </div>
            <img class="to_right_pic" src="/static/images/icon_goright.png" alt="">
          </div>
        </div>
      </div>
      <!--底部-->
      <div class="tal_center_bottom">
        <div class="content">
          <div class="com_det_title">
            简历完整度 <span class="fr">{{integrity}}%</span>
          </div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="this.integrity"></el-progress>
          <div class="commit_list">
            <div class="commit_list_cell">
              <span>{{look}}</span>家
              <p>企业看过</p>
            </div>
            <div class="commit_list_cell">
              <span>{{dev}}</span>次
              <p>简历投递</p>
            </div>
            <div class="commit_list_cell">
              <span>{{col}}</span>次
              <p>企业收藏</p>
            </div>
            <div class="commit_list_cell">
              <span>{{down}}</span>次
              <p>简历下载</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {transJobs} from '../../../static/js/common.js'
    export default {
      name: "tal_center",
      data () {
          return {
            baseSalary: 0,
            estimate_salary: '',
            ability_index: '',
            // 简历完整度
            integrity: 0,
            look: 0,
            dev: 0,
            col: 0,
            down: 0,
            newNews: false,
            msgData: {},
            jobs: {}
          }
      },
      methods: {
        to_msg() {
            this.$router.push({name: 'sys_msg'})
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        // 获取消息
        if (userInfo) {
          this.$ajax.get('/personal/sysmsg',{params: {uid: userInfo.id}})
            .then((res)=>{
              this.msgData = res.data;
              this.msgData.length = this.msgData.length > 2 ? 2 : this.msgData.length;
            });
        }

        //看、投递、收藏、下载
        this.look = userInfo.views;
        this.dev = userInfo.apply;
        this.col = userInfo.collections;
        this.down = userInfo.downloads;

        // 是否有新消息
        this.$ajax.get('/personal/hasnewmsg',{params:{uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state != 400) {
              this.newNews = res.data ==0?false:true;
            }
          });
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              if (res.data.base_info.id_card != '') {
                this.integrity += 15
              }
              if (res.data.career_objective.job_id != '') {
                this.integrity += 25
              }
              if (res.data.evaluation.evaluation != '' || res.data.evaluation.tags != '') {
                this.integrity += 5
              }
              //  个人价值指数
              this.ability_index = res.data.base_info.ability_index || 0;
              //  预估薪资水平
              this.jobs = transJobs('',3);
              this.jobs.forEach((item)=>{
                let job_id = res.data.career_objective.job_id.split(',');
                for (let i = 0,len = job_id.length;i < len;i++){
                  if (item.id == job_id[i]){
                    this.baseSalary = item.salary > this.baseSalary?item.salary:this.baseSalary;
                  }
                }
              });
              this.estimate_salary = this.baseSalary/1000 +　'K';
            }
            this.$indicator.close();
          });
         this.$ajax.get('/resume/certificate',{params:{uid: userInfo.id}})
          .then((res)=> {
            if(res.data.state != 400) {
              if (res.data != '') {
                this.integrity += 15;
              }
            }
          });
        this.$ajax.get('/resume/eduexp',{params:{uid: userInfo.id}})
          .then((res)=> {
            if(res.data.state != 400) {
              if (res.data != '') {
                this.integrity += 10;
              }
            }
          });
        this.$ajax.get('resume/projectexp',{params:{uid: userInfo.id}})
          .then((res)=> {
            if(res.data.state != 400) {
              if (res.data != '') {
                this.integrity += 15;
              }
            }
          })
        this.$ajax.get('/resume/workexp',{params:{uid: userInfo.id}})
          .then((res)=> {
            if(res.data.state != 400) {
              if (res.data != '') {
                this.integrity += 15;
              }
            }
          })
      }
    }
</script>

<style scoped>
  /*顶部*/
  .tal_center_top{
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .tal_point_box{
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 110px;
  }
  .tal_point_cell{
    width: 48%;
    height: 80px;
  }
  .tal_point_cell p{
    padding: 5px 10px 0;
  }
  .tal_point_cell span{
    font-size: 12px;
    color: #ffffff;
  }
  .tal_point_cell img{
    float: right;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .tal_point_box .tal_point_cell .sign_num{
    padding: 16px 0;
    font-size: 24px;
    font-weight: bold;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
  }
  .mark{
    margin-right: 15px;
    background: -webkit-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: -o-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: -moz-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: linear-gradient(to bottom right,#82D9F7, #52B0FF);
  }
  .salary{
    background: -webkit-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: -o-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: -moz-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: linear-gradient(to bottom right,#8CA1FF, #777BFF);
  }
  /*列表链接*/
  .opera_list{
    margin-bottom: 10px;
    width: 100%;
    height: 180px;
    background-color: #ffffff;
  }
  .opera_list_box{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .opera_list_cell{
    text-decoration: none;
    padding-top: 12px;
    text-align: center;
    width: 25%;
    height: 85px;
  }
  .opera_list_cell img{
    width: 44px;
    height: 44px;
  }
  .opera_list_cell p{
    font-size: 12px;
    color: #919199;
  }
  /*系统消息*/
  .system_msg{
    margin-bottom: 10px;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
  }
  .system_msg_box{
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
  }
  .msg_pic{
    width: 34px;
    height: 34px;
  }
  .msg_list{
    flex-grow: 1;
    margin-left: 15px;
    height: 34px;
  }
  .msg_list ul{
    width: 100%;
    height: 100%;
  }
  .msg_list li{
    width: 90%;
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .msg_list li span{
    margin-left: 10px;
    color: #919199;
  }
  .msg_tip{
    width: 6px;
    height: 6px;
    -webkit-border-radius: 1000px;
    -moz-border-radius: 1000px;
    border-radius: 1000px;
    background-color: #ff5959;
  }
  .tal_center_bottom{

    background-color: #ffffff;
  }
  .tal_center_bottom .com_det_title{
    font-size: 12px;
    color: #666666;
    border: none;
  }
  .tal_center_bottom .com_det_title span{
    font-size: 12px;
    color: #ff5959;
  }
  .commit_list{
    display: flex;
    align-items: center;
    height: 90px;
    text-align: center;
  }
  .commit_list_cell span{
    font-size: 24px;
    color: #5082e6;
    padding-right: 5px;
  }
  .commit_list_cell{
    width: 25%;
    font-size: 12px;
    color: #666666;
    font-weight: bold;
  }
  .commit_list_cell p{
    padding-top: 5px;
    font-size: 12px;
    font-weight: normal;
    color: #919199;
  }
</style>
