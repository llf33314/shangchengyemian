<template >
  <div class="survey-wrapper" v-cloak>
    <div class="survey-item statistics-main">
      <p class="item-title">统计概况</p>
      <div class="item-content">
        <div class="col1" >
          <p style="color:#fa4c54" v-text="dataCount.unfilled_orders_num"></p>
          <div>待发货订单</div>
        </div>
        <div class="col1">
          <p v-text="dataCount.bad_orders_num"></p>
          <div>维权订单</div>
        </div>
        <div class="col1">
          <p v-text="dataCount.yesterday_orders_num"></p>
          <div>昨日订单</div>
        </div>
        <!-- <div class="col1">
          <p v-text="dataCount.yesterday_orders_num"></p>
          <div>商家当前可提现余额</div>
        </div> -->
      </div>
    </div>
    <div class="survey-item function-main">
      <p class="item-title">常用功能</p>
      <div class="item-content" >
        <div class="col1">
          <a @click="link(path+'views/goods/index.html#/releaseGoods/add',path+'/views/goods/index.html#/mygoods')">
            <i class="iconfont icon-jia"></i>发布商品
          </a>
        </div>
        <!-- <div class="col1">
           <i class="iconfont icon-renminbi"></i>收入/提现
        </div> -->
        <div class="col1">
          <a @click="link(path+'views/order/index.html#/allOrder',path+'/views/order/index.html#/allOrder')">
            <i class="iconfont icon-dingdan1"></i>所有订单
          </a>
        </div>
        <div class="col1">
            <a target="_blank" :href="domain+'wxapplet/indexstart.do'">
          <i class="iconfont icon-xiaochengxu1"></i>小程序
            </a>
        </div>
      </div>
      <div class="item-content">
        <div class="col1" >
          <a @click="link(path+'views/shop/index.html#/page',path+'/views/shop/index.html#/shop')">
            <i class="iconfont icon-yemian"></i>页面管理
          </a>
        </div>
        <div class="col1">
          <a @click="link(path+'views/setUp/index.html#/setup',path+'/views/setUp/index.html')">
            <i class="iconfont icon-shezhi1"></i>通用设置
          </a>
        </div>
        <!-- <div class="col1">
          <i class="iconfont icon-msnui-weixin"></i>公众号
        </div> -->
        <div class="col1">
          <a @click="link(path+'views/trade/index.html#/',path+'/views/trade/index.html#/')">
            <i class="iconfont icon-zhankai"></i>交易记录
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="survey-item duofeng-main">
      <p class="item-title">多粉支持</p>
      <div class="item-content">
        <div class="col1 ">
          <a>【多粉学堂】学习如何创建商城页面</a>
          <a>【多粉学堂】学习如何创建商城页面</a>
          <a>【多粉学堂】学习如何创建商城页面</a>
        </div>
        <div class="col1 ">
           <a>【多粉学堂】学习如何创建商城页面</a>
        </div>
      </div>
    </div> -->
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';

export default {
  components: {
    
  },
  data () {
    return {
        dataCount:{
          yesterday_orders_num:'',
          path:null,
          domain:''
        }
    }
  },
  methods: {

    link(url,url1,params){
      // console.log(url);
        parent.window.postMessage("changeMenus('"+url1+"','"+params+"')", "*");
        window.location.href=url;
    },
    ajax(){
      let _this = this;
      // console.log(DFshop.activeAPI,'DFshop.activeAPI')
      this.ajaxRequest({
        'url': DFshop.activeAPI.mallCount_post,
        'success':function (data){
          // console.log(data);
          _this.dataCount = data.data;
          _this.domain=data.data.domain;
          _this.yesterday_orders_num = '¥ '+data.yesterday_orders_num;         
        }
      });
    }
  },
  mounted(){
     let _this = this;
    this.ajax();
    let href = window.location.href;
    _this.path = href.split('views')[0];  
  }
}
</script>

<style lang="less">
@import './survey.less';
.col1{
    cursor: pointer;
}
</style>
