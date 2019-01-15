<template>
    <div class="menu_list_pic">
      <img class="common_menu" src="/static/images/ic_menu@2x.png" alt="" @click="nav_open">
    </div>
</template>

<script>
    export default {
        name: "menu_list_pic",
      data() {
          return {
            isOpen: false
          }
      },
      methods: {
        nav_open() {
          this.isOpen = true;
          this.$emit('sendIsopen',this.isOpen)
        }
      },
    }
</script>

<style scoped>

</style>
