<template>
<div class="addGruop-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/group' }">团购管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建团购</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addGruop-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId">
                <el-select v-model="ruleForm.shopId" placeholder="请选择店铺" class="addGruop-input">
                    <el-option :label="option.sto_name" :value="option.id" :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="region">
                <el-button type="primary" @click="showDialog">选择商品</el-button>
                <goods-box></goods-box>
                <el-button type="primary" @click="showDialog">替换商品</el-button>
                <p class="p-warn">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="gName">
                <el-input v-model="ruleForm.gName" class="addGruop-input"></el-input>
                <p class="p-warn">最多可输入50位汉字或100位字符</p>
            </el-form-item>
            <el-form-item label="团购价 :" prop="gPrice">
                 <el-input v-model="ruleForm.gPrice " class="addGruop-input">
                     <template slot="prepend">¥</template>
                 </el-input>
                 <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="开始时间 :" prop="gStartTime">
                <el-date-picker v-model="ruleForm.gStartTime" type="datetime"
                    placeholder="选择开始时间" :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间 :" prop="gEndTime">
                <el-date-picker v-model="ruleForm.gEndTime" type="datetime"
                    placeholder="选择结束时间" :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="参团人数 :" prop="gPeopleNum">
                <el-input  v-model="ruleForm.gPeopleNum" class="addGruop-input"></el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="商品限购 :">
                <el-switch on-text="开启" off-text="关闭" v-model="off"></el-switch>
            </el-form-item>
            <el-form-item label="限购规则 :" prop="gMaxBuyNum" v-if="off">
                <el-input v-model="ruleForm.gMaxBuyNum" class="addGruop-input"></el-input>
                <span>件/人</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <goods-dialog ref="goodsDialog"></goods-dialog>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import goodsBox from '../../components/goodsBox';
import goodsDialog from '../../components/goodsDialog';
export default {
  components:{
    goodsBox,goodsDialog
  },
  data() {
    return {
      pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
      },
      ruleForm: {
        shopId:'',
        gName: '',
        region: '',
        gStartTime:'',
        gEndTime:'',
        gPrice: '',
        type: [],
        gPeopleNum: 0,
        gMaxBuyNum:0
      },
      off:false,
      rules: {
        shopId:[
          { required: true, message: '所属店铺不能为空', trigger: 'blur' },
        ],
        gName: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '活动商品不能为空', trigger: 'change' }
        ],
        gStartTime: [
          { type: 'date', required: true, message: '开始时间不能为空', trigger: 'change' }
        ],
        gEndTime: [
          { type: 'date', required: true, message: '结束时间不能为空', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '活动名称不能为空', trigger: 'change' }
        ],
        gPeopleNum: [
          { required: true, message: '参团人数不能为空', trigger: 'blur' }
        ],
        gPrice: [
          { required: true, message: '团购价不能为空', trigger: 'blur' }
        ]
      },
      shopList:[],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.id;
    },
    mallGroupBuyInfo(id){
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallGroupBuyInfo_post,
        'data':{
          id : id 
        },
        'success':function (data){
           _this.ruleForm = data.data;
           if(data.data.gMaxBuyNum === 0){
             _this.off = false;
           }else{
             _this.off = true;
           }
           console.log(_this.off)
        }
      });
    }
  },
  mounted(){
    let _this = this;
    if(_this.$route.params.id != 0){
      _this.mallGroupBuyInfo(_this.$route.params.id);
    }
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });
  }
}
</script>


<style lang="less" scoped>
@import '../../../../../assets/css/mixins.less';
.addGruop-main{
    padding:40px 4%;
    .addGruop-input{
        width: 220px
    }
}
</style>


