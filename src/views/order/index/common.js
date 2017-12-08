 
import Vue from 'vue';
Vue.mixin({
    data () {
        return {
            dialogTitle:'',//弹出框标题
            dialogVisible:false,//弹出框是否显示 
            dialogType:0, //弹出框类型
            orderId:0 ,//传值 弹出框使用
            orderData: {},//订单详情
            returnType:'',
        }
      },
    methods: {
         /**
          * 弹出框显示 
          * @param {*} type 弹出框类型
          * @param {*} id    订单ID 维权方法传的是退款信息
          * @param {*} returnType  维权类型
          */
        openDialog(type,id,returnType){
            let _this = this;
            _this.dialogType=type;
            if(type ==1 ){
            _this.dialogTitle="取消订单";
            _this.orderId=id;
            }else if(type ==2){
            _this.dialogTitle="修改价格";
            // _this.orderInfo(id);
            _this.orderData=id;
            }else if(type ==3){
            _this.dialogTitle="商品发货";
            // _this.orderInfo(id);
            _this.orderData=id;
            }else if(type ==4){
            _this.dialogTitle="卖家备注";
            _this.orderData=id;
            }else if(type ==5){
            _this.dialogTitle="订单打印";
            _this.orderId=id;
            }else if(type ==6){
                _this.returnData=id;
                _this.returnType=returnType;
                if(returnType ==1){
                    _this.dialogTitle="同意退款";
                }else if (returnType ==2){
                    _this.dialogTitle="同意退款退货";
                }else if (returnType ==3){
                    _this.dialogTitle="确认收货并退款";
                }else if (returnType ==4){
                    _this.dialogTitle="拒绝确认收货";
                }else if (returnType ==5){
                    _this.dialogTitle="修改退货信息";
                }else if (returnType ==-1){
                    _this.dialogTitle="拒绝退款";
                }
            }
            _this.dialogVisible=true;
            // console.log(id,"传的ID");
        },
    
        /**
         * 确认已提货
         * @param {*} id  订单ID
         * @param {*} type 页面 1列表页 2详情页
         */
        pickUpGoods(id,type){
            let _this = this;
            _this.$confirm('确认买家是否已提货并付款?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            _this.ajaxRequest({
                'url': DFshop.activeAPI.updateStatus_post,
                'data':{
                "type":'5',
                "orderId":id,
                "status":'4'
                },
                'success':function (data){
                    _this.$message({
                        message: '提货成功',
                        type: 'success'
                    });
                    //成功后刷新数据
                    if(type ==1){
                        _this.searchData.curPage=1;
                        _this.mallOrderList( _this.searchData);
                    }else{
                        _this.orderDtail(id);   
                    }
                }
            });
            }).catch(() => {
                    
            });
        }
    }
});
