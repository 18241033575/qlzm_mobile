<template>
    <!--消息-->
  <div class="sys_msg">
    <div class="com_det_title">
      <div class="content">
        消息
      </div>
    </div>
    <div class="invited_body">
      <div class="content">
        <div class="invited_cell"  v-for="(item,index) in msgData" :int-id="item.id" :key="index" @click="msg_det">
          <span class="new_sign" v-show="item.is_looked == 0"></span>{{item.title || '系统消息'}}
        </div>
      </div>
    </div>
    <div class="empty" v-show="emptySign">
      <img src="/static/images/ic_empty_data@2x.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "sys_msg",
      data() {
        return {
          emptySign: false,
          msgData: {},
          inviteData: {}
        }
      },
      methods: {
        msg_det(e) {
          let id = e.currentTarget.getAttribute('int-id');
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
          if (companyInfo) {
            this.$ajax.post('/message/setisread',{member: 2,msg_id: id,cid: companyInfo.id})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'sys_msg_det',query: {id: id}});
                }
              })
          }
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          if (userInfo) {
            this.$ajax.post('/message/setisread',{member: 1,msg_id: id,uid: userInfo.id})
              .then((res)=>{
                if (res.data.state == 200) {
                  this.$router.push({name: 'sys_msg_det',query: {id: id}});
                }
              });
          }
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        if (userInfo) {
          this.$ajax.get('/personal/sysmsg',{params: {uid: userInfo.id}})
            .then((res)=>{
              if (res.data) {
                this.msgData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            });
        }
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        if (companyInfo) {
          this.$ajax.get('/company/get-messages',{params: {cid: companyInfo.id}})
            .then((res)=>{
              if (!res.data) {
                this.msgData = res.data;
                this.emptySign = false;
              }else {
                this.emptySign = true;
              }
            })
        }
      },
    }
</script>

<style scoped>
  .invited_body{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .invited_cell{
    padding: 15px 0;
    font-size: 14px;
    color: #666666;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .new_sign{
    display: inline-block;
    margin: 0 2px 0 4px;
    line-height: 14px;
    vertical-align: middle;
    width: 5px;
    height: 5px;
    background-color: #ff5959;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
</style>
