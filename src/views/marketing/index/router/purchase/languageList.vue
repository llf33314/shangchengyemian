<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
               <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价</el-breadcrumb-item>
            <el-breadcrumb-item>留言管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      
      <div class="addBond-main" style="margin-top:20px;">
            <div class="clearfix">
                <span>留言管理</span>
            </div>
            <el-table ref="multipleTable" :data="subList" tooltip-effect="dark" style="width: 100%;margin-top:20px;">
                 <el-table-column
                prop="id"
                label="编号">
                </el-table-column>
                <el-table-column
                prop="fansCorrency"
                label="头像">
                <template slot-scope="scope">
                    <div class="goods-img" >
                        <default-img :background="scope.row.headimgurl"></default-img>
                    </div>        
                </template>
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="昵称">
                </el-table-column>
                 <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button  size="small" class="buttonBlue" @click="jumpRouter('/languageDetails/'+scope.row.orderId+'/'+scope.row.memberId)">留言详情</el-button>
                    </template>
                </el-table-column>
               
            </el-table>
            <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top: 20px;">
                <el-pagination  background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page='page.curPage'
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.rowCount">
                </el-pagination>
            </div>
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
      subList:[],//留言管理
      page:{},//翻页数据
      imgPath: "",
      orderId:'', //传回的参数
    }
  },
  methods: {
    /**获取留言列表 */
    purchaseLanguageList(curPage){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseLanguageList_post,
        'data':{
            orderId: _this.orderId,
            curPage:curPage
        },
        'success':function (data){
            if(data.code == 0){
                _this.imgPath = data.imgUrl;
                _this.subList = data.data.page.subList;
                _this.page = {
                    curPage:  data.data.page.curPage,
                    pageCount: data.data.page.pageCount,
                    pageSize: data.data.page.pageSize,
                    rowCount: data.data.page.rowCount
                }
            }
        }
        });
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.purchaseLanguageList(val);
      
    }
  },
  mounted() {
    let _this = this;
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){
        _this.orderId=this.$route.params.id;
        _this.purchaseLanguageList(1);
    }
  }   
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
 .goods-img{
     width: 100px;
    height: 60px;
    margin: 10px 0;
 }
.addBond-main{
    padding:0px 4%;
    .addBond-input{
        width: 220px
    }
}
.el-form-item{
    margin-bottom: 2px;
} 
.clearfix{
    padding: 8px 0px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    font-weight: bold;
}
</style>


