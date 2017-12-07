<template>
  <div class="group-box" :style="{width:Width}">
    <div class="group-selected">
        <span class="item">
            <em>aaa</em>
            <i class="el-icon-circle-close"></i>
        </span>
        <span class="item">
            <em>aaa</em>
            <i class="el-icon-circle-close"></i>
        </span>
    </div>
    <div class="grouping-option">
        <ul class="option1">
            <li v-for="(item,index) in Data"
                :key="item.index" 
                class="shop-box-justify"
                @click="selectoData1(item)">
                <span>{{item.groupName}}</span>
                <i class="el-icon-arrow-right" v-if="item.isChild>0" ></i>
            </li>
        </ul>
        <ul class="option2">
            <li v-for="(test,i) in groupList"
                :key="i" class="selectoData1">
                <span>{{test.groupName}}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props:{
        row:{
            type: Array,
            
        },
        width:{
            type: String,
        }
    },
    data: function () {
        return {
            Data:[],
            Width:'200px'
        }
    },
    watch:{
        'row'(a,b){
            this.Data = this.a;
            console.log(a,'联动数据aaa')
        },
        'Width'(a,b){
            this.Width = a;
            console.log(a,'Width')
        }
    },
    methods:{
        /** 
         * 一级选择
         */
        selectoData1(){

        }
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
@import '../../../../assets/css/mixins.less';
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
            padding: 4px 8px;
            margin: 3px 0 3px 6px;
            .border-radius(5px);
            color:#878d99;
            i{
                color: #b4bccc;
            }
        }
        
    }
}
.grouping-option{
    height: 1;
    position: relative;
    z-index: 9;
    padding-top:5px; 
    .option1,.option2{
        position: absolute;
        top: 0;
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
