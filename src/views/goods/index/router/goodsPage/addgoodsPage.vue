<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/goodspage' }">商品页模板</el-breadcrumb-item>
        <el-breadcrumb-item>新建商品页模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addgroup-wrapper">
     新建商品页模板
     <div>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
    </div>
    </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';

export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    /**
     * 保存跳转
     */
    onSubmit(){
      this.$router.push({path:'/goodspage'})
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="less">
@import '../../../less/group.less';
</style>
