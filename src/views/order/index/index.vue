<template>
  <div class="index-wrapper">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="allOrder"></el-tab-pane>
      <el-tab-pane label="维权订单" name="returnOrder"></el-tab-pane>
      <el-tab-pane label="评价管理" name="comment"></el-tab-pane> 
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
         activeName: 'allOrder',//默认首页显示
    }
  },
  methods: {
    handleClick(tab) {
      // console.log(tab)
      this.$router.push({path:tab.name})
    }
  },
  mounted(){
    const _this = this;
    let _href = window.location.hash.split('/')[1];
    _this.activeName = _href;
    _this.isAdminUser({
      success: function(data) {
        if (data.code == -1) return;
      }
    });
  }
}
</script>

<style lang="less">
@import '../less/index.less';
</style>
