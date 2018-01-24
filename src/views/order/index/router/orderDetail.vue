<template>
<div class="order-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/allOrder' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="order-main">
    <div class="shop-steps" v-if="active < 5">
      <el-steps :active="active"  center  style="width:96%">
        <el-step title="买家下单" :description="orderDetail.createTime|format"></el-step>
        <el-step title="买家付款" :description="twoDate"></el-step>
        <el-step title="商家发货" :description="threeDate"></el-step>
        <el-step title="交易完成" :description="fourDate"></el-step>
      </el-steps>
    </div>
    <div class="shop-steps" v-if="active == 5">
      <el-steps :active="active"  center  style="width:96%">
        <el-step title="买家下单" :description="orderDetail.createTime|format"></el-step>
        <el-step title="订单已关闭" :description="fourDate"></el-step>
      </el-steps>
    </div>
    <div class="order-content">
      <el-row :gutter="20">
        <el-col :span="Number(colWidth)">
          <div class="order-item">
            <div class="order-title">
              订单信息
            </div>
            <div class="order-item-content">
              <div class="order-item-list">
                <div class="order-item-title">订单编号 : 
                </div>
                <span>
                  {{orderDetail.orderNo}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">所属店铺 : 
                </div>
                <span>
                 {{orderDetail.shopName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家昵称 : 
                </div>
                <span>
                  {{orderDetail.memberName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">订单来源 : 
                </div>
                <span>
                  {{orderDetail.typeName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">下单时间 : 
                </div>
                <span>
                 {{orderDetail.createTime|format}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">配送方式 : 
                </div>
                <span v-if="orderDetail.deliveryMethod ==1">快递配送</span>
                <span v-else-if="orderDetail.deliveryMethod ==2">上门自提</span>
                <span v-else-if="orderDetail.deliveryMethod ==3">到店购买</span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货地址 : 
                </div>
                <span>
                  {{orderDetail.receiveAddress}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货人 : 
                </div>
                <span>
                  {{orderDetail.receiveName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">联系电话 : 
                </div>
                <span>
                 {{orderDetail.receivePhone}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家留言 : 
                </div>
                <p>
                   {{orderDetail.orderBuyerMessage}}
                </p>
                <!-- <el-button type="primary" v-if="orderDetail.orderStatus >=3 && orderDetail.orderStatus !=5 && orderDetail.expressNumber !='' ">查看物流信息</el-button> -->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11" v-if="JSON.stringify(returnData) != '{}' " >
          <div class="order-item">
            <div class="order-title">
              维权信息
            </div>
            <div class="order-item-content" style="padding-left:80px;">
              <p class="order-tishi"><i class="iconfont icon-tishi"></i>
               <span v-if="returnData.retHandlingWay == 1"> 买家发起退款申请</span>
                <span v-if="returnData.retHandlingWay == 2">买家发起退货退款申请</span>
              </p>
              <p v-if="returnData.applyTimes">您还有
                <span class="fs36" style="color:red">
                    <em v-text="time.DD"></em> 天
                    <em v-text="time.HH"></em>时
                    <em v-text="time.mm"></em>分
                    <em v-text="time.ss"></em>秒</span>
                    响应买家发起的维权，若超过期限没有响应，则系统默认您同意退款，并将款项原路打回买家账户。
              </p>
              <p v-if="returnData.takeTimes">您还有
                 <span class="fs36" style="color:red">
                    <em v-text="time.DD"></em> 天
                    <em v-text="time.HH"></em>时
                    <em v-text="time.mm"></em>分
                    <em v-text="time.ss"></em>秒</span>
                    确认收货，若超过期限没有确认收货，则系统默认您收货，并将款项原路打回买家账户。
              </p>
              <div class="order-item-list ">
                <div class="order-item-title">退款类型 : 
                </div>
                <span v-if="returnData.retHandlingWay == 1"> 仅退款 </span>
                <span v-if="returnData.retHandlingWay == 2"> 退货退款 </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">订单状态 : 
                </div>
                <span>
                  {{orderDetail.orderStatusName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">退款原因 : 
                </div>
                <span>
                   {{returnData.retReason}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">退款金额 : 
                </div>
                <span>
                  &#65509;{{returnData.retMoney}}
                </span>
              </div>
              <div class="order-item-list rights-record">
                <div class="order-title">
                  维权记录
                </div>
                <div class="order-item-content">
                  <div class="rights-record-list " v-for="log in returnData.orderReturnLogList" :key="log.id">
                    <el-row :gutter="15">
                      <el-col :span="10">
                         {{log.createTime|format}}
                      </el-col>
                      <el-col :span="11">
                         {{log.statusContent}}
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
               <div class="order-item-list" style="margin-top:20px;">
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeApplyButton == 1" @click="openDialog(6,returnData,1)">同意退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeRetGoodsApplyButton == 1" @click="openDialog(6,returnData,2)">同意退货退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseApplyButton == 1" @click="openDialog(6,returnData,-1)">拒绝退款</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowConfirmTakeButton == 1" @click="openDialog(6,returnData,3)">确认收货并退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseConfirmTakeButton == 1" @click="openDialog(6,returnData,4)">拒绝确认收货</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowUpdateAddressButton == 1" @click="openDialog(6,returnData,5)">修改退货地址</el-button>
                <el-button  size="small" v-if="returnData.isShowRefuseApplyButton == 1">申请多粉介入</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="order-item">
        <div class="order-title">
          卖家备注
        </div>
        <div class="order-item-content">
          {{orderDetail.orderSellerRemark}}
        </div>
      </div>
      <div class="order-table">
        <div class="table-header">
          <div class="table-th col-2">商品</div>
          <div class="table-th col-1">单价</div>
          <div class="table-th col-1">数量</div>
          <div class="table-th col-1">优惠</div>
          <div class="table-th col-1">售后</div>
          <div class="table-th col-1">小计</div>
          <div class="table-th col-1">订单状态</div>
          <div class="table-th col-1">运费</div>
          <div class="table-th col-1">应付总额</div>
        </div>
        <div class="table-content-box" >
            <div class="table-content">
              <div class="table-tr">
                <div class="col-2">
                  <div class="clearfix table-item" v-if="orderDetail.orderPayWay !=5"  v-for="detail  in orderDetail.mallOrderDetail" :key="detail.id">
                    <div class="table-img">
                      <defaultImg :background="imgUrl+detail.productImageUrl"></defaultImg>
                    </div>
                    <div class="table-text">{{detail.detProName}}
                      <p>{{detail.productSpeciname}}</p>
                    </div>
                  </div>
                  <div class="clearfix table-item" v-else>
                    <div class="table-img"></div>
                    <div class="table-text">扫码支付</div>
                  </div>
                </div>
                <div class="col-1">
                   <div class="table-item" v-if="orderDetail.orderPayWay !=5"  v-for="detail in orderDetail.mallOrderDetail" :key="detail.id">
                      &#65509;{{detail.detProPrice}} 
                  </div> 
                  <div class="table-item" v-else >&#65509;{{orderDetail.orderMoney}}</div> 
                </div>
                <div class=" border-r col-1">
                   <div class="table-item" v-if="orderDetail.orderPayWay !=5"  v-for="detail in orderDetail.mallOrderDetail" :key="detail.id">
                      {{detail.detProNum}} 
                  </div> 
                  <div class="table-item" v-else >1</div> 
                </div>
                 <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">{{orderDetail.discountedPrices}}</div> 
                </div>
                <div class="border-r col-1">
                   <div class="table-item"  v-for="detail in orderDetail.mallOrderDetail" :key="detail.id">
                     {{detail.statusName}}
                      <p>
                        <el-radio-group v-model="returnId" v-if="detail.returnResult !=null && returnNum > 1">
                          <el-radio-button :label="detail.returnResult.id">维权信息</el-radio-button>
                        </el-radio-group>
                      </p>
                    </div> 
                </div>
                <div class="col-1 border-r table-td">{{orderDetail.orderMoney}}
                </div>
                 <div class="col-1 border-r table-td" v-if="orderDetail.orderPayWay !=5">
                  <p>{{orderDetail.orderStatusName}}</p>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowCancelOrderButton == 1" @click="openDialog(1,orderDetail.id)">取消订单</el-button>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowDeliveryButton == 1" @click="openDialog(3,orderDetail)">发货</el-button>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowPickUpGoodsButton == 1" @click="pickUpGoods(orderDetail.id)">确认已提货</el-button>
                </div>
                <div class="table-td border-r col-1" v-else>
                  <p v-if="orderDetail.orderStatus==1">待付款</p>
                  <p v-else-if="orderDetail.orderStatus==2">已付款</p>
                  <p v-else-if="orderDetail.orderStatus==5">订单已关闭</p>
                </div>
                <div class="col-1 border-r table-td">
                  <span v-if="orderDetail.orderFreightMoney>0">{{orderDetail.orderFreightMoney}}</span>
                  <span v-else>免运费</span>
                </div>
                <div class="col-1 table-td">
                  {{orderDetail.orderMoney}}
                  <p v-if="orderDetail.orderPayWay !=5">
                    <el-button type="primary" size="small" v-if="orderDetail.isShowUpdatePriceButton == 1" @click="openDialog(2,orderDetail)">修改价格</el-button>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
   <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  size="small" :class="dialogType == 1 ? 'minDialog':''">
    <cancel-order :id="orderId" @code="dialogResultRet" v-if="dialogType ==1"> </cancel-order>
    <update-money :data= "orderData" @code="dialogResultRet" v-if="dialogType ==2"> </update-money>
    <deliver-goods :row= "orderData" @code="dialogResultRet" v-if="dialogType ==3"> </deliver-goods>
    <return-status :data= "orderDetail" :returnData="returnData" :returnType="returnType" @code="dialogResultRet" v-if="dialogType ==6"> </return-status>
  </el-dialog>
</div>
</template>

<script>
import commons from '../common';
import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
import deliverGoods from '../../components/deliverGoods';
import updateMoney from '../../components/updateMoney';
import cancelOrder from '../../components/cancelOrder';
import returnStatus from '../../components/returnStatus';
export default {
  components: {
    defaultImg,deliverGoods,updateMoney,cancelOrder,returnStatus
  },
  data () {
    return {
      active: 1,  //进度条状态
      colWidth:13, //订单信息显示的宽度
      twoDate:'', //付款时间
      threeDate:'', //发货时间
      fourDate:'',  //完成时间
      orderDetail:{}, //订单信息
      imgUrl:'',    //资源前缀
      returnData:{}, //维权信息
      time: {}, //倒计时信息
      returnId:0,//当前维权ID
      returnNum:0, //维权数量
    }
  },
  watch: {
    returnId:function(a,b){
      let _this = this;
      let i=0;
      for (var n = _this.orderDetail.mallOrderDetail.length; i < n; i++) {
            var detail=_this.orderDetail.mallOrderDetail[i];   
            if(detail.returnResult != null){
              if(detail.returnResult.id == a){
                _this.returnTabHandle(detail.returnResult);
              }
            }
        };
    },
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
  }, 
  methods: {
    /**多维权信息切换 */
    returnTabHandle(data){
      let _this = this;
      _this.returnData=data;
      console.log(_this.returnData,"_this.returnData");
      //启动倒计时
      if(_this.returnData.applyTimes){
        clearInterval(_this.Interval);
        _this.setTiming( _this.returnData.applyTimes);
      }
      if(_this.returnData.takeTimes){
         clearInterval(_this.Interval);
        _this.setTiming( _this.returnData.takeTimes);
      }
    },
    /**弹出框 成功返回结果 */
    dialogResultRet(val) {
        let _this = this;
        _this.dialogVisible=false;
        // console.log(val);
        if(val){
            this.orderDtail(this.$route.params.orderId);   
        }
    },
    /**获取订单详情 */
    orderDtail(id){
      let _this = this;
      _this.orderDetail = {};
      _this.ajaxRequest({
        'url': DFshop.activeAPI.orderInfo_post,
        'data':{"id":id},
        'success':function (data){
          // console.log(data.data,'data.data');
          _this.orderDetail = data.data;
          _this.imgUrl = data.imgUrl;
          //遍历得到维权信息
          var i = 0;
          _this.returnData={};
          for (var n = _this.orderDetail.mallOrderDetail.length; i < n; i++) {
              var detail=_this.orderDetail.mallOrderDetail[i];   
              if(detail.returnResult != null){
                  _this.returnNum +=1;    
                  if(JSON.stringify(_this.returnData) == '{}'){
                    _this.returnData= detail.returnResult;
                    _this.returnId=detail.returnResult.id;
                    //启动倒计时
                    if(_this.returnData.applyTimes){
                      _this.setTiming( _this.returnData.applyTimes);
                    }
                    if(_this.returnData.takeTimes){
                      _this.setTiming( _this.returnData.takeTimes);
                    }
                    // console.log( _this.returnData,' _this.returnData');
                  }
              }
          };
          //如无维权信息，设置订单信息DIV大小
          if(JSON.stringify(_this.returnData) == '{}' ){
            _this.colWidth='';
          }
          
          _this.twoDate= Lib.M.format(_this.orderDetail.payTime);
          _this.threeDate= Lib.M.format(_this.orderDetail.expressTime);
          
          /**得到进度和进度的生成时间 */
          if(_this.orderDetail.orderStatus ==2){
            _this.active=2;
          }else if(_this.orderDetail.orderStatus == 3){
            _this.active=3;
          }else if(_this.orderDetail.orderStatus == 4){
            _this.active=4;
            _this.fourDate= Lib.M.format(_this.orderDetail.updateTime);
          }else if(_this.orderDetail.orderStatus == 5){//关闭订单.
             _this.active=5;
             _this.fourDate= Lib.M.format(_this.orderDetail.updateTime);
          }
          
          // console.log(_this.active,"_this.active");
        }
      });
    },
     /** 
     * 倒计时
     */
    setTiming(time) {
      //倒计时
      let _this = this;
      let Time =time;
      _this.time = "";
      this.Interval = setInterval(() => {
        //做定时器
        if (Time === 0) {
          //时间结束
          clearInterval(_this.Interval);
          _this.time = _this.timer(0);
        } else {
          // 时间未结束
          Time--;
          _this.time = _this.timer(Time);
        }
      }, 1000);
    },
     /**
     * 活动时间分隔
     */
    timer(intDiff) {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - day * 24;
        minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
        second =
          Math.floor(intDiff) -
          day * 24 * 60 * 60 -
          hour * 60 * 60 -
          minute * 60;
      } else {
      }

      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;

      var times = {};
      times.DD = day;
      times.HH = hour;
      times.mm = minute;
      times.ss = second;

      return times;
    }
  },
  mounted() {
    this.orderDtail(this.$route.params.orderId);
  }
}
</script>
<style lang="less">
  @import '../../less/index.less';
  @import '../../less/order.less';
  .minDialog{
    .el-dialog--small{
      width:18%
    }
  }
</style>
