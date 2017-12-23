<template>
  <div class="integralmall-wrapper" >
    <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>对外报价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="报价单管理" name="1" >
                <div class="common-content">
                    <div class="index-shopInfo">
                        <el-form :inline="true" :model="searchData" class="demo-form-inline">
                            <el-form-item >
                                <el-input v-model="searchData.search" placeholder="请输入报价单号" @blur="search()"></el-input>
                            </el-form-item>
                            <el-form-item label="订单状态 :">
                                <el-select v-model="searchData.status" placeholder="全部" @change="search()">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="待发布" value="1"></el-option>
                                    <el-option label="待付款" value="2"></el-option>
                                    <el-option label="已付款" value="3"></el-option>
                                    <el-option label="已完成" value="4"></el-option>
                                    <el-option label="已关闭" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <span class="demonstration"  style="font-size:13px;">创建时间 :</span>
                                <el-date-picker  v-model="value7"  type="daterange" @change="search_date"
                                   :picker-options="pickerOptions" align="right" placeholder="选择日期范围" value-format="yyyy-MM-dd" >
                                </el-date-picker>
                            </el-form-item >
                            <div></div>
                            <router-link to="/order/add"><el-button type="primary">新增</el-button></router-link>
                        </el-form>
                    </div>
                    <el-table :data="orderList" v-if="isData" style="width: 100%">
                        <el-table-column
                            prop="order_number"
                            label="报价单号">
                        </el-table-column>
                        <el-table-column
                            prop="order_title"
                            label="报价单标题">
                        </el-table-column>
                        <el-table-column
                            label="付款类型">
                            <template scope="scope">
                                <span v-if="scope.row.order_type == 0">
                                全款
                                </span>
                                <span v-if="scope.row.order_type == 1">
                                分期
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="freight"
                            label="运费（元）">
                        </el-table-column>
                        <el-table-column
                            prop="all_money"
                            label="报价单金额（元）">
                        </el-table-column>
                        <el-table-column
                            prop="order_status"
                            label="报价单状态">
                             <template scope="scope">
                                <span v-if="scope.row.order_status == 0">
                                已关闭
                                </span>
                                <span v-if="scope.row.order_status == 1">
                                待发布
                                </span>
                                <span v-if="scope.row.order_status == 2">
                                待付款
                                </span>
                                <span v-if="scope.row.order_status == 3">
                                已付款
                                </span>
                                <span v-if="scope.row.order_status == 4">
                                已完成
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="创建时间">
                             <template scope="scope">
                                <div>{{scope.row.create_date|format}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width="200">
                        <template scope="scope">
                            <el-button v-if="scope.row.order_status == 1" size="small" @click="jumpRouter('/order/update/'+scope.row.id)" class="buttonBlue">修改</el-button>
                            <el-button size="small" class="buttonBlue" @click="jumpRouter('/details/'+scope.row.id)">详情</el-button>
                            <el-button v-if="scope.row.member_id" size="small" class="buttonBlue" @click="jumpRouter('/receivablesDetails/'+scope.row.id+'/'+scope.row.member_id)">收款信息</el-button>
                            <el-button size="small" class="buttonBlue" @click="jumpRouter('/languageList/'+scope.row.id)">留言管理</el-button>
                            <el-button  size="small" class="buttonBlue"  @click="preview(scope.row)">二维码</el-button>
                            <el-button size="small" class="buttonBlue"  @click="jumpRouter('/statisticsList/'+scope.row.id)">统计</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="合同管理" name="2">
                <div class="common-content">
                    <div class="index-shopInfo">
                        <div class="index-input-box">
                            <el-input v-model="contractTitle" placeholder="请输入合同标题" icon="search" class="max-input" @blur="contractSearch()"></el-input>
                        </div>
                        
                        <router-link to="/contract/add">
                            <el-button  type="primary" >新增</el-button>
                        </router-link>
                    </div>
                    <el-table ref="multipleTable" v-if="isData" :data="contractList" tooltip-effect="dark" style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="编号">
                        </el-table-column>
                        <el-table-column
                        prop="contract_title"
                        label="合同标题">
                        </el-table-column>
                        <el-table-column
                        label="创建时间">
                        <template scope="scope">
                                <div>{{scope.row.create_date|format}}</div>
                            </template>
                        </el-table-column> 
                        <el-table-column
                            label="操作">
                            <template scope="scope">
                                <el-button  size="small" class="buttonBlue" @click="jumpRouter('/contract/update/'+scope.row.id)" >修改</el-button>
                                <el-button size="small" @click="contractDelete(scope.row.id)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司模板设置" name="3">
                <div class="common-content">
                        <div class="index-shopInfo">
                        <div class="index-input-box">
                            <el-input v-model="keyWord" placeholder="请输入名称/电话/地址" icon="search" class="max-input"  @blur="companySearch()"></el-input>
                        </div>
                        <router-link to="/company/add">
                            <el-button  type="primary" >新增</el-button>
                        </router-link>
                    </div>
                    <el-table ref="multipleTable" v-if="isData"  :data="companyList"  tooltip-effect="dark" style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="编号">
                        </el-table-column>
                        <el-table-column
                        prop="company_name"
                        label="公司名称">
                        </el-table-column>
                        <el-table-column
                        prop="company_tel"
                        label="公司电话">
                        </el-table-column>
                        <el-table-column
                        prop="company_address"
                        label="公司地址">
                        </el-table-column> 
                        <el-table-column
                        prop="company_internet"
                        label="公司官网">
                        </el-table-column> 
                        <el-table-column
                            label="操作">
                            <template scope="scope">
                                <el-button size="small" class="buttonBlue" @click="jumpRouter('/company/update/'+scope.row.id)">修改</el-button>
                                <el-button size="small" @click="companyDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="block shop-textr" v-if="page.pageCount > 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page='page.curPage'
                :page-size="page.pageSize"
                layout="prev, pager, next, jumper"
                :total="page.rowCount">
            </el-pagination>
        </div>
        <contentNo v-if="!isData" :show="contentNo" ></contentNo>
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
      pickerOptions: {
        disabledDate(time) {
        return time.getTime() > Date.now();
        },
      },
      contentNo:'',//无数据提示页面
      isData:'',//是否有数据
      activeName:'1', //选项卡编号
      value7:'',//创建时间参数
      page:{},//公共页面数据

      searchData:{//报价单查询参数
        status:'',
        search:'',
        startTime:'',
        endTime:'',
        curPage:''
      },
      orderList:[],//报价单列表数据
  
      contractList:[],//合同列表数据
      contractTitle:'',//合同标题参数

      companyList:[],//公司模板列表
      keyWord:''//公司名称/电话/官网 参数
    }
  },
   watch:{
    //监听选项卡变化
    activeName :function(t,f){
    //   let _href= window.location.href;
    //   sessionStorage.setItem('href', _href);
    },
    $route :function(t,f){
    //   console.log(t.params.activeName,"当前编号");
    //   console.log(f.params.activeName,"以前编号");
      this.activeName= t.params.activeName;
      this.refreshData(1); 
    }
  },
  methods: {
    /**报价单筛选查询 */
    search(name){
      this.searchData.curPage=1;
      this.purchaseOrderList( this.searchData);
    },
    /**报价单时间筛选查询 */
    search_date(value){
      let _this = this;
      _this.searchData.curPage=1;
      if(value != ""){
        let date=value.split(" - ");
        _this.searchData.startTime=date[0]
        _this.searchData.endTime=date[1];
      }else{
        _this.searchData.startTime='';
        _this.searchData.endTime='';
      }
      this.purchaseOrderList( this.searchData);
    },

    /**合同筛选查询 */
    contractSearch(){
        this.purchaseContractList(1);
    },
    /**公司模板筛选查询 */
    companySearch(){
        this.purchaseCompanyList(1);
    },
    /**
     * 报价单多页请求
     * @param data     请求参数
     */
    purchaseOrderList(data){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseOrderList_post,
        'data':data,
        'success':function (data){
        //   console.log(data.data,'data.data');
            if(data.data.page.rowCount >0){
                _this.isData=true;
            }else{
                _this.isData=false;
                _this.contentNo="baojia";
            }
          _this.orderList = data.data.page.subList;
          _this.page = {
            curPage:  data.data.page.curPage,
            pageCount: data.data.page.pageCount,
            pageSize: data.data.page.pageSize,
            rowCount: data.data.page.rowCount
          }
        }
      });
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
    /**
     * 合同列表多页请求
     * @param curPage     请求页数
     */
    purchaseContractList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseContractList_post,
        'data':{
            "curPage":curPage,
            "contractTitle":_this.contractTitle
        },
        'success':function (data){
        //   console.log(data.data,'data.data');
            if(data.data.page.rowCount >0){
                _this.isData=true;
            }else{
                _this.isData=false;
                _this.contentNo="hetong";
            }
            _this.contractList = data.data.page.subList;
            _this.page = {
                curPage:  data.data.page.curPage,
                pageCount: data.data.page.pageCount,
                pageSize: data.data.page.pageSize,
                rowCount: data.data.page.rowCount
            }
        }
      });
    },
    /**删除合同 */
    contractDelete(id){
      let _this= this;
      let msg ={
        'dialogTitle':'确定要删除此合同信息？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.ajaxRequest({
                'url': DFshop.activeAPI.purchaseContractDelete_post,
                'data':{
                    id : id 
                },
                'success':function (data){
                    if(data.code == 0){
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.purchaseContractList(_this.page.curPage);
                    }
                }
            });
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    /**
     * 公司模板列表多页请求
     * @param curPage     请求页数
     */
    purchaseCompanyList(curPage){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseCompanyList_post,
        'data':{
            "curPage":curPage,
            "keyWord":_this.keyWord
        },
        'success':function (data){
        //   console.log(data.data,'data.data');
            if(data.data.page.rowCount >0){
                _this.isData=true;
            }else{
                _this.isData=false;
                _this.contentNo="GSmodule";
            }
          
            _this.companyList = data.data.page.subList;
            _this.page = {
                curPage:  data.data.page.curPage,
                pageCount: data.data.page.pageCount,
                pageSize: data.data.page.pageSize,
                rowCount: data.data.page.rowCount
            }
        }
      });
    },
    /**删除公司模板 */
    companyDelete(id){
      let _this= this;
      let msg ={
        'dialogTitle':'确定要删除此公司模板？',//文本标题
        'dialogMsg': '',//文本内容
        'callback': {
          'btnOne': function(){
            _this.ajaxRequest({
                'url': DFshop.activeAPI.purchaseCompanyDelete_post,
                'data':{
                    id : id 
                },
                'success':function (data){
                    if(data.code == 0){
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.purchaseCompanyList(_this.page.curPage);
                    }
                }
            });
          }
        }
      }
      _this.$root.$refs.dialog.showDialog(msg); 
    },
    //切换后刷新数据
    refreshData(curPage){
      if(this.activeName == 1){
        this.searchData.curPage=curPage;
        this.purchaseOrderList(this.searchData);
      }else if(this.activeName == 2){
        this.purchaseContractList(curPage);
      }else if(this.activeName == 3){
        this.purchaseCompanyList(curPage);
      }
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
      this.refreshData(val); 
    }
  },
  mounted() {
    this.isMarketingUrl();
    this.activeName = this.$route.params.activeName;
    this.refreshData(1); 
  }   
}
</script>

<style lang="less" scoped>
@import '../../../less/style.less';
.index-contentNo{
    margin-top:0px;
}
.common-content{
     margin: 20px 0;
}
</style>
