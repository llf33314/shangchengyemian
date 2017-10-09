<template>
<div class="order-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/grouping' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="order-main">
    <div class="shop-steps">
      <el-steps :active="active"  center  >
        <el-step title="买家下单"
        description="2017-07-04 17:41:15">
        </el-step>
        <el-step title="买家付款"
        description="2017-07-04 18:01:15">
        </el-step>
        <el-step title="商家发货"></el-step>
        <el-step title="交易完成"></el-step>
      </el-steps>
    </div>
    <div class="order-content">
      <el-row :gutter="20">
        <el-col :span="13">
          <div class="order-item">
            <div class="order-title">
              订单信息
            </div>
            <div class="order-item-content">
              <div class="order-item-list">
                <div class="order-item-title">订单编号 : 
                </div>
                <span>
                  SC1496736195903
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">所属店铺 : 
                </div>
                <span>
                  谷通科技
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家昵称 : 
                </div>
                <span>
                  小白
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">订单来源 : 
                </div>
                <span>
                  uc
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">下单时间 : 
                </div>
                <span>
                  2017-06-06 16:03:15
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">配送方式 : 
                </div>
                <span>
                  顺丰快递
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货地址 : 
                </div>
                <span>
                  广东省惠州市东平大道赛格假日广场10楼01号房  
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">收货人 : 
                </div>
                <span>
                  PGone
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">联系电话 : 
                </div>
                <span>
                  138111111111
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">买家留言 : 
                </div>
                <p>
                  aaaaaaaaaaaaaaaaaaaaaaa
                </p>
                <el-button type="primary" class="r-button">查看物流信息</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="order-item">
            <div class="order-title">
              维权信息
            </div>
            <div class="order-item-content" style="padding-left:80px;">
              <p class="order-tishi"><i class="iconfont icon-tishi"></i>买家发起了退款申请</p>
              <p>您还有04天12小时25分响应买家发起的维权，若超过期限没有响应，则系统默认您同意退款，并将款项原路打回买家账户。 </p>
              <div class="order-item-list ">
                <div class="order-item-title">退款类型 : 
                </div>
                <span>
                  仅退款
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">订单状态 : 
                </div>
                <span>
                  待发货
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">退款原因 : 
                </div>
                <span>
                  货不对板
                </span>
              </div>
              <div class="order-item-list">
                <div class="order-item-title">退款金额 : 
                </div>
                <span>
                  ¥5800.00
                </span>
              </div>
              <div class="order-item-list rights-record">
                <div class="order-title">
                  维权记录
                </div>
                <div class="order-item-content">
                  <div class="rights-record-list ">
                    <el-row :gutter="20">
                      <el-col :span="13">
                          2017-06-28 14:25:33
                      </el-col>
                      <el-col :span="11">
                         多粉处理中，请您耐心等待2-3天，谢谢配合
                      </el-col>
                    </el-row>
                  </div>
                  <div class="rights-record-list ">
                    <el-row :gutter="20">
                      <el-col :span="13">
                          2017-06-28 14:25:33
                      </el-col>
                      <el-col :span="11">
                          多粉处理结果：买家撤销维权，交易将继续进行，感谢您的配合！
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
               <div class="order-item-list" style="margin-top:20px;">
                <!-- <div class="order-item-title">退款金额 : 
                </div> -->
                <el-button type="primary">确认收货</el-button>
                <el-button type="primary" :disabled="false" @click="dialogShow">同意</el-button>
                <el-button type="primary" @click="dialogVisible = true" >拒绝</el-button>
                <el-button >申请多粉介入</el-button>
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
          今日下午必须发货
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
        <div class="table-content-box">
            <div class="table-content">
              <div class="table-tr">
                <div class="col-2">
                  <div class="clearfix table-item">
                    <div class="table-img">
                      <defaultImg></defaultImg>
                    </div>
                    <div class="table-text">
                      苹果 iPhone 7 国行全网通4G手机
                      <p>64G</p>
                    </div>
                  </div>
                  <div class="clearfix table-item">
                    <div class="table-img">
                      <defaultImg></defaultImg>
                    </div>
                    <div class="table-text">苹果 iPhone 7 国行全网通4G手机
                      <p>64G</p>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="table-item">5800.00</div>
                  <div class="table-item">5800.00</div>
                </div>
                <div class="col-1">
                  <div class="table-item">1</div>
                  <div class="table-item">1</div>
                </div>
                <div class="col-1 border-r">
                  <div class="table-item">0.00</div>
                  <div class="table-item">0.00</div>
                </div>
                <div class="col-1 border-r ">
                  <div class="table-item">多粉维权介入结束卖家退款</div>
                  <div class="table-item"> </div>
                </div>
                <div class="col-1 border-r table-td">7280.00
                </div>
                <div class="col-1 border-r table-td">
                  <p>待发货</p>
                  <el-button type="primary" size="small">发货</el-button>
                </div>
                <div class="col-1 border-r table-td">免运费
                </div>
                <div class="col-1 table-td">7288.00
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <el-button style="margin-top: 12px;" @click="next" v-if="isOnePage">下一步</el-button>
    <el-button type="primary" v-if="isTowPage">保存</el-button>
    <el-button style="margin-top: 12px;"v-if="!isThreePage">返回</el-button>
    <div class="shop-textc" v-if="isThreePage" >
      <el-button type="primary">继续添加</el-button>
      <el-button style="margin-top: 12px;" >返回</el-button>
    </div>
  </div>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    size="small">
    <div class="dialog-list dialog-warn">建议您与买家协商后，再确定是否拒绝退款。如您拒绝退款后，买家可修改退款申请协议重新发起退款。 也可直接发起维权申请。
    </div>
    <div class="dialog-list clearfix">
      <span class="dialog-title">处理方式 :</span>
      <p class="dialog-text">我要退款并退货</p>
      <!-- <p class="dialog-text">我要退款，但不退货</p>
      <p class="dialog-text">我要退款</p> -->
    </div>
    <div class="dialog-list clearfix">
      <span class="dialog-title">退款金额 :</span>
      <p class="dialog-text">￥ <a>7288.00</a></p>
    </div>
    <div class="dialog-list clearfix" v-if="dialogTitle ==='拒绝退款'">
      <span class="dialog-title">拒绝理由 :</span>
      <p class="dialog-text"><el-input type="textarea" placeholder="请输入拒绝理由"></el-input></p>
    </div>
    <div class="dialog-list shop-textr">
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
      active: 2,
      img:'',
      isOnePage:true,
      isTowPage:false,
      isThreePage:false,
      dialogVisible:false,
      dialogTitle:'同意退款',
      radio:''
    }
  },
  methods: {
    next(){
      console.log(this.active);
      if(this.active == 1)this.isOnePage =false,this.isTowPage=true;
      if(this.active == 2)this.isTowPage=false,this.isPassPage =false,this.isThreePage=true;
      if(this.active++ > 3) this.active = 2;
    },
    resetForm(){
      this.dialogVisible=false;
    },
    dialogShow(){
      let msg = {
        'dialogTitle': '确认收到买家的退货？',
        'dialogMsg': '点击确认后，货款将在2-3天内原路退回至买家账户中。',
        'callback': {
        'btnOne': function () {
          
          }
        }
      };
      this.$root.$refs.dialog.showDialog(msg);
    }
  }
}

</script>

<style lang="less">
@import '../../less/order.less';
</style>
