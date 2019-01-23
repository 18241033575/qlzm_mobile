<template>
      <!--名企招聘-->
    <div class="famous_pos" :class="{stop_scroll: this.openState}">
      <div class="famous">
        <div class="famous_pos_title">
          <div class="content">
            名企招聘
          </div>
        </div>
        <!--可以提取出来公共部分-->
        <div class="famous_body">
          <div class="content">
            <div class="famous_cell" :cid="item.cid" :company-id="item.id" v-for="(item,index) in famData" :key="index" @click="to_comDetail">
              <div class="famous_head fl">
                <img :src="item.logo" alt="">
              </div>
              <div class="famous_msg fl">
                <div class="famous_name">
                  {{item.name}}
                </div>
                <p>招聘职位<span>&nbsp;&nbsp;{{item.offices.length}}个</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <menu_list_pic ref="menu_list_pic" :give_pic="this.openState" v-show="!this.openState" v-on:sendIsopen="getIsopen"/>
      <main_menu ref="main_menu" :give_shade="this.openState" v-on:give_sign="get_sign"/>
    </div>
</template>

<script>
  import main_menu from '../../components/common/main_menu'
  import menu_list_pic from '../../components/common/menu_list_pic'
  import {splicLogo} from '../../../static/js/common.js'
    export default {
        name: "famous_pos",
      components: {
        main_menu,
        menu_list_pic
      },
      data() {
          return {
            /*总菜单状态*/
            openState: false,
            famData: {},
            pages: 1
          }
      },
      created() {
          this.$ajax.get('/company/famous',{params:{page: this.pages +1, rows: 6}})
            .then((res)=>{
              if(res.data.state != 400) {
                splicLogo(res.data);
                this.famData = res.data
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
        to_comDetail(e) {
          //company-id
          let id = e.currentTarget.getAttribute('cid');
          this.$router.push({name: 'company_det',query:{id: id}})
        }
      }
    }
</script>

<style scoped>
  /*名企招聘*/
  .famous_pos{
    background-color: #f0f1f5;
  }
  .famous_pos_title{
    width: 100%;
    line-height: 44px;
    margin-bottom: 15px;
    font-size: 16px;
    color: #353535;
    font-weight: bold;
    background-color: #ffffff;
  }
  .famous{
    margin-top: 0;
    background-color: #f0f1f5;
  }
  .famous_body{
    background-color: #ffffff;
  }
  .famous_cell{
    display: flex;
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #E1E4E6;
  }
  .famous_head{
    justify-content: start;
    margin-bottom: 15px;
    width: 60px;
    height: 60px;
  }
  .famous_head img{
    width: 100%;
    height: 100%;
    -webkit-border-radius: 10000px;
    -moz-border-radius: 10000px;
    border-radius: 10000px;
  }
  .famous_msg{
    flex-grow: 1;
    padding-left: 20px;
    color: #666666;
  }
  .famous_name{
    font-size: 14px;
    font-weight: bold;
  }
  .famous_msg p{
    margin-top: 12px;
    font-size: 12px;
  }
  .famous_msg p span{
    color: #ff8236;
  }
</style>
