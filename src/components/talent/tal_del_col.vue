<template>
    <!--投递记录、收藏职位-->
  <div class="del_col" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <div class="com_det_title">
      <div class="content">
        {{titleMsg}}
      </div>
    </div>
    <div class="del_col_body">
      <div class="content">
        <div class="ugent_cell" :data-id="item.id"  :cid="item.cid" v-for="(item,index) in del_colData" :key="index" @click="to_posDetail">
          <div class="ugent_top">
            <span v-if="item.office.is_urgent" class="ugent_sign">急聘</span><span class="pos_name">{{item.office.office_name}}</span><span class="salary fr">{{item.office.salary}}</span>
          </div>
          <div class="ugent_bottom">
            <span class="tags">{{item.office.city}}</span> | <span class="tags">{{item.office.work_exp}}</span> | <span class="tags">{{item.office.education}}</span> | <span
            class="tags">{{item.office.nature}}</span><span class="update_time fr">{{item.created_at}}</span>
            <p><img v-if="item.office.has_m" src="/static/images/ic_fam_comp@2x.png" alt="">{{item.company.name}}</p>
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
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,splicLogo,splicFrontcover} from '../../../static/js/common.js'
    export default {
        name: "tal_del_col",components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            titleMsg: '简历投递记录',
            del_colData: {}
          }
      },
      created() {
        //判断路由显示不同内容    /personal/apply
        let type = this.$route.query.orig;
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        //1、投递  2、收藏
        if (type == 1) {
          this.titleMsg = '简历投递记录';
          this.$ajax.get('/personal/apply',{params:{uid: userInfo.id}})
            .then((res)=>{
              if(res.data.state != 400) {
                transWorkexp(res.data,2);
                transNature(res.data,2);
                transEducation(res.data,2);
                transSalary(res.data,2);
                this.del_colData = res.data
              }
            })
        }else {
          this.titleMsg = '收藏的简历';
          this.$ajax.get('/personal/collection',{params:{uid: userInfo.id}})
            .then((res)=>{
              if(res.data.state != 400) {
                transWorkexp(res.data,2);
                transNature(res.data,2);
                transEducation(res.data,2);
                getDistanceTime(res.data);
                transSalary(res.data,2);
                this.del_colData = res.data
              }
            })
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
        to_posDetail(e) {
          let id = e.currentTarget.getAttribute('data-id');
          let cid = e.currentTarget.getAttribute('cid');
          this.$router.push({name: 'pos_det',query:{id: id,cid: cid}})
        },
      }
    }
</script>

<style scoped>
  .del_col_body{
    margin-top: 10px;
    background-color: #ffffff;
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
</style>
