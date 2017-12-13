<template>
  <div class="params-box">
    <p v-for="(item,index) in paramList " :key="index">
        <!--参数名-->
        <el-select  v-model="item.paramsNameId" 
                    filterable
                    allow-create
                    placeholder="请选择商品参数名"
                    @change="params1(item.paramsNameId,index)">
            <el-option v-for="(test,i) in listData1" 
                    :key="i"
                    :label="test" 
                    :value="Number(i)">
            </el-option>
        </el-select>
        <!--参数值-->
        <el-select v-model="item.paramsValueId" 
                    placeholder="请选择商品参数值"
                    filterable
                    allow-create
                    @change="params2(item)">
            <el-option v-for="(test,i) in listData2" 
                    :key="i"
                    :label="test" 
                    :value="Number(i)">
            </el-option>
        </el-select>
        <a class="fontBlue" v-if="index == 0" @click="add(item)">新增</a>
        <a v-else  @click="del(index)">删除</a>
    </p>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
export default {
    props:{
       row:{
           type: Array
       }
    },
    data() {
        return {
            paramList:[],//绑定数据
            listData1:[],//参数列表
            listData2:[],//参数列表
        }
    },
    watch:{
        'row'(a,b){
            console.log(a,b,'cnashu')
        },
        'paramList'(a,b){
            console.log(a,'paramList变化',b)
        },
    },
    methods:{
         /** 
         * 获取参数请求
         * id: 不为空 则查询值 
         *type: 1 规格 2参数
        *shopId: 店铺ID
        */
        paramListAjax(id,index){
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductSpecificaList_post,
                'data':{
                    id: id || null,
                    type: 2 ,
                    shopId: _this.shopId
                },
                'success':function (data){

                    if(id == null){
                        //总列表
                        _this.listData1 = data.data;
                        console.log(data,'总参数列表');
                    }else{
                        //分类表
                        console.log(data,'分组参数列表',id);
                        _this.listData2 = data.data;
                        //默认选中参数值
                        let arr = [];
                        for(let k in data.data){
                            arr.push(k);
                        }
                        _this.paramList[index].paramsValueId = Number(arr[0]);
                    }
                }
            });
        },
        /** 
         * 一级选择
         */
        params1(id,index){
            let _this = this;
            // this.paramList.forEach((item,i) => {
            //     if(i == index) return;
            //     if(id == item.paramsNameId){
            //         _this.$message({
            //             message: '请不要重复添加',
            //             type: 'warning'
            //         });
            //         this.paramList[index].paramsNameId = null;
            //     }
            // });
           this.paramListAjax(id,index);

        },
        /** 
         * 二级选择
         * @param data 改变集合
         */
        params2(data){
            let _this = this;
            this.paramList.forEach((item,i) => {
                if(i == index) return;
                if(data.paramsNameId == item.paramsNameId){
                    if(data.paramsValueId == item.paramsValueId){
                        _this.$message({
                            message: '请不要重复添加',
                            type: 'warning'
                        });
                        _this.paramList[index].paramsValueId = null;
                    }
                }
            });
        },
        /** 
         * 添加
         */
        add(item){
            
            let data = {
                id: null,
                productId: this.$route.params.id,     //商品ID
                paramsNameId: item.paramsNameId,    //参数名称ID
                paramsValueId: null,   //参数值ID
                paramsName: null,      //参数名称
                paramsValue: null,     //参数值 
                sort:'' 

            }
            this.paramList.push(data);
        },
        /** 
         * 删除
         */
        del(index){
            this.paramList.splice(index,1);
        }
    },
    mounted() {
        let _this = this;
        this.paramList= this.row;
        this.paramListAjax();
        console.log(this.row,'paramRow')
    }
}
</script>

<style lang="less" scoped>
@import '../../../../../../assets/css/mixins.less';
.params-box{
    width: 100%;
    p{
        margin-bottom: 10px;
    }
    &>p:last-child{
        margin-bottom: 0;
    }   
}
</style>
