<template>
<div class="table-spec" style="position: relative">
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
                    :class="{'input-warning':item.errorMsg.Price != null && item.invPrice == null}"/>
                    <span class="p-warning" v-if="item.errorMsg.Price != null && item.invPrice == null">{{item.errorMsg.Price}}</span>
                </td>
                <td v-if="isSpec" class="td-input-box">
                    <input v-model.trim="item.invNum" placeholder="请输入内容" @blur="itemRules(item,index,2)" 
                    :class="{'input-warning':item.errorMsg.invNum != null && item.invNum==null}"/>
                    <span class="p-warning" v-if="item.errorMsg.invNum != null && item.invNum==null">{{item.errorMsg.invNum}}</span>
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
                        <span class="p-warning" v-if="item.errorMsg.logistics != null && item.logisticsWeight==null" >{{item.errorMsg.logistics}}</span>
                    </div>
                </td>
            </tr>
            <tr>
               <td :colspan="[isSpec != '0'?listData.length+5:listData.length+1]">
                   批量设置
                   <div class="td-footer" v-if="isSpec">
                        <a  class="td-button" 
                            v-if="typeBatch !=2 "
                            @click="typeBatch=1;isButton=true">价格</a>
                        <a  class="td-button" 
                            v-if="typeBatch !=1 "
                            @click="typeBatch=2;isButton=true">库存</a>
                    </div>
                    <div class="td-footer" v-if="!isSpec">
                        <a  class="td-button" 
                            v-if="typeBatch !=2 "
                            @click="typeBatch=3;isButton=true">重量</a>
                    </div>
                   <div class="td-footer" v-if="isButton">
                        <input  class="td-footer-input" 
                                v-model.trim="batchs" 
                                placeholder="请输入内容"
                                :class="{'td-footer-inputNO':batchsWarning!=''}"/>
                        <a class="td-button" @click="changeBatch(batchs)">保存</a>
                        <a class="td-button" @click="isButton=false;batchs='';typeBatch=0;batchsWarning=''">取消</a>
                        <p class="inputNO-warning">{{batchsWarning}}</p>
                   </div>
               </td>
            </tr>
        </tbody>
    </table>
    <div class="table-isType" v-if=" (1<isType && isType<5 )|| noUpSpec == 1">
        <p>
            该商品已经加入
            <span v-if="isType==2">秒杀</span>
            <span v-if="isType==3">拍卖</span>
            <span v-if="isType==4">预售</span>。不能修改商品规格和商品库存</p>
        <p v-if="noUpSpec == 1">商城不能修改商品规格和库存</p>
        <!-- ，请去进销存修改 -->
    </div>
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
        },
        isType:{
            type:Number,
            default:0,
        },
        noUpSpec:{
            type:Number,
            default:0,
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
            isButton:false,//批量修改
            batchs:'',//输入批量内容
            batchsWarning:'',//警告
            typeBatch:0,//批量选择
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
                if(typeof item.specificaIds == 'string'){
                    item.specificaIds = item.specificaIds.split(",");
                    item.errorMsg = {
                        Price:null,
                        invNum:null,
                        logistics:null
                    };
                }
               
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
           debugger
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
        /** 
         * 批量修改 
         **/
        changeBatch(){
            let _this = this;
            let flag = false;//验证
            //验证
            
            if(this.typeBatch === 1){
                //价钱
                let regPrice =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;
                if(!this.batchs){
                    this.batchsWarning = '请输入价格';
                }else if(!regPrice.test(this.batchs)){
                    this.batchsWarning = '价格最多只能输入六位整数+两位小数,如：300000.00';
                }else{
                    flag = true;
                }
            }else if(this.typeBatch === 2){
                //库存
                let regInvNum =/^[0-9]{1}\d{0,5}?$/;
                 if(!this.batchs){
                    this.batchsWarning = '请输入商品库存';
                }else if(!regInvNum.test(this.batchs)){
                    this.batchsWarning = '商品库存只能输入是6位数字：999999';
                }else{
                    flag = true;
                }
            }else if(this.typeBatch === 3){
                //重量
                let reglogisti =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;

                if(!this.batchs){
                   this.batchsWarning = '请输入商品物流重量';
                }else if(!reglogisti.test(this.batchs)){
                   this.batchsWarning = '商品物流重量最多只能输入六位整数+两位小数,如：300000.00';
                }else{
                    flag = true;
                }
            }
            if(!flag)return false;
            let proStockTotal = 0;
            this.invenData.forEach((item,i)=>{
                if(this.typeBatch ==1 ){
                    item.invPrice = this.batchs;
                }
                if(this.typeBatch ==2 ){
                    item.invNum = this.batchs;
                    proStockTotal += Number(item.invNum);
                    _this.$emit('stockTotal',proStockTotal);
                }
                if(this.typeBatch ==3){
                    item.logisticsWeight = this.batchs;
                }
            })
            this.isButton = false;
            this.batchs = '';
            this.typeBatch = 0;
        }
    },
    mounted() {
        let _this = this;
        _this.listAdd(_this.specList);
        _this.invenData = _this.invenList;
        _this.newlistData(_this.invenData);
        if(this.type !='0'){
            this.isSpec = false;
        }
        //默认库存
        _this.invenData.forEach((item,i)=>{
            if(item.isDefault == 1){
                this.isDefault = i;
            }else{
                this.isDefault = 0
            }
        })
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
    .td-button{
        margin: 10px;
        color:#20a0ff;
        cursor: pointer;
    }
    .td-footer{
        display: inline-block;
        text-align: left;
        position: relative;
        margin: 10px;
        .td-footer-input{
            width: 280px;
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
        .inputNO-warning{
            position: absolute;
            color: #ff4949;
        }
        .td-footer-inputNO{
            border: 1px solid #ff4949 !important;    
        }
    }
    
}
.table-isType{
    width: 100%;
    background: rgba(0, 0, 0, 0.45);
    position: absolute;
    color:#e8e8e8;
    top: 0;
    left: 0;
    height: 100%;
    text-align: center;
    font-size: 16px;
    .ik-box;
    .ik-box-align(center);
    .ik-box-pack(center);
    z-index: 2;
}
</style>