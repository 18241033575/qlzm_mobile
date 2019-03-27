<template>
      <!--全部职位-->
    <div class="all_pos">
      <div class="com_det_title">
        <div class="content">
          全部职位
        </div>
      </div>
      <div class="list">
        <div class="content">
          <div class="list_cell" v-for="(item,index) in this.allPosData" :key="index" v-show="item.value != 0" :data-id="item.value" @click="job_pos">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {transJobs} from '../../../static/js/common.js'
    export default {
      name: "all_pos",
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          allPosData: {},
        }
      },
      methods: {
        job_pos(e) {
          let job_id = e.currentTarget.getAttribute('data-id');
          this.$router.push({name: 'find_job',query: {job_id: job_id}})
        }
      },
      created() {
        this.allPosData = transJobs(this.allPosData,5);
      }
    }
</script>

<style scoped>
  .com_det_title{
    background-color: #f0f1f5;
  }
  .list{
    background-color: #ffffff;
  }
  .list_cell{
    font-size: 14px;
    color: #666666;
    line-height: 44px;
  }
</style>
