<template>
  <div class="main" v-wechat-title="$route.meta.title = webTitle">
    <!--头部-->
    <div class="head">
      <div class="content">
        <div class="head_top">
          <span class="fl">贵州省&nbsp;<img src="/static/images/down3j.png" alt=""></span><img class="logo" src="/static/images/logo.png" alt="">
        </div>
      </div>
    </div>
    <!--搜索栏-->
    <div class="search">
      <div class="content">
        <div class="search_box">
          <el-select v-model="value"  @change="changed" placeholder="请选择">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
          </el-select>
          <el-input class="search_text" v-model="search_text" :placeholder="placeholder_text"></el-input>
          <div class="search_btn" @click="search_all">

          </div>
        </div>
      </div>
    </div>
    <!--轮播-->
    <div class="banner">
      <el-carousel height="120px">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img :src=item alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--主导航-->
    <div class="main_nav_cell">
      <div class="content">
        <router-link :to="{name: 'all_pos'}">
          <div class="nav_cell">
            <img src="/static/images/ic_jobs@2x.png" alt="">
            <p>全部职位</p>
          </div>
        </router-link>
        <router-link :to="{name: 'find_job'}">
          <div class="nav_cell">
            <img src="/static/images/ic_findjob@2x.png" alt="">
            <p>找工作</p>
         </div>
        </router-link>
        <router-link :to="{name: 'find_talent'}">
          <div class="nav_cell">
            <img src="/static/images/ic_rencai@2x.png" alt="">
            <p>找人才</p>
          </div>
        </router-link>
        <router-link :to="{name: 'famous_pos'}">
          <div class="nav_cell">
            <img src="/static/images/ic_mingqi@2x.png" alt="">
            <p>名企招聘</p>
          </div>
        </router-link>
        <router-link :to="{name: 'news'}">
          <div class="nav_cell">
            <img src="/static/images/ic_news@2x.png" alt="">
            <p>新闻资讯</p>
          </div>
        </router-link>
      </div>
    </div>
    <!--急聘-->
    <div class="ugent">
      <div class="content">
        <div class="common_title">
          <img src="/static/images/ic_title_zhaopin@2x.png" alt="">急聘职位
        </div>
        <div class="ugent_body">
          <div class="ugent_cell" :data-id="item.id"  :cid="item.cid"  v-for="(item,index) in ugentData" :key="index" @click="to_posDetail">
            <div class="ugent_top">
              <span class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span> | <span class="tags">{{item.education}}</span> | <span class="tags">{{item.nature}}</span><span class="update_time fr">{{item.created_at}}</span>
            </div>
          </div>
        </div>
        <router-link :to="{name: 'find_job',query:{ugent: 1}}" class="show_more">
          更多急聘职位
        </router-link>
      </div>
    </div>
    <!--名企招聘-->
    <div class="famous">
      <div class="content">
        <div class="common_title">
          <img src="/static/images/ic_title_mq@2x.png" alt="">名企招聘
        </div>
        <div class="famous_body">
          <div class="famous_cell" :company-cid="item.cid" :id="item.id" v-for="(item,index) in famousData" :key="index" @click="to_comDetail">
            <div class="famous_head fl">
              <img :src="item.logo" alt="">
            </div>
            <div class="famous_msg fl">
              <div class="famous_name">
                {{item.name}}
              </div>
              <p>招聘职位<span>&nbsp;&nbsp{{item.offices.length}}个</span></p>
            </div>
          </div>
        </div>
        <router-link :to="{name: 'famous_pos'}" class="show_more">
          更多名企招聘
        </router-link>
      </div>
    </div>
    <!--政策资讯-->
    <div class="news">
      <div class="content">
        <div class="common_title">
          <img src="/static/images/ic_title_news@2x.png" alt="">政策资讯
        </div>
        <div class="news_body">
          <div class="news_cell" :news-id="item.id" v-for="(item,index) in newsData" :key="index" @click="news_det">
            <div class="news_head fl">
              <img :src="item.frontcover" alt="">
            </div>
            <div class="news_msg fl">
              <div class="news_name">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
        <router-link :to="{name: 'news'}" class="show_more">
          更多政策资讯
        </router-link>
      </div>
    </div>
    <!--底部-->
    <copyright></copyright>
  </div>

</template>

<script>
  import copyright from '../components/common/copyright'
  import {tranCity} from  '../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,splicLogo,splicFrontcover} from '../../static/js/common.js'
    export default {
      name: "index",
      components:{
        copyright
      },
      data() {
          return{
            bannerList: {
              0: "/static/images/banner01@2x.png",
              1: "/static/images/banner02@2x.png",
              2: "/static/images/banner03@2x.png",
            },
            options: [{
              value: '1',
              label: '找工作'
            }, {
              value: '2',
              label: '找人才'
            }],
            value: '1',
            search_text: "",
            placeholder_text: '请输入名称、类型进行搜索',
            openState: false,
            ugentData: {},
            famousData: {},
            newsData: {},
            webTitle: '',
          }
      },
      methods: {
        to_posDetail(e) {
          let id = e.currentTarget.getAttribute('data-id');
          let cid = e.currentTarget.getAttribute('cid');
          this.$router.push({name: 'pos_det',query:{id: id,cid: cid}});
        },
        to_comDetail(e) {
          let id = e.currentTarget.getAttribute('id');
          let cid = e.currentTarget.getAttribute('company-cid');
          this.$router.push({name: 'company_det',query:{cid: cid,id: id}});
        },
        news_det(e) {
          let id = e.currentTarget.getAttribute('news-id');
          this.$router.push({name: 'news_info',query:{id: id}});
        },
        // 搜索按钮
        search_all() {
          if (this.value == 1) {
            if (this.search_text != '') {
              this.$router.push({name: 'find_job',query:{office_name: this.search_text,province: '520000'}})
            }
          } else {
            if (this.search_text != '') {
              this.$router.push({name: 'find_talent',query:{office_name: this.search_text,province: '520000'}})
            }
          }
        },
        changed() {
          this.placeholder_text = this.placeholder_text == '请输入名称、类型进行搜索'? '请输入类型进行搜索' : '请输入名称、类型进行搜索';
        }
      },
      created() {
        // 加载字典
        // 更新标识
        if (true){
          //  字典
          // 获取招聘优势字典
          this.$ajax.get('/company/zhaopin-advantages')
            .then((res)=>{
              localStorage.setItem('COMPANYTAGS',JSON.stringify(res.data));
            });
          // 获取个人优势字典
          this.$ajax.get('/personal/get-advantages')
            .then((res)=>{
              localStorage.setItem('USERTAGS',JSON.stringify(res.data));
            });
          // 获取到岗时间
          this.$ajax.get('/tags/duty-time')
            .then((res)=>{
              localStorage.setItem('ARRIVETIME',JSON.stringify(res.data));
            });
          // 获取发布时间
          this.$ajax.get('/base/get-time-limit')
            .then((res)=>{
              localStorage.setItem('RELEASETIME',JSON.stringify(res.data));
            });
          // 获取职位类别
          this.$ajax.get('/base/get-jobs')
            .then((res)=>{
              localStorage.setItem('JOBTYPE',JSON.stringify(res.data));
            });
          // 获取月薪
          this.$ajax.get('/tags/salary')
            .then((res)=>{
              localStorage.setItem('SALARY',JSON.stringify(res.data));
            });
          // 获取学历
          this.$ajax.get('/tags/education')
            .then((res)=>{
              localStorage.setItem('EDUCATION',JSON.stringify(res.data));
            });

          // 获取企业性质
          this.$ajax.get('/company/get-natures')
            .then((res)=>{
              localStorage.setItem('COMNATURE',JSON.stringify(res.data));
            });
          // 获取企业规模
          this.$ajax.get('/company/get-scales')
            .then((res)=>{
              localStorage.setItem('COMSCALE',JSON.stringify(res.data));
            });
          // 获取工作经验
          this.$ajax.get('/base/get-workexp-range')
            .then((res)=>{
              localStorage.setItem('WORKEXP',JSON.stringify(res.data));
            });
          // 证书数据
          this.$ajax.get('/allcerts')
            .then((res)=>{
              localStorage.setItem('CERT',JSON.stringify(res.data));
            });
        }
          // 急聘数据
          this.$ajax.get('/office/urgent')
            .then((res)=>{
              if(res.data.state != 400){
                tranCity(res.data,true,2);
                transSalary(res.data,2);
                transNature(res.data,2);
                transEducation(res.data,2);
                transWorkexp(res.data,2);
                this.ugentData = res.data;
                for (let i = 0;i < this.ugentData.length; i++) {
                  this.ugentData[i].created_at = getDistanceTime(this.ugentData[i].created_at)
                }
              }
            });
          // 名企数据
        this.$ajax.get('/company/famous',{page: 1, rows: 6})
          .then((res)=>{
            if(res.data.state != 400){
              splicLogo(res.data);
              this.famousData = res.data
            }
          });
        // 新闻资讯
        this.$ajax.post('/news',{page: 1, operate: 'index'})
          .then((res)=>{
            if(res.data.code == 200){
              splicFrontcover(res.data.data);
              this.newsData = res.data.data
            }
          });
        // 基础系统设置
        this.$ajax.get('/get-system-configs')
          .then((res)=>{
            if (res.data.state != 400) {
              let param = JSON.stringify(res.data);
              localStorage.setItem('BASSET',param);
              res.data.forEach((item,ids)=> {
                // 网站title
                if (item.key == 'cfg_websitename') {
                  this.webTitle = item.value;
                }
              })
            }
          });
      }
    }
</script>

<style>
  .main{
    z-index: 1;
  }
  /*头部*/
  .head_top{
    width: 100%;
    line-height: 44px;
    text-align: center;
  }
  .head_top span{
    font-size: 14px;
    color: #353535;
  }
  .head_top span img{
    width: 20px;
    height: 15px;
  }
  .head_top img{
    display: inline-block;
    vertical-align: middle;
  }
  .logo{
    margin-left: -15px;
    width: 88px;
    height: 24px;
  }

  /*搜索栏*/
  .search{
    width: 100%;
    padding: 10px 0;
    height: 40px;
    background-color: #ffffff;
  }
  .search_box{
    display: flex;
  }
  .search .el-select{
    margin-top: 0;
    width: 100px;
    height: 40px;
  }
  .search_box .el-input{
    width: auto;
  }
  .search_box .el-input__inner{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .search_text{
    flex-grow: 1;
  }
  .search .el-select::placeholder{
    font-size: 12px;
  }
  .search .el-select .el-input::-webkit-scrollbar-thumb{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .search_btn{
    display: inline-block;
    width: 48px;
    height: 40px;
    background: #5082e6 url("../../static/images/search.png") center center /20px 20px no-repeat;
  }
  /*轮播*/
  .banner img{
    width: 100%;
    height: 120px;
  }
  /*主导航*/
  .main_nav_cell{
    padding-top: 5px;
    width: 100%;
    height: 95px;
    background-color: #ffffff;
  }
  .nav_cell{
    float: left;
    text-align: center;
    width: 20%;
    height: 65px;
    padding: 12px 0 9px;
  }
  .nav_cell img{
    width: 44px;
    height: 44px;
  }
  .main_nav_cell a {
    font-size: 12px;
    color: #919199;
    text-decoration: none;
  }

  /*急聘*/
  .ugent{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .ugent_cell{
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ECEFF1;
  }
  .ugent_sign{
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
  .pos_name{
    font-size: 14px;
    color: #666666;
  }
  .salary{
    font-size: 12px;
    color: #ff5959;
  }
  .ugent_bottom{
    margin-top: 10px;
    color: #919199;
  }
  .tags{
    font-size: 12px;
  }
  .update_time{
    font-size: 12px;
    color: #919199;
  }
  /*名企招聘*/
  .famous{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .famous_cell{
    display: flex;
    padding-top: 15px;
  }
  .famous_head{
    justify-content: start;
    margin-bottom: 15px;
    width: 60px;
    height: 60px;
  }
  .famous_head img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }
  .famous_msg{
    flex-grow: 1;
    padding-left: 20px;
    color: #666666;
  }
  .famous_name{
    padding-top: 3px;
    font-size: 14px;
    font-weight: bold;
  }
  .famous_msg p{
    margin-top: 12px;
    font-size: 12px;
  }
  .famous_msg p span{
    color: #ff8236;
  }
  .show_more{
    display: inline-block;
    width: 100%;
    line-height: 44px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 12px;
    color: #ff8236;
    text-decoration: none;
  }
  /*新闻资讯*/
  .news{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .news_cell{
    display: flex;
    padding: 15px 0;
  }
  .news_head{
    justify-content: start;
    margin-bottom: 15px;
    width: 90px;
    height: 60px;
    min-width: 90px;
  }
  .news_head img{
    width: 100%;
    height: 100%;
  }
  .news_msg{
    flex-grow: 1;
    padding-left: 20px;
    padding-top: 3px;
    color: #666666;
  }
  .news_name{
    font-size: 14px;
    font-weight: bold;
  }


</style>
