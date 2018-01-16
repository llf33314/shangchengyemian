import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from 'store';
import Vuex from 'vuex' ;// 引入vue-amap
import AMap from 'vue-amap';


//首页
import Index from './index.vue'
//首页Nav
import IndexNav from './router/indexNav.vue'
//团购管理
import Group from './router/group/index'
//新增团购
import addGruop from './router/group/addGruop.vue'
//超级营销员
import Marketing from './router/Marketing/index'
//超级营销员--新建商品佣金
import AddBond from './router/Marketing/addBond'
//超级营销员--销售员管理--推荐列表
import recommendList from './router/Marketing/recommendList'
//超级营销员--销售员管理--提现列表
import withDrawList from './router/Marketing/withDrawList'

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
import purchase from './router/purchase/index'
//对外报价--新建
import addPurchase from './router/purchase/addBj.vue'
/**对外报价-详情 */
import details from './router/purchase/details.vue'
/**对外报价-收款详情 */
import receivablesDetails from './router/purchase/receivablesDetails.vue'
/**对外报价-统计列表 */
import statisticsList from './router/purchase/statisticsList.vue'
/**对外报价-留言管理 */
import languageList from './router/purchase/languageList.vue'
/**对外报价-留言详情 */
import languageDetails from './router/purchase/languageDetails.vue'

//对外报价--新建合同
import addContract from './router/purchase/addContract'
//对外报价--新建公司模板
import addCompany from './router/purchase/addCompany'
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
//小程序图片设置
import applet from './router/applet/index'
//小程序图片设置-新增
import addApplet from './router/applet/addApplet'

import quillEditor from 'vue-quill-editor'; //调用编辑器
const routes = [
  { path: '/', component: Index,
      children:[
        { path: '/index', component: IndexNav},
        { path: '/group', component: Group},
        { path: '/addgroup/:id', component: addGruop},
        { path: '/marketing/:activeName', component: Marketing},
        { path: '/recommendList/:id', component: recommendList},
        { path: '/withDrawList/:id', component: withDrawList},

        { path: '/addBond/:id', component: AddBond},
        { path: '/mallIntegral/:activeName', component: IntegralMall},
        { path: '/mallIntegral/goods/:id', component: addGoods},
        { path: '/mallIntegral/banner/:id', component: addBanner},
        { path: '/presale/:activeName', component: Presale},
        { path: '/presale/addpresale/:id', component: addPresale},
        { path: '/pifa/:activeName', component: Pifa},
        { path: '/addPifa/:id', component: addPifa},

        { path: '/purchase/:activeName', component: purchase},
        { path: '/order/add', component: addPurchase},
        { path: '/order/update/:id', component: addPurchase},
        { path: '/receivablesDetails/:id/:memberId', component: receivablesDetails},
        { path: '/statisticsList/:id', component: statisticsList},
        { path: '/languageList/:id', component: languageList},
        { path: '/languageDetails/:id/:memberId', component: languageDetails},
        { path: '/details/:id', component: details},
        { path: '/contract/add', component: addContract},
        { path: '/contract/update/:id', component: addContract},
        { path: '/company/add', component: addCompany},
        { path: '/company/update/:id', component: addCompany},

        { path: '/auction/:activeName', component: Auction},
        { path: '/auction/addauction/:id', component: addAuction},
        { path: '/h5', component: h5},
        { path: '/h5/fromList/:id', component: h5Table},
        { path: '/h5/addH5', component: addH5},
        { path: '/modular', component: modular},
        { path: '/seckill', component: seckill},
        { path: '/addSeckill/:id', component: addSeckill},

        { path: '/applet', component: applet},
        { path: '/applet/add', component: addApplet},
        { path: '/applet/update/:id', component: addApplet},
      ]  
  },
  // { path: '/group', component: Group},
  // { path: '/addgroup/:id', component: addGruop},
  // { path: '/marketing/:activeName', component: Marketing},
  // { path: '/recommendList/:id', component: recommendList},
  // { path: '/withDrawList/:id', component: withDrawList},
  
  // // { path: '/marketing/:activeName/:pageNO', component: Marketing},
  // { path: '/addBond/:id', component: AddBond},
  // { path: '/mallIntegral/:activeName', component: IntegralMall},
  // { path: '/mallIntegral/goods/:id', component: addGoods},
  // { path: '/mallIntegral/banner/:id', component: addBanner},
  // { path: '/presale/:activeName', component: Presale},
  // { path: '/presale/addpresale/:id', component: addPresale},
  // { path: '/pifa/:activeName', component: Pifa},
  // { path: '/addPifa/:id', component: addPifa},

  // { path: '/purchase/:activeName', component: purchase},
  // { path: '/order/add', component: addPurchase},
  // { path: '/order/update/:id', component: addPurchase},
  // { path: '/receivablesDetails/:id/:memberId', component: receivablesDetails},
  // { path: '/statisticsList/:id', component: statisticsList},
  // { path: '/languageList/:id', component: languageList},
  // { path: '/languageDetails/:id/:memberId', component: languageDetails},
  // { path: '/details/:id', component: details},
  // { path: '/contract/add', component: addContract},
  // { path: '/contract/update/:id', component: addContract},
  // { path: '/company/add', component: addCompany},
  // { path: '/company/update/:id', component: addCompany},

  // { path: '/auction/:activeName', component: Auction},
  // { path: '/auction/addauction/:id', component: addAuction},
  // { path: '/h5', component: h5},
  // { path: '/h5/fromList/:id', component: h5Table},
  // { path: '/h5/addH5', component: addH5},
  // { path: '/modular', component: modular},
  // { path: '/seckill', component: seckill},
  // { path: '/addSeckill/:id', component: addSeckill},

  // { path: '/applet', component: applet},
  // { path: '/applet/add', component: addApplet},
  // { path: '/applet/update/:id', component: addApplet},
]

Vue.use(VueRouter)
Vue.use(quillEditor)
Vue.use(Vuex)

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

// const _state = {
//   marketingUrl :''
// }
// const _mutations = {
//   marketingData:(state,URL) => {
//       state.marketingUrl =  URL ||state.marketingUrl
//   }
// }
// const VStore = new Vuex.Store({
//   state:_state,
//   mutations:_mutations
// })

new Vue({
  router: router,
  // store: VStore,
}).$mount('#app')

