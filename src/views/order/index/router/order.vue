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
      <el-steps :active="active"  center  >
        <el-step title="买家下单" :description="orderData.createTime|format"></el-step>
        <el-step title="买家付款" :description="twoDate"></el-step>
        <el-step title="商家发货" :description="threeDate"></el-step>
        <el-step title="交易完成" :description="fourDate"></el-step>
      </el-steps>
    </div>
    <div class="order-content">
      <el-row :gutter="20">
        <el-col :span="colWidth">
          <div class="order-item">
            <div class="order-title">
              订单信息
            </div>
            <div class="order-item-content">
              <div class="order-item-list">
                <div class="order-item-title">订单编号 : 
                </div>
                <span>
                  {{orderData.orderNo}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">所属店铺 : 
                </div>
                <span>
                 {{orderData.shopName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家昵称 : 
                </div>
                <span>
                  {{orderData.memberName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">订单来源 : 
                </div>
                <span>
                  {{orderData.typeName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">下单时间 : 
                </div>
                <span>
                 {{orderData.createTime|format}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">配送方式 : 
                </div>
                <span v-if="orderData.deliveryMethod ==1">快递配送</span>
                <span v-else-if="orderData.deliveryMethod ==2">上门自提</span>
                <span v-else-if="orderData.deliveryMethod ==3">到店购买</span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货地址 : 
                </div>
                <span>
                  {{orderData.receiveAddress}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货人 : 
                </div>
                <span>
                  {{orderData.receiveName}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">联系电话 : 
                </div>
                <span>
                 {{orderData.receivePhone}}
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家留言 : 
                </div>
                <p>
                   {{orderData.orderBuyerMessage}}
                </p>
                <el-button type="primary" v-if="orderData.orderStatus >=3 && orderData.orderStatus !=5 && orderData.expressNumber !='' ">查看物流信息</el-button>
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
                  {{orderData.orderStatusName}}
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
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeApplyButton == 1" @click="dialogReturn(1)">同意退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowAgreeRetGoodsApplyButton == 1" @click="dialogReturn(2)">同意退货退款</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseApplyButton == 1" @click="dialogReturn(-1)">拒绝退款</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowConfirmTakeButton == 1" @click="dialogReturn(3)">确认收货</el-button>
                <el-button type="primary" size="small" v-if="returnData.isShowRefuseConfirmTakeButton == 1" @click="dialogReturn(4)">拒绝确认收货</el-button>
                
                <el-button type="primary" size="small" v-if="returnData.isShowUpdateAddressButton == 1" @click="dialogReturn(5)">修改退货地址</el-button>

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
          {{orderData.orderSellerRemark}}
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
                  <div class="clearfix table-item" v-for="orderDetail in orderData.mallOrderDetail" :key="orderDetail.id">
                    <div class="table-img">
                      <defaultImg :background="imgUrl+orderDetail.productImageUrl"></defaultImg>
                    </div>
                    <div class="table-text">{{orderDetail.detProName}}
                      <p>{{orderDetail.productSpeciname}}</p>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="table-item" v-for="orderDetail in orderData.mallOrderDetail" :key="orderDetail.id">&#65509;{{orderDetail.detProPrice}}</div>
                </div>
                <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in orderData.mallOrderDetail" :key="orderDetail.id">{{orderDetail.detProNum}}</div> 
                </div>
                 <div class=" border-r col-1">
                  <div class="table-item"  v-for="orderDetail in orderData.mallOrderDetail" :key="orderDetail.id">{{orderDetail.discountedPrices}}</div> 
                </div>
                <div class="border-r col-1">
                   <div class="table-item"  v-for="orderDetail in orderData.mallOrderDetail" :key="orderDetail.id">
                     {{orderDetail.statusName}}
                    </div> 
                </div>
                <div class="col-1 border-r table-td">{{orderData.orderMoney}}
                </div>
                <div class="col-1 border-r table-td">
                  <p>{{orderData.orderStatusName}}</p>
                   <el-button type="primary" size="small" v-if="orderData.isShowDeliveryButton == 1">发货</el-button>
                </div>
                <div class="col-1 border-r table-td">
                  <span v-if="orderData.orderFreightMoney>0">{{orderData.orderFreightMoney}}</span>
                  <span v-else>免运费</span>
                </div>
                <div class="col-1 table-td">{{orderData.orderMoney}}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"  size="small">
    <div class="dialog-list dialog-warn" v-if=" type== -1 ">
      建议您与买家协商后，再确定是否拒绝退款。如您拒绝退款后，买家可修改退款申请协议重新发起退款。 也可直接发起维权申请。
    </div>
    <div class="dialog-list dialog-warn" v-if=" type != -1 ">
      该笔订单通过 “{{payName}}－代销” 付款， 需您同意退款申请，买家才能退货给您； 买家退货后您需再次确认收货后，退款将自动原路退回至买家付款账户；
    </div>
    <div class="dialog-list clearfix">
      <span class="dialog-title">处理方式 :</span>
      <span v-if="orderData.orderPayWay !=2 && orderData.orderPayWay !=6">
        <span class="dialog-text" v-if="returnData.retHandlingWay == 1">我要退款，但不退货</span>
        <span class="dialog-text" v-if="returnData.retHandlingWay == 2">我要退款退货</span>
      </span>
      <span v-if="orderData.orderPayWay ==2 || orderData.orderPayWay ==6">
        <span class="dialog-text" v-if="returnData.retHandlingWay == 1">我要退货</span>
        <span class="dialog-text" v-if="returnData.retHandlingWay == 2">我要退货</span>
      </span>
    </div>
    <div class="dialog-list clearfix">
      <span class="dialog-title">退款金额 :</span>
      <span class="dialog-text">&#65509;<span style="color:blue;">{{returnData.retMoney}}</span></span>
    </div>
    <div class="dialog-list clearfix" v-if="type == -1">
      <span class="dialog-title">拒绝理由 :</span>
      <p class="dialog-text"><el-input type="textarea" v-model="noReturnReason" placeholder="请输入拒绝理由"></el-input></p>
    </div>
    <div class="dialog-list clearfix" v-if="type == 2 || type == 5">
      <span class="dialog-title">退货地址 :</span>
      <p class="dialog-text">
        <el-input type="textarea" v-model="returnAddress":value="returnData.returnAddress"
        placeholder="填写您的完整收货地址信息，以便买家可退货给您!如，浙江省杭州市有赞区致富路888号，张三，13588888888 ，由买家承担寄回运费。"></el-input>
      </p>
    </div>

     <div v-if="type == 3 || type ==4 ">
        <div class="dialog-list clearfix">
          <span class="dialog-title">退货地址 :</span>
          <span>{{returnData.returnAddress}}</span>
        </div>
        <div class="dialog-list clearfix">
          <span class="dialog-title">物流公司 :</span>
          <span>{{returnData.wlCompany}}</span>
        </div>
        <div class="dialog-list clearfix">
          <span class="dialog-title">物流单号 :</span>
          <span>{{returnData.wlNo}}</span>
        </div>
        <div class="dialog-list clearfix">
          <span class="dialog-title">备注信息 :</span>
          <span>{{returnData.wlRemark}}</span>
        </div>
     </div>
     <div style="color:red;margin-left: 38px" v-if="isZhifubao">*建议您复制退款链接并用IE浏览器打开进行退款</div>
    <div class="dialog-list shop-textr">
      <a v-if="isZhifubao" :href="returnData.refundUrl" target="_blank">复制链接</a>
      <el-button type="primary" @click="submitForm()">确定</el-button>
      <el-button @click="resetForm()">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    defaultImg
  },
  data () {
    return {
      active: 1,
      colWidth:13,
      twoDate:'',
      threeDate:'',
      fourDate:'',
      orderData:{},
      imgUrl:'',
      returnData:{},

      type:'', //退款操作编号
      dialogVisible:false,
      dialogTitle:'', //退款 弹出框标题
      payName:'',//支付方式 
      isZhifubao:false, //是否是支付宝支付
      noReturnReason:'',
      returnAddress:'',
    }
  },
  methods: {
    /**打开退款 弹出框 */
    dialogReturn(type){
      let _this = this;
      _this.noReturnReason='';
      _this.returnAddress='';
      _this.type=type;
      _this.dialogVisible=true;
      if(type ==1){
        _this.dialogTitle="同意退款";
      }else if (type ==2){
        _this.dialogTitle="同意退款退货";
      }else if (type ==3){
        _this.dialogTitle="确认收货并退款";
      }else if (type ==4){
        _this.dialogTitle="拒绝确认收货";
      }else if (type ==5){
        _this.dialogTitle="修改退货信息";
      }else if (type ==-1){
        _this.dialogTitle="拒绝退款";
      }

      _this.payName="微信安全支付";
      if(_this.orderData.orderPayWay== 9){
        _this.payName="支付宝安全支付";
      }

       _this.isZhifubao=0;
      if(_this.orderData.orderPayWay== 7 && _this.orderData.mallDaifu !=null && _this.orderData.mallDaifu.dfPayWay ==2){
        _this.isZhifubao=1;
      }
      if(_this.orderData.orderPayWay== 9 && (_this.type==1 ||_this.type == 3)){
        _this.isZhifubao=1;
      }
    },
    /**提交维权信息 */
    submitForm(){
      let _this = this;
      //支付宝退款
      if(_this.orderData.orderPayWay== 9 && (_this.type==1 ||_this.type == 3)){
        window.open(_this.returnData.refundUrl);
        return false;
      }
      //封装数据
      var order={
        "returnId":_this.returnData.id,
        "orderNo":_this.orderData.orderNo,
        "orderPayNo":_this.orderData.orderPayNo,
        "totalFee":_this.returnData.retMoney,
        "orderId":_this.returnData.orderId,
        "detailId":_this.returnData.orderDetailId,
        "type":_this.type
      };
      var returnOrder={
        "id":_this.returnData.id,
        "orderDetailId":_this.returnData.orderDetailId,
        "orderId":_this.returnData.orderId
      };
      //判断
      if(_this.type ==1){
        returnOrder.status = 1;
      }else if(_this.type ==2){
        if(_this.returnAddress ==""){
           _this.$message({
              message: '请输入退货地址',
              type: 'error'
          });
          return false;
        }
        returnOrder.status = 2;
        returnOrder.returnAddress =_this.returnAddress;
        order={};
      }else if(_this.type ==3){
        returnOrder.status = 5;
      }else if(_this.type ==4){
        returnOrder.status = 4;
        order={};
      }else if(_this.type ==5){
        if(_this.returnAddress ==""){
           _this.$message({
              message: '请输入退货地址',
              type: 'error'
          });
          return false;
        }
        returnOrder.returnAddress =_this.returnAddress;
        order={};
      }else if(_this.type ==-1){
        if(_this.noReturnReason ==""){
           _this.$message({
              message: '请输入拒绝退款理由',
              type: 'error'
          });
          return false;
        }
        returnOrder.status = -1;
        returnOrder.noReturnReason = _this.noReturnReason;
        order={};
      } 
      console.log(returnOrder,"returnOrder");
      console.log(order,"order");
 
      _this.ajaxRequest({
        'url': DFshop.activeAPI.updateReturn_post,
        'data':{
            "order": JSON.stringify(order),
            "return": JSON.stringify(returnOrder)
        },
        'success':function (data){
          _this.dialogVisible=false;
          _this.$message({
              message: _this.dialogTitle+'成功',
              type: 'success'
          });
          _this.orderInfo(_this.returnData.orderId);
        }
      });
    },
    /**取消 */
    resetForm(){
      this.dialogVisible=false;
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
          _this.imgUrl = data.imgUrl;
          //遍历得到维权信息
          var i = 0;
          for (var n = _this.orderData.mallOrderDetail.length; i < n; i++) {
              var detail=_this.orderData.mallOrderDetail[i];
            if(JSON.stringify(_this.returnData) == '{}' && detail.returnResult != null){
              _this.returnData= detail.returnResult;
            }
          };
          //如无维权信息，设置订单信息DIV大小
          if(JSON.stringify(_this.returnData) == '{}' ){
            _this.colWidth='';
          }
          
          /**得到进度和进度的生成时间 */
          if(_this.orderData.orderStatus ==2){
            _this.active=2;
            _this.twoDate=Lib.M.format(_this.orderData.payTime);
          }else if(_this.orderData.orderStatus == 3){
            _this.active=3;
            _this.twoDate=Lib.M.format(_this.orderData.payTime);
            _this.threeDate=Lib.M.format(_this.orderData.expressTime);
          }else if(_this.orderData.orderStatus == 4){
            _this.active=4;
            _this.twoDate= Lib.M.format(_this.orderData.payTime);
            _this.threeDate= Lib.M.format(_this.orderData.expressTime);
            _this.fourDate= Lib.M.format(_this.orderData.updateTime);
          }else if(_this.orderData.orderStatus == 5){//关闭订单
             
          }
          
          console.log(_this.active,"_this.active");
 
        }
      });
    },
  },
  mounted() {
    this.orderInfo(this.$route.params.orderId);
  }
}
</script>
<style lang="less">
@import '../../less/order.less';
</style>
