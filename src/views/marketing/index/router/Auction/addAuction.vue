<template>
<div class="auction-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/auction/1' }">拍卖管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="ruleForm.id == ''">新建拍卖活动</el-breadcrumb-item>
             <el-breadcrumb-item v-else>修改拍卖活动</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="auction-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId" required  >
                <el-select v-model="ruleForm.shopId" placeholder="请选择店铺" v-bind:disabled="disabledShop" class="auction-input" @change="changeShop">
                    <el-option :label="option.sto_name" :value="option.id" :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="productId" required>
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <span class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</span>
            </el-form-item>
            <el-form-item label="拍卖类型 :" prop="aucType" required>
                <el-radio-group v-model="ruleForm.aucType" @change="validate">
                    <el-radio :label="1">降价拍</el-radio>
                    <el-radio :label="2">升价拍</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要交纳保证金 :" >
                <el-checkbox v-model="ruleForm.isMargin" @change="validate">拍卖前需要交纳保证金</el-checkbox>
            </el-form-item>
            <el-form-item label="交纳保证金 :" prop="aucMargin" v-if="ruleForm.isMargin" required>
                <el-input  v-model.number="ruleForm.aucMargin" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="起拍价格 :" prop="aucStartPrice" required>
                <el-input v-model.number="ruleForm.aucStartPrice" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="活动时间 :" prop="aucTime" v-if="ruleForm.aucType == 2" required>
                 <el-date-picker v-model="ruleForm.aucTime" type="datetimerange"  :editable="false"
                    placeholder="选择日期" :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="开始时间 :" prop="aucStartTime" v-if="ruleForm.aucType == 1" required>
                <el-date-picker v-model="ruleForm.aucStartTime" type="datetime" :editable="false" :picker-options="pickerOptions1"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最低价格 :" prop="aucLowestPrice" v-if="ruleForm.aucType == 1" required>
                <el-input v-model.number="ruleForm.aucLowestPrice" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="加价幅度 :" prop="aucAddPrice" v-if="ruleForm.aucType == 2" required>
                <el-input  v-model.number="ruleForm.aucAddPrice" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
             <el-form-item label="降价幅度 :" v-if="ruleForm.aucType == 1" required >
                <div style="display:inline-block">
                    <el-form-item  prop="aucLowerPriceTime" style="float:left"  >
                        每 <el-input  v-model.number="ruleForm.aucLowerPriceTime" class="mix-input"></el-input>
                    </el-form-item>
                    <el-form-item  prop="aucLowerPrice" style="float:left" class="price-auc-div" >
                        分钟下降 <el-input  v-model.number="ruleForm.aucLowerPrice" class="max-input">
                            <template slot="prepend">¥</template>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form-item>
            <el-form-item label="持续时间 :" v-if="ruleForm.aucType == 1">
                <span v-show="disabledTime">{{durationTime}} </span>
                <el-button type="primary" @click="calculationTime()">计算持续时间</el-button>
                <span class="p-warn">下降到结束价格后还会持续一个时间周期</span>
            </el-form-item>
            <el-form-item label="结束时间 :" v-show="disabledTime">
                <p >预计 <span>{{endTime}}</span>结束</p>
            </el-form-item>
             <el-form-item label="商品限购 :" prop="aucRestrictionNum" v-if="ruleForm.aucType == 1">
                开始限购 <el-input  v-model.number="ruleForm.aucRestrictionNum" class="max-input"></el-input> 件/人
                <span class="p-warn">不填写则代表该拍卖商品不限购</span>
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
export default {
  components: {
    goodsBox,
    goodsDialog
  },
  data() {
    var formShopId = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择店铺"));
      }
      callback();
    };
    var formProductId = (rule, value, callback) => {
      console.log(value, "values",this.boxData,"boxData");
     if (this.boxData != null) {
        return callback();
      }
      callback(new Error("请选择活动商品"));
    };
    var formAucStartPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value == "") {
        return callback(new Error("起拍价格不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("起拍价格最多只能输入大于0的5位数"));
      }
      callback();
    };
    var formAucStartTime = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请选择时间"));
      }
      callback();
    };
    var formAucAddPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value == "") {
        return callback(new Error("加价幅度不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("加价幅度最多只能输入大于0的5位数"));
      }
      callback();
    };
    //验证最低价格
    var formLowestPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      let aucStartPrice = this.ruleForm.aucStartPrice;
      if (value == "") {
        return callback(new Error("最低价格不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("最低价格最多只能输入大于0的5位数"));
      } else if (aucStartPrice <= value) {
        return callback(new Error("最低价格不能低于起拍价"));
      }
      callback();
    };
    //验证降价幅度(时间)
    var formLowestPriceTime = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}$/;
      if (value == "") {
        return callback(new Error("降价幅度不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("降价幅度最多只能输入大于0的5位数"));
      }
      callback();
    };
    //验证降价幅度（金额）
    var formAucLowerPrice = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value == "") {
        return callback(new Error("降价幅度不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("降价幅度最多只能输入大于0的5位小数"));
      }
      callback();
    };
    //限购验证
    var formRestrictionNum = (rule, value, callback) => {
      if (value != "" && value > 0) {
        let reg = /^[0-9]{1,5}$/;
        if (!reg.test(value)) {
          return callback(new Error("商品限购最多只能输入的5位数"));
        }
      }
      callback();
    };
    var formAucMargin = (rule, value, callback) => {
      if (this.ruleForm.isMargin == 1) {
        let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
        if (value == "") {
          return callback(new Error("请输入保证金"));
        } else if (!reg.test(value) || value == 0) {
          return callback(new Error("保证金最多只能输入大于0的5位数"));
        }
      }
      callback();
    };
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions0: {
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
        shopId: "",
        aucMargin: "",
        aucType: 1,
        aucLowestPrice: "",
        isMargin: false,
        aucStartTime: "",
        aucTime: "",
        isSpecifica: "",
        aucStartPrice: "",
        aucAddPrice: "",
        productId: "",
        aucLowerPriceTime: "",
        aucLowerPrice: "",
        aucRestrictionNum: ""
      },
      rules: {
        shopId: [{ validator: formShopId, trigger: "change" }],
        productId: [{ validator: formProductId, trigger: "blur" }],
        aucStartPrice: [{ validator: formAucStartPrice, trigger: "blur" }],
        aucStartTime: [{ validator: formAucStartTime, trigger: "change,blur" }],
        aucTime: [{ validator: formAucStartTime, trigger: "change,blur" }],
        aucAddPrice: [{ validator: formAucAddPrice, trigger: "blur" }],
        aucLowestPrice: [{ validator: formLowestPrice, trigger: "blur" }],
        aucLowerPriceTime: [
          { validator: formLowestPriceTime, trigger: "blur" }
        ],
        aucLowerPrice: [{ validator: formAucLowerPrice, trigger: "blur" }],
        aucRestrictionNum: [{ validator: formRestrictionNum, trigger: "blur" }],
        aucMargin: [{ validator: formAucMargin, trigger: "blur" }]
      },
      shopList: [],
      isChoicePro: "",
      isReplacePro: "",
      boxData: [],
      disabledShop: "",
      disabledTime: false,
      endTime: "", //降价拍结束时间
      durationTime: 0, //持续时间
      selectShopId: 0
    };
  },
  methods: {
    //验证
    validate() {
      this.$refs.ruleForm.validate();
    },
    //改变店铺，清空选择的商品
    changeShop(val) {
      //重新选择店铺清空选择的商品和规格
      if (this.selectShopId > 0 && this.ruleForm.productId > 0) {
        this.isChoicePro = true;
        this.isReplacePro = false;
        this.boxData = null;
        this.ruleForm.isSpecifica = 0;
        this.ruleForm.productId = null;
        this.$refs.ruleForm.validate(valid => {});
      }
      this.selectShopId = this.ruleForm.shopId;
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
      this.selectShopId = this.ruleForm.shopId;
      this.$refs.ruleForm.validate();
    },
    submitForm(formName) {
      //保存拍卖信息
      let _this = this;
      console.log(_this.boxData);
      let formData = _this.$refs[formName].model;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          //计算结束时间
          if (formData.aucType == 1) {
            _this.calculationTime();
          }
          let time = formData.aucStartTime;
          let auction = formData;
          auction.isMargin = Number(formData.isMargin);
          if (formData.aucType == 2) {
            //升价拍
            time = formData.aucTime;
            auction.aucStartTime = Lib.M.format(new Date(time[0]));
            auction.aucEndTime = Lib.M.format(new Date(time[1]));
            auction.aucLowestPrice = 0;
            auction.aucLowerPriceTime = 0;
            auction.aucLowerPrice = 0;
          } else {
            //降价拍
            auction.aucStartTime = Lib.M.format(new Date(time));
            auction.aucEndTime = _this.endTime;
          }
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallAuctionSave_post,
            data: {
              auction: auction
            },
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/auction/1");
            }
          });
        } else {
          //   console.log("error submit!!");
          _this.$message.error("请完善基本信息");
          return false;
        }
      });
    },
    returnPage() {
      //返回上一页
      window.history.go(-1);
    },
    showDialog() {
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.productId;
    },
    mallAuctionAuctionInfo(id) {
      //获取拍卖信息
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAuctionAuctionInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          _this.ruleForm = data.data;
          _this.ruleForm.isMargin = !!data.data.isMargin;
          _this.boxData = {
            id: data.data.productId,
            pro_price: data.data.proPrice,
            pro_name: data.data.proName,
            image_url: data.imgUrl + data.data.imageUrl,
            stockTotal: data.data.proStockTotal
          };
          if (data.data.aucType == 2) {
            //升价拍
            _this.ruleForm.aucTime = [
              data.data.aucStartTime,
              data.data.aucEndTime
            ];
            _this.disabledTime = false;
          } else {
            //降价拍
            _this.endTime = data.data.aucEndTime;
            _this.disabledTime = true;
            _this.$nextTick(()=>{
              _this.calculationTime();
            })
             
          }
  
          console.log(_this.ruleForm, "_this.ruleForm ");
        }
      });
    },
    calculationTime() {
      //计算持续时间
      let _this = this;
      let ruleForm = _this.ruleForm;
      console.log(ruleForm, "ruleForm");
      _this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let startPrice = Number(ruleForm.aucStartPrice); //起拍价格
          let aucLowestPrice = Number(ruleForm.aucLowestPrice); //最低价格
          let aucStartTime = ruleForm.aucStartTime; //活动生效开始时间
          let minuTimes = ruleForm.aucLowerPriceTime; //降价幅度，分钟
          let aucLowerPrice = Number(ruleForm.aucLowerPrice); //每分钟价格
          if (aucLowestPrice >= startPrice) {
            _this.$message.error("最低价格不能低于起拍价");
            return;
          }

          let price = startPrice - aucLowestPrice;
          let diff = Math.ceil(price / aucLowerPrice) * minuTimes;
          let diffHtml = "";

          let day = 0;
          if (diff > 24 * 60) {
            day = parseInt(diff / (24 * 60));
            diffHtml += day + "天";
          }
          let hour = 0;
          if (diff > 60) {
            hour = parseInt(diff / 60 - day * 24);
            diffHtml += hour + "小时";
          }
          let min = parseInt(diff - day * 24 * 60 - hour * 60);
          if (min > 0) {
            diffHtml += min + "分钟";
          }
          _this.durationTime = diffHtml;
          let endTimes = _this.addDays(aucStartTime, diff * 60 * 1000);
          _this.endTime = endTimes;
          _this.disabledTime = true;
        } else {
          _this.$message.error("请先完成信息");
        }
      });
    },
    addDays(date, diff) {
      let nd = new Date(date);
      nd = nd.valueOf();
      nd = nd + diff;
      nd = new Date(nd);
      let y = nd.getFullYear();
      let m = nd.getMonth() + 1;
      let d = nd.getDate();
      let h = nd.getHours();
      let mi = nd.getMinutes();
      let s = nd.getSeconds();
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      let cdate = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
      return cdate;
    }
  },
  mounted() {
    let _this = this;
    this.isMarketingUrl();
    _this.storeList({
      success(data) {
        _this.shopList = data.data;
        if (data.data == null || data.data.length == 0) {
          return;
        }
        let shopId = _this.ruleForm.shopId; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shopId = _this.shopList[0].id;
        }
      }
    });
    if (_this.$route.params.id != 0) {
      _this.mallAuctionAuctionInfo(_this.$route.params.id);
      _this.disabledShop = true;
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
.auction-main {
  padding: 40px 4%;
  .auction-input {
    width: 220px;
  }
}
</style>
<style lang="less">
.price-auc-div {
  .el-form-item__error {
    left: 66px;
  }
}
</style>


