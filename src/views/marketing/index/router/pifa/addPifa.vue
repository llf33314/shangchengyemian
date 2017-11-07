<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/pifa/1' }">批发管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建批发</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop_id" required>
                <el-select v-model="ruleForm.shop_id" placeholder="请选择店铺" v-bind:disabled="disabledShop" class="addBond-input">
                    <el-option :label="item.sto_name" :value="item.id"
                      :key="item.id" v-for="item in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="choicePro" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="批发类型 :" required>
               <el-radio-group v-model="ruleForm.pf_type">
                    <el-radio :label="1">手批</el-radio>
                    <el-radio :label="2">混批</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="批发价 :" prop="pf_price" required>
                 <el-input  v-model="ruleForm.pf_price" class="max-input" v-if="ruleForm.isSpecifica == 0" :maxlength="8">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn" v-if="ruleForm.isSpecifica == 0">0/8</p>

                <div class="data-container" style="width: 100%" v-if="ruleForm.isSpecifica == 1">
                <el-table ref="multipleTable" :data="specArrList" style="width: 100%">
                  <el-table-column v-for="item in table" :prop="item.prop" :label="item.label"
                     min-width="170" align="center" :key="item.prop">
                    <template scope="scope">
                      <div v-for="data in scope.row.specList" :key="data.id">
                        <span v-if="item.label == data.specificaName">{{data.specificaValue}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="invPrice" label="原价（元）" min-width="170" align="center">
                  </el-table-column>
                  <el-table-column label="批发价（元）" min-width="170" align="center">
                    <template scope="scope">
                        <el-input v-model="scope.row.seckillPrice" class="addGruop-input" style="width:130px;" 
                          ><template slot="prepend">¥</template>
                        </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="invNum" label="库存" min-width="150" align="center">
                  </el-table-column>
                </el-table>
                </div>

            </el-form-item>
            <el-form-item label="活动时间 :" prop="pf_start_time" required>
                <el-date-picker v-model="ruleForm.pf_start_time" type="datetimerange"
                    placeholder="选择日期范围">
                </el-date-picker>
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
     var formShopId = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择店铺'));
      }else {
          callback();
      }
    };
    var formChoicePro = (rule, value, callback) => {
      if (this.boxData.id === undefined || this.boxData.id === '') {
        return callback(new Error('请选择活动商品'));
      } else{
        callback();
      }
    };
    var formPfPrice = (rule, value, callback) => {
      if(this.ruleForm.isSpecifica == 0){
        var reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
        if (value == '') {
          return callback(new Error('批发价不能为空'));
        } else if(!reg.test($.trim(value))){
          return callback(new Error('批发价最多只能是大于0的5位数'));
        } else{
          callback();
        }
      } else {
        callback();
      }
    };
    var formPfStartTime = (rule, value, callback) => {
      let time = Lib.M.format(new Date(value[0]));
      let time1 = Lib.M.format(new Date(value[1]));
      if (time == '' || time1 == '') {
        return callback(new Error('请选择活动时间'));
      } else{
        callback();
      }
    };
    return {
      ruleForm: {
        pf_type : 1,
        shop_id : '',
        pf_start_time : '',
        isSpecifica : 0,
        productId : '',
        pf_price : '',
      },
      rules: {
        shop_id:[
          { validator: formShopId, trigger: 'change' },
        ],
        choicePro: [
          { validator: formChoicePro, trigger: 'change' }
        ],
        pf_start_time: [
          { validator: formPfStartTime, trigger: 'change' }
        ],
        pf_price :[
          { validator: formPfPrice, trigger: 'blur' }
        ],
      },
      shopList:[],
      specArrList : [],

      table : [],
      isChoicePro : '',
      isReplacePro : '',
      boxData : [],
      disabledShop : '',

    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          let param = _this.$refs[formName].model;
          let pifa = {};
          let time = _this.$refs[formName].model.pf_start_time;
          pifa.productId = param.productId;
          pifa.pfType = param.pf_type;
          pifa.pfStartTime = Lib.M.format(new Date(time[0]));
          pifa.pfEndTime = Lib.M.format(new Date(time[1]));
          pifa.pfPrice = param.pf_price;
          pifa.shopId = param.shop_id;
          pifa.sNum = param.productId;
          if(param.id != ''){
            pifa.id = param.id;
          }

          let specArr = [];
          for(var k = 0;k < _this.specArrList.length;k++){
            let arr = {};
            if(_this.specArrList[k].priceId != ''){
              arr.id = _this.specArrList[k].priceId;
            }
            arr.seckillPrice = _this.specArrList[k].seckillPrice;
            arr.invenId = _this.specArrList[k].invenId;
            arr.specificaIds = _this.specArrList[k].specificaIds;
            specArr.push(arr);
          }

          Lib.M.ajax({
              'url': DFshop.activeAPI.mallWholesaleSave_post,
              'data':{
                pifa : pifa,
                specArr : JSON.stringify(specArr)
              },
              'success':function (data){
                if(data.code === 1){
                    _this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    _this.jumpRouter('/pifa/1');
                }
              }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    selectDialogData(data){//活动商品列表弹出框
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.productId = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      if(this.ruleForm.isSpecifica == 1){
        this.getSpecificaByProId(data.id);
      }
    },
    resetForm(formName) {//重置表单
      this.$refs[formName].resetFields();
    },
    returnPage(){//返回上一页
      window.history.go(-1);
    },
    showDialog(){//选择商品弹出框
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shop_id;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.productId;
    },
    mallWholesalePifaInfo(id){//获取批发信息
        let _this = this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesalePifaInfo_post,
            'data':{
               id : id
            },
            'success':function (data){
               if(data.code === 1){
                  _this.ruleForm = data.data;
                  _this.ruleForm.pf_start_time = [data.data.pf_start_time,data.data.pf_end_time];
                  console.log(_this.ruleForm,'_this.ruleForm')
                  _this.boxData={
                    id : data.data.productId,
                    pro_price : data.data.proPrice,
                    pro_name : data.data.proName,
                    image_url : data.imgUrl + data.data.imageUrl,
                    stockTotal : data.data.proStockTotal
                  }
                  _this.getSpecificaByProId(_this.ruleForm.productId);
               }
            }
        });
    },
    getSpecificaByProId(proId){//商品规格列表
      let _this = this;
      DFshop.method.mallGetSpecificaByProId({
        'proId': proId,
        'success'(data){
          _this.specificesList = data.data.list;
          if(_this.table.length > 0){
            _this.table = [];
          }
          for(var m = 0;m< _this.specificesList[0].specList.length;m++){
            let t = { prop: 'specificaValue', label: _this.specificesList[0].specList[m].specificaName };
            _this.table.push(t);
           //_this.$set().
          }
          if(_this.specArrList.length > 0){
            _this.specArrList = [];
          }
          for(var i = 0;i < _this.specificesList.length;i++){
            _this.specArrList.push(_this.specificesList[i]) ;
            if(_this.ruleForm.priceList.length == 0){
              _this.specArrList[i].seckillPrice = '';
              _this.specArrList[i].priceId = '';
            }else{
              for(var j = 0;j < _this.ruleForm.priceList.length;j++){
                if(_this.specArrList[i].id === _this.ruleForm.priceList[j].invenId){
                  _this.specArrList[i].seckillPrice = _this.ruleForm.priceList[j].seckillPrice;
                  _this.specArrList[i].priceId = _this.ruleForm.priceList[j].id;
                }
              }
            }
          }
          _this.specArrList.forEach(function(e,i){
            _this.setJoinGroup.push(e.isJoinGroup);
          });
        }
      });
    },
    // checkPifaPrice(index){//判断批发价
    //   var priceTest = /^[0-9]{1,6}(\.\d{1,2})?$/;
    //     if (!priceTest.test($.trim(this.specArrList[index].seckillPrice))) {
    //       this.$message({
    //         message: '价格最多只能是6位小数或整数',
    //         type: 'success'
    //       });
    //     }
    // }
  },
  mounted(){
    let _this = this;
    
    if(_this.$route.params.id != 0){
      _this.disabledShop = true;

      _this.mallWholesalePifaInfo(_this.$route.params.id);

      _this.isReplacePro = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
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
@import '../../../less/style.less';
.addBond-main{
    padding:40px 4%;
    .addBond-input{
        width: 220px
    }
}
</style>


