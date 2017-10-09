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
            <el-form ref="form" :model="setupForm" label-width="90px">
              <el-form-item label="积分奖励 :">
                每推荐1人关注商城公众号，可奖励
                <el-input v-model="setupForm.integral" class="mix-input"></el-input>
                积分
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="成为销售员 :">
                 当消费金额满
                <el-input v-model="setupForm.salesman" class="mix-input">
                  <template slot="prepend">¥</template>
                </el-input>
                可申请成为超级销售员
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="提现规则 :">
                <el-radio-group v-model="setupForm.withdraw">
                  <p style="margin-bottom: 20px;">
                    <el-radio label="1">
                      最低可提现
                      <el-input v-model="setupForm.withdraw1" class="mix-input">
                        <template slot="prepend">¥</template>
                      </el-input>
                    </el-radio>
                  </p>
                  <p>
                  <el-radio label="2">
                    按
                    <el-input v-model="setupForm.withdraw2" class="mix-input">
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
                  v-model="setupForm.explain"
                  style="width:358px;">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
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
                  <el-select v-model="bondShop" placeholder="请选择">
                    <el-option
                      class="max-input"
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  活动状态 :
                  <el-select v-model="bondStatu" placeholder="请选择">
                    <el-option
                      class="max-input"
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
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
              <el-table
                :data="goodsData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="shop"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  label="活动状态">
                   <template scope="scope">
                     <span v-if="scope.row.statu === 1">
                       已启动
                     </span>
                     <span v-if="scope.row.statu === 2">
                       已禁用
                     </span>
                   </template>
                </el-table-column>
                <el-table-column
                  prop="date"
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
            <el-table
              :data="examineData"
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
                prop="man"
                label="推荐人">
              </el-table-column>
              <el-table-column
                prop="date"
                label="推荐时间">
              </el-table-column>
              <el-table-column
                label="审核状态">
                <template scope="scope">
                      审核中
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
            <el-table
              :data="saleData"
              style="width: 100%">
              <el-table-column
                prop="name"
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
                prop="money"
                label="提现金额（元）">
              </el-table-column>
              <el-table-column
                prop="money"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="money"
                label="状态">
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
        integral: '',//积分
        salesman: '',//销售员
        withdraw: 1,//提现
        withdraw1:'',//最低提现
        withdraw2:'',//按倍数提现
        explain: '',//说明
      },
      goodsData: [{
        date: '2016-05-02',
        name: '手机',
        shop: '谷通科技2',
        statu: 1
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        shop: '谷通科技1',
        statu: 2
      }, {
        date: '2016-05-01',
        name: '帽子',
        shop: '谷通科技6',
        statu: 1
      }, {
        date: '2016-05-03',
        name: '裙子',
        shop: '谷通科技8',
        statu: 2
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      examineData: [{
        date: '2016-05-02',
        name: '手机',
        man: '谷通科技2',
        phone:'10101010101'
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        man: '谷通科技1',
        phone:'10101010102'
      }, {
        date: '2016-05-01',
        name: '帽子',
        man: '谷通科技6',
        phone:'10101010103'
      }, {
        date: '2016-05-03',
        name: '裙子',
        man: '谷通科技8',
        phone:'10101010104'
      }],
      saleData:[{
        date: '2016-05-02',
        name: '手机',
        man: '谷通科技2',
        phone:'10101010101',
        jifeng:'0',
        money:'0.00'
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        man: '谷通科技1',
        phone:'10101010102',
        jifeng:'0',
        money:'0.00'
      }, {
        date: '2016-05-01',
        name: '帽子',
        man: '谷通科技6',
        phone:'10101010103',
        jifeng:'0',
        money:'0.00'
      }, {
        date: '2016-05-03',
        name: '裙子',
        man: '谷通科技8',
        phone:'10101010104',
        jifeng:'0',
        money:'0.00'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      bondShop:'',
      bondStatu:'',
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
    onSubmit() {
        console.log('submit!');
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
    }
  },
  
  mounted(){
    this.activeName = this.$route.params.activeName;
    this.restaurants = this.loadAll();
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
