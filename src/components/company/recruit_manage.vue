<template>
  <!--招聘管理-->
    <div class="recruit_manage">
      <div class="com_det_title">
        <div class="content">
          招聘管理
        </div>
      </div>
      <!--列表链接-->
      <div class="opera_list">
        <div class="content">
          <div class="opera_list_box">
            <router-link :to="{name: 'recruit_set'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_seeting@2x.png" alt="">
              <p>招聘设置</p>
            </router-link>
            <router-link :to="{name: 'release_office'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_post@2x.png" alt="">
              <p>发布职位</p>
            </router-link>
            <router-link :to="{name: 'pos_manage'}" class="opera_list_cell">
              <img src="/static/images/ic_cm_mannage@2x.png" alt="">
              <p>职位管理</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'app'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_resume@2x.png" alt="">
              <p>应聘简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'buy'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_buyres@2x.png" alt="">
              <p>购买的简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'collect'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_collection@2x.png" alt="">
              <p>收藏简历</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'invite'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_ms@2x.png" alt="">
              <p>面试邀请</p>
            </router-link>
            <router-link :to="{name: 'enterp_com_resume',query: {orign: 'collected'}}" class="opera_list_cell">
              <img src="/static/images/ic_cm_colme@2x.png" alt="">
              <p>收藏过我</p>
            </router-link>
          </div>
        </div>
      </div>
      <!--数据统计-->
      <div class="data_count">
        <div class="content">
          <p class="count_title">数据统计</p>
          <div class="data_cell">
            <span class="data_cell_label">发布的职位</span><span class="fr"><span class="data_num">{{countData.release_offices_total || 0}}</span>个</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">发出的面试邀请</span><span class="fr"><span class="data_num">{{countData.interviews_total || 0}}</span>次</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">下载简历</span><span class="fr"><span class="data_num">{{countData.download_resumes_total || 0}}</span>份</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">收藏简历</span><span class="fr"><span class="data_num">{{countData.collect_resumes_total || 0}}</span>份</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">职位浏览量</span><span class="fr"><span class="data_num">{{countData.offices_view_total || 0}}</span>次</span>
          </div>
          <div class="data_cell">
            <span class="data_cell_label">职位被收藏</span><span class="fr"><span class="data_num">{{countData.offices_collect_total || 0}}</span>次</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "recruit_manage",
      data() {
          return {
            countData: {},
          }
        },
      created() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.get('/company/data-count',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (res.data.state != 400) {
                this.countData = res.data;
              }
              this.$indicator.close();
            })
      }
    }
</script>

<style scoped>
  /*列表链接*/
  .opera_list{
    clear: both;
    width: 100%;
    background-color: #ffffff;
  }
  .opera_list_box{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .opera_list_cell{
    text-decoration: none;
    padding-top: 25px;
    text-align: center;
    width: 25%;
    height: 85px;
  }
  .opera_list_cell img{
    width: 44px;
    height: 44px;
  }
  .opera_list_cell p{
    font-size: 12px;
    color: #666;
  }
  /*数据统计*/
  .data_count{
    background-color: #ffffff;
    padding: 15px 0;
  }
  .count_title{
    font-size: 14px;
    color: #919199;
    font-weight: bold;
  }
  .data_cell{
    margin-top: 10px;
    padding: 0 10px;
    line-height: 60px;
    background-color: #f9f9f9;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    font-size: 14px;
    color: #919199;
  }
  .data_cell_label{
    color: #666666;
    font-weight: bold;
  }
  .data_num{
    margin-right: 5px;
    font-size: 18px;
    color: #5082e6;
    line-height: 24px;
  }
</style>
