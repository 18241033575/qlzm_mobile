<template>
  <!--招聘设置-->
    <div class="recruit_set">
      <div class="com_det_title">
        <div class="content">
          招聘设置
        </div>
      </div>
      <div class="set_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">自动招聘</span><span @click="auto_set" class="int_job_det fr">未开启<img src="/static/images/ic_right@2x.png" alt=""></span>
          </div>
          <div class="edit_cell">
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
    </div>
</template>

<script>
    export default {
      name: "recruit_set",
      data() {
        return {
          isFamouse: true
        }
      },
      methods: {
        auto_set() {
          this.$router.push({name: 'auto_recruit'})
        },
        save_set() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          let sign =  this.isFamouse == true?1:0;
          this.$ajax.post('/company/famous-set',{cid: companyInfo.id,has_m: sign})
            .then((res)=>{
              if (res.data.state == 200) {
                let msg = sign == 1?'名企开启成功':'名企关闭成功';
                this.$notify.success({
                  title: '提示',
                  message: msg,
                  showClose: false,
                  duration: 800,
                });
                setTimeout(()=>{
                  this.$router.push({name: 'recruit_manage'})
                },1000)
              }
            })
        }
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
</style>
