  /*
    * commonJS 1.17
    * Jayshi
  */

    //可以用类简化代码


    /*字典部分*/
    // salary
  function transSalary(data) {
    const salary = [
      "面议",
      "2000以下",
      "2001-4000",
      "4001-6000",
      "6001-8000",
      "8001-10000",
      "10001-15000",
      "15001-25000",
      "2.5w-5w",
      "5w-10w",
      "10w以上"
    ];
    let transData = data;
    for (let i = 0; i < transData.length; i++) {

      if (transData[i].salary != 0) {
        transData[i].salary = (salary[transData[i].salary] + '元/月')
      }else {
        transData[i].salary = salary[transData[i].salary]
      }
    }
  }
  function transNature(data) {
    const nature = [
      "面议",
      "全职",
      "项目"
    ];
    let transData = data;
    for (let i = 0; i < transData.length; i++) {
        transData[i].nature = nature[transData[i].nature]
    }
  }
  function transEducation(data) {
    // education
    const education = [
      "不限",
      "小学及以下",
      "初中",
      "中专",
      "高中",
      "大专",
      "本科",
      "硕士研究生",
      "博士及以上"
    ];
    let transData = data;
    for (let i = 0; i < transData.length; i++) {
      transData[i].education = education[transData[i].education]
    }
  }
  function transWorkexp(data) {
    //工作经验
    const workexp = [
      "不限",
      "1年以下",
      "1-3年",
      "3-5年",
      "5-10年",
      "10年以上"
    ];
    let transData = data;
    for (let i = 0; i < transData.length; i++) {
      transData[i].work_exp = workexp[transData[i].work_exp]
    }
  }
    // gender：
    const gender = [
      "不限",
      "男",
      "女"
    ];



  function getDistanceTime(time) {
    var now = Date.parse(new Date()),
      diff,
      last;
    if (time == 0 || time == '' || !time) {
      return last = '未知时间';
    }
    diff = now/1000 - time;
    if (diff > (3600 * 24 * 30)) {
      last = '1月前'
    }
    else if (diff > (3600 * 24 * 7) && diff <= (3600 * 24 * 30)) {
      last = Math.floor(diff / (3600 * 24 * 7)) + '周前';
    }
    else if (diff > (3600 * 24) && diff <= (3600 * 24 * 7)) {
      last = Math.floor(diff / (3600 * 24)) + '天前';
    }
    else if (diff > 3600 && diff <= (3600 * 24)) {
      last = Math.floor(diff / 3600) + '小时前';
    }
    else if (diff <= 3600 && diff > 60) {
      last = Math.floor(diff / 60) + '分钟前';
    }
    else if (diff <= 60 || diff == undefined) {
      last = '刚刚';
    }
    return last;
  };


  //拼接图片地址
  function splicPic(data) {

  }

  export {
    transSalary,gender,transEducation,transWorkexp,getDistanceTime,transNature
  }
