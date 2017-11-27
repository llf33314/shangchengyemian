<template>
<div class="logistics-wrapper">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="物流管理" name="logistics">
      <div class="logistics-main">
        <div class="index-shopInfo">
          <p class="shop-box">
            <el-button type="primary" @click="jumpRouter('/addlogistics/'+id)" >新建物流</el-button>
            <el-button type="warning"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
          </p>
        </div>
        <div class="logistics-content" v-if="sinceSwitch">
          <div v-if="isSince">
            <el-table :data="logisticsData.page.subList" style="width: 100%" class="block" v-if="logisticsData.page.pageCount>0">
              <el-table-column
                prop="name"
                label="模板名称">
              </el-table-column>
              <el-table-column
                prop="money"
                label="运费(元)">
              </el-table-column>
              <el-table-column label="免邮规则(指定省份除外)">
                <template scope="scope">
                  <p v-if="scope.row.isNoMoney === 2">卖家承担运费</p>
                  <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoneyNum > 0">商品满{{scope.row.noMoneyNum}}件免邮</p>
                  <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoney > 0">商品满{{scope.row.noMoney}}件免邮</p>
                  <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoneyNum <= 0 && scope.row.noMoney <= 0">无免邮规则</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="stoName"
                label="所属店铺">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button class="buttonBlue"
                    size="small"
                    @click="jumpRouter('/addlogistics/'+scope.row.id)">编辑</el-button>
                  <el-button
                    size="small"
                    @click="handleDelete(scope.$index, scope.row.id,1)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="block shop-textr" v-if="logisticsData.page.pageCount>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="logisticsData.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="logisticsData.page.pageCount">
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上门自提" name="since">
      <div class="logistics-main">
        <div class="index-shopInfo">上门自提功能
          <el-switch style="margin-left:30px;"
            v-model="tableData.isTakeTheir"
            on-text="开启"
            off-text="关闭">
          </el-switch>
          <p>启用上门自提功能后，买家可以就近选择你预设的自提点，下单后你需要尽快将商品配送至指定自提点。</p>
        </div>
        <div class="logistics-content">
          <div>
            <el-button type="primary" @click="jumpRouter('/addSince/'+id)">新增自提点</el-button>
            <el-table
              :data="tableData.page.subList"
              style="width: 100%"
              class="block" v-if="tableData.page.pageCount>0">
              <el-table-column
                prop="visitName"
                label="自提点名称"
                max-width="250">
              </el-table-column>
              <el-table-column
                prop="visitAddressDetail"
                label="自提点地址"
                max-width="500">
              </el-table-column>
              <el-table-column
                prop="visitContactNumber"
                label="联系电话">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button class="buttonBlue"
                    size="small"
                    @click="jumpRouter('/addSince/'+scope.row.id)">编辑</el-button>
                  <el-button
                    size="small"
                    @click="handleDelete(scope.$index, scope.row.id,2)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="block shop-textr" v-if="tableData.page.pageCount>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="tableData.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData.page.pageCount">
        </el-pagination>
      </div>
    </el-tab-pane>
    <content-no :show="contentNo" v-if="tableData.page.pageCount == 0 || logisticsData.page.pageCount == 0" ></content-no>
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
        logisticsData: [],
        dialogWarn: true,
        curPage:1,
        tableData:[],
    }
  },
  methods: {
    handleClick(tab, event) {
      this.contentNo = tab.name;
      console.log(tab.name,'tab');
      this.jumpRouter('/logistics/'+tab.name);
      //this.activeName = tab.name;
    },
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    handleDelete(index, id,type) {
      let _this= this;
      let msg = {
        'dialogTitle': '您确定要执行此操作吗？',
        'dialogMsg': '删除后，数据将无法恢复哦~',
        'callback': {
        'btnOne': function () {
          if(type == 1){
            _this.mallFreightDelete(id);
          }else{
            _this.mallFreightTakeDelete(id);
          }
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
      this.curPage = val;
      console.log(val)
    },
    mallFreightList(pageNum){
      let _this= this;
      this.logisticsData = '';
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallFreightList_post,
        'data':{
          curPage :pageNum 
        },
        'success':function (data){
           _this.logisticsData = data.data;
           //console.log(_this.logisticsData.page);
           $.each(_this.logisticsData.page.subList, function(i){
            let oldTime = this.createTime;
            this.createTime = Lib.M.formatNot(oldTime);
          });
        }
      });
    },
    mallFreightDelete(id){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallFreightDelete_post,
        'data':{
          ids :id 
        },
        'success':function (data){
           _this.$message({
            message: '删除成功',
            type: 'success'
          });
          _this.mallFreightList(this.curPage);
        }
      });
    },
    mallFreightTakeList(pageNum){
      let _this= this;
      _this.tableData = '';
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallFreightTakeList_post,
        'data':{
          curPage :pageNum 
        },
        'success':function (data){
           _this.tableData = data.data;
           //console.log(data.data.isTakeTheir);
           _this.tableData.isTakeTheir = !!data.data.isTakeTheir;
           //console.log(_this.tableData.isTakeTheir);
           //console.log(Number(_this.tableData.isTakeTheir));
        }
      });
    },
    mallFreightTakeDelete(id){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallFreightTakeDelete_post,
        'data':{
          id :id 
        },
        'success':function (data){
           _this.$message({
            message: '删除成功',
            type: 'success'
          });
          _this.mallFreightTakeList(this.curPage);
        }
      });
    },
  },
  mounted(){
    this.mallFreightList(1);
    this.mallFreightTakeList(1);
    let _href = window.location.hash.split('/')[2];
    this.activeName = _href;
    console.log(this.activeName);
  }
}
</script>

<style lang="less" scoped>
@import '../../less/logistics.less';
</style>
