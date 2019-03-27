<template>
    <!--投递记录、收藏职位-->
  <div class="del_col">
    <div class="com_det_title">
      <div class="content">
        {{titleMsg}}
      </div>
    </div>
    <div class="del_col_body">
      <div class="content">
        <div class="ugent_cell" :data-id="item.office.id"  :cid="item.cid" v-for="(item,index) in del_colData" :key="index" @click="to_posDetail">
          <div class="ugent_top">
            <span v-if="item.office.is_urgent" class="ugent_sign">急聘</span><span class="pos_name">{{item.office.office_name}}</span><span class="salary fr">{{item.office.salary}}</span>
          </div>
          <div class="ugent_bottom">
            <span class="tags">{{item.office.city}}</span> | <span class="tags">{{item.office.work_exp}}</span> | <span class="tags">{{item.office.education}}</span> | <span
            class="tags">{{item.office.nature}}</span><span class="update_time fr">{{item.office.up_time}}</span>
            <p><img v-if="item.office.has_m" src="/static/images/ic_fam_comp@2x.png" alt="">{{item.company.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-show="emptySign">
      <img src="/static/images/ic_empty_data@2x.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transSalary,getDistanceTime,transNature,transEducation,transWorkexp,splicLogo,splicFrontcover} from '../../../static/js/common.js'
    export default {
      name: "tal_del_col",
      data() {
          return {
            emptySign: false,
            titleMsg: '简历投递记录',
            del_colData: {},
          }
      },
      methods: {
        to_posDetail(e) {
          let id = e.currentTarget.getAttribute('data-id');
          let cid = e.currentTarget.getAttribute('cid');
          this.$router.push({name: 'pos_det',query:{id: id,cid: cid}})
        },
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
              if (res.data.length) {
                tranCity(res.data,true,2,'office');
                transWorkexp(res.data,2);
                transNature(res.data,2,'office');
                transEducation(res.data,2);
                transSalary(res.data,2,'office');
                for (let i = 0,len = res.data.length;i < len;i++) {
                  res.data[i].office.up_time = getDistanceTime(res.data[i],2,'office')
                }
                this.del_colData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            })
        }else {
          this.titleMsg = '收藏的职位';
          this.$ajax.get('/personal/collection',{params:{uid: userInfo.id}})
            .then((res)=>{
              if (res.data.length) {
                tranCity(res.data,true,2,'office');
                transWorkexp(res.data,2);
                transNature(res.data,2,'office');
                transEducation(res.data,2);
                getDistanceTime(res.data);
                transSalary(res.data,2,'office');
                for (let i = 0,len = res.data.length;i < len;i++) {
                  res.data[i].office.up_time = getDistanceTime(res.data[i],2,'office')
                }
                this.del_colData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            })
        }
      },
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
    color: #919199;
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
  }

  .update_time {
    font-size: 12px;
    color: #919199;
  }
</style>
