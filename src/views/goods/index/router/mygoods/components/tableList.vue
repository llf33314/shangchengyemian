<template>
<div class="table-spec">
    <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
        <tbody>
            <tr class="order_tab_header">
                <th width="13%" 
                    v-for="(item,index) in listData"
                    :key="index">{{item.specName}}</th>
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
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.id" :key="b">
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
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.id" :key="b">
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>
                <!--第三个-->
                <td v-for="(test,i) in listData" lass="text-overflow"
                    v-if="listData.length-i == 1"
                    :key="i">
                    <p v-for="(c,d) in item.specificaIds" :key="d">
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.id" :key="b">
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>
                <td v-if="isSpec">
                    <el-input v-model="item.invPrice" placeholder="请输入内容" @blur="itemRules(item.invPrice,$event)"></el-input>
                    <span class="p-warning"></span>
                </td>
                <td v-if="isSpec">
                    <el-input v-model="item.invNum" placeholder="请输入内容"></el-input>
                </td >
                <td v-if="isSpec">
                    <el-input v-model="item.invCode" ></el-input>
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
                 <td v-if="!isSpec">
                    <div style="width:120px">
                        <el-input v-model="item.logisticsWeight" placeholder="请输入商品重量"></el-input>
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
            isDefault:1,//是否默认
            listData:[],//列表数据
            isSpec:true,//物流和规格判断
        }
    },
    watch:{
        /** 
         * 默认值改变
         */
        'isDefault'(a,b){
            this.invenData.forEach((item,i)=>{
                if(i === a){
                        item.isDefault = 1;
                }
            })
        } ,
        'specList'(a){
            this.listData = a;
        },
        'invenList'(a){
            this.invenData = a;
            this.newlistData();
        }
    },
    methods:{
        /** 
         * 数据重组
        */
        newlistData(){
            let _this = this;
            //规格遍历
            _this.invenData.forEach((item,i) => {
                item.specificaIds = item.specificaIds.split(",");
            });
        },
        /** 
         * 单个数据验证
         * @param text 输入内容
         * @param 当前数据
         */
        itemRules(text,e){
            let reg =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;
            let _flag = false;
            //错误文本
            let ErrorMsg ='';
            
            if(!text){
                ErrorMsg = '请输入统一邮费价';
                _flag = true;
            }
            if(!reg.test(text)){
                ErrorMsg = '价格最多只能输入六位整数+两位小数,如：300000.00';
                _flag = true;
            }
            if(_flag){
                
                let dom = '<span class="p-warning">'+ErrorMsg+'</span>';
                
                console.log($(e.target).parent(),'e')
            }
            
        }
    },
    mounted() {
        this.listData = this.specList;
        this.invenData = this.invenList;
        if(this.type !='0'){
            this.isSpec = false;
        }
        this.invenData.forEach((item,i)=>{
            if(item.isDefault == 1){
                this.isDefault = i;
            }
        })
        //console.log(this.listData,'编辑规格listData');
        //console.log(this.invenList,'编辑库存');
        this.newlistData()
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
}
</style>