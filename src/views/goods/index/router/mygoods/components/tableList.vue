<template>
<div class="table-spec">
    <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab">
        <tbody>
            <tr class="order_tab_header">
                <th width="13%" 
                    v-for="(item,index) in listData"
                    :key="index">{{item.specName}}</th>
                <th width="16%">价格(元)</th>
                <th width="16%">库存</th>
                <th width="16%">商家编码</th>
                <th width="8%">销量</th>
                <th width="5%">是否默认</th>
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
                        <!--规格 和 库存下的分类id 对应显示 -->
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.id" :key="b">
                            {{a.specValue}}
                        </span>
                    </p>
                    
                </td>
                <!--第二个-->
                <td v-for="(test,i) in listData" lass="text-overflow"
                    v-if="listData.length-i == 2 && index%(listData[2].specValues.length)==0"
                    :rowspan="[listData[2].specValues.length]"
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
                <td>
                    <el-input v-model="item.invPrice" placeholder="请输入内容"></el-input>
                </td>
                <td>
                    <el-input v-model="item.invNum" placeholder="请输入内容"></el-input>
                </td>
                <td>
                    <el-input v-model="item.invCode" ></el-input>
                </td>
                <td>
                    {{item.invSaleNum==null?'0':item.invSaleNum}}
                </td>
                <td>
                    <el-radio v-model="isDefault" 
                            :label="index"
                            @change="changeDefault(index)">
                            &:nbsp
                    </el-radio>
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
        }
    },
    data() {
        return {
            specData:'',//规格
            invenData:'',//库存
            isDefault:1,//是否默认
            listData:[],//列表数据
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
            console.log(a,'---改动')
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
    },
    mounted() {
        this.listData = this.specList;
        this.invenData = this.invenList;
        this.isDefault;
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
}
</style>