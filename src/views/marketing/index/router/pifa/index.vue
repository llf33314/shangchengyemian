<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
        <el-breadcrumb-item>批发管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="批发管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo">
                    <div class="index-input-box">
                    <div class="p-box">
                        <div>
                            <span v-if="goodsData.page.rowCount > 0">
                                选择状态 :
                                <el-select v-model="type" placeholder="请选择" @change="searchPifa">
                                    <el-option class="max-input" label="进行中":value="1"></el-option>
                                    <el-option class="max-input" label="未开始":value="-1"></el-option>
                                    <el-option class="max-input" label="已结束":value="2"></el-option>
                                    <el-option class="max-input" label="已失效":value="-2"></el-option>
                                </el-select>
                            </span>
                            <span v-if="goodsData.page.rowCount > 0">
                                选择店铺 :
                                <el-select v-model="shopId" placeholder="请选择" @change="searchPifa">
                                <el-option class="max-input" v-for="item in shopList"
                                    :key="item.id" :label="item.sto_name" :value="item.id">
                                </el-option>
                                </el-select>
                            </span>
                        </div>
                    <!-- <span>
                        <router-link to="/addBond">
                            <el-button 
                            type="warning"
                            ><i class="iconfont icon-cplay1"></i>
                            视频教程</el-button>
                        </router-link>
                    </span> -->
                    </div>
                    </div>
                    <router-link to="/addpifa/0">
                        <el-button type="primary">新建批发</el-button>
                    </router-link>
                </div>
                <el-table :data="goodsData.page.subList" style="width: 100%" v-if="goodsData.page.rowCount > 0">
                    <el-table-column
                    prop="proName"
                    label="商品名称">
                    </el-table-column>
                    <el-table-column
                    prop="shopName"
                    label="所属店铺">
                    </el-table-column>
                    <el-table-column
                    label="有效时间">
                        <template scope="scope">
                            {{scope.row.pfStartTime}}至{{scope.row.pfEndTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="活动状态">
                    <template scope="scope">
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
                    <el-table-column
                    label="操作"
                    min-width="120">
                    <template scope="scope">
                        <el-button size="small" class="buttonBlue" @click="jumpRouter('/addpifa/'+scope.row.id)"
                            v-if="scope.row.status == 0 || scope.row.status == 1">编辑</el-button>
                        <el-button size="small" class="buttonBlue" 
                            v-if="scope.row.status == 0 || (scope.row.joinId == 0 && scope.row.status == 1)"
                            @click="invalidDelete(scope.row.id, -2)" >失效</el-button>
                        <el-button size="small" class="buttonBlue" v-if="scope.row.status == 1" @click="preview()">预览</el-button>
                        <el-button size="small" v-if="scope.row.status == 0 || scope.row.status == -1 || scope.row.status == -2"
                            @click="handleDelete(scope.row.id, -1)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="shop-textr" v-if="goodsData.page.rowCount > 0">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="goodsData.page.curPage"
                        :page-size="goodsData.page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="goodsData.page.rowCount">
                    </el-pagination>
                </div>
                <content-no :show="contentNo" v-if="goodsData.page.rowCount == 0"></content-no>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批发商管理" name="2">
                <div class="common-content">
                     <div class="index-shopInfo" v-if="pifaData.page.rowCount > 0">
                        <div class="index-input-box">
                            <el-input placeholder="搜索关键词" icon="search" class="max-input" @keyup.enter.native="handleIconClick"
                                v-model="keyword" :on-icon-click="handleIconClick" >
                            </el-input>
                        </div>
                        <el-button type="primary" @click="synData">同步成交数/金额</el-button>
                    </div>
                     <el-table ref="multipleTable" :data="pifaData.page.subList" v-if="pifaData.page.rowCount > 0"
                        tooltip-effect="dark" style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="批发商ID">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="昵称">
                        </el-table-column>
                        <el-table-column
                        prop="num"
                        label="累计成交笔数">
                        </el-table-column>
                        <el-table-column
                        prop="money"
                        label="累计成交金额（元）">
                        </el-table-column>
                        <el-table-column
                            label="申请时间"
                            prop="create_time">
                        </el-table-column>
                        <el-table-column
                            label="通过时间"
                            prop="create_time">
                        </el-table-column>
                        <el-table-column
                            label="状态">
                            <template scope="scope">
                                <!-- <el-tooltip :content="'Switch value: ' + scope.row.is_use" placement="top"> -->
                                <el-switch v-model="scope.row.is_use" 
                                    on-text="开启" off-text="禁用"  @change="openDisable(scope.row.id,scope.row.is_use)">
                                </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width="120">
                        <template scope="scope">
                            <el-button size="small" class="buttonBlue"
                            @click="viewDetails(scope.row.name,scope.row.company_name,scope.row.telephone,scope.row.remark)"
                            >查看详情</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <el-button @click="toggleSelection(pifaData.page.subList)">全选</el-button>
                        <el-button @click="toggleSelection()">取消选择</el-button>
                        <el-button @click="checkExamine(1)">通过</el-button>
                        <el-button @click="checkExamine(-1)">不通过</el-button>
                    </div>
                    <div class="shop-textr" v-if="pifaData.page.rowCount > 0">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="pifaData.page.curPage"
                            :page-size="pifaData.page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="pifaData.page.rowCount">
                        </el-pagination>
                    </div>
                    <content-no v-if="pifaData.page.rowCount == 0"></content-no>
                    <el-dialog
                        title="批发商详细"
                        :visible.sync="dialogViewDetails"
                        size="tiny">
                        <div class="pifa-dialog-ul">
                            <p class="pifa-li">
                                <span>姓名：</span>
                                <span>{{detailName}}</span>
                            </p>
                             <p class="pifa-li">
                                <span>公司名称：</span>
                                <span>{{detailCompanyName}}</span>
                            </p>
                             <p class="pifa-li">
                                <span>电话号码：</span>
                                <span>{{detailTelphone}}</span>
                            </p>
                             <p class="pifa-li">
                                <span>备注：</span>
                                <span>{{detailRemark}}</span>
                            </p>
                        </div>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批发设置" name="3">
                <div class="common-content">
                    <el-form ref="form" :model="form" label-width="140px">
                        <el-form-item label="混批条件：">
                                <p style="margin-bottom:20px;">
                                    <el-checkbox name="type" v-model="form.pfSet.isHpMoney">
                                        一次性购买商品金额达
                                        <el-input v-model="form.pfSet.hpMoney" class="mix-input">
                                        <template slot="prepend">¥</template>
                                        </el-input>
                                    </el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox name="type" v-model="form.pfSet.isHpNum">
                                        一次性购买数量达
                                        <el-input v-model="form.pfSet.hpNum" class="mix-input"></el-input> 件
                                    </el-checkbox>
                                </p>
                        </el-form-item>
                        <el-form-item label="手批条件：">
                            <!-- <el-checkbox-group v-model="form.type"> -->
                                <el-checkbox name="type" v-model="form.pfSet.isSpHand">
                                    一次性购买商品达
                                      <el-input v-model="form.pfSet.spHand" class="mix-input"></el-input> 手
                                </el-checkbox> 
                            <!-- </el-checkbox-group> -->
                            <p class="p-warn">混批条件和手批条件必须设置一种</p>
                            <p class="p-warn">如果没有选择混批条件，我们会为您默认购买混批商品必须达到一件才能批发</p>
                            <p class="p-warn">如果没有选择手批条件，我们会为您默认购买手批商品必须达到一手才能批发</p>
                        </el-form-item>
                        <el-form-item label="批发商说明：">
                            <el-input v-model="form.paySet.pfRemark" type="textarea" :rows="2"
                                placeholder="请输入内容" style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item label="批发商申请说明：">
                            <el-input v-model="form.paySet.pfApplyRemark" type="textarea" :rows="2"
                                placeholder="请输入内容" style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button @click="returnPage()">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
          </el-tab-pane>
        </el-tabs>
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
      contentNo:'pifa',
      activeName:'1',
      type:'',
      shopId:'',
      goodsData: {
          page:{
              //rowCount : 0,
              subList:[],
          }
      },
      shopList: [],
      pifaData: {
          page:{
              //rowCount:'',
              subList:[],
          }
      },
      form: {
        pfSet : {},
        paySet:{},
      },
      dialogViewDetails:false,
      keyword:'',
      detailName:'',
      detailCompanyName : '',
      detailTelphone : '',
      detailRemark : '',
      path:'',
      multipleSelection : [],
    }
  },
  watch:{
    activeName :function(t,f){
      let _href= window.location.href;
      sessionStorage.setItem('href', _href);
    },
    $route :function(t,f){
      this.activeName= t.params.activeName;
    }
  },
  methods: {
    searchPifa(){//批发列表搜索
        this.mallWholesaleList(1);
    },
    handleIconClick(){//批发商列表输入搜索关键词事件
        this.mallPifaShangList(1);
    },
    returnPage(){//取消返回上一页
        window.history.go(-1);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.mallWholesaleList(val);
    },
    handleCurrentChange(val) {
      this.mallWholesaleList(val);
    },
    handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
        this.mallPifaShangList(val);
    },
    handleCurrentChange1(val) {
      this.mallPifaShangList(val);
    },
    handleClick(tab, event) {
      let _activeName = tab.name;
      this.$router.push(_activeName);
    },
    handleDelete(id,type){//删除批发事件
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要删除此批发活动吗？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
              _this.mallWholesaleDelete(id,type);
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    invalidDelete(id,type){//使批发活动失效事件
      let _this= this;
      let msg ={
        'dialogTitle':'您确定要将此批发活动失效吗？',//文本标题
        'dialogMsg': '失效后不能再进行交易',//文本内容
        'callback': {
          'btnOne': function(){
              _this.mallWholesaleDelete(id,type);
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    toggleSelection(rows) {//取消选择事件
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {//全选事件
        this.multipleSelection = val;
    },
    onSubmit() {//保存批发设置
        let _this= this;
        let formParam = _this.$refs['form'].model.pfSet;
        let pfSet = {};
        pfSet.isHpMoney = Number(formParam.isHpMoney);
        pfSet.isHpNum = Number(formParam.isHpNum);
        pfSet.isSpHand = Number(formParam.isSpHand);
        pfSet.hpMoney = formParam.hpMoney;
        pfSet.hpNum = formParam.hpNum;
        pfSet.spHand = formParam.spHand;
        let pfRemark = _this.$refs['form'].model.paySet.pfRemark;
        let pfApplyRemark = _this.$refs['form'].model.paySet.pfApplyRemark;
        //console.log(pfSet,'pfSet');
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesaleSaveSet_post,
            'data':{
                pfSet : JSON.stringify(pfSet),
                pfRemark : pfRemark,
                pfApplyRemark : pfApplyRemark
            },
            'success':function (data){
                if(data.code == 1){
                    _this.$message({
                        message: '保存设置成功',
                        type: 'success'
                    });
                }
            }
        });
    },
    /*查看详情 */
    viewDetails(name,company,tel,remark){
        this.dialogViewDetails=true;
        this.detailName = name;
        this.detailCompanyName = company;
        this.detailTelphone = tel;
        this.detailRemark = remark;
    },
    openDisable(id,isUse){//批发商启用、禁用
        let openOrDisable = -1;
        if(isUse){
            openOrDisable = 1;
        }
        this.mallWholesalersUpdateStatus(id,openOrDisable,'');
    },
    checkExamine(status){//审核通过、不通过事件
        let _this = this;
        let ids = '';
        if(_this.multipleSelection.length > 0){
            $.each(_this.multipleSelection,function(i){
                if(_this.multipleSelection.length == 1){
                    ids += _this.multipleSelection[i].id ;
                }else{
                    ids += _this.multipleSelection[i].id + ',';
                }
            });
            _this.mallWholesalersUpdateStatus(ids,'',status);
        }
    },
    synData(){//同步批发商成交数量/金额
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesaleSyncOrderPifa_post,
            'success':function (data){
                if(data.code == 1){
                    _this.$message({
                        message: '同步成功',
                        type: 'success'
                    });
                    _this.mallPifaShangList(1);
                }
            }
        });
    },
    mallWholesaleList(pageNum){//批发列表
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesaleList_post,
            'data':{
            curPage : pageNum,
            type : _this.type,
            shopId : _this.shopId  
            },
            'success':function (data){
                _this.goodsData = data.data;
                _this.path = data.path;
                _this.imgUrl = data.imgUrl;
                $.each(_this.goodsData.page.subList,function(i){
                    let oldTime = this.createTime;
                    this.createTime = Lib.M.format(oldTime);
                });
                //console.log(_this.goodsData,'_this.goodsData');
            }
        });
    },
    mallWholesaleDelete(id,type){//使批发失效、删除方法
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesaleDelete_post,
            'data':{
                id : id,
                type : type 
            },
            'success':function (data){
                if(data.code == 1){
                    _this.mallWholesaleList(_this.goodsData.page.curPage);
                }
                //_this.goodsData = data.data;
                //console.log(_this.goodsData,'_this.goodsData');
            }
        });
    },
    mallPifaShangList(pageNum){//批发商管理列表
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallPifaShangList_post,
            'data':{
                curPage : pageNum,
                keyword : _this.keyword 
            },
            'success':function (data){
                if(data.code == 1){
                    _this.pifaData = data.data;
                }
                //_this.goodsData = data.data;
                //console.log(_this.goodsData,'_this.goodsData');
            }
        });
    },
    mallWholesalersUpdateStatus(id,isUse,status){//批发商审核通过、不通过、启用、禁用方法
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallWholesalersUpdateStatus_post,
            'data':{
                ids : id,
                isUse : isUse,
                status : status 
            },
            'success':function (data){
                if(data.code == 1){
                    _this.mallPifaShangList(_this.pifaData.page.curPage);
                }
                //_this.goodsData = data.data;
                //console.log(_this.goodsData,'_this.goodsData');
            }
        });
    },
    mallSetWholesale(){//批发设置
        let _this= this;
        Lib.M.ajax({
            'url': DFshop.activeAPI.mallSetWholesale_post,
            'success':function (data){
                if(data.code == 1){
                    _this.form = data.data;
                    _this.form.pfSet.isHpMoney = !!data.data.pfSet.isHpMoney;
                    _this.form.pfSet.isHpNum = !!data.data.pfSet.isHpNum;
                    _this.form.pfSet.isSpHand = !!data.data.pfSet.isSpHand;
                    console.log(_this.form,'_this.form');
                }
            }
        });
    },
    preview(){//预览
        let _this = this;
        let msg ={
            'title':'',
            'urlQR': DFshop.activeAPI.mallStoreGenerateQRCode_get,
            'pageLink': _this.path+'/views/marketing/index.html#/'
        }
        _this.$root.$refs.dialogQR.showDialog(msg);//调用方法
    }
  },
  mounted(){
      let _this = this;
      _this.activeName = _this.$route.params.activeName;
      DFshop.method.storeList({
        'success'(data){
            _this.shopList = data.data;
        }
      });
      _this.mallWholesaleList(1);
      _this.mallPifaShangList(1);
      _this.mallSetWholesale();
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
</style>
