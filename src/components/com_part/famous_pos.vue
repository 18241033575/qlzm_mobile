<template>
      <!--名企招聘-->
    <div class="famous_pos">
      <div class="famous">
        <div class="famous_pos_title">
          <div class="content">
            名企招聘
          </div>
        </div>
        <div class="famous_body" >
          <div class="content">
            <div class="load" id="famouse">
              <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomDropText="加载中" ref="loadmore" >
                <div class="famous_cell" :cid="item.cid" :company-id="item.id" v-for="(item,index) in famData" :key="index" @click="to_comDetail">
                  <div class="famous_head fl">
                    <img :src="item.logo" alt="">
                  </div>
                  <div class="famous_msg fl">
                    <div class="famous_name">
                      {{item.name}}
                    </div>
                    <p>招聘职位<span>&nbsp;&nbsp;{{item.offices.length}}个</span></p>
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
      <!-- 空 -->
      <div class="empty" v-show="emptySign">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
</template>

<script>
  import {splicLogo} from '../../../static/js/common.js'
    export default {
        name: "famous_pos",
      data() {
          return {
            famData: {},
            pages: 1,
            rows: 6,
            allLoaded: true,
            req_state: false,
            screenH: 0,
            emptySign: false,
          }
      },
      methods: {
        to_comDetail(e) {
          let cid = e.currentTarget.getAttribute('cid');
          let id = e.currentTarget.getAttribute('company-cid');
          this.$router.push({name: 'company_det',query:{cid: cid,id: id}});
        },
        loadBottom() {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.pages += 1;
          this.$ajax.get('/company/famous',{params:{page: this.pages, rows: this.rows}})
            .then((res)=>{
              if (res.data != '') {
                this.req_state = false;
                splicLogo(res.data);
                this.famData.push.apply(this.famData,res.data);
                this.$refs.loadmore.onBottomLoaded();
              }else {
                this.req_state = true;
              }
              this.allLoaded = true;
              this.$indicator.close();
            })
        },
        handleScroll () {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let ch = document.querySelector('#famouse').clientHeight;
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
        let h = document.documentElement.clientHeight || document.body.clientHeight;
        // 90搜索栏高度
        this.screenH = h + 65;
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$ajax.get('/company/famous',{params:{page: this.pages, rows: this.rows}})
          .then((res)=>{
            if(res.data.state != 400) {
              if (res.data != ''){
                splicLogo(res.data);
                this.famData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            }
            this.$indicator.close();
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
  /*名企招聘*/
  .famous_pos{
    background-color: #f0f1f5;
  }
  .famous_pos_title{
    width: 100%;
    line-height: 44px;
    margin-bottom: 15px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
    background-color: #ffffff;
  }
  .famous{
    margin-top: 0;
    background-color: #f0f1f5;
  }
  .famous_body{
    background-color: #ffffff;
  }
  .famous_cell{
    display: flex;
    padding: 15px 0;
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
  }
  .famous_msg p span{
    color: #ff8236;
  }
</style>
