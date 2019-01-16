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
        <div class="ugent_cell" v-for="(item,index) in del_colData" :key="index">
          <div class="ugent_top">
            <span v-if="item.is_urgent" class="ugent_sign">急聘</span><span class="pos_name">{{item.office_name}}</span><span class="salary fr">{{item.salary}}</span>
          </div>
          <div class="ugent_bottom">
            <span class="tags">{{item.city}}</span> | <span class="tags">{{item.work_exp}}</span> | <span class="tags">{{item.education}}</span> | <span
            class="tags">{{item.nature}}</span><span class="update_time fr">{{item.created_at}}</span>
            <p><img v-if="item.has_m" src="/static/images/ic_fam_comp@2x.png" alt="">{{item.company_name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tal_del_col",
      data() {
          return {
            titleMsg: '简历投递记录',
            del_colData: {}
          }
      },
      created() {
        //判断路由显示不同内容
        this.$ajax.get('/company_work',this.find_jobParam)
          .then((res)=>{
            if (res.data.code == 200) {
              this.del_colData = res.data.data
            }
          })
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
