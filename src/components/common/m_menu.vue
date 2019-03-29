<template>
    <!--主菜单-->
  <div class="m_menu">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from './main_menu'
  import menu_list_pic from './menu_list_pic'
    export default {
        name: "m_menu",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
          }
      },
      methods: {
        get_sign(data) {
          this.openState = !data;
        },
        getIsopen(data) {
          this.openState = data;
        },
        changeState() {
          this.$emit('menu_state', this.openState);
        }
      },
      watch: {
        openState: {
          handler() {
            this.changeState();
          },
          immediate: true
        }
      }
    }
</script>

<style scoped>
  .m_menu{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
