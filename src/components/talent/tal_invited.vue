<template>
  <!--面试邀请记录-->
    <div class="invited">
      <div class="com_det_title">
        <div class="content">
          面试邀请
        </div>
      </div>
      <div class="invited_body">
        <div class="content">
          <div class="invited_cell"  v-for="(item,index) in invitedData" :int-id="item.id" :key="index" @click="invited_det">
            <span class="new_sign" v-show="item.isRead == 0"></span>您收到一份来自“{{item.name}}”的面试邀请
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
      name: "tal_invited",
      data() {
          return {
            emptySign: false,
            invitedData: {},
            inviteData: {}
          }
      },
      methods: {
        invited_det(e) {
          let id = e.currentTarget.getAttribute('int-id');
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/personal/interview/setread',{id: id,uid: userInfo.id})
            .then((res)=>{

            });
          this.$router.push({name: 'tal_invited_det',query: {id: id}})
        }
      },
      created() {
        let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/personal/interview',{params: {uid: userInfo.id}})
          .then((res)=>{
            let rdata = {};
            if (res.data != '') {
              this.inviteData = res.data;
              for (let i = 0,len = res.data.length; i < len;i++) {
                rdata[i] = res.data[i].company;
                rdata[i].id = res.data[i].id;
                rdata[i].isRead = res.data[i].user_is_read
              }
              this.invitedData = rdata;
              this.emptySign = false;
            }else {
              this.emptySign = true;
            }
          })
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
