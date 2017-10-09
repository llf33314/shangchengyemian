<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>对外报价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="报价单管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo">
                    <div class="index-input-box">
                    <div class="p-box" style="margin-bottom: 20px;">
                        <div>
                            <span>
                                选择状态 :
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
                                 <el-autocomplete
                                    v-model="state4"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请输入报价单号"
                                    @select="handleSelect"
                                    icon="search"
                                ></el-autocomplete>
                            </span>
                        </div>
                        
                    <!-- <span>
                        <router-link to="/addBond">
                            <el-button 
                            type="warning"
                            ><i class="iconfont icon-cplay1"></i>
                            视频教程</el-button>
                        </router-link>
                    </span> -->
                    </div>
                    <div class="p-box">
                        选择时间 :
                        <el-time-select
                            placeholder="起始时间"
                            v-model="startTime"
                            :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                            }">
                        </el-time-select>
                        -
                        <el-time-select
                            placeholder="结束时间"
                            v-model="endTime"
                            :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30',
                            minTime: startTime
                            }">
                        </el-time-select>
                    </div>
                    </div>
                    <router-link to="/Dwbj/addBj">
                    <el-button 
                        type="primary"
                    >新增</el-button>
                    </router-link>
                </div>
                <el-table
                    :data="goodsData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="报价单号">
                    </el-table-column>
                    <el-table-column
                        prop="shop"
                        label="报价单标题">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="付款类型">
                    </el-table-column>
                    <el-table-column
                        label="运费（元）">
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
                        label="报价单金额（元）">
                    </el-table-column>
                     <el-table-column
                        prop="date"
                        label="报价单状态">
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
                        class="buttonBlue"
                        >修改</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                        >详情</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                         @click="invalidDelete(scope.$index, scope.row)"
                        >二维码</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                        >统计</el-button>
                        <el-button
                        size="small"
                        class="buttonBlue"
                        >留言管理</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="合同管理" name="2">
                <div class="common-content">
                     <div class="index-shopInfo">
                        <div class="index-input-box">
                            <el-autocomplete
                                v-model="state4"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                icon="search"
                            ></el-autocomplete>

                        </div>
                        <router-link to="/dwbj/addContract">
                        <el-button 
                            type="primary"
                        >新增</el-button>
                        </router-link>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="shopData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        prop="name"
                        label="编号">
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="合同标题">
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="创建时间">
                        </el-table-column> 
                        <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button
                            size="small"
                            class="buttonBlue"
                            >修改</el-button>
                             <el-button
                            size="small"
                            >删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-dialog
                        title="批发商详细"
                        :visible.sync="dialogViewDetails"
                        size="tiny">
                        <div class="pifa-dialog-ul">
                            <p class="pifa-li">
                                <span>姓名：</span>
                                <span>小多</span>
                            </p>
                             <p class="pifa-li">
                                <span>公司名称：</span>
                                <span>广东谷通科技有限公司</span>
                            </p>
                             <p class="pifa-li">
                                <span>电话号码：</span>
                                <span>13625874112</span>
                            </p>
                             <p class="pifa-li">
                                <span>备注：</span>
                                <span>111</span>
                            </p>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司模板设置" name="3">
                <div class="common-content">
                     <div class="index-shopInfo">
                        <div class="index-input-box">
                            <el-autocomplete
                                v-model="state4"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                icon="search"
                            ></el-autocomplete>
                        </div>
                        <router-link to="/pifa">
                        <el-button 
                            type="primary"
                        >新增</el-button>
                        </router-link>
                    </div>
                   <el-table
                        ref="multipleTable"
                        :data="shopData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        prop="name"
                        label="编号">
                        </el-table-column>
                        <el-table-column
                        prop="shop"
                        label="公司名称">
                        </el-table-column>
                         <el-table-column
                        prop="shop"
                        label="公司电话">
                        </el-table-column>
                        <el-table-column
                        prop="href"
                        label="公司地址">
                        </el-table-column> 
                        <el-table-column
                        prop="href"
                        label="公司官网">
                        </el-table-column> 
                        <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button
                            size="small"
                            class="buttonBlue"
                            >修改</el-button>
                             <el-button
                            size="small"
                            >删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
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
        'dialogTitle':'您确定要删除此批发活动吗？',//文本标题
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
