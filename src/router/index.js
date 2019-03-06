import Vue from 'vue'
import Router from 'vue-router'

//注册、登录、主页
import index from '@/components/index'
import user_reg from '@/components/reg_log/user_reg'
import enterp_reg from '@/components/reg_log/enterp_reg'
import reg_type_choose from '@/components/reg_log/reg_type_choose'
import login from '@/components/reg_log/login'



//公共组件
import find_job from '@/components/com_part/find_job'
import famous_pos from '@/components/com_part/famous_pos'
import company_det from '@/components/com_part/company_det'
import pos_det from '@/components/com_part/pos_det'
import success_page from '@/components/com_part/success_page'
import account_manage from '@/components/com_part/account_manage'
import change_phone from '@/components/com_part/change_phone'
import change_password from '@/components/com_part/change_password'
import news from '@/components/com_part/news'
import news_info from '@/components/com_part/news_info'
import resume_det from '@/components/com_part/resume_det'
import report from '@/components/com_part/report'
import resume_invite from '@/components/com_part/resume_invite'
import all_pos from '@/components/com_part/all_pos'
import sys_msg from '@/components/com_part/sys_msg'
import sys_msg_det from '@/components/com_part/sys_msg_det'

//个人中心页面
import tal_center from '@/components/talent/tal_center'
import tal_resume from '@/components/talent/tal_resume'
import tal_del_col from '@/components/talent/tal_del_col'
import int_job from '@/components/talent/int_job'
import tal_invited from '@/components/talent/tal_invited'
import tal_invited_det from '@/components/talent/tal_invited_det'
import tal_bas_msg from '@/components/talent/tal_bas_msg'
import tal_work from '@/components/talent/tal_work'
import tal_project from '@/components/talent/tal_project'
import tal_education from '@/components/talent/tal_education'
import tal_cert from '@/components/talent/tal_cert'
import self_eval from '@/components/talent/self_eval'
import tal_privacy from '@/components/talent/tal_privacy'
import tal_shield from '@/components/talent/tal_shield'

//企业中心页面
import enterp_center from '@/components/company/enterp_center'
import recruit_manage from '@/components/company/recruit_manage'
import recruit_set from '@/components/company/recruit_set'
import pos_manage from '@/components/company/pos_manage'
import release_office from '@/components/company/release_office'
import enterp_com_resume from '@/components/company/enterp_com_resume'
import enterp_info from '@/components/company/enterp_info'
import enterp_info_set from '@/components/company/enterp_info_set'
import enterp_contract from '@/components/company/enterp_contract'
import auto_recruit from '@/components/company/auto_recruit'
import mem_server from '@/components/company/mem_server'
import invoice_msg from '@/components/company/invoice_msg'
import tax_invoice from '@/components/company/tax_invoice'
import enterp_mien from '@/components/company/enterp_mien'
import enterp_ident from '@/components/company/enterp_ident'
import pos_highlights from '@/components/company/pos_highlights'
import my_integral from '@/components/company/my_integral'

//个人中心组件
import main_menu from '@/components/common/main_menu'

Vue.use(Router);



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '骑驴找马一一建筑行业人力资源共享平台'
      }
    },
    {
      path: '/user_reg',
      name: 'user_reg',
      component: user_reg,
      meta: {
        title: '人才注册'
      }
    },
    {
      path: '/enterp_reg',
      name: 'enterp_reg',
      component: enterp_reg,
      meta: {
        title: '建筑企业注册'
      }
    },
    {
      path: '/reg_type_choose',
      name: 'reg_type_choose',
      component: reg_type_choose,
      meta: {
        title: '注册类型选择'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '人才登录'
      }
    },
    {
      path: '/find_job',
      name: 'find_job',
      component: find_job,
      meta: {
        title: '找工作'
      }
    },
    {
      path: '/famous_pos',
      name: 'famous_pos',
      component: famous_pos,
      meta: {
        title: '名企招聘'
      }
    },
    {
      path: '/success_page',
      name: 'success_page',
      component: success_page
    },
    {
      path: '/account_manage',
      name: 'account_manage',
      component: account_manage,
      meta: {
        title: '账号管理'
      }
     /* children:[
        {
          path: '',
          name: 'account_manage',
          component: account_manage,
        },
        {
          path: '/account_manage/change_phone',
          name: 'change_phone',
          component: change_phone,
        },{
          path: '/account_manage/change_password',
          name: 'change_password',
          component: change_password,
        },
      ]*/
    },
    {
      path: '/change_phone',
      name: 'change_phone',
      component: change_phone
    },
    {
      path: '/change_password',
      name: 'change_password',
      component: change_password
    },
    {
      path: '/news',
      name: 'news',
      component: news,
      meta: {
        title: '新闻资讯'
      }
    },
    {
      path: '/news_info',
      name: 'news_info',
      component: news_info,
      meta: {
        title: '咨询详情'
      }
    },
    {
      path: '/company_det',
      name: 'company_det',
      component: company_det,
      meta: {
        title: '企业详情'
      }
    },
    {
      path: '/pos_det',
      name: 'pos_det',
      component: pos_det,
      meta: {
        title: '职位详情'
      }
    },
    {
      path: '/resume_det',
      name: 'resume_det',
      component: resume_det,
      meta: {
        title: '简历详情'
      }
    },
    {
      path: '/report',
      name: 'report',
      component: report,
      meta: {
        title: ''
      }
    },
    {
      path: '/resume_invite',
      name: 'resume_invite',
      component: resume_invite,
      meta: {
        title: ''
      }
    },
    {
      path: '/all_pos',
      name: 'all_pos',
      component: all_pos,
      meta: {
        title: ''
      }
    },
    {
      path: '/sys_msg',
      name: 'sys_msg',
      component: sys_msg,
      meta: {
        title: ''
      }
    },
    {
      path: '/sys_msg_det',
      name: 'sys_msg_det',
      component: sys_msg_det,
      meta: {
        title: ''
      }
    },
    {
      path: '/tal_center',
      name: 'tal_center',
      component: tal_center,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/tal_resume',
      name: 'tal_resume',
      component: tal_resume
    },
    {
      path: '/tal_del_col',
      name: 'tal_del_col',
      component: tal_del_col
    },
    {
      path: '/tal_bas_msg',
      name: 'tal_bas_msg',
      component: tal_bas_msg
    },
    {
      path: '/tal_work',
      name: 'tal_work',
      component: tal_work
    },
    {
      path: '/tal_project',
      name: 'tal_project',
      component: tal_project
    },
    {
      path: '/tal_education',
      name: 'tal_education',
      component: tal_education
    },
    {
      path: '/tal_cert',
      name: 'tal_cert',
      component: tal_cert
    },
    {
      path: '/self_eval',
      name: 'self_eval',
      component: self_eval
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
      path: '/tal_shield',
      name: 'tal_shield',
      component: tal_shield
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
    },
    //企业中心
    {
      path: '/enterp_center',
      name: 'enterp_center',
      component: enterp_center
    },
    {
      path: '/recruit_manage',
      name: 'recruit_manage',
      component: recruit_manage
    },
    {
      path: '/recruit_set',
      name: 'recruit_set',
      component: recruit_set
    },
    {
      path: '/pos_manage',
      name: 'pos_manage',
      component: pos_manage
    },
    {
      path: '/release_office',
      name: 'release_office',
      component: release_office
    },
    {
      path: '/enterp_com_resume',
      name: 'enterp_com_resume',
      component: enterp_com_resume
    },
    {
      path: '/enterp_info_set',
      name: 'enterp_info_set',
      component: enterp_info_set
    },
    {
      path: '/enterp_info',
      name: 'enterp_info',
      component: enterp_info
    },
    {
      path: '/enterp_contract',
      name: 'enterp_contract',
      component: enterp_contract
    },
    {
      path: '/auto_recruit',
      name: 'auto_recruit',
      component: auto_recruit
    },
    {
      path: '/mem_server',
      name: 'mem_server',
      component: mem_server
    },
    {
      path: '/invoice_msg',
      name: 'invoice_msg',
      component: invoice_msg
    },
    {
      path: '/tax_invoice',
      name: 'tax_invoice',
      component: tax_invoice
    },
    {
      path: '/enterp_mien',
      name: 'enterp_mien',
      component: enterp_mien
    },
    {
      path: '/enterp_ident',
      name: 'enterp_ident',
      component: enterp_ident
    },
    {
      path: '/pos_highlights',
      name: 'pos_highlights',
      component: pos_highlights
    },
    {
      path: '/my_integral',
      name: 'my_integral',
      component: my_integral
    }
  ]
})


