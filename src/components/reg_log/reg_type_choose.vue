<template>
    <!--注册类型选择-->
  <div class="reg_type_choose">
    <div class="com_det_title">
      <div class="content">
        注册类型选择
      </div>
    </div>
    <div class="content">
      <router-link class="reg_choose_cell" :to="{name: 'user_reg'}">
        <img src="/static/images/ic_user_pers@2x.png" alt="">
        <p>人才注册</p>
      </router-link>
      <router-link class="reg_choose_cell" :to="{name: 'enterp_reg'}">
        <img src="/static/images/ic_cons_ent@2x.png" alt="">
        <p>建筑企业注册</p>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: "reg_type_choose",
    }
</script>

<style scoped>
  .reg_choose_cell{
    display: inline-block;
    margin-top: 15px;
    width: 100%;
    height: 160px;
    text-align: center;
    text-decoration: none;
    background-color: #ffffff;
  }
  .reg_choose_cell img{
    margin-top: 30px;
    width: 62px;
    height: 62px;
  }
  .reg_choose_cell p{
    /*margin-top: 10px;*/
    font-size: 14px;
    color: #666666;
  }
</style>
