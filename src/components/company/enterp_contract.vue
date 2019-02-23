<template>
  <!--联系信息-->
    <div class="enterp_contract">
      <div class="com_det_title">
        <div class="content">
          联系信息
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">联系人</span><input type="text"  placeholder="如: 张经理、王先生等">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">手机号码</span><input type="text"  placeholder="手机号码">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">座机号码</span><input type="text"  placeholder="座机号码">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">微信</span><input type="text"  placeholder="微信">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">QQ</span><input type="text"  placeholder="QQ">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">电子邮箱</span><input type="text"  placeholder="电子邮箱">
          </div>
        </div>
      </div>
      <div class="enterp_button">
        保存
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "enterp_contract",
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
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
  }

  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #353535;
  }
  .edit_cell input{
    display: inline-block;
    padding-left: 10px;
    width: 65%;
    line-height: 32px;
    border: none;
    color: #666666;
  }
  .edit_cell input ::placeholder{
    color: #c2c2cc;
  }
  .edit_cell input:focus{
    outline: none;
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
