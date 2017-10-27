<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/presale' }">预售管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建预售</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop_id" required>
                <el-select v-model="ruleForm.shop_id" v-bind:disabled="disabledShop" placeholder="请选择店铺" class="addBond-input">
                    <el-option :label="option.sto_name" :value="option.id"
                      :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="region" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="商品价格 :">
               <span>¥{{ruleForm.proPrice }}</span>
            </el-form-item>
            <el-form-item v-if="ruleForm.isSpecifica == 1">
              <div class="data-container" style="width: 100%">
                <el-table ref="multipleTable" :data="specArrList" style="width: 100%">
                  <el-table-column v-for="item in table" :prop="item.prop" :label="item.label"
                     min-width="170" align="center" :key="item.prop">
                    <template scope="scope">
                      <div v-for="data in scope.row.specList" :key="data.id">
                        <span v-if="item.label == data.specificaName">{{data.specificaValue}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="invPrice" label="规格价（元）" min-width="170" align="center">
                  </el-table-column>
                  <el-table-column prop="invNum" label="库存" min-width="150" align="center">
                  </el-table-column>
                </el-table>
                </div>
            </el-form-item>
            <el-form-item label="交纳定金 :" prop="deposit_percent" required> 
                 <el-input  v-model="ruleForm.deposit_percent" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="预售时间 :" prop="sale_start_time" required>
                <el-date-picker v-model="ruleForm.sale_start_time" type="datetimerange"
                    placeholder="选择日期范围" :picker-options="pickerOptions">
                </el-date-picker>
                 <p class="p-warn">在预售开始时间前，为交纳定金的时间，在活动开始之后为支付尾款时间</p>
            </el-form-item>
            <el-form-item label="价格调整 :" >
                <div v-for="(item,index) in ruleForm.timeList" :key="item.id" :value="item.id">
                  <el-date-picker v-model="item.startTime" type="datetimerange" placeholder="选择日期范围" :picker-options="pickerOptions">
                  </el-date-picker>
                  <el-radio-group v-model="item.saleType">
                      <el-radio :label="1">上涨</el-radio>
                      <el-radio :label="2">下调</el-radio>
                  </el-radio-group>
                  <el-select v-model="item.priceType" placeholder="选择调整方式" style="width: 130px; margin-left: 15px;">
                      <el-option label="按百分比" :value="1"></el-option>
                      <el-option label="按价格" :value="2"></el-option>
                  </el-select>
                  <el-input  v-model="item.price" style="width: 130px; margin-left:  15px">
                  </el-input> %
                  <a class="fontBlue" style="margin-left:30px;cursor:pointer;" v-show="index == 0" @click="addPriceAdjustment()">新增</a>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="index == 0">清空</a>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="ruleForm.timeList.length > 1 && index > 0">删除</a>
                  <p class="p-warn">商品价格从¥{{ruleForm.proPrice }}上涨到0.00</p>
                </div>
            </el-form-item>
            <el-form-item label="订货数量 :" >
                <el-input  v-model="ruleForm.order_num" placeholder="请输入订货数量" class="max-input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
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
    var formDepositPercent = (rule, value, callback) => {
      if(value > this.ruleForm.proPrice || value < 0){
        return callback(new Error('交纳定金必须大于0并且要小于商品的价格'));
      }else if(value == ''){
        callback(new Error('交纳定金不能为空'));
      }else {
        callback();
      }
    };
    var formShopId = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择店铺'));
      } else{
        callback();
      } 
    };
    var formRegion = (rule, value, callback) => {
      console.log(value,'value');
      console.log(this.boxData.id,'this.boxData');
      if (this.boxData.id === undefined || this.boxData.id === '') {
        return callback(new Error('请选择活动商品'));
      } else{
        callback();
      }
    };
    var formSaleStartTime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择预售时间'));
      } else{
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      ruleForm: {
         shop_id:'',
         sale_start_time: '',
         deposit_percent: '',
         region:'',
         proPrice:0.00,
         product_id: '',
        // type: [],
        // resource: '',
        // desc: '',
        timeList:[{
          startTime:'',
          saleType:1,
          priceType:1,
          price:'',
        }],
        off:false
      },
      rules: {
        deposit_percent:[
          { validator: formDepositPercent, trigger: 'blur' },
        ],
        shop_id: [
          { validator: formShopId, trigger: 'change' },
        ],
        region: [
          {  validator: formRegion, trigger: 'change' }
        ],
        sale_start_time: [
          { validator: formSaleStartTime, trigger: 'change' }
        ]
      },
      isChoicePro:'',
      isReplacePro:'',
      boxData:{},
      shopList:[],
      table: [],
      specArrList:[],
      disabledShop:'',
    };
  },
  methods: {
    selectDialogData(data){
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.product_id = data.id;
      this.ruleForm.proPrice = data.pro_price;
      this.boxData = data;
      if(this.ruleForm.isSpecifica == 1){
        this.getSpecificaByProId(data.id);
      }
    },
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let time = _this.$refs[formName].model.sale_start_time;
          let presale = {};
          presale.saleStartTime = Lib.M.format(new Date(time[0]));
          presale.saleEndTime = Lib.M.format(new Date(time[1]));
          presale.productId = _this.$refs[formName].model.product_id;
          presale.shopId = _this.$refs[formName].model.shop_id;
          presale.depositPercent = _this.$refs[formName].model.deposit_percent;
          presale.orderNum = _this.$refs[formName].model.order_num;
          presale.isDeposit = 1;
          if(_this.$refs[formName].model.id != ''){
            presale.id = _this.$refs[formName].model.id;
          }

          let presaleTimes = [];
          for (let i in _this.$refs[formName].model.timeList){
        　　var t = _this.$refs[formName].model.timeList[i].startTime;
            _this.$refs[formName].model.timeList[i].startTime = Lib.M.format(new Date(t[0]));
            _this.$refs[formName].model.timeList[i].endTime = Lib.M.format(new Date(t[1]));
            presaleTimes.push(_this.$refs[formName].model.timeList[i]);
      　　}
          console.log(presale,'presale');
          console.log(presaleTimes,'presaleTimes');
          Lib.M.ajax({
            'url': DFshop.activeAPI.mallPresaleSave_post,
            'data': {
                presale: presale,
                presaleTimes:JSON.stringify(presaleTimes)
            },
            'success':function (data){
                _this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                _this.jumpRouter('/presale');
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
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shop_id;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.product_id;
    },
    mallPresalePresaleInfo(id){
      let _this = this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallPresalePresaleInfo_post,
        'data':{
            id : id
        },
        'success':function (data){
           _this.ruleForm = data.data;
           _this.ruleForm.sale_start_time = [data.data.sale_start_time,data.data.sale_end_time];
           for(var i = 0;i < data.data.timeList.length;i++){
             _this.ruleForm.timeList[i].startTime = [data.data.timeList[i].startTime,data.data.timeList[i].endTime];
           }
            _this.boxData={
             id : data.data.product_id,
             pro_price : data.data.proPrice,
             pro_name : data.data.proName,
             image_url : data.data.imageUrl,
             stockTotal : data.data.proStockTotal
           }
           _this.getSpecificaByProId(data.data.product_id);
        }
      });
    },
    getSpecificaByProId(proId){//根据商品id查询规格
      let _this = this;
      DFshop.method.mallGetSpecificaByProId({
        'proId': proId,
        'success'(data){
          _this.specArrList = data.data.list;
          if(_this.table.length > 0){
            _this.table = [];
          }
          for(var m = 0;m< _this.specArrList[0].specList.length;m++){
            let t = { prop: 'specificaValue', label: _this.specArrList[0].specList[m].specificaName };
            _this.table.push(t);
          }
        }
      });
    },
    addPriceAdjustment(){
      let newPrice ={
          startTime:'',
          saleType:1,
          priceType:1,
          price:'',
      }
      this.ruleForm.timeList.push(newPrice);
    }
  },
  mounted(){
    let _this = this;
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
        //console.log(_this.shopList,'shopList')
      }
    });
    if(_this.$route.params.id != 0){
      _this.mallPresalePresaleInfo(_this.$route.params.id);
      _this.isReplacePro = true;
      _this.disabledShop = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
.addBond-main{
    padding:40px 4%;
    .addBond-input{
        width: 220px
    }
}
</style>


