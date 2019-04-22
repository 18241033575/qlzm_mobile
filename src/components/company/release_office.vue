<template>
    <div class="release_office" :class="{stop_scroll: scrollSign}">
      <div class="tal_msg_edit">
        <div class="com_det_title">
          <div class="content">
            发布职位
          </div>
        </div>
        <div class="tal_edit_det">
          <div class="edit_bottom">
            <div class="content">
              <div class="edit_cell border-none">
                <span class="edit_lab">职位名称</span><input type="text" maxlength="15" v-model="form.office_name" placeholder="请输入职位名称">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">招聘人数</span><input type="number" v-model="form.hire_num" placeholder="招聘人数，默认为“若干”">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作性质</span><span class="fr choose_group"><span class="choose_cell" nature-id="1" :class="{choose_active:this.JobNature == 1}" @click="nature_id">全职</span><span class="choose_cell" nature-id="2" :class="{choose_active:this.JobNature==2}" @click="nature_id">项目</span></span>
              </div>
              <div class="edit_cell db_special_cell">
                <span class="edit_lab">持证要求</span>
                <div class="block">
                  <div class="edit_cell border-none" @click="certType_choose">
                    <span class="edit_lab">{{tranCertType || '请选择证书类型'}}</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
                  </div>
                  <div class="edit_cell" @click="certMajor_choose">
                    <span class="edit_lab">{{tranCertMajor || '请选择证书专业'}}</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
                  </div>
                </div>
              </div>
              <div class="edit_cell special_cell ">
                <span class="edit_lab">工作地点</span><div class="comm_addr"><div class="comm_addr_cell" @click="choose_pro"><span class="place">{{tranPro || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_city"><span class="place">{{tranCity || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div><div class="comm_addr_cell" @click="choose_area"><span class="place">{{tranArea || '请选择'}}</span><img src="/static/images/font_down.png" alt=""></div></div>
                <input type="text" maxlength="20" v-model="form.tal_addr" placeholder="详细地址，如：街道、门牌号等">
              </div>
              <div class="edit_cell">
                <span class="edit_lab">薪资待遇</span><span opera-sign="salary" class="int_job_det fr" @click="operate">{{tranSalary || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">学历要求</span><span opera-sign="education" class="int_job_det fr" @click="operate">{{tranEdu || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">工作年限</span><span opera-sign="workexp" class="int_job_det fr" @click="operate">{{tranWorkexp || '请选择'}}<img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">性别限制</span><span class="fr choose_group la_choose_group"><span class="choose_cell" sex-id="0" :class="{choose_active:this.genderNum == 0}" @click="sex_id">不限</span><span class="choose_cell" sex-id="1" :class="{choose_active:this.genderNum == 1}" @click="sex_id">男</span><span class="choose_cell" :class="{choose_active:this.genderNum == 2}" sex-id="2" @click="sex_id">女</span></span>
              </div>
              <div class="edit_cell" @click="pos_adv">
                <span class="edit_lab">职位亮点</span><span class="int_job_det fr"><img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell" @click="pos_desc">
                <span class="edit_lab">职位描述</span><span class="int_job_det fr" ><img src="/static/images/ic_right@2x.png" alt=""></span>
              </div>
              <div class="edit_cell">
                <span class="edit_lab">加急招聘</span><span class="int_job_det fr" > <el-switch class="switch_btn" v-model="isUgent"></el-switch></span>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="bas_msg_btn" @click="release">
            发布
          </div>
        </div>
      </div>

      <!--职位亮点-->
      <div class="ent_intro" v-show="tagsSign">
        <div class="filter_s_title">
          <div class="content">
            <img @click="intro_back" src="/static/images/left.png" alt="left">职位亮点
          </div>
        </div>
        <div class="content">
          <p class="com_adv">选择职位亮点，提升职位吸引力，有效增加职位投递！ (最多可选择 8 个)</p>
          <span class="adv_cell" @click="choose_adv" :class="{adv_sign_active: item.choose != 1}" v-for="(item,index) in advData" :adv-id="item.id" :key="index">{{item.value}}</span>
        </div>
        <div class="bas_msg_btn" @click="intro_sub">
          确定
        </div>
      </div>
      <!--职位描述-->
      <div class="ent_intro" v-show="introSign">
        <div class="filter_s_title">
          <div class="content">
            <img @click="intro_back" src="/static/images/left.png" alt="left">职位描述
          </div>
        </div>
        <div class="content">
          <quill-editor id="desc" v-model="infoData.duty"
                        :options ="editorOption">
          </quill-editor>
        </div>
        <div class="bas_msg_btn" @click="intro_sub">
          确定
        </div>
      </div>
      <!--筛选第二层-->
      <div class="filter_all_box" v-show="this.secondBox">
        <div class="filter_bg" @click="secondBoxBg">

        </div>
        <div class="filter_det">
          <div class="filter_s_title">
            <div class="content">
              <img @click="secondBoxBg" src="/static/images/left.png" alt="left">{{top_title}}
            </div>
          </div>
          <div class="content">
            <div class="filter_part1">

              <!-- 薪资、教育、工作经验 -->
              <div v-if="basSign" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="operate_det">
                {{item.name}}<img v-show="comNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>

              <!-- 证书类型、专业 -->
              <div v-if="showMsg =='cert_type'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="CertCode">
                {{item.category}}<img v-show="certTypeNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'cert_major'" v-for="(item,index) in CommonData" :city-id="item.id" :key="index" class="filter_part1_cell second" @click="MajorCode">
                {{item.major}}<img v-show="certMajorNum == item.id" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>

              <!-- 地点选择 -->
              <div v-if="showMsg =='pro'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="ProCode">
                {{item}}<img v-show="infoData.province == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'city'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="CityCode">
                {{item}}<img v-show="infoData.city == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>
              <div v-if="showMsg == 'area'" v-for="(item,index) in addrData" :city-id="index" :key="index" class="filter_part1_cell second" @click="AreaCode">
                {{item}}<img v-show="infoData.area == index" class="fr" src="/static/images/ic_checked@2x.png" alt="">
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {tranProvince, tranCity, tranArea} from  '../../../static/js/distpicker'
  import {transWorkexp,transEducation,transSalary,transJobs} from '../../../static/js/common.js'
    export default {
      name: "release_office",
      data() {
        return {
          userMsg: {},
          secondBox: false,
          top_title: '',
          isUgent: true,
          scrollSign: false,
          cityCode: {},
          showMsg: '',
          beginData: {},
          id: 0,
          tagsSign: false,
          introSign: false,
          duty: '',
          //弹层数据标识、转换数据
          tranGender: '',
          certTypeNum: 0,
          tranCertType: '',
          certMajorNum: 0,
          tranCertMajor: '',
          comNum: 0,
          salaryNum: {
            salary: 0
          },
          tranSalary: '',
          educationNum: '',
          tranEdu: '',
          workexpNum: 0,
          tranWorkexp: '',
          tranPro: '',
          tranCity: '',
          tranArea: '',
          //性别、工作性质标识
          JobNature: 1,
          genderNum: 0,
          form: {
            office_name: '',
            hire_num: '',
            tal_addr: '',
            tal_state: 1,
            ugent: 0
          },
          //遍历数据
          advData:　{},
          CommonData: {},
          addrData: {},
          infoData: {},
          tagsNum: [],
          // 提交的数据
          subTags: [],
          // 名企标识
          has_m: 0,
          // 富文本
          editorOption: {
            modules:{
              toolbar: false
            },
          },
          sign: '',
          // 弹层显示标识
          certSign: false,
          basSign: false,
        }
      },
      methods: {
        // 基础弹层操作
        operate(e){
          this.showMsg = '';
          this.basSign = true;
          this.sign = e.currentTarget.getAttribute('opera-sign');
          switch (this.sign) {
            case 'salary':
              this.CommonData = transSalary(this.CommonData,3);
              this.top_title = '薪资待遇';
              this.comNum = this.salaryNum.salary;
              break;
            case 'education':
              this.top_title = '学历要求';
              this.CommonData = transEducation(this.CommonData,3);
              this.comNum = this.educationNum;
              break;
            case 'workexp':
              this.top_title = '工作年限';
              this.CommonData = transWorkexp(this.CommonData,3);
              this.comNum = this.workexpNum;
              break;
          }
          this.scrollSign = true;
          this.secondBox = true;
        },
        operate_det(e){
          switch (this.sign) {
            case 'salary':
              let salaryId = e.currentTarget.getAttribute('city-id');
              this.salaryNum.salary = salaryId;
              this.tranSalary = transSalary(salaryId,0);
              break;
            case 'education':
              let eduId = e.currentTarget.getAttribute('city-id');
              this.educationNum = eduId;
              this.tranEdu = transEducation(eduId,0);
              break;
            case 'workexp':
              let expId = e.currentTarget.getAttribute('city-id');
              this.workexpNum = expId;
              this.tranWorkexp = transWorkexp(expId,0);
              break;
          }
          this.scrollSign = false;
          this.secondBox = false;
          this.basSign = false;
        },
        // 证书弹层操作
        certType_choose(){
          let certData = JSON.parse(localStorage.getItem('CERT'));
          this.showMsg = 'cert_type';
          this.CommonData = certData;
          this.top_title = '选择证书类型';
          this.scrollSign = true;
          this.secondBox = true;
        },
        CertCode(e) {
          let certData = JSON.parse(localStorage.getItem('CERT'));
          let certId = e.currentTarget.getAttribute('city-id');
          this.certTypeNum = certId;
          this.tranCertMajor = '';
          this.secondBox = false;
          this.scrollSign = false;
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == certId) {
              this.tranCertType = certData[i].category;
            }
          }
        },
        certMajor_choose(){
          let certData = JSON.parse(localStorage.getItem('CERT'));
          this.showMsg = 'cert_major';
          this.top_title = '选择证书专业';
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeNum) {
              this.CommonData = certData[i].majors;
            }
          }
          this.scrollSign = true;
          this.secondBox = true;
        },
        MajorCode(e) {
          let certData = JSON.parse(localStorage.getItem('CERT'));
          let majorId = e.currentTarget.getAttribute('city-id');
          this.certMajorNum = majorId;
          this.secondBox = false;
          this.scrollSign = false;
          for (let i = 0,len = certData.length; i < len; i++) {
            if (certData[i].id == this.certTypeNum) {
              for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                if (certData[i].majors[j].id == majorId) {
                  this.tranCertMajor = certData[i].majors[j].major
                }
              }
            }
          }
        },
        release() {
          // 输入限制判断
          this.form.office_name = this.form.office_name.replace(/^\s*|\s*$/g,"");
          if (this.form.office_name == '') {
            this.$notify.warning({
              title: '提示',
              message: '职位名称不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.certTypeNum == '0') {
            this.$notify.warning({
              title: '提示',
              message: '请选择证书类型',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.certMajorNum == '0') {
            this.$notify.warning({
              title: '提示',
              message: '请选择证书专业',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranPro == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择省份',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranCity == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择城市',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.tranArea == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择地区',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.form.tal_addr == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写详细地址',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.salaryNum == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择薪资待遇',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.educationNum == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择学历要求',
              showClose: false,
              duration: 1500
            });
            return
          }
          if (this.duty == '') {
            this.$notify.warning({
              title: '提示',
              message: '请填写职位描述',
              showClose: false,
              duration: 1500
            });
            return
          }

          this.duty = this.duty.replace(/^\s*|\s*$/g,"");
          if (this.subTags == '') {
            this.$notify.warning({
              title: '提示',
              message: '请选择职位亮点',
              showClose: false,
              duration: 1500
            });
            return
          }

          if (this.form.hire_num == '' || this.form.hire_num == '若干') {
            this.form.hire_num = 0;
          }
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          this.form.ugent = this.isUgent == true?1:0;
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (this.id == 0 || this.id == undefined) {
            this.$ajax.post('/office/first-release',{office_name: this.form.office_name,has_m: this.has_m, cid: companyInfo.id,nature: this.JobNature,cert_categories_id: this.certTypeNum,cert_majors_id: this.certMajorNum,
              province: this.infoData.province,city: this.infoData.city,area: this.infoData.area,address: this.form.tal_addr,salary: this.salaryNum.salary,education: this.educationNum,work_exp: this.workexpNum,sex: this.genderNum,duty: this.duty,hire_num: this.form.hire_num,tags: this.subTags.join(','),is_urgent: this.form.ugent})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$notify.success({
                    title: '提示',
                    message: '发布成功',
                    showClose: false,
                    duration: 800
                  });
                  this.$indicator.close();
                  setTimeout(()=>{
                    this.$router.push({name: 'pos_manage'})
                  },1000)
                }
              })
          } else {
            this.$ajax.post('/office/edit',{id: this.id,has_m: this.has_m,office_name: this.form.office_name, cid: companyInfo.id,nature: this.JobNature,cert_categories_id: this.certTypeNum,cert_majors_id: this.certMajorNum,is_release: 1,
              province: this.infoData.province,city: this.infoData.city,area: this.infoData.area,address: this.form.tal_addr,salary: this.salaryNum.salary,education: this.educationNum,work_exp: this.workexpNum,sex: this.genderNum,duty: this.duty,hire_num: this.form.hire_num,tags: this.subTags.join(','),is_urgent: this.form.ugent})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$notify.success({
                    title: '提示',
                    message: '发布成功',
                    showClose: false,
                    duration: 800
                  });
                  this.$indicator.close();
                  setTimeout(()=>{
                    this.$router.push({name: 'pos_manage'})
                  },1000)
                }
              })
          }
        },
        secondBoxBg() {
          this.secondBox = false;
          this.scrollSign = false;
        },
        //工作性质选择
        nature_id(e) {
          this.JobNature = e.target.getAttribute('nature-id');
        },
        //性别限制选择
        sex_id(e) {
          this.genderNum = e.target.getAttribute('sex-id');
        },
        // 地址选择
        choose_pro() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'pro';
          this.top_title = '选择省份';
          this.addrData = tranProvince(this.infoData,true,'pro');
        },
        ProCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.province = cCode;
          this.tranPro = tranProvince(this.infoData.province,true,'',2);
          this.tranCity = '';
          this.tranArea = '';
          this.secondBox = false;
          this.scrollSign = false;
        },
        choose_city() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'city';
          this.top_title = '选择城市/地区';
          this.addrData = tranCity(this.infoData,true,2,'city');
        },
        CityCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.city = cCode;
          this.tranCity = tranCity(this.infoData,true,3);
          this.tranArea = '';
          this.secondBox = false;
          this.scrollSign = false;
        },
        choose_area() {
          this.scrollSign = true;
          this.secondBox = true;
          this.showMsg = 'area';
          this.top_title = '选择区/县';
          this.addrData = tranArea(this.infoData,true,5);
        },
        AreaCode(e) {
          let cCode = e.currentTarget.getAttribute('city-id');
          this.infoData.area = cCode;
          this.tranArea = tranArea(this.infoData,true,3);
          this.secondBox = false;
          this.scrollSign = false;
        },
        // 描述、亮点返回
        intro_back() {
          if (this.introSign) {
            this.introSign = false;
          }else {
            this.tagsSign = false;
          }
          this.scrollSign = false;
        },
        // 职位描述、职位亮点确定
        intro_sub() {
          if (this.introSign) {
            this.duty = this.infoData.duty;
            this.introSign = false;
          }else {
            this.subTags = this.tagsNum;
            this.tagsSign = false;
          }
          this.scrollSign = false;
        },
        // 职位描述
        pos_desc() {
          this.scrollSign = true;
          this.introSign = true;
        },
        // 职位亮点
        pos_adv(){
          this.scrollSign = true;
          this.tagsSign = true;
        },
        // 选择职位亮点
        choose_adv(e) {
          let adv_sign = e.currentTarget.getAttribute('adv-id');
          for (let i = 0,len = this.advData.length;i < len;i++){
            if (this.advData[i].id == adv_sign) {
              if (this.advData[i].choose == 1) {
                this.$set(this.advData,i,{choose: 0,id: adv_sign,type: this.advData[i].type,salary: this.advData[i].salary,value: this.advData[i].value});
                this.advData[i].choose = 0;
                for (let j = 0,nlen = this.tagsNum.length;j < nlen;j++){
                  if (this.tagsNum[j] == adv_sign){
                    this.tagsNum.splice(j,1);
                  }
                }
              } else{
                if (this.tagsNum.length > 7){
                  this.$notify.warning({
                    title: '提示',
                    message: '最多可以选择8个优势',
                    showClose: false,
                    duration: 1500
                  });
                } else {
                  this.$set(this.advData,i,{choose: 1,id: adv_sign,type: this.advData[i].type,salary: this.advData[i].salary,value: this.advData[i].value});
                  // this.advData[i].choose = 1;
                  this.tagsNum.push(adv_sign);
                }
              }
            }
          }
        },
      },
      created() {
          this.advData = JSON.parse(localStorage.getItem('COMPANYTAGS'));
          let certData = JSON.parse(localStorage.getItem('CERT'));
          if (!certData) {
            this.$ajax.get('/allcerts')
              .then((res)=>{
                certData = res.data;
                //  放入本地数据
                let params = {};
                params = JSON.stringify(res.data);
                localStorage.setItem('CERT',params);
                sessionStorage.setItem('CERT',params);
              })
          }
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        // 获取是否为名企
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
              this.has_m = res.data.has_m;
          });
        this.id = this.$route.query.id;
        // id不为0 职位编辑
        if (this.id != 0 || this.id != undefined) {
            // 获取职位列表
            this.$ajax.get('/office/management',{params: {cid: companyInfo.id}})
              .then((res)=>{
                if (res.data.state != 400) {
                  for (let i = 0,len = res.data.length;i < len;i++) {
                    if (res.data[i].id == this.id) {
                      this.infoData.province = res.data[i].province;
                      this.tranPro = tranProvince(this.infoData.province,true,'',2);
                      this.infoData.city = res.data[i].city;
                      this.tranCity = tranCity(this.infoData,true,3);
                      this.infoData.area = res.data[i].area;
                      this.tranArea = tranArea(this.infoData,true,3);
                      this.duty = this.infoData.duty = res.data[i].duty;
                      this.form.office_name = res.data[i].office_name;
                      this.form.tal_addr = res.data[i].address;
                      this.form.hire_num = res.data[i].hire_num == 0?'若干':res.data[i].hire_num;
                      this.certTypeNum = res.data[i].cert_categories_id;
                      let tags = res.data[i].tags.split(',');
                      this.advData.forEach((item)=>{
                        for (let k = 0,len = tags.length;k < len;k++) {
                          if (tags[k] == item.id) {
                            item.choose = 1;
                          }
                        }
                      });
                      for (let i = 0,len = certData.length; i < len; i++) {
                        if (certData[i].id == this.certTypeNum) {
                          this.tranCertType = certData[i].category;
                        }
                      }
                      this.certMajorNum = res.data[i].cert_majors_id;
                      for (let i = 0,len = certData.length; i < len; i++) {
                        if (certData[i].id == this.certTypeNum) {
                          for (let j = 0,leng = certData[i].majors.length;j < leng; j++) {
                            if (certData[i].majors[j].id == this.certMajorNum) {
                              this.tranCertMajor = certData[i].majors[j].major
                            }
                          }
                        }
                      }
                      this.JobNature = res.data[i].nature;
                      this.salaryNum.salary = res.data[i].salary;
                      this.tranSalary = transSalary(res.data[i].salary,0);
                      this.educationNum = res.data[i].education;
                      this.tranEdu = transEducation(this.educationNum,0);
                      this.workexpNum = res.data[i].work_exp;
                      this.tranWorkexp = transWorkexp(this.workexpNum,0);
                      this.isUgent = res.data[i].is_urgent == 1?true:false;
                      this.genderNum = res.data[i].sex;
                    }
                   }
                }
              })
          }
      }
    }
</script>

<style scoped>
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
    margin-top: 10px;
    background-color: #ffffff;
  }
  .top_pic img {
    width: 70px;
    height: 95px;
  }
  .top_msg{
    margin-left: 15px;
    padding-top: 15px;
    color: #919199;
  }
  .top_msg p{
    margin-top: 15px;
    line-height: 18px;
  }
  .upload_btn{
    display: inline-block;
    margin-top: 10px;
    /*width: 80px;
    line-height: 30px;
    text-align: center;

    */
  }
  .upload_btn .el-button{
    color: #ffffff;
    background-color: #ff8236;
    border-color: #ff8236;
  }
  .upload_btn .el-upload__tip{
    color: #919199;
    font-size: 12px;
  }
  .upload_btn .el-upload-list--none{
    display: none;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px solid #E1E4E6;
    font-size: 14px;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 80px;
    color: #353535;
  }
  .edit_cell input{
    display: inline-block;
    padding-left: 10px;
    width: 65%;
    line-height: 32px;
    border: none;
    color: #666666;
  }
  .edit_cell input ::placeholder{
    color: #c2c2cc;
  }
  .edit_cell input:focus{
    outline: none;
  }
  .choose_group{
    display: inline-block;
    margin-top: 10px;
    width: 65%;
    text-align: right;
    line-height: 24px;
  }
  .choose_cell{
    display: inline-block;
    margin-left: 10px;
    width: 60px;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 12px;
    color: #919199;
    background-color: #ffffff;
  }
  .choose_active{
    color: #5082e6;
    background:rgba(80,130,230,.2);
  }
  .int_job_det{
    color: #919199;
  }
  .int_job_det img{
    margin-left: 10px;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
  .db_special_cell{
    display: flex;
    justify-content: start;
  }
  .db_special_cell span{
    line-height: 88px;
  }
  .db_special_cell .block{
    flex-grow: 1;
    /*width: 65%;*/
  }
  .db_special_cell .block span{
    line-height: 44px;
  }
  .db_special_cell .block .edit_lab{
    color: #919199;
    width: 80%;
  }
  .la_choose_group{
    width: 72%;
  }
  .border-none{
    border: none;
  }
  .special_cell input{
    width: 90%;
    padding-left: 15px;
    margin-bottom: 20px;
    border: 1px solid #E1E4E6;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  /*筛选弹层*/
  .filter_all_box{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    /*overflow-y: scroll;*/
    z-index: 9999999;
  }
  .filter_bg{
    width: 10%;
    height: 100vh;
    background: rgba(0,0,0,.5);
  }
  .filter_det{
    width: 90%;
    height: 100vh;
    overflow-y: scroll;
    background-color: #ffffff;
  }
  .filter_part1_cell{
    line-height: 44px;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #EAEAEA;
    color: #353535;
  }
  .filter_part1_cell span{
    color: #919199;
  }
  .filter_part1_cell img{
    margin-left: 5px;
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  /*第二层*/
  .filter_s_title{
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    color: #353535;
    border-bottom: 1px solid #E1E4E6;
  }
  .filter_s_title img{
    margin-right: 15px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .second{
    color: #919199;
  }
  .second img{
    padding-top: 14px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  /*职位描述*/
  .ent_intro{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
  }
  .ent_intro .filter_s_title{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .ent_intro textarea{
    width: 90%;
    min-height: 130px;
    height: 400px;
    padding: 15px;
    font-size: 14px;
    color: #919199;
    border: none;
  }
  .ent_intro textarea::placeholder{
    font-size: 14px;
    color: #c2c2cc;
  }
  .ent_intro textarea:focus{
    outline: none;
  }
  /* 职位亮点样式 */
  .com_adv{
    padding: 15px 0;
    line-height: 18px;
    font-size: 12px;
    color: #ff8236;
  }
  .adv_cell{
    display: inline-block;
    padding: 0 13px;
    line-height: 30px;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background-color: #dce6fa;
    color: #5082e6;
    font-size: 12px;
  }
  .adv_sign_active{
    background-color: #ffffff;
    color: #919199;
    line-height: 28px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #919199;
  }
  #desc{
    margin-top: 15px;
  }
</style>
