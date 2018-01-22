<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/presale/1' }">预售管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建预售</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop_id" required class="msg-right-item">
                <el-select v-model="ruleForm.shop_id" v-bind:disabled="disabledShop" placeholder="请选择店铺" class="addBond-input" @change="changeShop">
                    <el-option :label="option.sto_name" :value="option.id"
                      :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="product_id" required class="msg-right-item">
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <span class="p-warn">如需修改商品信息，请在商品管理中更新</span>
            </el-form-item>
            <el-form-item label="商品价格 :" v-if="ruleForm.isSpecifica == 0">
               <span>¥{{ruleForm.proPrice }}</span>
            </el-form-item>
            <el-form-item label="商品价格 :" v-if="ruleForm.isSpecifica == 1">
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
            <el-form-item label="交纳定金 :" prop="deposit_percent" required class="msg-right-item"> 
                 <el-input  v-model.trim="ruleForm.deposit_percent" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <span class="p-warn" v-if="ruleForm.proPrice > 0">不能高于商品价格，商品的价格为￥{{ruleForm.proPrice}}</span>
            </el-form-item>
            <el-form-item label="预售时间 :" prop="sale_start_time" required class="time-right-item" >
                <el-date-picker v-model="ruleForm.sale_start_time" type="datetimerange"
                    placeholder="选择日期范围" :picker-options="pickerOptions">
                </el-date-picker>
                 <span class="p-warn">在预售开始时间前，为交纳定金的时间，在活动开始之后为支付尾款时间</span>
            </el-form-item>
            <el-form-item label="价格调整 :" class="price-el-item">
                <div v-for="(item,index) in ruleForm.timeList" :key="item.id" :value="item.id">
                  <el-form-item 
                      :prop="'timeList.'+index+'.startTime'" style="display:inline-block;"
                      class="price-item2"
                      :rules="[
                          { required: true, message: '请选择价格调整日期范围'}
                      ]">
                  <el-date-picker v-model="item.startTime" type="datetimerange" placeholder="选择日期范围" :editable="false"
                      :picker-options="pickerOptions" @change="checkTime(index)">
                  </el-date-picker>
                   </el-form-item>
                  <el-radio-group v-model="item.saleType" @change="countPrice(index)">
                      <el-radio :label="1">上涨</el-radio>
                      <el-radio :label="2">下调</el-radio>
                  </el-radio-group>
                  <el-select v-model="item.priceType" placeholder="选择调整方式" style="width:130px;margin-left:15px;" @change="countPrice(index)">
                      <el-option label="按百分比" :value="1"></el-option>
                      <el-option label="按价格" :value="2"></el-option>
                  </el-select> 
                  <el-form-item 
                        :prop="'timeList.'+index+'.price'" style="display:inline-block;"
                        class="price-item"
                        :rules="[
                            { required: true, message: '请输入价格'},
                            { type: 'number',min:0.01,max:9999.99, message: '价格最多只能是大于0的4位小数'}
                        ]">
                    <el-input  v-model.number="item.price" style="width: 130px; margin-left:15px" @blur="countPrice(index)">
                      <template slot="append">{{unit[item.priceType]}}</template>
                    </el-input>
                   
                  </el-form-item>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="index == 0" @click="addPriceAdjustment()">新增</a>
                  <a class="fontBlue" style="margin-left:5px;cursor:pointer;" v-show="index == 0" @click="emptyPrice(index)">清空</a>
                  <a class="fontBlue" style="margin-left:20px;cursor:pointer;" v-show="ruleForm.timeList.length > 1 && index > 0"
                      @click="priceDel(index)">删除</a>
                  <p class="p-warn">商品价格从¥{{ruleForm.proPrice }}{{saleTypeName[item.saleType]}}到{{item.raisePrice}}</p>
                </div>
            </el-form-item>
            <el-form-item label="订货数量 :" >
                <el-input  v-model.number="ruleForm.order_num" placeholder="请输入订货数量" class="max-input"></el-input>
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
import Lib from "assets/js/Lib";
import goodsBox from "../../components/goodsBox";
import goodsDialog from "../../components/goodsDialog";
export default {
  components: {
    goodsBox,
    goodsDialog
  },
  data() {
    var formDepositPercent = (rule, value, callback) => {
      console.log(this.ruleForm.proPrice, "this.ruleForm.proPrice");
       let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (this.ruleForm.product_id > 0) {
        if (value >= this.ruleForm.proPrice || value < 0) {
          return callback(new Error("交纳定金必须大于0并且要小于商品的价格"));
        } else if (value == "") {
          callback(new Error("交纳定金不能为空"));
        } else if (!reg.test(value) || value <= 0) {
        return callback(new Error("定金最多只能输入大于0的5位小数"));
        }else {
          callback();
        }
      }
      return callback(new Error("请先选择商品"));
    };
    var formShopId = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择店铺"));
      } else {
        callback();
      }
    };
    var formRegion = (rule, value, callback) => {
      if (this.ruleForm.product_id > 0) {
        callback();
      }
      return callback(new Error("请选择活动商品"));
    };
    var formSaleStartTime = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择预售时间"));
      }
      callback();
    };
    return {
      pickerOptions: {
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
        shop_id: "",
        sale_start_time: "",
        deposit_percent: "",
        region: "",
        proPrice: 0.0,
        product_id: "",
        timeList: [
          {
            startTime: "",
            saleType: 1,
            priceType: 1,
            price: "",
            raisePrice: 0 //上涨 价格
          }
        ],
        off: false
      },
      rules: {
        deposit_percent: [{ validator: formDepositPercent, trigger: "blur" }],
        shop_id: [
          { validator: formShopId, trigger: "change", message: "请选择所属店铺" }
        ],
        product_id: [
          { validator: formRegion, trigger: "change", message: "请选择商品" }
        ],
        sale_start_time: [
          {
            validator: formSaleStartTime,
            trigger: "change,blur",
            message: "请选择预售时间"
          }
        ]
      },
      isChoicePro: "",
      isReplacePro: "",
      boxData: {},
      shopList: [],
      table: [],
      specArrList: [],
      disabledShop: "",
      selectShopId: 0,
      saleTypeName: {
        1: "上涨",
        2: "下调"
      }, //价格上涨、下调文字说明
      unit: {
        1: "%",
        2: "￥"
      } //单位
    };
  },
  methods: {
    //改变店铺，清空选择的商品
    changeShop(val){
      //重新选择店铺清空选择的商品和规格
      if (this.selectShopId > 0 && this.ruleForm.product_id > 0) {
        this.isChoicePro = true;
        this.isReplacePro = false;
        this.specArrList = [];
        this.boxData = null;
        this.ruleForm.isSpecifica = 0;
        this.ruleForm.product_id = null;
        this.$refs.ruleForm.validate(valid => {});
        this.selectShopId = this.ruleForm.shop_id;
      }
    },
    priceDel(index) {
      //删除价格调整
      this.ruleForm.timeList.splice(index, 1);
    },
    emptyPrice(index) {
      //清空第一行的价格调整数据
      this.ruleForm.timeList[index].startTime = ["", ""];
      this.ruleForm.timeList[index].price = "";
    },
    countPrice(index) {
      //计算上涨价格
      let tl = this.ruleForm.timeList[index];
      if (tl.saleType == 1) {
        //上涨
        if (tl.priceType == 1) {
          //按百分比
          tl.raisePrice =
            this.ruleForm.proPrice + tl.price / 100 * this.ruleForm.proPrice;
        } else {
          //按价格
          tl.raisePrice = this.ruleForm.proPrice + tl.price;
        }
      } else {
        //下调
        if (tl.priceType == 1) {
          //按百分比
          tl.raisePrice =
            this.ruleForm.proPrice - tl.price / 100 * this.ruleForm.proPrice;
        } else {
          //按价格
          tl.raisePrice = this.ruleForm.proPrice - tl.price;
        }
      }
      if (tl.raisePrice === this.ruleForm.proPrice || tl.raisePrice < 0) {
        tl.raisePrice = 0;
      } else {
        tl.raisePrice = tl.raisePrice.toFixed(2);
      }
    },
    selectDialogData(data) {
      if (data.id == this.ruleForm.product_id) {
        return false;
      }
      //选中活动商品事件
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.isSpecifica = data.is_specifica;
      this.ruleForm.product_id = data.id;
      this.ruleForm.proPrice = data.pro_price;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      this.selectShopId = this.ruleForm.shop_id;
      this.$refs.ruleForm.validate(valid => {});
      if (this.ruleForm.isSpecifica == 1) {
        this.getSpecificaByProId(data.id);
      }
      for (var i = 0; i < this.ruleForm.timeList.length; i++) {
        this.countPrice(i); //变化商品时，价格调整发生变化
      }
    },
    submitForm(formName) {
      //保存预售商品信息方法
      let _this = this;
      if (_this.$refs[formName].model.timeList != "") {
        let flag = _this.checkTime();
        if (!flag) {
          return;
        }
      }
      let _format = Lib.M.format;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          // return;
          let formData = _this.$refs[formName].model;
          let time = formData.sale_start_time;
          let presale = {
            saleStartTime: _format(new Date(time[0])),
            saleEndTime: _format(new Date(time[1])),
            productId: formData.product_id,
            shopId: formData.shop_id,
            depositPercent: formData.deposit_percent,
            orderNum: formData.order_num,
            isDeposit: 1,
            id: formData.id || null
          };

          let presaleTimes = [];
          for (let i in formData.timeList) {
            let timeObj = formData.timeList[i];
            var t = timeObj.startTime;
            presaleTimes.push({
              startTime: _format(new Date(t[0])),
              endTime: _format(new Date(t[1])),
              saleType: timeObj.saleType,
              price: timeObj.price,
              priceType: timeObj.priceType,
              id: timeObj.id || null
            });
          }

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
          _this.ajaxSave({
            url: DFshop.activeAPI.mallPresaleSave_post,
            data: {
              presale: JSON.stringify(presale),
              presaleTimes: JSON.stringify(presaleTimes)
            },
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/presale/1");
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
      // this.$refs[formName].resetFields();
      window.history.go(-1);
    },
    showDialog() {
      //活动商品弹出框
      this.$refs.goodsDialog.isShow = true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shop_id;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.product_id;
    },
    mallPresalePresaleInfo(id) {
      //获取预售商品信息的方法
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresalePresaleInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          let myData = data.data;
          _this.ruleForm = myData;
          _this.ruleForm.sale_start_time = [
            myData.sale_end_time,
            myData.sale_end_time
          ];
          for (var i = 0; i < myData.timeList.length; i++) {
            let timeObj = myData.timeList[i];
            timeObj.startTime = [timeObj.startTime, timeObj.endTime];
            _this.$set(_this.ruleForm.timeList, i, timeObj);
            _this.countPrice(i);
          }
          _this.boxData = {
            id: myData.product_id,
            pro_price: myData.proPrice,
            pro_name: myData.proName,
            image_url: data.imgUrl + myData.imageUrl,
            stockTotal: myData.proStockTotal
          };
          if (myData.isSpecifica == 1) {
            _this.getSpecificaByProId(myData.product_id);
          }
        }
      });
    },
    getSpecificaByProId(proId) {
      //根据商品id查询规格
      let _this = this;
      _this.mallGetSpecificaByProId({
        proId: proId,
        success(data) {
          _this.specArrList = data.data.list;
          if (_this.table.length > 0) {
            _this.table = [];
          }
          for (var m = 0; m < _this.specArrList[0].specList.length; m++) {
            let t = {
              prop: "specificaValue",
              label: _this.specArrList[0].specList[m].specificaName
            };
            _this.table.push(t);
          }
          let minPrice = 0;
          _this.specArrList.forEach((item, index) => {
            if (minPrice == 0 || minPrice > item.invPrice) {
              minPrice = item.invPrice;
            }
          });
          _this.ruleForm.proPrice = minPrice;
        }
      });
    },
    addPriceAdjustment() {
      //添加一行价格调整的新的空的数据
      let newPrice = {
        startTime: "",
        saleType: 1,
        priceType: 1,
        price: "",
        raisePrice: 0 //上涨 价格
      };
      this.ruleForm.timeList.push(newPrice);
    },
    checkTime(index) {
      //价格调整时间判断
      let _this = this;
      let presaleTime = _this.ruleForm.sale_start_time; //预售时间
      let sStartTime = Lib.M.format(new Date(presaleTime[0])); //活动生效开始时间
      let sEndTime = Lib.M.format(new Date(presaleTime[1])); //活动结束时间

      let delTimeList = new Array();
      var defaultObj = new Object();

      let presaleTimesArray = new Array();
      var flag = true;
      var msg = "";
      var start = new Date(sStartTime.replace("-", "/").replace("-", "/"));
      var ends = new Date(sEndTime.replace("-", "/").replace("-", "/"));
      let timeLists = _this.ruleForm.timeList;
      for (let i = 0; i < timeLists.length; i++) {
        let timeObj = timeLists[i];
        let priceTime = timeObj.startTime; //价格调整选择的时间
        let startTime = Lib.M.format(priceTime[0]);
        let endTime = Lib.M.format(priceTime[1]);
        var types = timeObj.saleType; //选择上涨还是下调
        var startDate = new Date(startTime.replace("-", "/").replace("-", "/"));
        var endDate = new Date(endTime.replace("-", "/").replace("-", "/"));
        var id = timeObj.id;
        var priceType = timeObj.priceType; //价格类型（百分比、价格）

        var price = timeObj.price; //调整比例

        var isNull = false;

        if (startTime == null || startTime == "") {
          isNull = true;
          // flag = false;
          // msg = "请选择价格调整时间";
        } else if (endTime == null || endTime == "") {
          isNull = true;
          // flag = false;
          // msg = "请选择价格调整时间";
        } else if (startDate * 1 >= endDate * 1 && !isNull) {
          flag = false;
          msg = "价格调整活动开始时间必须要早于活动结束时间";
          _this.ruleForm.timeList[i].startTime = "";
        } else if (endDate * 1 > ends * 1 && !isNull) {
          flag = false;
          msg = "价格调整结束时间不能晚于预售活动结束时间";
          _this.ruleForm.timeList[i].startTime = "";
        } else {
          if (!isNull) {
            //判断价格是否重复
            for (let j = 0; j < timeLists.length; j++) {
              let newTimeObj = timeLists[j];
              if (j < i) {
                let t = priceTime;
                var startTime2 = Lib.M.format(t[0]);
                var endTime2 = Lib.M.format(t[1]);
                startTime2 = startTime2.substr(0, 10);
                endTime2 = endTime2.substr(0, 10);

                var startDate2 = new Date(
                  startTime2.replace("-", "/").replace("-", "/")
                );
                var endDate2 = new Date(
                  endTime2.replace("-", "/").replace("-", "/")
                );
                console.log(startDate2, endDate2, "t");
                if (
                  endDate * 1 < startDate2 * 1 ||
                  endDate * 1 < endDate2 * 1
                ) {
                  flag = false;
                }
                if (!flag) {
                  msg = "价格调整的时间不能存在重叠";
                  _this.ruleForm.timeList[j].startTime = "";
                  break;
                }
              }
            }
          }
        }
        //判断定金是否小于向下调整金额
        let minPrice = _this.ruleForm.proPrice;
        if (minPrice > 0 && !isNull) {
          var pPrice = timeObj.price;

          let minPriceVal = _this.jisuanDepositPrice(
            pPrice,
            timeObj.priceType,
            types,
            minPrice
          );
          var depositPercent = _this.ruleForm.deposit_percent; //交纳的定金
          //console.log(minPriceVal+"----"+depositPercent)
          if (minPriceVal <= 0) {
            msg = "您调整的价格不能小于0，请重新输入要调整的价格";
            _this.ruleForm.timeList[i].startTime = "";
            flag = false;
          } else if (minPriceVal <= depositPercent * 1) {
            msg = "定金价格不能大于等于商品最终价格";
            _this.ruleForm.timeList[i].startTime = "";
            flag = false;
          }
        }
        if (!flag) {
          break;
        } else if (!isNull) {
          var obj = {
            startTime: startTime,
            endTime: endTime,
            saleType: types,
            price: price,
            priceType: priceType
          };
          if (id == null || $.trim(id) == "") {
            presaleTimesArray[presaleTimesArray.length] = obj;
          } else {
            //delete defaultObj[id];
            obj.id = id;
            delTimeList[delTimeList.length] = obj;
          }
        }
      }
      if (defaultObj != null) {
        for (var str in defaultObj) {
          var obj = new Object();
          obj.id = str;
          obj.isDelete = 1;
          delTimeList[delTimeList.length] = obj;
        }
      }
      console.log(flag, "flag");
      if (!flag) {
        _this.$message.error(msg);
      }
      return flag;
    },
    jisuanDepositPrice(pPrice, obj, types, proPrice) {
      //计算上涨下调价格
      proPrice = proPrice * 1;
      var val = pPrice * 1;
      var priceTypes = obj;
      if (types == 1) {
        if (priceTypes == 1) {
          //按百分比计算
          val = proPrice + proPrice * (val / 100);
        } else {
          //按价格
          val = proPrice + val;
        }
      } else {
        if (priceTypes == 1) {
          //按百分比计算
          val = proPrice - proPrice * (val / 100);
        } else {
          //按价格
          val = proPrice - val;
        }
      }
      val = Math.round(val * 100) / 100;
      //	console.log("++++++++++++"+val)

      return val;
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
      _this.mallPresalePresaleInfo(_this.$route.params.id);
      _this.isReplacePro = true;
      _this.disabledShop = true;
    } else {
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
};
</script>
<style lang="less">
// .msg-right-item {
//   .el-form-item__error {
//     left: 221px;
//     top: 20%;
//   }
// }
// .time-right-item{
//   .el-form-item__error {
//     left: 369px;
//     top: 20%;
//   }
// }
.price-item2 {
  .el-form-item__error {
    top: 50px;
  }
}
.price-item {
  .el-form-item__error {
    left: 15px;
  }
}
</style>


<style lang="less" scoped>
@import "../../../less/style.less";
.addBond-main {
  padding: 40px 4%;
  .addBond-input {
    width: 220px;
  }
}
</style>


