<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/marketing/2' }">超级销售员</el-breadcrumb-item>
            <el-breadcrumb-item v-if="ruleForm.id ==''">新建商品佣金</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改商品佣金</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop_id" required>
                <el-select v-model="ruleForm.shop_id" placeholder="请选择店铺" class="addBond-input" v-bind:disabled="disabledShop" @change="changeShop">
                    <el-option :label="item.sto_name" :value="item.id" :key="item.id"  v-for="item in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="product_id" required>
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
                    <el-input v-model="ruleForm.commission_rate" class="addBond-input"></el-input>%
                </span>
                 <el-input v-model.number="ruleForm.commission_rate" class="addBond-input" v-if="ruleForm.commission_type ==2">
                     <template slot="prepend">¥</template>
                 </el-input>
                 <span class="p-warn" v-if="disabledCommission">商品佣金按百分比的计算公式：商品价*（佣金商品佣金/100）</span>
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
export default {
  components: {
    goodsBox,
    goodsDialog
  },
  data() {
    var formRegion = (rule, value, callback) => {
      if (this.boxData == null) {
        return callback(new Error("请选择活动商品"));
      } else {
        callback();
      }
    };
    var formShopId = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择所属店铺"));
      } else {
        callback();
      }
    };
    var formCommissionType = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择佣金类型"));
      } else {
        if (value === 1) {
          this.disabledCommission = true;
        } else {
          this.disabledCommission = false;
        }
        callback();
      }
    };
    var formCommissionRate = (rule, value, callback) => {
      let _this = this;
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      let max = 8;
      if (value === "") {
        return callback(new Error("商品佣金不能为空"));
      } else if (_this.ruleForm.commission_type == 1) {
        //百分比
        if (Number(value) > 70 || !reg.test(value)) {
          return callback(new Error("根据微信规则，佣金比例最高不可超过70%")); //按百分比显示提示文字
        }
      } else if (_this.ruleForm.commission_type == 2) {
        //固定金额
        var proPrice = _this.ruleForm.proPrice;
        if (proPrice != null && proPrice != "") {
          proPrice = proPrice * 1;
          max = (proPrice * 0.7).toFixed(2);
          if (Number(value) * 1 > max || !reg.test(value)) {
            return callback(new Error("商品佣金最多只能是大于0的5位数,且不能超过商品的70%")); //按固定金额显示提示文字
          }
        }
      }
      callback();
    };
    return {
      ruleForm: {
        id:'',
        shop_id: "",
        commission_type: 1,
        commission_rate: "", //商品佣金
        product_id: ""
      },
      rules: {
        shop_id: [
          { validator: formShopId, trigger: "change", message: "请选择所属店铺" }
        ],
        commission_type: [{ validator: formCommissionType, trigger: "change" }],
        product_id: [{ validator: formRegion, trigger: "change" }],
        commission_rate: [
          { validator: formCommissionRate, trigger: "blur,change", message: "" }
        ]
      },
      shopList: [],
      boxData: null,
      isChoicePro: "",
      isReplacePro: "",
      disabledShop: "",
      disabledCommission: true,
      selectShopId:0
    };
  },
  methods: {
    //改变店铺，清空选择的商品
    changeShop(val){
      //重新选择店铺清空选择的商品和规格
      if (this.selectShopId > 0 && this.ruleForm.product_id > 0) {
          this.isChoicePro = true;
          this.isReplacePro = false;
          this.boxData = null;
          this.ruleForm.product_id = null;
          this.$refs.ruleForm.validate(valid => {});
          this.selectShopId = this.ruleForm.shop_id;
      }
    },
    selectDialogData(data) {
      if (data.id == this.ruleForm.product_id) {
        return false;
      }
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.product_id = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      this.selectShopId=this.ruleForm.shop_id;
      //重新验证表单
      this.$refs.ruleForm.validate(valid => {});
    },
    submitForm(formName) {
      //保存商品佣金设置
      let _this = this;
      console.log(_this.$refs[formName]);
      _this.$refs[formName].validate(valid => {
        console.log(valid, "valid");
        if (valid) {
          let fname = _this.$refs[formName].model;
          let joinProduct = {
            shopId: fname.shop_id,
            productId: fname.product_id,
            commissionRate: fname.commission_rate,
            commissionType: fname.commission_type,
            id: fname.id || null
          };

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
          _this.ajaxSave({
            url: DFshop.activeAPI.mallSellerSaveJoinProduct_post,
            data: {
              joinProduct: JSON.stringify(joinProduct)
            },
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/marketing/2");
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
      //返回上一页
      window.history.go(-1);
    },
    showDialog() {
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.isCommission = true;
    },
    mallSellersJoinProductInfo(id) {
      //获取商品拥金信息
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersJoinProductInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          _this.ruleForm = data.data;
          console.log(_this.ruleForm, "table");
          _this.boxData = {
            id: data.data.product_id,
            pro_price: data.data.proPrice,
            pro_name: data.data.proName,
            image_url: data.imgUrl + data.data.imageUrl,
            stockTotal: data.data.proStockTotal
          };
        }
      });
    }
  },
  mounted() {
    let _this = this;
    _this.storeList({
      success(data) {
        _this.shopList = data.data;
        let shopId = _this.ruleForm.shop_id; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shop_id = _this.shopList[0].id;
        }
      }
    });
    if (_this.$route.params.id > 0) {
      _this.disabledShop = true;
      _this.mallSellersJoinProductInfo(_this.$route.params.id);
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
.addBond-main {
  padding: 40px 4%;
  .addBond-input {
    width: 220px;
  }
}
</style>


