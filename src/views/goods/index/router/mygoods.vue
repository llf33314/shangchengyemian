<template>
  <div class="index-mygoods">
    <div class="index-shopInfo clearfix">
      <div class="shopInfo-content" style="width: 100%;">
        <div class="shopInfo-selectbox" v-if="count.status_total>0">
           <el-select v-model="screenData.proType" placeholder="请选择" class="shopInfo-select" @change="search_type(1)">
            <el-option label="全部商品" :value="0"></el-option>
            <el-option label="已上架" :value="1"></el-option>
            <el-option label="未上架" :value="2"></el-option>
            <el-option label="审核未通过" :value="3"></el-option>
          </el-select>
          <el-select v-model="screenData.shopId" placeholder="请选择店铺" class="shopInfo-select" @change="search_shop(screenData.shopId)">
            <el-option :key="0" label="全部店铺" :value="''"></el-option>
            <el-option v-for="item in shopList" :key="item.id" :label="item.sto_name" :value="item.id"></el-option>
          </el-select>
          <el-input class="shopInfo-input" placeholder="请输入商品名称" icon="search" v-model.trim="screenData.proName" :on-icon-click="search_goods" @keyup.enter.native="search_goods"></el-input>
        </div>
        <div class="shopInfo-button">
          <el-button type="primary" @click="jumpRouter('releaseGoods/add')">发布商品</el-button>
          <el-button type="primary" @click="cloneGoods('',1)">一键同步</el-button>
          <a :href="videourl" target="_blank" v-if="videourl!=null"  style="float: right;">
            <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
          </a>
        </div>
      </div>
    </div>
    <div class="index-mygoods-content" v-if="count.status_total>0">
      <el-tabs v-model="activeName" type="card" @tab-click="search_type(2)">
        <el-tab-pane :label="'全部( '+count.status_total+' )'" name="0"></el-tab-pane>
        <el-tab-pane :label="'已上架( '+count.status1+' )'" name="1"></el-tab-pane>
        <el-tab-pane :label="'未上架( '+count.status2+' )'" name="2"></el-tab-pane>
        <el-tab-pane :label="'审核未通过( '+count.status3+' )'" name="3"></el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable" :data="subList" tooltip-effect="dark"
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
            <div  v-if="scope.row.proTypeId == 3">
              已下架
            </div>
            <div v-else>
              <span v-if="scope.row.isPublish == 1 && scope.row.checkStatus == 1">
                已上架
              </span>
              <span  v-if="(scope.row.isPublish == -1 || scope.row.isPublish == 0) && scope.row.checkStatus == 1">
                未上架
              </span>
              <span class="shop-red" v-if="scope.row.checkStatus == -1">
                审核不通过
              </span>
              <span class="shop-red" v-if="scope.row.checkStatus == -2">
                还未审核
              </span>
            </div>
          </template>
         </el-table-column>
        <el-table-column
          label="操作"
          width="400">
          <template scope="scope">
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish != 1 && scope.row.isGroup == 0 && scope.row.isSeckill == 0 && scope.row.proTypeId != 3 "
                        @click="mallProductBatchProduct(scope.row.id,3)">上架
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1 && scope.row.isGroup == 0 && scope.row.isSeckill == 0 && scope.row.proTypeId != 3 "
                         @click="mallProductBatchProduct(scope.row.id,4)">下架
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        @click="cloneGoods(scope.row,2)">同步商品
            </el-button>
            <!-- <el-button  size="small" 
                        class="buttonBlue" 
                        v-if="scope.row.checkStatus == -2 || scope.row.checkStatus == -1"
                        @click="mallProductBatchProduct(scope.row.id,2)">
              送审
            </el-button> -->
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1 "
                        @click="shopQR(scope.row,1)">链接
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if="scope.row.checkStatus != 0 && scope.row.isSeckill != 1"
                        @click="jumpRouter('releaseGoods/'+scope.row.id)">编辑
            </el-button>
            <el-button  size="small" 
                        class="buttonBlue" 
                        v-if=" scope.row.checkStatus == 1 && scope.row.isPublish == 1 && scope.row.proTypeId == 0 "
                        @click="shopQR(scope.row,2)">到店购买
            </el-button>
            <el-button  size="small" 
                        v-if=" scope.row.isPublish !=1 && scope.row.isGroup != 1 && scope.row.isSeckill != 1" 
                        @click="mallProductBatchProduct(scope.row.id,1)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="16">
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection(subList)">全选</el-button>
            <el-button @click="toggleSelection()">取消全选</el-button>
            <el-button @click="mallProductBatchProduct(ids,1)">批量删除</el-button>
            <el-button @click="mallProductBatchProduct(ids,3)">批量上架</el-button>
            <el-button @click="mallProductBatchProduct(ids,4)">批量下架</el-button>
            <!-- <el-button @click="mallProductBatchProduct(ids,2)">批量送审</el-button> -->
          </div>
        </el-col>
        <el-col :span="8">
          <div class="block shop-textr" v-if="page.pageCount>0" style="margin-top: 20px">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="page.pageSize"
              :current-page='page.curPage'
              layout="prev, pager, next, jumper"
              :total="page.rowCount">
            </el-pagination>
          </div> 
        </el-col>
      </el-row>
      
    </div>
    <contentNo :show="contentNo" v-if="count.status_total ==  0"></contentNo>
    <el-dialog
      :title="isCloneGoods==1?'一键同步商品':'同步商品'"
      :visible.sync="cloneGoodsdialog"
      size="small">
      <!--一键同步商品-->
      <div class="allcloneGoods-box" v-if="isCloneGoods==1">
          <el-form :model="allcloneForm" ref="cloneForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="来源店铺" >
           <el-select v-model="allcloneForm.shopId" placeholder="请选择">
              <el-option
                v-for="item in shopList"
                :key="item.id"
                :label="item.sto_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="目标店铺" >
           <el-select v-model="allcloneForm.toShopId" placeholder="请选择">
              <el-option
                v-for="item in shopList2"
                :key="item.id"
                :label="item.sto_name"
                :value="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--同步商品-->
      <div class="cloneGoods-box" v-else>
        <el-form :model="cloneForm" ref="cloneForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择店铺" required>
           <el-select v-model="cloneshopId" placeholder="请选择">
              <el-option
                v-for="item in shopList"
                :key="item.id"
                :label="item.sto_name"
                :value="item.id"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分组" required>
            <gt-cascader  :width="'200px'"
                          @change="groupselected"
                          :ids="{
                              shopId: cloneshopId,
                          }"
                          ref="cascader">
            </gt-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cloneGoodsAjax()">确 定</el-button>
        <el-button @click="closeCloneGoods()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
import contentNo from 'components/contentNo';
import gtCascader from '../../../goods/index/router/mygoods/components/cascader';//多选分类多级联动下拉框
export default {
  components: {
    defaultImg,contentNo,gtCascader
  },
   data() {
    return {
      activeName: '0',
      isStatus:1,//0:未审核；1:已上架，2：未上架
      contentNo:'good',//没有数据显示
      shopList:'',
      shopList2:'',//一键同步对比数据
      subList:[],//列表数据
      page:{},//页面数据
      ids:[],
      count:2,
      imgUrl:'',
      webPath:'',
      videourl:'',
      screenData:{//筛选数据
        curPage: 1,  //页数
        proType: 0,  //商品名称0全部  1上架商品   2未上架  3审核不通过
        shopId : '',  //店铺ID
        proName: ''   //商品名称
      },
      cloneGoodsdialog:false,//同步商品弹出框
      isCloneGoods:1,//1是一键同步商品，2是同步商品
      cloneForm:{},//同步商品,
      cloneshopId:'',//选择同步商品id
      allcloneForm:{
        shopId:'',
        toShopId:'',
      },//一键同步商品
    }
  },
  watch: {
    'allcloneForm.shopId'(a,b){
      let _this = this;
      let flag = true;
      _this.shopList2.forEach((item,i)=>{
        if(item.id == a && flag){
          flag = false;
          item.disabled = true;
          if(i==0){
            _this.allcloneForm.toShopId= _this.shopList2[i+1].id;
          }else{
            _this.allcloneForm.toShopId = _this.shopList2[0].id;
          }
        }else{
          item.disabled = false;
        }
      })
    },
    'cloneGoodsdialog'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
        this.shopList.forEach((item,i)=>{
          item.disabled = false;
        })
      }
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
        ids.push(this)
      });
      _this.ids = ids;
    },
    handleCurrentChange(val) {
      this.screenData.curPage = val;
      this.mallProductList(this.screenData);
      $(window).scrollTop(0);
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
    search_goods(){
      let name = this.screenData.proName;
      if(name != 'undefined ' ){
        this.screenData.curPage = 1;
        this.mallProductList(this.screenData);
      }
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
          if(data.data.count != null){
            _this.count = data.data.count;
          }
          _this.tableData3 = data.data;
          _this.subList = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
          _this.imgUrl = data.imgUrl;
          _this.webPath = data.webPath;
          _this.videourl=data.data.videourl;
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
      let _message = '';//提示文本
      let _dialogMsg = '';//提示内容

      if(ids == '' ){
        _this.$message({
          message:'请选择需要'+_message+'的商品',
          type: 'warning'
        });
        return
      }
 
      if(ids.length>0){
        let idlist=[];
        $.each(ids,function(i){
          if(type ==1){//删除
            //未上架商品
            if(this.isPublish != 1){
              idlist.push(this.id);
            }
          }else if(type == 3){//上架
            //审核通过的 且 未上架
            if(this.checkStatus == 1 && this.isPublish != 1){
              idlist.push(this.id);
            }
          }else if(type == 4){//下架
          //审核通过的 且 已上架
            if(this.checkStatus == 1 && this.isPublish == 1){
              idlist.push(this.id);
            }
          }
        });
        ids=idlist.toString();
      }
      // console.log(ids,"选中的商品ID");
      if(ids == '' ){
        _this.$message({
          message:'请选择需要'+_message+'的商品',
          type: 'warning'
        });
        return
      }

      if(type ==1){
        _message = '删除'
        _dialogMsg = '点击确定后，就不可以恢复哦~'
      }else if(type == 4){
        _message = '下架'
        _dialogMsg = '点击确定后，手机端将不会显示该商品信息。'
      }

      if(type ==1 || type == 4){
        let msg ={
          dialogMsg: _dialogMsg,
          dialogTitle: '您确定要'+_message+'选中商品吗？',
          callback: {
                btnOne:()=>{
                   _this.productAJAX(ids,type)
                }
            },
        }
       _this.$root.$refs.dialogWarn.showDialog(msg); 
      }else{
        _this.productAJAX(ids,type)
      }
    },
    /** 
     * 删除、送审、上架、下架商品请求
     * @param type 类型 1删除 2送审 3上架 4下架
     * @param ids 商品ID集合，用逗号隔开    必传
     */
    productAJAX(ids,type){
      let _this = this;
      _this.ajaxSave({
        'url':DFshop.activeAPI.mallProductBatchProduct_post,
        'data':{
          ids: ids,
          type: type
        },
        'success':function (data){
          let message = '';
          if(type == 1){
              message = '删除成功'
          }
          if(type == 2){
              message = '送审成功'
          }
          if(type == 3){
              message = '该商品已上架至手机端'
          }
          if(type == 4){
              message = '该商品已从手机端下架'
          }
          _this.$message({
            message: message,
            type: 'success'
          });
          _this.mallProductList(_this.screenData);
        }
      });
    },
    /** 
     * 链接二维码
     * @param data 
     * @param type 1链接 2到店购买
     */
    shopQR(data,type){
      let _this = this;
      let title = '';
      /**
       * 手机端地址
       * /goods/details/:shopId/:busId/:type（活动类型）/:goodsId/:activityId（活动id）
       */
      if(type ==1 ){
        title = '商品链接'
      }else{
        title = '到店购买'
        //todo 到店购买 链接目前没有
      }
      let _pageLink = '/goods/details/'+data.shopId+'/'+data.userId+'/0/'+data.id+'/0';
      if(type == 2){//到店购买链接
        _pageLink += "/0/1";
      }
      let msg ={
        title: title,
        path: _this.webPath,
        pageLink: _pageLink//页面链接
      };
      _this.$root.$refs.dialogQR.showDialog(msg);//调用方法
    },
    /** 
     * 关闭同步弹框
     */
    closeCloneGoods(){
      this.cloneGoodsdialog = false;
      this.isCloneGoods = '';
      this.cloneForm = {};
      this.cloneshopId = '';
      this.$refs.cascader.resetForm();
    },
    /** 
     * 同步商品
     * @param goods 选中商品
     * @param type 1是一键同步商品，2是同步商品
     */
    cloneGoods(goods,type){
      let _this = this;
      this.isCloneGoods = type;
      this.cloneGoodsdialog = true;
      this.cloneForm = goods;
      this.cloneshopId = goods.shopId;

      let data={};
      //店铺同步商品
      if(type==2){
        //单个商品
        let flag = true;
        debugger
        _this.shopList.forEach((item,i)=>{
            item.disabled = false;
            if(item.id == _this.cloneshopId && flag){
              flag = false;
              item.disabled = true;
              if(i==0){
                _this.cloneshopId = _this.shopList[i+1].id;
              }else{
                _this.cloneshopId = _this.shopList[0].id;
              }
              return
            }
        })
      }
    },
    /** 
     * 同步商品请求
     * @param type 1是一键同步商品，2是同步商品
     */
    cloneGoodsAjax(){
      let _this = this;
      

      let data={};
      debugger
      if(this.isCloneGoods==1){
        //店铺同步商品
        data= _this.allcloneForm;
      }else{
        //单个同步商品
        data={
          shopId: _this.cloneshopId,   //店铺ID 
          id: _this.cloneForm.id,     //商品ID
          groupList:JSON.stringify(_this.cloneForm.groupList)
        }
        if(!_this.$refs.cascader.submitForm()) return false;
      }
      //防止多次点击重复提交数据
      // if(!Lib.C.ajax_manage) return false;
      // Lib.C.ajax_manage = false;

       _this.ajaxRequest({
        'url':DFshop.activeAPI.mallProductCopyProduct_post,
        'data':data,
        'success':function (data){
          _this.$message({
            message: '同步成功',
            type: 'success'
          });
          _this.closeCloneGoods();
          _this.mallProductList(_this.screenData);
        }
      });
    },
    /** 
     * 分组传值
     */
    groupselected(val){
      this.cloneForm.groupList = val;
    },
    
  },
  mounted(){
    let _this = this;
    console.log(_this.screenData,'this.screenData');
    _this.mallProductList(_this.screenData);
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
        _this.shopList2 = data.data;
        _this.allcloneForm.shopId = data.data[0].id;
      }
    });
    this.$parent.activeName = "mygoods";
  },
}
</script>

<style lang="less" scoped>
.cloneGoods-box{
  height: 300px;
}
</style>
