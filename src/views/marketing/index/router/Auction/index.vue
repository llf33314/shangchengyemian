<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
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
                                <span >
                                    选择活动状态 :
                                    <el-select v-model="type" placeholder="请选择" @change="searchAuction">
                                        <el-option class="max-input" label="全部" :value="0"></el-option>
                                        <el-option class="max-input" label="进行中" :value="1"></el-option>
                                        <el-option class="max-input" label="未开始" :value="-1"></el-option>
                                        <el-option class="max-input" label="已结束" :value="2"></el-option>
                                    </el-select>
                                </span>
                                <span>
                                    选择店铺 :
                                    <el-select v-model="shopId" placeholder="请选择" @change="searchAuction">
                                        <el-option class="max-input" label="全部" value=""></el-option>
                                        <el-option class="max-input" v-for="item in shopList"
                                            :key="item.id" :label="item.sto_name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </span>
                            </div>
                        <span v-if="goodsData.videourl != null">
                            <a :href="goodsData.videourl" target="_blank">
                                <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
                            </a>
                        </span>
                        </div>
                    </div>
                    <router-link to="/auction/addauction/0">
                        <el-button type="primary">新建拍卖</el-button>
                    </router-link>
                </div>
                <el-table :data="goodsData.page.subList" style="width: 100%" v-if="goodsData.page.rowCount > 0">
                    <el-table-column
                        prop="proName"
                        label="拍卖商品">
                    </el-table-column>
                    <el-table-column
                        prop="shopName"
                        label="所属店铺">
                    </el-table-column>
                    <el-table-column
                        prop="aucStartPrice"
                        label="起拍价(元)">
                    </el-table-column>
                    <el-table-column
                        prop="nowPrice"
                        label="结束价(元)">
                    </el-table-column>
                    <el-table-column label="有效时间">
                        <template slot-scope="scope">
                            {{scope.row.aucStartTime}} - {{scope.row.aucEndTime}}
                        </template>
                    </el-table-column>
                     <el-table-column label="活动状态">
                         <template slot-scope="scope">
                            <span v-if="scope.row.status === 1">进行中</span>
                            <span v-if="scope.row.status === -1">已结束</span>
                            <span v-if="scope.row.status === 0">未开始</span>
                            <span v-if="scope.row.status === -2">已失效</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button size="small" class="buttonBlue" v-if="scope.row.status == 0 || (scope.row.joinId == 0 && scope.row.status == 1)"
                             @click="jumpRouter('/auction/addauction/'+scope.row.id)">编辑</el-button>
                            <el-button size="small" class="buttonBlue" v-if="scope.row.status == 0 || (scope.row.joinId == 0 && scope.row.status == 1)"
                                @click="invalidAuction(scope.row.id,-2)">失效</el-button>
                            <el-button size="small" class="buttonBlue" @click="preview(scope.row)"
                                v-if="scope.row.status == 1">预览</el-button>
                            <el-button size="small" @click="handleDelete(scope.row.id,-1)"
                                v-if="scope.row.status != 1">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="shop-textr" v-if="goodsData.page.pageCount > 1">
                    <el-pagination  background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="goodsData.page.curPage"
                        :page-size="goodsData.page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="goodsData.page.rowCount">
                    </el-pagination>
                </div>
                </div>
                <content-no :show="contentNo" v-if="goodsData.page.rowCount == 0"></content-no>
            </el-tab-pane>
            <el-tab-pane label="保证金管理" name="2">
                <div class="common-content">
                    <el-table ref="multipleTable" :data="baozhengjinData.page.subList" v-if="baozhengjinData.page.rowCount > 0"
                        tooltip-effect="dark" style="width: 100%">
                        <el-table-column
                        prop="proName"
                        label="拍卖商品">
                        </el-table-column>
                        <el-table-column
                        prop="shopName"
                        label="所属店铺">
                        </el-table-column>
                        <el-table-column
                        prop="aucNo"
                        label="竞拍编号">
                        </el-table-column> 
                        <el-table-column
                        prop="marginMoney"
                        label="保证金金额">
                        </el-table-column> 
                        <el-table-column
                        label="保证金状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.marginStatus == 0">未支付</span>
                                <span v-if="scope.row.marginStatus == 1">已支付</span>
                                <span v-if="scope.row.marginStatus == -1">已返还</span>
                                <span v-if="scope.row.marginStatus == -2">不返还</span>
                            </template>
                        </el-table-column> 
                        <el-table-column
                        prop="payTime"
                        label="支付时间">
                        </el-table-column> 
                        <el-table-column
                        prop="returnTime"
                        label="返还时间">
                          <template slot-scope="scope">
                              <div>{{scope.row.returnTime|format}}</div>
                          </template>
                        </el-table-column> 
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" class="buttonBlue" 
                                v-if="(scope.row.auctionStatus == -1 || scope.row.auctionStatus == -2) && scope.row.marginStatus == 1 && scope.row.isReturn == 1" 
                                @click="viewDetails(scope.row.id,scope.row.aucNo,scope.row.payWay,scope.row.marginMoney)"
                                >退保证金</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="shop-textr" v-if="baozhengjinData.page.pageCount > 1"> 
                        <el-pagination  background
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="baozhengjinData.page.curPage"
                            :page-size="baozhengjinData.page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="baozhengjinData.page.rowCount">
                        </el-pagination>
                    </div>
                     <content-no v-if="baozhengjinData.page.rowCount == 0"></content-no>
                    <el-dialog title="退保证金" :visible.sync="dialogViewDetails"
                        size="tiny">
                        <div class="pifa-dialog-ul">
                            <p class="pifa-li">
                                <span>退保证金:</span>
                                <span>¥ {{auctionMoney}}</span>
                            </p>
                        </div>
                         <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="comeDown()" v-if="auctionPayWay != 3">退保证金</el-button>
                            <a :href="alipayUrl" v-if="auctionPayWay == 3">
                                <el-button type="primary">退保证金</el-button>
                            </a>
                            <el-button id="gtLongUrlCopy" @click="copyLink" :data-clipboard-text="alipayUrl" 
                                v-if="auctionPayWay == 3">复制退保证金链接</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>
 <script>
import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";
import defaultImg from "components/defaultImg";
export default {
  components: {
    contentNo,
    defaultImg
  },
  data() {
    return {
      contentNo: "auction",
      activeName: "1",
      type: "",
      shopId: "",
      goodsData: {
        page: {
          subList: []
        }
      },
      shopList: [],
      baozhengjinData: {
        page: {
          subList: []
        }
      },
      dialogViewDetails: false,
      auctionMoney: "",
      auctionId: "",
      auctionPayWay: "",
      auctionOrderNo: "",
      alipayUrl: "",
      webPath: ""
    };
  },
  watch: {
    activeName: function(t, f) {
      let _href = window.location.href;
      sessionStorage.setItem("href", _href);
    },
    $route: function(t, f) {
      this.activeName = t.params.activeName;
    },
    'dialogViewDetails'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    searchAuction() {
      //拍卖搜索
      this.mallAuctionList(1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mallAuctionList(val);
    },
    handleCurrentChange(val) {
      //   this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.mallAuctionList(val);
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.mallAuctionMarginList(val);
    },
    handleCurrentChange1(val) {
      //   this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.mallAuctionMarginList(val);
    },
    handleClick(tab, event) {
      let _this = this;
      let _activeName = tab.name;
      this.$router.push(_activeName);
      console.log(_activeName);
      if(_activeName ==1){
        _this.mallAuctionList(1);
      }else if(_activeName ==2){
        _this.mallAuctionMarginList(1);
      }
    },
    handleDelete(id, type) {
      //删除拍卖事件
      let _this = this;
      let msg = {
        dialogTitle: "确定要删除此拍卖商品？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallAuctionDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    invalidAuction(id, type) {
      //使拍卖活动失效事件
      let _this = this;
      let msg = {
        dialogTitle: "您确定要将此拍卖活动失效吗？", //文本标题
        dialogMsg: "失效后不能再进行交易", //文本内容
        callback: {
          btnOne: function() {
            _this.mallAuctionDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    mallAuctionDelete(id, type) {
      //删除、使拍卖失效方法
      let _this = this;
      let msg = "";
      if (type == -1) {
        msg = "删除成功";
      } else {
        msg = "已失效";
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAuctionDelete_post,
        data: {
          id: id,
          type: type
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallAuctionList(_this.goodsData.page.curPage);
        }
      });
    },
 
    viewDetails(id, orderNo, payWay, money) {
      //退保证金弹出框
      let _this = this;
      this.dialogViewDetails = true;
      this.auctionId = id;
      this.auctionOrderNo = orderNo;
      this.auctionPayWay = payWay;
      this.auctionMoney = money;
      _this.alipayUrl="";
      if(payWay == 3){//支付宝
        _this.ajaxRequest({
          url: DFshop.activeAPI.mallAuctionMarginRefundUrl_post,
          data: {
            id: id
          },
          success: function(data) {
            _this.alipayUrl=data.data;
            console.log(_this.alipayUrl,"_this.alipayUrl");
          }
        });
      }
    },
    comeDown() {
      //退保证金方法
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAuctionAgreedReturnMargin_post,
        data: {
          id: _this.auctionId
        },
        success: function(data) {
          _this.dialogViewDetails=false;
          _this.$message({
            message: '退定金成功',
            type: "success"
          });
          _this.mallAuctionMarginList(_this.baozhengjinData.page.curPage);
        }
      });
    },
    copyLink() {
      //复制退定金链接
      var self = this;
      var clipboard = new Lib.Clipboard("#gtLongUrlCopy");
      clipboard.on("success", function(e) {
        self.$message({
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy();
      });
    },
    mallAuctionList(pageNum) {
      //拍卖列表
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAuctionList_post,
        data: {
          curPage: pageNum,
          type: _this.type,
          shopId: _this.shopId
        },
        success: function(data) {
          _this.goodsData = data.data;
          _this.webPath = data.webPath;
          $.each(_this.goodsData.page.subList, function(i) {
            let oldTime = this.createTime;
            this.createTime = Lib.M.format(oldTime);
          });
          // console.log(goodsData, "goodsData");
        }
      });
    },
    mallAuctionMarginList(pageNum) {
      //保证金列表
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAuctionMarginList_post,
        data: {
          curPage: pageNum
        },
        success: function(data) {
          _this.baozhengjinData = data.data;
          $.each(_this.baozhengjinData.page.subList, function(i) {
            let oldTime = this.payTime;
            this.payTime = Lib.M.format(oldTime);
          });
          console.log(_this.baozhengjinData, "_this.baozhengjinData ");
        }
      });
    },
    //预览
    preview(obj) {
      let _this = this;
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.webPath,
        pageLink:
          "/goods/details/" +
          obj.shopId +
          "/" +
          obj.userId +
          "/4/" +
          obj.productId +
          "/" +
          obj.id
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    }
  },
  mounted() {
    let _this = this;
 
    _this.storeList({
      success(data) {
        _this.shopList = data.data;
      }
    });
    _this.activeName = _this.$route.params.activeName;

    if(_this.activeName ==1){
      _this.mallAuctionList(1);
    }else if(_this.activeName ==2){
      _this.mallAuctionMarginList(1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../less/style.less";
.pifa-dialog-ul {
  width: 100%;
  padding: 35px;
  .pifa-li {
    margin-bottom: 35px;
    span {
      display: inline-block;
    }
    span:first-child {
      width: 70px;
      text-align: right;
      margin-right: 20px;
    }
  }
}
</style>
