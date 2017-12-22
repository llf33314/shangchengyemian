<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价 </el-breadcrumb-item>
            <el-breadcrumb-item >报价单状态</el-breadcrumb-item>
        </el-breadcrumb>
     </div>


  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import defaultImg from "components/defaultImg";
export default {
  components: {
    defaultImg
  },
  data() {
    return {
      subList:[],//统计列表
      page:{},//翻页数据
      orderId:'', //传回的参数
    }
  },
  methods: {
      
  },
  mounted() {
     this.isMarketingUrl();
  }   
}
</script>


<style lang="less" scoped>
 
</style>


