<template>
  <div class="table-spec">
        <div class="table-spec-box" v-if="specList.length>0" v-for="(item,index) in specList" :key="index">
            <div class="table-spec-title">
                <div class="table-inline">
                    <el-select
                        v-model="item.specNameId"
                        filterable
                        allow-create
                        placeholder="关键词"
                        @change="selectedSpec1(item.specNameId,index)">
                        <el-option
                            v-for="(test,i) in listData"
                            :key="i"
                            :label="test"
                            :value="i">
                        </el-option>
                    </el-select>
                    <i class="el-icon-circle-close"
                        @click="specList.splice(index, 1)"></i>
                </div>
                <div class="table-inline" v-if="index === 0">
                    <el-checkbox v-model="isAddImg" >添加规格图片</el-checkbox>
                </div>
            </div>
            <div class="table-spec-option" >
                <div class="table-inline" v-for=" (test,i) in item.specValues" :key="i">
                    <div class="item-selected">
                        {{test.specValue}}
                        <i @click="remove(index)" class="el-icon-circle-close"></i>
                    </div>
                    <div class="table-img" v-if="isAddImg && index === 0 && test.specImage != ''" >
                        <gt-material :img="imgUrl+test.specImage"></gt-material>
                    </div>
                </div>
                <div class="table-inline fontBlue table-spec-add"
                     style="padding-left:15px;" >
                    <span @click="showAddoption(item.specNameId,index)">+添加</span>
                    <div class="table-spec-add-option" v-if="index === isShowAdd">
                        <el-select
                            v-model="selectedSpec"
                            multiple
                            filterable
                            allow-create
                            @change="selectedSpec2(selectedSpec,index)">
                            <el-option
                                v-for="(test,i) in item.all_specList"
                                :key="i"
                                :label="test"
                                :value="i">
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="addoptions(value10)">确定</el-button>
                        <el-button @click="isShowAdd='';selectedSpec =''">取消</el-button>
                    </div>
                </div>
                <p v-if="!isAddImg && index === 0">目前只支持为第一个规格设置不同的规格图片 设置后，用户选择不同规格会显示不同图片 建议尺寸：640 x 640像素</p>
            </div>
        </div>
        <div class="table-spec-button"  v-if=" specList.length<3">
            <el-button @click="addspec">添加项目规格</el-button>
        </div>
    </div>
</template>
<script>

import gtMaterial from 'components/material/material'

export default {
    props:{
        shopId:{
            type: Number
        },
        row:{
            type: Array
        }
    },
    components: {
      gtMaterial
    },
    data: function () {
        return {
            imgUrl:'',//图片域名
            specList:[],//选中规格列表
            listData:[],//总规格列表
            isAddImg:false,//添加规格图片
            isShowAdd:'',//添加显示
            selectedSpec:[],//分组选择暂存
            aaaa:'',

            fromSelected:{//选中的内容
                shop: '',//店铺
                grouping: [],//分组
                goodsStatus: '',//商品类型
                spec:[]//规格
            },
            fromSelecteds:[],
            checked1:'',
            options:[],
            value10:'',
        }
    },
    watch: {
        'row'(a){
            this.specList = a;
        },
        'specList'(a,b){
            console.log(a,b,'----------');

        }
    },
    mounted() {
        let _this = this;
        this.specList = this.row;
        this.specList[0].specValues.forEach((item,i) => {
            if(item.specImage != null){
                _this.isAddImg = true;
            }
        });
        console.log(this.specList,'this.specList');
        this.specificaList()
    },
    methods: {
        /** 
         * 获取规格
         @param id: 不为空 则查询值 
         @param type: 1 规格 2参数
         @param shopId: 店铺ID
         */
        specificaList(id,type,shopId){
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductSpecificaList_post,
                'data':{
                    id: id || null,
                    type: type || 1,
                    shopId: _this.shopId
                },
                'success':function (data){
                    
                    if(id == null){
                        //总列表
                        _this.listData = data.data;
                        _this.imgUrl = data.imgUrl;
                        console.log(data,'总规格列表');
                    }else{
                        //分类表
                        console.log(data,'分组规格列表',id);
                        _this.specList.forEach((item,i)=>{
                            if(item.specNameId == id){
                                item.all_specList = data.data;
                                _this.$set(_this.specList,i,item)
                                
                            }
                        })
                        console.log(_this.specList,'新_this.specList')
                    }
                }
            });
        },
        /** 
         * 总规格选中
         */
        selectedSpec1(val,index){
            let _this = this;
            let flag = true;
            //新选的val 不能和其他两个重复,

            _this.specList.forEach((item,i)=>{
                console.log(i,index)
                if(i == index) return;
                if(item.specNameId == val){
                    //_this.specList[index].specNameId = oldValue;
                    _this.$message({
                        message: '请不要重复添加',
                        type: 'warning'
                    });
                    //重新对应返回原值
                    console.log(item);
                    if(index == 0){
                        _this.isAddImg = false;   
                    }
                    _this.specList.splice(index,1);
                    // debugger
                    // for(let j in _this.listData){
                    //     if(_this.listData[j] == item.specName){
                    //         item.specNameId = j;
                    //         this.$set(_this.specList,i,item);
                    //     }
                    // }
                    flag = false;
                }
            })
            //重复不执行
            if(!flag) return;

            // for(let i in _this.listData){
            //     if(i == val){
            //         console.log(i,val)
            //         // _this.$message({
            //         //     message: '请不要重复添加',
            //         //     type: 'warning'
            //         // });
            //     }
            // }
        },
         /** 
         * 分规格选中
         */
        selectedSpec2(val,index){
            let _this = this;
            console.log(val,'分---------',index);
            let flag = true;
            val.forEach((item,i)=>{
                //排重
                _this.specList[index].specValues.forEach((test,j)=>{
                    if( test.specValueId == item){
                        _this.$message({
                            message: '请不要重复添加',
                            type: 'warning'
                        });
                        val.splice(i,1);
                        flag = false;
                        return
                    }
                    
                })
                //新增
                console.log(item)
                if(!_this.specList[index].all_specList.hasOwnProperty(item) && flag){
                    console.log('新增');

                }
            })
            
        },
        /**分组规格查询 */
        showAddoption(id,index){
            if(index == this.isShowAdd && this.isShowAdd != ''){
                this.isShowAdd = '';
            }else{
                this.isShowAdd = index;
                this.specificaList(id);
            }
        },
        /** 
         * 新增自定义规格
         * @param  type  1新增名称，2新增值
         * 新增名称
         * @param  type: 1 规格 2参数
         * @param  specName:名称
         * @param  shopId: 店铺ID
         *  新增值
         * @param  type: 1 规格 2参数
         * @param specValue  值
         * @param specId: 名称ID

         */
        addSpecifica(type,data){
            let _this = this;
            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductaddSpecifica_post,
                'data':data,
                'success':function (data){

                }
            });
        },
        /** 
         * 添加项目规格
        */
        addspec(){
            let data={
                erpNameId:  '',
                productId:  Number(this.$route.params.id),
                specName: '',
                specNameId:'',
                specValues:[]
            }
            this.specList.push(data);
           
        },
        /** 
         * 删除规格行列
         */
        removeList(index) {
            this.specList.splice(index, 1);
        },


        addoptions(data){
            this.options.push(data);
            console.log(this.options);
            console.log(data);
        },
        remove: function (index) {
            this.options.splice(index, 1);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
.table-spec{
    width: 100%;
    border: 1px solid #bfcbd9;
    .border-radius(5px);
    padding: 10px;
    .table-spec-title,
    .table-spec-button{
        position: relative;
        width: 100%;
        padding: 6px 40px;
        .border-radius(5px);
        background: #f5f5f5
    }
    .table-spec-title{
        margin-bottom: 4px; 
        i{
            cursor: pointer;
            font-size: 21px;
            position: absolute;
            opacity: 0.5;
            right:15px;
            top: 15px;
        }
    }
    .table-inline{
        display: inline-block;
        width: 90px;
        vertical-align:top;
        margin-right: 10px;
    }
    .table-spec-option{
        width: 100%;
        padding: 6px 40px;
        background: #fff;
        &>p{
            width: 265px;
            line-height: 1em;
            color:#999;
            margin: 20px 0;
        }
        .table-img{
            margin-top: 8px;
            width: 77px;
            height: 77px;
        }
        .item-selected{
            width: 100%;
            height: 36px;
            border: 1px solid #bfcbd9;
            .border-radius(5px);
            line-height: 34px;
            padding-left: 10px;
            position: relative;
            i{
                cursor: pointer;
                font-size: 21px;
                position: absolute;
                opacity: 0.5;
                right:-9px;
                top: -9px;
            }
        }
    }
    .table-spec-add{
        position: relative;
        span{
            cursor: pointer;
        }
    }
    .table-spec-add-option{
        position: absolute;
        left: -20%;
        top: 100%;
        z-index: 1;
        width: 360px;
        background: #fff;
        .box-shadow(0,0,20px,0,0.15);
        padding: 10px;
        .border-radius(5px);
        .el-select{
            width: 200px;
        }
        &::before{
            content: '';
            position: absolute;
            top: -5px;
            left: 16%;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom:  6px solid #fff;
        }
    }
}
</style>