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
            <el-form-item label="所属店铺 :" prop="shopId" required>
                <el-select v-model="ruleForm.shopId" v-bind:disabled="disabledShop" placeholder="请选择店铺" class="addGruop-input">
                    <el-option :label="option.sto_name" :value="option.id" :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="region" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="gName" required>
                <el-input v-model="ruleForm.gName" class="addGruop-input"></el-input>
                <p class="p-warn">最多可输入50位汉字或100位字符</p>
            </el-form-item>
            <el-form-item label="团购价 :" prop="gPrice" required>
                <el-input v-model="ruleForm.gPrice " class="addGruop-input" v-if="ruleForm.isSpecifica == 0">
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
                  <el-table-column label="拼团价（元）" min-width="170" align="center">
                    <template scope="scope">
                        <el-input v-model="scope.row.groupPrice" class="addGruop-input" style="width:130px;">
                            <template slot="prepend">¥</template>
                        </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="invNum" label="库存" min-width="150" align="center">
                  </el-table-column>
                  <el-table-column label="参与团购" min-width="100" align="center">
                    <template scope="scope">
                      <el-checkbox v-model="setJoinGroup[scope.$index]"></el-checkbox><span>设为参团</span>
                    </template>
                  </el-table-column>
                </el-table>
                </div>
            </el-form-item>
            <el-form-item label="活动时间 :" prop="gStartTime" required>
                <el-date-picker v-model="ruleForm.gStartTime" type="datetimerange"
                    placeholder="选择时间" :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="参团人数 :" prop="gPeopleNum" required>
                <el-input  v-model="ruleForm.gPeopleNum" class="addGruop-input"></el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="商品限购 :">
                <el-switch on-text="开启" off-text="关闭" v-model="off"></el-switch>
            </el-form-item>
            <el-form-item label="限购规则 :" v-if="off" prop="gMaxBuyNum" required>
                <el-input v-model="ruleForm.gMaxBuyNum" class="addGruop-input"></el-input>
                <span>件/人</span>
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
    var formGroupPrice = (rule, value, callback) => {
      if (value == '' || value <= 0) {
        return callback(new Error('拼团价不能为空且不能小于0'));
      }else {
          callback();
      }
    };
    var formShopId = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择店铺'));
      }else {
          callback();
      }
    };
    var formGname = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('活动名称不能为空'));
      }else {
          callback();
      }
    };
    var formStartTime = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择活动时间'));
      }else {
          callback();
      }
    };
    var formPeopleNum = (rule, value, callback) => {
      if (value == '' || value <= 0) {
        return callback(new Error('参团人数不能为空且不能小于0'));
      }else {
          callback();
      }
    };
    var formPrice = (rule, value, callback) => {
      if (value == '' || value <= 0) {
        return callback(new Error('团购价不能为空且不能小于0'));
      }else {
          callback();
      }
    };
    var formMaxBuyNum = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择店铺'));
      }else {
          callback();
      }
    };
    return {
      setJoinGroup:[],
      table: [],
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
        gPeopleNum: 0,
        gMaxBuyNum:0,
        priceList:[],
        productId:'',
        isJoinGroup:'',
        isSpecifica:0,
      },
      off:false,
      proId:'',
      isChoicePro:'',
      isReplacePro:'',
      rules: {
        shopId:[
          {validator: formShopId, trigger: 'change' },
        ],
        gName: [
          {validator: formGname, trigger: 'blur' },
        ],
        gStartTime: [
          {validator: formStartTime, trigger: 'change' },
        ],
        gPeopleNum: [
          {validator: formPeopleNum, trigger: 'blur' },
        ],
        gPrice: [
          {validator: formPrice, trigger: 'blur' },
        ],
        gMaxBuyNum: [
          {validator: formMaxBuyNum, trigger: 'blur' },
        ]
      },
      shopList:[],
      boxData:{},
      specificesList:[],
      specArrList:[],
      disabledShop:''
    };
  },
  watch:{
    setJoinGroup(val,val2){
      var self = this;
      self.specArrList.forEach(function(e,i){
        self.$set(self.specArrList[i],'isJoinGroup',self.setJoinGroup[i])
      })
    }
  },
  methods: {
    selectDialogData(data){//选取商品传出的数据
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
    submitForm(formName) {//保存团购信息
      let _this= this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let groupBuy = {};
          groupBuy = _this.$refs[formName].model;
          let time = _this.$refs[formName].model.gStartTime;
          groupBuy.gStartTime = Lib.M.format(new Date(time[0]));
          groupBuy.gEndTime = Lib.M.format(new Date(time[1]));
          groupBuy.gName = encodeURI(_this.$refs[formName].model.gName);
          groupBuy.productId = _this.$refs[formName].model.productId;
          if(!_this.off){
            groupBuy.gMaxBuyNum = 0;
          }
          let _speciList = [];
          for(var k = 0;k < _this.specArrList.length;k++){
            let arr = {};
            if(_this.specArrList[k].priceId != ''){
              arr.id = _this.specArrList[k].priceId;
            }
            arr.groupPrice = _this.specArrList[k].groupPrice;
            arr.invenId = _this.specArrList[k].id;
            arr.specificaIds = _this.specArrList[k].specificaIds;
            arr.isJoinGroup = Number(_this.specArrList[k].isJoinGroup);
            _speciList.push(arr);
          }
          let param = {};
          param["groupBuy"] = groupBuy;
          param["specArr"] = JSON.stringify(_speciList);
          Lib.M.ajax({
            'url': DFshop.activeAPI.mallGroupBuySave_post,
            'data':param,
            'success':function (data){
              if(data.code == 1){
                _this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                _this.jumpRouter('/group');
              }
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
    returnPage(){//取消按钮（返回上一页）
      window.history.go(-1);
    },
    showDialog(){//活动商品列表弹出框
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId=this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.id;
    },
    mallGroupBuyInfo(id){//获取团购商品的信息
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallGroupBuyInfo_post,
        'data':{
          id : id 
        },
        'success':function (data){
           _this.ruleForm = data.data;
           _this.ruleForm.gStartTime = [data.data.gStartTime,data.data.gEndTime];
           console.log(_this.ruleForm,'table');
           if(data.data.gMaxBuyNum === 0){
             _this.off = false;
           }else{
             _this.off = true;
           }
           _this.boxData={
             id : data.data.productId,
             pro_price : data.data.proPrice,
             pro_name : data.data.proName,
             image_url : data.imgUrl + data.data.imageUrl,
             stockTotal : data.data.proStockTotal
           }
            _this.getSpecificaByProId(_this.ruleForm.productId);
        }
      });
    },
    getSpecificaByProId(proId){//根据商品id查询商品规格
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
              _this.specArrList[i].isJoinGroup = true;
              _this.specArrList[i].groupPrice = '';
              _this.specArrList[i].priceId = '';
            }else{
              for(var j = 0;j < _this.ruleForm.priceList.length;j++){
                if(_this.specArrList[i].id === _this.ruleForm.priceList[j].invenId){
                  _this.specArrList[i].isJoinGroup = !!_this.ruleForm.priceList[j].isJoinGroup;
                  _this.specArrList[i].groupPrice = _this.ruleForm.priceList[j].groupPrice;
                  _this.specArrList[i].priceId = _this.ruleForm.priceList[j].id;
                }
              }
            }
          }
          _this.specArrList.forEach(function(e,i){
            _this.setJoinGroup.push(e.isJoinGroup);
          })
          console.log(_this.specArrList,'222');
        }
      });
    }
  },
  mounted(){
    let _this = this;
    if(_this.$route.params.id != 0){
      _this.disabledShop = true;
      _this.mallGroupBuyInfo(_this.$route.params.id);
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
@import '../../../../../assets/css/mixins.less';
.addGruop-main{
    padding:40px 4%;
    .addGruop-input{
        width: 220px
    }
}
</style>


