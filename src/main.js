import Vue from 'vue'
import App from './App.vue'

//引入路由器
import VueRouter from 'vue-router'
import router from './router/index'
import './router/permission'

//导入语言
import i18n from './lang/index'
//引入store  共享数据
import store from './store/index'
//element样式文件必须引入
import "element-ui/lib/theme-chalk/index.css"; 
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/resetElement.css'
import '../mock/mockServer'
//持久化
import './utils/localStorage'
//全局引入EChart
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
console.log(echarts);
Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store,
  router,
  i18n,  // 通过 `i18n` 选项创建 Vue 实例
  beforeCreate() {
      Vue.prototype.$bus = this
  },
}).$mount('#app')
