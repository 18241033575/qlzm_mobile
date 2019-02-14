<template>
    <!--自我评价-->
  <div class="self_eval_all" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
            <div class="adv_cell" :adv_sign="index+1" :class="{adv_sign_active: true}" v-for="(item,index) in this.selfEvalData.tags" :key="index" @click="choose_adv">
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
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {tal_adv} from '../../../static/js/common.js'
    export default {
        name: "self_eval",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            selfEvalSign: true,
            selfEvalData: {},
            evaluation: ''
          }
      },
      methods: {
          /*总菜单操作s*/
        get_sign(data) {
          this.openState = !data;
        },
        getIsopen(data) {
          this.openState = data;
        },
        /*总菜单操作e*/
        selfEdit() {
          this.selfEvalSign = false;
        },
        selfSave() {
          this.selfEvalData.flag = 3;
          this.selfEvalData.evaluation = this.evaluation;
          this.$ajax.post('/resume/userinfo',this.selfEvalData)
            .then((res)=>{
              console.log(res);
              if (res.data.state == 200){
                this.selfEvalSign = true;
              }
            })
        },
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('adv_sign');
          console.log(adv_sign);
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/resume/userinfo',{params:{uid: userInfo.id}})
          .then((res)=>{
            if (res.data.state!= 400) {
              res.data.evaluation.tags = tal_adv(res.data.evaluation.tags,true);
              this.selfEvalData = res.data.evaluation;
              this.evaluation = this.selfEvalData.evaluation
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
