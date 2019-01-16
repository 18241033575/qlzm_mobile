<template>
  <div class="tal_bas_msg_all">
    <div class="tal_bas_msg">
      <div class="com_det_title">
        <div class="content">
          基本信息
        </div>
      </div>
      <div class="tal_msg_det">
        <div class="content">
          <div class="top_pic">
            <img src="/static/images/banner03@2x.png" alt="">
            <p class="tal_name">德勒·阿里</p>
            <p><span>男</span>|<span>27岁</span>|<span>本科</span>|<span>10年以上</span></p>
          </div>
          <div class="bottom_msg">
            <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
            <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
            <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
            <p><span class="left_lab">就业情况</span> <span class="right_msg">在职</span></p>
            <p><span class="left_lab">通讯地址</span> <span class="right_msg">贵州省贵阳市南明区</span></p>
            <p><span class="left_lab">街道</span> <span class="right_msg">花果园财富广场1栋8楼</span></p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="bas_msg_btn">
          编辑
        </div>
      </div>
    </div>
    <div class="tal_msg_edit" v-show="false">
      <div class="com_det_title">
        <div class="content">
          编辑基本信息
        </div>
      </div>
      <div class="tal_edit_det">
        <div class="edit_top">
          <div class="content">
            <div class="edit_top_box">
              <div class="top_pic">
                <img src="/static/images/user-01@2x.png" alt="">
              </div>
              <div class="top_msg">
                <span class="upload_btn">上传图片</span>
                <p>支持JPG、PNG，大小不要超过500k 建议使用一寸证件照70*100像素</p>
              </div>
            </div>
          </div>
        </div>
        <div class="edit_bottom">
          <div class="content">
            <div class="edit_cell">
              <span class="edit_lab">真实姓名</span><input type="text">
            </div>
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
        name: "tal_bas_msg"
    }
</script>

<style scoped>
  .tal_msg_det{
    background-color: #ffffff;
  }
  .top_pic{
    text-align: center;
    padding-top: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .top_pic img{
    width: 75px;
    height: 90px;
  }
  .top_pic .tal_name{
    padding-bottom: 0;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .top_pic p{
    padding: 10px 0;
  }
  .top_pic p span{
    padding: 0 5px;
    font-size: 12px;
    color: #919199;
  }
  .bottom_msg{
    padding: 20px 0;
    line-height: 24px;
    font-size: 12px;
  }
  .bottom_msg .left_lab{
    display: inline-block;
    width: 90px;
    color: #919199;
  }
  .bottom_msg .right_msg{
    color: #666666;
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
  /*编辑*/
  .tal_edit_det{
    background-color: #ffffff;
  }
  .edit_top {
    padding: 15px 0;
    font-size: 12px;
  }
  .edit_top_box{
    display: flex;
  }
  .top_pic img {
    width: 70px;
    height: 95px;
  }
  .top_msg{
    margin-left: 15px;
    color: #919199;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
  }
  .upload_btn{
    display: inline-block;
    margin-top: 10px;
    width: 80px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background-color: #ff8236;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
  }

  .edit_lab {
    font-size: 14px;
    color: #353535;
  }
</style>
