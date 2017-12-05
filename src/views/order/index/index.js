import Vue from 'vue'
import VueRouter from 'vue-router'

 //首页
import Index from './index.vue'
//所有订单
import AllOrder from './router/allOrder'
//评论管理
import Comment1 from './router/comment'
//维权订单
import ReturnOrder from './router/returnOrder'
//订单详情页面
import orderDetail from './router/order.vue'

const routes = [
  { 
    path: '/', component: Index,
    redirect:'/allOrder',//路由显示
      children:[
          { path: '/allOrder', component: AllOrder},
          { path: '/returnOrder', component: ReturnOrder},
          { path: '/comment', component: Comment1} 
      ]
  },{
    path: '/order/detail/:orderId', component: orderDetail
  }
]


Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})

new Vue({
  router: router
}).$mount('#app')
