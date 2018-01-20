<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价 </el-breadcrumb-item>
            <el-breadcrumb-item >报价单状态</el-breadcrumb-item>
        </el-breadcrumb>
     </div>
    <div class="addbj-main">
      <div v-if="active >0">
        <el-steps :active="active"  center>
          <el-step title="待发布"></el-step>
          <el-step title="待付款"></el-step>
          <el-step title="已付款"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
      </div>
      <div v-if="active == 0">
        <el-steps :active="2"  center>
          <el-step title="待发布"></el-step>
          <el-step title="已关闭"></el-step>
        </el-steps>
      </div>
      <div class="index-titleName">
         报价单信息
      </div> 
      <table border="1" cellspacing="0" cellpadding="0" width="100%" class="tab_purchase">
        <tr>
          <th colspan="4" style="text-align:center;padding: 0;">{{company.companyName}}报价单</th>
        </tr>
        <tr>
          <th>报价单号</th>
          <td>{{order.orderNumber}}</td>
          <th>公司信息</th>
          <td>{{company.companyName}}</td>
        </tr> 
        <tr>
          <th>标题</th>
          <td>{{order.orderTitle}}</td>
          <th>付款方式</th>
          <td>
            <span v-if="order.orderType == 0">全款</span>
            <span v-if="order.orderType == 1">分期</span>
          </td>
        </tr> 
        <tr>
          <th>是否在线签合同</th>
          <td>
            <span v-if="order.haveContract == 0">签</span>
            <span v-if="order.haveContract == 1">不签</span>
          </td>
          <th>对外报价是否含税</th>
          <td>
            <span v-if="order.haveTax == 0">含</span>
            <span v-if="order.haveTax == 1">不含</span>
          </td>
        </tr>
        <tr>
          <th>报价单描述</th>
          <td colspan="3">{{order.orderDescribe}}</td>
        </tr>
        <tr>
          <th>报价单金额</th>
          <td colspan="3">{{order.allMoney}}</td>
        </tr>
        <tr>
          <th>报价单备注</th>
          <td colspan="3">{{order.orderRemarks}}</td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td colspan="3">{{order.createDate|format}}</td>
        </tr>
      </table>
      
      <table cellspacing="0" cellpadding="0" width="100%" class="order_detail_tab">
        <tbody>
          <tr class="order_tab_header">
              <th width="10%">商品图片</th>
              <th width="15%">商品名称</th>
              <th width="10%">原价(元)</th>
              <th width="10%">优惠价(元)</th>
              <th width="9%">数量</th>
              <th width="9%">人工费(元)</th>
              <th width="9%">安装费(元)</th>
              <th width="10%">小计(元)</th>
              <th width="9%">运费(元)</th>
              <th width="10%">状态</th>
          </tr>
          <tr v-for="(row , index) in orderDetailsList" :key="index">
              <td class="text-overflow">
                 <div class="addbj-min-img">
                    <default-img :background="row.productImg"></default-img>
                  </div>
              </td>
               <td style="text-align: left; padding: 0 15px;">{{row.productName}}</td>
              <td>{{row.money}}</td>
              <td>{{row.discountMoney}}</td>
             <td class="text-overflow">{{row.count}}</td>
               <td>{{row.laborCost}}</td>
               <td>{{row.installationFee}}</td>
               
              <td>{{row.allMoney}}</td>
                <td>{{row.freight}}</td>
              <td >
                  <span v-if="order.orderStatus == 0"> 已关闭</span>
                  <span v-if="order.orderStatus == 1"> 待发布</span>
                  <span v-if="order.orderStatus == 2"> 待付款</span>
                  <span v-if="order.orderStatus == 3"> 已付款</span>
                  <span v-if="order.orderStatus == 4"> 已完成</span> 
              </td>
          </tr>
           <tr>
              <td style="font-weight:600">合计</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{laborCost}}</td>
              <td>{{installationFee}}</td>
              <td>{{allMoney}}</td>
              <td></td>
              <td></td>
          </tr>
        </tbody>
      </table>
      <div class="table-footer">
          总运费：{{order.freight}}
          <span>合计：&#65509;{{order.allMoney}}</span>
      </div>
      <div style="margin-top:50px;">
          <el-button type="primary" v-if="order.orderStatus == 1" @click="updateStatus(2)">发布报价单</el-button>
          <el-button  v-if="order.orderStatus == 1" @click="updateStatus(0)">关闭订单</el-button>
          <el-button type="primary" v-if="order.orderStatus == 2" @click="updateStatus(3)">确认收款</el-button>
          <el-button type="primary" v-if="order.orderStatus == 3" @click="updateStatus(4)">完成订单</el-button>     
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
      subList:[],//统计列表
      page:{},//翻页数据
      orderId:'', //传回的参数
      active: 1,  //进度条状态
      imgUrl:'',
      order:{},
      orderDetailsList:[],
      company:{},
      laborCost:0,
      installationFee:0,
      allMoney:0,


    }
  },
  methods: {
    /**修改报价单状态 */
    updateStatus(status){ 
      let _this= this;
      let msg="";
      if(status ==2){
        msg="发布报价单"
      }else if (status == 0){
        msg="关闭订单";
      }else if (status == 3){
        msg="确认收款";
      }else if (status == 4){
        msg="完成订单";
      }
      let msgg ={
        'dialogTitle':'确定'+msg+'？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.ajaxRequest({
              'url': DFshop.activeAPI.purchaseOrderUpdateStatus_post,
              'data':{
                  orderId : _this.$route.params.id,
                  status:status
              },
              'success':function (data){
                _this.$message({
                    message: msg+"成功",
                    type: "success"
                });
                _this.jumpRouter('/purchase/1');
              }
            });
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msgg);        
    },
    /**获取报价单信息 */
    purchaseOrderInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseOrderInfo_post,
        'data':{
            id : id
        },
        'success':function (data){
            if(data.code == 0){
              _this.active=Number(data.data.order.orderStatus);
              _this.imgUrl=data.imgUrl;
              _this.company=data.data.company;
              _this.order = data.data.order; 
              _this.orderDetailsList = data.data.orderdetails;
              _this.orderDetailsList.forEach((e,i)=>{//合计
                _this.laborCost+=Number(e.laborCost);
                _this.installationFee+=Number(e.installationFee);
                _this.allMoney+=Number(e.allMoney); 
              })
            }
        }
        });
    },
  },
  mounted() {
    let _this = this;
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){     
      _this.purchaseOrderInfo(this.$route.params.id);
    }
  }   
}
</script>


<style lang="less" scoped>
 .index-titleName{
   padding-bottom: 10px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 15px;
 
}

.tab_purchase{
  width:100%;border:1px solid #dfe6ec;    font-size: 14px;
}
.tab_purchase tr{
  height:40px
}
.tab_purchase th{
  padding-left: 15px;
  width: 11%;
}
.tab_purchase td{
  border:1px solid #dfe6ec;
  padding-left: 15px;
  width: 38%;
}

.order_detail_tab,.order_detail_tab th{
  text-align: center;
   font-size: 14px;
}
.order_detail_tab th{
  border:1px solid #dfe6ec;
  border-top:0px;
  height:40px;
}
 .order_detail_tab td{
   border:1px solid #dfe6ec;
   height:40px;
}

.addbj-main{
    padding:40px 4%;
    .addbj-input{
        width: 220px
    }
    p.p-warn{
        display: inline-block;
        width: 220px;
    }
    .addbj-img{
        width: 70px;
        height: 70px;
        display: inline-block;
    }
    .addbj-min-img{
        width: 60px;
        height: 60px;
        margin: 8px auto;
    }
    .table-footer{
        width: 100%;
        border: 1px solid #dfe6ec;
        border-top:0;
        text-align: right;
        padding: 5px 30px;
        font-size: 14px;
        height: 40px;
        line-height: 33px;
        span{
            margin-left: 15px; 
        }
    }
}
</style>


