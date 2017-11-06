import Vue from 'vue'
import VueRouter from 'vue-router'

//首页
import Index from './index.vue'
//团购管理
import Group from './router/group/index'
//新增团购
import addGruop from './router/group/addGruop.vue'
//超级营销员
import Marketing from './router/Marketing/index'
//超级营销员--新建商品佣金
import AddBond from './router/Marketing/addBond'
//积分商城
import IntegralMall from './router/IntegralMall/index'
//积分商城--新建积分商品
import addGoods from './router/IntegralMall/addGoods'
//积分商城--新建横幅图
import addBanner from './router/IntegralMall/addBanner'
//预售管理
import Presale from './router/Presale/index'
//预售管理--新建预售
import addPresale from './router/Presale/addPresale'
//批发管理
import Pifa from './router/pifa/index'
//批发管理 --新建
import addPifa from './router/pifa/addpifa'
//对外报价
import Dwbj from './router/dwbj/index'
//对外报价--新建
import addDwbj from './router/dwbj/addBj.vue'
//对外报价--新建合同
import addContract from './router/dwbj/addContract'
//拍卖管理
import Auction  from './router/Auction/index'
//拍卖管理--新建拍卖
import addAuction  from './router/Auction/addAuction'
//H5
import h5 from './router/H5/index'
//H5--table
import h5Table from './router/H5/table'
//H5--新增
import addH5 from './router/H5/addH5'
//模块购买
import modular from './router/modular/index'
//秒杀管理
import seckill from './router/seckill/index'
//秒杀管理--新建秒杀
import addSeckill from './router/seckill/addSeckill'
const routes = [
  { path: '/', component: Index},
  { path: '/group', component: Group},
  { path: '/addgroup/:id', component: addGruop},
  { path: '/marketing/:activeName', component: Marketing},
  // { path: '/marketing/:activeName/:pageNO', component: Marketing},
  { path: '/addBond/:id', component: AddBond},
  { path: '/integralmall', component: IntegralMall},
  { path: '/integralmall/goods', component: addGoods},
  { path: '/integralmall/banner', component: addBanner},
  { path: '/presale/:activeName', component: Presale},
  { path: '/presale/addpresale/:id', component: addPresale},
  { path: '/pifa/:activeName', component: Pifa},
  { path: '/addPifa/:id', component: addPifa},
  { path: '/dwbj', component: Dwbj},
  { path: '/dwbj/addBj', component: addDwbj},
  { path: '/dwbj/addHT', component: addDwbj},
  { path: '/dwbj/addContract', component: addContract},
  { path: '/auction/:activeName', component: Auction},
  { path: '/auction/addauction/:id', component: addAuction},
  { path: '/h5', component: h5},
  { path: '/h5/table', component: h5Table},
  { path: '/h5/addH5', component: addH5},
  { path: '/modular', component: modular},
  { path: '/seckill', component: seckill},
  { path: '/addSeckill/:id', component: addSeckill},
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes:routes
})


new Vue({
  router: router
}).$mount('#app')
