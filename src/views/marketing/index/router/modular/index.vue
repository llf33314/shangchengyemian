<template>
  <div class="common-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>{{}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <div class="common-content">
            <div class="index-shopInfo">
               暂时不做
            </div>
        </div>
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
