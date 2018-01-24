<template>
<div class="index-wrapper">
    <div class="index-main"  v-if="isShow">
      <div class="index-shopInfo">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-form-item class="input-all">
            <el-input v-model.trim="searchData.queryName" placeholder="订单号/姓名/联系电话" @keyup.enter.native="search"></el-input>
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
              <el-form-item label="订单来源 :" v-if="tabActive == '/allOrder'">
                <el-select v-model="searchData.orderSource" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="PC端" value="0"></el-option>
                  <el-option label="微信" value="1"></el-option>
                  <el-option label="UC端" value="2"></el-option>
                  <el-option label="小程序" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态 :" v-if="tabActive == '/allOrder'">
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
              <el-form-item label="订单状态 :" v-if="tabActive == '/returnOrder'">
                <el-select v-model="searchData.status" placeholder="全部">
                  <el-option label="全部" value="7"></el-option>
                  <el-option label="退款处理中" value="8"></el-option>
                  <el-option label="退款结束" value="9"></el-option> 
                </el-select>
              </el-form-item>
              <el-form-item label="维权状态 :" v-if="tabActive == '/returnOrder'">
                <el-select v-model="searchData.returnStatus" placeholder="全部">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="还未退款" value="-3"></el-option>
                  <el-option label="退款中" value="0"></el-option> 
                  <el-option label="退款成功" value="1"></el-option> 
                  <el-option label="已同意退款退货，请退货给商家" value="2"></el-option> 
                  <el-option label="已退货等待商家确认收货" value="3"></el-option> 
                  <el-option label="商家未收到货，不同意退款申请" value="4"></el-option> 
                  <el-option label="退款退货成功" value="5"></el-option> 
                  <el-option label="退款失败(卖家不同意退款)" value="-1"></el-option> 
                  <el-option label="买家撤销退款" value="-2"></el-option>  
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
           <!--todo 选中了状态 没有点击筛选 再点下一页 列表数据是筛选选的状态列表-->
            <el-button type="primary" @click="search()">筛选</el-button>
            <el-button type="primary" @click="exportTrade()">批量导出</el-button>
            <a v-if="videourl != '' &&videourl != undefined" :href="videourl"  target="_blank" style="float: right;">
                  <el-button type="warning" class="video-button" ><i class="iconfont icon-cplay1"></i>视频教程</el-button>
              </a>
        </el-form>
      </div>

      <div class="index-content" v-if="isTable">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" v-if="count !='' && tabActive == '/allOrder'">
          <el-tab-pane :label="'全部( '+(count.status_total|'0')+' )'" name="0"></el-tab-pane>
          <el-tab-pane :label="'待付款( '+(count.status1|'0')+' )'" name="1" ></el-tab-pane>
          <el-tab-pane :label="'待发货( '+(count.status2|'0')+' )'" name="2" ></el-tab-pane>
          <el-tab-pane :label="'已发货( '+(count.status3|'0')+' )'" name="3" ></el-tab-pane>
          <el-tab-pane :label="'已完成( '+(count.status4|'0')+' )'" name="4" ></el-tab-pane>
          <el-tab-pane :label="'已关闭( '+(count.status5|'0')+' )'" name="5" ></el-tab-pane>
          <el-tab-pane :label="'退款中( '+(count.status6|'0')+' )'" name="6" ></el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" v-if="count !='' && tabActive == '/returnOrder'">
          <el-tab-pane :label="'全部( '+(count.status7|'0')+' )'" name="7" ></el-tab-pane>
          <el-tab-pane :label="'退款处理中( '+(count.status8|'0')+' )'" name="8" ></el-tab-pane>
          <el-tab-pane :label="'退款结束( '+(count.status9|'0')+' )'" name="9" ></el-tab-pane>
        </el-tabs>
        <div class="index-table" v-loading.body="loading" element-loading-text="拼命加载中">
          <div class="table-header">
            <div class="table-th col-3">所属店铺</div>
            <div class="table-th col-4">商品</div>
            <div class="table-th col-1">单价</div>
            <div class="table-th col-1">数量</div>
            <div class="table-th col-3">售后</div>
            <div class="table-th col-1">买家</div>
            <div class="table-th col-2">下单时间</div>
            <div class="table-th col-1">订单状态</div>
            <div class="table-th col-1">实付金额</div>
            <div class="table-th col-1">订单来源</div>
          </div>
          <div class="table-content-box" v-for="order in subList" :key="order.id">
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
                  <span> —— &nbsp;&nbsp;{{order.orderTypeName}}</span>
                </p>
                <p>
                  <a @click="jumpRouter('detail/'+order.id)">订单详情</a>
                  <a v-if="order.orderPayWay !=5" @click="openDialog(5,order.id)">打印订单</a>
                  <a @click="openDialog(4,order)">备注</a>
                </p>
              </div>
              <div class="table-tr " >
                <div class="table-td border-r col-3">
                    {{order.shopName}}
                </div>
                <div class=" col-4">
                  <div class="clearfix table-item" v-if="order.orderPayWay !=5"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                    <div class="table-img">
                      <defaultImg :background="imgUrl+orderDetail.productImageUrl"></defaultImg>
                    </div>
                    <div class="table-text">{{orderDetail.detProName}}
                      <p>{{orderDetail.productSpeciname}}</p>
                    </div>
                  </div>
                  <div class="clearfix table-item" v-else>
                    <div class="table-img"></div>
                    <div class="table-text">扫码支付</div>
                  </div>
                </div>
                <div class="col-1">
                   <div class="table-item" v-if="order.orderPayWay !=5"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                      &#65509;{{orderDetail.detProPrice}} 
                  </div> 
                  <div class="table-item" v-else >&#65509;{{order.orderMoney}}</div> 
                </div>
                <div class=" border-r col-1">
                  <div class="table-item" v-if="order.orderPayWay !=5"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                      {{orderDetail.detProNum}} 
                  </div> 
                  <div class="table-item" v-else >1</div> 
                </div>
                <div class="border-r col-3">
                   <div class="table-item order-ret-but"  v-for="orderDetail in order.mallOrderDetail" :key="orderDetail.id">
                     {{orderDetail.statusName}}
                     <p v-if="orderDetail.returnResult && order.orderPayWay !=5">
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowAgreeApplyButton == 1" @click="openDialog(6,orderDetail.returnResult,1,order)">同意退款</el-button>
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowAgreeRetGoodsApplyButton == 1" @click="openDialog(6,orderDetail.returnResult,2,order)">同意退货退款</el-button>
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowRefuseApplyButton == 1" @click="openDialog(6,orderDetail.returnResult,-1,order)">拒绝退款</el-button>
                        
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowConfirmTakeButton == 1" @click="openDialog(6,orderDetail.returnResult,3,order)">确认收货并退款</el-button>
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowRefuseConfirmTakeButton == 1" @click="openDialog(6,orderDetail.returnResult,4,order)">拒绝确认收货</el-button>
                        
                        <el-button type="primary" size="small" v-if="orderDetail.returnResult.isShowUpdateAddressButton == 1" @click="openDialog(6,orderDetail.returnResult,5,order)">修改退货地址</el-button>
                     </p>
                    </div> 
                </div>
                <div class="table-td border-r col-1">{{order.memberName}}
                </div>
                <div class="table-td border-r col-2">{{order.createTime|format}}
                </div>
                <div class="table-td border-r col-1" v-if="order.orderPayWay !=5">
                  <p>{{order.orderStatusName}}</p>
                  <el-button type="primary" size="small" v-if="order.isShowCancelOrderButton == 1" @click="openDialog(1,order.id)">取消订单</el-button>
                  <el-button type="primary" size="small" v-if="order.isShowDeliveryButton == 1" @click="openDialog(3,order)">发货</el-button>
                  <el-button type="primary" size="small" v-if="order.isShowPickUpGoodsButton == 1" @click="pickUpGoods(order.id,1)">确认已提货</el-button>
                </div>
                <div class="table-td border-r col-1" v-else>
                  <p v-if="order.orderStatus==1">待付款</p>
                  <p v-else-if="order.orderStatus==2">已付款</p>
                  <p v-else-if="order.orderStatus==5">订单已关闭</p>
                </div>
                <div class="table-td border-r col-1">&#65509;{{order.orderMoney}}
                    <p v-if="order.orderFreightMoney >0" style="font-size:11px;color:#999">
                      (含运费<span v-if="order.orderMoney>order.orderFreightMoney">&#65509;{{order.orderFreightMoney}}</span>)
                    </p>
                    <p  v-if="order.orderPayWay !=5">
                      <el-button type="primary" size="small" v-if="order.isShowUpdatePriceButton == 1" @click="openDialog(2,order)">修改价格</el-button>
                    </p>
                </div>
                <div class="table-td border-r col-1">{{order.typeName}}
                </div>
              </div>
              <div class="table-tr shop-box-justify table-footer">买家留言：{{order.orderBuyerMessage}}
              </div>
            </div>
          </div>
            <contentNo :show="contentNo" v-if="page.rowCount == 0 " ></contentNo>
        </div>
        <div class="block shop-textr" v-if="page.pageCount > 1">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page='page.curPage'
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="page.rowCount">
          </el-pagination>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  size="small"  :class="dialogType == 1 ? 'minDialog':''">
          <cancel-order :id="orderId" @code="dialogResult" v-if="dialogType ==1"> </cancel-order>
          <update-money :data= "orderData" @code="dialogResult" v-if="dialogType ==2"> </update-money>
          <deliver-goods :row= "orderData" @code="dialogResult" v-if="dialogType ==3"> </deliver-goods>
          <seller-remark :data= "orderData" @code="dialogResult" v-if="dialogType ==4"> </seller-remark>
          <print-order :id= "orderId"  @code="dialogResult" v-if="dialogType ==5"> </print-order>
          <return-status :data= "orderData" :returnData="returnData" :returnType="returnType" @code="dialogResult" v-if="dialogType ==6"> </return-status>
        </el-dialog>
      </div>
    </div> 
  </div>
</template>
 <script>
import commons from '../common';
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
import deliverGoods from '../../components/deliverGoods';
import updateMoney from '../../components/updateMoney';
import cancelOrder from '../../components/cancelOrder';
import sellerRemark from '../../components/sellerRemark';
import printOrder from '../../components/printOrder';
import returnStatus from '../../components/returnStatus';
export default {
  components: {
    contentNo,defaultImg,deliverGoods,updateMoney,cancelOrder,sellerRemark,printOrder,returnStatus
  },
  data () {
    return {   
        tabActive:'',
        contentNo:'order',
        isShow: true,
        isTable: true,//是否有数据
        isPage: true,//列表页数多页
        loading: false,
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
        returnData:{},
        activeName2: '0', //默认选项卡
        imgUrl:'',
        value7: '',
        shopList:[],
        subList:[],//列表数据
        videourl:'',//视频地址
        page:{},//页面数据
        count:[],//状态统计数量
        searchData: {//订单查询参数信息
          orderType:'0',  //类型 (0 所有订单 -1维权订单)
          queryName: '',
          startTime: '',
          endTime:'',
          type:'',
          orderSource:'',
          status:'0',
          returnStatus:'',
          orderPayWay:'',
          deliveryMethod:'',
          shopId:'',
          curPage:''
        }
    }
  },
  watch:{
    '$route'(a,b){
       let _this = this;
       //所有订单,维权订单切换时  改变初始数据
      this.tabActive=a.path;
      if(_this.tabActive =='/allOrder'){
       _this.searchData.orderType ='0';
       _this.searchData.status ='0';
       _this.searchData.returnStatus ='';
       this.$parent.activeName ="allOrder";
     }else{
       _this.searchData.orderType ='-1';
       _this.searchData.status ='7';
       _this.searchData.orderSource ='';
       this.$parent.activeName ="returnOrder";
     }
     _this.isAdminUser({
        success: function(data) {
          if (data.code == -1) return;
          _this.searchData.curPage=1;
          _this.mallOrderList( _this.searchData);
        }
      });
    },
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
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
      _this.loading = true;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallOrderList_post,
        'data':searchData,
        'success':function (data){
          //  console.log(data.data,'data.data');
          _this.subList = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
          _this.imgUrl = data.imgUrl;
          _this.videourl = data.data.videourl;
          if(searchData.curPage == 1){
            _this.count=data.data.count;
          }
          _this.activeName2=_this.searchData.status;
          _this.loading = false;
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
            //  console.log(data.data,'data.data');
            _this.orderData = data.data;
          }
        });
    },
    /**弹出框 成功返回结果 */
    dialogResult(val) {
        let _this = this;
        _this.dialogVisible=false;
        // console.log(val);
        if(val){
            _this.searchData.curPage=_this.page.curPage;
            _this.mallOrderList( _this.searchData); 
        }
    },

    /**选项卡切换 */
    handleClick() {
      let _this = this;
 
      _this.searchData.curPage=1;
      _this.searchData.status = _this.activeName2;
      _this.mallOrderList( _this.searchData);
   
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.searchData.curPage=val;
      this.mallOrderList( this.searchData);
      $(window).scrollTop(0);
    },
    /**批量导出 */
    exportTrade(){
      let _this = this;
      _this.mallOrderList( _this.searchData);
      // console.log("导出");
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
      if(_this.searchData.returnStatus != ""){
          str += "&returnStatus="+_this.searchData.returnStatus;
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
    }
  },
  mounted(){
     // console.log(this.$route.path,"tab.name");
    let _this = this;
     //所有订单,维权订单切换时  改变初始数据
     _this.tabActive=this.$route.path;
      if(_this.tabActive =='/allOrder'){
       _this.searchData.orderType ='0';
       _this.searchData.status ='0';
       _this.searchData.returnStatus ='';
       this.$parent.activeName ="allOrder";
     }else{
       _this.searchData.orderType ='-1';
       _this.searchData.status ='7';
       _this.searchData.orderSource ='';
       this.$parent.activeName ="returnOrder";
     }
  
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
.minDialog{
 .el-dialog--small{
   width:18%
 }
}
 
.order-ret-but {
  .el-button+.el-button{
    margin-top: 3px;
    margin-left: 0px;
  }
}
</style>

