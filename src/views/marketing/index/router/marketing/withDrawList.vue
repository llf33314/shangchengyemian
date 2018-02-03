 <template>
  <div class="common-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/marketing/1'}">超级销售员</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/marketing/4'}">销售员管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <div class="common-content">
          <div class="index-titleName">
              销售员{{sellerName}}的提现记录
          </div> 
          <div class="index-shopInfo">
             <div class="index-input-box">
                <span>
                    <el-input v-model.trim="keyWord_tixian" 
                      placeholder="销售员名字/手机" 
                      class="max-input" 
                      @keyup.enter.native="searchSale">
                      <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSale"></i>
                    </el-input>
                </span>
                <span>
                  提现时间 ：
                  <el-date-picker 
                    v-model="cashDate" 
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="cashSearch"></el-date-picker>
                </span>
              </div>
          </div>
          <el-table :data="withDrawLilst" style="width: 100%" v-if="page.rowCount > 0">
              <el-table-column
                label="提现时间">
                 <template slot-scope="scope">
                    <div>{{scope.row.applay_time|format}}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="名字">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="withdraw_money"
                label="提现金额（元）">
              </el-table-column>
              <el-table-column
                prop="withdraw_order_no"
                label="订单号">
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.withdraw_status == 1">待打款</span>
                  <span v-if="scope.row.withdraw_status == 2">已打款</span>
                </template>
              </el-table-column>
            </el-table>
          <div class="shop-textr" v-if="page.pageCount > 1">
              <el-pagination  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="page.curPage"
                  :page-size="page.pageSize"
                  layout="prev, pager, next, jumper"
                  :total="page.rowCount">
              </el-pagination>
          </div>
          <content-no v-if="page.rowCount == 0"></content-no>
        </div>
    </div>
</div>
</template>
<script>
  import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";
export default {
  components: {
    contentNo
  },
  data() {
     return {
         contentNo:'',
         keyWord_tixian:'',
         withDrawLilst:[],
         page:{},
         saleMemberId:'',
         sellerName:'',
         cashDate:'',
     };
  },
  methods: {
     /**提现搜索框 */
    searchSale() {
      this.mallSellersWithDrawList(this.saleData.page.curPage);
    },
    cashSearch(value) {
      if(value == ''){
        this.cashDate='';
      }
      //提现时间选择改变事件
      this.mallSellersWithDrawList(1);
    },
     handleSizeChange(val) {
      this.mallSellersWithDrawList(val);
    },
    handleCurrentChange(val) {
      this.mallSellersWithDrawList(val);
    },
    mallSellersWithDrawList(pageNum) {
      //提现列表
      let _this = this;
      let startTime = "";
      let endTime = "";
      let cashTime = _this.cashDate;
      if (cashTime != "") {
        startTime = Lib.M.format(new Date(cashTime[0]));
        endTime = Lib.M.format(new Date(cashTime[1]));
      }else{
         startTime ='';
        endTime = '';
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersWithDrawList_post,
        data: {
          curPage: pageNum,
          keyWord: _this.keyWord_tixian,
          saleMemId:_this.saleMemberId,
          startTime: startTime,
          endTime: endTime
        },
        success: function(data) {
          //console.log(data,'data')
          _this.withDrawLilst = data.data.page;
          _this.page = {
              curPage:  data.data.page.curPage,
              pageCount: data.data.page.pageCount,
              pageSize: data.data.page.pageSize,
              rowCount: data.data.page.rowCount
          }
          _this.sellerName=data.data.sellerName;
        }
      });
    },

 },
mounted() {
  let _this = this;
  _this.saleMemberId=_this.$route.params.id;
  _this.mallSellersWithDrawList(1);
} 
}
</script>
<style lang="less">
.index-titleName{
      border-bottom: 1px solid #d9d9d9;
    padding-bottom: 15px;
    margin-bottom: 15px;
    font-size: 15px;
}
</style>
