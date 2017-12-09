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
                <td v-for="(test,i) in listData" lass="text-overflow"
                    :rowspan="[i+2<listData.length &&  i==0?listData[i+1].specValues.length*listData[i+2].specValues.length:2]"
                    v-if="index % test.specValues.length == 0"
                    >
                    <!--每个规格对应库存ids-->
                    <!-- :rowspan="[  i+2<listData.length &&  i==0?listData[i+1].specValues.length*listData[i+2].specValues.length:2]" -->
                    <p v-for="(c,d) in item.specificaIds">
                        <!--规格 和 库存下的分类id 对应显示 -->
                        <span v-for="(a,b) in test.specValues" v-if=" c == a.id">
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
                            &nbsp
                    </el-radio>
                 </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import imgUpload from 'components/imgUpload'
export default {
    props:{
        specList:{
            type: Array
        },
        invenList:{
            type: Array
        }
    },
    components: {
      imgUpload
    },
    data() {
        return {
            specData:'',//规格
            invenData:'',//库存
            isDefault:1,//是否默认

            fromSelected:{//选中的内容
            shop: '',//店铺
            grouping: [],//分组
            goodsStatus: '',//商品类型
            spec:[]//规格
            },
            radio:4,
            tablelists:[{
                spec1 :'1',
                spec2:  ['AAA','BBB'],
                spec3:  ['aaa','bbb','ccc'],
                money:'4',
                num: '无',
                number:'无',
                dug: 1,
            },{
                spec1 :'1',
                spec2:  ['AAA','BBB'],
                spec3:  ['aaa','bbb','ccc'],
                money:'4',
                num: '无',
                number:'无',
                dug: 1,
            },{
                spec1 :'1',
                spec2:  ['AAA','BBB'],
                spec3:  ['aaa','bbb','ccc'],
                money:'4',
                num: '无',
                number:'无',
                dug: 1,
            }],
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
                //specificaIds转换数组 进行匹配
                item.specificaIds = item.specificaIds.split(",");
                //库存列表 遍历
                // _this.listData.forEach((test,j) => {
                //     //每个规格集合下的specValues
                //     test.specValues.forEach((n,c)=>{
                //         item.specificaIds.forEach((e,h)=>{
                //             if(e==n.id){
                //                 console.log(n.specValue,e);
                //                 item.valueName = n.specValue;
                //             }
                //         })
                //     })
                // })
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
@import '../../../../assets/css/mixins.less';

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
    }
}
</style>