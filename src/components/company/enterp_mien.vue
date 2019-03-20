<template>
  <!--企业风采-->
    <div class="enterp_mien">
      <div class="com_det_title">
        <div class="content">
          企业风采
        </div>
      </div>
      <div class="mien_det">
        <div class="content">
          <div class="mien_btn">
            <el-upload
              :disabled="this.limits"
              class="avatar-uploader upload_btn"
              :action="this.loadAddr"
              list-type="none"
              :data="{type: 'image'}"
              :show-file-list="false"
              :on-success="upMienPic">
              <el-button size="small" type="primary">上传图片</el-button>
              <div slot="tip" class="el-upload__tip">支持JPG、PNG,大小不要超过2MB,最多可上传8张！</div>
            </el-upload>
          </div>
          <div class="mien_pic_cell" v-for="(item,index) in infoData" :key="index">
            <img class="mien_pic" :src="item" alt="">
            <img class="mien_pic_del" :data-id="index" src="/static/images/ic_cm_delete@2x.png" alt="" @click="pic_del">
          </div>
        </div>
      </div>
      <div class="enterp_button" @click="mien_save">
        保存
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {splicPic,file_upload} from '../../../static/js/common.js'
    export default {
        name: "enterp_mien",
      components: {
        main_menu,
        menu_list_pic,
      },
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          loadAddr: '',
          limits: false,
          mienData: {},
          infoData: {},
          upLoadData: {}
        }
      },
      methods: {
        /*总菜单操作s*/
        get_sign(data) {
          this.openState = !data;
        },
        getIsopen(data) {
          this.openState = data;
        },
        /*总菜单操作e*/
        pic_del(e) {
          let picId = e.currentTarget.getAttribute('data-id');
          // console.log(picId);
          this.infoData.splice(picId,1);
          this.mienData.splice(picId,1);
          if (this.mienData.length < 8) {
            this.limits = false;
          }
        },
        mien_save() {
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          this.upLoadData.cid = companyInfo.id;
          this.upLoadData.style = this.mienData;
          this.$ajax.post('/company/style-set',this.upLoadData)
            .then((res)=>{
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '保存成功',
                  showClose: false,
                  duration: 1500
                });
              } else {
                this.$notify.error({
                  title: '提示',
                  message: res.data.msg,
                  showClose: false,
                  duration: 1500
                });
              }
            })
        },
        upMienPic(res) {
          Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
          });
          if (res.code == 200) {
            let url = res.data.success[0].url;
            this.infoData.push(splicPic(url,true));
            this.mienData.push(url);
            if (this.mienData.length > 7) {
              this.limits = true;
            }
            Indicator.close();
          }
        },

      },
      created() {
        this.loadAddr = file_upload();
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-info',{params: {cid: companyInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              this.mienData = JSON.parse(res.data.style);
              this.infoData = JSON.parse(res.data.style);
              for (let i = 0,len = this.infoData.length;i < len;i++) {
                this.infoData[i] = splicPic(this.infoData[i],true);
              }
            }
          })
      }
    }
</script>

<style scoped>
  .mien_det{
    margin-top: 10px;
    background-color: #ffffff;
    margin-bottom: 44px;
    padding-bottom: 15px;
  }
  .mien_btn{
    padding-top: 15px;
    height: 70px;
    text-align: center;
    /*-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;*/
  }
  .upload_btn{
    font-size: 14px;
    color: #5082e6;
    font-weight: bold;
    line-height: 14px;
  }
  .upload_tips{
    margin-top: 10px;
    font-size: 12px;
    color: #919199;
    line-height: 12px;
  }
  .mien_pic_cell{
    position: relative;
    width: 100%;
    height: 120px;
    padding-top: 15px;
  }
  .mien_pic{
    width: 100%;
    height: 120px;
  }
  .mien_pic_del{
    position: absolute;
    top: 25px;
    right: 10px;
    width: 36px;
    height: 36px;
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
</style>
