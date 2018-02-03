<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>团购管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="group-main">
      <div class="index-shopInfo">
        <el-row>
          <el-col :span="12"  >
            活动状态：
            <el-select v-model="type" placeholder="请选择" @change="search()">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="进行中" :value="1"></el-option>
              <el-option label="已结束" :value="2"></el-option>
              <el-option label="未开始" :value="-1"></el-option>
              <el-option label="已失效" :value="-2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="shop-textr" v-if="tableData.videourl != null">
            <a :href="tableData.videourl" target="_blank">
              <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
            </a>
          </el-col>
        </el-row>
        <!-- <router-link to="/addgroup"> -->
        <el-button type="primary" style="margin-top: 20px;" @click="jumpRouter('/addgroup/0')">新建团购</el-button>
        <!-- </router-link> -->
      </div>
      <div class="group-content"  v-if="(tableData.page != null && tableData.page.subList != null) || loading">
        <el-table  v-loading.body="loading" element-loading-text="拼命加载中" :data="tableData.page.subList" style="width: 100%">
          <el-table-column prop="gname" label="活动名称">
          </el-table-column>
          <el-table-column prop="shopName"  label="所属店铺">
          </el-table-column>
          <el-table-column label="有效时间">
            <template slot-scope="scope">
              {{scope.row.gstartTime}}至{{scope.row.gendTime}}
            </template>
          </el-table-column>
          <el-table-column label="活动状态" width="190">
            <template slot-scope="scope">
              <p v-if="scope.row.status == 0">未开始</p>
              <p v-else-if="scope.row.status == 1">进行中</p>
              <p v-else-if="scope.row.status == -1">已结束</p>
              <p v-if="scope.row.status == -2">已失效</p>
            </template>
          </el-table-column>
          <el-table-column width="250"
            prop="createTime"
            label="创建时间">
          </el-table-column>
          <el-table-column  label="操作" width="300" >
            <template slot-scope="scope">
              <el-button size="small" class="buttonBlue" v-if="scope.row.status == 0 || (scope.row.status == 1 && scope.row.joinId == '')" 
                @click="jumpRouter('/addgroup/'+scope.row.id)">编辑</el-button>
              <el-button size="small" class="buttonBlue" v-if="scope.row.status == 0 || (scope.row.status == 1 && scope.row.joinId == '')" 
                @click="InvalidData(scope.row.id)">失效</el-button>
              <el-button size="small" class="buttonBlue" v-if="scope.row.status == 1 || scope.row.status == 0" 
               @click="preview(scope.row.twoCodePath,scope.row)">预览</el-button>
              <el-button size="small" @click="deleteData(scope.row.id)" 
                v-if="scope.row.status != 1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="shop-textr" v-if="tableData.page.pageCount > 1">
          <el-pagination  background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="tableData.page.pageSize"
            layout="prev, pager, next, jumper"
            :total="tableData.page.rowCount">
          </el-pagination>
        </div>
      </div>
      <content-no :show="contentNo" v-else></content-no>
    </div>
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
      contentNo: "gruop",
      // isShow: false,
      value: "",
      tableData: {
        page: {
          subList: []
        }
      },
      pageNum: 1,
      type: "",
      path: "",
      webPath: "", //手机端域名
      imgUrl: "",
      loading: true
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.mallGroupBuyList(val);
    },
    InvalidData(id) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要将此团购活动失效吗？", //文本标题
        dialogMsg: "失效后不能再进行团购", //文本内容
        callback: {
          btnOne: function() {
            _this.mallGroupBuyDelete(id, -2);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    deleteData(id) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要删除此团购活动吗？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallGroupBuyDelete(id, -1);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    mallGroupBuyList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallGroupBuyList_post,
        data: {
          curPage: pageNum,
          type: _this.type
        },
        success: function(data) {
          _this.tableData = data.data;
          _this.path = data.path;
          _this.webPath = data.webPath;
          _this.imgUrl = data.imgUrl;
          _this.loading = false;
          $.each(_this.tableData.page.subList, function(i) {
            let oldTime = this.createTime;
            this.createTime = Lib.M.format(oldTime);
          });
        }
      });
    },
    search() {
      this.loading = true;
      this.mallGroupBuyList(1);
    },
    mallGroupBuyDelete(id, delType) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallGroupBuyDelete_post,
        data: {
          id: id,
          type: delType
        },
        success: function(data) {
          _this.mallGroupBuyList(_this.pageNum);
          console.log(data.data);
        }
      });
    },
    preview(imgUrl, obj) {
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
          "/1/" +
          obj.productId +
          "/" +
          obj.id
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    }
  },
  mounted() {
    this.mallGroupBuyList(1);
  }
};
</script>

<style lang="less" scoped>
.index-shopInfo {
  font-size: 13px;
}
.group-content {
  width: 100%;
  padding: 30px 63px;
}
.shop-textr {
  margin-top: 20px;
}
</style>
