<template>
  <div class="h5-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/H5' }">H5商城</el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <p class="addh5-title">请选择你需要的模板进行编辑 </p>
        <div class="addh5-module-box clearfix">
          <div class="addh5-module" 
                v-for=" (item,index) in datas "
                :class="{'selected':selected == index}"
                :key ="index"
                @click="selectedModule(index)">
            <img class="module-img" :src="item.img">
            <p class="module-name text-overflow"
                v-text="item.name">
            </p>
            <i class="iconfont icon-selected"></i>
          </div>
        </div>
        <div class="shop-textr">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
    </div>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {
  components: {
    contentNo
  },
  data () {
    return {
      selected:'-1',
      datas: [{
        img: '/static/img/module.jpg',
        name: '手机',
      }, {
        img: '/static/img/module.jpg',
        name: '黑色毛衣',
      }, {
        img: '/static/img/module.jpg',
        name: '帽子',
      }, {
        img: '/static/img/module.jpg',
        name: '多粉平台H5商城模板H5商城模板模板多粉平台H5商城模板H5商城模板模板',
      }, {
        img: '/static/img/module.jpg',
        name: '多粉平台H5商城模板H5商城模板模板多粉平台H5商城模板H5商城模板模板',
      }],
      currentPage: 1,
    }
  },
  methods: {
    selectedModule(index){
      this.selected == index ? this.selected ='-1': this.selected =index;
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
.addh5-title{
  width: 100%;
  font-size: 15px;
  margin-bottom: 30px; 
}
.addh5-module-box{
  width: 100%;
  font-size: 0;
  margin-bottom: 30px;
  .addh5-module{
    position: relative;
    width: 16vw;
    border: 1px solid #ddd;
    padding: 10px;
    display: inline-block;
    vertical-align: top;
    margin-right: 3vw;
    .module-img{
      width: 100%;
      height: 22vw;
      margin-bottom: 20px;
    }
    .module-name{
      font-size: 14px;
    } 
    &:hover{
       border: 1px solid #20a0ff;
    }
    i{
      display: none;
    }
  }
  &>div:nth-child(5n){
    margin-right: 0;
  }
  .selected{
    border: 1px solid #20a0ff;
    .icon-selected{
      position: absolute;
      right: -1px;
      bottom: -4px;
      display: block;
      font-size: 36px;
      color: #20a0ff;
    }
  }
}
</style>
