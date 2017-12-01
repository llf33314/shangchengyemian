import Vuex from 'vuex';
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(Vuex);

const  vuex_store = new Vuex.Store({
    state:{
        user_name:"aaa"
    },
    mutations:{
        showUserName(state){
            alert(state.user_name);
        }
    }
})
//首页
import Index from './index.vue'
//我的商品
import Mygoods from './router/mygoods'
//我的商品 --发布
import mygoods_releaseGoods from './router/mygoods/releaseGoods.vue'
//分组管理
import Grouping from './router/grouping'
//分组管理--新建
import Group_addGrouping from './router/group/addGroup'
//分组管理--子类列表
import Group_childlist from './router/group/childlist'
//分组管理--新建子类分组
import Group_addChildl from './router/group/addChildl'
//商品页管理
import GoodsPage from './router/goodsPage'
//商品页管理--新建
import GoodsPage_add from './router/goodsPage/addgoodsPage'
//多粉管理
import DuoFeng from './router/duofeng'

const routes = [
  { 
    path: '/', component: Index,
    redirect:'/mygoods',//路由显示
      children:[
          { path: '/mygoods', component: Mygoods},
          { path: '/grouping', component: Grouping},
          { path: '/duofeng', component: DuoFeng},
          { path: '/goodsPage', component: GoodsPage}
      ]
  },{
    path: '/addGroup', component: Group_addGrouping
  },
  {
    path: '/childlist', component: Group_childlist
  },
  {
    path: '/addChild', component: Group_addChildl
  },
  {
    path: '/addGoodsPage', component: GoodsPage_add
  },
  {
    path: '/releaseGoods/:id', component: mygoods_releaseGoods
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes,
})


new Vue({
  router: router,
  store:vuex_store,
}).$mount('#app')
