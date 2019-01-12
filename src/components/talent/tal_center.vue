<template>
    <div class="tal_center">
      <div class="tal_center_top">
        <div class="com_det_title">
          <div class="content">
            个人中心
          </div>
        </div>
        <div class="tal_point">
          <div class="content">
            <div class="tal_point_box">
              <div class="mark tal_point_cell">

              </div>
              <div class="salary tal_point_cell">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">

      </div>
    </div>
</template>

<script>
    export default {
        name: "tal_center"
    }
</script>

<style scoped>
  .tal_center_top{
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .tal_point_box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 110px;
  }
  .tal_point_cell{
    width: 48%;
    height: 80px;
  }
  .mark{
    background: -webkit-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: -o-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: -moz-linear-gradient(to bottom right,#82D9F7, #52B0FF);
    background: linear-gradient(to bottom right,#82D9F7, #52B0FF);
  }
  .salary{
    background: -webkit-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: -o-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: -moz-linear-gradient(to bottom right,#8CA1FF, #777BFF);
    background: linear-gradient(to bottom right,#8CA1FF, #777BFF);
  }
</style>
