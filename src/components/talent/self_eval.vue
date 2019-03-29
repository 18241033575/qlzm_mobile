<template>
    <!--自我评价-->
  <div class="self_eval_all">
    <!--自我评价信息-->
    <div class="self_eval_msg" v-show="this.selfEvalSign">
      <div class="com_det_title">
        <div class="content">
          自我评价
        </div>
      </div>
      <div class="eval_body">
        <div class="content">
          <div class="eval_body_top">
            <div class="adv_cell" v-for="(item,index) in this.selfEvalData.tags" :key="index">
              {{item}}
            </div>
          </div>
          <div class="eval_body_bottom">
            <p>{{evaluation}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="selfEdit">
          编辑
        </div>
      </div>
    </div>
    <!--编辑自我评价-->
    <div class="self_eval_edit" v-show="!this.selfEvalSign">
      <div class="com_det_title">
        <div class="content">
          编辑自我评价
        </div>
      </div>
      <div class="eval_body">
        <div class="content">
          <div class="eval_body_top">
            <div class="adv_cell" :adv_active="index" v-for="(item,index) in tagsNum"  @click="cancel_adv">
              {{item}}
            </div>
            <div class="adv_cell adv_sign_active" v-show="index != 0" :adv_sign="index" v-for="(item,index) in userTags" :key="index" @click="choose_adv">
              {{item}}
            </div>
          </div>
          <div class="eval_body_bottom">
            <textarea v-model="evaluation" name="evaluation"></textarea>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn" @click="selfSave">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {tal_adv} from '../../../static/js/common.js'
    export default {
      name: "self_eval",
      data() {
          return {
            selfEvalSign: true,
            selfEvalData: {},
            tagsNum : {},
            userTags: {},
            evaluation: ''
          }
      },
      methods: {
        selfEdit() {
          this.selfEvalSign = false;
        },
        selfSave() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.selfEvalData.flag = 3;
          this.selfEvalData.uid = userInfo.id;
          this.selfEvalData.evaluation = this.evaluation;
          this.selfEvalData.tags = [1,3,5];
          this.$ajax.post('/resume/userinfo',this.selfEvalData)
            .then((res)=>{
              if (res.data.state == 200){
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 1500
                });
                this.selfEvalSign = true;
                this.getEval();
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        },
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('adv_sign');
          this.userTags.splice(adv_sign,1);
          console.log(tal_adv(adv_sign, true,3));
          this.tagsNum.push(adv_sign);
          console.log(adv_sign);
          console.log(this.userTags);
          console.log(this.tagsNum);
        },
        cancel_adv(e) {
          let adv_active = e.currentTarget.getAttribute('adv_active');
          console.log(adv_active);
          console.log(this.userTags);
          console.log(this.tagsNum);
        },
        getEval() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
            .then((res)=>{

              if (res.data.state!= 400) {
                this.userTags = tal_adv(this.userTags,true,5);
                this.tagsNum = res.data.evaluation.tags;
                console.log(this.tagsNum);
                // 倒序不改变前面数据的序列号
                this.tagsNum.sort((a,b)=>{
                  return b-a;
                });
                this.tagsNum.forEach((item)=>{
                    this.userTags.splice(item,1);
                });
                this.selfEvalData = res.data.evaluation;
                this.selfEvalData.tags = tal_adv(this.selfEvalData.tags,true);
                this.evaluation = this.selfEvalData.evaluation;
              }
            });
        }
      },
      created() {
        this.getEval();
      }
    }
</script>

<style scoped>
  .eval_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .eval_body_top{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 5px;
  }
  .adv_cell{
    width: 75px;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .eval_body_bottom{
    text-align: center;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    text-align: left;
    color: #666666;
    line-height: 18px;
  }
  .eval_body_bottom textarea{
    width: 90%;
    min-height: 130px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
  }
  .bas_msg_btn{
    margin-top: 15px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #ffffff;
    background-color: #5082e6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .adv_sign_active{
    background-color: #ffffff;
    color: #919199;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #919199;
  }
</style>
