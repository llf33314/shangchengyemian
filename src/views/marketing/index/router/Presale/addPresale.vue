<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/presale/1' }">预售管理</el-breadcrumb-item>
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
                  <el-date-picker v-model="item.startTime" type="datetimerange" placeholder="选择日期范围" 
                      :picker-options="pickerOptions" @change="checkTime(index)">
                  </el-date-picker>
                  <el-radio-group v-model="item.saleType" @change="countPrice(index)">
                      <el-radio :label="1">上涨</el-radio>
                      <el-radio :label="2">下调</el-radio>
                  </el-radio-group>
                  <el-select v-model="item.priceType" placeholder="选择调整方式" style="width:130px;margin-left:15px;" @change="countPrice(index)">
                      <el-option label="按百分比" :value="1"></el-option>
                      <el-option label="按价格" :value="2"></el-option>
                  </el-select>
                  <el-input  v-model="item.price" style="width: 130px; margin-left:15px" @blur="countPrice(index)">
                  </el-input> {{item.unit}}
                  <a class="fontBlue" style="margin-left:30px;cursor:pointer;" v-show="index == 0" @click="addPriceAdjustment()">新增</a>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="index == 0" @click="emptyPrice(index)">清空</a>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="ruleForm.timeList.length > 1 && index > 0"
                      @click="priceDel(index)">删除</a>
                  <p class="p-warn">商品价格从¥{{ruleForm.proPrice }}{{item.saleTypeName}}到{{item.raisePrice}}</p>
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
        timeList:[{
          startTime:'',
          saleType:1,
          priceType:1,
          price:'',
          raisePrice:0,//上涨 价格
          saleTypeName : '上涨',//价格上涨、下调文字说明
          unit:'%' //单位
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
      priceDel(index){//删除价格调整
        this.ruleForm.timeList.splice(index, 1);
      },
      emptyPrice(index){//清空第一行的价格调整数据
        this.ruleForm.timeList[index].startTime = "";
        this.ruleForm.timeList[index].price = '';
      },
      countPrice(index){//计算上涨价格
        let tl = this.ruleForm.timeList[index];
        if(tl.saleType == 1){//上涨
          if(tl.priceType == 1){//按百分比
            tl.raisePrice = (this.ruleForm.proPrice + (tl.price/100*this.ruleForm.proPrice)).toFixed(2);
            tl.unit = '%';
          }else{//按价格
            tl.raisePrice = this.ruleForm.proPrice + Number(tl.price);
            tl.unit = '元';
          }
          tl.saleTypeName = '上涨';
        }else{//下调
          if(tl.priceType == 1){//按百分比
            tl.raisePrice = (this.ruleForm.proPrice - (tl.price/100*this.ruleForm.proPrice)).toFixed(2);
            tl.unit = '%';
          }else{//按价格
            tl.raisePrice = (this.ruleForm.proPrice - Number(tl.price)).toFixed(2);
            tl.unit = '元';
          }
          tl.saleTypeName = '下调';
        }
        if((Number(tl.raisePrice) === this.ruleForm.proPrice) || Number(tl.raisePrice) < 0){
          tl.raisePrice = 0;
        }
      },
    selectDialogData(data){//选中活动商品事件
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.product_id = data.id;
      this.ruleForm.proPrice = data.pro_price;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      if(this.ruleForm.isSpecifica == 1){
        this.getSpecificaByProId(data.id);
      }
      for(var i = 0;i < this.ruleForm.timeList.length;i++){
          this.countPrice(i);//变化商品时，价格调整发生变化
      }
    },
    submitForm(formName) {//保存预售商品信息方法
      let _this = this;
      if(_this.$refs[formName].model.timeList != ''){
        let flag = checkTime();
        if(!flag){
          return 
        }
      }
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
          _this.ajaxRequest({
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
                _this.jumpRouter('/presale/1');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {//重置表单
      this.$refs[formName].resetFields();
    },
    showDialog(){//活动商品弹出框
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shop_id;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.product_id;
    },
    mallPresalePresaleInfo(id){//获取预售商品信息的方法
      let _this = this;
      _this.ajaxRequest({
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
             image_url : data.imgUrl + data.data.imageUrl,
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
    addPriceAdjustment(){//添加一行价格调整的新的空的数据
      let newPrice ={
          startTime:'',
          saleType:1,
          priceType:1,
          price:'',
          raisePrice:0,//上涨 价格
          saleTypeName : '上涨',//价格上涨、下调文字说明
          unit:'%' //单位
      }
      this.ruleForm.timeList.push(newPrice);
    },
    checkTime(index){//价格调整时间判断
        let _this = this;
        let presaleTime = _this.ruleForm.sale_start_time;//预售时间
        let sStartTime = Lib.M.format(new Date(presaleTime[0]));//活动生效开始时间
        let sEndTime = Lib.M.format(new Date(presaleTime[1]));//活动结束时间

        let delTimeList = new Array();
        var defaultObj = new Object();
        
        let presaleTimesArray = new Array();
        var flag = true;
        var msg = "";
        var start=new Date(sStartTime.replace("-", "/").replace("-", "/"));  
        var ends=new Date(sEndTime.replace("-", "/").replace("-", "/")); 
        $.each(_this.ruleForm.timeList,function(i){
          let priceTime = this.startTime;//价格调整选择的时间
          let startTime = Lib.M.format(priceTime[0]);
          let endTime = Lib.M.format(priceTime[1]);
          var types = this.saleType;//选择上涨还是下调
          var startDate = new Date(startTime.replace("-", "/").replace("-", "/"));  
          var endDate = new Date(endTime.replace("-", "/").replace("-", "/")); 
          var id = this.id;
          var priceType = this.priceType;//价格类型（百分比、价格）
            
          var price = this.price;//调整比例
          //var _obj = $(this);
            
          var isNull = false;
          
          if(startTime == null || startTime == ""){
            isNull = true;
          }else if(endTime == null || endTime == ""){
            isNull = true;
          }else if(startDate*1 >= endDate*1 && !isNull){
            flag = false;
            msg = "价格调整活动开始时间必须要早于活动结束时间";
            _this.ruleForm.timeList[i].startTime = '';
          }else if(endDate*1 > ends*1 && !isNull){
            flag = false;
            msg = "价格调整结束时间不能晚于预售活动结束时间";
            _this.ruleForm.timeList[i].startTime = '';
          }else{
            if(!isNull){
              //判断价格是否重复
              $.each(_this.ruleForm.timeList,function(j){
                if(j < i){
                  let t = this.startTime;
                  var startTime2 = Lib.M.format(t[0]);
                  var endTime2 = Lib.M.format(t[1]);
                  startTime2 = startTime2.substr(0,10);
                  endTime2 = endTime2.substr(0,10);

                  var startDate2=new Date(startTime2.replace("-", "/").replace("-", "/"));  
                  var endDate2=new Date(endTime2.replace("-", "/").replace("-", "/"));

                    if(endDate*1 < startDate2*1 || endDate*1 <  endDate2*1 ){
                      flag = false;
                    }
                    if(!flag){
                      msg = "价格调整的时间不能存在重叠";
                      _this.ruleForm.timeList[j].startTime = '';
                      return false;
                    }
                }
              });
            }
          }
          //判断定金是否小于向下调整金额
          let minPrice = _this.ruleForm.proPrice;
          if(minPrice > 0  && !isNull){
            var pPrice = this.price;
            
            let minPriceVal = _this.jisuanDepositPrice(pPrice,this.priceType,types,minPrice);
            var depositPercent = _this.ruleForm.deposit_percent;//交纳的定金
            //console.log(minPriceVal+"----"+depositPercent)
            if(minPriceVal <= 0){
              msg = "您调整的价格不能小于0，请重新输入要调整的价格";
              _this.ruleForm.timeList[i].startTime = '';
              flag = false;
            }else if(minPriceVal <= depositPercent*1){
              msg = "定金价格不能大于等于商品最终价格";
              _this.ruleForm.timeList[i].startTime = '';
              flag = false;
            }
          }
          if(!flag){
            return false;
          }else if(!isNull){
            var obj = {
              startTime : startTime,
              endTime : endTime,
              saleType : types,
              price : price,
              priceType : priceType
            };
            if (id == null || $.trim(id) == "") {
              presaleTimesArray[presaleTimesArray.length] = obj;
            } else {
              //delete defaultObj[id];
              obj.id = id;
              delTimeList[delTimeList.length] = obj;
            }
          }
        });
        if (defaultObj != null) {
          for ( var str in defaultObj) {
            var obj = new Object();
            obj.id = str;
            obj.isDelete = 1;
            delTimeList[delTimeList.length] = obj;
          }
        }
        _this.$message.error(msg);
        return flag;
    },
    jisuanDepositPrice(pPrice,obj,types,proPrice){//计算上涨下调价格
      proPrice = proPrice*1;
      var val = pPrice*1;
      var priceTypes = obj;
      if(types == 1){
        if(priceTypes == 1){//按百分比计算
          val = proPrice+(proPrice*(val/100));
        }else{//按价格
          val = proPrice+val;
        }
      }else{
        if(priceTypes == 1){//按百分比计算
          val = proPrice-(proPrice*(val/100));
        }else{//按价格
          val = proPrice-val;
        }
      }
      val = Math.round(val*100)/100;
    //	console.log("++++++++++++"+val)
      
      return val;
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


