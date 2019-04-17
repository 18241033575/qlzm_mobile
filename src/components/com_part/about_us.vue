<template>
  <!--关于我们-->
    <div class="about_us">
      <div class="com_det_title">
        <div class="content">
          关于我们
        </div>
      </div>
      <!--分类列表-->
      <div class="classify bacf">
        <div class="classify_det" :style="com_style">
          <v-touch v-on:swipeleft="leftChangeImg" height="44px" v-on:swiperight="rightChangeImg">
            <span v-for="(item,index) in List" :key="index" :class="{active: act == item.id}" @click="operat" :id-sign="item.id">{{item.column_name}}</span><span @click="operat" :class="{active: act == 1000}" id-sign="1000">用户指南</span><span @click="operat" :class="{active: act == 1001}" id-sign="1001">意见反馈</span>
          </v-touch>
        </div>
      </div>
      <!--分类单元-->
      <div class="contact bacf" v-for="(item,index) in List" :key="index" v-show="act == item.id">
        <div class="second" v-for="(det) in item.articles">
          <quill-editor  v-model="det.content"
                        @ready="onEditorReady($event)"
                        :options ="editorOption">
          </quill-editor>
        </div>
      </div>
      <div class="contact bacf" v-show="act == 1000">
        <div class="second" v-for="(item,index) in guideData" :key="index">
          <div class="third" v-for="(det) in item.articles">
            <quill-editor  v-model="det.content"
                           @ready="onEditorReady($event)"
                           :options ="editorOption">
            </quill-editor>
          </div>
        </div>
      </div>
      <div class="contact bacf"  v-show="act == 1001">
        <div class="second" >
          <quill-editor
                        @ready="onEditorReady($event)"
                        :options ="editorOption">
          </quill-editor>
          <!--v-model="act"-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "about_us",
      data() {
          return{
            act: 70,
            editorOption: {
              modules:{
                toolbar: false
              },
            },
            List: [],
            guideData: {},
            com_style:{marginLeft: 0}

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
          // console.log(e);
          e.preventDefault();
          this.com_style.marginLeft = -e.distance + 'px';
        },
        rightChangeImg(e){
          e.preventDefault();
          this.com_style.marginLeft = e.distance + 'px';
        }
      },
      created() {
          this.$ajax.get('/news/about-us')
            .then((res)=>{
              this.List = res.data;
            });
          this.$ajax.get('/news/user-guides')
            .then((res)=>{
              this.guideData = res.data;
            });
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
    margin-left: 15px;
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
</style>
