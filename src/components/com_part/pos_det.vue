<template>
  <div class="pos_det">
    <div class="company_det_top">
      <div class="com_det_title">
        <div class="content">
          职位详情
        </div>
      </div>
      <div class="com_det_body">
        <div class="content">
          <div class="ugent_cell">
            <div class="ugent_top">
              <span class="ugent_sign" v-show="this.posDetData.is_urgent == 1">急聘</span><span class="pos_name">{{this.posDetData.office_name}}</span><span class="salary fr">{{this.posDetData.transalary}}</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">{{posDetData.city || '未知'}}</span> | <span class="tags">{{posDetData.work_exp}}</span> | <span class="tags">{{posDetData.hire_num==0?'若干':posDetData.hire_num}}人</span> | <span class="tags">{{posDetData.education}}</span> | <span
              class="tags">{{posDetData.nature}}</span><span class="update_time fr">{{posDetData.created_at}}</span>
              <p @click="com_det" :id="this.posDetData.id" :cid="this.posDetData.cid"><img v-show="this.has_mSign" src="/static/images/ic_fam_comp@2x.png" alt="">{{companyName}}</p>
            </div>
          </div>
        </div>
        <div class="pos_btn_group">
          <div class="pos_btn collect_btn" @click="can_col_pos">
            {{collect_btn}}
          </div>
          <div class="pos_btn apply_btn" :class="{is_apply: isApply}" @click="apply_pos">
            {{apply_btn}}
          </div>
        </div>
      </div>
    </div>
    <div class="company_det_bottom">
      <div class="bottom_tab">
        <div class="bottom_tab_cell" @click="tab_pos_det">
          <span :class="{active:this.tabSign}">职位详情</span>
        </div>
        <div class="bottom_tab_cell " @click="tab_pos_oth">
          <span :class="{active:!this.tabSign}">其他招聘职位({{otherPosNum}})</span>
        </div>
      </div>
      <div class="hot_post" v-show="!this.tabSign">
        <div class="content">
          <div class="ugent_cell" :data-id="item.id"  :cid="item.cid" v-for="(item,index) in this.otherPosData" :key="index" @click="to_posDetail">
            <div class="ugent_top">
              <span v-show="item.is_urgent==1" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.transalary}}</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span> | <span class="tags">{{item.education}}</span> | <span
              class="tags">{{item.nature}}</span><span class="update_time fr">{{item.update_at}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="company_msg_list" v-show="this.tabSign">
        <div class="company_msg_cell">
          <div class="content">
            <div class="cell_box">
              <div class="com_det_title msg_cell_fz">
                职位信息
              </div>
              <div class="company_contract_cell">
                <span class="label">招聘人数</span><span class="contract_msg">{{posDetData.hire_num==0?'若干':posDetData.hire_num}}人</span>
              </div>
              <div class="company_contract_cell">
                <span class="label">性别限制</span><span class="contract_msg">{{posDetData.sex==1?'男':'女'}}</span>
              </div>
              <div class="company_contract_cell">
                <span class="label">学历要求</span><span class="contract_msg">{{posDetData.education}}</span>
              </div>
              <div class="company_contract_cell">
                <span class="label">工作经验</span><span class="contract_msg">{{posDetData.work_exp}}</span>
              </div>
              <div class="company_contract_cell">
                <span class="label">持证要求</span><span class="contract_msg">{{pos_categoty}} <span v-show="pos_major!=''">-</span> {{pos_major}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="company_msg_cell">
          <div class="content">
            <div class="cell_box">
              <div class="com_det_title msg_cell_fz">
                职位描述
              </div>
              <div class="company_info" :class="{shade_info: this.shadeSign}">
                <quill-editor id="pos" style="border: none!important;" v-model="posDetData.duty || '暂无'"
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
        <div class="company_msg_cell">
          <div class="content">
            <div class="cell_box">
              <div class="com_det_title msg_cell_fz">
                职位亮点
              </div>
              <div v-show="!tags_sign" class="company_welfare">
                <p style="font-size: 12px;color: #666666;" v-show="!tags_sign">暂无</p>
              </div>
              <div v-show="tags_sign" class="company_welfare">
                <span v-for="(item,index) in posDetData.tags" :key="index">{{item}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="company_msg_cell">
          <div class="content">
            <div class="cell_box">
              <div class="com_det_title msg_cell_fz">
                工作地址
              </div>
              <div class="company_address">
                {{(this.posDetData.province || '') + (this.posDetData.city =='未知'?'': this.posDetData.city || '') + (this.posDetData.area =='未知'?'':this.posDetData.area || '') + this.posDetData.address}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-show="emptySign && !this.tabSign">
      <img src="/static/images/ic_empty_data@2x.png" alt="">
      <p>暂无数据</p>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%">
      <span>非个人用户无法进行此操作，确定前往个人登录页面？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tal_login">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,company_adv} from '../../../static/js/common.js'
  export default {
    name: "pos_det",
    data() {
      return {
        emptySign: false,
        posDetData: {},
        posOthData: {},
        has_mSign: false,
        companyName: '',
        tabSign: true,
        collect_btn: '收藏职位',
        apply_btn: '申请职位',
        otherPosData: {},
        otherPosNum: 0,
        tags_sign: true,
        pos_categoty: '',
        pos_major: '',
        id: 0,
        cid: 0,
        isCol: false,
        isApply: false,
        shadeSign: true,
        indexPos: 0,
        dialogVisible: false,
        editorOption: {
          modules:{
            toolbar: false
          },
        }
      }
    },
    methods: {
      tab_pos_det() {
        this.tabSign = true
      },
      tab_pos_oth() {
        this.tabSign = false
      },
      to_posDetail(e) {
        let id = e.currentTarget.getAttribute('data-id');
        let cid = e.currentTarget.getAttribute('cid');
        this.$router.push({name: 'pos_det',query:{id: id,cid: cid}});
        location.reload();
      },
      //收藏职位
      can_col_pos() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          if (!this.isCol) {
            this.$ajax.get('/company_collect_position',{params: {id: this.id,cid: this.cid, uid: userInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  this.$notify.success({
                    title: '提示',
                    message: '收藏成功',
                    showClose: false,
                    duration: 1500
                  });
                  this.collect_btn = '取消收藏';
                  this.isCol = true;
                }
              })
          } else {
            this.$ajax.post('/office/cancel/collection',{office_id: this.id, uid: userInfo.id})
              .then((res)=>{
                if (res.data.state != 400) {
                  this.$notify.success({
                    title: '提示',
                    message: '取消收藏成功',
                    showClose: false,
                    duration: 1500
                  });
                  this.collect_btn = '收藏简历';
                  this.isCol = false;
                }
              })
          }

        } else {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            this.dialogVisible = true;
          }else {
            this.$router.push({name: 'login'})
          }
        }
      },
      //申请职位
      apply_pos() {

        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          if (!this.isApply) {
            this.$ajax.post('/personal/applyoffice', {office_id: this.id, cid: this.cid, uid: userInfo.id})
              .then((res) => {
                if (res.data.state != 400) {
                  this.$notify.success({
                    title: '提示',
                    message: '申请成功,3天后可再次申请',
                    showClose: false,
                    duration: 1500
                  });
                  this.apply_btn = '已申请';
                  this.isApply = true;
                }else {
                  this.$notify.error({
                    title: '提示',
                    message: res.data.msg,
                    showClose: false,
                    duration: 1500
                  });
                }
              })
          }
        } else {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            this.dialogVisible = true;
          }else {
            this.$router.push({name: 'login'})
          }
        }
      },
      look_all() {
        this.shadeSign = false;
      },
      com_det(e) {
        let id = e.currentTarget.getAttribute('id');
        let cid = e.currentTarget.getAttribute('cid');
        this.$router.push({name: 'company_det',query:{id: id,cid: cid}})
      },
      tal_login() {
        this.dialogVisible = false;
        localStorage.removeItem('COMPANY');
        this.$router.push({name: 'login'})
      },
      onEditorReady(val) {
        val.enable(false);
      },
    },
    created() {
      this.id = this.$route.query.id;
      this.cid = this.$route.query.cid;
      this.$ajax.get('/office/detail', {params:{id: this.id}})
        .then((res) => {
          if (res.data.state != 400) {
            tranArea(res.data,true,1);
            tranCity(res.data,true,4);
            tranProvince(res.data,true,'');
            transEducation(res.data,1);
            transNature(res.data,1);
            transSalary(res.data,1);
            res.data.created_at = getDistanceTime(res.data.created_at);
            this.posDetData = res.data;
            this.shadeSign = this.posDetData.duty.length > 300?true:false;
            this.pos_categoty = this.posDetData.cert_type.category;
            this.pos_major = this.posDetData.cert_major.major;
            transWorkexp(res.data,1,'company');
            this.has_mSign = this.posDetData.company_info.has_m == 1?true:false;
            this.companyName = this.posDetData.company_info.name;
            if (res.data.tags == '' || res.data.tags == undefined) {
              this.tags_sign = false;
            } else {
              this.tags_sign = true;
              let tags = res.data.tags.split(','),
                tranTags = [];
              for (let i = 0,len = tags.length;i < len;i++){
                tranTags.push(company_adv(tags[i],0));
              }
              this.posDetData.tags = tranTags;
            }
          }
        });


      this.$ajax.get('/office/company', {params:{cid: this.cid}})
        .then((res) => {
          if (res.data.state != 400) {
            for (let i = 0,len = res.data.data.length;i < len;i++) {
              if (res.data.data[i].id == this.id) {
                this.indexPos = i;
              }
            }
            this.otherPosNum = res.data.data.length - 1;
            tranCity(res.data.data,true,2);
            transWorkexp(res.data.data,2);
            transEducation(res.data.data,2);
            transNature(res.data.data,2);
            transSalary(res.data.data,2);
            this.otherPosData = res.data.data;
            this.otherPosData.splice(this.indexPos,1);
            if (this.otherPosData.length == 0 || this.otherPosData.length == '') {
              this.emptySign = true;
            }else {
              this.emptySign = false;
            }
          }
        });
      let userInfo = JSON.parse(localStorage.getItem('USER'));
      //  是否收藏、申请
      if (userInfo) {
        this.$ajax.post('/personal/isapply',{uid: userInfo.id,id: this.id})
          .then((res)=>{
            if (res.data) {
              this.apply_btn = '已申请';
              this.isApply = true;
            }
          });
        this.$ajax.post('/personal/iscollect',{uid: userInfo.id,id: this.id})
          .then((res)=>{
            if (res.data) {
              this.collect_btn = '取消收藏';
              this.isCol = true;
            } else {
              this.collect_btn = '收藏简历';
              this.isCol = false;
            }
          })
      }

    }
  }
</script>

<style scoped>
  .company_det_top {
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .com_det_title {
    line-height: 44px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }

  .com_det_body {
    width: 100%;
    /*height: 90px;*/
    background-color: #fff;
  }

  /*名企列表*/

  .famous_cell {
    display: flex;
    padding: 15px 0 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }

  .famous_head {
    justify-content: start;
    margin-bottom: 15px;
    width: 60px;
    height: 60px;
    background-color: #fff;
  }

  .famous_head img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }

  .famous_msg {
    flex-grow: 1;
    padding-left: 20px;
    color: #666666;
  }

  .famous_name {
    font-size: 14px;
    font-weight: bold;
  }

  .famous_msg p {
    margin-top: 12px;
    font-size: 12px;
  }

  .famous_msg p span {
    color: #ff8236;
  }

  .pos_name {
    font-size: 14px;
    color: #666666;
  }

  .tags {
    font-size: 12px;
    color: #919199;
  }

  .company_det_bottom {
    margin-bottom: 15px;
    background-color: #ffffff;
  }

  .bottom_tab {
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }

  .bottom_tab_cell {
    width: 50%;
    line-height: 44px;
    font-size: 14px;
    color: #333333;
    text-align: center;
  }

  .bottom_tab_cell span {
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .active {
    border-bottom: 1px solid #5082E6;
  }

  .ugent_cell {
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 0;
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

  .msg_cell_fz {
    font-size: 14px;
    border: none;
  }

  .company_msg_cell {
    overflow: hidden;
  }

  .company_msg_cell .cell_box {
    padding-bottom: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }

  /*风采*/
  .company_mien {
    width: 300%;

  }

  .mien_cell {
    width: 28%;
    margin-right: 15px;
    text-align: center;
  }

  .mien_cell img {
    width: 100%;
    height: 104px;
  }

  .mien_cell p {
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
  .company_info p {
    text-indent: 2em;
    font-size: 12px;
    color: #666666;
    line-height: 24px;
  }

  .shade {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    /*background: -moz-linear-gradient(to bottom,rgba(255,255,255,0), rgba(255, 54, 205,1));*/
    background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255));
    background: -o-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255));
    background: -moz-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255));
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255));
  }

  .show_all {
    text-align: center;
    font-size: 14px;
    color: #919199;
    line-height: 32px;
  }

  /*福利*/
  .company_welfare {
    display: flex;
    /*justify-content: center;*/
    flex-wrap: wrap;
  }

  .company_welfare span {
    margin-bottom: 5px;
    margin-right: 10px;
    text-align: center;
    padding: 5px 7px;
    font-size: 12px;
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
  .company_address {
    font-size: 12px;
    color: #666666;
  }

  /*按钮*/
  .pos_btn_group {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
  }

  .pos_btn {
    width: 30%;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }

  .collect_btn {
    margin-right: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    color: #919199;
  }
  .apply_btn {
    background-color: #ff8236;
    color: #ffffff;
  }
  .is_apply{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    background-color: #ffffff;
    color: #919199;
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
  #pos .ql-toolbar{
    display: none!important;
  }
  .empty{
    padding-top: 285px;
  }
</style>
