<template>
  <div class="common-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>超级营销员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本规则设置" name="1">
          <div class="common-content" style="padding: 40px 0;" v-if="isOpenSeller">
            <el-form ref="setupForm" :model="setupForm"  :rules="rules"  label-width="90px">
              <el-form-item label="积分奖励 :" prop="integralReward">
                每推荐1人关注商城公众号，可奖励
                <el-input v-model.number="setupForm.integralReward" class="mix-input"  style="width:85px"></el-input>
                积分
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="成为销售员 :" prop="consumeMoney">
                 当消费金额满
                <el-input v-model.number="setupForm.consumeMoney" class="mix-input" style="width:135px">
                  <template slot="prepend">¥</template>
                </el-input>
                可申请成为超级销售员
                <p class="p-warn">最多输入5位小数</p>
              </el-form-item>
              <el-form-item label="提现规则 :">
                <el-radio-group v-model="setupForm.withdrawalType" @change="choiceWithdrawl">
                  <p style="margin-bottom: 20px;">
                    <el-form-item prop="withdrawalLowestMoney">
                      <el-radio :label="1">最低可提现
                        <el-input v-model.number="setupForm.withdrawalLowestMoney" class="mix-input" style="width:135px">
                          <template slot="prepend">¥</template>
                        </el-input>
                      </el-radio>
                    </el-form-item>
                  </p>
                  <p>
                  <el-form-item prop="withdrawalMultiple" class="multiple-div">
                    <el-radio :label="2">按
                      <el-input v-model.number="setupForm.withdrawalMultiple" class="mix-input" style="width:135px">
                        <template slot="prepend">¥</template>
                      </el-input> 
                      倍数提现
                    </el-radio>
                  </el-form-item>
                  </p>
                </el-radio-group>
                <p class="p-warn">提现规则为最低1元，最高2000元</p>
              </el-form-item>
              <el-form-item label="经纪人说明 :">
               <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="setupForm.sellerRemark" style="width:358px;">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('setupForm')" :loading="loading">保存</el-button>
                <a :href="videourl" target="_blank" v-if="videourl!=null">
                  <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
                </a>
              </el-form-item>
            </el-form>
          </div>
           <content-no :show="contentNo2" v-else></content-no>
        </el-tab-pane>
        <el-tab-pane label="商品佣金设置" name="2">
           <div class="common-content">
             <div class="index-shopInfo">
              <div class="index-input-box">
                <span>
                  选择店铺 :
                  <el-select v-model="shopId" placeholder="请选择" @change="searchChose" v-if="shopList != null">
                     <el-option class="max-input" label="全部" :value="0"></el-option>
                    <el-option class="max-input" v-for="item in shopList"
                      :key="item.id" :label="item.sto_name" :value="item.id">
                    </el-option>
                  </el-select>
                </span>
                <span>
                  活动状态 :
                  <el-select v-model="isUse" placeholder="请选择" @change="searchChose">
                    <el-option class="max-input" label="全部" :value="null"></el-option>
                    <el-option class="max-input" label="已禁用" :value="0"></el-option>
                    <el-option class="max-input" label="已启用" :value="1"></el-option>
                  </el-select>
                </span>
              </div>
              <el-button type="primary" @click="jumpRouter('/addBond/0')">新建商品佣金</el-button>
             </div>
              <el-table v-loading.body="loading" element-loading-text="拼命加载中" 
              :data="goodsData.page.subList" style="width: 100%" v-if="goodsData.page.rowCount > 0 || loading">
                <el-table-column
                  prop="pro_name"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  prop="shopName"
                  label="所属店铺">
                </el-table-column>
                <el-table-column
                  label="活动状态">
                   <template slot-scope="scope">
                     <span v-if="scope.row.is_use === 1">已启用</span>
                     <span v-if="scope.row.is_use === 0">已禁用</span>
                   </template>
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button size="small" class="buttonBlue" @click="jumpRouter('/addBond/'+scope.row.id)">编辑</el-button>
                    <el-button size="small" class="buttonBlue" @click="setCommissionStatus(scope.row.id,-2)" 
                        v-if="scope.row.is_use === 0">启用</el-button>
                    <el-button size="small" class="buttonBlue" @click="setCommissionStatus(scope.row.id,-1)"
                        v-if="scope.row.is_use === 1">禁用</el-button>
                    <el-button size="small" class="buttonBlue" @click="preview(scope.row)">预览</el-button>
                    <el-button size="small" @click="setCommissionStatus(scope.row.id,-3)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="shop-textr" v-if="goodsData.page.pageCount > 1">
                  <el-pagination  background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="goodsData.page.curPage"
                      :page-size="goodsData.page.pageSize"
                      layout="prev, pager, next, jumper"
                      :total="goodsData.page.rowCount">
                  </el-pagination>
              </div>
              <content-no :show="contentNo" v-if="goodsData.page.rowCount === 0"></content-no>
           </div>
        </el-tab-pane>
        <el-tab-pane label="推荐审核" name="3">
          <div class="common-content" v-if="isCheckSeller ==1">
            <div class="index-shopInfo">
              <!-- <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync"
                placeholder="销售员名字/手机" @select="handleSelect" icon="search" ></el-autocomplete> -->
                <el-input v-model.trim="keyWord" 
                  placeholder="销售员名字/手机" 
                  class="max-input" 
                  @keyup.enter.native="searchExamine">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="searchExamine"></i>
                </el-input>
            </div>
            <el-table :data="examineData.page.subList" style="width: 100%" v-if="examineData.page.rowCount > 0">
              <el-table-column
                prop="user_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="tj_user_name"
                label="推荐人">
              </el-table-column>
              <el-table-column
                prop="apply_time | formatNot"
                label="推荐时间">
              </el-table-column>
              <el-table-column
                label="审核状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.check_status == 0">未审核</span>
                  <span v-if="scope.row.check_status == 1">审核通过</span>
                  <span v-if="scope.row.check_status == -1">审核不通过</span>
                  <span v-if="scope.row.check_status == -2">待审核销售员</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作" width="180">
                <template slot-scope="scope">
                  <el-button size="small" class="buttonBlue" @click="passExamine(scope.row.id,1)">通过</el-button>
                  <el-button size="small" @click="refuseExamine(scope.row.id,-1)">拒绝</el-button>
                </template>
              </el-table-column> 
            </el-table>
            <div class="shop-textr" v-if="examineData.page.pageCount > 1">
                <el-pagination  background
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="examineData.page.curPage"
                    :page-size="examineData.page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="examineData.page.rowCount">
                </el-pagination>
            </div>
            <content-no v-if="examineData.page.rowCount == 0"></content-no>
          </div>
           <content-no :show="contentNo1" v-else></content-no>
        </el-tab-pane>
        <el-tab-pane label="销售员管理" name="4">
          <div class="common-content">
            <div class="index-shopInfo">
              <el-input v-model.trim="keyWord_sellers" 
                  placeholder="销售员名字/手机" 
                  class="max-input" 
                  @keyup.enter.native="searchSeller">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSeller"></i>
              </el-input>
            </div>
            <el-table :data="sellersList.page.subList" style="width: 100%" v-if="sellersList.page.rowCount > 0">
              <el-table-column
                prop="user_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="income_integral"
                label="积分">
              </el-table-column>
              <el-table-column
                prop="sale_money"
                label="销售额（元）">
              </el-table-column>
              <el-table-column
                prop="commission"
                label="总佣金（元）">
              </el-table-column>
              <el-table-column
                prop="freeze_commission"
                label="冻结佣金（元）">
              </el-table-column>
              <el-table-column
                prop="add_time"
                width="175"
                label="加入时间">
              </el-table-column>
              <el-table-column
                label="操作" width="300">
                <template slot-scope="scope">
                  <el-button size="small" class="buttonBlue" @click="jumpRouter('/recommendList/'+scope.row.member_id)">推荐列表</el-button>
                  <el-button size="small" class="buttonBlue" @click="jumpRouter('/withDrawList/'+scope.row.member_id)">提现记录</el-button>
                  <el-button size="small" v-if="scope.row.is_start_use == 1" 
                    @click="setSellerStatus(scope.row.id,scope.row.user_name,-1)">暂停</el-button>
                  <el-button size="small" v-if="scope.row.is_start_use == -1"
                    @click="setSellerStatus(scope.row.id,scope.row.user_name,1)">启动</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="shop-textr" v-if="sellersList.page.pageCount > 1"> 
                <el-pagination  background
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page.sync="sellersList.page.curPage"
                    :page-size="sellersList.page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="sellersList.page.rowCount">
                </el-pagination>
            </div>
            <content-no v-if="sellersList.page.rowCount == 0"></content-no>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提现列表" name="5">
           <div class="common-content">
            <div class="index-shopInfo">
              <div class="index-input-box">
                <span>
                  <el-input v-model.trim="keyWord_tixian" 
                    placeholder="销售员名字/手机" 
                    class="max-input" 
                    @keyup.enter.native="searchSale">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchSale"></i>
                  </el-input>
                </span>
                <span>
                  提现时间 ：
                  <el-date-picker 
                    v-model="cashDate" 
                    type="datetimerange" 
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="cashSearch"></el-date-picker>
                </span>
              </div>
            </div>
            <el-table :data="saleData.page.subList" style="width: 100%" v-if="saleData.page.rowCount > 0">
              <el-table-column
                prop="applay_time"
                label="提现时间">
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="名字">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="withdraw_money"
                label="提现金额（元）">
              </el-table-column>
              <el-table-column
                prop="withdraw_order_no"
                label="订单号">
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.withdraw_status == 1">待打款</span>
                  <span v-if="scope.row.withdraw_status == 2">已打款</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="shop-textr" v-if="saleData.page.pageCount >1">
                <el-pagination  background
                    @size-change="handleSizeChange4"
                    @current-change="handleCurrentChange4"
                    :current-page.sync="saleData.page.curPage"
                    :page-size="saleData.page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="saleData.page.rowCount">
                </el-pagination>
            </div>
            <content-no v-if="saleData.page.rowCount === 0"></content-no>
          </div> 
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>

<script>
import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";
export default {
  components: {
    contentNo
  },
  data() {
    var formRule = (rule, value, callback) => {
      let type = this.setupForm.withdrawalType;
      if (type == 1) {
        if (value < 1 || value > 2000) {
          return callback(new Error("提现规则为最低1元，最高2000元"));
        }
      }
      callback();
    };
    var formRule2 = (rule, value, callback) => {
      let type = this.setupForm.withdrawalType;
      if (type == 2) {
        if (value < 1 || value > 2000) {
          return callback(new Error("提现规则为最低1元，最高2000元"));
        }
      }
      callback();
    };
    return {
      activeName: "1",
      contentNo: "commission",
      contentNo1: "openCheckSeller",
      contentNo2:"openSeller",
      isCheckSeller:'',
      isOpenSeller:'',
      cashDate: [],
      cashShop: "",
      keyWord_sellers: "",
      keyWord_tixian: "",
      keyWord: "",
      videourl:'',
      setupForm: {
        integralReward: "", //积分
        consumeMoney: "", //销售员
        withdrawalType: 1, //提现
        withdrawalLowestMoney: "", //最低提现
        withdrawalMultiple: "", //按倍数提现
        sellerRemark: "" //说明
      },
      rules: {
        integralReward: [
          {
            min: 0,
            max: 99999.99,
            type: "number",
            trigger: "blur",
            message: "最多只能输入5位小数"
          }
        ],
        consumeMoney: [
          {
            min: 0,
            max: 99999.99,
            type: "number",
            trigger: "blur",
            message: "最多只能输入5位小数"
          }
        ],
        withdrawalLowestMoney: [
          {
            validator: formRule,
            trigger: "blur",
            message: "提现规则为最低1元，最高2000元"
          }
        ],
        withdrawalMultiple: [
          {
            validator: formRule2,
            trigger: "blur",
            message: "提现规则为最低1元，最高2000元"
          }
        ]
      },
      goodsData: {
        page: {
          subList: []
        }
      },
      shopList: [],
      examineData: {
        page: {
          subList: []
        }
      },
      saleData: {
        page: {
          subList: []
        }
      },
      sellersList: {
        page: {
          subList: []
        }
      },
      shopId: "",
      isUse: "",
      restaurants: [],
      state4: "",
      timeout: null,
      imgUrl: "",
      path: "",
      webPath: "",//
      loading: false,//是否开启loading
      saleMemberId:0,//销售员id
      loading:false,
    };
  },
  watch: {
    activeName: function(t, f) {
      let _href = window.location.href;
      sessionStorage.setItem("href", _href);
    },
    $route: function(t, f) {
      let _this = this;
      this.activeName = t.params.activeName;
      if(_this.activeName ==1){
        _this.mallSellersGetSellerSet();
      }else if(_this.activeName == 2){
        _this.mallSellersJoinProduct(1);
      }else if(_this.activeName == 3){
        _this.mallSellersCheckList(1);
      }else if(_this.activeName == 4){
        _this.mallSellersList(1);
      }else if (_this.activeName == 5){
        _this.mallSellersWithDrawList(1);
      }
    }
  },
  methods: {
    /**提现规则改变事件 */
    choiceWithdrawl() {
      if (this.setupForm.withdrawalType == 1) {
        this.setupForm.withdrawalMultiple = "";
      } else {
        this.setupForm.withdrawalLowestMoney = "";
      }
    },
    /**推荐审核搜索框 */
    searchExamine() {
      this.mallSellersCheckList(this.examineData.page.curPage);
    },
    /**销售员搜索框 */
    searchSeller() {
      this.mallSellersList(this.sellersList.page.curPage);
    },
    /**提现搜索框 */
    searchSale() {
      this.mallSellersWithDrawList(this.saleData.page.curPage);
    },
    onSubmit(formName) {
      //保存基本设置事件
      //onsole.log('submit!');
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          let param = {};
          param = JSON.parse(JSON.stringify(_this.$refs[formName].model));
          if (param.withdrawalType == 1) {
            param.withdrawalMultiple = "";
          } else {
            param.withdrawalLowestMoney = "";
          }
          param.sellerRemark = _this.$refs[formName].model.sellerRemark;

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
          _this.loading = !Lib.C.ajax_manage;

          _this.ajaxRequest({
            url: DFshop.activeAPI.mallSellersSaveSellerSet_post,
            data: { sellerSet: param },
            success: function(data) {
              _this.loading = false;
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              // _this.mallSellersGetSellerSet();
              //window.location.reload();
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.mallSellersJoinProduct(val);
    },
    handleCurrentChange(val) {
      this.mallSellersJoinProduct(val);
    },
    handleSizeChange2(val) {
      this.mallSellersCheckList(val);
    },
    handleCurrentChange2(val) {
      this.mallSellersCheckList(val);
    },
    handleSizeChange3(val) {
      this.mallSellersList(val);
    },
    handleCurrentChange3(val) {
      this.mallSellersList(val);
    },
    handleSizeChange4(val) {
      this.mallSellersWithDrawList(val);
    },
    handleCurrentChange4(val) {
      this.mallSellersWithDrawList(val);
    },
    handleClick(tab, event) {
      let _activeName = tab.name;
      this.$router.push(_activeName);
    },
    refuseExamine(sellerId, checkStatus) {
      //推荐审核拒绝弹出框
      let _this = this;
      let msg = {
        dialogTitle: "确定拒绝该审核吗？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallSellersCheckSeller(sellerId, checkStatus);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    passExamine(sellerId, checkStatus) {
      //推荐审核通过弹出框
      let _this = this;
      let msg = {
        dialogTitle: "确定通过该审核吗？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallSellersCheckSeller(sellerId, checkStatus);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    setSellerStatus(id, name, type) {
      if(name==null){name="";}
      //设置销售员暂停、启用事件
      let _this = this;
      msg = "确认将销售员" + name;
      if (type === 1) {
        msg += "启用吗？";
      } else {
        msg += "暂停吗？";
      }
      let msg = {
        dialogTitle: msg, //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallSellerStartUseSeller(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
   
    handleSelect(item) {
      console.log(item);
    },
    searchChose() {
      this.loading = true;
      this.mallSellersJoinProduct(1);
    },
    mallSellersGetSellerSet() {
      //超级销售员基础设置
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersGetSellerSet_post,
        success: function(data) {
          _this.isOpenSeller=data.data.isOpenSeller;
          if(_this.isOpenSeller){
            _this.setupForm = data.data.sellerSet;
            _this.videourl=data.data.videourl;
          }
          //console.log(_this.setupForm,'setupForm')
        }
      });
    },
    mallSellersJoinProduct(pageNum) {
      //商品佣金设置列表
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersJoinProduct_post,
        data: {
          curPage: pageNum,
          shopId: _this.shopId,
          isUse: _this.isUse
        },
        success: function(data) {
          _this.goodsData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.path = data.path;
          _this.webPath = data.webPath;
          _this.loading = false;
          $.each(_this.goodsData.page.subList, function(i) {
            let oldTime = this.create_time;
            this.create_time = Lib.M.format(oldTime);
          });
          //console.log(_this.goodsData,'goodsData')
        }
      });
    },
    mallSellersCheckList(pageNum) {
      //推荐审核列表
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersCheckList_post,
        data: {
          curPage: pageNum,
          keyWord: _this.keyWord
        },
        success: function(data) {
          
          _this.isCheckSeller=data.data.isCheckSeller;
          if(data.data.isCheckSeller==1){
            _this.examineData = data.data;
          }
         
        }
      });
    },
    mallSellersCheckSeller(sellerId, checkStatus) {
      //推荐审核通过、拒绝方法
      let _this = this;
      let msg = "";
      if (checkStatus === 1) {
        msg = "审核通过";
      } else {
        msg = "审核不通过";
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersCheckSeller_post,
        data: {
          id: sellerId,
          checkStatus: checkStatus
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallSellersCheckList(_this.examineData.page.curPage);
          // console.log(data, "data");
        }
      });
    },
    mallSellersList(pageNum) {
      //销售员列表
      let _this = this;
      let _data = {
        curPage: pageNum,
        keyWord: _this.keyWord_sellers
      };
      if(_this.saleMemberId > 0){
        _data.saleMemId = _this.saleMemberId;
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersList_post,
        data: _data,
        success: function(data) {
          _this.sellersList = data.data;
          $.each(_this.sellersList.page.subList, function(i) {
            if (this.add_time != undefined && this.add_time != "") {
              let oldTime = this.add_time;
              this.add_time = Lib.M.format(oldTime);
            }
          });
          // console.log(_this.sellersList, "sellersList");
        }
      });
    },
 
    mallSellersWithDrawList(pageNum) {
      //提现列表
      let _this = this;
      let startTime = "";
      let endTime = "";
      let cashTime = _this.cashDate;
      if (cashTime != "") {
        startTime = Lib.M.format(new Date(cashTime[0]));
        endTime = Lib.M.format(new Date(cashTime[1]));
      }else{
        startTime ='';
        endTime = '';
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellersWithDrawList_post,
        data: {
          curPage: pageNum,
          keyWord: _this.keyWord_tixian,
          startTime: startTime,
          endTime: endTime
        },
        success: function(data) {
          //console.log(data,'data')
          _this.saleData = data.data;
          $.each(_this.saleData.page.subList, function(i) {
            let oldTime = this.applay_time;
            this.applay_time = Lib.M.format(oldTime);
          });
          // console.log(_this.saleData, "saleData");
        }
      });
    },
    preview(obj) {
      console.log(obj, "obj");
      //商品佣金列表预览方法
      let _this = this;
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.webPath,
        pageLink:
          "/goods/details/" +
          obj.shop_id +
          "/" +
          obj.user_id +
          "/8/" +
          obj.product_id +
          "/" +
          obj.id +
          "/0/view"
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    setCommissionStatus(id, type) {
      //商品拥金列表已禁用、已启用、已删除方法
      let _this = this;
      let msg = "";
      if (type === -1) {
        msg = "已禁用";
      } else if (type === -2) {
        msg = "已启用";
      } else {
        msg = "已删除";
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellerSetJoinProductStatus_post,
        data: {
          id: id,
          type: type
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallSellersJoinProduct(_this.goodsData.page.curPage);
          //console.log(_this.saleData,'saleData')
        }
      });
    },
    mallSellerStartUseSeller(id, type) {
      //销售员暂停、启用方法
      let _this = this;
      let msg = "";
      if (type === -1) {
        msg = "已暂停";
      } else {
        msg = "已启用";
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSellerStartUseSeller_post,
        data: {
          id: id,
          isStartUse: type
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallSellersList(_this.sellersList.page.curPage);
          //console.log(_this.saleData,'saleData')
        }
      });
    },
    cashSearch(value) {
      if(value == ''){
        this.cashDate='';
      }
      //提现时间选择改变事件
      this.mallSellersWithDrawList(1);
    }
  },
  mounted() {
    let _this = this;
    _this.activeName = _this.$route.params.activeName;
  
    _this.storeList({
      success(data) {
        _this.shopList = data.data; 
      }
    });

    if(_this.activeName ==1){
       _this.mallSellersGetSellerSet();
    }else if(_this.activeName == 2){
      _this.mallSellersJoinProduct(1);
    }else if(_this.activeName == 3){
      _this.mallSellersCheckList(1);
    }else if(_this.activeName == 4){
      _this.mallSellersList(1);
    }else if (_this.activeName == 5){
      _this.mallSellersWithDrawList(1);
    }
   
  }
  // destroyed () {
  //   console.log(1,'11*************');
  //   sessionStorage.removeItem('href');
  // }
};
</script>

<style lang="less">
.shop-textr{
  margin-top:20px;  
}
.multiple-div {
  .el-form-item__error {
    position: relative !important;
  }
}
</style>
<style lang="less" scoped>
@import "../../../less/style.less";
</style>
