<template>
  <!--关于我们-->
    <div class="about_us">
      <!--平台介绍-->
      <div class="intro">

      </div>
      <!--联系我们-->
      <div class="contact">
        <quill-editor id="pos" v-model="testData.articles[0].content"
                      @ready="onEditorReady($event)"
                      :options ="editorOption">
        </quill-editor>
      </div>
    </div>
</template>

<script>
    export default {
        name: "about_us",
      data() {
          return{
            testData: {},
            editorOption: {
              modules:{
                toolbar: false
              },
            }
          }
      },
      methods: {
        onEditorReady(val) {
          val.enable(false);
        },
      },
      created() {
          this.$ajax.get('/news/about-us')
            .then((res)=>{
              console.log(res.data);
              this.testData = res.data[1];
            });
          this.$ajax.get('/news/user-guides')
            .then((res)=>{
              console.log(res.data);
            })
      }
    }
</script>

<style scoped>
  .intro p{
    font-size: 14px;
    color: #353535;
    text-indent: 2em;
  }
</style>
