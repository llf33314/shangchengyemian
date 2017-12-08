<template>
<div class="order-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/allOrder' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="order-main">
    <div class="shop-steps">
      <el-steps :active="active"  center  style="width:96%">
        <el-step title="买家下单" :description="orderDetail.createTime|format"></el-step>
        <el-step title="买家付款" :description="twoDate"></el-step>
        <el-step title="商家发货" :description="threeDate"></el-step>
        <el-step title="交易完成" :description="fourDate"></el-step>
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
                <el-button type="primary" v-if="orderDetail.orderStatus >=3 && orderDetail.orderStatus !=5 && orderDetail.expressNumber !='' ">查看物流信息</el-button>
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
              <p v-if="returnData.applyTimes !=null">您还有04天12小时25分响应买家发起的维权，若超过期限没有响应，则系统默认您同意退款，并将款项原路打回买家账户。 </p>
              <p v-if="returnData.takeTimes !=null">您还有04天12小时25分确认收货，若超过期限没有确认收货，则系统默认您收货，并将款项原路打回买家账户。 </p>
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
                         {{log.statusContent}}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
               <div class="order-item-list" style="margin-top:20px;">
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeApplyButton == 1" @click="openDialog(6,returnData,1)">同意退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeRetGoodsApplyButton == 1" @click="openDialog(6,returnData,2)">同意退货退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseApplyButton == 1" @click="openDialog(6,returnData,-1)">拒绝退款</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowConfirmTakeButton == 1" @click="openDialog(6,returnData,3)">确认收货</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseConfirmTakeButton == 1" @click="openDialog(6,returnData,4)">拒绝确认收货</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowUpdateAddressButton == 1" @click="openDialog(6,returnData,5)">修改退货地址</el-button>

                <!-- <el-button type="primary">确认收货</el-button>
                <el-button type="primary" :disabled="false" @click="dialogShow">同意</el-button>
                <el-button type="primary" @click="dialogVisible = true" >拒绝</el-button>
                <el-button >申请多粉介入</el-button> -->
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
                  <div class="clearfix table-item" v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">
                    <div class="table-img">
                      <defaultImg :background="imgUrl+orderDetail.productImageUrl"></defaultImg>
                    </div>
                    <div class="table-text">{{orderDetail.detProName}}
                      <p>{{orderDetail.productSpeciname}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="table-item" v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">&#65509;{{orderDetail.detProPrice}}</div>
                </div>
                <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">{{orderDetail.detProNum}}</div> 
                </div>
                 <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">{{orderDetail.discountedPrices}}</div> 
                </div>
                <div class="border-r col-1">
                   <div class="table-item"  v-for="orderDetail in orderDetail.mallOrderDetail" :key="orderDetail.id">
                     {{orderDetail.statusName}}
                    </div> 
                </div>
                <div class="col-1 border-r table-td">{{orderDetail.orderMoney}}
                </div>
                <div class="col-1 border-r table-td">
                  <p>{{orderDetail.orderStatusName}}</p>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowCancelOrderButton == 1" @click="openDialog(1,orderDetail.id)">取消订单</el-button>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowDeliveryButton == 1" @click="openDialog(3,orderDetail)">发货</el-button>
                  <el-button type="primary" size="small" v-if="orderDetail.isShowPickUpGoodsButton == 1" @click="pickUpGoods(orderDetail.id)">确认已提货</el-button>
                </div>
                <div class="col-1 border-r table-td">
                  <span v-if="orderDetail.orderFreightMoney>0">{{orderDetail.orderFreightMoney}}</span>
                  <span v-else>免运费</span>
                </div>
                <div class="col-1 table-td">
                  {{orderDetail.orderMoney}}
                  <p>
                    <el-button type="primary" size="small" v-if="orderDetail.isShowUpdatePriceButton == 1" @click="openDialog(2,orderDetail)">修改价格</el-button>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
   <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  size="small">
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
      returnData:{} //维权信息
    }
  },
  methods: {
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
              if(JSON.stringify(_this.returnData) == '{}' && detail.returnResult != null){
                _this.returnData= detail.returnResult;
                console.log( _this.returnData,' _this.returnData');
              }
          };
          //如无维权信息，设置订单信息DIV大小
          if(JSON.stringify(_this.returnData) == '{}' ){
            _this.colWidth='';
          }

          /**得到进度和进度的生成时间 */
          if(_this.orderDetail.orderStatus ==2){
            _this.active=2;
            _this.twoDate=Lib.M.format(_this.orderDetail.payTime);
          }else if(_this.orderDetail.orderStatus == 3){
            _this.active=3;
            _this.twoDate=Lib.M.format(_this.orderDetail.payTime);
            _this.threeDate=Lib.M.format(_this.orderDetail.expressTime);
          }else if(_this.orderDetail.orderStatus == 4){
            _this.active=4;
            _this.twoDate= Lib.M.format(_this.orderDetail.payTime);
            _this.threeDate= Lib.M.format(_this.orderDetail.expressTime);
            _this.fourDate= Lib.M.format(_this.orderDetail.updateTime);
          }else if(_this.orderDetail.orderStatus == 5){//关闭订单
             
          }
          // console.log(_this.active,"_this.active");
        }
      });
    },
  },
  mounted() {

    this.orderDtail(this.$route.params.orderId);
  }
}
</script>
<style lang="less">
@import '../../less/index.less';
@import '../../less/order.less';
</style>
