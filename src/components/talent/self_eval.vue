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
            <div class="adv_cell" v-for="(item,index) in selfEvalData.tags" :key="index">
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
            <div class="adv_cell" :class="{adv_sign_active: item.choose != 1}" :adv_sign="item.id" v-for="(item,index) in userTags" :key="index" @click="choose_adv">
              {{item.value}}
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
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.selfEvalData.flag = 3;
          this.selfEvalData.uid = userInfo.id;
          this.selfEvalData.evaluation = this.evaluation;
          this.selfEvalData.tags = this.tagsNum;
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
              this.$indicator.close();
            })
        },
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('adv_sign');
          for (let i = 0,len = this.userTags.length;i < len;i++){
            if (this.userTags[i].id == adv_sign) {
              if (this.userTags[i].choose == 1) {
                this.$set(this.userTags,i,{choose: 0,id: adv_sign,type: this.userTags[i].type,salary: this.userTags[i].salary,value: this.userTags[i].value});
                for (let j = 0,nlen = this.tagsNum.length;j < nlen;j++){
                  if (this.tagsNum[j] == adv_sign){
                    this.tagsNum.splice(j,1);
                  }
                }
              } else{
                this.$set(this.userTags,i,{choose: 1,id: adv_sign,type: this.userTags[i].type,salary: this.userTags[i].salary,value: this.userTags[i].value});
                this.tagsNum.push(adv_sign);
              }
            }
          }
        },
        getEval() {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.userTags = JSON.parse(localStorage.getItem('USERTAGS'));
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
            .then((res)=>{
              if (res.data.state!= 400) {
                this.tagsNum = res.data.evaluation.tags.concat();
                if (this.tagsNum != ''){
                  this.tagsNum.forEach((item)=>{
                    for (let i = 0,len = this.userTags.length;i < len;i++){
                      if (this.userTags[i].id == item) {
                        this.userTags[i].choose = 1;
                      }
                    }
                  });
                }
                this.selfEvalData = res.data.evaluation;
                this.selfEvalData.tags = tal_adv(this.selfEvalData.tags,2);
                this.evaluation = this.selfEvalData.evaluation;
              }
              this.$indicator.close();
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
    height: 30px;
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
