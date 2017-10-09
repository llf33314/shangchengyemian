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
        <el-select v-model="value" placeholder="请选择"
          v-if="isTotal">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <p v-else>店铺 ：广东谷通</p>
      </div>
      <div class="index-content">
        <div class="index-item statistics-main">
          <div class="item-content">
            <div class="col1">
              <p style="color:#fa4c54">24</p>
              <div>今日付款订单</div>
            </div>
            <div class="col1">
              <p>¥1971.00</p>
              <div>今日总收入</div>
            </div>
            <div class="col1">
              <p>￥1971.00</p>
              <div>7天总收入</div>
            </div>
            <div class="col1">
              <p>12</p>
              <div>待付款订单数</div>
            </div>
             <div class="col1">
              <p>1</p>
              <div>待发货订单数</div>
            </div>
          </div>
        </div>
        <div class="index-item line-main">
          <p class="item-title">选择时间 :
            <el-date-picker
              v-model="value6"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
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
      value6: '',
      chart: null,
      isTotal: true
    }
  },
  methods: {
   initChart() {
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
            data: [
              '1','2','3','4','5','6','7',
              '8','9','10','11','12','13','14',
              '15','16','17','18','19','20','21',
              '22','23','24','25','26','27','28',
              '29','30'
              ]
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name:'收入金额',
                type:'line',
                stack: '总量',
                data:[500, 700, 1010, 2200, 100, 2300, 2100]
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
    this.initChart();
  },
}
</script>

<style lang="less">
@import '../less/index.less';

</style>
