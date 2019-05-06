<template>
    <!--就业指导-->
  <div class="guidance">
    <div class="com_det_title">
      <div class="content">
        就业指导
      </div>
    </div>
    <!--分类列表-->
    <div class="classify bacf">
      <div class="classify_det" :style="com_style">
        <v-touch v-on:swipeleft="leftChangeImg" height="44px" v-on:swiperight="rightChangeImg">
          <span v-for="(item,index) in List" :key="index" :class="{active: act == item.id}" @click="operat" :id-sign="item.id">{{item.column_name}}</span>
        </v-touch>
      </div>
    </div>
    <!--分类单元-->
    <div class="content">

    </div>
    <div class="contact bacf" v-for="(item,index) in List" :key="index" v-show="act == item.id">
      <div class="content">
        <div class="second" v-for="(det) in item.articles">
          <div class="news_total_cell" :news-id="det.id" @click="news_total_det">
            <div class="news_total_cell_title">
              <!--暂时没有判断没有图片的情况-->
              <img v-show="true" :src="det.frontcover" alt="">
              <p>{{det.title}}<br>
                <span>{{det.describe}}</span>
              </p>

            </div>
            <div class="news_total_cell_tip">
              <span>{{item.updated_at}}</span>阅读<span>({{det.visit}})</span>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-show="act == item.id && item.articles.length == 0">
        <img src="/static/images/ic_empty_data@2x.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {splicFrontcover,getDistanceTime} from '../../../static/js/common.js'
    export default {
        name: "guidance",
      data() {
        return{
          act: 3,
          editorOption: {
            modules:{
              toolbar: false
            },
          },
          List: [],
          guideData: {},
          com_style:{marginLeft: 0},
          screenW: 0,
          indexMien: 0,
          guideLength: 0,
          emptySign: true
        }
      },
      methods: {
        onEditorReady(val) {
          val.enable(false);
        },
        operat(e){
          let sign = e.currentTarget.getAttribute('id-sign');
          this.act = sign;
        },
        leftChangeImg(e) {
          e.preventDefault();
          // 60 一个span单元宽度
          if(this.screenW < (this.guideLength - this.indexMien)*60 ) {
            // 向左滑
            this.indexMien++;
            this.com_style.marginLeft = -(60 * this.indexMien + 10) + 'px';
          }
        },
        rightChangeImg(e){
          e.preventDefault();
          if (this.indexMien > 0) {
            this.indexMien--;
            this.com_style.marginLeft = -(60 * this.indexMien - 10) + 'px';
          }
        },
        news_total_det(e) {
          let id = e.currentTarget.getAttribute('news-id');
          this.$router.push({name: 'news_info',query:{id: id}});
        },
      },
      created() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        //获取屏幕高度
        this.screenW = document.documentElement.clientWidth || document.body.clientWidth;
        this.$ajax.get('/news/employment-guidance')
          .then((res)=>{
            for (let i = 0,len = res.data.length;i < len;i++) {
              res.data[i].updated_at = res.data[i].updated_at == 0?res.data[i].created_at:res.data[i].updated_at;
              res.data[i].updated_at = getDistanceTime(res.data[i].updated_at);
              if (res.data[i].articles.length != 0){
                splicFrontcover(res.data[i].articles);
              }
            }
            this.List = res.data;
            this.guideLength = res.data.length; // 两个静态
            this.$indicator.close();
          })
      }
    }
</script>

<style scoped>
  /* 分类列表 */
  .classify{
    display: flex;
    line-height: 44px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .classify span{
    padding: 0 7px;
    font-size: 12px;
    color: #666666;
    word-break: keep-all;
  }
  .classify .active{
    color: #5082e6;
  }
  .intro p{
    font-size: 14px;
    color: #353535;
    text-indent: 2em;
  }
  /* 背景白色 */
  .bacf{
    background-color: #ffffff;
  }
  .classify_det{
    -webkit-transition: ease .5s;
    -moz-transition: ease .5s;
    -ms-transition: ease .5s;
    -o-transition: ease .5s;
    transition: ease .5s;
  }
  .news_total_cell{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .news_total_cell_title{
    display: flex;
  }
  .news_total_cell_title p{
    flex-grow: 1;
    margin-top: 15px;
    font-size: 14px;
    color: #353535;
    line-height: 22px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .news_total_cell_title p span{
    color: #666666;
    font-weight: normal;
  }
  .news_total_cell_title img{
    margin-right: 15px;
    margin-bottom: 10px;
    width: 88px;
    height: 45px;
    vertical-align: middle;
  }
  .news_total_cell_tip{
    padding-bottom: 15px;
    font-size: 12px;
    color: #919199;
  }
  .news_total_cell_tip span{
    margin-right: 20px;
  }
</style>
