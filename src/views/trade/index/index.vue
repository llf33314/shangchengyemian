<template>
<div class="index-wrapper">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="交易记录" name="index">
        <div class="index-main" v-if="isShow">
          <div class="index-msg">
            <div class="index-item">
              <div>
                <p class="index-item-money"
                    style="color:#ff4949">￥1971.00
                </p>
                <p>昨日收入（截止至今日0点）</p>
              </div>
            </div>
            <div class="index-item">
              <div>
                <p class="index-item-money">￥8958.00
                </p>
                <p>7日收入（截止至今日0点）</p>
              </div>
            </div>
            <div class="index-item">
              <div>
                <p class="index-item-money">￥0.00
                </p>
                <p>待结算金额（担保交易）</p>
              </div>
            </div>
            <div class="index-item">
              <div style="margin-right: 20px;">
                <p class="index-item-money">￥158.00
                </p>
                <p>可用余额</p>
              </div>
              <el-button type="primary" 
                        size="small">提现</el-button>
            </div>
          </div>
          <div class="index-shopInfo">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item >
                <el-input v-model="formInline.user" placeholder="订单号"></el-input>
              </el-form-item>
              <el-form-item label="订单状态 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <div>
                <el-form-item >
                  <span class="demonstration" 
                        style="font-size:13px;">下单时间 :</span>
                  <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item >
              </div>
                <el-button type="primary">筛选</el-button>
                <el-button type="primary">批量导出</el-button>
            </el-form>
          </div>
          <div class="index-content">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="全部" name="All"></el-tab-pane>
              <el-tab-pane label="成功" name="success"></el-tab-pane>
              <el-tab-pane label="进行中" name="ongoing"></el-tab-pane>
              <el-tab-pane label="退款" name="refund"></el-tab-pane>
              <el-tab-pane label="失败" name="fail"></el-tab-pane>
            </el-tabs>
            <div class="index-from">
               <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="goods"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="订单号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="买方">
                </el-table-column>
                <el-table-column
                  prop="money"
                  label="支付金额(元)">
                </el-table-column>
                <el-table-column
                  prop="statu"
                  label="状态">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button >查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="block shop-textr" v-if="isPage">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
            </div>
          </div>
        </div> 
        <contentNo :show="'trade'" v-else></contentNo>
      </el-tab-pane>
      <el-tab-pane label="保证金记录" name="bond">
        <div class="index-main">
          bond
        </div> 
      </el-tab-pane>
    </el-tabs>
</div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
export default {
  components: {
    contentNo
  },
  data () {
    return {
        isShow: true,
        isPage:true,//潘墩列表页数多页
        activeName: 'index',//默认首页显示
        activeName2: 'All',
        formInline: {
          user: '',
          region: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        tableData: [{
            date: '2016-08-42',
            goods:'中国有嘻哈',
            name: 'PGone',
            number: '01584977413136',
            money:'¥720.00',
            statu:'进行中'
          }, {
            date: '2016-08-42',
            goods:'july',
            name: '小白',
            number: '01584977413136',
            money:'¥720.00',
            statu:'进行中'
          }, {
            date: '2016-05-02',
            goods:'万磁王',
            name: 'BrAnTB',
            number: '01584977413136',
            money:'¥720.00',
            statu:'完成'
          }, {
            date: '2016-05-02',
            goods:'BrAnTB',
            name: 'PGone',
            number: '01584977413136',
            money:'¥720.00',
            statu:'进行中'
          }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleDelete(index, data){
      console.log(index,data);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="less">
@import '../less/index.less';
</style>
