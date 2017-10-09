<template>
  <div class="table-spec">
        <div class="table-spec-box" v-if="add_num>0" v-for="(selected,index) in fromSelecteds">
            <div class="table-spec-title">
                <div class="table-inline">
                    <el-select
                        v-model="selected.spec"
                        filterable
                        allow-create
                        placeholder="关键词">
                        <el-option
                        v-for="item in tableData.spec.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="el-icon-circle-close"
                        @click="removeFrom(index)"></i>
                </div>
                <div class="table-inline" v-if="index === 0">
                    <el-checkbox v-model="checked1" @change="addImg">添加规格图片</el-checkbox>
                </div>
            </div>
            <div class="table-spec-option">
                <div class="table-inline" v-for=" (option,index) in options">
                    <div class="item-selected">
                        {{option.name}}
                        <i @click="remove(index)" class="el-icon-circle-close"></i>
                    </div>
                    <div class="table-img" v-if="isImg">
                        <imgUpload></imgUpload>
                    </div>
                </div>
                <div class="table-inline fontBlue table-spec-add"
                     style="padding-left:15px;">
                    <span @click="showAddoption($event)">+添加</span>
                    <div class="table-spec-add-option">
                        {{value10}}
                        <el-select
                            v-model="value10"
                            multiple
                            filterable
                            allow-create
                            @change="aaaa(value10)">
                            <el-option
                                v-for="item in options5"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="addoptions(value10)">确定</el-button>
                        <el-button @click="callOff($event)">取消</el-button>
                    </div>
                </div>
                <p v-if="isImg">目前只支持为第一个规格设置不同的规格图片 设置后，用户选择不同规格会显示不同图片 建议尺寸：640 x 640像素</p>
            </div>
        </div>
        <div class="table-spec-button"  v-if=" add_num<3">
            <el-button @click="addspec">添加项目规格</el-button>
        </div>
    </div>
</template>
<script>
import imgUpload from 'components/imgUpload'
export default {
    props:['tableData'],
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
            fromSelecteds:[],
            checked1:'',
            options5:[{
                name:'尺寸',
                value: 1
            },{
                name:'款式',
                value: 2
            },{
                name:'颜色',
                value: 3
            },{
                name:'款式',
                value: 4
            }],
            options:[],
            value10:'',
            add_num:0,
            isImg:false,
        }
    },
    mounted() {
    //console.log($("template").html());
    },
    methods: {
        addspec(){
            this.fromSelecteds.push(this.fromSelected);
            var _count =  this.$store.state.user_name
            this.add_num++;
            console.log(this.add_num);
        },
        addoptions(data){
            this.options.push(data);
            $(".table-spec-add-option").hide();
            console.log(this.options);
            console.log(data);
        },
        removeFrom: function (index) {
            this.fromSelecteds.splice(index, 1);
            this.add_num--;
        },
        remove: function (index) {
            this.options.splice(index, 1);
        },
        addImg(){
            this.isImg = this.isImg ? false : true;
        },
        showAddoption(e){
            $(e.target).siblings(".table-spec-add-option").show();
        },
        callOff(e){
            $(e.target).parents(".table-spec-add-option").hide();
        },
        aaaa(item){
            console.log(item);
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
        display: none;
        position: absolute;
        left: -20%;
        top: 100%;
        z-index: 1;
        width: 310px;
        background: #fff;
        .box-shadow(0,0,20px,0,0.15);
        padding: 10px;
        .border-radius(5px);
        .el-select{
            width: 150px;
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