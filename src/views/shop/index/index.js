import Vue from 'vue'
import VueRouter from 'vue-router'

//首页
import Index from './index.vue'
//店铺管理--编辑
import shop_edit from './router/shop/edit.vue'
//店铺管理--认证
import shop_authentication from './router/shop/authentication.vue'
//店铺管理--新建
import shop_addShop from './router/shop/addShop.vue'
//页面管理--新建
import Page_addPage from './router/page/addPage.vue'

const routes = [
  { 
    path: '/', component: Index
  },{ 
    path: '/:activeName', component: Index
  },{
    path: '/shop/edit/:shopId', component: shop_edit,
  },{
    path:'/shop/authentication',component: shop_authentication
  },{
    path:'/shop/addShop',component: shop_addShop
  },{
    path: '/shop/addPage/:pageId', component: Page_addPage
  },
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
