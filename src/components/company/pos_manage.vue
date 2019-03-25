<template>
  <!--职位管理-->
    <div class="pos_manage">
      <div class="com_det_title">
        <div class="content">
          职位管理
        </div>
      </div>
      <div class="resume_list">
        <div class="resume_list_cell" v-for="(item,index) in this.manageData" :key="index">
          <div class="content">
            <p class="tal_name"><span>{{item.office_name}}</span><img :id="item.id" :cid="item.cid" @click="pos_opera" class="fr" src="/static/images/ic_cm_more@2x.png" alt=""></p>
            <p class="tal_det"><span v-if="item.is_urgent == 1" class="s_sign ugent">急聘</span><span v-show="item.is_release == 0" class="s_sign unrelease">未发布</span><span v-show="item.is_release == 1" class="s_sign releaseing">发布中</span><span v-if="item.is_auto == 1" class="s_sign auto">自动</span><span>{{item.up_time}}</span><span>|</span><span>{{item.user_apply.length}}人投递</span></p>
            <p class="tal_det"><span class="hope_salary">{{item.transalary}}</span><span>{{item.city}}</span><span>|</span><span>{{item.work_exp}}</span><span>|</span><span>{{item.education}}</span><span>|</span><span>{{item.nature==1?'项目':'全职'}}</span></p>
          </div>
        </div>
      </div>
      <!--职位管理操作弹层-->
      <div class="pos_opera_box" @click="cancel_opera" v-show="this.opera_state">
        <div class="opera_list">
          <div class="content">
            <div class="opera_cell" v-show="!isrelease" @click="release_off">
              发布
            </div>
            <div class="opera_cell" v-show="!isrelease" @click="edit_off">
              编辑
            </div>
            <div class="opera_cell pos_del" v-show="!isrelease" @click="del_off">
              删除
            </div>
            <div class="opera_cell" v-show="isrelease" @click="unrelease">
              撤回
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-show="emptySign">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tranCity} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,splicLogo,splicFrontcover} from '../../../static/js/common.js'
    export default {
        name: "pos_manage",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          opera_state: false,
          emptySign: false,
          isrelease: true,
          id: 0,
          cid: 0,
          manageData: {},
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
        pos_opera(e) {
          this.id = e.currentTarget.getAttribute('id');
          this.cid = e.currentTarget.getAttribute('cid');
          for (let i = 0,len = this.manageData.length; i < len;i++) {
            if (this.manageData[i].id == this.id) {
              this.isrelease = this.manageData[i].is_release == 0?false:true;
            }
          }
          this.opera_state = true;
        },
        cancel_opera() {
          this.opera_state = false;
        },
        // 撤回
        unrelease() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/office/revoked-release',{id: this.id,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state ==200) {
                for (let i = 0,len = this.manageData.length; i < len;i++) {
                  if (this.manageData[i].id == this.id) {
                    this.manageData[i].is_release = 0;
                  }
                }
                this.$message({
                  message: '撤回成功',
                  type: 'success'
                });
              }
            })
        },
        // 发布
        release_off() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/office/release',{id: this.id,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state ==200) {
                for (let i = 0,len = this.manageData.length; i < len;i++) {
                  if (this.manageData[i].id == this.id) {
                    this.manageData[i].is_release = 1;
                  }
                }
                this.$message({
                  message: '发布成功',
                  type: 'success'
                });
              }
            })
        },
        // 删除
        del_off() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/office/delete',{id: this.id,cid: companyInfo.id})
            .then((res)=>{
              if (res.data.state ==200) {
                for (let i = 0,len = this.manageData.length; i < len;i++) {
                  if (this.manageData[i].id == this.id) {
                    // 删除相应数组
                    this.manageData.splice(i,1);
                  }
                }
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
            })
        },
        // 编辑
        edit_off() {
          this.$router.push({name: 'release_office',query: {id: this.id,cid: this.cid}});
        }
      },
      created() {
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/office/management',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data) {
                tranCity(res.data,true,2);
                transWorkexp(res.data,0);
                transEducation(res.data,0);
                transSalary(res.data,2);
                for (let i = 0,len = res.data.length;i < len;i++) {
                  res.data[i].up_time = getDistanceTime(res.data[i],2)
                }
                this.manageData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            })
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
  .tal_det .s_sign{
    padding: 3px 4px;
    line-height: 16px;
  }
  .tal_det .ugent{
    color: #ff8236;
    border: 1px solid #FF8236;
  }
  .tal_det .unrelease{
    color: #919199;
    border: 1px solid #919199;
  }
  .tal_det .releaseing{
    color: #5082E6;
    border: 1px solid #5082E6;
  }
  .tal_det .auto{
    color: #49B779;
    border: 1px solid #49B779;
  }
  .tal_det span{
    margin-right: 10px;
  }
  .hope_salary{
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
