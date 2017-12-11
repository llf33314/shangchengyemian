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
            <el-form-item label="活动商品 :" prop="choicePro" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="gName" required>
                <el-input v-model="ruleForm.gName" class="addGruop-input"></el-input>
                <p class="p-warn">最多可输入50位汉字或100位字符</p>
            </el-form-item>
            <el-form-item label="团购价 :" prop="gPrice" required v-if="ruleForm.isSpecifica == 0">
                <el-input v-model="ruleForm.gPrice" class="addGruop-input" >
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <div class="specificaPrices"  v-if="ruleForm.isSpecifica == 1">
              <el-form-item label="团购价 :" required>
                <specifica-price :rowList.sync="priceList" :specificesList="specificesList" ref="specComp"></specifica-price>
              </el-form-item>
            </div>
             <!-- range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期" -->
            <el-form-item label="活动时间 :" prop="gStartTime" required>
                <el-date-picker v-model="ruleForm.gStartTime" type="datetimerange" align="right"
                  placeholder="请选择活动时间" :picker-options="pickerOptions1">
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
import Lib from "assets/js/Lib";
import goodsBox from "../../components/goodsBox";
import goodsDialog from "../../components/goodsDialog";
import specificaPrice from "../../components/specifica/specificaPrice";
export default {
  components: {
    goodsBox,
    goodsDialog,
    specificaPrice
  },
  data() {
    var formShopId = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择店铺"));
      } else {
        callback();
      }
    };
    var formGname = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("活动名称不能为空"));
      } else {
        callback();
      }
    };
    var formStartTime = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择活动时间"));
      } else {
        callback();
      }
    };
    var formPeopleNum = (rule, value, callback) => {
      let reg = /^[0-9]\d*$/;
      if (value == "") {
        return callback(new Error("参团人数不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("参团人数必须为数字且不能小于0"));
      } else {
        callback();
      }
    };
    var formPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value === "") {
        return callback(new Error("团购价不能为空"));
      } else if (!reg.test(value) || value == 0) {
        return callback(new Error("团购价最多只能是大于0的5位数"));
      } else {
        callback();
      }
    };
    var formMaxBuyNum = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择店铺"));
      } else {
        callback();
      }
    };
    var formChoicePro = (rule, value, callback) => {
      if (this.boxData.id === undefined || this.boxData.id === "") {
        return callback(new Error("请选择活动商品"));
      } else {
        callback();
      }
    };
    return {
      setJoinGroup: [],
      table: [],
      pickerOptions1: {



        
        shortcuts: [  
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        shopId: "",
        gName: "",
        region: "",
        gStartTime: "",
        gEndTime: "",
        gPrice: "",
        gPeopleNum: 1,
        gMaxBuyNum: 0,
        priceList: [],
        productId: "",
        isJoinGroup: "",
        isSpecifica: 0
      },
      off: false,
      proId: "",
      isChoicePro: "",
      isReplacePro: "",
      rules: {
        shopId: [
          { validator: formShopId, trigger: "change", message: "请选择所属店铺" }
        ],
        gName: [{ validator: formGname, trigger: "blur", message: "请输入活动名称" }],
        gStartTime: [
          {
            validator: formStartTime,
            message: "请选择活动时间",
            trigger: "change,blur"
          }
        ],
        gPeopleNum: [
          { validator: formPeopleNum, trigger: "blur", message: "请输入正确的参团人数" }
        ],
        gPrice: [{ validator: formPrice, trigger: "blur", message: "请输入团购价" }],
        choicePro: [
          { validator: formChoicePro, trigger: "change", message: "请选择活动商品" }
        ],
        gMaxBuyNum: [{ validator: formMaxBuyNum, trigger: "blur" }]
      },
      shopList: [],
      boxData: {},
      specificesList: [],
      specArrList: [],
      disabledShop: ""
    };
  },
  watch: {
    setJoinGroup(val, val2) {
      var self = this;
      self.specArrList.forEach(function(e, i) {
        self.$set(self.specArrList[i], "isJoinGroup", self.setJoinGroup[i]);
      });
    }
  },
  methods: {
    /**
     * 选中商品事件
     */
    selectDialogData(data) {
      //选取商品传出的数据
      if (data.id == this.ruleForm.productId) {
        return false;
      }
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.choicePro = data.id;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.productId = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      this.specificesList = [];
      this.priceList = [];
      //重新验证表单
      this.$refs.ruleForm.validate(valid => {});
      if (this.ruleForm.isSpecifica == 1) {
        this.getSpecificaByProId(data.id);
      }
    },
    submitForm(formName) {
      //保存团购信息
      let _this = this;

      console.log(this.ruleForm, "ruleForm");
      console.log(this.priceList, "priceList");
      if (this.ruleForm.isSpecifica == 1) {
        let isVali = this.$refs.specComp.validateData();
        console.log(isVali, "isVali");
        if (!isVali) {
          return;
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let groupBuy = {};
          groupBuy = _this.$refs[formName].model;
          let time = _this.$refs[formName].model.gStartTime;
          groupBuy.gStartTime = Lib.M.format(new Date(time[0]));
          groupBuy.gEndTime = Lib.M.format(new Date(time[1]));
          groupBuy.gName = _this.$refs[formName].model.gName;
          groupBuy.productId = _this.$refs[formName].model.productId;
          if (!_this.off) {
            groupBuy.gMaxBuyNum = 0;
          }
          let _speciList = [];
          for (var k = 0; k < _this.specArrList.length; k++) {
            let arr = {};
            if (_this.specArrList[k].priceId != "") {
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
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallGroupBuySave_post,
            data: param,
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/group");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
    returnPage() {
      //取消按钮（返回上一页）
      window.history.go(-1);
    },
    showDialog() {
      //活动商品列表弹出框
      let shopId = this.ruleForm.shopId;
      if (shopId == null || shopId == "" || shopId == 0) {
        this.$message({
          message: "请选择所属店铺",
          type: "warning"
        });
        return;
      }
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.id;
    },
    mallGroupBuyInfo(id) {
      //获取团购商品的信息
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallGroupBuyInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          let myData = data.data;
          _this.ruleForm = myData;
          _this.ruleForm.gStartTime = [myData.gStartTime, myData.gEndTime];
          console.log(_this.ruleForm, "table");
          if (data.data.gMaxBuyNum === 0) {
            _this.off = false;
          } else {
            _this.off = true;
          } 
          _this.boxData = {
            id: myData.productId,
            pro_price: myData.proPrice,
            pro_name: myData.proName,
            image_url: data.imgUrl + myData.imageUrl,
            stockTotal: myData.proStockTotal,
            choicePro: myData.productId
          };

          // this.$refs.ruleForm.validate(valid => {}); //重新验证
        }
      });
    },
    getSpecificaByProId(proId) {
      //根据商品id查询商品规格
      let _this = this;
      this.mallGetSpecificaByProId({
        proId: proId,
        success(data) {
          _this.priceList = data.data.list;
          if (_this.priceList == null || _this.priceList.length == 0) {
            return;
          }
          let specList = _this.priceList[0].specList;
          for (var m = 0; m < specList.length; m++) {
            let spec = specList[m];
            let obj = {
              specificaName: spec.specificaName,
              specificaNameId: spec.specificaNameId
            };
            _this.$set(_this.specificesList, _this.specificesList.length, obj);
          }
          _this.priceList.forEach((price, index) => {
            price.isJoin = price.isJoin || true;
            //  price.groupPrice =  price.groupPrice || 0;
            _this.$set(_this.priceList, index, price);
          });
          console.log(_this.specificesList, "22222222");
          console.log(_this.priceList, "22222222");
        }
      });
    }
  },
  mounted() {
    let _this = this;
    if (_this.$route.params.id != 0) {
      _this.disabledShop = true;
      _this.mallGroupBuyInfo(_this.$route.params.id);
      _this.isReplacePro = true;
    } else {
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }

    _this.storeList({
      success(data) {
        if (data.data == null || data.data.length == 0) {
          return;
        }
        _this.shopList = data.data;
        let shopId = _this.ruleForm.shopId; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shopId = _this.shopList[0].id;
        }
      }
    });
  }
};
</script>


<style lang="less" scoped>
@import "../../../../../assets/css/mixins.less";
.addGruop-main {
  padding: 40px 4%;
  .addGruop-input {
    width: 220px;
  }
}
</style>



