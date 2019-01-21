<template>
    <!--屏蔽企业-->
  <div class="tal_shield">
    <div class="com_det_title">
      <div class="content">
        屏蔽企业
      </div>
    </div>
    <div class="add_item">
      <p v-show="this.shieldSignState" @click="addShield"><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加屏蔽企业</span></p>
      <div class="opera" v-show="!this.shieldSignState"><input type="text" placeholder="请输入完整的公司名称" v-model="company_name"> <span>保存</span><span @click="cancel">取消</span></div>
    </div>
    <div class="shield_list">
      <div class="content">
        <ul>
          <li>中国石油化工集团公司<span class="fr">取消屏蔽</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tal_shield",
      data() {
          return {
            shieldSignState: true,
            company_name: '123456'
          }
      },
      created() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.get('/personal/shield')
            .then((res)=>{
              console.log(res);
            })
      },
      methods: {
        addShield() {
          this.shieldSignState = false
        },
        cancel() {
          this.shieldSignState = true
        }
      }
    }
</script>

<style scoped>
  .add_item{
    margin-top: 10px;
    width: 100%;
    line-height: 44px;
    background-color: #ffffff;
    text-align: center;
  }
  .add_item input{
    vertical-align: middle;
    height: 26px;
    padding: 0 10px;
    color: #919199;
  }
  .add_item img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .add_item span{
    font-size: 14px;
    color: #919199;
  }
  .add_item .opera span{
    display: inline-block;
    margin-left: 5px;
    width: 50px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    background-color: #5082e6;
  }
  .shield_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .shield_list ul{
    list-style: none;
  }
  .shield_list ul li{
    width: 100%;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    color: #666666;
  }
  .shield_list ul li span{
    display: inline-block;
    margin-top: 10px;
    width: 60px;
    line-height: 24px;
    font-size: 12px;
    color: #ff8236;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #FF8236;
    text-align: center;
  }
</style>
