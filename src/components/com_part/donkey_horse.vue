<template>
    <!--骑驴找马-->
  <div class="donkey_horse">
    <div class="labor_dispatch_box">
      <div class="com_det_title">
        <div class="content">
          骑驴找马
        </div>
      </div>
      <!--banner-->
      <div class="banner">
        <img src="/static/images/img_link_gdrck.png" alt="">
      </div>
      <div class="content">
        <div class="labor_title">
          服务流程
          <p>专业运作&nbsp;&nbsp;效率当先</p>
        </div>

        <!--服务流程-->
        <div class="labor_area">

        </div>

        <div class="labor_title">
          劳务派遣有何<span>好处</span>
        </div>
        <!--好处-->
        <div class="labor_good">
          <div class="good_cell">
            <div class="cell_top">
              <img src="/static/images/lwnum_01.png" alt=""><span class="good_title">减低管理成本，人力成本下降30％，管理成本下降50％</span>
            </div>
            <div class="cell_bottom">
              省去员工招聘、劳动合同的签订、社会保险缴纳、员工福利和工资的支付等，这些繁琐的HR事务由我们（骑驴找马）代理，人力成本下降30％，人力部管理成本下降50％
            </div>
          </div>
          <div class="good_cell">
            <div class="cell_top">
              <img src="/static/images/lwnum_02.png" alt=""><span class="good_title">招聘成本下降，人员到位效率提高，招聘渠道广，储备人才多</span>
            </div>
            <div class="cell_bottom">
              省去员工招聘、劳动合同的签订、社会保险缴纳、员工福利和工资的支付等，这些繁琐的HR事务由我们（骑驴找马）代理，人力成本下降30％，人力部管理成本下降50％
            </div>
          </div>
          <div class="good_cell">
            <div class="cell_top">
              <img src="/static/images/lwnum_03.png" alt=""><span class="good_title">转移劳动关系，将企业的历史遗留以及可见的经济风险化解</span>
            </div>
            <div class="cell_bottom">
              随着员工劳动关系的转移，企业历史遗留的如没有缴纳社保和加班费等问题，都将得到化解。因为如果过了法律的追溯期限，则劳动仲裁或法院都不会再支持相关的追讨。
            </div>
          </div>
          <div class="good_cell">
            <div class="cell_top">
              <img src="/static/images/lwnum_04.png" alt=""><span class="good_title">使用劳务费发票可以大大减少应付企业所得税</span>
            </div>
            <div class="cell_bottom">
              国家税法规定，员工工资超过规定的部分，企业在年底汇算清缴的时候，将要补缴企业所得税。如果企业用劳务费发票入生产（服务）成本直接税前列支而不用工资单入账不纳入企业的工资额范围，将可以避免这个补缴企业所得税所带来的麻烦。
            </div>
          </div>
          <div class="good_cell">
            <div class="cell_top">
              <img src="/static/images/lwnum_05.png" alt=""><span class="good_title">降低社保费成本</span>
            </div>
            <div class="cell_bottom">
              骑驴找马可根据企业的实际需要参保，可有效的降低社保的费用成本。
            </div>
          </div>
        </div>

        <div class="labor_title">
          劳务派遣有何<span>优势</span>
        </div>
        <!--好处-->
        <!--优势-->
        <div class="labor_adv">
          <div class="adv_cell">
            <img src="/static/images/ic_shape_01@2x.png" alt=""><span class="adv_title">节约招聘成本和时间</span>
            <p class="adv_det">公司遵循客户至上的原则和持续创新的精神，专注于劳务资源和劳务派遣管理，以推动劳务资源派遣建设的进程和劳务资源管理的产业化发展</p>
          </div>
          <div class="adv_cell">
            <img src="/static/images/ic_shape_02@2x.png" alt=""><span class="adv_title">节约招聘成本和时间</span>
            <p class="adv_det">公司遵循客户至上的原则和持续创新的精神，专注于劳务资源和劳务派遣管理，以推动劳务资源派遣建设的进程和劳务资源管理的产业化发展</p>
          </div>
          <div class="adv_cell">
            <img src="/static/images/ic_shape_03@2x.png" alt=""><span class="adv_title">节约招聘成本和时间</span>
            <p class="adv_det">公司遵循客户至上的原则和持续创新的精神，专注于劳务资源和劳务派遣管理，以推动劳务资源派遣建设的进程和劳务资源管理的产业化发展</p>
          </div>
          <div class="adv_cell">
            <img src="/static/images/ic_shape_04@2x.png" alt=""><span class="adv_title">节约招聘成本和时间</span>
            <p class="adv_det">公司遵循客户至上的原则和持续创新的精神，专注于劳务资源和劳务派遣管理，以推动劳务资源派遣建设的进程和劳务资源管理的产业化发展</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "donkey_horse"
    }
</script>

<style scoped>
  .labor_dispatch_box{
    background-color: #ffffff;
    padding-bottom: 30px;
  }
  .banner img{
    width: 100%;
    height: 135px;
  }
  .labor_title{
    margin: 30px 0;
    text-align: center;
    color: #353535;
    font-size: 18px;
    line-height: 18px;
  }
  .labor_title p{
    font-size: 14px;
    color: #919199;
  }
  .labor_title span{
    color: #ff8236;
  }
  .labor_area{
    padding: 15px;
    color: #666666;
    font-size: 12px;
    line-height: 18px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 2px dashed #5082E6;
  }
  /* 好处 */
  .labor_good .good_cell{
    margin-bottom: 30px;
  }
  .cell_top{
    display: flex;
    align-items: center;
    padding: 15px;
    line-height: 60px;
    background-color: #5082e6;
  }
  .cell_bottom{
    padding: 18px 12px;
    background-color: #f9f9f9;
    font-size: 12px;
    color: #999999;
    line-height: 18px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .labor_good img{
    margin-right: 16px;
    width: 30px;
    height: 23px;
    vertical-align: middle;
  }
  .labor_good .good_title{
    font-size: 14px;
    color: #ffffff;
    line-height: 18px;
  }
  /* 优势 */
  .labor_adv .adv_cell{
    padding: 9px 10px;
    height: 120px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    box-shadow:0 5px 20px 0 rgba(231,233,236,1);
  }
  .labor_adv img{
    margin-right: 12px;
    width: 29px;
    height: 29px;
    vertical-align: middle;
  }
  .labor_adv .adv_title{
    font-size: 14px;
    color: #353535;
    font-weight: bold;
  }
  .labor_adv .adv_det{
    margin-top: 15px;
    font-size: 12px;
    color: #666666;
    line-height: 18px;
  }
</style>
