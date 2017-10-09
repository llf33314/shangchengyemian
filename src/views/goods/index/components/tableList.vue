<template>
<div class="table-spec">
    <table class="table table-hover table-bordered">
        <thead>
            <tr class="col-1">
                <th >1</th>
                <th >2</th>
                <th >3</th>
                <th >价格(元)</th>
                <th >库存</th>
                <th >商家编码</th>
                <th >是否默认</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tabledata in tablelists">
                <td v-text="tabledata.spec1" class=" border border-b" style="padding-left: 2%;"></td>
                <td  class="border border-b border-end" >
                    <tr  class="table-list border-b"
                         v-for="tabledata2 in tabledata.spec2">
                         {{tabledata2}}
                    </tr>
                </td>
                <td  class="border border-b border-end">
                    <tr class="table-list border-b"
                        v-for="tabledata3 in tabledata.spec3">
                        {{tabledata3}}
                    </tr>
                    <tr class="table-list border-b"
                        v-for="tabledata3 in tabledata.spec3">
                        {{tabledata3}}
                    </tr>
                </td>
                <td>
                    <tr class="table-list border-b "
                        v-for="tabledata3 in tabledata.spec3" >
                        <input v-model="tabledata.money "/>
                    </tr>
                    <tr class="table-list border-b "
                        v-for="tabledata3 in tabledata.spec3" >
                        <input v-model="tabledata.money "/>
                    </tr>
                </td>
                <td >
                    <tr class="table-list border-b "
                        v-for="tabledata3 in tabledata.spec3" >
                        <input v-model="tabledata.num" />
                    </tr>
                    <tr class="table-list border-b "
                        v-for="tabledata3 in tabledata.spec3" >
                        <input v-model="tabledata.money "/>
                    </tr>
                </td>
                <td >
                    <tr class=" table-list border-b "
                        v-for="tabledata3 in tabledata.spec3">
                        <input v-model="tabledata.number"/>
                    </tr>
                    <tr class="table-list border-b "
                        v-for="tabledata3 in tabledata.spec3" >
                        <input v-model="tabledata.money "/>
                    </tr>
                </td>
                <td >
                    <tr class=" table-list border-b " 
                        v-for="tabledata3 in tabledata.spec3" >
                        <el-radio class="radio" v-model="tabledata.dug"></el-radio>
                    </tr>
                    <tr class=" table-list border-b " 
                        v-for="tabledata3 in tabledata.spec3" >
                        <el-radio class="radio" v-model="tabledata.dug"></el-radio>
                    </tr>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import imgUpload from 'components/imgUpload'
export default {
    //props:['tablelists'],
    components: {
      imgUpload
    },
    data: function () {
        return {
            fromSelected:{//选中的内容
            shop: '',//店铺
            grouping: [],//分组
            goodsStatus: '',//商品类型
            spec:[]//规格
            },
            radio:1,
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
    mounted() {

    },
}
</script>
<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
@border: 1px solid #dfe6ec;
.table-spec{
    width: 100%;
    .border-radius(5px);
    overflow: hidden;
    .table{
        width: 100%;
        border: @border;
        .table-list{
            display: inline-block;
            padding-left: 10%;
            width: 100%;
        }
    }
    .border{
        border-right: @border;
    }
    .border-b{
        border-bottom: @border;
    }
    .border-end{
         &>tr:last-child{
              border-bottom: 0;
         }
    }
    thead{
        background: #eef1f6;
        th{
            width: 14%;
        }
    }
    th{
        padding-left:2%;
        border-bottom: @border;
    }
    input{
        width: 90px;
        height: 30px;
        border: @border;
        .border-radius(5px);
        padding: 0 8px; 
    }
}
</style>