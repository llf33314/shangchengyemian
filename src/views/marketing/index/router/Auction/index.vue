<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>拍卖管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="拍卖管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo">
                    <div class="index-input-box">
                        <div class="p-box" style="margin-bottom: 20px;">
                            <div>
                                <span>
                                    选择活动状态 :
                                    <el-select v-model="goodsShop" placeholder="请选择">
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
                                    选择时间 :
                                    <el-select v-model="goodsShop" placeholder="请选择">
                                    <el-option
                                        class="max-input"
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                    </el-select>
                                </span>
                            </div>
                        <span>
                            <router-link >
                                <el-button 
                                type="warning"
                                ><i class="iconfont icon-cplay1"></i>
                                视频教程</el-button>
                            </router-link>
                        </span>
                        </div>
                    </div>
                    <router-link to="/auction/addauction">
                    <el-button 
                        type="primary"
                    >新建拍卖</el-button>
                    </router-link>
                </div>
                <el-table
                    :data="goodsData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="拍卖商品">
                    </el-table-column>
                    <el-table-column
                        prop="shop"
                        label="所属店铺">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="起拍价(元)">
                    </el-table-column>
                    <el-table-column
                        label="结束价(元)">
                        <template scope="scope">
                            <span v-if="scope.row.statu === 1">
                            进行中
                            </span>
                            <span v-if="scope.row.statu === 2">
                            已结束
                            </span>
                            <span v-if="scope.row.statu === 0">
                            未开始
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="有效时间">
                    </el-table-column>
                     <el-table-column
                        prop="date"
                        label="活动状态">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="120">
                    <template scope="scope">
                        <el-button
                        size="small"
                        @click="handleDelete()"
                        >删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="保证金管理" name="2">
                <div class="common-content">
                    <el-table
                        ref="multipleTable"
                        :data="shopData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        prop="name"
                        label="拍卖商品">
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="所属店铺">
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="竞拍编号">
                        </el-table-column> 
                        <el-table-column
                        prop="href"
                        label="保证金金额">
                        </el-table-column> 
                        <el-table-column
                        prop="href"
                        label="保证金状态">
                        </el-table-column> 
                        <el-table-column
                        prop="href"
                        label="支付时间">
                        </el-table-column> 
                        <el-table-column
                        prop="href"
                        label="返还时间">
                        </el-table-column> 
                        <el-table-column
                            label="操作">
                        <template scope="scope">
                             <el-button
                            size="small"
                            class="buttonBlue"
                            @click="viewDetails()"
                            >退保证金</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-dialog
                        title="退保证金"
                        :visible.sync="dialogViewDetails"
                        size="tiny">
                        <div class="pifa-dialog-ul">
                            <p class="pifa-li">
                                <span>退保证金:</span>
                                <span>¥ 144.00</span>
                            </p>
                        </div>
                         <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogViewDetails = false">退保证金</el-button>
                            <el-button @click="dialogViewDetails = false">取 消</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
        <content-no :show="contentNo"></content-no>
    </div>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data () {
    return {
      contentNo:'GSmodule',
      activeName:'2',
      goodsShop:'',
      goodsStatu:'',
      dialogVisible: false,
      startTime:'',
      endTime:'',
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
        statu: 0
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
      shopData: [{
        date: '2016-05-02',
        name: '手机',
        shop: '谷通科技2',
        statu: 1,
        href:'222'
      }, {
        date: '2016-05-04',
        name: '黑色毛衣',
        shop: '谷通科技1',
        statu: 0,
        href:'5464'
      }, {
        date: '2016-05-01',
        name: '帽子',
        shop: '谷通科技6',
        statu: 0,
       
        href:'5464646'
      }, {
        date: '2016-05-03',
        name: '裙子',
        shop: '谷通科技8',
        statu: 1,
        href:'12315646'
      }],
      input:'',
      value3:'',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
        },
        restaurants: [],
        state4: '',
        timeout:  null,
        dialogViewDetails:false,
    }
  },
  methods: {
    handleClick(tab, event) {
      let _activeName = tab.name;
      console.log(_activeName);
     
      },
    handleDelete(){
      let _this= this;
      let msg ={
        'dialogTitle':'确定要删除此拍卖商品？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    invalidDelete(){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此批发活动失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){

          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    onSubmit() {
    console.log('submit!');
    },
    /**
     *查看详情
     */
    viewDetails(){
        this.dialogViewDetails=true;
    },
     loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" }
        ]
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
  mounted() {
        this.restaurants = this.loadAll();
    }   
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
.pifa-dialog-ul{
    width: 100%;
    padding: 35px;
    .pifa-li{
        margin-bottom: 35px;
        span{
            display: inline-block;
        }
        span:first-child{
            width: 70px;
            text-align: right;
            margin-right: 20px;
        }
    }
}
</style>
