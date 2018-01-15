<template>
<div class="addLogistics-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/logistics/logistics' }">物流管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑物流信息</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="addLogistics-main">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="模板名称 :" prop="name" required>
      <el-input v-model.trim="ruleForm.name" placeholder="请输入模板名字" class="add-input"></el-input>
      <span class="addLogistics-warn">物流名称限制20字数，1个汉字等于2个数字</span>
    </el-form-item>
    <el-form-item label="默认快递公司 :" prop="expressId" class="icon-warn" required>
      <el-select v-model="ruleForm.expressId" placeholder="请选择活动区域" class="add-input" >
        <el-option :label="option.item_value" :value="option.item_key" :key="option.item_key" v-for="(option,index) in options" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属店铺：" prop="shopId" class="icon-warn" required>
       <el-select v-model="ruleForm.shopId" placeholder="请输入所属店铺" class="add-input" >
        <el-option :label="option.sto_name" :value="option.id" :key="option.id" :aa='option.sto_name' v-for="(option,index) in shopList"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="是否包邮 :" prop="isNoMoney" required>
      <el-radio-group v-model="ruleForm.isNoMoney">
        <el-radio :label="1">自定义运费</el-radio>
        <el-radio :label="2">卖家承担运费</el-radio> 
      </el-radio-group>
    </el-form-item>
    <el-form-item label="计价方式 :" prop="priceType" required v-if="ruleForm.isNoMoney==1">
      <el-radio-group v-model="ruleForm.priceType" @change="validateForm" >
        <el-radio :label="0">统一运费</el-radio>
        <el-radio :label="1">按件数</el-radio>
        <el-radio :label="2">按重量</el-radio>
        <el-radio :label="3">按公里</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运费 :" prop="money"  required v-if="ruleForm.isNoMoney==1 && ruleForm.priceType == 0">
      <el-input  v-model.number="ruleForm.money" class="add-input" >
        <template slot="prepend">¥</template>
      </el-input>
    </el-form-item>
    <el-form-item label="运费 :"  v-if="ruleForm.priceType > 0 && ruleForm.isNoMoney==1">
      <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab log_table">
        <tbody>
        <tr class="order_tab_header">
            <th width="15%">{{titleName[ruleForm.priceType].first}}（{{titleName[ruleForm.priceType].unit}}）</th>
            <th width="15%">运费（元）</th>
            <th width="18%">{{titleName[ruleForm.priceType].jion}}（{{titleName[ruleForm.priceType].unit}}）</th>
            <th width="11%">续费（元）</th>
        </tr>
        <tr>
          <td>
            <el-form-item  prop="firstNums"  >
              <el-input  v-model.number="ruleForm.firstNums" style="width:88px"></el-input>
            </el-form-item>
          </td>
          <td >
            <el-form-item  prop="money">
              <el-input v-model.number="ruleForm.money" style="width:88px"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="addNums">
              <el-input v-model.number="ruleForm.addNums" style="width:88px"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item  prop="addMoney">
              <el-input v-model.number="ruleForm.addMoney" style="width:88px"></el-input>
            </el-form-item>
          </td>
        </tr>
        </tbody>
      </table>
    </el-form-item>
    <el-form-item label="配送区域和运费 :" v-if="ruleForm.isNoMoney==1">
      <el-switch on-text="开启" off-text="关闭" v-model="ruleForm.isResultMoney" class="add-input"></el-switch>
      <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab log_table" v-if="ruleForm.isResultMoney == 1">
          <tbody>
          <tr class="order_tab_header">
              <th width="15%">可配送区域</th>
              <th width="15%" v-if="ruleForm.priceType > 0">{{titleName[ruleForm.priceType].first}}（{{titleName[ruleForm.priceType].unit}}）</th>
              <th width="15%" v-if="ruleForm.priceType > 0">运费（元）</th>
              <th width="15%" v-if="ruleForm.priceType > 0">{{titleName[ruleForm.priceType].jion}}（{{titleName[ruleForm.priceType].unit}}）</th>
              <th width="15%" v-if="ruleForm.priceType > 0">续费（元）</th>
              <th width="15%" v-if="ruleForm.priceType == 0">运费（元）</th>
              <th width="15%">包邮数量</th>
              <th width="15%">包邮价格</th>
          </tr>
          <tr v-for="(row,index) in ruleForm.tableData" :key="index">
            <td  style="border-right:1px solid #dfe6ec;padding:10px;">
              <el-form-item :prop="'tableData.'+index+'.provinceStr'"  
                  :rules="[
                  { required: true, message: '请选择省份'},
                  ]">
                <div class="tabal-region">
                    <p >{{ row.provinceStr }}</p>
                    <p>
                      <a @click="addRegion(index)">编辑</a>
                      <a @click="delDistributionArea(index)">删除</a>
                    </p>
                </div>  
              </el-form-item>
            </td>
            <td v-if="ruleForm.priceType > 0">
              <el-form-item  
              :prop="'tableData.'+index+'.firstNums'" 
              :rules="[
               { required: true, message: '请输入价格'},
                { type: 'number',min:1,max:99999, message: '最多只能输入大于0的5位数'}
              ]">
                <el-input  v-model.number="row.firstNums" style="width:88px"><template slot="prepend">¥</template></el-input>
              </el-form-item>
            </td>
            <td v-if="ruleForm.priceType > 0">
              <el-form-item  :prop="'tableData.'+index+'.money'" 
              :rules="[
                { required: true, message: '请输入大于0的5位小数'},
                { type: 'number',min:0.01,max:99999.99, message: '最多只能输入大于0的5位小数'}
              ]">
                <el-input v-model.number="row.money" style="width:88px"></el-input>
              </el-form-item>
            </td>
            <td v-if="ruleForm.priceType > 0">
              <el-form-item  :prop="'tableData.'+index+'.addNums'" 
              :rules="[
                { required: true, message: '请输入大于0的正整数'},
                { type: 'number',min:1,max:99999, message: '最多只能输入大于0的5位数'}
              ]">
                <el-input v-model.number="row.addNums" style="width:88px"></el-input>
              </el-form-item>
            </td>
            <td v-if="ruleForm.priceType > 0">
              <el-form-item  :prop="'tableData.'+index+'.money'" 
              :rules="[
                {  required: true, message: '请输入大于0的5位小数'},
                { type: 'number',min:0.01,max:99999.99, message: '最多只能输入大于0的5位小数'}
              ]">
                <el-input v-model.number="row.addMoney" style="width:88px"></el-input>
              </el-form-item>
            </td>
            <td v-if="ruleForm.priceType == 0">
              <el-form-item :prop="'tableData.'+index+'.money'" 
              :rules="[
                { required: true, message: '请输入大于0的5位小数'},
                { type: 'number',min:0.01,max:99999.99, message: '最多只能输入大于0的5位小数'}
              ]">
                <el-input v-model.number="row.money" style="width:88px"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item :prop="'tableData.'+index+'.noMoneyNum'" 
              :rules="[
                { type: 'number',min:0,max:99999, message: '最多只能输入大于0的5位数'}
              ]">
                满  <el-input  v-model.number="row.noMoneyNum" style="width:88px"></el-input> 件包邮
              </el-form-item>
            </td>
            <td>
              <el-form-item :prop="'tableData.'+index+'.noMoney'" 
              :rules="[
                { type: 'number',min:0,max:99999.99, message: '最多只能输入大于0的5位小数'}
              ]">
                满  <el-input  v-model.number="row.noMoney" style="width:88px">
              <template slot="prepend">¥</template>
              </el-input>  包邮
              </el-form-item>
            </td>
          </tr>
          </tbody>
        </table>
      <p class="table-button" v-if="ruleForm.isResultMoney == 1" @click="addTable"><a>指定可配送区域和运费</a></p>
    </el-form-item>
    <el-form-item label="包邮数量 :" prop="noMoneyNum" v-if="ruleForm.isNoMoney==1">
      满 <el-input  v-model.number="ruleForm.noMoneyNum" style="width:220px"></el-input> 件包邮
      <span class="addLogistics-warn">不填写代表没有包邮数量</span>
    </el-form-item>
    <el-form-item label="包邮价格 :" prop="noMoney" v-if="ruleForm.isNoMoney==1">
      满 <el-input  v-model.number="ruleForm.noMoney" style="width:220px">
         <template slot="prepend">¥</template>
         </el-input> 包邮
      <span class="addLogistics-warn">不填写代表没有包邮价格</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm()">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
  <el-dialog 
  :visible="dialogVisible" 
  title="选择可配送区域"
  size="small">
    <gt-transger :list="provinceList" :selectList="selectList" :allSelectList="allSelectList" :dialogVisible.sync="dialogVisible" :editIndex="editIndex" 
    @changes="dialogChange"></gt-transger>
  </el-dialog>
  <!-- <el-dialog v-if="dialogVisible"
  title="选择可配送区域"
  :visible.sync="dialogVisible" 
  size="small">
    <div class="dialog-main">
      <el-transfer
        :filterable='false'
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        :right-default-checked="[1]"
        :titles="['城市列表', '已选中城市']"
        v-model="value2"
        :data="provinceList"
        @change="handleChange">
      </el-transfer>
      <div class="shop-textr">
        <el-button type="primary" @click="confirmArea">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </div>
  </el-dialog> -->
</div>
</template>

<script>
import Lib from "assets/js/Lib";
import gtTransger from "./../components/gtTransfer";
export default {
  data() {
    //验证模板名称
    var formName = (rule, value, callback) => {
      // console.log(Lib.M, "Lib.M");
      if (value == "") {
        return callback(new Error("请输入模板名称"));
      } else if (!Lib.M.validateChineseLength(value, 20)) {
        return callback(new Error("物流名称限制20字数，1个汉字等于2个数字"));
      }
      callback();
    };
    //验证公司名称
    var formExpress = (rule, value, callback) => {
      if (this.ruleForm.expressId == "") {
        return callback(new Error("请选快递公司"));
      } else {
        callback();
      }
    };
    //验证数字
    var formNum = (rule, value, callback) => {
      let reg = /^[0-9]{0,5}$/;
      if (value !== "") {
        if (!reg.test(value)) {
          return callback(new Error("最多只能输入5位正整数"));
        }
      }
      callback();
    };
    //验证小数
    var formFloat = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value !== "") {
        if (!reg.test(value)) {
          return callback(new Error("最多只能输入5位小数"));
        }
      }
      callback();
    };
    //验证小数（且大于0）
    var formFloatNotNull = (rule, value, callback) => {
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (value == "") {
        return callback(new Error("请输入大于0的5位小数"));
      }
      if (!reg.test(value) || value <= 0) {
        return callback(new Error("最多只能输入大于0的5位小数"));
      }
      callback();
    };
    //验证数字（且大于0）
    var formNumNotNull = (rule, value, callback) => {
      let reg = /^[0-9]{0,5}$/;
      if (value == "") {
        return callback(new Error("请输入大于0的5位正整数"));
      }
      if (!reg.test(value) || value <= 0) {
        return callback(new Error("最多只能输入大于0的5位正整数"));
      }
      callback();
    };
    return {
      ruleForm: {
        name: "",
        expressId: "",
        shopId: "",
        priceType: 0,
        money: "",
        firstNums: "",
        addNums: "",
        addMoney: "",
        noMoneyNum: "",
        noMoney: "",
        isNoMoney:1,
        tableData: []
      },
      provinceList: [], //省份集合
      selectList: [], //已选的省份集合(单个运费选中的省份集合)
      allSelectList:[],//所有选中的省份集合(每个省份只能设置一次运费)
      value2: [],
      filterMethod(h, option) {
        return "<span>" + option.key + " -" + option.label + "</span>";
      },
      area: [],
      rules: {
        name: [{ validator: formName, trigger: "blur" }],
        expressId: [
          { type: "object", validator: formExpress, trigger: "change,blur" }
        ],
        shopId: [
          {
            required: true,
            type: "number",
            message: "请选择所属店铺",
            trigger: "change"
          }
        ],
        priceType: [{ type: "number", message: "请填计价方式", trigger: "change" }],
        money: [{ validator: formFloatNotNull, trigger: "blur" }],
        firstNums: [{ validator: formNumNotNull, trigger: "blur" }],
        addNums: [{ validator: formNumNotNull, trigger: "blur" }],
        addMoney: [{ validator: formFloatNotNull, trigger: "blur" }],
        noMoneyNum: [{ validator: formNum, trigger: "blur" }],
        noMoney: [{ validator: formFloat, trigger: "blur" }]
      },
      options: [],
      dialogVisible: false,
      Data: [],
      shopList: [],
      titleName: {
        1: { first: "首件", jion: "续件", unit: "个" },
        2: { first: "首重", jion: "续重", unit: "Kg" },
        3: { first: "首公里", jion: "续公里", unit: "km" }
      },
      editIndex:-1
    };
  },
  components: {
    gtTransger
  },
  watch: {
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    confirmArea() {
      console.log(this.value2);
    },
    validateForm() {
      this.$refs.ruleForm.validate();
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = _this.$refs[formName].model;
          let express = formData.express;
          let freight = {
            name: formData.name,
            shopId: formData.shopId,
            isNoMoney: formData.isNoMoney || 1,
            noMoneyNum: formData.noMoneyNum || 0,
            noMoney: formData.noMoney||0,
            isResultMoney: formData.isResultMoney ? 1 : 0,
            expressId:  formData.expressId,
            express: formData.expressId.item_value,
            id: formData.id || null,
            money: formData.money,
            priceType:formData.priceType,
            firstNums:formData.firstNums || 0,
            addNums: formData.addNums || 0,
            addMoney: formData.addMoney || 0
          };
          //循环快递公司
          for(let i = 0; i < _this.options.length; i++){
            let expressObj = _this.options[i];
            if(expressObj.item_key == formData.expressId){
              freight.express = expressObj.item_value;
              break;
            }
          }
          let detail = [];
          //设置了配送区域和运费
          if(formData.isResultMoney == 1){
            let list = formData.tableData;
            if(list == null || list.length  == 0){
               _this.$message.error("请填写基本信息");
               return;
            }
            list.forEach((item,i)=>{
              let selectList = item.selectList;
              let obj = {
                id : item.id || null,
                freightId: formData.id || null,
                expressId:  formData.expressId,
                express: freight.express,
                money: item.money || 0,
                noMoneyNum: item.noMoneyNum || 0,
                isDelete: item.isDelete || 0,
                noMoney: item.noMoney || 0,
                firstNums: item.firstNums || 0,
                addNums: item.addNums || 0,
                addMoney: item.addMoney || 0
              };
              let proId = [];
              let proStr = [];
              let provinceList = [];
              selectList.forEach((sitems,i)=>{
                if(sitems.select){
                  proId.push(sitems.provinceId);
                  proStr.push(sitems.provinceName);
                  provinceList.push({
                    id : sitems.id || null,
                    freightId:  formData.id || null,
                    freightDetailId: item.id || null,
                    provinceId: sitems.provinceId,
                    provinceName: sitems.provinceName
                  });
                }
              });
              obj.provincesId = proId.toString();
              obj.provinces  = proStr.toString();
              obj.provinceList = provinceList;
              detail.push(obj);
            });
          }
          console.log(freight,"freight");
          console.log(detail,"detail");
          // return;

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallFreightSave_post,
            data: {
              freight : JSON.stringify(freight),
              detail: JSON.stringify(detail)
            },
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/logistics/logistics");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消按钮（返回上一页）
    resetForm(formName) {
      //this.$refs[formName].resetFields();
      window.history.go(-1);
    },
    addTable() {
      var newTab = {
        name: "",
        num: "",
        money: "",
        provinceStr : "",
        firstNums: "",
        addMoney: "",
        noMoneyNum: "",
        noMoney: "",
        selectList: [],
        id: null
      };
      this.ruleForm.tableData.push(newTab);
      this.ruleForm.tableData.splice(1,0);
      console.log(this.ruleForm,"3232");
    },
    //弹出框返回
     dialogChange(changeData){
      console.log("返回：",changeData);
      let index = changeData[0];
      let selectList = changeData[1];
      let dataList = this.ruleForm.tableData;
      let data = dataList[index];
      let provinceStr = [];
      let allSelectList = this.allSelectList;
      selectList.forEach((item,index)=>{
        if(item.select){
          provinceStr.push(item.provinceName);
          allSelectList.push(item.id);
        }
      });
      data.provinceStr = provinceStr.toString();
      data.selectList = selectList;
      this.$set(dataList,index,data);
      console.log(dataList,"dataList")
      this.validateForm();
    },
    addRegion(index) {
      this.provinceList = this.area;
      this.dialogVisible = true;
      this.editIndex = index;
      this.selectList = this.ruleForm.tableData[index].selectList || [];
      console.log( this.provinceList," this.provinceList",this.editIndex)
    },
    delDistributionArea(index) {
      let _this = this;
      let msg = {
        dialogTitle: "确认删除吗？",
        dialogMsg: '删除后，数据将无法恢复哦~',
        callback: {
          btnOne: function() {
            _this.ruleForm.tableData.splice(index,1);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    handleChange(value, direction, movedKeys) {
      //todo
      console.log(value, direction, movedKeys);
      let dels = [];
      for (let i = 0; i < value.length; i++) {
        dels.push(this.provinceList[i]);
      }
      console.log(dels, "所选地址");
    },
    //根据运费id获取运费信息
    mallFreightInfo(id) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightInfo_post,
        data: {
          id: id
        },
        success: function(data) {
          let myData = data.data;
          myData.isResultMoney = myData.isResultMoney == 1 ? true : false;
          myData.tableData=[];
          _this.ruleForm = myData;
          let detailList = myData.detailList || [];
          if(detailList != null && detailList.length > 0){
            let list = [];
            //循环运费详情
            detailList.forEach((item,i)=>{
              let provinceList = item.provinceList;
              //循环省份集合
              provinceList.forEach((pitem,k)=>{
                pitem.select = true;
                _this.$set(provinceList,k,pitem);
                _this.allSelectList.push(pitem.provinceId);
              });
              list.push({
                provinceStr : item.provinces,
                firstNums: item.firstNums,
                money: item.money,
                addNums: item.addNums,
                addMoney: item.addMoney,
                noMoneyNum: item.noMoneyNum,
                noMoney: item.noMoney,
                selectList: provinceList,
                id: item.id
              });
            });
            _this.$set(_this.ruleForm,'tableData',list)
            //_this.ruleForm.tableData = list;
            _this.ruleForm.express = myData.expressId;
          }
          console.log(_this.ruleForm, "_this.ruleForm1111111111");
          console.log(detailList , "detailList")
        }
      });
    },
    //获取快递公司
    mallFreightExpressList() {
      let _this = this;
      _this.options = "";
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightExpressList_post,
        success: function(data) {
          _this.options = data.data;
          let expressId = _this.ruleForm.expressId;
          if (expressId == "") {
            _this.ruleForm.expressId = _this.options[0].item_key;
          }
        }
      });
    },
    //获取店铺列表
    mallShopList() {
      let _this = this;
      _this.shopList = "";
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallStoreStoreList_post,
        success: function(data) {
          _this.shopList = data.data;
          let shopId = _this.ruleForm.shopId;
          if (shopId <= 0) {
            _this.ruleForm.shopId = _this.shopList[0].id;
          }
          // console.log(_this.shopList);
        }
      });
    },
    //获取省份
    mallGetArea() {
      let _this = this;
      _this.area = [];
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallGetArea_post,
        success: function(data) {
          _this.area = data.data;
          _this.provinceList = _this.area;
          // console.log(_this.area);
        }
      });
    }
  },
  mounted() {
    let id = this.$route.params.id;
    if (id != "" && id > 0) {
      this.mallFreightInfo(id);
    }
    this.mallShopList();
    this.mallFreightExpressList();
    this.mallGetArea();
  },
  beforeMount() {}
};
</script>

<style lang="less">
.log_table {
  .el-form-item__error {
    width: 100%;
    position: relative;
  }
}
</style>
<style lang="less" scoped>
@import "../../less/addLogistics.less";
</style>

