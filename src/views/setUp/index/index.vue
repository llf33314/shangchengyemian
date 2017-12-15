<template>
<div class="index-wrapper" v-cloak>
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="担保交易" name="danbao"></el-tab-pane>
      <el-tab-pane label="物流管理" name="logistics/logistics"></el-tab-pane>
      <el-tab-pane label="通用设置" name="setup"></el-tab-pane>
      <el-tab-pane label="消息模板" name="message"></el-tab-pane>
    </el-tabs>
    <div class="index-main">
      <router-view></router-view>
    </div>
</div>
</template>
 <script>
import Lib from "assets/js/Lib";

export default {
  components: {},
  data() {
    return {
      activeName: "danbao" //默认首页显示
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push({ path: "/" + tab.name });
    }
  },
  mounted() {
    this.activeName = window.location.hash.split("/")[1];
    if (this.activeName == "logistics") {
      this.activeName = "logistics/logistics";
    }
  }
};
</script>

<style lang="less">
.index-wrapper {
  width: 100%;
  .index-main {
    width: 100%;
  }
}
</style>
