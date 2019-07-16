<template>
    <!--骑驴找马-->
  <div class="donkey_horse">
    <div class="labor_dispatch_box">
      <div class="com_det_title">
        <div class="content">
          骑驴找马
        </div>
      </div>
      <!--banner-->
      <div class="banner">
        <img src="/static/images/img_link_gdrck.png" alt="">
      </div>
      <div class="content">
        <div class="labor_title">
          专业运作&nbsp;&nbsp;效率当先
        </div>
        <div class="labor_area">
          <div class="area_cell">
            <div class="sort_num">
              01
            </div>
            <div class="sort_msg">
              <p class="msg1">企业下单</p>
              <p class="msg2">1分钟急速下单</p>
            </div>
          </div>
          <div class="area_cell">
            <div class="sort_num">
              02
            </div>
            <div class="sort_msg">
              <p class="msg1">顾问对接</p>
              <p class="msg2">1小时快速对接需求</p>
            </div>
          </div>
          <div class="area_cell">
            <div class="sort_num">
              03
            </div>
            <div class="sort_msg">
              <p class="msg1">评估方案</p>
              <p class="msg2">1-3天推荐报告</p>
            </div>
          </div>
          <div class="area_cell">
            <div class="sort_num">
              04
            </div>
            <div class="sort_msg">
              <p class="msg1">急速寻猎</p>
              <p class="msg2">3-5天安排面试</p>
            </div>
          </div>
          <div class="area_cell">
            <div class="sort_num">
              05
            </div>
            <div class="sort_msg">
              <p class="msg1">持续服务</p>
              <p class="msg2">平均15天推荐成功</p>
            </div>
          </div>
        </div>
      </div>
      <!-- banner -->
      <div class="horse_banner">
        <div class="horse_banner_title">
          专项专猎&nbsp;&nbsp;<span>精准狙击</span>
        </div>
        <div class="new_banner">
          <v-touch v-on:swipeleft="leftChangeImg" height="104px" v-on:swiperight="leftChangeImg">
            <ul :style="com_style">
              <li class="banner_det">
                  <span class="server">
                    <span class="server_tips">专业顾问</span>
                    <span class="server_det">两千名专业猎头顾问负责专业领域，客户体验好</span>
                  </span>
                <span class="server">
                    <span class="server_tips">专业协作</span>
                    <span class="server_det">分工协作，同时也可在全国范围内展开联合寻猎</span>
                  </span>
                <span class="server">
                    <span class="server_tips">专业客服</span>
                    <span class="server_det">上百名专业客服，为您提供一对一的专业服务</span>
                  </span>
              </li>
              <li class="banner_det">
                  <span class="server">
                    <span class="server_tips">需求对接</span>
                    <span class="server_det">急速下单，专业猎头顾问点对点为您界定需求、规划方案</span>
                  </span>
                <span class="server">
                    <span class="server_tips">急速寻猎</span>
                    <span class="server_det">360度全方位、多渠道寻猎，筛选准、推荐快</span>
                  </span>
                <span class="server">
                    <span class="server_tips">后续服务</span>
                    <span class="server_det">为结果负责，确保所选人才持续稳定地为您服务</span>
                  </span>
              </li>
              <li class="banner_det">
                  <span class="server">
                    <span class="server_tips">快速推荐</span>
                    <span class="server_det">1~3天即可为您推荐首批候选人才，效率高</span>
                  </span>
                <span class="server">
                    <span class="server_tips">面试安排</span>
                    <span class="server_det">3~5天即可为您安排候选人才面试，速度快</span>
                  </span>
                <span class="server">
                    <span class="server_tips">成功入职</span>
                    <span class="server_det">平均15天推荐成功</span>
                  </span>
              </li>
              <li class="banner_det">
                  <span class="server">
                    <span class="server_tips">增值服务</span>
                    <span class="server_det">90天保证期，为您提供12个月所选人才追踪服务</span>
                  </span>
                <span class="server">
                    <span class="server_tips">人事管理</span>
                    <span class="server_det">为您提供人事管理方案及办公软件（吱鸟办公）</span>
                  </span>
                <span class="server">
                    <span class="server_tips">职业操守</span>
                    <span class="server_det">保护您的商业隐私，恪守猎头行业规范</span>
                  </span>
              </li>
            </ul>
        <!--    <div :style="com_style" class="banner_det fl">
              <p></p>
            </div>-->
          </v-touch>
        </div>
      </div>
      <div class="content">
        <div class="labor_title">
          科学的人才甄选解决方案
        </div>
        <div class="plan">
          <div class="plan_cell" style="margin-bottom: 30px;">
            <div class="cell_tit">管理能力</div>
            <div class="plan_msg">
              有效的协作能够为你的项目团队或组织带来更好的成绩,你将会学习如何成长为一名自觉的、透明的、有责任感的团队成员,以及如何够为成功的团队绩效做出积极贡献。
            </div>
          </div>
          <div class="plan_cell" style="margin-bottom: 30px;">
            <div class="cell_tit">项目经验</div>
            <div class="plan_msg">
              沟通风格有很多种,你将学会如何根据不同的人和情况采取不同的沟通风格,并且同时仍然能坚守真我, 并为自己和组织寻求积极的成果。
            </div>
          </div>
          <div class="plan_cell">
            <div class="cell_tit">技术能力</div>
            <div class="plan_msg">
              获得良好沟通技能的方法并不是为了争个输赢,而是更多关注与如何在 “游戏” 进行的过程中,让你更加如鱼得水地在你的领域中灵活发挥。
            </div>
          </div>
        </div>

        <div class="labor_title">
          业务覆盖全国
        </div>
        <div class="range">
          骑驴找马在上海、北京、广州、深圳、南京、苏州、杭州、成都、长沙、厦门、青岛、武汉、宁波、无锡、西安、合肥 、大连、天津、南昌、重庆、常州、济南、沈阳等30多座中心城市设有独立办公室，为企业客户提供专业服务，拥有超50000平米的办公面积。
        </div>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
  import copyright from "../../components/common/copyright"
    export default {
        name: "donkey_horse",
      components: {
        copyright
      },
      data(){
        return {
          com_style: {
            marginLeft: 0
          },
          screenW: 0,
          indexMien: 0
        }
      },
      methods: {
        leftChangeImg(e){
          e.preventDefault();
          if (e.deltaX > 0 && this.indexMien > 0) {
            // 向右滑
            this.indexMien--;
          }else if (e.deltaX < 0 && this.indexMien < 3) {
            // 向左滑
            console.log(1);
            this.indexMien++;
          }
          this.com_style.marginLeft = -this.screenW * 0.9 * this.indexMien + 'px';
        }
      },
      created(){
        //获取屏幕宽度
        this.screenW = document.documentElement.clientWidth || document.body.clientWidth;
        // 监听分享打开的手机或电脑网页
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) == "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) == "android";
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

        }else {
          window.location.href= ' http://www.qlzm.com.cn/company_donkey_horse'
        }
      }
    }
</script>

<style scoped>
  .labor_dispatch_box{
    background-color: #ffffff;
    padding-bottom: 30px;
    overflow: hidden;
  }
  .banner img{
    width: 100%;
    height: 135px;
  }
  .labor_title{
    margin: 30px 0;
    text-align: center;
    color: #353535;
    font-size: 18px;
    line-height: 18px;
  }
  .labor_area{
    padding: 15px;
    color: #666666;
    font-size: 12px;
    line-height: 18px;
  }
  .area_cell{
    display: flex;
    width: 330px;
    height: 70px;
  }
 .sort_num{
   margin-top: 15px;
   margin-right: 20px;
   width: 40px;
   line-height: 40px;
   height: 40px;
   font-size: 18px;
   color: #fe6037;
   font-weight: bold;
   text-align: center;
   background: url("/static/images/ic_quan@2x.png") center center;
   background-size: 40px;
 }
  .sort_msg{
    margin-top: 15px;
  }
  .sort_msg .msg1{
    margin-bottom: 2px;
    line-height: 18px;
    font-size: 14px;
    font-weight: bold;
    color: #353535;
  }
  .sort_msg .msg2{
    line-height: 18px;
    font-size: 12px;
    color: #999999;
  }
  .plan_cell{
    position: relative;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: 1px dashed #252B46;
  }
  .cell_tit{
    position: absolute;
    top: -12px;
    left: 50%;
    margin-left: -40px;
    width:85px;
    height:24px;
    line-height: 24px;
    text-align: center;
    background:linear-gradient(-30deg,rgba(223,55,52,1) 0%,rgba(254,96,55,1) 100%);
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    font-size: 14px;
    color: #ffffff;
  }
  .plan_msg{
    padding: 24px 15px 10px;
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
  .range{
    font-size: 12px;
    color: #999999;
    text-align: center;
    line-height: 16px;
  }
  .horse_banner{
    width: 100%;
    height: 400px;
    background-color: #f0f1f5;
    overflow: hidden;
  }
  .horse_banner_title{
    padding: 30px 0;
    text-align: center;
  }
  .horse_banner_title span{
    color: #ff4b4b;
  }
  .new_banner ul{
    transition: ease-in-out 1s;
    width: 400%;
    list-style: none;
    overflow: hidden;
  }
  .new_banner ul li{
    float: left;
    width: 22%;
  }
  .banner_det{
    margin: 0 10px 0;
    height: 275px;
    background:linear-gradient(-45deg,rgba(19,24,48,1),rgba(55,62,92,1));
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .server_tips{
    display: inline-block;
    margin-top: 10px;
    padding-right: 12px;
    width: 73px;
    line-height: 24px;
    font-size: 14px;
    text-align: right;
    color: #ffffff;
    background:linear-gradient(-30deg,rgba(223,55,52,1) 0%,rgba(254,96,55,1) 100%);
    -webkit-border-radius: 0 12px 12px 0;
    -moz-border-radius: 0 12px 12px 0;
    border-radius: 0 12px 12px 0;
  }
  .server_det{
    display: block;
    margin-left: 15px;
    padding: 12px 15px;
    font-size: 12px;
    color: #ffffff;
    border-bottom: 1px dashed #fff;
  }
</style>
