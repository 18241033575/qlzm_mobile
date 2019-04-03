<template>
  <!--企业认证-->
    <div class="enterp_ident">
      <div class="com_det_title">
        <div class="content">
          企业认证
        </div>
      </div>
      <div class="exp_edit_list">
        <div class="content">
          <div class="edit_cell">
            <span class="edit_lab">企业名称</span><input type="text" :readonly="true"  v-model="entName" placeholder="企业名称">
          </div>
          <div class="edit_cell">
            <span class="edit_lab">营业执照</span><span class="fr uppic_ident" @click="uploadLicense" v-show="identData.state == -1 && !uploadSign">
            <el-upload
            class="avatar-uploader upload_btn"
            :action="this.loadAddr"
            list-type="none"
            :data="{type: 'image'}"
            :show-file-list="false"
            :on-success="uploadLicense">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </span><span class="fr uppic_ident" v-show="identData.state == -1 && uploadSign">
            <el-upload
              class="avatar-uploader upload_btn"
              :action="this.loadAddr"
              list-type="none"
              :data="{type: 'image'}"
              :show-file-list="false"
              accept=".jpg,.jpeg,.png,.gif,.bmp"
              :on-success="uploadLicense">
              <el-button size="small" type="primary">重新上传</el-button>
            </el-upload>
          </span><span class="fr uppic_ident" v-show="identData.state == -2">认证中</span><span class="fr idented" v-show="identData.state == 1"><img src="/static/images/ic_cm_auth.png" alt="">已认证</span>
          </div>
          <div class="ident_img">
            <img v-show="identData.state != -1 || identData.state != 0 || uploadSign" class="license" :src="identData.license" alt="">
            <img v-show="identData.state == 0 && !uploadSign" src="/static/images/ic_cm_pic@2x.png" alt="">
            <p v-show="identData.state == 0 && !uploadSign">支持JPG、PNG，大小不要超过2MB！</p>
          </div>
        </div>
      </div>
      <div class="enterp_button" v-show="identData.state == -1" @click="submitLicense">
        提交认证
      </div>
    </div>
</template>

<script>
  import {splicPic,file_upload} from '../../../static/js/common.js'
    export default {
      name: "enterp_ident",
      data () {
        return {
          uploadSign: false,
          loadAddr: '',
          upSign: false,
          licenseUrl: '',
          entName: '',
          identData: {},
          companyInfo: {}
        }
      },
      methods: {
        uploadLicense(res) {
          if (res.code == 200) {
            let url = res.data.success[0].url;
            this.licenseUrl = url;
            this.identData.license = (splicPic(url,true));
            this.uploadSign = true;
          }
        },
        submitLicense() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.$ajax.post('/company/auth-set',{cid: companyInfo.id,license: this.licenseUrl})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '提交成功',
                  showClose: false,
                  duration: 1500
                });
                this.identData.state = -2;
              }else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        }
      },
      created() {
        this.loadAddr = file_upload();
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.companyInfo = companyInfo;
        this.$ajax.get('/company/get-auth',{params: {cid: companyInfo.id}})
          .then((res)=>{
            this.licenseUrl = res.data.license;
            res.data.license = splicPic(res.data.license,true)=='//file.wiiwork.com/'?'':splicPic(res.data.license,true);
            this.identData = res.data;
            console.log(this.identData);
          });
        this.$ajax.get('/company/base',{params:{cid: companyInfo.id}})
          .then((res)=>{
            this.entName = res.data.name;
          })
      }
    }
</script>

<style scoped>
  .exp_edit_list{
    margin-top: 10px;
    background-color: #ffffff;
    padding-bottom: 15px;
  }
  .edit_cell {
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
    font-size: 14px;
    font-weight: bold;
  }
  .edit_cell .edit_lab {
    display: inline-block;
    width: 90px;
    color: #919199;
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
  .enterp_button{
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 44px;
    text-align: center;
    color: #ffffff;
    background-color: #5082e6;
    font-size: 14px;
  }
  .uppic_ident{
    font-size: 14px;
    color: #5082e6;
  }
  .uppic_ident img{
    width: 13px;
    height: 14px;
    vertical-align: middle;
  }
  .ident_img{
    position: relative;
    width: 100%;
    height: 180px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #E1E4E6;
    border-top: none;
    background-color: #f9f9f9;
    text-align: center;
  }
  .ident_img img{
    margin-top: 44px;
    width: 53px;
    height: 53px;
  }
  .ident_img .license{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0;
    width: 100%;
    height: 180px;
  }
  .ident_img p{
    margin-top: 15px;
    font-size: 12px;
    color: #919199;
  }
  .idented{
    font-size: 14px;
    color: #ff8236;
  }
  .idented img{
    margin-right: 5px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
</style>
