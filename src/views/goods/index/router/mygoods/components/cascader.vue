<template>
  <div class="group-box" :style="{width:Width}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <div class="group-selected"
            @click.stop=" isShow = !isShow">
            <p v-if="selectedData.length == 0" 
                class="group-placeholder">请选择商品分组</p>
            <div class="embox" @click.stop=" isShow = !isShow">
                <em class="down" :class="{'is-reverse':isShow}"></em>
            </div>
            <span class="item" v-for=" (item,i) in selectedData" :key="i">
                <em>{{item.groupName}}</em>
                <i class="el-icon-circle-close"  @click.stop="deleteData(item.groupId)"></i>
            </span>
        </div>
        <el-form-item prop="group" >
            <el-checkbox-group v-model="ruleForm.group" style="display:none">
                <el-checkbox label="备选项" name="group"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
    </el-form>
    <div class="grouping-option" v-show="isShow">
        <ul class="option1">
            <li v-for="(item,index) in oneData"
                :key="index" 
                class="shop-box-justify"
                @click="selectedItem(item,1)"
                @mouseenter="listHover(item)">
                <!-- @mouseleave="listHover(1)"> -->
                <span>{{item.groupName}}</span>
                <i class="el-icon-arrow-right" v-if="item.isChild>0 && item.childGroupList"></i>
            </li>
        </ul>
        <ul class="option2" v-if="isSelect">
            <li v-for="(test,i) in towData.childGroupList"
                :key="i"
                @click="selectedItem(test,2)">
                <span>{{test.groupName}}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props:{
        width:{
            type: String
        },
        value:{
            type: [Array,String],
            default:'0'
        },
        ids:{
            type: [Object,String],
            default: '0'
        }
    },
    data() {
        var isGroup = (rule, value, callback) => {
            if (!value) {
            return callback(new Error('请至少选择一个商品分组'));
            }
        };
        return {
            oneData:[],//第一级
            towData:[],//第二级
            Width:'194px',
            isShow: false,
            isSelect: false,
            selectedData:[],//选中选项

            ruleForm:{
                group: false//id集合
            },//验证对象
            rules:{
                group: [
                    { validator: isGroup, trigger: 'change' }
                ],
            },//验证
        }
    },
    watch:{
        'width'(a,b){
            this.Width = a;
        },
        'selectedData'(a,b){
            let _this = this;
            if(a.length == 0){
                _this.ruleForm.group = false;
            }
            _this.selectedData.forEach((item,i)=>{
                item.sort = i;
                _this.ruleForm.group = true;
            })
           _this.$emit('change',_this.selectedData);
        },
        'value'(a,b){
            if(a.length == b.length) return false;
            this.initialValue(a);
        },
        'ids'(a,b){
            let _this = this;
            if(a.shopId==b.shopId) return false;
            
            _this.groupListAjax({
                'data':a,
                'success'(data) {
                    _this.oneData = data.data.groupList;
                     if(_this.$route.params.id === 'add' || typeof _this.$route.params.id == 'undefined'){
                        _this.selectedData = []; 
                     }
                }
            })
        }
    },
    methods:{
        /** 
         * 选择
         * @param data 选择数据
         * @param type 选择数据
         */
        selectedItem(data,type){
            let _this = this;
            let _add = true;//重复排除条件
            let newData = {};//父级数据
             _this.selectedData.forEach((item,i)=>{
                 if(data.id == item.groupPId || data.id == item.groupId){
                    if(_add){
                        _this.$message({
                        message: '所选有重复,请不要重复添加',
                        type: 'warning'
                        });
                        return _add = false;
                      }
                 }
             })
            if(!_add) return;//重复不添加
            //一级选择
            if(type == 1){
                newData = {
                    groupName: data.groupName,
                    groupPId: 0,
                    groupId: data.id,
                    shopId: data.shopId,
                }
                this.selectedData.push(newData);
                //有子集
                if(data.isChild){
                    data.childGroupList.forEach((item,i) => {
                            let newChildData = {
                                groupName: item.groupName,
                                groupPId: item.groupPId,
                                groupId: item.id,
                                shopId: item.shopId,
                            }
                        _this.selectedData.push(newChildData);
                    });
                    
                }
            }
            //二级选择
            if(type == 2){
                //父级排重
                let flag = true;
                _this.selectedData.forEach((item,i)=>{
                    if(item.groupId == _this.towData.id && flag){
                        flag = false;
                    }
                })
                if(flag){
                    newData = {
                        groupName: this.towData.groupName,
                        groupPId: 0,
                        groupId: this.towData.id,
                        shopId: this.towData.shopId,
                    }
                    _this.selectedData.push(newData);
                }
                let newChildData = {
                    groupName: data.groupName,
                    groupPId: data.groupPId,
                    groupId: data.id,
                    shopId: data.shopId,
                }
                _this.selectedData.push(newChildData);
            }
            this.isShow = false;
            this.isSelect = false;
        },
        /**
         * hover显示
         */
        listHover(data){
            let _this = this;
            if( data == 1 || !data.childGroupList || !data.isChild){
                this.isSelect = false;
                return false;
            }
            if(data.isChild == 1 && data.childGroupList){
                this.towData = data;
                this.isSelect = true;
            }
            
        },
        /** 
         * 删除
         * @param id  删除的id
         */
        deleteData(id){
            let _this = this;
            _this.selectedData.forEach((item,i)=>{
                if(id == item.groupId){
                    _this.selectedData.splice(i, 1);
                }
            })
           // return add
        },
        /** 
         * 初始值处理
         * @param val  数据
         */
        initialValue(val){
            let arr = [];
                val.forEach((item,i)=>{
                    let newData = {
                        groupName: item.groupName,
                        groupPId: item.groupPId,
                        groupId: item.groupId,
                        shopId: item.shopId,
                        id:  item.id
                    }
                    arr.push(newData);
                })
            this.selectedData = arr;
        },
        /** 
         * 验证
         */
        submitForm() {
            let flag = true;
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    return flag ;
                } else {
                    console.log('error submit!!');
                    return flag = false;
                }
            });
            return flag;
        },
        /** 
         * 重置
         */
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
    },
    mounted() {
        let _this = this;
        if(_this.value != '0'){
            _this.initialValue(_this.value);
        }
        if(_this.ids.shopId != ''){
            _this.groupListAjax({
                'data':_this.ids,
                'success'(data) {
                    _this.oneData = data.data.groupList;
                }
            })
        }
        $('body').on('click',()=>{
            this.isShow = false;
            this.isSelect = false;
        })
    }
}
</script>

<style lang="less" scoped>
@import '../../../../../../assets/css/mixins.less';
.group-box{
    position: relative;
    display: inline-block;
    border: 1px solid #bfcbd9;
    padding-right: 30px; 
    .border-radius(5px);
    .group-selected{
        width: 100%;
        min-height: 35px;
        border: 0;
        // .border-radius(5px);
        span.item{
            background: #dfe4ed;
            padding: 5px 8px;
            line-height: 1;
            margin: 3px 0 3px 6px;
            .border-radius(5px);
            color:#878d99;
            display: inline-block;
            i{
                color: #b4bccc;
            }
        }
        
    }
    .group-placeholder{
        color:#bfcbd9;
        padding-left: 10px; 
    }
    .embox{
        position: absolute;
        top: 0;
        width: 30px;
        height: 100%;
        right:0;
    }
    .down{
        position: absolute;
        top:45%;
        margin-top: -3px; 
        right:36%;
        content:'';
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 8px solid #bfcbd9;
        transform: rotate(0deg);
        transition: transform .3s;
    }
    .is-reverse {
        transform: rotate(180deg);
    }
}
.grouping-option{
    height: 1;
    position: relative;
    z-index: 9;
    .option1,.option2{
        position: absolute;
        top: 3px;
        width: 190px;
        background: #fff;
        margin-bottom: -17px;
        margin-right: -17px;
        overflow-y: scroll;
        max-height: 200px;
        border: 1px solid #dfe4ed;
        li{
            padding: 2px 6px;
            width: 100%;
            span,i{
                display: block;
            }
            i{
                color: #bfcbd9;
            }
            &:hover{
                background: #f5f7fa;
            }
        }
    }
    .option1{
        left: 0;
    }
    .option2{
        left: 190px;
    }
}
</style>
