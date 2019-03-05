<template>
      <!--全部职位-->
    <div class="all_pos">
      <div class="com_det_title">
        <div class="content">
          全部职位
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
        name: "all_pos",
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
        uploadLicense() {
          this.uploadSign = true;
        },
        submitLicense() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/company/auth-set', {cid: companyInfo.id, license: this.licenseUrl})
            .then((res) => {
              console.log(res);
            })
        }
      }
    }
</script>

<style scoped>

</style>
