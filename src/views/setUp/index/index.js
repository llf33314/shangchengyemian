import Vue from 'vue'
import VueRouter from 'vue-router'


import Index from './index.vue'
//担保交易
import Danbao from './router/danbao'
//物流管理
import Logistics from './router/logistics'
//通用设置
import Message from './router/message.vue'
//消息模板
import Setup from './router/setup.vue'
//新建物流
import addLogistics from './router/addLogistics.vue'
//自提物流
import addSince from './router/addSince.vue'
const routes = [
  { path: '/', component: Index,
    redirect:'/danbao',
      children:[
          { path: '/danbao', component: Danbao},
          { path: '/logistics', component: Logistics},
          { path: '/message', component: Message},
          { path: '/setup', component: Setup}
      ]
  },{
    path:'/addlogistics', component: addLogistics
  },{
    path:'/addsince', component: addSince
  }
]

Vue.use(VueRouter);

const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
