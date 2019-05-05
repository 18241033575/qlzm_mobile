<template>
    <div class="company_det">
      <div class="company_det_top">
        <div class="com_det_title">
          <div class="content">
            {{msg}}
          </div>
        </div>
        <div class="com_det_body">
          <div class="content">
            <div class="famous_cell">
              <div class="famous_head fl">
                <img :src="this.companyMsg.logo" alt="">
              </div>
              <div class="famous_msg fl">
                <div class="pos_name">
                  <img v-show="companyMsg.has_m==1" src="/static/images/ic_fam_comp@2x.png" alt="">{{companyMsg.name}}<span @click="report" class="fr report"><img
                  src="/static/images/report.png" alt="">举报</span>
                </div>
                <p><span class="tags">{{companyMsg.nature}}</span> | <span class="tags">{{companyMsg.scale}}</span> | <span class="tags">{{(companyMsg.province=='未知'?'未知地点':companyMsg.province) + (companyMsg.city=='未知'?'':companyMsg.city)}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="company_det_bottom">
        <div class="bottom_tab">
          <div class="bottom_tab_cell" @click="company_msg">
            <span :class="{company_active: this.companyDetSign}">企业信息</span>
          </div>
          <div class="bottom_tab_cell" @click="hot_pos">
            <span :class="{company_active: !this.companyDetSign}">热招职位({{hotPosNum}})</span>
          </div>
        </div>
        <div class="hot_post" v-show="!this.companyDetSign">
          <div class="content">
            <div class="ugent_cell" :data-id="item.id"  :cid="item.cid" v-for="(item,index) in this.hotPosData" :key="index" @click="to_posDetail">
              <div class="ugent_top">
                <span v-show="item.is_urgent==1" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
              </div>
              <div class="ugent_bottom">
                <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span> | <span class="tags">{{item.education}}</span> | <span
                class="tags">{{item.nature}}</span><span class="update_time fr">{{item.update_at}}</span>
              </div>
            </div>
            <div class="loadmore">
              <p v-show="!moreDataSign && firstSign" class="more" @click="loadData">加载更多</p>
              <p v-show="moreDataSign && firstSign">我也是有底线的</p>
            </div>
          </div>
        </div>
        <div class="company_msg" v-show="this.companyDetSign">
          <div class="company_msg_cell" v-if="styleSign">
            <div class="content">
              <div class="cell_box">
                <div class="com_det_title msg_cell_fz">
                  企业风采
                </div>
                <div class="company_mien" :style="com_style" ref="mien">
                  <v-touch v-on:swipeleft="leftChangeImg" height="104px" v-on:swiperight="leftChangeImg">
                    <div :style="com_mien" class="mien_cell fl" v-for="(item,index) in this.companyMien" :key="index">
                      <img :src="item || '/static/images/article_def_img.png'" alt="">
                      <p></p>
                    </div>
                  </v-touch>
                </div>
              </div>
            </div>
          </div>
          <!-- 企业简介 -->
          <div class="company_msg_cell">
            <div class="content">
              <div class="cell_box">
                <div class="com_det_title msg_cell_fz">
                  企业简介
                </div>
                <div class="company_info" :class="{shade_info: this.shadeSign}">
                  <quill-editor v-model="companyMsg.introduction"
                                @ready="onEditorReady($event)"
                                :options ="editorOption">
                  </quill-editor>
                  <div class="shade" v-if="shadeSign"></div>
                </div>
                <!--思路：开始固定高度，超出隐藏。点击后自动高度-->
                <div class="show_all" v-if="shadeSign" @click="look_all">查看全部</div>
              </div>
            </div>
          </div>
          <!--企业福利-->
          <div class="company_msg_cell">
            <div class="content">
              <div class="cell_box">
                <div class="com_det_title msg_cell_fz">
                  企业福利
                </div>
                <div v-show="!tags_sign" class="company_welfare">
                  <p v-show="!tags_sign">暂无</p>
                </div>
                <div v-show="tags_sign" class="company_welfare">
                  <span v-for="(item,index) in companyMsg.tags" :key="index">{{item}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 企业地址 -->
          <div class="company_msg_cell">
            <div class="content">
              <div class="cell_box">
                <div class="com_det_title msg_cell_fz">
                  企业地址
                </div>
                <div class="company_address">
                  {{(companyMsg.province=='未知'?'未知地点':companyMsg.province) +　(companyMsg.city=='未知'?'':companyMsg.city) + (companyMsg.area=='未知'?'':companyMsg.city) + (companyMsg.address=='未知'?'':companyMsg.address)}}
                </div>
              </div>
            </div>
          </div>
          <!-- 联系人 -->
          <div class="company_msg_cell">
            <div class="content">
              <div class="cell_box">
                <div class="com_det_title msg_cell_fz">
                  联系人
                </div>
                <div class="company_contract">
                  <div class="company_contract_cell">
                    <span class="label">联系人</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.username }}</span>
                  </div>
                  <div class="company_contract_cell">
                    <span class="label">手机</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.phone}}</span>
                  </div>
                  <div class="company_contract_cell">
                    <span class="label">座机</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.tel}}</span>
                  </div>
                  <div class="company_contract_cell">
                    <span class="label">微信</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.wx}}</span>
                  </div>
                  <div class="company_contract_cell">
                    <span class="label">QQ</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.qq}}</span>
                  </div>
                  <div class="company_contract_cell">
                    <span class="label">邮箱</span><span class="contract_msg">{{ (contactData == null || contactData == undefined)?'':contactData.email}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%">
        <span>确定前往登录页面?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="tal_login">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,transNature,transEducation,transWorkexp,transComNature,transComScale,splicPic,company_adv,fileUrl} from '../../../static/js/common.js'
    export default {
      name: "company_det",
      data() {
          return {
            msg: "企业详情",
            companyMsg: {},
            contactData: {},
            hotPosData: {},
            companyMien: {},
            companyDetSign: true,
            hotPosNum: 0,
            moreDataSign: false,
            firstSign: false,
            tags_sign: true,
            shadeSign: true,
            styleSign: true,
            dialogVisible: false,
            com_style: {
              marginLeft: 0,
              width: '100%'
            },
            com_mien: {
              width: 'auto'
            },
            cid: 0,
            page: 1,
            editorOption: {
              modules:{
                toolbar: false,
              }
            },
            screenW: 0,
            styleLength: 0,
            indexMien: 0
          }
      },
      methods: {
        company_msg() {
          this.companyDetSign = true;
        },
        hot_pos() {
          this.companyDetSign = false;
        },
        to_posDetail(e) {
          let id = e.currentTarget.getAttribute('data-id');
          let cid = e.currentTarget.getAttribute('cid');
          this.$router.push({name: 'pos_det',query:{id: id,cid: cid}})
        },
        look_all() {
          this.shadeSign = false;
        },
        report() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (companyInfo) {
            if (companyInfo.id != this.cid) {
              this.$router.push({name: 'report',query: {member_id: companyInfo.id,cid:this.cid}})
            } else {
              // 自己举报自己
            }
          }else if (userInfo) {
            this.$router.push({name: 'report',query: {cid:this.cid}})
          }else {
            this.dialogVisible = true;
          }
        },
        tal_login() {
          this.dialogVisible = false;
          this.$router.push({name: 'login'});
        },
        onEditorReady(val) {
          val.enable(false);
        },
        leftChangeImg(e) {
          e.preventDefault();
          if (e.deltaX > 0 && this.indexMien > 0) {
            // 向右滑
            this.indexMien--;
          }else if (e.deltaX < 0 && this.indexMien < this.styleLength - 1) {
            // 向左滑
            this.indexMien++;
          }
          this.com_style.marginLeft = -this.screenW * 0.8 * this.indexMien + 'px';
        },
        // 加载更多职位
        loadData(){
          this.page++;
          this.$ajax.get('/office/company', {params: {cid: this.cid,page: this.page}})
            .then((res) => {
              if (res.data.state != 400) {
                tranCity(res.data.data,true,2);
                transWorkexp(res.data.data,2);
                transEducation(res.data.data,2);
                transNature(res.data.data,2);
                transSalary(res.data.data,2);
                this.hotPosData.push.apply(this.hotPosData,res.data.data);
                if (this.hotPosData.length == this.hotPosNum) {
                  this.moreDataSign = true;
                }

              }
            })
        }
      },
      created() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        //获取屏幕宽度
        this.screenW = document.documentElement.clientWidth || document.body.clientWidth;
        let cid = this.$route.query.cid;
        this.cid = cid;
        this.$ajax.get('/api/company/detail'+ '/' + cid)
          .then((res) => {
            if (res.data.state != 400) {
              if (res.data.tags == '') {
                this.tags_sign = false;
              } else {
                this.tags_sign = true;
                res.data.tags = company_adv(res.data.tags,true);
              }
              if (res.data.style.length == 0 || res.data.style == '') {
                this.styleSign = false;
              } else {
                this.styleLength = res.data.style.length;
                this.com_style.width = res.data.style.length * 100 + '%';
                this.com_mien.width = this.screenW * 0.8 + 'px';
                this.styleSign = true;
              }
              this.companyMien = res.data.style;
              for (let i = 0,len = this.companyMien.length;i < len;i++) {
                this.companyMien[i] = splicPic(this.companyMien[i],true);
              }
              let file_url = fileUrl();
              res.data.logo = splicPic(res.data.logo,true)==file_url?'/static/images/company_def_logo.png':splicPic(res.data.logo,true);
              this.contactData = res.data.contact;
              tranArea(res.data,true,1);
              tranCity(res.data,true,4);
              tranProvince(res.data,true);
              transComScale(res.data,1);
              transComNature(res.data,1);
              this.companyMsg = res.data;
              this.shadeSign = this.companyMsg.introduction.length > 300?true:false;
            }
            this.$indicator.close();
          });
        this.$ajax.get('/office/company', {params: {cid: cid}})
          .then((res) => {
            if (res.data.state != 400) {
              this.firstSign = res.data.count > 6?true:false;
              this.hotPosNum = res.data.count;
              tranCity(res.data.data,true,2);
              transWorkexp(res.data.data,2);
              transEducation(res.data.data,2);
              transNature(res.data.data,2);
              transSalary(res.data.data,2);
              this.hotPosData = res.data.data;
            }
          })
      },
    }
</script>

<style scoped>
  .company_det_top{
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .com_det_body{
    width: 100%;
    height: 90px;
  }

  /*名企列表*/

  .famous_cell{
    display: flex;
    padding: 15px 0 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
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
    padding-top: 5px;
    padding-left: 20px;
    color: #666666;
  }
  .famous_name{
    font-size: 14px;
    font-weight: bold;
  }
  .famous_msg p{
    margin-top: 12px;
    font-size: 12px;
    color: #919199;
  }
 /* .famous_msg p span{
    color: #ff8236;
  }*/

  .pos_name {
    font-size: 14px;
    color: #666666;
  }
  .pos_name img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .tags {
    font-size: 12px;
    color: #919199;
  }

  .company_det_bottom{
    margin-bottom: 15px;
    background-color: #ffffff;
  }
  .bottom_tab{
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .bottom_tab_cell{
    width: 50%;
    line-height: 44px;
    font-size: 14px;
    color: #333333;
    text-align: center;
  }
  .bottom_tab_cell span{
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .company_active{
    border-bottom: 1px solid #5082E6;
  }

  .ugent_cell {
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ECEFF1;
  }

  .ugent_sign {
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

  .pos_name {
    font-size: 14px;
    color: #666666;
  }

  .salary {
    font-size: 12px;
    color: #ff5959;
  }

  .ugent_bottom {
    margin-top: 10px;
  }

  .ugent_bottom p {
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
    line-height: 12px;
  }

  .ugent_bottom p img {
    margin-right: 5px;
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }

  .tags {
    font-size: 12px;
    color: #919199;
  }
  .update_time {
    font-size: 12px;
    color: #919199;
  }
  .msg_cell_fz{
    font-size: 14px;
    border: none;
  }
  .company_msg_cell{
    overflow: hidden;
  }
  .company_msg_cell .cell_box{
    padding-bottom: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  /*风采*/
  .company_mien{
    height: 104px;
    transition: 1s;
  }
  .mien_cell{
    width: 33%;
    margin-right: 15px;
    text-align: center;
  }

  .mien_cell img{
    width: 100%;
    height: 104px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
  }
  .mien_cell p{
    font-size: 12px;
    color: #666666;
    background-color: #f8f8f8;
  }
  /*简介*/
  .company_info{
    position: relative;
    height: auto;
    overflow: hidden;
  }
  .shade_info{
    height: 130px;
  }
  .company_info p{
    text-indent: 2em;
    font-size: 12px;
    color: #666666;
    line-height: 24px;
  }
  .shade{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    /*background: -moz-linear-gradient(to bottom,rgba(255,255,255,0), rgba(255, 54, 205,1));*/
    background: -webkit-linear-gradient(to bottom,rgba(255,255,255,0), rgb(255, 255, 255));
    background: -o-linear-gradient(to bottom,rgba(255,255,255,0), rgb(255, 255, 255));
    background: -moz-linear-gradient(to bottom,rgba(255,255,255,0), rgb(255, 255, 255));
    background: linear-gradient(to bottom,rgba(255,255,255,0), rgb(255, 255, 255));
  }
  .show_all{
    text-align: center;
    font-size: 14px;
    color: #919199;
    line-height: 32px;
  }


  /*福利*/
  .company_welfare{
    display: flex;
    /*justify-content: center;*/
    flex-wrap: wrap;
    font-size: 12px;
    color: #919199;
  }
  .company_welfare span{
    margin-bottom: 5px;
    margin-right: 10px;
    text-align: center;
    padding: 5px 7px;
    line-height: 12px;
    color: #5082e6;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #96B4F0;
    background-color: #eaf0fc;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /*地址*/
  .company_address{
    font-size: 12px;
    color: #666666;
  }
  /*联系人*/
  .company_contract_cell{
    display: flex;
    margin-top: 5px;
    font-size: 12px;
  }
  .label{
    display: inline-block;
    width: 60px;
    color: #919199;
  }
  .contract_msg{
    flex-grow: 1;
    color: #666666;
  }
  /* 举报 */
  .report{
    margin-right: 10px;
    font-size: 12px;
    color: #919199;
  }
  .report img{
    margin-right: 0;
    vertical-align: top;
  }
  /* 加载更多 */
  .loadmore{
    text-align: center;
    line-height: 44px;
    font-size: 12px;
    color: #919191;
  }
  .more{
    color: #ff8236;
  }
</style>
