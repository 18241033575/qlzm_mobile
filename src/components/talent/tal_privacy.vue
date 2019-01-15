<template>
  <!--简历隐私-->
    <div class="tal_privacy">
      <div class="com_det_title">
        <div class="content">
          简历隐私
        </div>
      </div>
      <div class="privacy_state">
        <div class="content">
          <div class="privacy_state_box">
            <span>开放/隐藏简历</span>
            <el-switch class="switch_btn"
                       v-model="privacy_state">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tal_privacy",
      data() {
          return {
            privacy_state: true
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
