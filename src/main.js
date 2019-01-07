// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from 'element-ui'
import { Button, Select, Icon, Input, Carousel} from 'element-ui';
import App from './App'
import router from './router'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(elementUI);

//数据请求
Axios.defaults.baseURL = 'http://qlzm.com';
Vue.prototype.$ajax = Axios;

//element组件调用
Vue.use(Carousel);
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(Icon);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
