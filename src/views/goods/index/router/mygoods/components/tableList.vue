<template>
<div class="table-spec">
    <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
        <tbody>
            <tr class="order_tab_header">
                <th width="13%" 
                    v-for="(item,index) in listData"
                    :key="index" v-if="item.specName!=''">{{item.specName}}</th>
                <th width="16%" v-if="isSpec">价格(元)</th>
                <th width="16%" v-if="isSpec">库存</th>
                <th width="16%" v-if="isSpec">商家编码</th>
                <th width="8%"  v-if="isSpec">销量</th>
                <th width="5%"  v-if="isSpec">是否默认</th>
                <th v-if="!isSpec">重量(g)</th>
            </tr>
            <!--规格总列数-->
            <tr v-for="(item,index) in invenData"
                :key="index">
                
                <!--最外层循环绑定:rowspan="3" 库存循环 -->
                <!--第一个-->
                <td v-for="(test,i) in listData" lass="text-overflow"
                    v-if=" listData.length-i == 3 && index%(listData[2].specValues.length*listData[1].specValues.length)==0"
                    :rowspan="[listData[2].specValues.length*listData[1].specValues.length]"
                    :key="i"> 
                    <!--每个规格对应库存ids-->
                    <p v-for="(c,d) in item.specificaIds" :key="d">
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.specValueId && a.specValue!=''" :key="b"> 
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>
                <!--第二个-->
                <td v-for="(test,i) in listData" lass="text-overflow"
                    v-if="listData.length-i == 2 && index%( listData[2] != null?listData[2].specValues.length:listData[1].specValues.length )==0 "
                    :rowspan="[listData[2] != null?listData[2].specValues.length:listData[1].specValues.length]"
                    :key="i"> 
                    <p v-for="(c,d) in item.specificaIds" :key="d">
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.specValueId && c.specValue!=''" :key="b"> 
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>
                <!--第三个-->
                <td v-for="(test,i) in listData" lass="text-overflow"
                    v-if="listData.length-i == 1"
                    :key="i"> 
                    <p v-for="(c,d) in item.specificaIds" :key="d"> 
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.specValueId && c.specValue!=''" :key="b">
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>

                <td v-if="isSpec" class="td-input-box">
                    <input v-model.trim="item.invPrice" placeholder="请输入内容" @blur="itemRules(item,index,1)" 
                    :class="{'input-warning':item.errorMsg.Price != null}"/>
                    <span class="p-warning" v-if="item.errorMsg.Price != null">{{item.errorMsg.Price}}</span>
                </td>
                <td v-if="isSpec" class="td-input-box">
                    <input v-model.trim="item.invNum" placeholder="请输入内容" @blur="itemRules(item,index,2)" 
                    :class="{'input-warning':item.errorMsg.invNum != null}"/>
                    <span class="p-warning" v-if="item.errorMsg.invNum != null">{{item.errorMsg.invNum}}</span>
                </td >
                <td v-if="isSpec">
                    <el-input v-model.trim="item.invCode" placeholder="请输入内容"></el-input>
                </td>
                <td v-if="isSpec">
                    {{item.invSaleNum==null?'0':item.invSaleNum}}
                </td>
                <td v-if="isSpec">
                    <el-radio v-model="isDefault"
                            :label="index"
                            @change="changeDefault(index)">
                            &nbsp 
                    </el-radio>
                 </td>
                 <td v-if="!isSpec" class="td-input-box">
                    <div style="width:120px">
                        <input v-model.number="item.logisticsWeight" placeholder="请输入内容" @blur="itemRules(item,index,3)" 
                    :class="{'input-warning':item.errorMsg.logistics != null}"/>
                        <span class="p-warning" v-if="item.errorMsg.logistics != null" >{{item.errorMsg.logistics}}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>

export default {
    props:{
        specList:{
            type: Array
        },
        invenList:{
            type: Array
        },
        type:{
            type:String,
            default:'0'
        }
    },
    data() {
        return {
            specData:'',//规格
            invenData:'',//库存
            isDefault:0,//是否默认
            listData:[],//列表数据
            isSpec:true,//物流和规格判断

            isRules:'',//全部验证条件
            LSlist:[],//临时暂存数据
        }
    },
    watch:{
        'isDefault'(a,b){
            this.invenData[a].isDefault = 1;
            this.invenData[b].isDefault = 0;
        },
        'specList'(a,b){
            this.listAdd(a);
        },
        'invenList'(a,b){
            console.log(a,b,'invenListinvenListinvenList变化');
            if(a.length == 0){
                this.invenData = b;
            }else{
                this.invenData = a;
                this.newlistData(this.invenData);
            }
        }
    },
    methods:{
        /** 
         * 数据重组
        */
        newlistData(data){
            let _this = this;
            //规格遍历
            data.forEach((item,i) => {
                item.specificaIds = item.specificaIds.split(",");
                item.errorMsg = {
                    Price:null,
                    invNum:null,
                    logistics:null
                };
            });
        },
        /** 
         * 单个数据验证
         * @param data 当前内容
         * @param index 当前索引
         * @param type 1-价钱，2-库存，3-重量
         */
        itemRules(data,index,type){
            let ErrorData = data;
            let ErrorText = data.errorMsg;
            let rules = false;
            //错误文本
            if(type === 1){
                //价钱
                let regPrice =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;
                if(!data.invPrice){
                    ErrorText.Price = '请输入价格';
                }else if(!regPrice.test(data.invPrice)){
                    ErrorText.Price = '价格最多只能输入六位整数+两位小数,如：300000.00';
                }else{
                    rules = true;
                    ErrorText.Price= null;
                }
            }else if(type === 2){
                //库存
                let regInvNum =/^[0-9]{1}\d{0,5}?$/;
                 if(!data.invNum){
                    ErrorText.invNum = '请输入商品库存';
                }else if(!regInvNum.test(data.invNum)){
                    ErrorText.invNum = '商品库存只能输入是6位数字：999999';
                }else{
                    rules = true;
                    ErrorText.invNum= null;
                }
                //总库存合计
                let proStockTotal = null;
                this.invenData.forEach((item,i)=>{
                    proStockTotal += Number(item.invNum);
                })
                this.$emit('stockTotal',proStockTotal);
            }else if(type === 3){
                //重量
                let reglogisti =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;

                if(!data.logisticsWeight){
                    ErrorText.logistics = '请输入商品物流重量';
                }else if(!reglogisti.test(data.logisticsWeight)){
                    ErrorText.logistics = '商品物流重量最多只能输入六位整数+两位小数,如：300000.00';
                }else{
                    rules = true;
                    ErrorText.logistics= null;
                }
            }

            this.$set(this.invenData[index],'errorMsg',ErrorText)
            this.invenData.push([]);
            this.invenData.pop([]);

            return rules;
        },
        /** 
         * 全部数据验证
         * @param text 输入内容
         * @param index 当前索引
         * @param type 1-价钱，2-库存，3-重量
         */
        allRules(){
           let _this = this;
           let isRules = true;
           let rules = true;
           _this.invenData.forEach((item,i)=>{
                if(this.isSpec){
                    let a = _this.itemRules(item,i,1);
                    let b = _this.itemRules(item,i,2);
                    if(isRules && (!a || !b)){
                        isRules = false;
                    }
                }else{
                    let c = _this.itemRules(item,i,3);
                    if(isRules && !c){
                        isRules = false;
                    }
                }
              
           })
           return isRules;
        },
        listAdd(data){
            let _this =this;
            this.listData=[] ;
            data.forEach((item,i)=>{
                if(item.specValues.length >0){
                    _this.listData.push(item);
                }
            })
        },
        invenAdd(data1,data2){
            let _this =this;
            this.invenData=[];
            let myArray=new Array();
            data1.forEach((item,i)=>{
                item.specificaIds = item.specificaIds.split(",");
                myArray.push(item);
            })

            myArray.forEach((item,i)=>{
                let arr = []
                item.specificaIds.forEach((test,j)=>{
                    data2.forEach((a,b)=>{
                        a.specValues.forEach((c,d)=>{
                            if(test == c.id){
                                arr.push(c.specValueId)
                            }
                        })
                    })
                })
                item.specificaIds = arr.toString();
            })
            this.invenData = myArray;
            this.newlistData(this.invenData);
            this.invenData.forEach((item,i)=>{
                if(item.isDefault == 1){
                    this.isDefault = i;
                }
            })
        },
        /**
         * 深复制
         * @param src
         * @returns {{}}
         */
        copy(obj) {
            var dst = obj.constructor === Array ? [] : {};
            for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if(typeof obj[prop] == 'object'){
                dst[prop] = this.copy(obj[prop])
                }else{
                dst[prop] = obj[prop];
                }
            }
            }
            return dst;
        },
    },
    mounted() {
        let _this = this;
        _this.listAdd(_this.specList);
        if(this.$route.params.id === 'add'){
            _this.invenAdd(_this.invenList,_this.specList);
        }else{
            _this.invenAdd(_this.copy(_this.invenList),_this.specList);
        }
        if(this.type !='0'){
            this.isSpec = false;
        }
        
    }
}
</script>
<style lang="less" scoped>
@import '../../../../../../assets/css/mixins.less';

.order_tab{
    width: 100%;
    border-color: #dfe6ec;
    border: 1px solid #dfe6ec;
    line-height: 1;
    .order_tab_header{
        width: 100%;
        background:#eef1f6;
    }
    td,th{
        padding: 10px;
        border: 1px solid #dfe6ec;
        
    }
    tr:hover,td:hover{
        background:none;
    }
    td:hover{
        color: #3892c5;
    }
    .p-warning{
        color:rgb(255, 73, 73);
        font-size: 12px;
    }
    .td-input-box{
        text-align:left;
        .input-warning{
            border: 1px solid rgb(255, 73, 73) !important;
        }
        input{
            width: 100%;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            color: #1f2d3d;
            font-size: inherit;
            height: 36px;
            line-height: 1;
            outline: 0;
            padding: 3px 10px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
    }
}
</style>