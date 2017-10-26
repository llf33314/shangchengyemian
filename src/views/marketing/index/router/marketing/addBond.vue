<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/marketing/2' }">超级销售员</el-breadcrumb-item>
            <el-breadcrumb-item >新建商品佣金</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop_id" required>
                <el-select v-model="ruleForm.shop_id" placeholder="请选择店铺" class="addBond-input" v-bind:disabled="disabledShop">
                    <el-option :label="item.sto_name" :value="item.id" :key="item.id"  v-for="item in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="region" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" v-if="isReplacePro" @click="showDialog">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="佣金类型：" prop="commission_type" required>
                 <el-select v-model="ruleForm.commission_type" placeholder="请选择佣金类型" class="addBond-input">
                    <el-option label="按百分比" :value="1"></el-option>
                    <el-option label="按固定金额" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品佣金：" prop="commission_rate" required>
                <span v-if="ruleForm.commission_type !== 2">
                    <el-input v-model="ruleForm.commission_rate " class="addBond-input"></el-input>%
                </span>
                 <el-input v-model="ruleForm.commission_rate " class="addBond-input" v-if="ruleForm.commission_type ==2">
                     <template slot="prepend">¥</template>
                 </el-input>
                 <p class="p-warn">根据微信规则，佣金比例最高不可超过70%</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="returnPage()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <goods-dialog ref="goodsDialog" @dialogData="selectDialogData"></goods-dialog>
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
    var formRegion = (rule, value, callback) => {
      console.log(this.boxData.id,'this.boxData');
      if (this.boxData.id === undefined || this.boxData.id === '') {
        return callback(new Error('请选择活动商品'));
      } else{
        callback();
      }
    };
    var formShopId = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择所属店铺'));
      } else{
        callback();
      }
    };
    var formCommissionType = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择佣金类型'));
      } else{
        callback();
      }
    };
    var formCommissionRate = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('商品佣金不能为空'));
      } else{
        callback();
      }
    };
    return {
      ruleForm: {
        shop_id:'',
        commission_type: '',
        region: '',
        commission_rate: '',//商品佣金
        product_id:'',
      },
      rules: {
        shop_id:[
          { validator : formShopId, trigger: 'change' },
        ],
        commission_type: [
          { validator : formCommissionType, trigger: 'change' },
        ],
        region: [
          { validator : formRegion, trigger: 'change' }
        ],
        commission_rate: [
          { validator : formCommissionRate, trigger: 'blur' }
        ]
      },
      shopList:[],
      boxData:{},
      isChoicePro:'',
      isReplacePro:'',
      disabledShop:'',
    };
  },
  methods: {
    selectDialogData(data){
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.product_id = data.id;
      this.boxData = data;
    },
    submitForm(formName) {
      let _this= this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let fname = _this.$refs[formName].model;
          let joinProduct = {};
          joinProduct.shopId = fname.shop_id;
          joinProduct.productId = fname.product_id;
          joinProduct.commissionRate = fname.commission_rate;
          joinProduct.commissionType = fname.commission_type;
          if(fname.id != ''){
            joinProduct.id = fname.id;
          }
          Lib.M.ajax({
            'url': DFshop.activeAPI.mallSellerSaveJoinProduct_post,
            'data':{
              joinProduct : joinProduct 
            },
            'success':function (data){
                _this.$message({
                  message: '保存成功',
                  type: 'success'
              });
              _this.jumpRouter('/marketing/2');
            }
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    returnPage(){
      window.history.go(-1);
    },
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
    },
    mallSellersJoinProductInfo(id){
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersJoinProductInfo_post,
        'data':{
          id : id 
        },
        'success':function (data){
           _this.ruleForm = data.data;
           console.log(_this.ruleForm,'table');
           _this.boxData={
             id : data.data.product_id,
             pro_price : data.data.proPrice,
             pro_name : data.data.proName,
             image_url : data.data.imageUrl,
             stockTotal : data.data.proStockTotal
           }
        }
      });
    }
  },
  mounted(){
    let _this = this;
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });
    
    if(_this.$route.params.id != 0){
      _this.disabledShop = true;
      _this.mallSellersJoinProductInfo(_this.$route.params.id);
      _this.isReplacePro = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../../../assets/css/mixins.less';
.addBond-main{
    padding:40px 4%;
    .addBond-input{
        width: 220px
    }
}
</style>


