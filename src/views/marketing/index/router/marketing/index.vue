<template>
  <div class="common-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>超级营销员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本规则设置" name="1">
          <div class="common-content" style="padding: 40px 0;">
            <el-form ref="setupForm" :model="setupForm" label-width="90px">
              <el-form-item label="积分奖励 :">
                每推荐1人关注商城公众号，可奖励
                <el-input v-model="setupForm.integralReward" class="mix-input"></el-input>
                积分
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="成为销售员 :">
                 当消费金额满
                <el-input v-model="setupForm.consumeMoney" class="mix-input">
                  <template slot="prepend">¥</template>
                </el-input>
                可申请成为超级销售员
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="提现规则 :">
                <el-radio-group v-model="setupForm.withdrawalType">
                  <p style="margin-bottom: 20px;">
                    <el-radio :label="1">最低可提现
                      <el-input v-model="setupForm.withdrawalLowestMoney" class="mix-input">
                        <template slot="prepend">¥</template>
                      </el-input>
                    </el-radio>
                  </p>
                  <p>
                  <el-radio :label="2">按
                    <el-input v-model="setupForm.withdrawalMultiple" class="mix-input">
                      <template slot="prepend">¥</template>
                    </el-input>倍数提现
                  </el-radio>
                  </p>
                </el-radio-group>
                <p class="p-warn">提现规则为最低1元，最高2000元</p>
              </el-form-item>
              <el-form-item label="经纪人说明 :">
               <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="setupForm.sellerRemark"
                  style="width:358px;">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('setupForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品佣金设置" name="2">
           <div class="common-content">
             <div class="index-shopInfo">
              <div class="index-input-box">
                <span>
                  选择店铺 :
                  <el-select v-model="shopId" placeholder="请选择" @change="searchChose">
                    <el-option class="max-input" v-for="item in shopList"
                      :key="item.id" :label="item.sto_name" :value="item.id">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  活动状态 :
                  <el-select v-model="isUse" placeholder="请选择" @change="searchChose">
                    <el-option class="max-input" label="已禁用" :value="0"></el-option>
                    <el-option class="max-input" label="已启用" :value="1"></el-option>
                  </el-select>
                </el-col>
                </span>
              </div>
              <router-link to="/addBond">
                <el-button 
                  type="primary"
                >新建商品佣金</el-button>
              </router-link>
             </div>
              <el-table :data="goodsData.page.subList" style="width: 100%">
                <el-table-column
                  prop="pro_name"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="shopName"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  label="活动状态">
                   <template scope="scope">
                     <span v-if="scope.row.is_use === 1">
                       已启动
                     </span>
                     <span v-if="scope.row.is_use === 0">
                       已禁用
                     </span>
                   </template>
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      class="buttonBlue"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      v-if="scope.row.statu === 2"
                      >启用</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      v-if="scope.row.statu === 1"
                      >禁用</el-button>
                    <el-button
                      size="small"
                      class="buttonBlue"
                      >预览</el-button>
                    <el-button
                      size="small"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <content-no :show="contentNo"></content-no>
           </div>
        </el-tab-pane>
        <el-tab-pane label="推荐审核" name="3">
          <div class="common-content">
            <div class="index-shopInfo">
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="销售员名字/手机"
                @select="handleSelect"
                icon="search"
              ></el-autocomplete>
            </div>
            <el-table :data="examineData.page.subList" style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="man"
                label="推荐人">
              </el-table-column>
              <el-table-column
                prop="apply_time"
                label="推荐时间">
              </el-table-column>
              <el-table-column
                label="审核状态">
                <template scope="scope">
                  <span v-if="scope.row.check_status == 0">未审核</span>
                  <span v-if="scope.row.check_status == 1">审核通过</span>
                  <span v-if="scope.row.check_status == -1">审核不通过</span>
                  <span v-if="scope.row.check_status == -2">待审核销售员</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    class="buttonBlue" 
                    @click="passExamine">通过</el-button>
                  <el-button
                    size="small"
                      @click="refuseExamine"
                    >拒绝</el-button>
                </template>
              </el-table-column>
              </el-table-column>
            </el-table>
            <content-no></content-no>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售员管理" name="4">
          <div class="common-content">
            <div class="index-shopInfo">
              <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="销售员名字/手机"
                @select="handleSelect"
                icon="search"
              ></el-autocomplete>
            </div>
            <el-table
              :data="saleData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="jifeng"
                label="积分">
              </el-table-column>
              <el-table-column
                prop="money"
                label="销售额（元）">
              </el-table-column>
              <el-table-column
                prop="money"
                label="总佣金（元）">
              </el-table-column>
              <el-table-column
                prop="money"
                label="冻结佣金（元）">
              </el-table-column>
              <el-table-column
                prop="date"
                label="加入时间">
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="180">
                <template scope="scope">
                  <el-button
                    size="small"
                    class="buttonBlue"
                    >推荐列表</el-button>
                  <el-button
                    size="small"
                    class="buttonBlue"
                    >提现记录</el-button>
                  <el-button
                    size="small"
                    >暂停</el-button>
                </template>
              </el-table-column>
              </el-table-column>
            </el-table>
            <content-no></content-no>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提现列表" name="5">
           <div class="common-content">
            <div class="index-shopInfo">
              <div class="index-input-box">
                <span>
                <el-autocomplete
                  v-model="cashShop"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="销售员名字/手机"
                  @select="handleSelect"
                  icon="search"
                ></el-autocomplete>
                </span>
                <span>
                  提现时间 ：
                  <el-date-picker
                    v-model="cashDate"
                    type="datetimerange"
                    placeholder="选择时间范围">
                  </el-date-picker>
                </span>
              </div>
            </div>
            <el-table :data="saleData.page.subList" style="width: 100%">
              <el-table-column
                prop="applay_time"
                label="提现时间">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="名字">
              </el-table-column>
              <el-table-column
                prop="jifeng"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="withdraw_money"
                label="提现金额（元）">
              </el-table-column>
              <el-table-column
                prop="withdraw_order_no"
                label="订单号">
              </el-table-column>
              <el-table-column label="状态">
                <template scope="scope">
                  <span v-if="scope.row.withdraw_status == 1">待打款</span>
                  <span v-if="scope.row.withdraw_status == 2">已打款</span>
                </template>
              </el-table-column>
            </el-table>
            <content-no></content-no>
          </div>
        </el-tab-pane>
      </el-tabs>
     
    </div>
</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {

  components: {
    contentNo,
  },
  data () {
    return {
      activeName: '1' ,
      contentNo:'commission',
      cashDate: [],
      cashShop:'',
      setupForm: {
        integralReward: '',//积分
        consumeMoney: '',//销售员
        withdrawalType: 1,//提现
        withdrawalLowestMoney:'',//最低提现
        withdrawalMultiple:'',//按倍数提现
        sellerRemark: '',//说明
      },
      goodsData: {
        page:{
          subList:[],
        }
      },
      shopList: [],
      examineData: {
        page:{
          subList:[],
        }
      },
      saleData:{
        page:{
          subList:[],
        }
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      shopId:'',
      isUse:'',
      restaurants: [],
      state4: '',
      timeout:  null,
    }
  },
  watch:{
    activeName :function(t,f){
      console.log(t,f);
      let _href= window.location.href;
      sessionStorage.setItem('href', _href);
    },
    $route :function(t,f){
      console.log(t,f);
      this.activeName= t.params.activeName;
    }
  },
  methods: {
    onSubmit(formName) {
      //onsole.log('submit!');
      let _this= this;
      let param = {};
      param = _this.$refs[formName].model;
      param = encodeURI(_this.$refs[formName].model.sellerRemark);
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersSaveSellerSet_post,
        'data':{sellerSet:param},
        'success':function (data){
           _this.$message({
              message: '保存成功',
              type: 'success'
          });
          _this.jumpRouter('/marketing/1');
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(tab, event) {
     let _activeName = tab.name;
     this.$router.push(_activeName);
    },
    InvalidData(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此团购活动失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行团购',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    },
    deleteData(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此团购活动吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    },
    refuseExamine(){
      let _this= this;
      let msg ={
        'dialogTitle':'确定通过该审核吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    },
    passExamine(){
      let _this= this;
      let msg ={
        'dialogTitle':'确定通过该审核吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg);   
    },
    /**
     * 搜索
     * 
     **/ 
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    searchChose(){
      this.mallSellersJoinProduct(1);
    },
    mallSellersGetSellerSet(){//超级销售员基础设置
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersGetSellerSet_post,
        'success':function (data){
           _this.setupForm = data.data.sellerSet;
           console.log(_this.setupForm,'setupForm')
        }
      });
    },
    mallSellersJoinProduct(pageNum){//商品佣金设置列表
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersJoinProduct_post,
        'data':{
            curPage : pageNum,
            shopId : _this.shopId,
            isUse : _this.isUse
        },
        'success':function (data){
           _this.goodsData = data.data;
           $.each(_this.goodsData.page.subList,function(i){
             let oldTime = this.create_time;
             this.create_time = Lib.M.format(oldTime);
           });
           console.log(_this.goodsData,'goodsData')
        }
      });
    },
    mallSellersCheckList(pageNum){//推荐审核列表
      let _this= this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersCheckList_post,
        'data':{
            curPage : pageNum,
            keyWord : _this.keyWord
        },
        'success':function (data){
           _this.examineData = data.data;
           $.each(_this.examineData.page.subList,function(i){
             let oldTime = this.apply_time;
             this.apply_time = Lib.M.formatNot(oldTime);
           });
           console.log(_this.examineData,'examineData')
        }
      });
    },
    mallSellersWithDrawList(pageNum){//提现列表
      let _this= this;
      let startTime = '';
      let endTime = '';

      Lib.M.ajax({
        'url': DFshop.activeAPI.mallSellersWithDrawList_post,
        'data':{
            curPage : pageNum,
            keyWord : _this.keyWord_tixian,
            startTime : startTime,
            endTime : endTime
        },
        'success':function (data){
           _this.saleData = data.data;
           $.each(_this.saleData.page.subList,function(i){
             let oldTime = this.applay_time;
             this.apply_time = Lib.M.format(oldTime);
           });
           console.log(_this.saleData,'saleData')
        }
      });
    }
  },
  
  mounted(){
    let _this = this;
    _this.activeName = _this.$route.params.activeName;
    _this.restaurants = _this.loadAll();

    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
        console.log(_this.shopList,'shopList')
      }
    });
    _this.mallSellersGetSellerSet();
    _this.mallSellersJoinProduct(1);
    _this.mallSellersCheckList(1);
    _this.mallSellersWithDrawList(1);
  },
  // destroyed () {
  //   console.log(1,'11*************');
  //   sessionStorage.removeItem('href');
  // }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
