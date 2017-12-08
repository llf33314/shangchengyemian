<template>
 <div class="order_tab_main">
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
        <el-button @click="resetForm()">取消</el-button>
    </div>
</div>
</template>

<<script>
export default {
    props:{
        data:{
            type: Object
        } 
    },
    data: function () {
        return {
            orderData:{}
        }
    },
    watch:{
        'data'(a,b){
            this.orderData = a;
            //用于修改价格时存储使用
            this.orderData.mallOrderDetail.forEach((e,i)=>{
                e.updateMoney=e.totalPrice;
            })
        }
    },
    methods:{  
        /**取消 */
        resetForm() {
            this.$emit('code',false);//返回操作结果
        }, 
        /**确定 */
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
            // console.log(updateMoneyData,"updateMoneyData");
            _this.ajaxRequest({
                'url': DFshop.activeAPI.updateStatus_post,
                'data':updateMoneyData,
                'success':function (data){
                    _this.$message({
                        message: '修改价格成功',
                        type: 'success'
                    });
                    _this.$emit('code',true);//返回操作结果
                }
            });
        }
    },
    mounted() {
        this.orderData = this.data;
        //用于修改价格时存储使用
        this.orderData.mallOrderDetail.forEach((e,i)=>{
            e.updateMoney=e.totalPrice;
        })
    }
}
</script>
<style lang="less" scoped>
    .dialog-list{
        width: 100%;
        margin-top:25px; 
        &>span{
            margin-right: 28px;
        }
        
    }
</style>