import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../components/index'
import user_reg from '../components/reg_log/user_reg'
import user_login from '../components/reg_log/user_login'
//公共组件
import find_job from '../components/com_part/find_job'
import famous_pos from '../components/com_part/famous_pos'
import company_det from '../components/com_part/company_det'
import pos_det from '../components/com_part/pos_det'
import success_page from '../components/com_part/success_page'
import account_manage from '../components/com_part/account_manage'

//个人中心页面
import tal_center from '../components/talent/tal_center'
import tal_resume from '../components/talent/tal_resume'
import tal_bas_msg from '../components/talent/tal_bas_msg'
import tal_del_col from '../components/talent/tal_del_col'
import int_job from '../components/talent/int_job'
import tal_invited from '../components/talent/tal_invited'
import tal_invited_det from '../components/talent/tal_invited_det'
import self_eval from '../components/talent/self_eval'
import tal_work from '../components/talent/tal_work'
import tal_privacy from '../components/talent/tal_privacy'

//个人中心组件
import main_menu from '../components/common/main_menu'

Vue.use(Router);



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user_reg',
      name: 'user_reg',
      component: user_reg
    },
    {
      path: '/user_login',
      name: 'user_login',
      component: user_login
    },
    {
      path: '/find_job',
      name: 'find_job',
      component: find_job
    },
    {
      path: '/famous_pos',
      name: 'famous_pos',
      component: famous_pos
    },
    {
      path: '/success_page',
      name: 'success_page',
      component: success_page
    },
    {
      path: '/account_manage',
      name: 'account_manage',
      component: account_manage
    },
    {
      path: '/company_det',
      name: 'company_det',
      component: company_det
    },
    {
      path: '/pos_det',
      name: 'pos_det',
      component: pos_det
    },
    {
      path: '/tal_center',
      name: 'tal_center',
      component: tal_center
    },
    {
      path: '/tal_resume',
      name: 'tal_resume',
      component: tal_resume
    },
    {
      path: '/tal_bas_msg',
      name: 'tal_bas_msg',
      component: tal_bas_msg
    },
    {
      path: '/tal_del_col',
      name: 'tal_del_col',
      component: tal_del_col
    },
    {
      path: '/tal_work',
      name: 'tal_work',
      component: tal_work
    },
    {
      path: '/int_job',
      name: 'int_job',
      component: int_job
    },
    {
      path: '/tal_invited',
      name: 'tal_invited',
      component: tal_invited
    },
    {
      path: '/tal_invited_det',
      name: 'tal_invited_det',
      component: tal_invited_det
    },
    {
      path: '/self_eval',
      name: 'self_eval',
      component: self_eval
    },
    {
      path: '/tal_privacy',
      name: 'tal_privacy',
      component: tal_privacy
    },
    {
      path: '/main_menu',
      name: 'main_menu',
      component: main_menu
    }
  ]
})
