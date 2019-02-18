/*
  * commonJS 1.17
  * Jayshi
*/

//可以用类简化代码

/*字典部分*/

// salary
function transSalary(data,type,off) {
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
  if (type == 2) {
    if (off == 'office') {
      for (let i = 0; i < transData.length; i++) {
        if (transData[i].salary != 0) {
          transData[i].office.salary = (salary[transData[i].office.salary] + '元/月')
        } else {
          transData[i].office.salary = salary[transData[i].office.salary]
        }
      }
    } else {
      for (let i = 0; i < transData.length; i++) {
        if (transData[i].salary != 0) {
          transData[i].salary = (salary[transData[i].salary] + '元/月')
        } else {
          transData[i].salary = salary[transData[i].salary]
        }
      }
    }
  } else {
      if (transData.salary != 0) {
        transData.salary = (salary[transData.salary] + '元/月')
      } else {
        transData.salary = salary[transData.salary]
      }
  }
}

function transNature(data,type,off) {
  const nature = [
    "不限",
    "全职",
    "项目"
  ];
  let transData = data;
  if (type == 2) {
    if (off == 'office') {
      for (let i = 0; i < transData.length; i++) {
        transData[i].office.nature = nature[transData[i].office.nature]
      }
    }else {
      for (let i = 0; i < transData.length; i++) {
        transData[i].nature = nature[transData[i].nature]
      }
    }
  } else {
      transData.nature = nature[transData.nature]
  }
}

function transEducation(data,type) {
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
  if (type == 2) {
    for (let i = 0; i < transData.length; i++) {
        transData[i].office.education = education[transData[i].office.education]
    }
  }else if(type == 1) {
    transData.education = education[transData.education]
  }else {
    for (let i = 0; i < transData.length; i++) {
      transData[i].education = education[transData[i].education]
    }
  }
}

function transWorkexp(data,type,classify) {
  //工作经验
  let workexp = [
    "应届生",
    "1年以下",
    "1-3年",
    "3-5年",
    "5-10年",
    "10年以上"
  ];
  if (classify == 'tal') {
    workexp[0] = "应届生"
  }else {
    workexp[0] = "不限"
  }

  let transData = data;
  if (type == 2) {
    for (let i = 0; i < transData.length; i++) {
        transData[i].office.work_exp = workexp[transData[i].office.work_exp]
    }
  }else if(type == 1) {
    transData.work_exp = workexp[transData.work_exp]
  }else {
    for (let i = 0; i < transData.length; i++) {
      transData[i].work_exp = workexp[transData[i].work_exp]
    }
  }
}
function transGender(data,flag) {
  // gender：
  const gender = [
    "不限",
    "男",
    "女"
  ];
  if (flag) {
    data.gender = gender[data.gender]
  }
}
function transJobs() {
  const jobs = [
    {"name": "意向职位选择", "type": "optgroup"},
    {"name": "工程项目管理", "value": 16, "type":1, 'salary':15000},
    {"name": "工程监理", "value": 17, "type":1, 'salary':10000},
    {"name": "安全管理/安全员", "value": 18, "type":1, 'salary':7000},
    {"name": "建筑工程验收", "value": 19, "type":1, 'salary':4500},
    {"name": "建筑施工现场管理", "value": 20, "type":1, 'salary':6000},
    {"name": "施工队长", "value": 21, "type":1, 'salary':10000},
    {"name": "施工员", "value": 22, "type":1, 'salary':6000},
    {"name": "工程设备管理", "value": 23, "type":1, 'salary':6000},
    {"name": "建筑工程安全管理", "value": 24, "type":1, 'salary':7500},
    {"name": "工程总监", "value": 25, "type":1, 'salary':15000},
    {"name": "建筑工程师/总工", "value": 1, "type": 2, 'salary':20000},
    {"name": "土木/土建工程师", "value": 2, "type": 2, 'salary':9000},
    {"name": "造价师/预算师", "value": 3, "type": 2, 'salary':10000},
    {"name": "幕墙工程师", "value": 4, "type": 2, 'salary':8000},
    {"name": "安防工程师", "value": 5, "type": 2, 'salary':7000},
    {"name": "道路桥梁技术", "value": 6, "type": 2, 'salary':8000},
    {"name": "给排水/制冷/暖通", "value": 7, "type": 2, 'salary':6000},
    {"name": "岩土工程师", "value": 8, "type": 2, 'salary':10000},
    {"name": "水利/港口工程技术", "value": 9, "type": 2, 'salary':8000},
    {"name": "市政工程师", "value": 10, "type": 2, 'salary':15000},
    {"name": "综合布线/弱电", "value": 11, "type": 2, 'salary':11000},
    {"name": "爆破工程师", "value": 12, "type": 2, 'salary':12000},
    {"name": "楼宇自动化", "value": 13, "type": 2, 'salary':20000},
    {"name": "架线和管道工程技术", "value": 14, "type": 2, 'salary':7000},
    {"name": "土建勘察", "value": 15, "type": 2, 'salary':12000},
    {"name": "测绘/测量", "value": 26,"type":3, 'salary':6000},
    {"name": "园林/景观设计", "value": 27,"type":3, 'salary':8000},
    {"name": "建筑设计师/制图师", "value": 28,"type":3, 'salary':6000},
    {"name": "建筑制图", "value": 29,"type":3, 'salary':8500},
    {"name": "室内装潢设计", "value": 30,"type":3, 'salary':7000},
    {"name": "城市规划与设计", "value": 31,"type":3, 'salary':12500},
    {"name": "软装设计师", "value": 32,"type":3, 'salary':10000},
    {"name": "硬装设计师", "value": 33,"type":3, 'salary':9000},
    {"name": "橱柜设计师", "value": 34,"type":3, 'salary':10500},
    {"name": "资料员", "value": 35, "type":4, 'salary':6000},
    {"name": "开发报建", "value": 36, "type":4, 'salary':6000},
    {"name": "工程资料管理", "value": 37, "type":4, 'salary':5000}
  ];
}


function getDistanceTime(time) {
  var now = Date.parse(new Date()),
    diff,
    last;
  if (time == 0 || time == '' || !time) {
    return last = '未知时间';
  }
  diff = now / 1000 - time;
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
}

//时间戳转标准时间
function getLocalTime(nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}
function timestampToTime(timestamp) {
  timestamp = timestamp * 1000;
  let date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate()<10?'0' + date.getDate()+ ' ':date.getDate() + ' ';
  let h = date.getHours() < 10?'0' + date.getHours() + ':':date.getHours() + ':';
  let m = date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes();
  return Y+M+D+h+m;//时分秒可以根据自己的需求加上
}

function tal_adv(data, flag) {
  const userTags = [
    "无",
    "技术好",
    "经验丰富",
    "高学历",
    "形象好",
    "善于沟通",
    "能加班",
    "能出差",
    "有责任心"
  ];
  let transData = data;
  if (flag) {

    for (let i = 0; i < transData.length; i++) {
      transData[i] = userTags[transData[i]]
    }
    return transData
  }
}

function company_adv(data, flag) {
  const welfare = [
    "占位",
    "住房补贴",
    "五险一金",
    "绩效奖金",
    "包吃包住",
    "餐补房补",
    "节日福利",
    "通讯补贴",
    "创业公司",
    "周末双休",
    "带薪年假",
    "全勤奖",
    "餐补",
    "员工旅游",
    "交通补助",
    "年终分红",
    "弹性工作",
    "定期体检",
    "每年多次调薪",
    "股票期权",
    "美女多",
    "无试用期"
  ];
  if (data!='' && data!=undefined) {
    let transData = data.split(',');
    if (flag) {
      for (let i = 0; i < transData.length; i++) {
        transData[i] = welfare[transData[i]]
      }
      return transData
    }
  }
}


/*
  // 文件服务器地址
  'file_server'           => '//file.wiiwork.com/',
  // 文件上传接口地址
  'file_upload'           => '//file.wiiwork.com/v1/upload',
*/
const file_server = '//file.wiiwork.com/';
const file_upload = '//file.wiiwork.com/v1/upload';

//拼接图片地址
function splicPic(data, add) {
  if (add) {

    return data = file_server + data;
  }
}

function splicLogo(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].logo == '') {
      data[i].logo = '/static/images/company_def_logo.png'
    } else {
      data[i].logo = file_server + data[i].logo
    }
  }
}

function splicFrontcover(data,num) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontcover == '') {
      if (num == 2) {
        data[i].frontcover = ''
      } else {
        data[i].frontcover = '/static/images/article_def_img.png'
      }
    } else {
      data[i].frontcover = file_server + data[i].frontcover
    }
  }
}
//倒序
function reverseOrder(data) {
  console.log(data);
  let len = data.length,
      reverseData = {};
  console.log(len);
  if (len == undefined || len == 0) {

  } else {
    for (let i = 0; i < len; i++) {
      reverseData[i] = data[len - 1 - i];
    }
  }
  console.log(reverseData);
  return reverseData
}
function transComScale(data,flag,type) {
  const company_scale = [
    "占位",
    "1-19人",
    "20-49人",
    "50-99人",
    "100-199人",
    "200-499人",
    "500-999人",
    "1000-4999人",
    "5000人以上"
  ]
  if (flag) {
    if (type == 2) {
      for (let i = 0; i < data.length; i++) {

      }
    } else {
      data.scale = company_scale[data.scale]
    }
  }
}
function transComNature(data,flag,type) {
  const company_nature = [
    "占位",
    "国有企业",
    "国有控股企业",
    "外资企业",
    "合资企业",
    "私营企业",
    "事业单位",
    "国家行政机关",
    "政府"
  ];
  if (flag) {
    if (type == 2) {
      for (let i = 0; i < data.length; i++) {

      }
    } else {
      data.nature = company_nature[data.nature]
    }
  }
}
function transArrive(data,flag,type) {
  //到岗时间
  const arrive_time = [
    "未填写",
    "随时",
    "3天内",
    "7天内",
    "15天内",
    "30天内"
  ];
  if (flag) {
    if (type == 2) {
      for (let i = 0; i < data.length; i++) {

      }
    } else {
      data.duty_time = arrive_time[data.duty_time]
    }
  }
}



export {
  transSalary,
  transGender,
  transEducation,
  transWorkexp,
  getDistanceTime,
  transNature,
  splicPic,
  tal_adv,
  splicLogo,
  splicFrontcover,
  company_adv,
  transComScale,
  transComNature,
  transArrive,
  reverseOrder,
  getLocalTime,
  timestampToTime
}
