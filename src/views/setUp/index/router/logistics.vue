<template>
<div class="logistics-wrapper">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="物流管理" name="logistics">
      <div class="logistics-main">
        <div class="index-shopInfo">
          <p class="shop-box">
            <el-button type="primary" @click="jumpRouter('/addlogistics/0')" >新建物流</el-button>
             <a v-if="logisticsData.videourl != null" :href="logisticsData.videourl"  target="_blank">
               <el-button type="warning"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
              </a>
          </p>
        </div>
        <div class="logistics-content" v-if="logisticsData.page.pageCount > 0">
            <el-table :data="logisticsData.page.subList" style="width: 100%" class="block">
            <el-table-column
              prop="name"
              label="模板名称">
            </el-table-column>
            <el-table-column
              label="运费(元)">
              <template scope="scope">
                <p v-if="scope.row.isNoMoney === 1 && scope.row.money!=null ">{{scope.row.money}}</p>
                <p v-else>0.00</p> 
              </template>
            </el-table-column>
            <el-table-column label="免邮规则(指定省份除外)">
              <template scope="scope">
                <p v-if="scope.row.isNoMoney === 2">卖家承担运费</p>
                <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoneyNum > 0">商品满{{scope.row.noMoneyNum}}件免邮</p>
                <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoney > 0">商品满{{scope.row.noMoney}}元免邮</p>
                <p v-if="scope.row.isNoMoney === 1 && scope.row.noMoneyNum <= 0 && scope.row.noMoney <= 0">无免邮规则</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="stoName"
              label="所属店铺">
            </el-table-column>
            <el-table-column
              label="创建时间">
              <template  scope="scope">
                  {{scope.row.createTime|format}}
              </template>
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
      <div class="block shop-textr" v-if="logisticsData.page.pageCount > 1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page='logisticsData.page.curPage'
          :page-size="logisticsData.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="logisticsData.page.rowCount">
        </el-pagination>
      </div>
      <content-no :show="'logistics'" v-if="logisticsData.page.pageCount == 0" ></content-no>
    </el-tab-pane>
    <el-tab-pane label="上门自提" name="since" >
      <div class="logistics-main">
        <div class="index-shopInfo">上门自提功能
          <el-switch style="margin-left:30px;"  v-model="isTakeTheir"
            on-text="开启" off-text="关闭" @change="switchChange">
          </el-switch>
          <p>启用上门自提功能后，买家可以就近选择你预设的自提点，下单后你需要尽快将商品配送至指定自提点。</p>
        </div>
        <div class="logistics-content" v-if="isTakeTheir">
          <el-button type="primary" @click="jumpRouter('/addSince/0')">新增自提点</el-button>
          <div v-if="tableData != null">
            <el-table
              :data="tableData.page.subList"
              style="width: 100%"
              class="block" v-if="tableData.page.pageCount > 0">
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
      <div class="block shop-textr" v-if="tableData.page.pageCount > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page='tableData.page.curPage'
          :page-size="tableData.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData.page.rowCount">
        </el-pagination>
      </div>
      <content-no :show="'logistics/since'" v-if="tableData.page.pageCount == 0 && isTakeTheir" ></content-no>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
 <script>
import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";

export default {
  components: {
    contentNo
  },
  data() {
    return {
      isTakeTheir:true,
      activeName: "logistics",
      logisticsData: { //物流数据列表
        page: {
          pageCount: 0
        }
      },
      tableData: { //自提数据列表
        page: {
          pageCount: 0
        }
      }
    };
  },
  methods: {
    /**选项卡 */
    handleClick(tab, event) {
      this.jumpRouter("/logistics/" + tab.name);
      if(this.activeName =="logistics"){
        this.mallFreightList(1);
      }else{
        this.mallFreightTakeList(1);
      } 
    },
    /**删除提示  */
    handleDelete(index, id, type) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要执行此操作吗？",
        dialogMsg: "删除后，数据将无法恢复哦~",
        callback: {
          btnOne: function() {
            if (type == 1) {
              _this.mallFreightDelete(id);
            } else {
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
    /**下一页 */
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      if(this.activeName =="logistics"){
        this.mallFreightList(val);
      }else{
        this.mallFreightTakeList(val);
      } 
    },
    /**物流管理列表 */
    mallFreightList(pageNum) {
      // console.log("Lib.M.formatNot", Lib.M.formatNot);
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightList_post,
        data: {
          curPage: pageNum
        },
        success: function(data) {
          // _this.logisticsData = data.data;
          let myData = data.data;
          let page = myData.page;
          _this.logisticsData = {
            page: {
              curPage: page.curPage,
              pageCount: page.pageCount || 0,
              pageSize: page.pageSize,
              rowCount: page.rowCount,
              subList: page.subList
            },
            videourl: myData.videourl
          };
        }
      });
    },
    /**删除物流 */
    mallFreightDelete(id) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightDelete_post,
        data: {
          ids: id
        },
        success: function(data) {
          _this.$message({
            message: "删除成功",
            type: "success"
          });
          _this.mallFreightList(_this.logisticsData.page.curPage);
        }
      });
    },
    /**上门自提列表 */
    mallFreightTakeList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightTakeList_post,
        data: {
          curPage: pageNum
        },
        success: function(data) {
          _this.isTakeTheir = !!data.data.isTakeTheir; 
          if(_this.isTakeTheir){
            let myData = data.data;
            let page = myData.page;
            _this.tableData = {
              page: {
                curPage: page.curPage,
                pageCount: page.pageCount || 0,
                pageSize: page.pageSize,
                rowCount: page.rowCount,
                subList: page.subList
              }
            };
          }else{
             _this.tableData = {
              page: {
                curPage: 0,
                pageCount:  0,
                pageSize:0,
                rowCount: 0,
                subList: []
              }
            };
          }
        }
      });
    },
    /**删除上门自提 */
    mallFreightTakeDelete(id) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallFreightTakeDelete_post,
        data: {
          id: id
        },
        success: function(data) {
          _this.$message({
            message: "删除成功",
            type: "success"
          });
          _this.mallFreightTakeList(_this.tableData.page.curPage);
        }
      });
    },
    //上门自提功能开启/关闭
    switchChange(){
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallTakeSetTakeTheir_post,
        data: {
          status:Number(_this.isTakeTheir)
        },
        success: function(data) {
          _this.mallFreightTakeList(1);
        }
      });
    },
    /**得到当前页面 */
    getTabName() {
      let _href = window.location.hash.split("/")[2];
      this.activeName = _href;
    }
  },
  mounted() {
     
    this.getTabName();
    if(this.activeName =="logistics"){
        this.mallFreightList(1);
    }else{
        this.mallFreightTakeList(1);
    }     
  }
};
</script>

<style lang="less" scoped>
@import "../../less/logistics.less";
</style>
