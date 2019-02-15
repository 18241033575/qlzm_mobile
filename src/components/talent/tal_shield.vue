<template>
    <!--屏蔽企业-->
  <div class="tal_shield" :class="{stop_scroll: this.openState}">
    <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
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
    <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
  </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
    export default {
        name: "tal_shield",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            shieldSignState: true,
            company_name: '',
            shieldData: {

            }
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
        addShield() {
          this.shieldSignState = false
        },
        cancel() {
          this.shieldSignState = true
        },
        shield_save() {
          let userInfo = JSON.parse(localStorage.getItem('USER'));
          this.$ajax.post('/personal/shield',{uid: userInfo.id,company: this.company_name})
            .then((res)=>{
              if (res.data) {

                this.company_name = '';
                window.location.reload()
              }
            })
        },
        shield_cancel(e) {
          let id = e.target.getAttribute('id');
          let uid = e.target.getAttribute('uid');
          console.log(id);
          this.$ajax.post('personal/shield',{id: id,uid: uid})
            .then((res)=>{
              console.log(res);
              window.location.reload()
            })
        }
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
