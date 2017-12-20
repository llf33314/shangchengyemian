<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价</el-breadcrumb-item>
            <el-breadcrumb-item>收款信息</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      
      <div class="addBond-main" style="margin-top:20px;">
            <div class="clearfix">
                <span>客户信息</span>
            </div>
          <el-form class="demo-ruleForm" style="margin-top: 12px;">
              <el-form-item label="会员卡号 :">
                {{resultData.cardNo}}
              </el-form-item>
              <el-form-item label="客人姓名 :">
                {{member.nickname}}
              </el-form-item>
              <el-form-item label="联系电话 :">
                {{member.phone}}
              </el-form-item>
          </el-form>
      </div>
      <div class="addBond-main">
            <div class="clearfix">
                <span>客户付款信息</span>
            </div>
            <el-table ref="multipleTable"   :data="subList"  tooltip-effect="dark" style="width: 100%;margin-top:20px;">
                <el-table-column
                prop="fansCorrency"
                label="粉币">
                </el-table-column>
                <el-table-column
                prop="integral"
                label="积分">
                </el-table-column>
                <el-table-column
                prop="discount"
                label="折扣">
                    <template scope="scope">
                        <div v-if=" scope.row.discount == null || scope.row.discount == 0">无</div>
                        <div v-else>{{scope.row.discount}}折</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="buyMode"
                label="付款方式">
                    <template scope="scope">
                        <div v-if="scope.row.buyMode == 0">支付宝支付</div>
                        <div v-else-if="scope.row.buyMode == 1">微信支付</div>
                        <div v-else-if="scope.row.buyMode == 4">货到付款(线下)</div>
                        <div v-else-if="scope.row.buyMode == 5">储值卡支付</div>
                    </template>
                </el-table-column> 
                <el-table-column
                prop="money"
                label="实际付款">
                </el-table-column> 
                <el-table-column
                label="应付金额">
                    <template scope="scope">
                        <div v-if="order.orderType == 0">{{order.allMoney}}</div>
                        <div v-else>{{scope.row.termMoney}}</div>
                    </template>
                </el-table-column>
                 <el-table-column
                label="付款时间">
                    <template scope="scope">
                        <div>{{scope.row.buyTime|format}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top: 20px;">
                <el-pagination
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
export default {
  
  data() {
    return {
      resultData:{},//返回的数据
      member:{},  //会员信息
      order:{}, //报价单信息
      subList:[],//收款详情
      page:{},//翻页数据

      orderId:'', //传回的参数
      memberId:''
    }
  },
  methods: {
    
    /**获取收款详情列表 */
    purchaseReceivablesDetails(id,memberId,curPage){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseReceivablesDetails_post,
        'data':{
            orderId: id,
            memberId:memberId,
            curPage:curPage
        },
        'success':function (data){
            if(data.code == 0){
                _this.resultData = data.data;
                _this.member = data.data.member;
                _this.order = data.data.order;
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
      this.purchaseReceivablesDetails(_this.orderId,_this.memberId,val);
      
    }
  },
  mounted() {
    let _this = this;
    this.isMarketingUrl();
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){
        _this.orderId=this.$route.params.id;
        _this.memberId=this.$route.params.memberId;
        _this.purchaseReceivablesDetails(_this.orderId,_this.memberId,1);
    }
  }   
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
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


