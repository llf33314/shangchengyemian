<template>
  <div class="index-wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的商品" name="mygoods"></el-tab-pane>
      <el-tab-pane label="分组管理" name="grouping"></el-tab-pane>
      <el-tab-pane label="商品页模板" name="goodspage"></el-tab-pane>
      <!-- todo 没有设计<el-tab-pane label="多粉商城" name="duofeng"></el-tab-pane> -->
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
export default {
  components: {
  },
  data () {
    return {
         activeName: 'grouping',//默认首页显示
    }
  },
  methods: {
    handleClick(tab) {
      this.$router.push({path:tab.name})
    }
  },
  mounted(){
    const _this = this;
    let _href = window.location.hash.split('/')[1];
    _this.activeName = _href;
  }
}
</script>

<style lang="less">
@import '../less/index.less';
</style>
