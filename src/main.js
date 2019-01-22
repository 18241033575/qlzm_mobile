// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from 'element-ui'
import { Button, Select, Icon, Input, Carousel, Dialog, Message, DatePicker} from 'element-ui';
import App from './App'
import router from './router'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(elementUI);

//数据请求
Axios.defaults.baseURL = 'http://qlzm.com';
Vue.prototype.$ajax = Axios;
// Axios.defaults.baseURL= '/api';


Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  return config
}, error => {
  /*return Promise.reject(error)*/
})



//element组件调用
Vue.use(Carousel);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.component(Message.name, Message);//用以解决刷新自动弹出message
// Vue.use(Message);


Vue.config.productionTip = false;



Axios.interceptors.request.use(config => {
  /* let token = userInfo.token;
   if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
     config.headers.token = token;
   }*/
  return config
}, error => {
  /*return Promise.reject(error)*/
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
