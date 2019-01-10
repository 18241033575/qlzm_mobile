import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../components/index'
import user_reg from '../components/reg_log/user_reg'
import user_login from '../components/reg_log/user_login'
import find_job from '../components/com_part/find_job'
import famous_pos from '../components/com_part/famous_pos'


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
    }
  ]
})
