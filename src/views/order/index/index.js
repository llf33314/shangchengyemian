import Vue from 'vue'
import VueRouter from 'vue-router'

 //首页
import Index from './index.vue'
//订单
import orderList from './router/orderList'
//评论管理
import Comment1 from './router/comment'
//订单详情页面
import orderDetail from './router/orderDetail'

const routes = [
  { 
    path: '/', component: Index,
    redirect:'/allOrder',//路由显示
      children:[
          { path: '/allOrder', component: orderList},
          { path: '/returnOrder', component: orderList},
          { path: '/comment', component: Comment1} 
      ]
  },{
    path: '/detail/:orderId', component: orderDetail
  }
]


Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})

new Vue({
  router: router
}).$mount('#app')
