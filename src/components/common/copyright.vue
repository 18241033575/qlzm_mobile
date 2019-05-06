<template>
  <!--底部备案版权-->
    <div class="copyright">
      <!--底部-->
      <div class="foot">
        <p>{{webCopy.copy}}</p>
        <p>{{webCopy.case}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "copyright",
      data(){
          return {
            webCopy: {},
          }
      },
      created() {
          let basset = JSON.parse(localStorage.getItem('BASSET'));
          if (basset) {
            basset.forEach((item,ids)=> {
              // 版权
              if (item.key == 'cfg_copyright') {
                this.webCopy.copy = item.value;
              }
              // 备案
              if (item.key == 'cfg_beian_icp') {
                this.webCopy.case = item.value;
              }
            })
          }else {
            // 基础系统设置
            this.$ajax.get('/get-system-configs')
              .then((res)=>{
                if (res.data.state != 400) {
                  let param = JSON.stringify(res.data);
                  localStorage.setItem('BASSET',param);
                  res.data.forEach((item,ids)=> {
                    // 版权
                    if (item.key == 'cfg_copyright') {
                      this.webCopy.copy = item.value;
                    }
                    // 备案
                    if (item.key == 'cfg_beian_icp') {
                      this.webCopy.case = item.value;
                    }
                  })
                }
              })
          }
      }
    }
</script>

<style scoped>
  /*底部*/
  .copyright .foot{
    margin-top: 10px;
    padding-top: 10px;
    width: 100%;
    height: 60px;
    text-align: center;
    color: #919199;
    font-size: 12px;
  }
</style>
