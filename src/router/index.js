import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '../components/index'
import user_reg from '../components/reg_log/user_reg'
import user_login from '../components/reg_log/user_login'


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
    }
  ]
})
