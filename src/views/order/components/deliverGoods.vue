<template>
    <div class="order_tab_main">
    <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
        <tbody>
        <tr class="order_tab_header">
            <th width="33%">商品名称</th>
            <th width="15%">单价(元)</th>
            <th width="15%">数量</th>
            <th width="22%">订单编号</th>
            <th width="15%">实付金额</th>
        </tr>
        <tr v-for="(item,index) in orderData.mallOrderDetail" :key="index">
            <td>{{item.detProName}}</td>
            <td>{{item.detProPrice}}</td>
            <td>{{item.detProNum}}</td>
            <td class="text-overflow" :rowspan="orderData.mallOrderDetail.length" v-if="index==0">{{orderData.orderNo}}</td>
            <td class="text-overflow" :rowspan="orderData.mallOrderDetail.length" v-if="index==0">{{orderData.orderMoney}}</td>
        </tr>
        </tbody>
    </table>
    <div class="dialog-list">
     <span>收货信息 :</span>
        {{orderData.receiveAddress}},{{orderData.receiveName}},{{orderData.receivePhone}} 
    </div>
    <div class="dialog-list">
        <span>发货方式  :</span>
         <el-radio-group v-model="expressData.expressWay"  @change="expressWayValidate">
            <el-radio class="radio" label="1">需要物流</el-radio>
            <el-radio class="radio" label="0">无需物流</el-radio>
         </el-radio-group>
    </div>
    <div class="dialog-list">
    <el-form :inline="true" class="demo-form-inline" :model="expressData" :rules="rules" ref="expressData" label-width="88px" label-position="left">
        <el-form-item label="物流公司:" prop="expressId">
        <el-select v-model="expressData.expressId"  placeholder="请选择" >
            <el-option :label="option.item_value" :value="option.item_key" :key="option.item_key" v-for="(option,index) in expressList" ></el-option> 
            <el-option :value="999" label="其他"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="物流名称 :" v-if=" expressData.expressId === 999 " prop="otherExpressName">
        <el-input v-model="expressData.otherExpressName" placeholder="请输入物流名称"  ></el-input>
        </el-form-item>
        <el-form-item label="快递单号 :" prop="expressDelivery" >
        <el-input v-model="expressData.expressDelivery" placeholder="请输入快递单号"></el-input>
        </el-form-item>
    </el-form>
    </div>
    <div class="dialog-list shop-textr">
        <el-button type="primary" @click="submitForm('expressData')">确定</el-button>
        <el-button @click="resetForm('expressData')">取消</el-button>
    </div>
</div>
</template>

<script>
export default {
    props:{
        row:{
            type: Object
        } 
    },
    data: function () {
         var validateExpressDelivery = (rule, value, callback) => {
            if (this.expressData.expressWay==1 && value === '') {
             callback(new Error('请输入快递单号'));
            } else {
                callback();
            }
        };
        return {
            orderData:{},
            expressData:{//发货参数
                orderId:'',
                expressDelivery:'',
                otherExpressName:'',
                expressId:'',
                expressWay:'1',
                express:'1'
            },
            rules: {
                expressId: [
                    { type: 'number', required: true, message: '请选择物流公司', trigger: 'blur' },
                ], 
                otherExpressName: [
                    { required: true, message: '请输入物流名称', trigger: 'blur' },
                ],
                expressDelivery: [
                     { validator: validateExpressDelivery, trigger: 'blur' } 
                ]
            },
            expressList:[],//快递公司列表
        }
    },
    watch:{
        'row'(a,b){
            this.orderData = a;
            this.mallExpressList();

            this.expressData.orderId = a.id;
            this.expressData.express = '1';
            this.expressData.expressWay = '1';
            this.expressData.expressId = '';
            this.expressData.expressDelivery ='';
            this.expressData.otherExpressName ='';

        }
    },
    methods:{
        /**改变快递单号的 验证与否 */
        expressWayValidate(){
            this.$refs.expressData.validateField('expressDelivery');
        },
        /**获取快递公司信息 */
        mallExpressList(){
            let _this = this;
            _this.expressList = {};
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallFreightExpressList_post,
                'success':function (data){
                _this.expressList = data.data;
                }
            });
        },
        /**确定 */
        submitForm(formName) {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(_this.expressData.expressId != 999){
                        _this.expressData.otherExpressName='';
                    }
                    // console.log(_this.expressData,'_this.expressData');
                    _this.ajaxRequest({
                        'url': DFshop.activeAPI.updateStatus_post,
                        'data':_this.expressData,
                        'success':function (data){
                        _this.$message({
                            message: '发货成功',
                            type: 'success'
                        });
                        _this.$emit('code',true);
                        }
                    });
                } else {              
                // console.log('error submit!!');
                return false;
              }
            });
        },
        /** 取消*/
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$emit('code',false);
        }
        
    },
    mounted() {
        this.orderData = this.row;
        this.mallExpressList();

        this.expressData.orderId = this.orderData.id;
        this.expressData.express = '1';
        this.expressData.expressWay = '1';
        this.expressData.expressId = '';
        this.expressData.expressDelivery ='';
        this.expressData.otherExpressName ='';
    }
}
</script>

<style lang="less" scoped>
.order_tab{
        width: 100%;
        border-color: #dfe6ec;
        border: 1px solid #dfe6ec;
        .order_tab_header{
            width: 100%;
            background:#eef1f6;
        }
        td,th{
            padding: 10px;
        }
    }

    .dialog-list{
        width: 100%;
        margin-top:25px; 
        &>span{
            margin-right: 28px;
        }
        
    }
</style>
