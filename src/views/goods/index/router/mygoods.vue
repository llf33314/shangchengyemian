<template>
  <div class="index-mygoods">
    <div class="index-shopInfo clearfix">
      <div class="shopInfo-content">
        <div class="shopInfo-selectbox" v-if="isShow">
           <el-select v-model="proType" placeholder="请选择" class="shopInfo-select">
            <el-option label="全部" :value="0"></el-option>
            <el-option label="已上架" :value="1"></el-option>
            <el-option label="未上架" :value="2"></el-option>
            <el-option label="审核未通过" :value="3"></el-option>
          </el-select>
          <el-select v-model="shopId" placeholder="请选择" class="shopInfo-select">
            <el-option v-for="item in shopList" :key="item.id" :label="item.sto_name" :value="item.id"></el-option>
          </el-select>
          <el-input class="shopInfo-input" placeholder="请输入商品名称" icon="search" name="proName"></el-input>
        </div>
        <div class="shopInfo-button">
          <el-button type="primary" @click="jumpRouter('releaseGoods')">发布商品</el-button>
        </div>
      </div>
    </div>
    <div class="index-mygoods-content" v-if="isShow" >
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane :label="'全部( '+count.status_total+' )'" name="first"></el-tab-pane>
        <el-tab-pane :label="'已上架( '+count.status1+' )'" name="second"></el-tab-pane>
        <el-tab-pane :label="'未上架( '+count.status2+' )'" name="third"></el-tab-pane>
        <el-tab-pane :label="'审核未通过( '+count.status3+' )'" name="fourth"></el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable" :data="tableData3.page.subList" tooltip-effect="dark"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55" prop="id">
        </el-table-column>
        <el-table-column
          label="商品"
          width="250">
          <template scope="scope">
            <div class="index-mygoods-list clearfix">
              <div class="index-mygoods-img">
                <defaultImg :background="scope.row.imageUrl"></defaultImg>
              </div>
              <div class="index-mygoods-txt"
              v-text="scope.row.proName">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="所属店铺">
        </el-table-column>
        <el-table-column
          prop="proPrice"
          label="单价（元）"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stockTotal"
          label="库存"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="saleTotal"
          label="总销量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="viewsNum"
          label="浏览量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column 
          label="商品状态"
          show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.isPublish == 1 && scope.row.checkStatus == 1">
              已上架
            </span>
            <span  v-if="scope.row.isPublish == 0 && scope.row.checkStatus == 1">
              未上架
            </span>
            <span class="shop-red" v-if="scope.row.checkStatus == -1">
              审核不通过
            </span>
          </template>
         </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template scope="scope">
            <el-button size="small" class="buttonBlue" v-if=" scope.row.isPublish  === 0 ">
                上架
            </el-button>
            <el-button size="small" class="buttonBlue" v-if=" scope.row.isPublish  === 1 ">
                下架
            </el-button>
            <el-button size="small" class="buttonBlue" v-if="scope.row.checkStatus  === -2 ">
              送审
            </el-button>
            <el-button size="small" class="buttonBlue" v-if=" scope.row.status  !== 2">
              链接
            </el-button>
            <el-button size="small" class="buttonBlue" v-if="scope.row.status  === 2 ">
              编辑
            </el-button>
            <el-button size="small" class="buttonBlue" v-if=" scope.row.status  === 1">
              到店购买
            </el-button>
            <el-button size="small" v-if=" scope.row.status !== 1" >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(tableData3)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <div class="block shop-textr" v-if="tableData3.page.pageCount>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="tableData3.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="tableData3.page.rowCount">
        </el-pagination>
      </div>
    </div>
    <contentNo :show="contentNo" v-else></contentNo>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
import contentNo from 'components/contentNo';
export default {
  components: {
    defaultImg,contentNo
  },
   data() {
    return {
      isShow: true,//是否有数据显示
      value:'',
      options:'',
      activeName2: 'first',
      isPage:true,//潘墩列表页数多页
      isStatus:1,//0:未审核；1:已上架，2：未上架
      tableData3: [],
      multipleSelection: [],
      contentNo:'good',//没有数据显示
      proType:0,
      proName:'',
      shopId:'',
      shopList:'',
      ids:'',
      count:'',
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      let _this = this;
      _this.multipleSelection = val;

      $.each(this.multipleSelection,function(i){
        _this.ids = this.id + ',';
        console.log(_this.ids);
      });
      console.log(this.multipleSelection);
    },
    handleDelete(index, data){
      console.log(index,data);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.mallProductList(val);
    },
    mallProductList(pageNum){
      let _this = this;
      _this.tableData3 = '';
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductList_post,
        'data':{
          curPage :pageNum,
          proType : _this.proType,
          shopId : _this.shopId,
          proName : _this.proName 
        },
        'success':function (data){
           _this.tableData3 = data.data;
           console.log(_this.tableData3);
        }
      });
    },
    mallProductBatchProduct(type){
      let _this = this;
      let isDel = '';
      let isPublish = '';
      let checkStatus = '';
      if(type === 1){//删除
        isDel = 1;
      }else if(type === 2){//送审
        checkStatus = 0;
      }else if(type === 3){//上架
        isPublish = 1;
      }else{//下架
        isPublish = -1;
      }
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductBatchProduct_post,
        'data':{
          ids : _this.ids, 
          isDelete : isDel,
          checkStatus : checkStatus,
          isPublish : isPublish
        },
        'success':function (data){
           _this.tableData3 = data.data;
           console.log(_this.tableData3);
        }
      });
    },
    mallProductCountStatus(){
      let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductCountStatus_post,
        'success':function (data){
           _this.count = data.data;
           console.log(_this.count,'111');
        }
      });
    }
  },
  mounted(){
    let _this = this;
    _this.mallProductList(1);
    _this.mallProductCountStatus();
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    })
  },
}
</script>

<style lang="less">

</style>
