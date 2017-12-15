<template>
  <div class="params-box">
    <p v-for="(item,index) in paramList " :key="index">
        <!--参数名-->
        <el-select  v-model="item.paramsNameId" 
                    filterable
                    allow-create
                    placeholder="请选择商品参数名"
                    @change="params1(item,index)">
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
                    @change="params2(item,index)">
            <el-option v-for="(test,i) in item.all_params" 
                    :key="i"
                    :label="test" 
                    :value="Number(i)">
                    <p>{{test}}--{{item.paramsValueId}}--{{i}}</p>
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
        },
        shopId:{
            type: Number
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
                        //console.log(data,'总参数列表');
                    }else{
                        //分类表
                        //console.log(data,'分组参数列表',id);
                        _this.paramList[index].all_params = data.data;
                        //默认选中参数值
                        let arr = [];
                        for(let k in data.data){
                            arr.push(k);
                        }
                        if(arr.length>0){
                            _this.paramList[index].paramsValueId = Number(arr[0]);
                        }else{
                            _this.paramList[index].paramsValueId = null;
                        }
                        
                    }
                }
            });
        },
        /** 
         * 一级选择
         * 可以重复
         */
        params1(data,index){
            let _this = this;
            let add = true;
            for(let i in this.listData1){
                if(i == data.paramsNameId && add){
                    _this.paramListAjax(data.paramsNameId,index);
                    add = false;
                }
            }
            if(add){
                if(_this.listData1.hasOwnProperty(data.paramsNameId)) return;
                data.paramsValueId = null;
                /**
                 * 新增名称
                 * type: 2参数
                 * specName:名称
                 * shopId: 店铺ID
                 */
                _this.addparamAjax(1,{
                    type:2,
                    specName:data.paramsNameId,
                    shopId:_this.shopId
                },index)
                _this.paramListAjax(data.paramsNameId,index);
            }
        },
        /** 
         * 二级选择
         * @param data 改变集合
         */
        params2(data,index){
            let _this = this;
            let add = true;
            _this.paramList.forEach((item,i) => {
                if(i == index) return;
                if(data.paramsNameId == item.paramsNameId && add){
                    if(data.paramsValueId == item.paramsValueId && data.paramsValueId != null){
                        _this.$message({
                            message: '请不要重复添加',
                            type: 'warning'
                        });
                        _this.paramList[index].paramsValueId = null;
                        add = false;
                    }
                }
            });

            if(add && data.paramsValueId != null && !isNaN(data.paramsValueId)){
                if(data.all_params.hasOwnProperty(data.paramsValueId)) return;
                data.paramsValueId = null;
                /**
                 * 新增名称
                 * type: 2参数
                 * specValue  值
                 * specId:   名称ID
                 */
                debugger
                _this.addparamAjax(2,{
                    type:2,
                    specValue:data.paramsValueId,
                    specId: data.paramsNameId
                },index)
            }
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
                sort:'' ,
                all_params: item.all_params

            }
            this.paramList.push(data);
        },
        /** 
         * 删除
         */
        del(index){
            this.paramList.splice(index,1);
        },
        /** 
         * 新增参数名和参数值
         * @param  type  1新增名称，2新增值
         * 新增名称
         * @param  specName:名称
         * @param  shopId: 店铺ID
         *  新增值
         * @param specValue  值
         * @param specId: 名称ID
         */
        addparamAjax(type,opt,index){
            let _this = this;
            let _data = _this.paramList[index];
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductSpecaddSpecifica_post,
                'data':opt,
                'success':function (data){
                    if(type == 1){
                        //名称 
                        debugger
                        _this.paramListAjax();
                        _this.paramListAjax(data.data,index);
                        let newId = data.data
                        _this.listData1[newId] = opt.specName;
                        _data.paramsNameId = data.data
                    }
                    if(type == 2){
                        //新增值
                        _this.paramListAjax(opt.paramsNameId,index);
                        _data.paramsValueId = data.data;
                    }
                }
            });
        }
    },
    mounted() {
        let _this = this;
        this.paramList= this.row;
        this.paramListAjax();
        if(this.paramList.length>0){
            _this.paramList.forEach((item,i)=>{
                this.paramListAjax(item.paramsNameId,i);
            })
        }
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
