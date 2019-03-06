<template>
    <!--消息-->
  <div class="sys_msg" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "sys_msg",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
        return {
          /*总菜单状态*/
          openState: false,
          msgData: {

          },
          inviteData: {

          }
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
        msg_det(e) {
          let id = e.currentTarget.getAttribute('int-id');
          let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
         /* let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/personal/interview/setread',{id: id,uid: userInfo.id})
            .then((res)=>{

            });*/
         this.$ajax.post('/message/setisread',{member: 2,msg_id: id,cid: companyInfo.id})
           .then((res)=>{
             if (res.data.state == 200) {
               this.$router.push({name: 'sys_msg_det',query: {id: id}});
             }
           })

        }
      },
      created() {
        /*let userInfo = JSON.parse(localStorage.getItem('USER'));
        this.$ajax.get('/personal/sysmsg',{params: {uid: userInfo.id}})
          .then((res)=>{
            let rdata = {};
            if (res.data.state != 400) {
              this.inviteData = res.data;
              for (let i = 0,len = res.data.length; i < len;i++) {
                rdata[i] = res.data[i].company;
                rdata[i].id = res.data[i].id;
                rdata[i].isRead = res.data[i].user_is_read
              }
              this.invitedData = rdata;
            }
          })*/
        let companyInfo = JSON.parse(localStorage.getItem('COMPANY'));
        this.$ajax.get('/company/get-messages',{params: {cid: companyInfo.id}})
          .then((res)=>{
            console.log(res);
            // let rdata = {};
            if (res.data.state != 400) {
              this.msgData = res.data;
              /* for (let i = 0,len = res.data.length; i < len;i++) {
                 rdata[i] = res.data[i].company;
                 rdata[i].id = res.data[i].id;
                 rdata[i].isRead = res.data[i].user_is_read
               }
               this.invitedData = rdata;*/
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
