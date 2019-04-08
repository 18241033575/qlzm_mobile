/*
  * commonJS 1.17
  * Jayshi
*/


  /*
    // 文件服务器地址
    'file_server'           => '//file.wiiwork.com/',
    // 文件上传接口地址
    'file_upload'           => '//file.wiiwork.com/v1/upload',
  */
  const file_server = '//file.wiiwork.com/';  // 测试服
  // const file_server = '//https://file.qlzm.com.cn/'; // 正式服

  function file_upload() {
    return '//file.wiiwork.com/v1/upload';  // 测试服
    // return 'https://file.qlzm.com.cn/v1/upload'; // 正式服
  }


  /*
  // 字段说明
  data: 传入数据
  type {
    0: 传入相应id
    1: 单个对象数据
    2：数组
    3：返回全部数据
    4: 待补充
  }
  off: 数组内有office对象
 */
  // 企业规模
  function transComScale(data,type) {
    const company_scale = JSON.parse(localStorage.getItem('COMSCALE'));
    company_scale.forEach((item)=>{
      if(type == 0){
        if (item.id == data){
          return item.name;
        }
      } else if(type == 1){
        if (item.id == data.scale){
          data.scale = item.name;
        }
      }else if (type == 2){
        for (let i = 0,len = data.length;i < len;i++){
          if (data[i].scale == item.id){
            data[i].scale = item.name;
          }
        }
      } else if (type == 3){
        return company_scale;
      }
    });
  }

  // 企业性质
  function transComNature(data,type) {
    const company_nature = JSON.parse(localStorage.getItem('COMNATURE'));
    company_nature.forEach((item)=>{
      if(type == 1){
        if (item.id == data.nature){
          data.nature = item.name;
        }
      }else if (type == 2){
        for (let i = 0,len = data.length;i < len;i++){
          if (data[i].nature == item.id){
            data[i].nature = item.name;
          }
        }
      } else if (type == 3){
        return company_nature;
      }
    });
  }

  // 人才优势
  function tal_adv(data,type) {
    const userTags = JSON.parse(localStorage.getItem('USERTAGS'));
    userTags.forEach((item)=>{
      if (type == 1){

      } else if(type == 2){
        for (let i = 0,len = data.length;i < len;i++){
          if (data[i] == item.id) {
            data[i] = item.value;
          }
        }
      }else {

      }
    });
    return data;
  }

  // 招聘优势
  function company_adv(data,type) {
    const welfare = JSON.parse(localStorage.getItem('COMPANYTAGS'));
    if (data!='' && data!=undefined) {
      let transData = data.split(',');
    }
  }

  // 教育经历
  function transEducation(data,type,off) {
    const education = JSON.parse(localStorage.getItem('EDUCATION'));
    if (type == 3){
      return education;
    }
    education.forEach((item)=>{
      if(type == 0){
        if (item.id == data){
          return item.name;
        }
      } else if(type == 1){
        if (item.id == data.education){
          data.education = item.name;
        }
      }else if (type == 2){
        if (off == 'office'){
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].office.education == item.id){
              data[i].office.education = item.name;
            }
          }
        }else {
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].education == item.id){
              data[i].education = item.name;
            }
          }
        }
      }
    });
  }

  // 薪资待遇
  function transSalary(data,type,off) {
    const salary = JSON.parse(localStorage.getItem('SALARY'));
    if (type == 3){
      return salary;
    }else {
      salary.forEach((item)=>{
        if(type == 0){
          if (item.id == data){
            return item.name;
          }
        } else if(type == 1){
          if (item.id == data.salary){
            data.salary = item.name;
          }
        }else if (type == 2){
          if (off == 'office'){
            for (let i = 0,len = data.length;i < len;i++){
              if (data[i].office.salary == item.id){
                data[i].office.salary = item.name;
              }
            }
          } else {
            for (let i = 0,len = data.length;i < len;i++){
              if (data[i].salary == item.id){
                data[i].salary = item.name;
              }
            }
          }
        }
      });
    }
  }

  // 到岗时间
  function transArrive(data,type) {
    const arrive_time = JSON.parse(localStorage.getItem('ARRIVETIME'));
    if (type == 3){
      return arrive_time;
    }else {
      arrive_time.forEach((item)=>{
        if(type == 0){
          if (item.id == data){
            return item.name;
          }
        } else if(type == 1){
          if (item.id == data.duty_time){
            data.duty_time = item.name;
          }
        }else if (type == 2){
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].duty_time == item.id){
              data[i].duty_time = item.name;
            }
          }
        }
      });
    }
  }

  // 发布时间
  function tranOffice_time() {
    const office_time = JSON.parse(localStorage.getItem('RELEASETIME'));
    if (type == 3){
      return office_time;
    }
  }
  // 职位类别
  function transJobs(data,type) {
    const jobs = JSON.parse(localStorage.getItem('JOBTYPE'));
    if (type == 3){
      return jobs;
    }
    jobs.forEach((item)=>{
      if(type == 0){
        if (item.id == data){
          return item.name;
        }
      } else if(type == 1){
        if (item.id == data.jobs){
          data.jobs = item.name;
        }
      }else if (type == 2){
        for (let i = 0,len = data.length;i < len;i++){
          if (data[i].jobs == item.id){
            data[i].jobs = item.name;
          }
        }
      }
    });
  }

  // 工作性质
  function transNature(data,type,off) {
    const nature = [
      {name: "不限",id: 0},
      {name: "全职",id: 1},
      {name: "项目",id: 2},
    ];
    if(type == 3){
      return nature
    }
    nature.forEach((item)=>{
      if(type == 0){
        if (item.id == data){
          return item.name;
        }
      } else if(type == 1){
        if (item.id == data.nature){
          data.nature = item.name;
        }
      }else if (type == 2){
        if (off == 'office'){
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].office.nature == item.id){
              data[i].office.nature = item.name;
            }
          }
        }else {
          for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].nature == item.id) {
              data[i].nature = item.name;
            }
          }
        }
      }
    });
  }
  //工作经验
  function transWorkexp(data,type,off) {
    const workexp = JSON.parse(localStorage.getItem('WORKEXP'));
    if(type == 3){
      return workexp
    }
    workexp.forEach((item)=>{
      if(type == 0){
        if (item.id == data){
          return item.name;
        }
      } else if(type == 1){
        if (item.id == data.work_exp){
          data.work_exp = item.name;
        }
      }else if (type == 2){
        if (off == 'office'){
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].office.work_exp == item.id){
              data[i].office.work_exp = item.name;
            }
          }
        }else {
          for (let i = 0,len = data.length;i < len;i++){
            if (data[i].work_exp == item.id){
              data[i].work_exp = item.name;
            }
          }
        }
      }
    });
  }

/*字典部分*/

function transNature1(data,type,off) {
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
  } else if (type == 3) {
      return nature
  } else {
    transData.nature = nature[transData.nature]
  }
}



function transWorkexp1(data,type,classify) {
  //工作经验
  let workexp = [
    "不限",
    "1年以下",
    "1-3年",
    "3-5年",
    "5-10年",
    "10年以上"
  ];
  let transData = data;
  if (type == 5) {
    return workexp
  } else if(type == 4) {
    return workexp[data]
  }else if (type == 2) {
    for (let i = 0; i < transData.length; i++) {
      transData[i].office.work_exp = workexp[transData[i].office.work_exp]
    }
  }else if(type == 1) {
    return transData.work_exp = workexp[transData.work_exp]
  }else {
    for (let i = 0; i < transData.length; i++) {
      transData[i].work_exp = workexp[transData[i].work_exp]
    }
  }
}
function transGender(data,type) {
  // gender：
  const gender = [
    "不限",
    "男",
    "女"
  ];
    if (type == 5) {
      return gender
    } else {
      data.gender = gender[data.gender]
    }
}



function getDistanceTime(time,type,off) {
  if (type == 2) {
    if (off == 'office') {
      return getDTime(time.office.updated_at)
    }else {
      return getDTime(time.updated_at)
    }
  }else if (type == 3) {
    if (off == 'create') {
      return getDTime( time.created_at);
    }else {
      time.updated_at = time.updated_at == 0?time.created_at:time.updated_at;
      return getDTime(time.updated_at);
    }
  } else {
    return getDTime(time)
  }
  function getDTime(time) {
    let now = Date.parse(new Date()),
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

//时间转时间戳
function transtime(t) {
  let T = new Date(t);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
  // console.log(T,T.getTime(),typeof T.getTime());
  return JSON.stringify(T.getTime()).substring(0,10)
}


//拼接图片地址
function splicPic(data, add) {
  if (add) {
    return data = file_server + data;
  }
}

function splicLogo(data,type) {
  if (type == 1){
    if (data.logo == '') {
      data.logo = '/static/images/company_def_logo.png'
    } else {
      data.logo = file_server + data.logo
    }
  }else if (type == 2) {
    if (data == '') {
      return '/static/images/company_def_logo.png'
    } else {
      return file_server + data
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].logo == '') {
        data[i].logo = '/static/images/company_def_logo.png'
      } else {
        data[i].logo = file_server + data[i].logo
      }
    }
  }
}
// 更新时间
function updateTime(data,type) {
    const Time = [
      "不限",
      "1天内",
      "3天内",
      "1周内",
      "15天内",
      "1个月内",
    ];
  if (type == 3) {
      return Time
  }
}
// 年龄要求
function reqAge(data,type) {
  const Age = [
    "不限",
    "18-25岁",
    "25-30岁",
    "30-35岁",
    "35岁以上",
  ];
  if (type == 3) {
    return Age
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
  let len = data.length,
      reverseData = {};
  if (len == undefined || len == 0) {

  } else {
    for (let i = 0; i < len; i++) {
      reverseData[i] = data[len - 1 - i];
    }
  }
  return reverseData
}



// 根据生日计算年龄
function getTrueAge(data,type) {

  if (type == 2) {
    for (let i = 0,len = data.length; i < len;i++) {
      data[i].age = getAge(data[i].birthday)
    }
  } else {
     return getAge(data)
  }
  function getAge(data) {
    let trueAge;
    if ('' != data && 0 != data) {
      var timestamp = parseInt(data + '000'),
        nowData = new Date(),
        newData = new Date(timestamp);
      if ((newData.getMonth() <= newData.getMonth()) && (newData.getDay() <= nowData.getDay())) {
        trueAge = (nowData.getFullYear() - newData.getFullYear()) + '岁';
      } else {
        trueAge = (nowData.getFullYear() - newData.getFullYear() - 1) + '岁';
      }
    } else {
      trueAge = '未知';
    }
    return trueAge
  }
}



export {
  tranOffice_time,
  transSalary,
  transGender,
  transEducation,
  transWorkexp,
  transWorkexp1,
  getDistanceTime,
  transNature,
  transNature1,
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
  timestampToTime,
  transtime,
  transJobs,
  getTrueAge,
  file_upload,
  updateTime,
  reqAge
}
