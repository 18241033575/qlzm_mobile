// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from 'element-ui'
import mintUI from 'mint-ui'
import { Button, Select, Icon, Input, Carousel, Dialog, Message, DatePicker, Notification, MessageBox} from 'element-ui';
import { Popup,Loadmore,Indicator } from 'mint-ui';
import VueTouch from 'vue-touch'
import App from './App'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.use(elementUI);
Vue.use(mintUI);
Vue.use(VueQuillEditor);

// 更改 title
Vue.use(require('vue-wechat-title'));

// 滑动
Vue.use(VueTouch, {name: 'v-touch'});

// 数据请求
// 正式服
Axios.defaults.baseURL = 'https://www.qlzm.com.cn';
// 测试服
// Axios.defaults.baseURL = 'http://qlzm.wiiwork.com';
// Axios.defaults.baseURL = 'http://qlzm.com';
Vue.prototype.$ajax = Axios;
Vue.prototype.$notify = Notification;


Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  return config
}, error => {
  /*return Promise.reject(error)*/
});



//element-ui组件调用
Vue.use(Carousel);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.component(Notification.name, Notification);
// Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);//用以解决刷新自动弹出message
// Vue.use(Message);

// mint-ui组件调用
Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);


Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.message.includes('status code 500')){   // 判断请求异常信息中是否含有超时timeout字符串
      Notification.error({
        title: '提示',
        message: '服务器错误',
        showClose: false,
        duration: 1500
      });
      return Promise.reject(error);          // reject这个错误信息
    }
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      Notification.error({
        title: '提示',
        message: '网络超时',
        showClose: false,
        duration: 1500
      });
      return Promise.reject(error);          // reject这个错误信息
    }
    return Promise.reject(error);
  });

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
