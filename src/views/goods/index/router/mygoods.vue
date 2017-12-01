<template>
  <div class="index-mygoods">
    <div class="index-shopInfo clearfix">
      <div class="shopInfo-content">
        <div class="shopInfo-selectbox" v-if="isShow">
           <el-select v-model="screenData.proType" placeholder="请选择" class="shopInfo-select"@change="search_type(1)">
            <el-option label="全部商品" :value="0"></el-option>
            <el-option label="已上架" :value="1"></el-option>
            <el-option label="未上架" :value="2"></el-option>
            <el-option label="审核未通过" :value="3"></el-option>
          </el-select>
          <el-select v-model="screenData.shopId" placeholder="请选择店铺" class="shopInfo-select" @change="search_shop(screenData.shopId)">
            <el-option :key="0" label="全部商品" :value="''"></el-option>
            <el-option v-for="item in shopList" :key="item.id" :label="item.sto_name" :value="item.id"></el-option>
          </el-select>
          <el-input class="shopInfo-input" placeholder="请输入商品名称" icon="search" v-model="screenData.proName" @blur="search_goods()"></el-input>
        </div>
        <div class="shopInfo-button">
          <el-button type="primary" @click="jumpRouter('releaseGoods/add')">发布商品</el-button>
        </div>
      </div>
    </div>
    <div class="index-mygoods-content" v-if="isShow" >
      <el-tabs v-model="activeName" type="card" @tab-click="search_type(2)">
        <el-tab-pane :label="'全部( '+count.status_total+' )'" name="0"></el-tab-pane>
        <el-tab-pane :label="'已上架( '+count.status1+' )'" name="1"></el-tab-pane>
        <el-tab-pane :label="'未上架( '+count.status2+' )'" name="2"></el-tab-pane>
        <el-tab-pane :label="'审核未通过( '+count.status3+' )'" name="3"></el-tab-pane>
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
                <defaultImg :background="imgUrl+scope.row.imageUrl"></defaultImg>
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
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish != 1 && scope.row.isGroup == 0 && scope.row.isSeckill == 0 "
                        @click="mallProductBatchProduct(scope.row.id,3)">
                上架
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1 && scope.row.isGroup == 0 && scope.row.isSeckill == 0"
                         @click="mallProductBatchProduct(scope.row.id,4)">
                下架
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if="scope.row.checkStatus == -2 || scope.row.checkStatus == -1"
                        @click="mallProductBatchProduct(scope.row.id,2)">
              送审
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1"
                        @click="shopQR(scope.row)">
              链接
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if="scope.row.checkStatus != 0 && scope.row.isSeckill != 1"
                        @click="jumpRouter('releaseGoods/'+scope.row.id)">
              编辑
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1">
              到店购买
            </el-button>
            <el-button  size="small" 
                        v-if=" scope.row.isPublish !=1 && scope.row.isGroup != 1 && scope.row.isSeckill != 1" 
                        @click="mallProductBatchProduct(scope.row.id,1)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="16">
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection(tableData3.page.subList)">全选</el-button>
            <el-button @click="toggleSelection()">取消全选</el-button>
            <el-button @click="mallProductBatchProduct(ids,1)">批量删除</el-button>
            <el-button @click="mallProductBatchProduct(ids,3)">批量上架</el-button>
            <el-button @click="mallProductBatchProduct(ids,4)">批量下架</el-button>
            <el-button @click="mallProductBatchProduct(ids,2)">批量送审</el-button>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="block shop-textr" v-if="tableData3.page.pageCount>0" style="margin-top: 20px">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="tableData3.page.pageSize"
              layout="prev, pager, next, jumper"
              :total="tableData3.page.rowCount">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      
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
      activeName: '0',
      isStatus:1,//0:未审核；1:已上架，2：未上架
      tableData3: [],
      contentNo:'good',//没有数据显示
      shopList:'',
      ids:'',
      count:'',
      imgUrl:'',
      webPath:'',
      screenData:{//筛选数据
        curPage: 1,  //页数
        proType: 0,  //商品名称0全部  1上架商品   2未上架  3审核不通过
        shopId : '',  //店铺ID
        proName: ''   //商品名称
      }
    }
  },
  watch:{
    'screenData'(a,b){
      console.log(a,b,'------------')
    }
  },
  methods: {
    /**
     * 全选
     * @param 全选数据
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 批量选择
     */
    handleSelectionChange(val) {
      let _this = this;
      let ids = [];
      $.each(val,function(i){
        ids.push(this.id)
      });
      _this.ids = ids.toString();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.screenData.curPage = val;
      this.mallProductList(this.screenData)
    },
    /** 
     * 商品类型筛选  选中 type 0全部  1上架商品   2未上架  3审核不通过
     * @param type  判断触发条件
    */
    search_type(type){
      let _this = this;
      if(_this.activeName == _this.screenData.proType) return;
      if(type==1){
        _this.activeName = _this.screenData.proType.toString();
      }else{
        _this.screenData.proType = Number(_this.activeName)
      }
      _this.screenData.curPage = 1;
      _this.mallProductList(_this.screenData);
    },
    /** 
     * 店铺筛选
     * @param shopId 店铺id
    */
    search_shop(val){
      let _this = this;
      _this.screenData.curPage = 1;
      _this.mallProductList(_this.screenData);
    },
     /** 
     * 商品
     * @param name  商品名字
    */
    search_goods(name){
      this.screenData.curPage = 1;
      this.mallProductList(this.screenData);
    },
    /**
     * 商品列表 
     * @param curPage 获取页数
     * @param proType 获取0全部  1上架商品   2未上架  3审核不通过
     * @param proName 商品名称
     * @param shopId  店铺ID
     * @param curPage 页数
     */
    mallProductList(data){
      let _this = this;
      _this.tableData3 = '';
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductList_post,
        'data':data,
        'success':function (data){
          //接口后期会改todo
          _this.count = data.data.count;
          _this.tableData3 = data.data;
          _this.imgUrl = data.imgUrl;
          _this.webPath = data.webPath;
          _this.mallProductCountStatus(_this.screenData);
        }
      });
    },
    /**
     * 删除、送审、上架、下架商品
     * @param type 类型 1删除 2送审 3上架 4下架
     * @param ids 商品ID集合，用逗号隔开    必传
    */
    mallProductBatchProduct(ids,type){
      let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductBatchProduct_post,
        'data':{
          ids: ids,
          type: type
        },

        'success':function (data){
          _this.$message({
            message: '操作成功',
            type: 'success'
          });
          _this.mallProductList(_this.screenData);
        }
      });
    },
    /* 获取各状态下商品数量 */
    mallProductCountStatus(data){
      let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductCountStatus_post,
        'data':data,
        'success':function (data){
          _this.count = data.data;
        }
      });
    },
    /** 
     * 链接二维码
     */
    shopQR(data){
      let _this = this;
      /**
       * 手机端地址
       * /goods/details/:shopId/:busId/:type（活动类型）/:goodsId/:activityId（活动id）
       */
      let _pageLink = _this.webPath+'goods/details/'+data.shopId+'/'+data.busId+'/0/'+data.id+'/0';
      let msg ={
        title:'商品链接',
        pageLink: _pageLink//页面链接
      };
      _this.$root.$refs.dialogQR.showDialog(msg);//调用方法
    }
  },
  mounted(){
    let _this = this;
    _this.mallProductList(_this.screenData);
    _this.mallProductCountStatus();
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    })
  },
}
</script>

<style lang="less">

</style>
