<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
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
            <el-form-item label="选择商品 :" prop="productId" required>
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
            <el-form-item label="批发价 :" prop="pf_price" required v-if="ruleForm.isSpecifica == 0">
                 <el-input  v-model="ruleForm.pf_price" class="max-input" :maxlength="8">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <div class="specificaPrices"  v-if="ruleForm.isSpecifica == 1">
              <el-form-item label="批发价 :" required >
                <specifica-price :rowList.sync="priceList" :specificesList="specificesList" ref="specComp" :tipMsg="'批发'" :isShowJoin="false"></specifica-price>
              </el-form-item>
            </div>
            <el-form-item label="活动时间 :" prop="pf_start_time" required>
                <el-date-picker v-model="ruleForm.pf_start_time" type="datetimerange" :picker-options="pickerOptions1"
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
    var formChoicePro = (rule, value, callback) => {
      if (this.ruleForm.productId > 0) {
        callback();
      }
      return callback(new Error("请选择活动商品"));
    };
    var formPfPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value == "") {
        return callback(new Error("批发价不能为空"));
      } else if (!reg.test($.trim(value)) || value <= 0) {
        return callback(new Error("批发价最多只能是大于0的6位数"));
      } else {
        callback();
      }
    };
    var formPfStartTime = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择活动时间"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
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
        pf_type: 1,
        shop_id: "",
        pf_start_time: "",
        isSpecifica: 0,
        productId: "",
        pf_price: ""
      },
      rules: {
        shop_id: [{ validator: formShopId, trigger: "change" }],
        productId: [{ validator: formChoicePro, trigger: "change" }],
        pf_start_time: [{ validator: formPfStartTime, trigger: "change" }],
        pf_price: [{ validator: formPfPrice, trigger: "blur" }]
      },
      shopList: [],
      specificesList: [],
      priceList: [],
      isChoicePro: "",
      isReplacePro: "",
      boxData: [],
      disabledShop: ""
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      if (this.ruleForm.isSpecifica == 1) {
        let isVali = this.$refs.specComp.validateData();
        if (!isVali) {
          return;
        }
      }
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let param = _this.$refs[formName].model;
          let time = _this.$refs[formName].model.pf_start_time;
          let _format = Lib.M.format;
          let pifa = {
            productId: param.productId,
            pfType: param.pf_type,
            pfStartTime: _format(new Date(time[0])),
            pfEndTime: _format(new Date(time[1])),
            pfPrice: param.pf_price,
            shopId: param.shop_id,
            id: param.id || null
          };
          pifa.sNum = param.productId;
          let specArr = [];
          for (var k = 0; k < _this.priceList.length; k++) {
            let specObj = _this.priceList[k];
            let arr = {
              id: specObj.priceId || null,
              seckillPrice: specObj.activityPrice,
              invenId: specObj.id,
              specificaIds: specObj.specificaIds
            };
            specArr.push(arr);
            if (k == 0) {
              pifa.pfPrice = specObj.activityPrice;
            }
          }
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallWholesaleSave_post,
            data: {
              pifa: pifa,
              specArr: JSON.stringify(specArr)
            },
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/pifa/1");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //活动商品列表弹出框
    selectDialogData(data) {
      if (data.id == this.ruleForm.productId) {
        return false;
      }
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
    //返回上一页
    returnPage() {
      window.history.go(-1);
    },
    //选择商品弹出框
    showDialog() {
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shop_id;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.productId;
    },
    //获取批发信息
    mallWholesalePifaInfo(id) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallWholesalePifaInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          let myData = data.data;
          _this.ruleForm = myData;
          _this.ruleForm.pf_start_time = [
            myData.pf_start_time,
            myData.pf_end_time
          ];
          console.log(_this.ruleForm, "_this.ruleForm");
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
    //商品规格列表
    getSpecificaByProId(proId) {
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
            if (formPriceList != null && formPriceList.length > 0) {
              for (let j = 0; j < formPriceList.length; j++) {
                let priceObj = formPriceList[j];
                if (priceObj.specificaIds == price.specificaIds) {
                  price.priceId = priceObj.id;
                  price.activityPrice = priceObj.seckillPrice;
                  break;
                }
              }
            }
            //  price.groupPrice =  price.groupPrice || 0;
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
        if (data.data == null || data.data.length == 0) {
          return;
        }
        _this.shopList = data.data;
        let shopId = _this.ruleForm.shop_id; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shop_id = _this.shopList[0].id;
        }
      }
    });

    if (_this.$route.params.id != 0) {
      _this.disabledShop = true;

      _this.mallWholesalePifaInfo(_this.$route.params.id);

      _this.isReplacePro = true;
    } else {
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../../less/style.less";
.addBond-main {
  padding: 40px 4%;
  .addBond-input {
    width: 220px;
  }
}
</style>


