<template>
<div class="auction-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/auction/1' }">拍卖管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建拍卖活动</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="auction-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId">
                <el-select v-model="ruleForm.shopId" placeholder="请选择活动区域" v-bind:disabled="disabledShop" class="auction-input">
                    <el-option  :label="option.sto_name"  :value="option.id"
                      :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="name">
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="拍卖类型 :" prop="aucType">
                <el-radio-group v-model="ruleForm.aucType">
                    <el-radio :label="1">降价拍</el-radio>
                    <el-radio :label="2">升价拍</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要交纳保证金 :" >
                <el-checkbox v-model="ruleForm.isMargin">拍卖前需要交纳保证金</el-checkbox>
            </el-form-item>
            <el-form-item label="交纳保证金 :" prop="aucMargin" v-if="ruleForm.isMargin">
                <el-input  v-model="ruleForm.aucMargin" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="起拍价格 :" prop="aucStartPrice">
                <el-input  v-model="ruleForm.aucStartPrice" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="活动时间 :" prop="aucStartTime">
                 <el-date-picker
                    v-model="ruleForm.aucStartTime"
                    type="datetimerange"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最低价格 :" prop="aucLowestPrice" v-if="ruleForm.aucType == 1">
                <el-input  v-model="ruleForm.aucLowestPrice" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="加价幅度 :" prop="aucAddPrice" v-if="ruleForm.aucType == 2">
                <el-input  v-model="ruleForm.aucAddPrice" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
             <el-form-item label="降价幅度 :" prop="aucAddPrice" v-if="ruleForm.aucType == 1">
                每 <el-input  v-model="ruleForm.aucAddPrice" class="mix-input"></el-input>
                分钟下降 <el-input  v-model="ruleForm.aucAddPrice" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="持续时间 :" v-if="ruleForm.aucType == 1">
                50分钟 <el-button type="primary">计算持续时间</el-button>
                <p class="p-warn">下降到结束价格后还会持续一个时间周期</p>
            </el-form-item>
            <el-form-item label="结束时间 :" v-if="ruleForm.aucType == 1">
                <p >预计 <span>2017-12-30 11:30:00</span>结束</p>
            </el-form-item>
             <el-form-item label="商品限购 :" v-if="ruleForm.aucType == 1">
                开始限购 <el-input  v-model="ruleForm.aucRestrictionNum" class="max-input"></el-input> 件/人
                <p class="p-warn">不填写则代表该拍卖商品不限购</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="returnPage">取消</el-button>
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
    return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      ruleForm: {
        shopId:'',
        aucMargin:'',
        aucType: '',
        aucLowestPrice:'',
        isMargin:false,
        aucStartTime : '',

        isSpecifica : '',

      },
      rules: {
        // shop:[
        //   { required: true, message: '所属店铺不能为空', trigger: 'change' },
        // ],
        // name: [
        //   { required: true, message: '活动商品不能为空', trigger: 'blur' },
        // ],
        // auctiontype: [
        //   { required: true, message: '拍卖类型不能为空', trigger: 'change' }
        // ],
        // date: [
        //   { type: 'date', required: true, message: '开始时间不能为空', trigger: 'change' }
        // ],
        // money: [
        //   { required: true, message: '交纳保证金不能为空', trigger: 'blur' }
        // ],
        // desc: [
        //   { required: true, message: '起拍价不能为空', trigger: 'blur' }
        // ],
        // floorMoney: [
        //   { required: true, message: '最低价格不能为空', trigger: 'blur' }
        // ],
        // range: [
        //   { required: true, message: '降价不能为空', trigger: 'blur' }
        // ]
      },
      shopList:[],

      isChoicePro : '',
      isReplacePro : '',
      boxData : [],
      disabledShop : '',
    };
  },
  methods: {
      selectDialogData(data){//活动商品列表弹出框
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.productId = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
    },
    submitForm(formName) {//保存拍卖信息
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let time = _this.$refs[formName].model.aucStartTime;
          let auction = _this.$refs[formName].model;
          auction.aucStartTime = Lib.M.format(new Date(time[0]));
          auction.aucEndTime = Lib.M.format(new Date(time[1]));
          auction.isMargin = Number(_this.$refs[formName].model.isMargin);
          if(_this.$refs[formName].model.aucType == 2){
              auction.aucLowestPrice = 0;
              auction.aucLowerPriceTime = 0;
              auction.aucLowerPrice = 0;
          }
          Lib.M.ajax({
            'url': DFshop.activeAPI.mallAuctionSave_post,
            'data':{
                auction : auction
            },
            'success':function (data){
                if(data.code == 1){
                    _this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    _this.jumpRouter('/auction/1');
                }
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
    returnPage(){//返回上一页
        window.history.go(-1);
    },
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.productId;
    },
    mallAuctionAuctionInfo(id){//获取拍卖信息
        let _this = this;
        Lib.M.ajax({
        'url': DFshop.activeAPI.mallAuctionAuctionInfo_post,
        'data':{
            id : id
        },
        'success':function (data){
            if(data.code == 1){
                _this.ruleForm = data.data;
                _this.ruleForm.isMargin = !!data.data.isMargin;
                _this.ruleForm.aucStartTime = [data.data.aucStartTime,data.data.aucEndTime];
                _this.boxData={
                    id : data.data.productId,
                    pro_price : data.data.proPrice,
                    pro_name : data.data.proName,
                    image_url : data.imgUrl + data.data.imageUrl,
                    stockTotal : data.data.proStockTotal
                }
                console.log(_this.ruleForm,'_this.ruleForm ');
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
      _this.mallAuctionAuctionInfo(_this.$route.params.id);
      _this.disabledShop = true;
       _this.isReplacePro = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
.auction-main{
    padding:40px 4%;
    .auction-input{
        width: 220px
    }
}
</style>


