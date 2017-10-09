<template>
  <div class="nav">
    <a href="/views/survey/index.html">商城概况</a> 
    <a href="/views/shop/index.html#/shop">店铺管理(差查看大图)</a>
    <a href="/views/goods/index.html">商品管理</a>
    <a href="/views/order/index.html">订单管理</a>
    <a href="/views/trade/index.html">交易管理</a>
    <a href="/views/statistics/index.html">商城统计</a>
    <a href="/views/marketing/index.html">商场营销</a>
    <a href="/views/setUp/index.html">商城设置</a>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  name: 'nav',	

  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.nav{
  width: 25%;
  margin: 10% 5%;
  a{
    margin-left: 10px;
    padding:10px ;
    display: block;
    color: #333;
    font-size: 20px;
  }
}

</style>
