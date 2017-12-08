<template>
  <div class="order_tab_main">
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
                <tr v-for="(item,index) in printData.lists"  :key="index">
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
  </div>
</template>

<script>
export default {
    props:['id'],
    data: function () {
        return {
           printData:'',//打印数据
        }
    },
    watch:{
        'id'(a,b){
            this.printOrders(a,1);
        }
    },
    methods:{  
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
                    // console.log(data.data,'打印数据');
                    _this.printData = data.data;
                }
            });
        },

        /** 
         * 下一页
         */
        printChange(val){
            this.printOrders(data,val)
        }

    },
    mounted() {
        this.printOrders(this.id,1);
    }
}
</script>
