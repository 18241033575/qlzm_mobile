import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../components/index'
import user_reg from '../components/reg_log/user_reg'
import user_login from '../components/reg_log/user_login'
import find_job from '../components/com_part/find_job'
import famous_pos from '../components/com_part/famous_pos'
import company_det from '../components/com_part/company_det'
import pos_det from '../components/com_part/pos_det'


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
      path: '/company_det',
      name: 'company_det',
      component: company_det
    },
    {
      path: '/pos_det',
      name: 'pos_det',
      component: pos_det
    }
  ]
})
