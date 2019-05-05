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
          <div class="advice">
            <div class="content">
              <p>尊敬的用户你好，请将你的意见、建议、或投诉内容告诉我们，以帮助我们为全体用户提供更加优质的服务，我们将在第一时间及时回复您的反馈，如你有较为紧急的问题，请致电客服热线：{{hotPhone}}，我们将竭诚为你服务！</p>
              <p>反馈内容:</p>
              <textarea name="advice" v-model="adv_msg" placeholder="请留下您的宝贵意见或建议，您的支持就是我们前进的动力！"></textarea>
              <div class="adv_type">
                <span  @click="choose_type" id="advice" :class="{active: adv_type=='advice'}">建议</span><span  @click="choose_type" id="option" :class="{active: adv_type=='option'}">意见</span><span  @click="choose_type" id="help" :class="{active: adv_type=='help'}">求助</span><span  @click="choose_type" id="complaint" :class="{active: adv_type=='complaint'}">投诉</span>
              </div>
              <div class="communicat_way">
                联系方式:<input type="text" v-model="com_way" placeholder="电话/QQ/邮箱">
              </div>
              <div class="sub_btn" @click="sub_adv">
                提交反馈
              </div>
            </div>
          </div>
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
            com_style:{marginLeft: 0},
            screenW: 0,
            indexMien: 0,
            guideLength: 0,
            adv_type: 'advice',
            adv_msg: '',
            com_way: '',
            hotPhone: '',
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
        choose_type(e){
          this.adv_type = e.target.getAttribute('id');
        },
        sub_adv(){
          this.adv_msg = this.adv_msg.replace(/^\s*|\s*$/g,"");
          if (this.adv_msg == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写意见或建议',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.com_way = this.com_way.replace(/^\s*|\s*$/g,"");
          if (this.com_way == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写联系方式',
              showClose: false,
              duration: 1500
            });
            return
          }
          let advType = 1;
          switch (this.adv_type){
            case 'advice':
              advType = 1;
              break;
            case 'option':
              advType = 2;
              break;
            case 'help':
              advType = 3;
              break;
            case 'complaint':
              advType = 4;
              break;
          }
          this.$ajax.post('/advice/add',{advice: this.adv_msg,contact: this.com_way,type: advType})
            .then((res)=>{
              if (res.data.state == 200){
                this.$notify.success({
                  title: '提示',
                  message: '反馈成功',
                  showClose: false,
                  duration: 1500
                });
                this.adv_msg = '';
                this.com_way = '';
              } else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        }
      },
      created() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        //获取屏幕高度
        this.screenW = document.documentElement.clientWidth || document.body.clientWidth;
        let basset = JSON.parse(localStorage.getItem('BASSET'));
        basset.forEach((item)=>{
          if(item.key == 'cfg_phone400'){
            this.hotPhone = item.value;
          }
        });
        this.$ajax.get('/news/about-us')
            .then((res)=>{
              this.List = res.data;
              this.guideLength = res.data.length +2; // 两个静态
            });
          this.$ajax.get('/news/user-guides')
            .then((res)=>{
              this.guideData = res.data;
              this.$indicator.close();
            });
      }
    }
</script>

<style scoped>
  html ol{
    list-style-type: none;
  }
  /* 分类列表 */
  .classify{
    display: flex;
    line-height: 44px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .classify_det{
    -webkit-transition: ease .5s;
    -moz-transition: ease .5s;
    -ms-transition: ease .5s;
    -o-transition: ease .5s;
    transition: ease .5s;
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
  .advice{
    padding: 20px 0;
  }
  .advice p{
    margin-bottom: 5px;
    text-indent: 2em;
    font-size: 14px;
    color: #666666;
  }
  .advice textarea{
    padding: 10px 0 0 15px;
    width: 95%;
    height: 100px;
  }
  .advice textarea::placeholder{
    font-size: 12px;
    color: #919191;
  }
  .adv_type{
    margin-top: 10px;
  }
  .adv_type span{
    display: inline-block;
    margin-left: 20px;
    margin-top: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #e1e4e6;
    text-align: center;
    font-size: 14px;
  }
  .adv_type .active{
    color: #ff8236;
    border: 1px solid #ff8236;
  }
  .communicat_way{
    display: flex;
    padding: 20px 0;
    font-size: 14px;
    color: #666666;

  }
  .communicat_way input{
    flex-grow: 1;
    margin-left: 10px;
    padding-left: 15px;
  }
  .sub_btn{
    margin: 0 auto;
    width: 80px;
    line-height: 30px;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    background-color: #5082e6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border: none;
  }
</style>
