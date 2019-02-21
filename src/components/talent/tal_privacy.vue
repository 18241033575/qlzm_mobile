<template>
  <!--简历隐私-->
    <div class="tal_privacy" :class="{stop_scroll: this.openState}">
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <div class="com_det_title">
        <div class="content">
          简历隐私
        </div>
      </div>
      <div class="privacy_state">
        <div class="content">
          <div class="privacy_state_box">
            <span>开放/隐藏简历</span>
            <el-switch class="switch_btn" @change="changeState"
                       v-model="privacy_state">
            </el-switch>
          </div>
        </div>
      </div>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "tal_privacy",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            privacy_state: true
          }
      },
      created() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.privacy_state = userInfo.state == 1?true:false
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
        changeState() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          let sta = this.privacy_state == true?1:-1;
          this.$ajax.post('/resume/hiddenopen',{state: sta,uid: userInfo.id})
            .then((res)=>{
              if (res.data.state == 200) {
                //提示信息
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '操作失败',
                  type: 'error'
                });
              }
            })
        }
      }
    }
</script>

<style scoped>
  .privacy_state{
    margin-top: 10px;
    width: 100%;
    line-height: 44px;
    background-color: #ffffff;
  }
  .privacy_state span{
    font-size: 14px;
    color: #353535;
  }
  .privacy_state_box{
    display: flex;
    justify-content: space-between;
  }
  .switch_btn{
    padding-top: 12px;
  }
</style>
