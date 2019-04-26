<template>
  <!--招聘设置-->
    <div class="recruit_set" :class="{stop_scroll: scrollSign}">
      <div class="com_det_title">
        <div class="content">
          招聘设置
        </div>
      </div>
      <div class="set_list">
        <div class="content">
         <!-- <div class="edit_cell">
            <span class="edit_lab">自动招聘</span><span @click="auto_set" class="int_job_det fr">未开启<img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>-->
          <div class="edit_cell"  @click="pos_adv">
            <span class="edit_lab">招聘优势</span><span class="int_job_det fr"><img src="/static/images/ic_right@2x.png" alt=""></span>
            <p>提升职位吸引力，有效增加招聘效率！</p>
          </div>
          <div class="edit_cell">
            <span class="edit_lab">名企招聘</span><span class="int_job_det fr"><el-switch class="switch_btn" v-model="isFamouse"></el-switch></span>
            <p>开启可享受：职位置顶、首页广告 、名企标识 、专栏招聘等服务，提升招聘成效！</p>
          </div>
        </div>
      </div>
      <div class="enterp_button" @click="save_set">
        保存设置
      </div>
      <!--职位亮点-->
      <div class="ent_intro" v-show="tagsSign">
        <div class="filter_s_title">
          <div class="content">
            <img @click="intro_back" src="/static/images/left.png" alt="left">招聘优势
          </div>
        </div>
        <div class="content">
          <p class="com_adv">选择职位亮点，提升职位吸引力，有效增加职位投递！ (最多可选择 8 个)</p>
          <span class="adv_cell" @click="choose_adv" :class="{adv_sign_active: item.choose != 1}" v-for="(item,index) in advData" :adv-id="item.id" :key="index">{{item.value}}</span>
        </div>
        <div class="bas_msg_btn" @click="intro_sub">
          确定
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "recruit_set",
      data() {
        return {
          scrollSign: false,
          isFamouse: true,
          tagsSign: false,
          subTags: [],
          tagsNum: [],
          advData:　{},
        }
      },
      methods: {
        auto_set() {
          this.$router.push({name: 'auto_recruit'})
        },
        save_set() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let sign =  this.isFamouse == true?1:0;
          /*this.subTags.join(',')*/
          this.$ajax.post('/company/set-recruitment',{cid: companyInfo.id,has_m: sign,advantage:this.subTags.join(',')})
            .then((res)=>{
              console.log(res);
            })
        },
        pos_adv(){
          this.scrollSign = true;
          this.tagsSign = true;
        },
        intro_back() {
          this.tagsSign = false;
          this.scrollSign = false;
        },
        // 选择职位亮点
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('adv-id');
          for (let i = 0,len = this.advData.length;i < len;i++){
            if (this.advData[i].id == adv_sign) {
              if (this.advData[i].choose == 1) {
                this.$set(this.advData,i,{choose: 0,id: adv_sign,type: this.advData[i].type,salary: this.advData[i].salary,value: this.advData[i].value});
                this.advData[i].choose = 0;
                for (let j = 0,nlen = this.tagsNum.length;j < nlen;j++){
                  if (this.tagsNum[j] == adv_sign){
                    this.tagsNum.splice(j,1);
                  }
                }
              } else{
                if (this.tagsNum.length > 7){
                  this.$notify.warning({
                    title: '提示',
                    message: '最多可以选择8个优势',
                    showClose: false,
                    duration: 1500
                  });
                } else {
                  this.$set(this.advData,i,{choose: 1,id: adv_sign,type: this.advData[i].type,salary: this.advData[i].salary,value: this.advData[i].value});
                  // this.advData[i].choose = 1;
                  this.tagsNum.push(adv_sign);
                }
              }
            }
          }
        },
        // 招聘优势确定
        intro_sub() {
          this.subTags = this.tagsNum;
          this.tagsSign = false;
          this.scrollSign = false;
        },
      },
      created() {
        this.advData = JSON.parse(localStorage.getItem('COMPANYTAGS'));
        // 获取开启/关闭状态
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/api/company/detail/' + companyInfo.id)
          .then((res)=>{
            let tags = res.data.advantage.split(',');
            this.advData.forEach((item)=>{
              for (let k = 0,len = tags.length;k < len;k++) {
                if (tags[k] == item.id) {
                  item.choose = 1;
                }
              }
            });
          });
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
            this.isFamouse = res.data.has_m == 1? true: false;
          })
      }
    }
</script>

<style scoped>
  .set_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .edit_cell {
    /*line-height: 44px;*/
    padding: 16px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #666666;
    font-weight: bold;
  }
  .edit_cell p{
    margin-top: 10px;
    color: #919199;
  }
  .int_job_det{
    color: #919199;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .enterp_button{
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 44px;
    text-align: center;
    color: #ffffff;
    background-color: #5082e6;
    font-size: 14px;
  }
  /* 职位亮点样式 */
  .ent_intro{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
  }
  .ent_intro .filter_s_title{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .ent_intro textarea{
    width: 90%;
    min-height: 130px;
    height: 400px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
    border: none;
  }
  .ent_intro textarea::placeholder{
    font-size: 14px;
    color: #c2c2cc;
  }
  .ent_intro textarea:focus{
    outline: none;
  }
  .com_adv{
    padding: 15px 0;
    line-height: 18px;
    font-size: 12px;
    color: #ff8236;
  }
  .adv_cell{
    display: inline-block;
    padding: 0 13px;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
  }
  .adv_sign_active{
    background-color: #ffffff;
    color: #919199;
    line-height: 28px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #919199;
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
</style>
