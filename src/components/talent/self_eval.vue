<template>
    <!--自我评价-->
  <div class="self_eval_all">
    <!--自我评价信息-->
    <div class="self_eval_msg" v-show="false">
      <div class="com_det_title">
        <div class="content">
          自我评价
        </div>
      </div>
      <div class="eval_body">
        <div class="content">
          <div class="eval_body_top">
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
          </div>
          <div class="eval_body_bottom">
            <p>技术好，学历高，长得又好看；经验丰富老司机，能说会道万金油，十斤白酒喝不倒！这些都是家常便饭不足挂齿，以下才是重点：家里有矿！家里有矿！家里有矿！重要的事情要说三遍！你懂的！</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          编辑
        </div>
      </div>
    </div>
    <!--编辑自我评价-->
    <div class="self_eval_edit">
      <div class="com_det_title">
        <div class="content">
          编辑自我评价
        </div>
      </div>
      <div class="eval_body">
        <div class="content">
          <div class="eval_body_top">
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
            <div class="adv_cell">
              技术好
            </div>
          </div>
          <div class="eval_body_bottom">
            <p>技术好，学历高，长得又好看；经验丰富老司机，能说会道万金油，十斤白酒喝不倒！这些都是家常便饭不足挂齿，以下才是重点：家里有矿！家里有矿！家里有矿！重要的事情要说三遍！你懂的！</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "self_eval"
    }
</script>

<style scoped>
  .eval_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .eval_body_top{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 5px;
  }
  .adv_cell{
    width: 21%;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 30px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
  }
  .eval_body_bottom p{
    padding: 15px 0;
    font-size: 14px;
    color: #666666;
    line-height: 18px;
  }
  .bas_msg_btn{
    margin-top: 15px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #ffffff;
    background-color: #5082e6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
</style>
