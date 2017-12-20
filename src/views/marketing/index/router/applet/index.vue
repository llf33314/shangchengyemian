<template>
  <div class="group-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item ><a :href="marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>小程序图片设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="group-main">
      <div class="index-shopInfo">
        <el-button type="primary" style="margin-top: 20px;" @click="jumpRouter('/applet/add')">新建小程序图片</el-button>
      </div>
      <div class="group-content"  v-if="isData">
        <el-table :data="appletData" style="width: 100%">
          <el-table-column
            prop="name"
            label="商品">
            <template scope="scope">
              <div class="shop-img">
                <default-img :background="imagePath+scope.row.imageUrl"></default-img>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="跳转页面">
            <template scope="scope">
                <span v-if="scope.row.type == 0" >不跳转</span>
                <span v-if="scope.row.type == 1" >商品详情</span>
              </template>
          </el-table-column>
          <el-table-column
            label="创建时间">
              <template  scope="scope">
                  {{scope.row.createTime|format}} 
              </template>
          </el-table-column>
           <el-table-column
              label="是否显示">
              <template scope="scope">
                <span v-if="scope.row.isShow == 1" >显示</span>
                <span v-if="scope.row.isShow == 0" >不显示</span>
              </template>
            </el-table-column>
          <el-table-column  label="操作">
            <template scope="scope">
                <el-button size="small" class="buttonBlue" @click="jumpRouter('/applet/update/'+scope.row.id)">编辑</el-button>
                <el-button size="small" class="buttonBlue" v-if="scope.row.isShow == 0"  @click="invalidData(scope.row.id, 1)">显示</el-button>
                <el-button size="small" class="buttonBlue" v-if="scope.row.isShow == 1"  @click="invalidData(scope.row.id, -2)">不显示</el-button>
                <el-button size="small" @click="deleteData(scope.row.id)">删除</el-button>       
            </template>
          </el-table-column>
        </el-table>
        <div class="shop-textr" v-if="page.pageCount > 1">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page.curPage"
            :page-size="page.pageSize"
            layout="prev, pager, next, jumper"
            :total="page.rowCount">
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
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data() {
    return {
      contentNo: "",
      isData:true,//是否有数据
      page:{},//页面翻页数据
      appletData: [], //积分商品列表
      imagePath:'',  //图片前缀 
    };
  },
  methods: {
    /**图片 不显示,显示 */
    invalidData(id,type){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要不显示小程序图片吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
             _this.mallAppletDelete(id,type);
          }
        }
      }
      let openMsg ={
        'dialogTitle':'您确定要显示小程序图片吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.mallAppletDelete(id,type);
          }
        }
      }
      if(type == -2){
        _this.$root.$refs.dialog.showDialog(msg); 
      }else {
        _this.$root.$refs.dialog.showDialog(openMsg); 
      }
    },
    /**删除 */
    deleteData(id) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要删除此小程序图片吗？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallAppletDelete(id, -1);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    /**小程序图片管理列表 */
    mallAppletList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAppletList_post,
        data: {
          curPage: pageNum 
        },
        success: function(data) {
          if(data.data.page.rowCount >0){
              _this.isData=true;
          }else{
              _this.isData=false;
          }
          _this.imagePath=data.imgUrl;
        
          _this.appletData = data.data.page.subList;
            // console.log(_this.appletData,"323432");
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    },
    /**小程序图片 设置删除，显示，不显示 */
    mallAppletDelete(id, delType) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallAppletDelete_post,
        data: {
          id: id,
          type: delType
        },
        success: function(data) {
          _this.mallAppletList(_this.page.curPage);
          console.log(data.data);
        }
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.mallAppletList(val);
    },
  },
  mounted() {
    this.isMarketingUrl();
    this.mallAppletList(1);
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
.shop-img{
    width: 108px;
    height: 60px;
    margin: 10px 0;
}
</style>
