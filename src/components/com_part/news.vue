<template>
    <!--政策资讯-->
  <div class="news_total">
    <div class="com_det_title">
      <div class="content">
        政策资讯
      </div>
    </div>
    <div class="news_total_list">
      <div class="content">
        <div class="load" id="news">
          <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomDropText="加载中" ref="loadmore" >
            <div class="news_total_cell" :news-id="item.id" v-for="(item,index) in newsData" :key="index" @click="news_total_det">
              <div class="news_total_cell_title">
                <!--暂时没有判断没有图片的情况-->
                <span>{{item.title}}</span><img v-show="true" :src="item.frontcover" alt="">
              </div>
              <div class="news_total_cell_tip">
                <span>{{item.publish_at}}</span>阅读<span>({{item.visit}})</span>
              </div>
            </div>
            <div class="bottom_line" v-show="req_state">
              我也是有底线的
            </div>
          </mt-loadmore>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {splicFrontcover,getDistanceTime} from '../../../static/js/common.js'
    export default {
      name: "news",
      data() {
          return {
            newsData: {},
            pages: 1,
            allLoaded: true,
            req_state: false,
            screenH: 0,
          }
      },
      methods: {
        news_total_det(e) {
          let id = e.currentTarget.getAttribute('news-id');
          this.$router.push({name: 'news_info',query:{id: id}});
        },
        loadBottom() {
          this.pages += 1;
          this.$ajax.post('/news',{page: this.pages,operate: 'news',limit: 10})
            .then((res)=>{
              if (res.data.code != 400) {
                this.req_state = false;
                splicFrontcover(res.data.data,2);
                this.newsData.push.apply(this.newsData,res.data.data);
                this.$refs.loadmore.onBottomLoaded();
              }else {
                this.req_state = true;
              }
              this.allLoaded = true;
            });
        },
        handleScroll () {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let ch = document.querySelector('#news').clientHeight;
          if (this.allLoaded && !this.req_state) {
            if (scrollTop > (ch - this.screenH)) {
              this.allLoaded = false;
            }else{
              this.allLoaded = true;
            }
          }
        },
      },
      created() {
        //获取屏幕高度
        let h = document.documentElement.clientHeight || document.body.clientHeight;
        // 90搜索栏高度
        this.screenH = h - 45;
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
          this.$ajax.post('/news',{page: 1,operate: 'news',limit: 10})
            .then((res)=>{
              if (res.data.code == 200) {
                splicFrontcover(res.data.data,2);
                for (let i = 0,len = res.data.data.length;i < len;i++) {
                  res.data.data[i].publish_at = getDistanceTime(res.data.data[i].publish_at);
                }
                this.newsData = res.data.data;
                this.$indicator.close();
              }
            })
      },
      mounted() {
        document.addEventListener('scroll', this.handleScroll)
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      },
    }
</script>

<style scoped>
  .news_total_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .news_total_cell{
    /*line-height: 90px;*/
    height: 90px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .news_total_cell_title{
    display: flex;
  }
  .news_total_cell_title span{
    flex-grow: 1;
    margin-top: 15px;
    font-size: 14px;
    color: #353535;
    line-height: 22px;
    font-weight: bold;
  }
  .news_total_cell_title img{
    margin-top: 15px;
    width: 88px;
    height: 45px;
    vertical-align: middle;
  }
  .news_total_cell_tip{
    font-size: 12px;
    color: #919199;
  }
  .news_total_cell_tip span{
    margin-right: 20px;
  }

</style>
