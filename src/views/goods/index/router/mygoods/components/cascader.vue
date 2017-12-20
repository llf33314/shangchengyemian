<template>
  <div class="group-box" :style="{width:Width}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <div class="group-selected"
            @click.stop=" isShow = !isShow">
            <p v-if="selectedData.length == 0" 
                class="group-placeholder">请选择商品分组</p>
            <em class="down" :class="{'is-reverse':isShow}"></em>
            <span class="item" v-for=" (item,i) in selectedData" :key="i">
                <em>{{item.groupName}}</em>
                <i class="el-icon-circle-close"  @click.self="deleteData(item.groupId)"></i>
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
                @click="selectedItem(item)"
                @mouseenter="listHover(item)">
                <span>{{item.groupName}}</span>
                <i class="el-icon-arrow-right" v-if="item.isChild>0"></i>
            </li>
        </ul>
        <ul class="option2" v-if="isSelect">
            <li v-for="(test,i) in towData"
                :key="i"
                @click="selectedItem(test)">
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
            Width:'200px',
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
    },
    methods:{
        /** 
         * 一级选择
         */
        selectedItem(data){
            let _this = this;
             let _add = true;//重复排除条件
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
            if(data.isChild){
                //有子集
                data.childGroupList.forEach((item,i) => {
                    //if(_this.deleteData(item.id)){
                        let newData = {
                        // groupName: data.groupName+'/'+item.groupName,
                            groupName: item.groupName,
                            groupPId: item.groupPId,
                            groupId: item.id,
                            shopId: item.shopId,
                        }
                        this.selectedData.push(newData);
                    //}
                });
                
            }else{
                //无子集
                //if(_this.deleteData(data.id)){
                    let newData = {
                        groupName: data.groupName,
                        groupPId: 0,
                        groupId: data.id,
                        shopId: data.shopId,
                    }
                    this.selectedData.push(newData);
                //}
            }
            this.isShow = false;
            this.isSelect = false;
        },
        /**
         * hover显示
         */
        listHover(data){
            let _this = this;
            if(data.isChild == 1 ){
                this.towData = data.childGroupList;
                this.isSelect = true;
            }
        },
        /** 
         * 删除
         * @param id  删除的id
         */
        deleteData(id){
            //let add = true;//不重复
            let _this = this;
            _this.selectedData.forEach((item,i)=>{
                if(id == item.groupId){
                    _this.selectedData.splice(i, 1);
                   // add = false;//重复
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
    },
    mounted() {
        let _this = this;
        if(_this.value != '0'){
            _this.initialValue(_this.value);
        }
        _this.groupListAjax({
            'success'(data) {
                _this.oneData = data.data.groupList;
            }
        })
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
    .group-selected{
        width: 100%;
        min-height: 35px;
        border: 1px solid #bfcbd9;
        .border-radius(5px);
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
    .down{
        position: absolute;
        top:45%;
        margin-top: -3px; 
        right:5%;
        content:'';
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #bfcbd9;
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
        width: 100%;
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
        left: 200px;
    }
}
</style>
