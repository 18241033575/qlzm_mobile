<template>
  <!--企业信息-->
    <div class="enterp_info">
      <div class="com_det_title">
        <div class="content">
          企业信息设置
        </div>
      </div>
      <!--分类链接-->
      <div class="menu_list">
        <div class="content">
          <router-link :to="{name: item.urlRoute}" v-for="(item,index) in menuList" :key="index">
            <div class="menu_list_cell" >
              {{item.urlName}}<img class="fr" src="/static/images/icon_goright.png" alt="">
            </div>
          </router-link>
        </div>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "enterp_info",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          menuList: {
            0: {
              urlName: "企业资料",
              urlRoute: "recruit_manage"
            },
            1: {
              urlName: "企业风采",
              urlRoute: "find_job"
            },
            2:{
              urlName: "联系信息",
              urlRoute: "enterp_contract"
            },
            3: {
              urlName: "企业认证",
              urlRoute: "index"
            }
          },
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
  .menu_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .menu_list a{
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }
  .menu_list_cell{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .menu_list_cell img{
    padding-top: 17px;
    width: 10px;
    height: 14px;
    vertical-align: middle;
  }
</style>
