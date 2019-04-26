<template>
      <!--全部职位-->
    <div class="all_pos">
      <div class="com_det_title">
        <div class="content">
          全部职位
        </div>
      </div>
      <div class="all_pos_box">
        <div class="list">
          <div class="content">
            <div class="list_cell" :class="{selected: category == item.id}" v-for="(item,index) in this.allPosData" :key="index" :data-id="item.id" @click="chooseType">
              {{item.category}}
            </div>
          </div>
        </div>
        <div class="list major_list">
          <div class="content">
            <div v-show="category != 0" class="list_cell" @click="chooseMajor">
              全部
            </div>
            <div class="list_cell" :class="{selected: category == item.id}" v-for="(item,index) in this.MajorPosData" :key="index" :data-id="item.id" @click="chooseMajor">
              {{item.major}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "all_pos",
      data () {
        return {
          /*总菜单状态*/
          openState: false,
          allPosData: {},
          MajorPosData: {},
          category: 0,
          major: 0,
        }
      },
      methods: {
        chooseType(e){
          this.category = e.currentTarget.getAttribute('data-id');
          this.allPosData.forEach((item)=>{
            if (item.id == this.category) {
              this.MajorPosData = item.majors;
            }
          });
        },
        chooseMajor(e){
          this.major = e.currentTarget.getAttribute('data-id');
          this.$router.push({name: 'find_job',query: {category: this.category,major: this.major}})
        }
      },
      created() {
        this.allPosData = JSON.parse(localStorage.getItem('CERT'));
      }
    }
</script>

<style scoped>
  .all_pos .com_det_title{
    background-color: #eaeaea;
  }
  .all_pos_box{
    display: flex;
  }
  .list{
    width: 40%;
    font-weight: bold;
    color: #666666;
    font-size: 14px;
    line-height: 44px;
    background-color: #F9F9F9;
  }
  .major_list{
    width: 60%;
    background-color: #ffffff;
  }
  .list_cell{
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .selected{
    background-color: #fff;
  }
</style>
