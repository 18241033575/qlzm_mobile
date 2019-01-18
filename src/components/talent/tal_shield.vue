<template>
    <!--屏蔽企业-->
  <div class="tal_shield">
    <div class="com_det_title">
      <div class="content">
        屏蔽企业
      </div>
    </div>
    <div class="add_item">
      <p v-show="false"><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加屏蔽企业</span></p>
      <input type="text"> <span>保存</span><span>取消</span>
    </div>
    <div class="shield_list">
      <div class="content">
        <ul>
          <li>中国石油化工集团公司<span class="fr">取消屏蔽</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tal_shield"
    }
</script>

<style scoped>
  .add_item{
    margin-top: 10px;
    width: 100%;
    line-height: 44px;
    background-color: #ffffff;
    text-align: center;
  }
  .add_item img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  .add_item span{
    font-size: 14px;
    color: #919199;
  }
  .shield_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .shield_list ul{
    list-style: none;
  }
  .shield_list ul li{
    width: 100%;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    color: #666666;
  }
  .shield_list ul li span{
    display: inline-block;
    margin-top: 10px;
    width: 60px;
    line-height: 24px;
    font-size: 12px;
    color: #ff8236;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #FF8236;
    text-align: center;
  }
</style>
