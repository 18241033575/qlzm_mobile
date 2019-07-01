<template>
  <!-- 技能贷 -->
    <div class="skills_loan">
      <div class="com_det_title">
        <div class="content">
          技能贷
        </div>
      </div>
      <div class="skills">
        <div class="skill_bg">
          <div class="logo">
            <img src="/static/images/logo.png" alt="">
            <span class="go_index" @click="go_index">首页</span>
          </div>
          <div class="skill_msg">
            <p>急用钱  不求人</p>
            <p class="skill_need">有证书  能贷款  最高可贷50万</p>
            <span class="apply_skill_btn" @click="skills_det">立即申请技能贷</span>
          </div>
        </div>
        <div class="skill_adv">
          <div class="skill_adv_cell">
             <p>无抵押，零担保</p>
            <span>有技能证书即可申请</span>
          </div>
          <div class="skill_adv_cell">
            <p>放款快</p>
            <span>最快半小时到账</span>
          </div>
          <div class="skill_adv_cell">
            <p>额度高</p>
            <span>最高可贷50万</span>
          </div>
          <div class="skill_adv_cell">
            <p>利息低</p>
            <span>日利率万分之4起</span>
          </div>
        </div>
        <div class="classify">
          <div class="cla_title">
            哪些技能证书可贷款？
          </div>
          <div class="cla_part">
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_01@2x.png" alt="">
              </div>
              <p>建造师证书</p>
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_02@2x.png" alt="">
              </div>
              <p>注册工程师证书</p>
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_03@2x.png" alt="">
              </div>
              <p>职称证书</p>
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_04@2x.png" alt="">
              </div>
              <p>其他注册类证书</p>
            </div>
          </div>
          <div class="apply_btn">
            <span  @click="skills_det">咨询客服，了解更多可贷款证书</span>
          </div>
        </div>
        <div class="classify">
          <div class="cla_title">
            简单几步，快速拿钱！
          </div>
          <div class="cla_part">
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_05@2x.png" alt="">
              </div>
              <p>提交申请</p>
            </div>
            <div class="to_next">
              <img src="/static/images/ic_progress_right@2x.png" alt="">
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_06@2x.png" alt="">
              </div>
              <p>顾问对接</p>
            </div>
            <div class="to_bottom bac_none">
              <!--<img src="/static/images/ic_progress_down@2x.png" alt="">-->
            </div>
            <div class="to_next bac_none">
              <!--<img src="/static/images/ic_progress_right@2x.png" alt="">-->
            </div>
            <div class="to_bottom">
              <div class="bot_line">
                <img src="/static/images/ic_progress_down@2x.png" alt="">
              </div>
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_08@2x.png" alt="">
              </div>
              <p>放款</p>
            </div>
            <div class="to_next">
              <img src="/static/images/ic_progress_left@2x.png" alt="">
            </div>
            <div class="cla_part_cell">
              <div class="cell_img">
                <img src="/static/images/icon_07@2x.png" alt="">
              </div>
              <p>征信、额度评估</p>
            </div>
          </div>
          <div class="apply_btn">
            <span @click="skills_det">立即申请技能贷</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "skills_loan",
      methods: {
        go_index(){
          this.$router.push({name: 'index'})
        },
        skills_det(){
          this.$router.push({name: 'loan_det'})
        }
      }
    }
</script>

<style scoped>
  .skills{
    padding-bottom: 10px;
    background-color: #ffffff;
  }
  .skill_bg{
    width: 100%;
    height: 296px;
    background: url("/static/images/img_m_banner@2x.png") center center no-repeat;
    background-size: 100%;
  }
  .logo{
    width: auto;
    padding-top: 12px;
    margin-left: 16px;
    height: 28px;
  }
  .logo img{
    width: 84px;
    height: 23px;
  }
  .go_index{
    display: inline-block;
    float: right;
    margin-right: 16px;
    width: 60px;
    line-height: 28px;
    height: 28px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    background: rgba(0,0,0,.5);
  }
  .skill_msg{
    margin-top: 30px;
    text-align: center;
  }
  .skill_msg p{
    font-size: 36px;
    color: #1956ff;
    font-weight: 700;
  }
  .skill_msg .skill_need{
    margin-top: 15px;
    color: #456eb8;
    font-size: 16px;
    font-weight: bold;
  }
  .apply_skill_btn{
    display: inline-block;
    margin-top: 35px;
    width: 160px;
    line-height: 42px;
    height: 42px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #fff;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background: linear-gradient(180deg,rgba(131,101,255,1) 0%,rgba(44,79,255,1) 100%) no-repeat;
    border-radius: 21px;
  }
  .skill_adv{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: -50px;
  }
  .skill_adv_cell{
    margin-bottom: 10px;
    width: 45%;
    height: 100px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .skill_adv_cell:nth-child(1){
    background: url("/static/images/img_bg_01.png") no-repeat;
  }
  .skill_adv_cell:nth-child(2){
    background: url("/static/images/img_bg_02.png") no-repeat;
  }
  .skill_adv_cell:nth-child(3){
    background: url("/static/images/img_bg_03.png") no-repeat;
  }
  .skill_adv_cell:nth-child(4){
    background: url("/static/images/img_bg_04.png") no-repeat;
  }
  .skill_adv_cell p{
    padding-top: 25px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
  }
  .skill_adv_cell span{
    font-size: 12px;
    color: rgba(255,255,255,.5);
  }
  .classify{
    margin-top: 30px;
    text-align: center;
  }
  .classify .cla_title{
    font-weight: bold;
    color: #333333;
    font-size: 18px;
  }
  .cla_part{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .cla_part_cell{
    margin-top: 30px;
    width: 40%;
  }
  .cell_img{
    margin: 0 auto;
    width: 68px;
    height: 68px;
    border-radius: 200px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #DCDCDC;
  }
  .cell_img img{
    margin-top: 18px;
    width: 32px;
    height: 32px;
  }
  .cla_part_cell p{
    margin-top: 20px;
  }
  .apply_btn{
    margin: 30px 0;
  }
  .apply_btn span{
    display: inline-block;
    width: 230px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #FFFFFF;
    -webkit-border-radius: 21px;
    -moz-border-radius: 21px;
    border-radius: 21px;
    font-size: 14px;
    color: #ffffff;
    background:linear-gradient(90deg,rgba(169,122,255,1) 0%,rgba(74,134,254,1) 100%) no-repeat;
    box-shadow:0 5px 18px 0 rgba(79,75,254,0.3);
  }
  .to_next{
    width: 15%;
    height: 1px;
    text-align: center;
    background-color: #dcdcdc;
  }
  .to_next img{
    margin-top: -9px;
    width: 20px;
    height: 20px;
    vertical-align: top;
  }
  .to_bottom{
    margin-top: 30px;
    width: 40%;
  }
  .to_bottom .bot_line{
    margin: 0 auto;
    width: 1px;
    height: 60px;
    background-color: #dcdcdc;
  }
  .to_bottom img{
    margin: 20px 0 0 -9px;
    width: 20px;
    height: 20px;
  }
  .bac_none{
    background: none;
  }
</style>
