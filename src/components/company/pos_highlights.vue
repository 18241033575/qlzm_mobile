<template>
    <div class="highlihts">
      <div class="com_det_title">
        <div class="content">
          职位亮点
        </div>
      </div>
      <div class="lights">
        <div class="content">
          <div class="ligths_msg">
            <p>选择职位亮点，提升职位吸引力，有效增加职位投递！ (最多可选择 8 个)</p>
          </div>
          <div class="lights_det">
            <span></span>
          </div>
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
        name: "pos_highlights",
      components: {
        main_menu,
        menu_list_pic,
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          countData: {

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
      },
    }
</script>

<style scoped>

</style>
