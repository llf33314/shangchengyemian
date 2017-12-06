<template>
<div class="index-wrapper">
    <div class="index-main"  v-if="isShow">
      <div class="index-shopInfo">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-form-item class="input-all">
            <el-input v-model="searchData.queryName" placeholder="订单号/姓名/联系电话"></el-input>
          </el-form-item>
           <el-form-item >
              <span class="demonstration" 
                    style="font-size:13px;">下单时间 :</span>
              <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                value-format="yyyy-MM-dd" 
                @change="search_date"
                placeholder="选择日期范围"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item >
          <div>
            <el-form-item >
              <el-form-item label="订单类型 :">
                <el-select v-model="searchData.type" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="拼团" value="1"></el-option>
                  <el-option label="积分" value="2"></el-option>
                  <el-option label="秒杀" value="3"></el-option>
                  <el-option label="拍卖" value="4"></el-option>
                  <el-option label="粉币" value="5"></el-option>
                  <el-option label="预售" value="6"></el-option>
                  <el-option label="批发" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单来源 :">
                <el-select v-model="searchData.orderSource" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="PC端" value="0"></el-option>
                  <el-option label="微信" value="1"></el-option>
                  <el-option label="UC端" value="2"></el-option>
                  <el-option label="小程序" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态 :">
                <el-select v-model="searchData.status" placeholder="全部">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="待付款" value="1"></el-option>
                  <el-option label="待发货" value="2"></el-option>
                  <el-option label="已发货" value="3"></el-option>
                  <el-option label="已完成" value="4"></el-option>
                  <el-option label="已关闭" value="5"></el-option>
                  <el-option label="退款中" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item >
          </div>
          <div>
            <el-form-item >
              <el-form-item label="付款方式 :">
                <el-select v-model="searchData.orderPayWay" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="微信支付" value="1"></el-option>
                  <el-option label="货到付款" value="2"></el-option>
                  <el-option label="储值卡支付" value="3"></el-option>
                  <el-option label="积分支付" value="4"></el-option>
                  <el-option label="扫码支付" value="5"></el-option>
                  <el-option label="到店支付" value="6"></el-option>
                  <el-option label="找人代付" value="7"></el-option>
                  <el-option label="粉币支付" value="8"></el-option>
                  <el-option label="支付宝支付" value="9"></el-option>
                  <el-option label="小程序微信支付" value="10"></el-option> 
                </el-select>
              </el-form-item>
              <el-form-item label="物流方式 :">
                <el-select v-model="searchData.deliveryMethod" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="快递配送" value="1"></el-option>
                  <el-option label="上门自提" value="2"></el-option>
                  <el-option label="到店购买" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择店铺 :">
                <el-select v-model="searchData.shopId" placeholder="选择店铺">
                  <el-option label="全部" value=""></el-option>
                 <el-option class="max-input" v-for="item in shopList"
                  :key="item.id" :label="item.sto_name" :value="item.id">
                 </el-option>
                </el-select>
              </el-form-item>
            </el-form-item >
          </div>
            <el-button type="primary" @click="search()">筛选</el-button>
            <el-button type="primary" @click="exportTrade()">批量导出</el-button>
            <a v-if="tableData.videourl != null" :href="tableData.videourl">
                  <el-button type="warning"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
              </a>
        </el-form>
      </div>

      <div class="index-content" v-if="isTable">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane :label="'全部( '+count.status_total+' )'" name="0"></el-tab-pane>
          <el-tab-pane :label="'待付款( '+count.status1+' )'" name="1"></el-tab-pane>
          <el-tab-pane :label="'待发货( '+count.status2+' )'" name="2"></el-tab-pane>
          <el-tab-pane :label="'已发货( '+count.status3+' )'" name="3"></el-tab-pane>
          <el-tab-pane :label="'已完成( '+count.status4+' )'" name="4"></el-tab-pane>
          <el-tab-pane :label="'已关闭( '+count.status5+' )'" name="5"></el-tab-pane>
          <el-tab-pane :label="'退款中( '+count.status6+' )'" name="6"></el-tab-pane>
        </el-tabs>
        <div class="index-table"  v-if="tableData.page">
          <div class="table-header">
            <div class="table-th col-3">所属店铺</div>
            <div class="table-th col-4">商品</div>
            <div class="table-th col-1">单价</div>
            <div class="table-th col-1">数量</div>
            <div class="table-th col-3">售后</div>
            <div class="table-th col-1">买家</div>
            <div class="table-th col-2">下单时间</div>
            <div class="table-th col-1">订单状态</div>
            <div class="table-th col-2">实付金额</div>
            <div class="table-th col-1">订单来源</div>
          </div>
          <div class="table-content-box" v-for="order in tableData.page.subList" :key="order.id">
            <div class="table-content">
              <div class="table-tr shop-box-justify table-top">
                <p>订单号：{{order.orderNo}}
                  <span v-if="order.orderPayWay ==1 || order.orderPayWay ==10">微信安全支付</span>
                  <span v-else-if="order.orderPayWay ==2">货到付款</span>
                  <span v-else-if="order.orderPayWay ==3">储值卡支付</span>
                  <span v-else-if="order.orderPayWay ==4">积分支付</span>
                  <span v-else-if="order.orderPayWay ==5">扫码支付</span>
                  <span v-else-if="order.orderPayWay ==6">到店支付</span>
                  <span v-else-if="order.orderPayWay ==7">找人代付</span>
                  <span v-else-if="order.orderPayWay ==8">粉币支付</span>
                  <span v-else-if="order.orderPayWay ==9">支付宝支付</span> 
                </p>
                <p>
                  <a  @click="jumpRouter('order/detail/'+order.id)">订单详情</a>
                  <a  @click="printOrders(order.id,1)">打印订单</a>
                  <a @click="showDialogRemark(order.id)">备注</a>
                </p>
              </div>
              <div class="table-tr " >
                <div class="table-td border-r col-3">
                    {{order.shopName}}
                </div>
                <div class=" col-4">
                  <div class="clearfix table-item" v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                    <div class="table-img">
                      <defaultImg :background="imgUrl+orderDetail.productImageUrl"></defaultImg>
                    </div>
                    <div class="table-text">{{orderDetail.detProName}}
                      <p>{{orderDetail.productSpeciname}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="table-item" v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">&#65509;{{orderDetail.detProPrice}}</div>
                </div>
                <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">{{orderDetail.detProNum}}</div> 
                </div>
                <div class="border-r col-3">
                   <div class="table-item"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                     {{orderDetail.statusName}}
                     <p v-if="orderDetail.returnResult">
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowRefuseApplyButton == 1">拒绝退款</el-button>
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowAgreeApplyButton == 1">同意退款</el-button>
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowAgreeRetGoodsApplyButton == 1">同意退货退款</el-button>
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowConfirmTakeButton == 1" >确认收货</el-button>
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowRefuseConfirmTakeButton == 1">拒绝确认收货</el-button>
                      <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowUpdateAddressButton == 1">修改退货地址</el-button>
                     </p>
                    </div> 
                </div>
                <div class="table-td border-r col-1">{{order.memberName}}
                </div>
                <div class="table-td border-r col-2">{{order.createTime|format}}
                </div>
                <div class="table-td border-r col-1">
                  <p>{{order.orderStatusName}}</p>
                  <el-button type="primary" size="small" v-if="order.isShowCancelOrderButton == 1" @click="cancelOrder(order.id)">取消订单</el-button>
                  <el-button type="primary" size="small" v-if="order.isShowDeliveryButton == 1" @click="delivery(order.id)">发货</el-button>
                  <el-button type="primary" size="small" v-if="order.isShowPickUpGoodsButton == 1" @click="pickUpGoods(order.id)">确认已提货</el-button>
                </div>
                <div class="table-td border-r col-2">&#65509;{{order.orderMoney}}
                    <p v-if="order.orderFreightMoney >0" style="font-size:11px;color:#999">(含运费 &#65509;{{order.orderFreightMoney}})</p>
                    <p>
                      <el-button type="primary" size="small" v-if="order.isShowUpdatePriceButton == 1" @click="updateMoney(order.id)">修改价格</el-button>
                    </p>
                </div>
                <div class="table-td border-r col-1">{{order.typeName}}
                </div>
              </div>
              <div class="table-tr shop-box-justify table-footer">买家留言：{{order.orderSellerRemark}}
              </div>
            </div>
          </div>
            <contentNo :show="contentNo" v-if="tableData.page.rowCount == 0 " ></contentNo>
        </div>
        <div class="block shop-textr" v-if="isPage">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page='tableData.page.curPage'
            :page-size="tableData.page.pageSize"
            layout="prev, pager, next, jumper"
            :total="tableData.page.rowCount">
          </el-pagination>
        </div>
        <el-dialog title="商品发货" :visible.sync="dialogVisible"  size="small">
          <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
              <tbody>
                <tr class="order_tab_header">
                  <th width="33%">商品名称</th>
                  <th width="15%">单价(元)</th>
                  <th width="15%">数量</th>
                  <th width="22%">订单编号</th>
                  <th width="15%">实付金额</th>
                </tr>
                <tr v-for="(item,index) in orderData.mallOrderDetail" :key="index">
                  <td>{{item.detProName}}</td>
                  <td>{{item.detProPrice}}</td>
                  <td>{{item.detProNum}}</td>
                  <td class="text-overflow" :rowspan="orderData.mallOrderDetail.length">{{orderData.orderNo}}</td>
                  <td class="text-overflow" :rowspan="orderData.mallOrderDetail.length">{{orderData.orderMoney}}</td>
                </tr>
              </tbody>
            </table>
          <div class="dialog-list">
            <span>收货信息 :</span>
            {{orderData.receiveAddress}},{{orderData.receiveName}},{{orderData.receivePhone}} 
          </div>
          <div class="dialog-list">
            <span>发货方式  :</span>
            <el-radio class="radio" v-model="expressData.expressWay" label="1">需要物流</el-radio>
            <el-radio class="radio" v-model="expressData.expressWay" label="0">无需物流</el-radio>
          </div>
          <div class="dialog-list">
            <el-form :inline="true" class="demo-form-inline" :model="expressData" :rules="rules" ref="expressData" label-width="88px" label-position="left">
              <el-form-item label="物流公司:" prop="expressId">
                <el-select v-model="expressData.expressId"  placeholder="请选择" >
                  <el-option :label="option.item_value" :value="option.item_key" :key="option.item_key" v-for="(option,index) in expressList" ></el-option> 
                  <el-option :value="999" label="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物流名称 :" v-if=" expressData.expressId === 999 " prop="otherExpressName">
                <el-input v-model="expressData.otherExpressName" placeholder="请输入物流名称"  ></el-input>
              </el-form-item>
              <el-form-item label="快递单号 :" prop="expressDelivery" >
                <el-input v-model="expressData.expressDelivery" placeholder="请输入快递单号"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog-list shop-textr">
            <el-button type="primary" @click="submitForm('expressData')">确定</el-button>
            <el-button @click="resetForm('expressData')">取消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="取消订单" :visible.sync="dialogCancelOrder" style="width:40%;margin:0 auto">
          <el-select v-model="cancelData.sellerReason" placeholder="请选择取消订单的理由">
             <el-option class="max-input" v-for="item in cancelReasonList"
                :key="item.item_key" :label="item.item_value" :value="item.item_key">
              </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitCancelOrder()">确 定</el-button>
            <el-button @click="resetCancelOrder()">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改订单金额" :visible.sync="dialogUpMoneyVisible"  size="small">
          <el-table :data="orderData.mallOrderDetail" style="width: 100%" border>
            <el-table-column
              prop="detProName"
              label="商品名称"
              width="300">
            </el-table-column>
            <el-table-column
              prop="detProPrice"
              label="单价(元)">
            </el-table-column>
            <el-table-column
              prop="detProNum"
              label="数量"> 
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="小计(元)">
            </el-table-column>
            <el-table-column
              width="240"
              label="填写修改商品总价（单价*数量）">
              <template scope="scope">
                <el-input placeholder="请输入商品价格" v-model="scope.row.updateMoney" :value="scope.row.totalPrice" ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="dialog-list">
            <span>收货信息 :</span>
            {{orderData.receiveAddress}},{{orderData.receiveName}},{{orderData.receivePhone}} 
          </div>
          <div class="dialog-list">
            <span>买家实付  :</span>
            {{orderData.orderMoney}}元
             <span v-if="orderData.orderFreightMoney >0" style="font-size:13px;color:red">(含运费{{orderData.orderFreightMoney}})</span>
          </div>
          <div class="dialog-list shop-textr">
            <el-button type="primary" @click="submitUpMoney()">确定</el-button>
            <el-button @click="dialogUpMoneyVisible=false">取消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="卖家备注" :visible.sync="dialogSellerRemark">
          <el-input type="textarea" v-model="remarkData.orderSellerRemark" auto-complete="off" placeholder="最多可输入256个字符"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitRemark()">确 定</el-button>
            <el-button @click="dialogSellerRemark = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="打印订单" :visible.sync="dialogPrintOrders" class="print-orders">
          <div class="print-box">
            <p class="title"> {{printData.orderName}} </p>
            <p class="phone">联系电话： {{printData.phone}}</p>
            <span class="page_num" v-if="printData.totalPage>1">共2页 第2页</span>
            <div class="order_layer_main">
              <ul class="clearfix order_list">
                <li class="text-overflow">客户名称：{{printData.memberName}}</li>
                <li class="text-overflow">所属店铺：{{printData.store}}</li>
                <li class="text-overflow">客户电话：{{printData.memberPhone}}</li>
                <li class="text-overflow">订单编号：{{printData.orderNum}}</li>
                <li class="text-overflow">客户地址：{{printData.memberAddress}}</li>
                <li class="text-overflow">下单时间：{{printData.orderTime}}</li>
              </ul>
              <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
                <tbody>
                  <tr>
                    <th width="130">商品条形码</th>
                    <th width="265">商品名称</th>
                    <th width="80">原价</th>
                    <th width="46">数量</th>
                    <th width="80">优惠</th>
                    <th width="80">小计</th>
                  </tr>
                  <tr v-for="(item,index) in printData.lists"
                  :key="index">
                    <td></td>
                    <td>{{item.name}}</td>
                    <td>{{item.amount}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.disount?item.disount:''}}</td>
                    <td>{{item.subtotal}}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="border-right: none;">买家留言：</td>
                    <td colspan="3" style="border-left: none;">应收总额： ￥{{printData.totalAmount}}</td>
                  </tr>
                </tbody>
              </table>
              <div>配送方式：{{printData.deliveryType}}</div>
              <div>商家备注：</div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div class="shop-inblock" v-if="printData.totalPage>1">
              <el-pagination
                :page-size="5"
                @current-change="printChange"
                layout="prev, pager, next, jumper"
                :current-page='printData.curPage'
                :total="5*printData.totalPage">
              </el-pagination>
            </div>
            <el-button type="primary">打印</el-button>
            <el-button>打印预览</el-button>
          </div>  
        </el-dialog>

      </div>
    </div> 
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data () {
    return {
        contentNo:'order',
        isShow: true,
        isTable: true,//是否有数据
        isPage: true,//列表页数多页
        pickerOptions2: {
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
        activeName2: '0',
        dialogVisible:false,
        dialogCancelOrder:false,
        dialogUpMoneyVisible:false,
        dialogSellerRemark:false,
        dialogPrintOrders:false,//打印订单
        printData:'',//打印数据
        imgUrl:'',
        value7: '',
        shopList:[],
        tableData: [],//订单列表
        orderData: {},//订单详情
        count:[],//状态统计数量
        expressList:[],//快递公司列表
        cancelReasonList:[],//取消订单理由列表
        searchData: {//订单查询参数信息
          orderType:'0',  //类型 (0 所有订单 -1维权订单)
          queryName: '',
          startTime: '',
          endTime:'',
          type:'',
          orderSource:'',
          status:'0',
          orderPayWay:'',
          deliveryMethod:'',
          shopId:'',
          curPage:''
        },
        expressData:{//发货参数
          orderId:'',
          expressDelivery:'',
          otherExpressName:'',
          expressId:'',
          expressWay:'1',
          express:'1'
        },
        cancelData:{//取消订单参数
          orderId:'',
          sellerReason:'',//取消订单理由key
          type:'2' 
        },
        remarkData:{},//提交卖家备注参数
        rules: {
          expressId: [
            { type: 'number', required: true, message: '请选择物流公司', trigger: 'blur' },
          ], 
          otherExpressName: [
            { required: true, message: '请输入物流名称', trigger: 'blur' },
          ],
          expressDelivery: [
            { required: true, message: '请输入快递单号', trigger: 'blur' },
          ]
        }
    }
  },
  watch:{
    '$route'(a,b){
      //this.$router.push({path:b.path})
    }
  },
  methods: {
     /**时间筛选查询 */
    search_date(value){
      let _this = this;
      _this.searchData.curPage=1;
      if(value != ""){
        let date=value.split(" - ");
        _this.searchData.startTime=date[0]
        _this.searchData.endTime=date[1];
      }else{
        _this.searchData.startTime='';
        _this.searchData.endTime='';
      }
    },
     /**筛选查询 */
    search(){
      let _this = this;
      _this.searchData.curPage=1;
      _this.mallOrderList(_this.searchData);
    },
     /**
     * 所有订单列表多页请求
     * @param data     请求数据
     */
    mallOrderList(searchData){
      let _this = this;
      _this.tableData = [];
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallOrderList_post,
        'data':searchData,
        'success':function (data){
           console.log(data.data,'data.data');
          _this.tableData = data.data;
          if(searchData.curPage == 1){
            _this.count=data.data.count;
          }
          _this.activeName2=_this.searchData.status;
          _this.imgUrl = data.imgUrl;
          // console.log(_this.tableData,'_this.tabelData');
        }
      });
    },  
    /**确认已提货 */
    pickUpGoods(id){
      let _this = this;
      _this.$confirm('确认买家是否已提货并付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.ajaxRequest({
          'url': DFshop.activeAPI.updateStatus_post,
          'data':{
            "type":'5',
            "orderId":id,
            "status":'4'
          },
          'success':function (data){
            _this.$message({
                message: '提货成功',
                type: 'success'
            });
            _this.searchData.curPage=1;
            _this.mallOrderList( _this.searchData);
          }
        });
      }).catch(() => {
              
      });
    },

    /**取消订单 弹出框显示 */
    cancelOrder(id){
      let _this = this;
      _this.dialogCancelOrder=true;
      _this.cancelData.orderId=id;
      _this.cancelReasonMap();
    },
    /**取消订单 确定按钮*/
     submitCancelOrder() {
      let _this = this;
      if(_this.cancelData.sellerReason ==""){
        _this.$message({
            message: '请选择取消订单理由',
            type: 'error'
        });
        return false;
      }
      // console.log(_this.cancelData,'_this.expressData');
      _this.ajaxRequest({
        'url': DFshop.activeAPI.updateStatus_post,
        'data':_this.cancelData,
        'success':function (data){
          _this.cancelData={};
          _this.dialogCancelOrder=false;
          _this.$message({
              message: '取消订单成功',
              type: 'success'
          });
          _this.searchData.curPage=1;
          _this.mallOrderList( _this.searchData);
        }
      });
    },
     /**取消订单  取消按钮*/
    resetCancelOrder() {
      let _this = this;
      _this.dialogCancelOrder=false;
      _this.cancelData.orderId='';
      _this.cancelData.sellerReason='';
    },
    /**修改价格 对话框显示 */
    updateMoney(id){
      let _this = this;
      _this.dialogUpMoneyVisible=true;
      _this.orderInfo(id);
    },
    /**修改价格 确定 */
    submitUpMoney(){
      let _this = this;
       let orderId='';
      let orderMoney=0;
      var detailObj=[];
      if(_this.orderData.mallOrderDetail.length == 0 ){
         _this.$message({
              message: '商品信息为空',
              type: 'error'
          });
          return false;
      }
      var i = 0;
      for (var n = _this.orderData.mallOrderDetail.length; i < n; i++) {
          var detail=_this.orderData.mallOrderDetail[i];
        if(detail.updateMoney ==""){
           _this.$message({
              message: '商品的价格不能为空',
              type: 'error'
          });
          return false;
        }
        detailObj[i]={
          "id":detail.id,
          "proMoney":detail.updateMoney,
          "num":detail.detProNum
        };
        orderId= detail.orderId;
        orderMoney += Number(detail.updateMoney);
      };
      var updateMoneyData={
          "orderId":orderId,
          "orderMoney":orderMoney,
          "detailObj":JSON.stringify(detailObj)
      }
      _this.ajaxRequest({
        'url': DFshop.activeAPI.updateStatus_post,
        'data':updateMoneyData,
        'success':function (data){
          _this.dialogUpMoneyVisible=false;
          _this.$message({
              message: '修改价格成功',
              type: 'success'
          });
          _this.searchData.curPage=1;
          _this.mallOrderList( _this.searchData);
        }
      });
    },
    /**发货对话框显示 */
    delivery(id){
      let _this = this;
      _this.dialogVisible=true;
      _this.expressData.orderId=id;
      _this.orderInfo(id);
      _this.mallExpressList();
    },
    /**订单发货 */
     submitForm(formName) {
       let _this = this;
       _this.$refs[formName].validate((valid) => {
        if (valid) {
          // var params =JSON.stringify(_this.expressData);
          if(_this.expressData.expressId != 999){
            _this.expressData.otherExpressName='';;
          }
          //  console.log(_this.expressData,'_this.expressData');
          _this.ajaxRequest({
            'url': DFshop.activeAPI.updateStatus_post,
            'data':_this.expressData,
            'success':function (data){
              // console.log(data,'data.data');
              _this.expressData={};
              _this.dialogVisible=false;
              _this.$message({
                  message: '发货成功',
                  type: 'success'
              });
              _this.searchData.curPage=1;
              _this.mallOrderList( _this.searchData);
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    /**订单发货  取消*/
    resetForm(formName) {
      this.expressData.expressId = '';
      this.expressData.expressWay ='1';
      this.$refs[formName].resetFields();
      this.dialogVisible =false;
    },
    /**打开 卖家备注 对话框  */
    showDialogRemark(id){
      let _this = this;
      _this.remarkData.orderId=id;
      _this.remarkData.orderSellerRemark='';
      _this.dialogSellerRemark=true;
    },
    /**提交 卖家备注 */
    submitRemark(){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.updateStatus_post,
        'data':_this.remarkData,
        'success':function (data){
          _this.remarkData={};
          _this.dialogSellerRemark=false;
          _this.$message({
              message: '添加备注成功',
              type: 'success'
          });
          _this.searchData.curPage=1;
          _this.mallOrderList( _this.searchData);
        }
      });
    },
    /**获取订单详情 */
    orderInfo(id){
      let _this = this;
      _this.orderData = {};
      _this.ajaxRequest({
        'url': DFshop.activeAPI.orderInfo_post,
        'data':{"id":id},
        'success':function (data){
           console.log(data.data,'data.data');
          _this.orderData = data.data;
          //用于修改价格时存储使用
           _this.orderData.mallOrderDetail.forEach((e,i)=>{
             e.updateMoney=e.totalPrice;
           })
        }
      });
    },
    /**获取快递公司信息 */
    mallExpressList(){
      let _this = this;
      _this.expressList = {};
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallFreightExpressList_post,
        'success':function (data){
           console.log(data.data,'data.data');
          _this.expressList = data.data;
        }
      });
    },
    /**获取取消订单理由列表 */
    cancelReasonMap(){
      let _this = this;
      _this.cancelReasonList =[];
      _this.ajaxRequest({
        'url': DFshop.activeAPI.cancelReasonMap_post,
        'success':function (data){
           console.log(data.data,'data.data');
          _this.cancelReasonList = data.data;
        }
      });
    },
    /**选项卡切换 */
    handleClick() {
      let _this = this;
      _this.searchData.curPage=1;
      _this.searchData.status = _this.activeName2;
      _this.mallOrderList(_this.searchData);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.searchData.curPage=val;
      this.mallOrderList( this.searchData);
    },
    /**批量导出 */
    exportTrade(){
      let _this = this;
      console.log("导出");
      let str = "?1=1";
      if(_this.searchData.orderType != ""){
          str += "&orderType="+_this.searchData.orderType;
      }
      if(_this.searchData.queryName != ""){
          str += "&queryName="+_this.searchData.queryName;
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
        if(_this.searchData.type != ""){
          str += "&type="+_this.searchData.type;
      }
        if(_this.searchData.orderSource != ""){
          str += "&orderSource="+_this.searchData.orderSource;
      }
        if(_this.searchData.orderPayWay != ""){
          str += "&orderPayWay="+_this.searchData.orderPayWay;
      }
        if(_this.searchData.deliveryMethod != ""){
          str += "&deliveryMethod="+_this.searchData.deliveryMethod;
      }
        if(_this.searchData.shopId != ""){
          str += "&shopId="+_this.searchData.shopId;
      }
      window.open(DFshop.activeAPI.exportMallOrderr_get+str);
    },
    /** 
     * 打印订单
     * @param id 选择打印id
     * @param curPage 页数
     */
    printOrders(id,curPage){
      let _this = this;
       _this.ajaxRequest({
        'url': DFshop.activeAPI.exportMallOrderr_post,
        'data':{
          curPage: curPage || 1, //页数
          orderId: id //订单ID  必传
        },
        'success':function (data){
          console.log(data.data,'打印数据');
          _this.printData = data.data;
          _this.dialogPrintOrders = true;
        }
      });
    },
    /** 
     * 
     */
    printChange(val){
      this.printOrders(data,val)
    }
  },
  mounted(){
    let _this = this;
     _this.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });
    _this.searchData.curPage=1;
    _this.mallOrderList( _this.searchData);
  }
}
</script>

<style lang="less">
 
</style>

