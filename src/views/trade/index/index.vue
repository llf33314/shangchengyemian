<template>
<div class="index-wrapper">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="交易记录" name="index">
        <div class="index-main" v-if="isShow">
          <div class="index-msg">
            <div class="index-item">
              <div>
                <p v-text="dataCount.yesterCount" class="index-item-money"
                    style="color:#ff4949">￥1971.00
                </p>
                <p>昨日营业额（截止至今日0点）</p>
              </div>
            </div>
            <div class="index-item">
              <div>
                <p v-text="dataCount.sevenCount" class="index-item-money">￥8958.00
                </p>
                <p>7日营业额（截止至今日0点）</p>
              </div>
            </div>
            <div class="index-item">
              <div>
                <p v-text="dataCount.settlementCount" class="index-item-money">￥0.00
                </p>
                <p>待结算金额（担保交易）</p>
              </div>
            </div>
            <div class="index-item">
              <div style="margin-right: 20px;">
                <p v-text="dataCount.usableBalance" class="index-item-money">￥158.00
                </p>
                <p>可用余额</p>
              </div>
              <el-button type="primary" 
                        size="small">提现</el-button>
            </div>
          </div>
          <div class="index-shopInfo">
            <el-form :inline="true" :model="searchData" class="demo-form-inline">
              <el-form-item >
                <el-input v-model.trim="searchData.orderNo" placeholder="订单号"></el-input>
              </el-form-item>
              <el-form-item label="订单状态 :">
                <el-select v-model="searchData.status" placeholder="全部">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="成功" value="1"></el-option>
                  <el-option label="进行中" value="2"></el-option>
                  <el-option label="退款" value="3"></el-option>
                  <el-option label="失败" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                  <span class="demonstration"  style="font-size:13px;">下单时间 :</span>
                  <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    value-format="yyyy-MM-dd"
                    @change="changePicker"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
              </el-form-item >
              <div></div>
                <el-button type="primary" @click="search()">筛选</el-button>
                <el-button type="primary" :disabled="subList==null" @click="exportTrade()">批量导出</el-button>
            </el-form>
          </div>
          <div class="index-content" v-loading.body="loading" element-loading-text="拼命加载中">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick(activeName2)">
              <el-tab-pane label="全部" name="0"></el-tab-pane>
              <el-tab-pane label="成功" name="1"></el-tab-pane>
              <el-tab-pane label="进行中" name="2"></el-tab-pane>
              <el-tab-pane label="退款" name="3"></el-tab-pane>
              <el-tab-pane label="失败" name="4"></el-tab-pane>
            </el-tabs>
            <div class="index-from">
               <el-table :data="subList">
                <el-table-column
                  prop="createTime"
                  label="时间">
                  <template scope="scope">
                    <div>{{scope.row.createTime|format}}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="proName"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="orderNo"
                  label="订单号">
                </el-table-column>
                <el-table-column
                  prop="memberName"
                  label="买方">
                </el-table-column>
                <el-table-column
                  prop="orderMoney"
                  label="支付金额(元)">
                </el-table-column>
                 <el-table-column 
                  label="状态"
                  show-overflow-tooltip>
                  <template scope="scope">
                    <span v-if="scope.row.status == 1">
                      成功
                    </span>
                    <span  v-if="scope.row.status == 2">
                      进行中
                    </span>
                    <span v-if="scope.row.status == 3">
                      退款
                    </span>
                     <span v-if="scope.row.status == 4">
                      失败
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template scope="scope">
                     <a target="_blank" :href="'/views/order/index.html#/detail/'+scope.row.id">查看</a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="block shop-textr" v-if="page.pageCount > 0">
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
        <contentNo :show="'trade'" v-else></contentNo>
      </el-tab-pane>
      <el-tab-pane label="保证金记录" name="bond">
        <div class="index-main">
          bond
        </div> 
      </el-tab-pane>
    </el-tabs>
</div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import Filter from 'assets/js/vueFilter';
export default {
  components: {
    contentNo
  },
  data () {
    return {
        dataCount:{//营业额统计数据
          yesterCount:'',
          sevenCount:'',
          settlementCount:'',
          usableBalance:''
        },
        subList:[],//列表数据
        page:{},//页面数据
        searchData:{//筛选数据
           curPage:'',
           orderNo:'',
           status:'',
           startTime:'',
           endTime:''
        },
        isShow: true,
        isPage:true,//潘墩列表页数多页
        activeName: 'index',//默认首页显示
        activeName2: '0',
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        loading:true,
    }
  },
  methods: {
    /**获取统计数据 */
    getTurnoverCount(){
      let _this = this;
      this.ajaxRequest({
        'url': DFshop.activeAPI.getTurnoverCount_post,
        'success':function (data){
          // console.log(data);
          _this.dataCount = data.data;
          _this.dataCount.yesterCount = '¥ '+data.data.yesterCount;
          _this.dataCount.sevenCount = '¥ '+data.data.sevenCount;
          _this.dataCount.settlementCount = '¥ '+data.data.settlementCount;
          _this.dataCount.usableBalance = '¥ '+data.data.usableBalance;
        }
      });
    },
    /** 
     * 筛选
    */
    search(){
      let _this = this;
      _this.searchData.curPage = 1;
      _this.activeName2=_this.searchData.status;
      _this.tradeList(_this.searchData);
    },
     changePicker(value){
       let _this = this;
       if(value != "" ){
          let date=value.split(" - ");
        _this.searchData.startTime=date[0];
        _this.searchData.endTime=date[1];
      }else{
        _this.searchData.startTime='';
        _this.searchData.endTime='';
      }
    },
    /**批量导出 */
    exportTrade(){
        let _this = this;
        _this.tradeList(_this.searchData);
        // console.log("导出");
        let str = "?1=1";
        if(_this.searchData.orderNo != ""){
            str += "&orderNo="+_this.searchData.orderNo;
        }
        if(_this.searchData.status != ""){
            str += "&status="+_this.searchData.status;
        }
        if(_this.searchData.startTime != null){
            str += "&startTime="+_this.searchData.startTime;
        }
         if(_this.searchData.endTime != null){
            str += "&endTime="+_this.searchData.endTime;
        }
        window.open(DFshop.activeAPI.exportTradeOrder_get+str);
    },
    /**
     * 交易记录多页请求
     * @param page     请求页数
     */
    tradeList(data){
      let _this = this;
      _this.loading=true;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.tradeList_post,
        'data':data,
        'success':function (data){
          // console.log(data.data,'data.data');
          _this.subList = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
          _this.loading=false;
        }
      });
    },
    /** 
     * 状态选项卡切换
    */
    handleClick(status) {
       let _this = this;
      _this.searchData.curPage = 1;
      _this.searchData.status = status;
      _this.tradeList(_this.searchData);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchData.curPage=val;
      this.tradeList(this.searchData);
    
    }
  },
  mounted(){
    let _this = this;
    _this.isAdminUser({
      success: function(data) {
        if (data.code == -1) return;
        _this.getTurnoverCount();
        _this.searchData.curPage=1;
        _this.tradeList(_this.searchData);
      }
    });
   
  }
}
</script>

<style lang="less">
@import '../less/index.less';
</style>
