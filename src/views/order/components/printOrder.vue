<template>
  <div class="order_tab_main">
      <div class="print-box" v-if="printData != null">
        <p class="title"> {{printData.header.title}} </p>
        <p class="phone">联系电话： {{printData.header.phone}}</p>
        <!-- <span class="page_num" v-if="printData.totalPage>1">共2页 第2页</span> -->
        <div class="order_layer_main">
            <ul class="clearfix order_list">
            <li class="text-overflow">客户名称：{{printData.header.customerName}}</li>
            <li class="text-overflow">所属店铺：{{printData.header.shop}}</li>
            <li class="text-overflow">客户电话：{{printData.header.customerPhone}}</li>
            <li class="text-overflow">订单编号：{{printData.header.orderNumber}}</li>
            <li class="text-overflow">客户地址：{{printData.header.customerAddr}}</li>
            <li class="text-overflow">下单时间：{{printData.header.orderTime}}</li>
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
                <tr v-for="(item,index) in printData.content.plist"  :key="index">
                    <td>{{item.productBarCode}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.originalPrice}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.discount?item.discount:''}}</td>
                    <td>{{item.subtotal}}</td>
                </tr>
                <tr>
                    <td colspan="3" style="border-right: none;text-align:left;">买家留言：{{printData.content.buyerMessage}}</td>
                    <td colspan="3" style="border-left: none;">应收总额： ￥{{printData.content.totalReceivable}}</td>
                </tr>
            </tbody>
            </table>
            <div>支付状态：  <span >{{printData.footer.paymentMethod}}</span></div>
            <div>配送方式：{{printData.footer.deliveryMethod}}</div>
            <div>商家备注：{{printData.footer.businessNotes}}</div>
        </div>
        </div>
        <div slot="footer" class="dialog-footer">
        <!-- <div class="shop-inblock" v-if="printData.totalPage>1">
            <el-pagination
            :page-size="5"
            @current-change="printChange"
            layout="prev, pager, next, jumper"
            :current-page='printData.curPage'
            :total="5*printData.totalPage">
            </el-pagination>
        </div> -->
        <el-button type="primary" @click="printOrder">打印</el-button>
        <!-- <el-button>打印预览</el-button> -->
      </div>  
  </div>
</template>

<script>
import Lib from 'assets/js/Lib';
export default {
    props:['id'],
    data: function () {
        return {
           printData:null,//打印数据
           myData: null,
        }
    },
    watch:{
        'id'(a,b){
            this.loadPrintOrders(a,1);
        }
    },
    methods:{  
         /** 
         * 打印订单
         * @param id 选择打印id
         * @param curPage 页数
         */
        loadPrintOrders(id,curPage){
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.exportMallOrderr_post,
                'data':{
                    curPage: curPage || 1, //页数
                    orderId: id //订单ID  必传
                },
                'success':function (data){
                    // console.log(data.data,'打印数据');
                    _this.myData = data.data;
                    _this.printData = data.data.print;
                }
            });
        },

        /** 
         * 下一页
         */
        printChange(val){
            this.loadPrintOrders(data,val)
        },
        //打印订单
        printOrder(){
            let _myData = this.myData;
            console.log(_myData.hardwareDomain,"_myData.hardwareDomain")
            // 指定host地址

            Lib.PrintAPI.HOSTNAME = _myData.hardwareDomain;
            Lib.PrintAPI.init('mall', 'scddmb', _myData.wxShopId, _myData.busId);

            Lib.PrintAPI.print(this.printData);
        }

    },
    mounted() {
        this.loadPrintOrders(this.id,1);

        console.log(Lib,"Lib.PrintAPI")

    }
}
</script>
