<template>
  <div class="pos_det" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
              <span class="ugent_sign" v-show="this.posDetData.is_urgent == 1">急聘</span><span class="pos_name">{{this.posDetData.office_name}}</span><span class="salary fr">{{this.posDetData.salary}}</span>
            </div>
            <div class="ugent_bottom">
              <span class="tags">{{posDetData.city}}</span> | <span class="tags">{{posDetData.work_exp}}</span> | <span class="tags">{{posDetData.hire_num==0?'若干':posDetData.hire_num}}人</span> | <span class="tags">{{posDetData.education}}</span> | <span
              class="tags">{{posDetData.nature}}</span><span class="update_time fr">{{posDetData.created_at}}</span>
              <p><img v-show="this.has_mSign" src="/static/images/ic_fam_comp@2x.png" alt="">{{companyName}}</p>
            </div>
          </div>
        </div>
        <div class="pos_btn_group">
          <div class="pos_btn collect_btn" @click="can_col_pos">
            {{collect_btn}}
          </div>
          <div class="pos_btn apply_btn" @click="apply_pos">
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
              <span v-show="item.is_urgent==1" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
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
                <span class="label">持证要求</span><span class="contract_msg">{{pos_categoty + '-' + pos_major}}</span>
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
              <div class="company_info">
                <p>
                  {{posDetData.duty}}
                </p>
                <div class="shade"></div>
              </div>
              <!--思路：开始固定高度，超出隐藏。点击后自动高度-->
              <div class="show_all">查看全部</div>
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
                <p v-show="!tags_sign">暂无</p>
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
                {{this.posDetData.province + this.posDetData.city + this.posDetData.area + this.posDetData.address}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,company_adv} from '../../../static/js/common.js'
  export default {
    name: "pos_det",
    components: {
      main_menu,
      menu_list_pic
    },
    data() {
      return {
        /*总菜单状态*/
        openState: false,
        posDetData: {},
        posOthData: {},
        has_mSign: false,
        companyName: '',
        tabSign: true,
        collect_btn: '收藏职位',
        apply_btn: '申请职位',
        otherPosData: [],
        otherPosNum: 0,
        tags_sign: true,
        pos_categoty: '',
        pos_major: '',
        isCol: false,
        isApply: false
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
        location.reload()
      },
      //收藏职位
      can_col_pos() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          if (!this.isCol) {
            this.$ajax.get('/company_collect_position',{params: {id: 111,cid: 36, uid: userInfo.id}})
              .then((res)=>{
                console.log(res);
                this.collect_btn = '取消收藏';
                this.isCol = true
              })
          } else {
            this.$ajax.post('/office/cancel/collection',{params:{office_id: 111, uid: userInfo.id}})
              .then((res)=>{
                console.log(res);
                this.collect_btn = '收藏简历';
                this.isCol = false
              })
          }

        } else {
          this.$router.push({name: 'index'})
        }
      },
      //申请职位
      apply_pos() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          if (!this.isApply) {
            this.$ajax.post('/personal/applyoffice', {office_id: 111, cid: 36, uid: userInfo.id})
              .then((res) => {
                console.log(res);
                this.apply_btn = '已申请';
                this.isApply = true
              //
              })
          }
        }
      },
    },
    created() {
      let id = this.$route.query.id;
      this.$ajax.get('/office/detail', {params:{id: id}})
        .then((res) => {
          if (res.data.state != 400) {
            console.log(res.data);
            if (res.data.tags == '') {
              this.tags_sign = false;
            } else {
              this.tags_sign = true;
              res.data.tags = company_adv(res.data.tags,true);
            }
            tranArea(res.data,true,1);
            tranCity(res.data,true,1);
            tranProvince(res.data,true);
            transEducation(res.data,1);
            transNature(res.data,1);
            transSalary(res.data,1);
            res.data.created_at = getDistanceTime(res.data.created_at);
            this.posDetData = res.data;
            this.pos_categoty = this.posDetData.cert_type.category;
            this.pos_categoty = this.posDetData.cert_major.major;
            transWorkexp(res.data,1,'company');
            this.has_mSign = this.posDetData.company_info.has_m == 1?true:false;
            this.companyName = this.posDetData.company_info.name
          }
        });

      let cid = this.$route.query.cid;
      this.$ajax.get('/office/company', {params:{cid: cid}})
        .then((res) => {
          if (res.data.state != 400) {
            this.otherPosNum = res.data.data.length - 1;
            for (let i = 0;i < res.data.data.length; i++) {
              console.log(res.data.data[i].id,id);
              /*if (res.data.data[i].id != id) {
                this.otherPosData[i] = res.data.data[i]
              }*/
            }
            // tranCity(this.otherPosData,true,2);
          }
        });
      let userInfo = JSON.parse(localStorage.getItem('USER'));
      //  是否收藏、申请
      if (userInfo) {
        this.$ajax.post('/personal/isapply',{params: {uid: userInfo.id}})
          .then((res)=>{
            console.log(res);
          });
        this.$ajax.post('/personal/iscollect',{params: {uid: userInfo.id}})
          .then((res)=>{
            console.log(res);
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
  .company_info {
    position: relative;
    height: 130px;
    overflow: hidden;
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
</style>
