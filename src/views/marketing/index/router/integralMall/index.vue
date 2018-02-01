<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>积分商城</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="积分商品管理" name="1" >
            <div class="common-content">
              <div class="index-shopInfo">
                <div class="index-input-box">
                  <span>
                    选择门店 :
                    <el-select v-model="searchData.shopId" placeholder="请选择" @change="search">
                      <el-option label="全部" value=""></el-option>
                      <el-option class="max-input" v-for="item in shopList"
                          :key="item.id" :label="item.sto_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </span>
                  <span>
                    活动状态 :
                    <el-select v-model="searchData.type" placeholder="请选择" @change="search">
                      <el-option class="max-input" label="全部" value=""></el-option>
                      <el-option class="max-input" label="进行中" value="1"></el-option>
                      <el-option class="max-input" label="未开始" value="-1"></el-option>
                      <el-option class="max-input" label="已结束" value="2"></el-option>
                      <el-option class="max-input" label="已失效" value="-2"></el-option>
                    </el-select>
                  </span>
                </div>
                <router-link to="/mallIntegral/goods/0">
                  <el-button type="primary" >新建积分商品</el-button>
                </router-link>   
                <el-button  id="gtLongUrlCopy"  data-clipboard-target=".copy-text" type="primary" v-if="searchData.shopId !='' " @click="copyIntegralUrl">复制积分商城链接</el-button>
                <span class="copy-text">{{copyUrl}}</span>
              </div>
              <el-table v-if="isData" :data="goodsData" style="width: 100%">
                <el-table-column
                  prop="proName"
                  width="350px"
                  label="积分商品">
                </el-table-column>
                <el-table-column
                  prop="shopName"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  width="200px"
                  label="有效时间">
                  <template slot-scope="scope">
                      {{scope.row.startTime}} 至 {{scope.row.endTime}} 
                  </template>
                </el-table-column>
                <el-table-column
                  width="150px"
                  label="活动状态">
                   <template slot-scope="scope">
                     <span v-if="scope.row.status == 1">
                       进行中
                     </span>
                     <span v-if="scope.row.status == 2">
                       已结束
                     </span>
                     <span v-if="scope.row.status == 0">
                       未开始
                     </span>
                      <span v-if="scope.row.status == -2">
                       已失效
                     </span>
                   </template>
                </el-table-column>
                <el-table-column
                  label="创建时间">
                   <template slot-scope="scope">
                      {{scope.row.createTime|format}} 
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  min-width="120">
                  <template slot-scope="scope">
                    <el-button size="small" class="buttonBlue" @click="jumpRouter('/mallIntegral/goods/'+scope.row.id)">编辑</el-button>
                    <el-button size="small"  v-if="scope.row.isUse == 1" class="buttonBlue" @click="invalidDelete(scope.row.id, -2)">失效</el-button>
                     <el-button size="small" v-if="scope.row.isUse == -1" class="buttonBlue" @click="invalidDelete(scope.row.id, 1)">启用</el-button>
                    <el-button size="small"  class="buttonBlue" v-if="scope.row.status == 1" @click="preview(scope.row)">预览</el-button>
                    <el-button size="small"  @click="integralDelete(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <content-no v-if="!isData" :show="contentNo"></content-no>
            </div>
          </el-tab-pane>
          <el-tab-pane label="积分商城横幅图" name="2">
            <div class="common-content">
              <div class="index-shopInfo">
                <div class="index-input-box">
                  <p class="p-box">
                  <span>
                    选择门店 :
                    <el-select v-model="bannerShop" placeholder="请选择" @change="imageSearch">
                      <el-option label="全部" value=""></el-option>
                      <el-option class="max-input" v-for="item in shopList"
                          :key="item.id" :label="item.sto_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </span>
                  <span v-if="videourl !=null" >
                    <a :href="videourl"  target="_blank">
                      <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
                    </a> 
                  </span>
                  </p>
                </div>
                <router-link to="/mallIntegral/banner/0">
                  <el-button   type="primary" >新建横幅图</el-button>
                </router-link>
              </div>
              <el-table v-if="isData" :data="imageData" 
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="商品">
                  <template slot-scope="scope">
                   <div class="shop-img">
                     <default-img :background="imagePath+scope.row.imageUrl"></default-img>
                   </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="shopName"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="跳转页面">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type == 0" >不跳转</span>
                    <span v-if="scope.row.type == 1">{{scope.row.returnUrl}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="创建时间">
                   <template slot-scope="scope">
                      {{scope.row.createTime|format}} 
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否显示">
                  <template slot-scope="scope">
                    <span v-if="scope.row.isShow == 1" >显示</span>
                    <span v-if="scope.row.isShow == 0" >不显示</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  min-width="120">
                  <template slot-scope="scope">
                    <el-button size="small" class="buttonBlue" @click="jumpRouter('/mallIntegral/banner/'+scope.row.id)">编辑</el-button>
                    <el-button size="small" class="buttonBlue" v-if="scope.row.isShow == 0"  @click="imageInvalid(scope.row.id, 1)">显示</el-button>
                    <el-button size="small" class="buttonBlue" v-if="scope.row.isShow == 1"  @click="imageInvalid(scope.row.id, -2)">不显示</el-button>
                    <el-button size="small" @click="imageDelete(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <content-no v-if="!isData"></content-no>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="block shop-textr" v-if="page.pageCount > 1" style="margin-top:20px;">
            <el-pagination  background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page='page.curPage'
                :page-size="page.pageSize"
                layout="prev, pager, next, jumper"
                :total="page.rowCount">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data () {
    return {
      contentNo:'',
      activeName:'',
      searchData:{//积分商城查询参数
        type:'',
        shopId:'',
        curPage:''
      },
      shopList:[],
      bannerShop:'', //积分图片查询参数 
      isData:true,//是否有数据
      page:{},//页面翻页数据
      goodsData: [], //积分商品列表
      imageData: [], //积分图片列表
      imagePath:'',  //图片前缀
      videourl:'',   //视频地址
      webPath: "", //手机端域名
      copyUrl:'',
    }
  },
  watch:{
    //监听选项卡变化
    $route :function(t,f){
      // console.log(t.params.activeName,"当前编号");
      // console.log(f.params.activeName,"以前编号");
      this.activeName= t.params.activeName;
      if(this.activeName ==1){
        this.mallIntegralList(1);
      }else{
        this.mallIntegralImageList(1);
      }
    }
  },
  methods: {
    /**积分商城筛选查询 */
    search(){
      this.mallIntegralList(1);
    },
    /**积分商城筛选查询 */
    imageSearch(){
      this.mallIntegralImageList(1);
    },
    /**选项卡切换 */
    handleClick(tab, event) {
       let _activeName = tab.name;
      this.$router.push(_activeName);
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    /**下一页 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      if(this.activeName ==1){
        this.mallIntegralList(val);
      }else{
        this.mallIntegralImageList(val);
      }
    },
      /**
     * 积分商城多页请求
     * @param data     请求参数
     */
    mallIntegralList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralList_post,
        'data':{
          "curPage":curPage,
          "shopId":_this.searchData.shopId,
          "type":_this.searchData.type
        },
        'success':function (data){
            if(data.data.page.rowCount >0){
                _this.isData=true;
            }else{
                _this.isData=false;
                _this.contentNo="JFgoods";
            }
          _this.goodsData = data.data.page.subList;
          _this.webPath = data.webPath;
          var link =  _this.webPath+"/integral/index/"+data.data.userId;
          _this.copyUrl=link;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    },
    /**
     * 设置积分的状态 (删除,失效,启用)
     */
    setStatus(id,type){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralSetStatus_post,
        'data':{
            "id" : id,
            "type":type 
        },
        'success':function (data){
            if(data.code == 0){
              let message="";
              if(type == -1){
                message="删除成功"
              }else if(type ==-2){
                message="失效成功"
              }else if(type ==1){
                message="启用成功"
              }
              _this.$message({
                  message:message,
                  type: 'success'
              });
              _this.mallIntegralList(_this.page.curPage);
            }
        }
      });
    },
    /**积分商品删除 */
    integralDelete(id){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此积分商品？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
              _this.setStatus(id,-1);
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    /**失效,显示 */
    invalidDelete(id,type){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此积分商品失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){
             _this.setStatus(id,type);
          }
        }
      }
      let openMsg ={
        'dialogTitle':'您确定要将此积分商品启用吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.setStatus(id,type);
          }
        }
      }
      if(type == -2){
        _this.$root.$refs.dialog.showDialog(msg); 
      }else {
        _this.$root.$refs.dialog.showDialog(openMsg); 
      }
    },
    /**预览 */
    preview(obj) {
      let _this = this;
      // console.log(obj, "obj");
      // /integral/product/:busId/:productId/:shopId
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.webPath,
        pageLink:
          "/integral/product/" +
          obj.user_id +
          "/" +
          obj.productId +
          "/" +
          obj.shop_id
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    /**复制积分商城链接 */
    copyIntegralUrl(obj){
      let _this = this;
      var clipboard = new Lib.Clipboard("#gtLongUrlCopy");
      clipboard.on('success', function(e) {
        _this.$message({
          message: '复制成功',
          type: 'success'
        });
        clipboard.destroy();
      });
    },
    /**
     * 积分商城图片
     */

    /**
     * 积分商城图片列表多页请求
     * @param data     请求参数
     */
    mallIntegralImageList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralImageList_post,
        'data':{
          "curPage":curPage,
          "shopId":_this.bannerShop
        },
        'success':function (data){
          if(data.data.page.rowCount >0){
              _this.isData=true;
          }else{
              _this.isData=false;
              _this.contentNo="";
          }
          _this.imagePath=data.imgUrl;
          _this.videourl=data.data.videourl;
          // console.log(data.imgUrl);
          _this.imageData = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
    },
    /**
     * 设置积分的状态 (删除,显示,不显示)
     */
    imageSetStatus(id,type){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralImageSetStatus_post,
        'data':{
            "id" : id,
            "type":type 
        },
        'success':function (data){
            if(data.code == 0){
              let message="";
              if(type == -1){
                message="删除成功"
              }else if(type == -2){
                message="不显示商城图片成功"
              }else if(type == 1){
                message="显示商城图片成功"
              }
              _this.$message({
                  message:message,
                  type: 'success'
              });
              _this.mallIntegralImageList(_this.page.curPage);
            }
        }
      });
    },
    /**图片 删除 */
    imageDelete(id){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此积分商城图片？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
               _this.imageSetStatus(id,-1);
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    /**图片 不显示,显示 */
    imageInvalid(id,type){
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要不显示积分商品图片吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
             _this.imageSetStatus(id,type);
          }
        }
      }
      let openMsg ={
        'dialogTitle':'您确定要显示积分商品图片吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.imageSetStatus(id,type);
          }
        }
      }
      if(type == -2){
        _this.$root.$refs.dialog.showDialog(msg); 
      }else {
        _this.$root.$refs.dialog.showDialog(openMsg); 
      }
    },
  },
  mounted(){
    let _this = this;
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    }); 
    this.activeName = this.$route.params.activeName;
    if(this.activeName ==1){
      this.mallIntegralList(1);
    }else{
      this.mallIntegralImageList(1);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
.copy-text{
  opacity:0;
    display: inline-block;
    width: 1px;
    overflow: hidden;
}
</style>
