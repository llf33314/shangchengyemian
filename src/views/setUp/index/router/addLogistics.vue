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
    <el-form-item label="模板名称 :" prop="ruleForm.name">
      <el-input v-model="ruleForm.name" placeholder="请输入模板名字" class="add-input"></el-input>
      <p class="addLogistics-warn">物流名称限制20字数，1个汉字等于2个数字，符号。</p>
    </el-form-item>
    <el-form-item label="默认快递公司 :" prop="express" class="icon-warn">
      <el-select v-model="ruleForm.express" placeholder="请选择活动区域" class="add-input" @change="aaa()">
        <el-option :label="option.item_value" :value="option.item_key" :key="option.item_key" v-for="(option,index) in options" ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属店铺：" prop="shopId" class="icon-warn">
       <el-select v-model="ruleForm.shopId" placeholder="请输入所属店铺" class="add-input" @click="aaa(ruleForm.shopId)">
        <el-option :label="option.sto_name" :value="option.id" :key="option.id" :aa='option.sto_name' v-for="(option,index) in shopList"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="计价方式 :" prop="ruleForm.priceType">
      <el-radio-group v-model="ruleForm.priceType" >
        <el-radio :label="0">统一运费</el-radio>
        <el-radio :label="1">按件数</el-radio>
        <el-radio :label="2">按重量</el-radio>
        <el-radio :label="3">按公里</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运费 :" prop="money">
      <el-input  v-model="ruleForm.money" class="add-input" v-if="ruleForm.priceType == 0">
        <template slot="prepend">¥</template>
      </el-input>
      <el-table
        :data="Data"
        style="width: 100%"
        v-else-if="ruleForm.priceType == 1">
        <el-table-column
          prop="date"
          label="首件（个）">
          <template scope="scope">
            <el-input  v-model="scope.row.firstNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="运费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.money" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续件（个）">
          <template scope="scope">
            <el-input v-model="scope.row.addNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.addMoney" style="width:88px"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="Data"
        style="width: 100%"
        v-else-if="ruleForm.priceType == 2">
        <el-table-column
          prop="date"
          label="首重（Kg）">
          <template scope="scope">
            <el-input  v-model="scope.row.firstNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="运费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.money" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续重（Kg）">
          <template scope="scope">
            <el-input v-model="scope.row.addNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.addMoney" style="width:88px"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="Data"
        style="width: 100%"
        v-else>
        <el-table-column
          prop="date"
          label="首公里（km）">
          <template scope="scope">
            <el-input  v-model="scope.row.firstNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="运费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.money" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续公里（km）">
          <template scope="scope">
            <el-input v-model="scope.row.addNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="续费（元）">
          <template scope="scope">
            <el-input v-model="scope.row.addMoney" style="width:88px"></el-input>
          </template>
        </el-table-column>
      </el-table>

    </el-form-item>
    <el-form-item label="配送区域和运费 :" >
      <el-switch on-text="开启" off-text="关闭" v-model="ruleForm.isResultMoney" class="add-input"></el-switch>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-if="ruleForm.isResultMoney == 1">
        <el-table-column
          label="可配送区域">
          <template scope="scope">
            <div class="tabal-region">
              <p>{{ scope.row.dels }}</p>
              <p>
                <a @click="addRegion(scope.row.dels)">编辑</a>
                <a @click="delDistributionArea(scope.row)">删除</a>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="首件（个）">
          <template scope="scope">
            <el-input  v-model="scope.row.firstNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="运费（元）">
          <template scope="scope">
            <el-input  v-model="scope.row.money" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="续件（个）">
          <template scope="scope">
            <el-input  v-model="scope.row.addNums" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="续费（元）">
          <template scope="scope">
            <el-input  v-model="scope.row.addMoney" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="包邮数量">
          <template scope="scope">
            满  <el-input  v-model="scope.row.noMoneyNum" style="width:88px"></el-input> 件包邮
          </template>
        </el-table-column>
        <el-table-column
          label="包邮价格">
          <template scope="scope">
            满  <el-input  v-model="scope.row.noMoney" style="width:88px">
              <template slot="prepend">¥</template>
              </el-input>  包邮
          </template>
        </el-table-column>
      </el-table>
      <p class="table-button" v-if="ruleForm.isResultMoney == 1" @click="addTable"><a>指定可配送区域和运费</a></p>
    </el-form-item>
    <el-form-item label="包邮数量 :">
      满 <el-input  v-model="ruleForm.noMoneyNum" style="width:220px"></el-input> 件包邮
      <p class="addLogistics-warn">不填写代表没有包邮数量</p>
    </el-form-item>
    <el-form-item label="包邮价格 :" >
      满 <el-input  v-model="ruleForm.noMoney" style="width:220px">
         <template slot="prepend">¥</template>
         </el-input> 包邮
      <p class="addLogistics-warn">不填写代表没有包邮价格</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
  <el-dialog
  title="选择可配送区域"
  :visible.sync="dialogVisible"
  size="small">
    <div class="dialog-main">
      <el-transfer
        filterable='false'
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        :right-default-checked="[1]"
        :titles="['城市列表', '已选中城市']"
        v-model="value2"
        :data="data2"
        @change="handleChange">
      </el-transfer>
      <div class="shop-textr">
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import Lib from 'assets/js/Lib';
  export default {
    
    data() {
      var checkRegion = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择快递公司'));
        }
      };
      var checkshop = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属店铺'));
        }
      };
      return {
         ruleForm: {
          priceType: 0,
        },
        data2:[],
        value2: [],
        filterMethod(query, item) {
          // return item.pinyin.indexOf(query) > -1;
          return null;
        },
        area:[],
        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          region: [
            { validator: checkRegion, trigger: 'change' }   
          ],
          shop: [
            { validator: checkshop, trigger: 'change' }
          ],
          money: [
            { required: true, message: '请输入运费', trigger: 'blur' }
          ],
          priceType: [
            { required: true, message: '请填计价方式', trigger: 'change' }
          ]
        },
        tableData: [{
            dels: '北京,上海,北京,上海,北京,上海',
            freight: '',
            num: '',
            money:''
          }],
        options:[],
        dialogVisible : false,
        Data: [],
        shopList:[],
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let pfName = _this.$refs[formName].model;
            let freight = {};
            freight["name"]=pfName.name;
            freight["shopId"]=pfName.shopId;
            freight["isNoMoney"]=pfName.isNoMoney;
            freight["noMoneyNum"]=pfName.noMoneyNum;
            freight["noMoney"]=pfName.noMoney;
            freight["isResultMoney"]=pfName.isResultMoney;
            freight["expressId"]=pfName.expressId;
            freight["express"]=pfName.express;
            if(pfName.id != null && pfName.id != ""){
              freight.id = pfName.id;
            }
            var params = {};
            params["freight"] = JSON.stringify(freight);
            // if(dDetailObj != null){
            //   params["delDetail"] = JSON.stringify(dDetailObj);
            // }
            // if(dProvinceObj != null){
            //   params["delPro"] = JSON.stringify(dProvinceObj);
            // }
            Lib.M.ajax({
              'url': DFshop.activeAPI.mallFreightSave_post,
              'data':{
                params: params
              },
              'success':function (data){
                //console.log(_this.ruleForm);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addTable(){
        var newTab = {
            dels: '',
            name: '',
            num: '',
            money:''
        }
        this.tableData.push(newTab);
      },
      addRegion(dels){
        this.data2 = this.generateData2();
        console.log(dels);
        this.dialogVisible = true;
      },
      delDistributionArea(row){
        let _this= this;
        let msg = {
          'dialogTitle': '确认删除吗？',
          // 'dialogMsg': '删除后，数据将无法恢复哦~',
          'callback': {
          'btnOne': function () {
            
          }
          }
        };
        _this.$root.$refs.dialog.showDialog(msg);
      },
      handleChange(value, direction, movedKeys) {
        //todo
        console.log(value, direction, movedKeys);
        let dels=[];
        for(let i=0; i<value.length;i++){
          dels.push(this.data2[i]);
        }
        // this.tableData[0].dels = ;
        console.log(dels,'所选地址');
      },
      aaa(e,index){
        // let _aa = this.options[e].aa
        console.log(e,e);
        //console.log(this.ruleForm.express);
      },
      mallFreightInfo(id){
        let _this= this;
        _this.ruleForm = '';
        Lib.M.ajax({
          'url': DFshop.activeAPI.mallFreightInfo_post,
          'data':{
            id :id 
          },
          'success':function (data){
            _this.ruleForm = data.data;
            //console.log(_this.ruleForm);
          }
      });
    },
    mallFreightExpressList(){
      let _this= this;
      _this.options = '';
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallFreightExpressList_post,
        'success':function (data){
          _this.options = data.data;
          //console.log(_this.options);
        }
      });
    },
    mallShopList(){
      let _this= this;
      _this.shopList = '';
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallStoreStoreList_post,
        'success':function (data){
          _this.shopList = data.data;
         // console.log(_this.shopList);
        }
      });
    },
    mallGetArea(){
      let _this= this;
      _this.area = [];
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallGetArea_post,
        'success':function (data){
          _this.area = data.data;
          //console.log(_this.area);
        }
      });
    },
    generateData2(){
        const data = [];
        const cities = this.area;
        cities.forEach((city, index) => {
           data.push({
             label: city.city_name,
             key: city.city_parent
          });
         });
        return data;
      },
      // filterMethod(query, item) {
      //   console.log(this.data2)
      //   return item.cities.indexOf(query) > -1;
      // },
    },
    mounted(){
      if(this.$route.params.id != '' && this.$route.params.id !='undefined'){
        this.mallFreightInfo(this.$route.params.id);
      }
      this.mallFreightExpressList();
      this.mallShopList();
    }, 
    beforeMount(){
      this.mallGetArea();
    }, 

  }
</script>

<style lang="less" scoped>
@import '../../less/addLogistics.less';
</style>
