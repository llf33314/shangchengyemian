import Vue from 'vue'
import VueRouter from 'vue-router'
import AMap from 'vue-amap';

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
          { path: '/logistics/:activeName', component: Logistics},
          { path: '/message', component: Message},
          { path: '/setup', component: Setup}
      ]
  },{
    path:'/addlogistics/:id', component: addLogistics
  },{
    path:'/addsince/:id', component: addSince
  }
]

Vue.use(VueRouter);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '3b73726ac868e5fcf8e26513ce6860d1',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
  'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder','AMap.LngLat']
});
Vue.use(AMap);
const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
