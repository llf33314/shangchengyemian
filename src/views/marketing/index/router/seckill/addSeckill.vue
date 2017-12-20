<template>
<div class="addGruop-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/seckill' }">秒杀管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建秒杀</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addGruop-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId" required>
                <el-select v-model="ruleForm.shopId" v-bind:disabled="disabledShop" placeholder="请选择店铺" class="addGruop-input" @change="changeShop">
                    <el-option :label="option.sto_name" :value="option.id" :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="productId" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="sName" required>
                <el-input v-model="ruleForm.sName" class="addGruop-input"></el-input>
                <p class="p-warn">最多可输入50位汉字或100位字符</p>
            </el-form-item>
            <el-form-item label="秒杀价 :" prop="sPrice" required  v-if="ruleForm.isSpecifica == 0">
                <el-input v-model="ruleForm.sPrice" class="addGruop-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <div class="specificaPrices"  v-if="ruleForm.isSpecifica == 1">
              <el-form-item label="秒杀价 :" required >
                <specifica-price :rowList.sync="priceList" :specificesList="specificesList" :tipMsg="'秒杀'" ref="specComp"></specifica-price>
              </el-form-item>
            </div>
            <el-form-item label="活动时间 :" prop="sStartTime" required>
                <el-date-picker v-model="ruleForm.sStartTime" type="datetimerange" :editable="false"
                    placeholder="选择时间" :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品限购 :">
                <el-switch on-text="开启" off-text="关闭" v-model="off"></el-switch>
            </el-form-item>
            <el-form-item label="限购规则 :" v-if="off" prop="sMaxBuyNum" required>
                <el-input v-model="ruleForm.sMaxBuyNum" class="addGruop-input"></el-input>
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
    var formGroupPrice = (rule, value, callback) => {
      if (value == "" || value <= 0) {
        return callback(new Error("秒杀价不能为空且不能小于0"));
      } else {
        callback();
      }
    };
    var formShopId = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择店铺"));
      } else {
        callback();
      }
    };
    var formSname = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("活动名称不能为空"));
      } else if (!Lib.M.validateChineseLength(value, 100)) {
        return callback(new Error("最多可输入50位汉字或100位字符"));
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
    var formPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value === "") {
        return callback(new Error("秒杀价不能为空"));
      } else if (!reg.test(value) || value <= 0) {
        return callback(new Error("秒杀价最多只能是大于0的5位数"));
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
      if (this.boxData == null) {
        return callback(new Error("请选择活动商品"));
      } else {
        callback();
      }
    };
    return {
      setJoinSeckill: [],
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
        sName: "",
        region: "",
        sStartTime: "",
        sEndTime: "",
        sPrice: "",
        sMaxBuyNum: 0,
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
        sName: [{ validator: formSname, trigger: "blur", message: "请输入活动名称" }],
        productId: [
          { validator: formChoicePro, trigger: "change", message: "请选择活动商品" }
        ],
        sStartTime: [
          {
            validator: formStartTime,
            trigger: "change,blur",
            message: "请选择活动时间"
          }
        ],
        sPrice: [{ validator: formPrice, trigger: "blur", message: "请输入秒杀价" }],
        sMaxBuyNum: [
          { validator: formMaxBuyNum, trigger: "blur", message: "请输入限购人数" }
        ]
      },
      shopList: [],
      boxData: null,
      specificesList: [],
      priceList: [],
      specArrList: [],
      disabledShop: "",
      selectShopId: 0
    };
  },
  watch: {
    setJoinSeckill(val, val2) {
      var self = this;
      self.specArrList.forEach(function(e, i) {
        self.$set(self.specArrList[i], "isJoinGroup", self.setJoinSeckill[i]);
      });
    }
  },
  methods: {
    //改变店铺，清空选择的商品
    changeShop(val) {
      //重新选择店铺清空选择的商品和规格
      if (this.selectShopId > 0 && this.ruleForm.productId > 0) {
        this.selectShopId = this.ruleForm.shopId;
        this.isChoicePro = true;
        this.isReplacePro = false;
        this.specificesList = [];
        this.priceList = [];
        this.boxData = null;
        this.ruleForm.choicePro = null;
        this.ruleForm.isSpecifica = 0;
        this.ruleForm.productId = null;
        this.$refs.ruleForm.validate(valid => {});
      }
      this.selectShopId = this.ruleForm.shopId;
    },
    selectDialogData(data) {
      if (data.id == this.ruleForm.productId) {
        return false;
      }
      //活动商品列表弹出框
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
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
      //保存秒杀
      let _this = this;
      if (this.ruleForm.isSpecifica == 1) {
        let isVali = this.$refs.specComp.validateData();
        if (!isVali) {
          return;
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = _this.$refs[formName].model;
          let time = formData.sStartTime;
          let seckill = {
            productId: formData.productId,
            sName: formData.sName,
            sStartTime: Lib.M.format(new Date(time[0])),
            sEndTime: Lib.M.format(new Date(time[1])),
            sPrice: formData.sPrice,
            shopId: formData.shopId,
            sNum: _this.boxData.stockTotal || 0
          };
          if (formData.id != null || formData.id != "") {
            seckill.id = formData.id || null;
          }
          if (!_this.off) {
            seckill.sMaxBuyNum = 0;
          }
          let isJoin = false;
          let _speciList = [];
          if (_this.ruleForm.isSpecifica == 1) {
            for (var k = 0; k < _this.priceList.length; k++) {
              let specObj = _this.priceList[k];
              let arr = {
                seckillPrice: specObj.activityPrice,
                invenId: specObj.id,
                specificaIds: specObj.specificaIds,
                isJoinGroup: Number(specObj.isJoin),
                id: specObj.priceId || null
              };
              if (specObj.isJoin) {
                isJoin = true;
              }
              _speciList.push(arr);
              if (k == 0) {
                seckill.sPrice = specObj.activityPrice;
              }
            }

            if (!isJoin) {
              _this.$message({
                message: "您还没选择要参与秒杀的的规格",
                type: "warning"
              });
              return;
            }
          }
          console.log(seckill, "111");
          console.log(_speciList, "2223333");
          let param = {};
          param["seckill"] = seckill;
          param["specArr"] = JSON.stringify(_speciList);
          console.log(param, "speac");
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallSeckillSave_post,
            data: param,
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/seckill");
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
      //返回上一页（取消按钮）
      window.history.go(-1);
    },
    showDialog() {
      //选择、替换商品弹出框
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.id;
    },
    mallSeckillSeckillInfo(id) {
      //获取秒杀信息
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSeckillSeckillInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          let myData = data.data;
          _this.ruleForm = myData;
          _this.ruleForm.sStartTime = [myData.sStartTime, myData.sEndTime];
          console.log(_this.ruleForm, "table");
          if (myData.sMaxBuyNum === 0) {
            _this.off = false;
          } else {
            _this.off = true;
          }
          _this.boxData = {
            id: myData.productId,
            pro_price: myData.proPrice,
            pro_name: myData.proName,
            image_url: data.imgUrl + myData.imageUrl,
            stockTotal: myData.proStockTotal
          };
          if (myData.isSpecifica == 1) {
            _this.getSpecificaByProId(_this.ruleForm.productId);
          }
        }
      });
    },
    getSpecificaByProId(proId) {
      //根据商品id查询商品规格
      let _this = this;
      _this.mallGetSpecificaByProId({
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
          let formPriceList = _this.ruleForm.priceList;
          _this.priceList.forEach((price, index) => {
            price.isJoin = price.isJoin || true;
            if (formPriceList != null && formPriceList.length > 0) {
              price.isJoin = false;
              for (let j = 0; j < formPriceList.length; j++) {
                let priceObj = formPriceList[j];
                if (priceObj.specificaIds == price.specificaIds) {
                  price.priceId = priceObj.id;
                  price.activityPrice = priceObj.seckillPrice;
                  if (priceObj.isJoinGroup == 1) {
                    price.isJoin = true;
                  }
                  break;
                }
              }
            }
            _this.$set(_this.priceList, index, price);
          });
        }
      });
    }
  },
  mounted() {
    let _this = this;
    this.isMarketingUrl();
    _this.storeList({
      success(data) {
        // _this.shopList = data.data;
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

    if (_this.$route.params.id != 0) {
      _this.disabledShop = true;
      _this.mallSeckillSeckillInfo(_this.$route.params.id);
      _this.isReplacePro = true;
    } else {
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
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


