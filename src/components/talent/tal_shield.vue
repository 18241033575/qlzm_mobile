<template>
    <!--屏蔽企业-->
  <div class="tal_shield">
    <div class="com_det_title">
      <div class="content">
        屏蔽企业
      </div>
    </div>
    <div class="add_item">
      <p v-show="this.shieldSignState" @click="addShield"><img src="/static/images/ic_add_item@2x.png" alt=""><span>添加屏蔽企业</span></p>
      <div class="opera" v-show="!this.shieldSignState"><input type="text" placeholder="请输入完整的公司名称" v-model="company_name"> <span @click="shield_save">保存</span><span @click="cancel">取消</span></div>
    </div>
    <div class="shield_list">
      <div class="content">
        <ul>
          <li v-for="(item,index) in shieldData" :key="index">{{item.company}}<span :uid="item.uid" :id="item.id" class="fr" @click="shield_cancel">取消屏蔽</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "tal_shield",
      data() {
          return {
            shieldSignState: true,
            company_name: '',
            shieldData: {},
          }
      },
      methods: {
        addShield() {
          this.shieldSignState = false
        },
        cancel() {
          this.shieldSignState = true
        },
        shield_save() {
          this.company_name = this.company_name.replace(/^\s*|\s*$/g,"");
          if (this.company_name == '') {
            this.$notify.warning({
              title: '提示',
              message: '公司名称不能为空',
              showClose: false,
              duration: 1500
            });
            return
          }
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/personal/shield',{uid: userInfo.id,company: this.company_name})
            .then((res)=>{
              if (res.data) {
                if (this.company_name == '') {
                  this.$notify.success({
                    title: '提示',
                    message: '保存成功',
                    showClose: false,
                    duration: 1500
                  });
                  return
                }
                this.shieldData.unshift({company: this.company_name,id: res.data,uid: userInfo.id});
                this.company_name = '';
              }
              this.$indicator.close();
            })
        },
        shield_cancel(e) {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let id = e.target.getAttribute('id');
          let uid = e.target.getAttribute('uid');
          this.$ajax.post('personal/shield',{id: id,uid: uid})
            .then((res)=>{
              if (res.data.state == 200) {
                this.$notify.success({
                  title: '提示',
                  message: '取消成功',
                  showClose: false,
                  duration: 1500
                });
                for (let i = 0,len = this.shieldData.length; i < len;i++) {
                  if (this.shieldData[i].id == id) {
                    // 删除相应数组
                    this.shieldData.splice(i,1);
                  }
                }
              }
              this.$indicator.close();
            })
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/personal/shield',{params:{uid: userInfo.id}})
          .then((res)=>{
            if(res.data.state != 400) {
              this.shieldData = res.data;
            }
          })
      }
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
  .add_item input{
    vertical-align: middle;
    height: 26px;
    padding: 0 10px;
    color: #919199;
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
  .add_item .opera span{
    display: inline-block;
    margin-left: 5px;
    width: 50px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
    background-color: #5082e6;
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
