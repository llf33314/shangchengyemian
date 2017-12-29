<template>
  <el-dialog title="选择商品" :visible.sync="isShow">
      <div class="addGruop-search">
        <el-input placeholder="请输入商品名称" icon="search" v-model="proName" class="max-input"
            :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"></el-input>
      </div>
      <el-table :data="pooductData.page.subList">
        <el-table-column label="商品" width="250">
          <template scope="scope">
            <div class="Data-goods">
              <div class="goods-img">
                <default-img :background="imgPath+scope.row.image_url"></default-img>
              </div>
              <div class="goods-name" v-text="scope.row.pro_name">
              </div>  
            </div>
          </template>
        </el-table-column>
        <el-table-column property="pro_price" label="商品价格（元）"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" @click="selectedData(scope.row)" >选取</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="shop-textr">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pooductData.page.curPage"
            :page-size="pooductData.page.pageSize"
            layout="prev, pager, next, jumper"
            :total="pooductData.page.rowCount">
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
       pooductData: {
        page: {
          subList: []
        }
      },
      isShow: false,
      imgPath: "",
      proName: "",

    };
  },
  watch: {
    isShow() {
      let _this = this;
      if (_this.isShow) {
        parent.window.postMessage("openMask()", "*");
        this.purchaseOrderGetProductAll();
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    /**获取所有店铺的商品 */
    purchaseOrderGetProductAll(data){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseOrderGetProductAll_post,
        'data':data,
        'success':function (data){
            if(data.code == 0){
              _this.pooductData = data.data;
              _this.imgPath = data.imgUrl;
            }
        }
        });
    },
    /**下一页 */
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      let _this = this;
      this.purchaseOrderGetProductAll({
        proName: _this.proName,
        curPage: val
      });
    },
    handleCurrentChange(val) {
      let _this = this;
       this.purchaseOrderGetProductAll({
        proName: _this.proName,
        curPage: val
      });
    },
    selectedData(pro) {
      let _this = this;
      _this.isShow = false;
      pro.imgPath = _this.imgPath;
      _this.$emit("dialogData", pro);
      // console.log(pro, "xuanze");
    },
    handleIconClick() {
      let _this = this;
       this.purchaseOrderGetProductAll({
        proName: _this.proName,
        curPage: _this.pooductData.page.curPage
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@import "../../../../../assets/css/mixins.less";
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
