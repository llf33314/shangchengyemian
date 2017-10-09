<template>
<div class="logistics-wrapper">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="物流管理" name="logistics">
      <div class="logistics-main">
        <div class="index-shopInfo">
          <p class="shop-box">
            <el-button type="primary" @click="jumpRouter('addlogistics')" >新建物流</el-button>
            <el-button type="warning"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
          </p>
        </div>
        <div class="logistics-content" v-if="sinceSwitch">
          <div v-if="isSince">
            <el-table
              :data="logisticsData"
              style="width: 100%"
              class="block">
              <el-table-column
                prop="name"
                label="模板名称">
              </el-table-column>
              <el-table-column
                prop="money"
                label="运费(元)">
              </el-table-column>
              <el-table-column
                prop="address"
                label="免邮规则(指定省份除外)">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="所属店铺">
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建时间">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button class="buttonBlue"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上面自提" name="since">
      <div class="logistics-main">
        <div class="index-shopInfo">上门自提功能
          <el-switch style="margin-left:30px;"
            v-model="sinceSwitch"
            on-text="开启"
            off-text="关闭">
          </el-switch>
          <p>启用上门自提功能后，买家可以就近选择你预设的自提点，下单后你需要尽快将商品配送至指定自提点。</p>
        </div>
        <div class="logistics-content" v-if="sinceSwitch">
          <div v-if="isSince">
            <router-link to="/addSince">
              <el-button type="primary" >新增自提点</el-button>
            </router-link>
            <el-table
              :data="tableData"
              style="width: 100%"
              class="block">
              <el-table-column
                prop="name"
                label="自提点名称"
                max-width="250">
              </el-table-column>
              <el-table-column
                prop="address"
                label="自提点地址"
                max-width="500">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button class="buttonBlue"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <div class="block shop-textr" v-if="isPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
    <content-no :show="contentNo" v-if="!isSince" ></content-no>
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
        activeName: 'logistics',
        sinceSwitch: true,
        isPage:true,//潘墩列表页数多页
        isSince:true,
        contentNo:'logistics',//logistics--物流无数据，since--自取无数据
        tableData: [{
            phone: '12345678910',
            name: '王小虎',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园'
          }, {
            phone: '12345678910',
            name: '王小虎',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园'
          }, {
            phone: '12345679810',
            name: '王小虎',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园'
          }, {
            phone: '01234567890',
            name: '王小虎',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园'
        }],
        logisticsData: [
          {
            date:'2017-06-14',
            phone: '12345678910',
            name: '顺丰速递',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园',
            money:'15.00'
          }, {
            date:'2017-06-14',
            phone: '12345678910',
            name: '顺丰速递',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园',
            money:'15.00'
          }, {
            date:'2017-06-14',
            phone: '12345679810',
            name: '顺丰速递',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园',
            money:'15.00'
          }, {
            date:'2017-06-14',
            phone: '01234567890',
            name: '顺丰速递',
            address: '广东省 深圳市 南山区 广东省深圳市南山区兰光科技园',
            money:'15.00'
          }
        ],
        dialogWarn: true,
    }
  },
  methods: {
    handleClick(tab, event) {
      this.contentNo = tab.name
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      let _this= this;
      let msg = {
        'dialogTitle': '您确定要执行此操作吗？',
        'dialogMsg': '删除后，数据将无法恢复哦~',
        'callback': {
        'btnOne': function () {
          
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
@import '../../less/logistics.less';
</style>
