<template>
<div :class="{'table-nopass':!isPass}" style="position: relative">
    <div class="table-spec" >
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
                            :value="Number(i)">
                        </el-option>
                    </el-select>
                    <i class="el-icon-circle-close"
                        @click.self="removeList(index)"> 
                        </i>
                </div>
                <div class="table-inline" v-if="index === 0">
                    <el-checkbox v-model="isAddImg" >添加规格图片</el-checkbox>
                </div>
            </div>
            <div class="table-spec-option" v-if="item.specNameId != ''">
                <div class="table-inline" v-for=" (test,i) in item.specValues" :key="i" >
                    <div class="item-selected">
                        {{test.specValue}}
                        <i @click="remove(index,i)" class="el-icon-circle-close"></i>
                    </div>
                    <div class="table-img" v-if="isAddImg && index === 0" @click="changeImgData(index,i)">
                        <gt-material v-if="isAddImg" :img="test.specImage==null? '': imgUrl+test.specImage" 
                            @change="changeImg">
                        </gt-material>
                        <gt-material v-else></gt-material>
                    </div>
                </div>
                <div class="table-inline fontBlue table-spec-add"
                        style="padding-left:15px;">
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
                                :value="Number(i)">
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="addoptions(selectedSpec,index)">确定</el-button>
                        <el-button @click="isShowAdd='';selectedSpec =''">取消</el-button>
                    </div>
                </div>
                <p v-if="isAddImg && index === 0">目前只支持为第一个规格设置不同的规格图片 设置后，用户选择不同规格会显示不同图片 建议尺寸：640 x 640像素</p>
            </div>
        </div>
        <div class="table-spec-button"  v-if=" specList.length<3">
            <el-button @click="addspec">添加项目规格</el-button>
        </div>
    </div>
    <p v-if="!isPass" class="table-nopass-text">请完善商品规格信息
    </p>
    <div class="table-isType" v-if="isType != 0 || noUpSpec == 1">
        <p v-if="isType == 1 ||isType == 5">该商品已经加入<span v-text="[isType==1?'团购':isType==5?'批发':'']"></span>。不能修改商品规格</p>
        <p v-if="1<isType<5">
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

import gtMaterial from 'components/material/material'

export default {
    props:{
        shopId:{
            type: Number,
            default:0
        },
        row:{
            type: [Array,String],
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
            deleteFlag: true,//删除触发change判断条件
            ajaxFlag: true,//新增触发change判断条件
            nameList:[],
            itemIndex:[],//图片上传改变的索引
            flag:false,//需要触发事件的监听
            newSpecList:[],//传递数据
            isPass:true
        }
    },
    watch: {
        'row'(a,b){
            this.specList = a;
        },
    },
    mounted() {
        let _this = this;
        if(this.row != '0' && this.row.length>0){
            this.specList = this.row;
            this.specList[0].specValues.forEach((item,i) => {
                if(item.specImage != null){
                    _this.isAddImg = true;
                }
            });
            this.specList.forEach((item,i)=>{
                _this.$set(_this.nameList,_this.nameList.length,item.specNameId);
            });
        }
       
        _this.specificaList();
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
                    type: 1,
                    shopId: _this.shopId
                },
                'success':function (data){

                    if(id == null){
                        //总列表
                        _this.listData = data.data;
                        _this.imgUrl = data.imgUrl;
                        //console.log(data,'总规格列表');

                    }else{
                        //分类表
                        //console.log(data,'分组规格列表',id);
                        _this.specList.forEach((item,i)=>{
                            //对应规格列表 添加 分组下的所有规格（all_specList）方便后期添加排重对比
                            if(item.specNameId == id){
                                item.all_specList = data.data;
                                _this.$set(_this.specList,i,item);
                                
                            }
                        })
                    }
                }
            });
        },
        /** 
         * 总规格选中
         */
        selectedSpec1(val,index,i){
            
            let _this = this;
            let isAdd = true;
            if(!this.deleteFlag){
                if(_this.nameList.length == index+1){
                    this.deleteFlag = true;
                }
                return;
            }
            //排重
            if(_this.nameList != null && _this.nameList.length > 0){
                for(let k = 0; k < _this.nameList.length ;k++){

                    if(_this.nameList[k] == val){
                        //重新对应返回原值
                        isAdd = false;
                        //重复提示
                        _this.$message({
                            message: '请不要重复添加',
                            type: 'warning'
                        });
                        
                        //拿到规格改变对应的值
                        let changeData = _this.specList[index];
                        if(changeData.specValues.length == 0){
                            _this.specList.splice(index,1);
                            return
                        }
                        for(let j in _this.listData){
                            //遍历总规格列表里的属性值和改变值相等，赋值原来的改变值;
                            if(_this.listData[j] == changeData.specName){
                                _this.specList[index].specNameId = Number(j);
                                _this.$set(_this.specList,index,changeData);
                            }
                        }
                    } 
                }
            }
            //新增
            if(isAdd){
                
                let newId = '';//新增id
                let newName = '';//新增id
                let index2  = 0;
                let _isAdd = true;
                
                //总规格中有对应新增
                for(let k in _this.listData){
                    if(k == val && _isAdd){
                        newId = k;
                        newName = _this.listData[k];
                        _isAdd = false;
                    }
                    index2 = k;
                }
                //无对应新增
                if(_isAdd && typeof val != 'number'){
                    newId = index2 + 1;
                    newName = val
                    _this.$set(_this.listData,newId,val);
                    this.deleteFlag = false;
                    //新增自定义规格
                    /*
                    *新增名称
                    * @param  type: 1 规格 2分组规格
                    * @param  specName:名称
                    * @param  shopId: 店铺ID
                    * */
                    _this.addSpecifica(1,{
                        type:1,
                        specName: newName,
                        shopId: _this.shopId
                    },index)
                }
                
                //添加新增
                let newData={
                    erpNameId: _this.specList[index].erpNameId,
                    productId: _this.specList[index].productId,
                    specName:  newName,
                    specNameId:Number(newId),
                    specValues:[]
                }
                
                this.isAddImg = false;

                this.$set(_this.specList,index,newData);
                this.$set(_this.nameList,index,Number(newId));
            }
            
        },
         /** 
         * 分规格选中
         */
        selectedSpec2(val,index){
            let _this = this;
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

                if(!_this.specList[index].all_specList.hasOwnProperty(item) && flag && val.length>0){
                    /*
                    *新增名称
                    * @param  type: 1 规格 2分组规格
                    * @param specValue  值
                    * @param specId: 名称ID
                    * */
                    this.addSpecifica(2,{
                        type:1,
                        specValue: item.toString(),
                        specId: _this.specList[index].specNameId
                    },index)
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
         * @param  specName:名称
         * @param  shopId: 店铺ID
         *  新增值
         * @param specValue  值
         * @param specId: 名称ID

         */
        addSpecifica(type,opt,index){
            let _this = this;

            _this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductSpecaddSpecifica_post,
                'data':opt,
                'success':function (data){
                    if(type == 1){
                        //规格    
                        _this.specificaList();
                        _this.specList[index].specNameId = data.data;
                        //
                    }
                    if(type == 2){
                        //参数
                        _this.specificaList(opt.specId);
                    }
                }
            });
        },
        /** 
         * 添加项目规格
        */
        addspec(){
            let pId = Number(this.$route.params.id);
            let data={
                erpNameId:  '',
                productId:  isNaN(pId)?null:pId,
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
            if(index == 0){
                this.isAddImg = false;
            }
            this.specList.splice(index, 1);
            this.nameList.splice(index, 1);
            if(this.nameList.length > 0){
                this.deleteFlag = false;
            }
            this.$emit('change',this.specList);
        },
        /** 
         * 删除分组规格
         */
        remove(index,i){
            let _this = this;
            this.specList[index].specValues.splice(i, 1);
            _this.$emit('change',this.specList);
        },
        /** 
         * 选择分组下规格
         */
        addoptions(opt,index){
            let _this = this;
            _this.isPass = true;
            //新增的集合
            let _data = this.specList[index];
            for(let i in _data.all_specList){
                //对应的分类添加
                opt.forEach((test,j)=>{
                    if(i == test){
                       let newData = _this.specList[index].specValues;
                       let item ={
                            erpValueId: null,        //进销存ID
                            specValue:  _data.all_specList[i],     //规格值名称
                            specValueId: i,      //规格值ID
                            id:i,             //规格ID
                            specImage: null
                       }
                        newData.push(item);
                        _this.isShowAdd = false;
                    }
                    
                })
            }
            _this.selectedSpec ="";//新增后清空
            _this.$emit('change',this.specList);
        },
        /** 
         *修改图片
         */
        changeImg(val){
            let _index = this.itemIndex[0];
            let _i = this.itemIndex[1];
            this.specList[_index].specValues[_i].newSpecImage = val;
            this.$emit('change',this.specList);
            console.log(this.specList,'this.specList')
        },
        changeImgData(index,i){
            this.itemIndex = [];
            this.itemIndex.push(index);
            this.itemIndex.push(i);
        },
        /** 
         * 验证规格
         */
        allRules(){
            let _this = this;
            let pass = true;
            if(_this.specList.length != 0){
                _this.specList.forEach((item,i)=>{
                    if(item.specValues.length == 0 && pass){
                        pass = false;
                    }
                })
            }
            this.isPass = pass;
            return pass;
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../../../../assets/css/mixins.less';
.table-nopass{
    .table-spec{
        border: 1px solid #ff4949;
    }
    .table-nopass-text{
        color: #ff4949;
        font-size: 12px
    }
}
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
        min-width: 90px;
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
            min-width: 100%;
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