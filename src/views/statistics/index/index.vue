<template>
  <div class="index-wrapper">
    <div class="common-nav" v-if="isTotal">
      总店统计
    </div>
    <div class="common-nav" v-else>
      分店统计
    </div>
    <div class="index-main">
      <div class="index-header">
        <el-select v-model="shopSelect" placeholder="请选择" @change="searchCount()" > <!--v-if="isTotal"-->
            <el-option label="全部" value=""></el-option>
          <el-option class="max-input" v-for="item in shopList"
                :key="item.id" :label="item.sto_name" :value="item.id">
            </el-option>
        </el-select>
        <!-- <p v-else>店铺 ：<span v-text="shopNameSelect"></span></p> -->
      </div>
      <div class="index-content">
        <div class="index-item statistics-main">
          <div class="item-content">
            <div class="col1">
              <p v-text="dataCount.todayPayOrderNum" style="color:#fa4c54"></p>
              <div>今日付款订单</div>
            </div>
            <div class="col1">
              <p v-text="dataCount.yesterIncomeCount">¥1971.00</p>
              <div>昨日总收入</div>
            </div>
            <div class="col1">
              <p v-text="dataCount.sevenIncomeCount" >￥1971.00</p>
              <div>7天总收入</div>
            </div>
            <div class="col1">
              <p v-text="dataCount.waitPayOrderNum">12</p>
              <div>待付款订单数</div>
            </div>
             <div class="col1">
              <p v-text="dataCount.waitDeliveryOrderNum">1</p>
              <div>待发货订单数</div>
            </div>
          </div>
        </div>
        <div class="index-item line-main">
          <p class="item-title">选择时间 :
            <el-date-picker v-model="value6" type="daterange"  :picker-options="pickerOptions" value-format="yyyy-MM-dd" placeholder="选择日期范围" @change="searchDate" ></el-date-picker>
          </p>
          <div class="line-content ">
            <span class="line-unit">
              单位 : 元
            </span>
            <div class="">
              <div style="width: 100%;height:438px;" ref="myEchart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <notice></notice>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
//引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
export default {
  components: {
    
  },
  data () {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      dataCount:{
          todayPayOrderNum:'',
          waitDeliveryOrderNum:'',
          waitPayOrderNum:'',
          sevenIncomeCount:'',
          yesterIncomeCount:'',
          data:[]
        },
      shopSelect:'',//搜索店铺选中店铺ID
      shopList: [],
      // startDate:new Date(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30)),
      // endDate:new Date(),
      value6: [new Date(new Date().setTime(Date.now() - 3600 * 1000 * 24 * 30)),
              new Date(new Date().setTime( Date.now() - 8.64e7))
              ],
      chart: null,
      isTotal: true,
      chartDate:[],
      date1:'',
      date2:''
    }
  },
  methods: {
   
    /**获取统计数据 */
    getCountList(shopId,startDate,endDate){
      let _this = this;
      this.ajaxRequest({
        'url': DFshop.activeAPI.getCountListByDate_post,
        'data':{
          shopId :shopId,
          startDate:startDate,
          endDate:endDate
        },
        'success':function (data){
          // console.log(data);
          _this.dataCount = data.data;
          _this.dataCount.yesterIncomeCount = '¥ '+data.data.yesterIncomeCount;
           _this.dataCount.sevenIncomeCount = '¥ '+data.data.sevenIncomeCount;
            // console.log(_this.dataCount.data.length);
           _this.initChart();
        }
      });
    },
    /**切换店铺 */
     searchCount(){
       let that=this;
         if(this.shopSelect != ''){
             this.isTotal=false;
         }else{
            this.isTotal=true;
         }
        //  console.log( that.date1, that.date2,"date2");
        this.getCountList(this.shopSelect,that.date1, that.date2);
   
   },
   /**查询日期 */
   searchDate(value){
     let that=this;
      //  console.log(value);
      if(value != "" && value !=undefined ){
          let date=value.split(" - ");
          this.loopGenerateDate(new Date(date[0]), new Date(date[1]));
          that.date1=new Date(date[0]);
          that.date2=new Date(date[1]);
            // console.log( that.date1, that.date2,"date");
          that.getCountList(this.shopSelect,date[0],date[1]);
          
      }else{
       that.defaultDate();
       that.getCountList(this.shopSelect);
      }     
   },
   /**生成默认日期 */
   defaultDate(){
      let that=this;
      var start = new Date(new Date().setTime(Date.now()- 3600 * 1000 * 24 * 30));
      var end =new Date(new Date().setTime(  Date.now() - 8.64e7));
      
      let startDate = new Date(start.getFullYear() + '-' + (start.getMonth() + 1) + '-'+ start.getDate()+' 00:00:00');
      let endDate = new Date(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()+' 00:00:00');
      this.loopGenerateDate(startDate,endDate);
   },
   /**遍历生成日期列表 */
   loopGenerateDate(startTime,endTime){
       this.chartDate=[];
        let i=0;
        while(endTime.getTime()-startTime.getTime()>=0){
          // let year = startTime.getFullYear();1515888000000 1515859200000 
          // let month = startTime.getMonth().toString().length==1?"0"+startTime.getMonth().toString():startTime.getMonth();
          let day = startTime.getDate().toString().length==1? startTime.getDate():startTime.getDate();

          this.chartDate[i]=day;
          i++;       
          startTime.setDate(startTime.getDate()+1);
        }
   },
   initChart() {
      let _this = this;
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        color:['#24a2ff'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            backgroundColor:'#ffffff',
            textStyle:{
              color:'#7f7f7f',
              fontSize:'12px'
            },
            extraCssText: 'box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);'
        },
        legend: {
            left:'right',
            data:['收入金额']
        },
        grid: {
            left: '0%',
            right: '1%',
            bottom: '0%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:_this.chartDate
            // data: [
            //   '11','2','3','4','5','6','7',
            //   '8','9','10','11','12','13','14',
            //   '15','16','17','18','19','20','21',
            //   '22','23','24','25','26','27','28',
            //   '29','30'
            //   ]
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name:'收入金额',
                type:'line',
                stack: '总量',
                data:_this.dataCount.data
                // data:[0,0,0,0,500, 700, 1010, 2200, 100, 2300, 2100,]
            }
        ]
      })
      // this.chart = echarts.init(this.$refs.myEchart);
      // // 把配置和数据放这里
      // this.axios.get('/url').then((data) => {
      //   this.chart.setOption({

      //   })
      // })
   }
    
  },
  mounted(){
    let _this = this;
    _this.defaultDate();
      /**请求数据 */
    this.getCountList(this.shopSelect,this.value6[0],this.value6[1]);
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });     
  },
}
</script>

<style lang="less">
@import '../less/index.less';

</style>
