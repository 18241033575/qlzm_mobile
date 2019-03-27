<template>
  <!--企业信息设置-->
    <div class="enterp_info_set">
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
    </div>
</template>

<script>
    export default {
      name: "enterp_info_set",
      data () {
        return {
          menuList: {
            0: {
              urlName: "企业资料",
              urlRoute: "enterp_info"
            },
            1: {
              urlName: "企业风采",
              urlRoute: "enterp_mien"
            },
            2:{
              urlName: "联系信息",
              urlRoute: "enterp_contract"
            },
            3: {
              urlName: "企业认证",
              urlRoute: "enterp_ident"
            }
          },
        }
      },
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
