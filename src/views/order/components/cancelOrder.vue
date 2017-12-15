<template>
 <div class="order_tab_main">
   <el-select v-model="cancelData.sellerReason" placeholder="请选择取消订单的理由" style="width:95%">	
        <el-option class="max-input" v-for="item in cancelReasonList"		
        :key="item.item_key" :label="item.item_value" :value="item.item_key">		
    </el-option>	
    </el-select>
    <div slot="footer" class="dialog-footer dialog-list shop-textr">
        <el-button type="primary" @click="submitCancelOrder()">确 定</el-button>
        <el-button @click="resetCancelOrder()">取 消</el-button>
    </div>
</div>
</template>

<script>
export default {
    props:['id'],
    data: function () {
        return {
            cancelReasonList:[],
            cancelData:{//取消订单参数
                orderId:'',
                sellerReason:'',//取消订单理由key
                type:'2' 
            }
        }
    },
    watch:{
        'id'(a,b){
            this.cancelReasonMap();
            this.cancelData.sellerReason = '';
            this.cancelData.orderId = a;
        }
    },
    methods:{  
        /**获取取消订单理由列表 */
        cancelReasonMap(){
            let _this = this;
            _this.cancelReasonList ={};
            _this.ajaxRequest({
                'url': DFshop.activeAPI.cancelReasonMap_post,
                'success':function (data){
                // console.log(data.data,'data.data');
                _this.cancelReasonList = data.data;
                }
            });
        },
         /**确定按钮*/
        submitCancelOrder() {
            let _this = this;
            if(_this.cancelData.sellerReason ==""){
                _this.$message({
                    message: '请选择取消订单理由',
                    type: 'error'
                });
                return false;
            }

            _this.ajaxRequest({
                'url': DFshop.activeAPI.updateStatus_post,
                'data':_this.cancelData,
                'success':function (data){
                    // _this.cancelData={};
                    _this.$message({
                        message: '取消订单成功',
                        type: 'success'
                    });
                    _this.$emit('code',true);;
                }
            });
        },
        /** 取消按钮*/
        resetCancelOrder() {
            let _this = this;
            _this.$emit('code',false);//返回操作结果
        }
         
    },
    mounted() {
        let _this = this;
        _this.cancelData.orderId = this.id;
        _this.cancelData.sellerReason = ''; 
        _this.cancelReasonMap();
    }
}
</script>
