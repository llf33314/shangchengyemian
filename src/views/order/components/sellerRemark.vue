<template>
  <div class="order_tab_main">
    <el-input type="textarea" v-model.trim="remarkData.orderSellerRemark" auto-complete="off" placeholder="最多可输入256个字符"></el-input>
    <div slot="footer" class="dialog-footer dialog-list shop-textr">
        <el-button type="primary" @click="submitRemark()">确 定</el-button>
        <el-button @click="resetDialog()">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props:['data'],
    data: function () {
        return {
            orderData:{},
            remarkData:{//提交卖家备注参数
                orderId:'',
                orderSellerRemark:''
            }
        }
    },
    watch:{
        'data'(a,b){
            this.orderData = a;
            this.remarkData.orderId=this.orderData.id;
            this.remarkData.orderSellerRemark=this.orderData.orderSellerRemark;
        }
         
    },
    methods:{  
        /**提交 */
        submitRemark(){
            let _this = this;
            // console.log(_this.remarkData,"_this.remarkData");
            _this.ajaxRequest({
                'url': DFshop.activeAPI.updateStatus_post,
                'data':_this.remarkData,
                'success':function (data){
                    _this.$message({
                        message: '添加备注成功',
                        type: 'success'
                    });
                    _this.$emit('code',true);//返回操作结果
                }
            });
        },
        /** 取消*/
        resetDialog() {
            let _this = this;
            _this.$emit('code',false);//返回操作结果
        }
         
    },
    mounted() {
         this.orderData = this.data;
        //  console.log(this.data,"this.data;");
         this.remarkData.orderId=this.data.id;
         this.remarkData.orderSellerRemark=this.data.orderSellerRemark;
    }
}
</script>
