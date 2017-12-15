<template>
    <div class="order_tab_main">
        <div class="dialog-list dialog-warn" v-if=" type== -1 ">
            建议您与买家协商后，再确定是否拒绝退款。如您拒绝退款后，买家可修改退款申请协议重新发起退款。 也可直接发起维权申请。
        </div>
        <div class="dialog-list dialog-warn" v-if=" type != -1 ">
        该笔订单通过 “{{payName}}－代销” 付款， 需您同意退款申请，买家才能退货给您； 买家退货后您需再次确认收货后，退款将自动原路退回至买家付款账户；
        </div>
        <div class="dialog-list clearfix">
        <span class="dialog-title">处理方式 :</span>
        <span v-if="orderData.orderPayWay !=2 && orderData.orderPayWay !=6">
            <span class="dialog-text" v-if="returnInfo.retHandlingWay == 1">我要退款，但不退货</span>
            <span class="dialog-text" v-if="returnInfo.retHandlingWay == 2">我要退款退货</span>
        </span>
        <span v-if="orderData.orderPayWay ==2 || orderData.orderPayWay ==6">
            <span class="dialog-text" v-if="returnInfo.retHandlingWay == 1">我要退货</span>
            <span class="dialog-text" v-if="returnInfo.retHandlingWay == 2">我要退货</span>
        </span>
        </div>
        <div class="dialog-list clearfix">
        <span class="dialog-title">退款金额 :</span>
        <span class="dialog-text">&#65509;<span style="color:blue;">{{returnInfo.retMoney}}</span></span>
        </div>
        <div class="dialog-list clearfix" v-if="type == -1">
        <span class="dialog-title">拒绝理由 :</span>
        <p class="dialog-text"><el-input type="textarea" v-model="noReturnReason" placeholder="请输入拒绝理由"></el-input></p>
        </div>
        <div class="dialog-list clearfix" v-if="type == 2 || type == 5">
        <span class="dialog-title">退货地址 :</span>
        <p class="dialog-text">
            <el-input type="textarea" v-model="returnAddress":value="returnInfo.returnAddress"
            placeholder="填写您的完整收货地址信息，以便买家可退货给您!如，浙江省杭州市有赞区致富路888号，张三，13588888888 ，由买家承担寄回运费。"></el-input>
        </p>
        </div>

        <div v-if="type == 3 || type ==4 ">
            <div class="dialog-list clearfix">
            <span class="dialog-title">退货地址 :</span>
            <span>{{returnInfo.returnAddress}}</span>
            </div>
            <div class="dialog-list clearfix">
            <span class="dialog-title">物流公司 :</span>
            <span>{{returnInfo.wlCompany}}</span>
            </div>
            <div class="dialog-list clearfix">
            <span class="dialog-title">物流单号 :</span>
            <span>{{returnInfo.wlNo}}</span>
            </div>
            <div class="dialog-list clearfix">
            <span class="dialog-title">备注信息 :</span>
            <span>{{returnInfo.wlRemark}}</span>
            </div>
        </div>
        <div style="color:red;margin-left: 38px" v-if="isZhifubao">*建议您复制退款链接并用IE浏览器打开进行退款</div>
        <div class="dialog-list shop-textr dialog-footer">
            <a v-if="isZhifubao" :href="returnInfo.refundUrl" target="_blank">复制链接</a>
            <el-button type="primary" @click="submitForm()">确定</el-button>
            <el-button @click="resetForm()">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type: Object
        },
        returnData:{
            type: Object
        } ,
        returnType:{
            type: Number|String
        } 
    },
    data: function () {
        return {
            orderData:{},
            returnInfo:{},
            type:'', //退款操作编号
            payName:'',//支付方式 
            isZhifubao:false, //是否是支付宝支付
            noReturnReason:'',
            returnAddress:'',
        }
    },
    watch:{
        'returnType'(a,b){
            this.type = a;
            this.dialogReturn();
        },
        'data'(a,b){
            this.orderData = a;
        },
        'returnData'(a,b){
          this.returnInfo = a;
        }
    },
    methods:{  
        /**打开退款 弹出框 */
        dialogReturn(){
            let _this = this;
    
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
             console.log( _this.isZhifubao," _this.isZhifubao");
        },
        /**提交维权信息 */
        submitForm(){
            let _this = this;
            //支付宝退款
            if(_this.orderData.orderPayWay== 9 && (_this.type==1 ||_this.type == 3)){
                window.open(_this.returnInfo.refundUrl);
                return false;
            }

            //封装数据
            var order={
                "returnId":_this.returnInfo.id,
                "orderNo":_this.orderData.orderNo,
                "orderPayNo":_this.orderData.orderPayNo,
                "totalFee":_this.returnInfo.retMoney,
                "orderId":_this.returnInfo.orderId,
                "detailId":_this.returnInfo.orderDetailId,
                "type":_this.type
            };
            var returnOrder={
                "id":_this.returnInfo.id,
                "orderDetailId":_this.returnInfo.orderDetailId,
                "orderId":_this.returnInfo.orderId
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
                returnOrder.status = 4;
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
            // console.log(returnOrder,"returnOrder");
            // console.log(order,"order");
             
            _this.ajaxRequest({
                'url': DFshop.activeAPI.updateReturn_post,
                'data':{
                    "order": JSON.stringify(order),
                    "return": JSON.stringify(returnOrder)
                },
                'success':function (data){
                    _this.$message({
                        message: _this.dialogTitle+'成功',
                        type: 'success'
                    });
                    _this.$emit('code',true);;
                 
                }
            });
        },
         /** 取消*/
        resetForm() {
            this.$emit('code',false);
        }

    },
    mounted() { 
        this.orderData = this.data;
        this.returnInfo = this.returnData;
        this.type = this.returnType;
        this.dialogReturn();
        //  console.log( this.returnType," _this.returnType;1");
        // console.log( this.data," _this.orderData;1");
        // console.log( this.returnData," _this.returnInfo;1");
    }
}
</script>
<style lang="less" scoped>
.dialog-footer{
    margin-top:20px;
}
.dialog-list{
    width: 100%;
    margin-top:25px; 
    &>span{
        margin-right: 28px;
    }

}
    
</style>

