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
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "reg_type_choose",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
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
      }
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
