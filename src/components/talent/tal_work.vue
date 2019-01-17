<template>
    <div class="tal_work">
      <div class="tal_work_msg" v-show="false">
        <div class="com_det_title">
          <div class="content">
            工作经历
          </div>
        </div>
        <div class="add_item">
          <p><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加工作经历</span></p>
        </div>
        <div class="exp_list">
          <div class="exp_cell">
            <div class="content">
              <div class="exp_cell_box">
                <div class="exp_head">
                  贵州知商网络开发有限公司<span class="fr"><img src="/static/images/ic_add_item@2x.png" alt="">编辑</span>
                </div>
                <div class="bottom_msg">
                  <p><span class="left_lab">职位</span> <span class="right_msg">项目经理</span></p>
                  <p><span class="left_lab">联系人</span> <span class="right_msg">王先生</span></p>
                  <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
                  <p><span class="left_lab">座机</span> <span class="right_msg">0851-8595321</span></p>
                  <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
                  <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
                  <p><span class="left_lab">面试地址</span> <span class="right_msg">贵州省贵阳市南明区花果园财富广场1栋8楼</span></p>
                  <p><span class="left_lab">提醒事项</span> <span class="right_msg">亲爱的应聘者您好，根据公司的要求你需要自
带一份纸质简历前来应聘哦！</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="exp_cell">
            <div class="content">
              <div class="exp_cell_box">
                <div class="exp_head">
                  贵州知商网络开发有限公司<span class="fr"><img src="/static/images/ic_add_item@2x.png" alt="">编辑</span>
                </div>
                <div class="bottom_msg">
                  <p><span class="left_lab">职位</span> <span class="right_msg">项目经理</span></p>
                  <p><span class="left_lab">联系人</span> <span class="right_msg">王先生</span></p>
                  <p><span class="left_lab">手机</span> <span class="right_msg">18285105688</span></p>
                  <p><span class="left_lab">座机</span> <span class="right_msg">0851-8595321</span></p>
                  <p><span class="left_lab">QQ</span> <span class="right_msg">5688651</span></p>
                  <p><span class="left_lab">邮箱</span> <span class="right_msg">18285105688@163.com</span></p>
                  <p><span class="left_lab">面试地址</span> <span class="right_msg">贵州省贵阳市南明区花果园财富广场1栋8楼</span></p>
                  <p><span class="left_lab">提醒事项</span> <span class="right_msg">亲爱的应聘者您好，根据公司的要求你需要自
带一份纸质简历前来应聘哦！</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tal_work_edit">
        <div class="com_det_title">
          <div class="content">
            添加/编辑工作经历
          </div>
        </div>
        <div class="exp_edit_list">
          <div class="content">
            <div class="exp_edit_cell">
              <span>公司名称</span><input type="text" placeholder="公司名称" value="贵州知商网络科技有限公司">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tal_work"
    }
</script>

<style scoped>
  .add_item{
    margin-top: 10px;
    width: 100%;
    text-align: center;
    line-height: 44px;
    background-color: #ffffff;
  }
  .add_item img{
    margin-right: 5px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .add_item span{
    font-size: 14px;
    color: #919199;
  }
  .exp_list{
    margin-top: 10px;
  }
  .exp_cell{
    display: flex;
    padding: 20px 0;
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .exp_head{
    justify-self: flex-end;
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
  .exp_head img{
    margin-right: 5px;
    width: 12px;
    height: 14px;
    vertical-align: middle;
  }
  .exp_head span{
    font-weight: normal;
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
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .exp_edit_cell{

  }
</style>
