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
            <p>{{selfEvalData.evaluation}}</p>
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
            <div class="adv_cell" adv_sign="index" :class="{adv_sign_active: true}" v-for="(item,index) in this.selfEvalData.tags" :key="index" @click="choose_adv">
              {{item}}
            </div>
          </div>
          <div class="eval_body_bottom">
            <textarea name="evaluation">{{selfEvalData.evaluation}}</textarea>
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
            selfEvalData: {}
          }
      },
      methods: {
        selfEdit() {
          this.selfEvalSign = false;
        },
        selfSave() {
          this.selfEvalSign = true;
        },
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('data-id');
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state!= 400) {
              res.data.evaluation.tags = tal_adv(res.data.evaluation.tags,true);
              this.selfEvalData = res.data.evaluation;
            }
          });
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
    padding: 9px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
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
