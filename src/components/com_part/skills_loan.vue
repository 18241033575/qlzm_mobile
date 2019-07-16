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
            <!--<span class="apply_skill_btn" @click="skills_det">立即申请技能贷</span>-->
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
            <!--<span @click="skills_det">立即申请技能贷</span>-->
          </div>
          <div class="bottom_btn">
            <div class="content">
              <div class="bottom_btn_box">
                <span @click="skills_det" class="apply_skill_btn">立即申请技能贷</span><!--<span class="share" @click="share"><img src="/static/images/ic_share@2x.png" alt="">分享</span>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%">
        <span>{{ msg }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分享弹层 -->
      <div class="share_box" v-show="share_sign" @click="close_share">
        <div class="content">
          <div class="share_box_det" @click.stop="donothing">
            <div class="share_cell" @click.stop="share_cell" data-type="wx_friend">
              <img src="/static/images/icon_share_wechat@2x.png" alt="">
              <p>微信好友</p>
            </div>
            <div class="share_cell" @click.stop="share_cell" data-type="wx_zone">
              <img src="/static/images/icon_share_circle@2x.png" alt="">
              <p>微信朋友圈</p>
            </div>
            <div class="share_cell" @click.stop="share_cell" data-type="qq_friend">
              <img src="/static/images/icon_share_qq@2x.png" alt="">
              <p>QQ好友</p>
            </div>
            <div class="share_cell" @click.stop="share_cell" data-type="qq_zone">
              <img src="/static/images/icon_share_qzone@2x.png" alt="">
              <p>QQ空间</p>
            </div>
            <div class="share_cell" @click.stop="share_cell" data-type="xina">
              <img src="/static/images/icon_share_sina@2x.png" alt="">
              <p>新浪微博</p>
            </div>
            <div class="share_cell" @click.stop="share_cell" data-type="other">
              <img src="/static/images/icon_share_copy@2x.png" alt="">
              <p>其他途径</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
        name: "skills_loan",
      data() {
          return {
            dialogVisible: false,
            msg: '您还没有登录，是否前往登录页面？',
            share_sign: false
          }
      },
      methods: {
        go_index(){
          this.$router.push({name: 'index'})
        },
        skills_det(){
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (userInfo) {
            this.$router.push({name: 'loan_det',query: {name: userInfo.name,phone: userInfo.phone}})
          }else if (companyInfo) {
            this.msg = '企业用户无法申请技能贷';
            this.dialogVisible = true;
          }else {
            this.dialogVisible = true;
          }
        },
        handleClose(){
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (!companyInfo) {
            this.$router.push({name: 'login'});
            let param = {name: 'skills_loan'};
            localStorage.setItem('last_url',JSON.stringify(param));
          }
          this.dialogVisible = false;
        },
        share(){
          // this.share_sign = true;
          let nativeShare = new NativeShare({
            wechatConfig: {
              appId: '',
              timestamp: '',
              nonceStr: '',
              signature: '',
            },
            // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
            // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
            syncDescToTag: false,
            syncIconToTag: false,
            syncTitleToTag: false,
          });
          try {
            nativeShare.call(command = 'default');
          } catch(err) {
            this.$notify.warning({
              title: '提示',
              message: '您的浏览器可能不支持此功能,请使用浏览器的分享功能',
              showClose: false,
              duration: 1500
            });
          }
        },
        close_share(){
          this.share_sign = false;
        },
        donothing(){

        },
        share_cell(e){
          let type = e.currentTarget.getAttribute('data-type');

          let nativeShare = new NativeShare({
            wechatConfig: {
              appId: '',
              timestamp: '',
              nonceStr: '',
              signature: '',
            },
            // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
            // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
            syncDescToTag: false,
            syncIconToTag: false,
            syncTitleToTag: false,
          });
          // 你也可以在setConfig方法中设置配置参数
          nativeShare.setConfig({
            wechatConfig: {
              appId: '',
              timestamp: '',
              nonceStr: '',
              signature: '',
            }
          });
          // 设置分享文案
          nativeShare.setShareData({
            icon: 'https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg',
            link: 'https://github.com/fa-ge/NativeShare',
            title: 'NativeShare',
            desc: 'NativeShare是一个整合了各大移动端浏览器调用原生分享的插件',
            from: '@fa-ge',
          });

          switch (type){
            case 'wx_friend':
              // 唤起浏览器原生分享组件(如果在微信中不会唤起，此时call方法只会设置文案。类似setShareData)
              try {
                nativeShare.call('wechatFriend');
                // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
                // 类似的命令下面有介绍
              } catch(err) {
                try {

                }catch (err) {
                  // 如果不支持，你可以在这里做降级处理
                  this.$notify.warning({
                    title: '提示',
                    message: '您的浏览器可能不支持此功能,请使用浏览器自带的分享功能',
                    showClose: false,
                    duration: 1500
                  });
                }
              }
              break;
            case 'wx_zone':
              try {
                nativeShare.call('wechatTimeline');
              } catch(err) {
                this.$notify.warning({
                  title: '提示',
                  message: '您的浏览器可能不支持此功能,请使用浏览器自带的分享功能',
                  showClose: false,
                  duration: 1500
                });
              }
              break;
            case 'qq_friend':
              try {
                nativeShare.call('qqFriend');
              } catch(err) {
                this.$notify.warning({
                  title: '提示',
                  message: '您的浏览器可能不支持此功能,请使用浏览器自带的分享功能',
                  showClose: false,
                  duration: 1500
                });
              }
              break;
            case 'qq_zone':
              try {
                nativeShare.call('qZone');
              } catch(err) {
                this.$notify.warning({
                  title: '提示',
                  message: '您的浏览器可能不支持此功能,请使用浏览器自带的分享功能',
                  showClose: false,
                  duration: 1500
                });
              }
              break;
            default:
              try {
                nativeShare.call('default');
              } catch(err) {
                this.$notify.warning({
                  title: '提示',
                  message: '您的浏览器可能不支持此功能,请使用浏览器自带的分享功能',
                  showClose: false,
                  duration: 1500
                });
              }
              break;
          }

          /*
            调用call方法时第一个参数是指定用什么命令调用分享组件
            default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
            wechatTimeline 分享到朋友圈
            wechatFriend 分享给微信好友
            qqFriend 分享给QQ好友
            qZone 分享到QQ空间
            weibo 分享到微博
          */





        }
      }
    }
</script>

<style scoped>
  .skills{
    padding-bottom: 30px;
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
  .bottom_btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #DCDCDC;
  }
  .bottom_btn_box{
    display: flex;
  }
  .bottom_btn_box span{
    display: inline-block;
    margin: 0 auto;
    /*width: 50%;*/
  }
  .bottom_btn_box .apply_skill_btn{
    margin-top: 3px;
  }
  .bottom_btn_box img{
    margin-right: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .bottom_btn_box .share{
    color: #666666;
  }
  .share_box{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.4);
  }
  .share_box_det{
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 92%;
    background-color: #fff;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  .share_box_det .share_cell{
    padding: 30px 0;
    width: 30%;
    text-align: center;
  }
  .share_cell img{
    width: 30px;
    height: 30px;
  }
  .share_cell p{
    margin-top: 12px;
    font-size: 12px;
    color: #333333;
  }
</style>
