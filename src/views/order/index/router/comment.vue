<template>
<div class="index-wrapper">
    <div class="index-main" v-if="isComment == 1">
      <div class="index-shopInfo">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-form-item class="input-all">
            <el-input v-model.trim="searchData.queryName" placeholder="订单号/商品名称" @blur="search"  @keyup.enter.native="search"></el-input>
          </el-form-item>         
          <el-form-item label="选择店铺 :">
            <el-select v-model="searchData.shopId" placeholder="选择店铺"  @change="search">
              <el-option label="全部" value=""></el-option>
              <el-option class="max-input" v-for="item in shopList"
                :key="item.id" :label="item.sto_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择状态 :">
            <el-select v-model="searchData.feel" placeholder="全部" @change="search">
              <el-option label="全部" value="all"></el-option>
              <el-option label="好评" value="1"></el-option>
              <el-option label="中评" value="0"></el-option>
              <el-option label="差评" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
             <span class="demonstration"  style="font-size:13px;">评价时间 :</span>
             <el-date-picker v-model="value7" type="daterange" align="right"  placeholder="选择日期范围" :picker-options="pickerOptions2" value-format="yyyy-MM-dd" @change="search_date" ></el-date-picker>
          </el-form-item >
        </el-form>
      </div>
      <div class="index-content">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick(activeName2)">
            <el-tab-pane :label="'全部评论( '+(count.total|0)+' )'" name="all"></el-tab-pane>
            <el-tab-pane :label="'好评( '+(count.good|0)+' )'" name="1"></el-tab-pane>
            <el-tab-pane :label="'中评( '+(count.medium|0)+' )'" name="0"></el-tab-pane>
            <el-tab-pane :label="'差评( '+(count.bad|0)+' )'" name="-1"></el-tab-pane>
          </el-tabs>
          <div class="index-table-comment"  v-loading.body="loading" element-loading-text="拼命加载中">
            <div class="table-header">
              <div class="table-th col-3">评论内容</div>
              <div class="table-th col-2">商品</div>
              <div class="table-th col-2">订单号</div>
              <div class="table-th col-2">所属店铺</div>
              <div class="table-th col-2">评论时间</div>
              <div class="table-th col-1">状态</div>
            </div>
            <div class="table-content-box" v-for="comment in subList" :key="comment.id">
              <div class="table-content">
                <div class="table-tr" >
                  <div class="table-td  col-3">
                    <p>[ <span v-if="comment.feel ==1">好评</span>
                      <span v-else-if="comment.feel ==0">中评</span>             
                      <span v-else-if="comment.feel == -1">差评</span> ]
                      {{comment.content}}
                  </p>
                  </div>
                  <div class="table-td col-2">
                    <p>{{comment.proName}}</p>
                  </div>
                  <div class="table-td col-2">
                    <p>{{comment.orderNo}}</p>
                  </div>
                  <div class="table-td col-2">
                    <p>{{comment.stoName}}</p>
                  </div>
                  <div class="table-td col-2">
                    <p>{{comment.createTime|format}}</p>
                  </div>
                  <div class="table-td col-1">
                    <p v-if="comment.checkStatus == -1" style="color:red;">审核不通过</p>
                    <p v-else-if="comment.isRep == 0">未回复</p>
                    <p v-else-if="comment.isRep == 1">已回复</p>
                    <!-- <c:if test="${comment.check_status == 0 && !empty isOpenCheck && isOpenCheck == 1}">
                        <c:if test="${comment.check_status == 0 }">未审核</c:if>
                        <c:if test="${comment.check_status == 1 }">通过</c:if>
                        <c:if test="${comment.check_status == -1 }">不通过</c:if>
                    </c:if> -->
                  </div>
                </div>
                <div class="table-tr" v-if="comment.imageList">
                  <div class="comment-img" v-for="image in comment.imageList" :key="image.id" @click="showBigImg(imgUrl+image.imageUrl)">
                    <defaultImg :background="imgUrl+image.imageUrl"></defaultImg>
                  </div>
                </div>
                <div class="table-footer">
                  <p  v-if="comment.isRep == 1 && comment.chilComment !=null ">回复：<span v-html="comment.chilComment.content"></span></p>
                  <face-input v-if="comment.isRep == 0" :row="comment" @success="successComment"></face-input>
                </div>
              </div>
            </div>
             <content-no :show="contentNo" v-if="page.rowCount == 0 " ></content-no>
          </div>
          <div class="block shop-textr" v-if="page.pageCount > 1">
            <el-pagination
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
    <content-no :show="contentShow" v-if="isComment != 1" style="width:92%"></content-no>
     <el-dialog v-model="materialLargeSrcVisible" size="small">
        <img width="100%" :src="largeSrc" alt="" class="img">
    </el-dialog>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import vueFilter from 'assets/js/vueFilter';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
import faceInput from 'components/faceInput';
export default {
   components: {
    defaultImg,contentNo,faceInput
  },
  data () {
    return {
        contentNo:'',
        isComment: '1', // 0不开启   1开启 2关闭评论及买家评价
        activeName2: 'all',
        subList:[],//列表数据
        page:{},//页面数据
        imgUrl:'',
        shopList:[],
        searchData:{//筛选数据
          curPage:'',
          queryName:'',//订单号或商品名称,
          shopId:'',//店铺ID
          feel:'all', // 总体评价 all 全部 -1 差评 0 中评 1好评
          startTime:'',
          endTime:''
        },
        contentShow:"goods",
        count:[],//状态统计数量
        input5:'',
        showText:false,
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        loading:true,
        materialLargeSrcVisible:false,
        largeSrc:''
    }
  },
  watch:{
    '$route'(a,b){
      //this.$router.push({path:b.path})
    },
    'materialLargeSrcVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },
    /**筛选查询 */
    search(name){
      this.activeName2=this.searchData.feel;
      this.searchData.curPage=1;
      this.mallCommentList(this.searchData);
 
    },
 
     /**时间筛选查询 */
    search_date(value){
      let _this = this;
      _this.searchData.curPage=1;
      if(value != ""){
        let date=value.split(" - ");
        _this.searchData.startTime=date[0]
        _this.searchData.endTime=date[1];
        _this.mallCommentList(_this.searchData);
      }else{
        _this.searchData.startTime='';
        _this.searchData.endTime='';
        _this.mallCommentList(this.searchData);
      }
    },
    /**选项卡切换 */
    handleClick(status) {
      let _this = this;
      _this.searchData.feel = status;
      _this.mallCommentList(_this.searchData);
  
    },
    /**
     * 评论列表多页请求
     * @param data     请求数据
     */
    mallCommentList(data){
      let _this = this;
      _this.loading=true;
      this.tableData = '';
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallCommentList_post,
        'data':data,
        'success':function (data){
           _this.isComment=data.data.isComment;
           _this.imgUrl = data.imgUrl;
          _this.count=data.data.count;
          if( _this.isComment == 0){//不开启
             _this.contentShow="openComment";
          }else if( _this.isComment == 2){//关闭评论及买家评价
             _this.contentShow="colseBuyerComment";
          }else{
            _this.subList = data.data.page.subList;
            _this.page = {
              curPage:  data.data.page.curPage,
              pageCount: data.data.page.pageCount,
              pageSize: data.data.page.pageSize,
              rowCount: data.data.page.rowCount
            }
          }
          _this.loading=false;
        }
      });
    },
    
    /**回复评论 */
    reply(id,content,shopId){
      let _this = this;
      if(content==""){
        _this.showText=true;
        return;
      }
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallCommentReply_post,
        'data':{
          "id":id,
          "content":content,
          "shopId":shopId
        },
        'success':function (data){
           _this.$message({
            message: '操作成功',
            type: 'success'
          });
           _this.searchData.curPage=1;
          _this.mallCommentList(_this.screenData);
        }
      });
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.searchData.curPage=val;
      this.mallCommentList( this.searchData);
      $(window).scrollTop(0);
      // console.log(`当前页: ${val}`);
    },
    /** 
     * 表情包
     */
    successComment(val){
      this.$message({
        message: '回复成功',
        type: 'success'
      });
      this.searchData.curPage=1;
      this.mallCommentList(this.screenData);
    } 
  },
  mounted(){
    let _this = this;
    _this.searchData.curPage=1;
    _this.mallCommentList( _this.searchData);
    _this.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });
  }
}
</script>

<style lang="less" >
.comment-img{
  cursor: pointer;
}
</style>

