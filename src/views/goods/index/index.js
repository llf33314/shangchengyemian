import Vuex from 'vuex';
import Vue from 'vue'
import VueRouter from 'vue-router'
import quillEditor from 'vue-quill-editor'; //调用编辑器

Vue.use(Vuex);
Vue.use(quillEditor);

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
    path: '/addGroup/:add', component: Group_addGrouping//新增分组
  },
  {
    path: '/addGroup/:add/:Id', component: Group_addGrouping//新增子集分组
  },
  {
    path: '/childlist/:pId', component: Group_childlist
  },
  {
    path: '/addGoodsPage/:pageId', component: GoodsPage_add
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
  router: router
}).$mount('#app')
