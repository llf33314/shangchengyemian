<template>
  <el-dialog title="选择活动商品" :visible.sync="isShow">
      <div class="addGruop-search">
        <el-input placeholder="请输入商品名称" icon="search" v-model="proName" class="max-input"
            :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"></el-input>
      </div>
      <el-table :data="gridData.page.subList">
        <el-table-column label="商品" width="250">
          <template slot-scope="scope">
            <div class="Data-goods">
              <div class="goods-img">
                <default-img :background="imgPath+scope.row.image_url"></default-img>
              </div>
              <div class="goods-name" v-text="scope.row.pro_name">
              </div>  
            </div>
          </template>
        </el-table-column>
        <el-table-column property="pro_price" label="单价（元）" width="120"></el-table-column>
        <el-table-column property="stockTotal" label="库存" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.pro_type_id > 0">该商品是虚拟商品，不能加入</span>
            <span v-else-if="scope.row.groupStatus == 1">该商品已加入团购，不可选</span>
            <span v-else-if="scope.row.presaleStatus == 1">该商品已加入预售，不可选</span>
            <span v-else-if="scope.row.auctionStatus == 1">该商品已加入拍卖，不可选</span>
            <span v-else-if="scope.row.seckillStatus == 1">该商品已加入秒杀，不可选</span>
            <span v-else-if="scope.row.pifaStatus == 1">该商品已加入批发，不可选</span>
            <span v-else-if="scope.row.sellerStatus == 1">该商品已加入销售，不可选</span>
            <span v-else-if="scope.row.integralStatus == 1">该商品已加入积分商城，不可选</span>
            <el-button type="primary" @click="selectedData(scope.row)" v-else>选取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="shop-textr">
        <el-pagination  background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="gridData.page.curPage"
            :page-size="gridData.page.pageSize"
            layout="prev, pager, next, jumper"
            :total="gridData.page.rowCount">
        </el-pagination>
      </div>
    </el-dialog>
</template>
<script>
import defaultImg from "components/defaultImg";
export default {
  components: {
    defaultImg
  },
  data() {
    return {
      restaurants: [],
      state4: "",
      timeout: null,
      gridData: {
        page: {
          subList: []
        }
      },
      isShow: false,
      pageNum: 1,
      defaultProId: "",
      shopId: "",
      proName: "",
      imgPath: "",
      isCommission: false, //是否是销售商品
      isIntegral: false //是否是积分商品
    };
  },
  watch: {
    isShow() {
      let _this = this;
      if (_this.isShow) {
        parent.window.postMessage("openMask()", "*");
        this.mallGroupBuyGetProduct({
          defaultProId: _this.defaultProId,
          shopId: _this.shopId,
          proName: _this.proName,
          curPage: _this.pageNum,
          isCommission: _this.isCommission ? 1 : 0,
          isIntegral: _this.isIntegral ? 1 : 0,
          success(data) {
            _this.gridData = data.data;
            _this.imgPath = data.imgUrl;
          }
        });
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      let _this = this;
      this.mallGroupBuyGetProduct({
        defaultProId: _this.defaultProId,
        shopId: _this.shopId,
        proName: _this.proName,
        curPage: val,
        isCommission: _this.isCommission ? 1 : 0,
        isIntegral: _this.isIntegral ? 1 : 0,
        success(data) {
          _this.gridData = data.data;
        }
      });
    },
    handleCurrentChange(val) {
      let _this = this;
      this.mallGroupBuyGetProduct({
        defaultProId: _this.defaultProId,
        shopId: _this.shopId,
        proName: _this.proName,
        curPage: val,
        isCommission: _this.isCommission ? 1 : 0,
        isIntegral: _this.isIntegral ? 1 : 0,
        success(data) {
          _this.gridData = data.data;
        }
      });
    },
    selectedData(pro) {
      let _this = this;
      _this.isShow = false;
      pro.isChoicePro = false;
      pro.isReplacePro = true;
      pro.imgPath = _this.imgPath;
      _this.$emit("dialogData", pro);
      console.log(pro, "xuanze");
    },
    handleIconClick() {
      let _this = this;
      this.mallGroupBuyGetProduct({
        defaultProId: _this.defaultProId,
        shopId: _this.shopId,
        proName: _this.proName,
        curPage: _this.gridData.page.curPage,
        isCommission: _this.isCommission ? 1 : 0,
        isIntegral: _this.isIntegral ? 1 : 0,
        success(data) {
          _this.gridData = data.data;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/mixins.less";
.addGruop-search {
  margin-bottom: 20px;
}
.shop-textr {
  margin-top: 20px;
}
.Data-goods {
  .ik-box;
  .ik-box-pack(justify);
  .ik-box-align(center);
  padding: 10px 0;
  line-height: 1;
  .goods-img {
    width: 56px;
    height: 56px;
    margin-right: 10px;
  }
  .goods-name {
    width: 128px;
    line-height: 1.5em;
  }
}
</style>
