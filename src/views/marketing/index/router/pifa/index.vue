<template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
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
                            <span>
                                选择状态 :
                                <el-select v-model="type" placeholder="请选择" @change="searchPifa">
                                    <el-option class="max-input" label="全部" :value="0"></el-option>
                                    <el-option class="max-input" label="进行中" :value="1"></el-option>
                                    <el-option class="max-input" label="未开始" :value="-1"></el-option>
                                    <el-option class="max-input" label="已结束" :value="2"></el-option>
                                    <el-option class="max-input" label="已失效" :value="-2"></el-option>
                                </el-select>
                            </span>
                            <span>
                                选择店铺 :
                                <el-select v-model="shopId" placeholder="请选择" @change="searchPifa">
                                  <el-option class="max-input"  :value="''" label="全部"></el-option>
                                  <el-option class="max-input" v-for="item in shopList"
                                      :key="item.id" :label="item.sto_name" :value="item.id">
                                  </el-option>
                                </el-select>
                            </span>
                        </div>
                     <span v-if="videourl != null">
                        <a :href="videourl">
                          <el-button type="warning"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
                        </a>
                    </span> 
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
                    <el-table-column width="190"
                    label="活动状态">
                    <template scope="scope">
                        <span v-if="scope.row.status === 1">进行中</span>
                        <span v-if="scope.row.status === -1">已结束</span>
                        <span v-if="scope.row.status === 0">未开始</span>
                        <span v-if="scope.row.status === -2">已失效</span>
                    </template>
                    </el-table-column>
                    <el-table-column  width="190"
                    prop="createTime"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template scope="scope">
                        <el-button size="small" class="buttonBlue" @click="jumpRouter('/addpifa/'+scope.row.id)"
                            v-if="scope.row.status == 0 || scope.row.status == 1">编辑</el-button>
                        <el-button size="small" class="buttonBlue" 
                            v-if="scope.row.status == 0 || (scope.row.joinId == 0 && scope.row.status == 1)"
                            @click="invalidDelete(scope.row.id, -2)" >失效</el-button>
                        <el-button size="small" class="buttonBlue" v-if="scope.row.status == 1" @click="preview(scope.row)">预览</el-button>
                        <el-button size="small" v-if="scope.row.status == 0 || scope.row.status == -1 || scope.row.status == -2"
                            @click="handleDelete(scope.row.id, -1)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="shop-textr" v-if="goodsData.page.pageCount > 1">
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
                     <div class="index-shopInfo" >
                        <div class="index-input-box">
                            <el-input placeholder="搜索关键词" icon="search" class="max-input" @keyup.enter.native="handleIconClick"
                                v-model.trim="keyword" :on-icon-click="handleIconClick" >
                            </el-input>
                        </div>
                        <el-button type="primary" @click="synData" v-if="pifaData.page.rowCount > 0">同步成交数/金额</el-button>
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
                                <el-switch v-model="scope.row.is_use" on-text="开启" off-text="禁用" :on-value=1 :off-value=-1 v-if="scope.row.status == 1"
                                  @change="openDisable(scope.row.id,scope.row.is_use)">
                                </el-switch>
                                <div v-if="scope.row.status < 1">
                                  <el-button type="primary" icon="check" size="mini" @click="checkStatus(1,scope.row)">通过</el-button>
                                  <el-button type="danger" icon="close" size="mini" @click="checkStatus(-1,scope.row)">不通过</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column   width="120" type="expand" > 
                          <template scope="props">
                              <div class="table-expand2">
                                <p >
                                  <span class="labelss">公司名称：</span>
                                  <span>{{ props.row.company_name }}</span>
                                </p>
                                <p>
                                  <span class="labelss">电话：</span>
                                  <span>{{ props.row.telephone }}</span>
                                </p>
                                <p  >
                                  <span class="labelss">备注：</span>
                                  <span>{{ props.row.remark }}</span>
                                </p>
                              </div>
                          </template>
                        </el-table-column>
                        <!-- <el-table-column
                           >
                        <template scope="scope">
                            <el-button size="small" class="buttonBlue"
                            @click="viewDetails(scope.row.name,scope.row.company_name,scope.row.telephone,scope.row.remark)"
                            >查看详情</el-button>
                        </template>
                        </el-table-column> -->
                    </el-table>
                    <div style="margin-top: 20px" v-if="pifaData.page.rowCount > 0">
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
                    <el-form ref="form" :rules="rules" :model="form" label-width="140px">
                        <el-form-item label="混批条件：">
                          <p style="margin-bottom:20px;">
                            <el-form-item prop="hpMoney" >
                              <el-checkbox name="type" v-model="form.pfSet.isHpMoney">
                                  一次性购买商品金额达
                                  <el-input v-model.number="form.pfSet.hpMoney" class="mix-input"  >
                                  <template slot="prepend">¥</template>
                                  </el-input>
                              </el-checkbox>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item  prop="isHpNum" >
                              <el-checkbox name="type" v-model="form.pfSet.isHpNum">
                                  一次性购买数量达
                                  <el-input v-model.number="form.pfSet.hpNum" class="mix-input"  ></el-input> 件
                              </el-checkbox>
                             </el-form-item>
                          </p>
                        </el-form-item>
                        <el-form-item label="手批条件：" prop="spHand">
                            <!-- <el-checkbox-group v-model="form.type"> -->
                                <el-checkbox name="type" v-model="form.pfSet.isSpHand">
                                    一次性购买商品达
                                      <el-input v-model.number="form.pfSet.spHand" class="mix-input" ></el-input> 手
                                </el-checkbox> 
                            <!-- </el-checkbox-group> -->
                            <p class="p-warn">混批条件和手批条件必须设置一种</p>
                            <p class="p-warn">如果没有选择混批条件，我们会为您默认购买混批商品必须达到一件才能批发</p>
                            <p class="p-warn">如果没有选择手批条件，我们会为您默认购买手批商品必须达到一手才能批发</p>
                        </el-form-item>
                        <el-form-item label="批发商说明：" prop="pfRemark">
                            <el-input v-model.trim="form.paySet.pfRemark" type="textarea" :rows="2"
                                placeholder="请输入内容" style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item label="批发商申请说明：" prop="pfApplyRemark">
                            <el-input v-model.trim="form.paySet.pfApplyRemark" type="textarea" :rows="2"
                                placeholder="请输入内容" style="width:420px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
import Lib from "assets/js/Lib";
import contentNo from "components/contentNo";
import defaultImg from "components/defaultImg";
export default {
  components: {
    contentNo,
    defaultImg
  },
  data() {
    var formHpNum = (rule, value, callback) => {
      let pfSet = this.form.pfSet;
      value = pfSet.hpNum;
      let reg = /^[0-9]{1,6}$/;
      if (pfSet.isHpNum == 1) {
        if (value === "") {
          return callback(new Error("请输入混批数量"));
        } else if (!reg.test(value) || value == 0) {
          return callback(new Error("混批数量最多只能是大于0的6位数"));
        }
      }
      if (pfSet.isHpMoney == 0 && pfSet.isHpNum == 0) {
        return callback(new Error("必须选择一种混批条件"));
      }
      callback();
    };
    var formHpMoney = (rule, value, callback) => {
      let pfSet = this.form.pfSet;
      value = pfSet.hpMoney;
      let reg = /^[0-9]{1,5}(\.\d{1,2})?$/;
      if (pfSet.isHpMoney == 1) {
        if (value === "") {
          return callback(new Error("请输入混批金额"));
        } else if (!reg.test(value) || value == 0) {
          return callback(new Error("混批金额最多只能输入大于0的6位小数"));
        }
      }
      if (pfSet.isHpMoney == 0 && pfSet.isHpNum == 0) {
        return callback(new Error("必须选择一种混批条件"));
      }
      callback();
    };
    var formSpHand = (rule, value, callback) => {
      value = this.form.pfSet.spHand;
      let reg = /^[0-9]{1,6}$/;
      if (this.form.pfSet.isSpHand == 1) {
        if (value === "") {
          return callback(new Error("请输入手批条件"));
        } else if (!reg.test(value) || value == 0) {
          return callback(new Error("手批条件最多只能输入大于0的6位数"));
        }
      } else {
        return callback(new Error("必须选择一种手批条件"));
      }
      callback();
    };
    var formPfRemark = (rule, value, callback) => {
      value = this.form.paySet.pfRemark;
      if (value != "" && value.length > 1000) {
        return callback(new Error("批发商说明字数不能超过100字"));
      }
      callback();
    };
    var formPfApplyRemark = (rule, value, callback) => {
      value = this.form.paySet.pfApplyRemark;
      if (value != "" && value.length > 1000) {
        return callback(new Error("批发商申请说明字数不能超过100字"));
      }
      callback();
    };
    return {
      contentNo: "pifa",
      activeName: "1",
      type: "",
      shopId: "",
      goodsData: {
        page: {
          //rowCount : 0,
          subList: []
        }
      },
      shopList: [],
      pifaData: {
        page: {
          //rowCount:'',
          subList: []
        }
      },
      form: {
        pfSet: {},
        paySet: {}
      },
      rules: {
        isHpNum: [{ validator: formHpNum, trigger: "blur" }],
        hpMoney: [{ validator: formHpMoney, trigger: "blur" }],
        spHand: [{ validator: formSpHand, trigger: "blur" }],
        pfRemark: [{ validator: formPfRemark, trigger: "blur" }],
        pfApplyRemark: [{ validator: formPfApplyRemark, trigger: "blur" }]
      },
      dialogViewDetails: false,
      keyword: "",
      detailName: "",
      detailCompanyName: "",
      detailTelphone: "",
      detailRemark: "",
      path: "",
      multipleSelection: [],
      videourl: null,
      webPath: null
    };
  },
  watch: {
    activeName: function(t, f) {
      let _href = window.location.href;
      sessionStorage.setItem("href", _href);
    },
    $route: function(t, f) {
      this.activeName = t.params.activeName;
    },
    'dialogViewDetails'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
  },
  methods: {
    searchPifa() {
      //批发列表搜索
      this.mallWholesaleList(1);
    },
    handleIconClick() {
      //批发商列表输入搜索关键词事件
      this.mallPifaShangList(1);
    },
    returnPage() {
      //取消返回上一页
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
      let _this = this;
      let _activeName = tab.name;
      this.$router.push(_activeName);
      if(_activeName == 1){
        _this.mallWholesaleList(1);
      }else if(_activeName ==2){
        _this.mallPifaShangList(1);
      }else if(_activeName ==3){
        _this.mallSetWholesale();
      } 
    },
    handleDelete(id, type) {
      //删除批发事件
      let _this = this;
      let msg = {
        dialogTitle: "您确定要删除此批发活动吗？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallWholesaleDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    invalidDelete(id, type) {
      //使批发活动失效事件
      let _this = this;
      let msg = {
        dialogTitle: "您确定要将此批发活动失效吗？", //文本标题
        dialogMsg: "失效后不能再进行交易", //文本内容
        callback: {
          btnOne: function() {
            _this.mallWholesaleDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    toggleSelection(rows) {
      //取消选择事件
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //全选事件
      this.multipleSelection = val;
    },
    onSubmit(formName) {
      //保存批发设置
      let _this = this;
      let formParam = _this.$refs[formName].model.pfSet;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let pfSet = {
            isHpMoney: Number(formParam.isHpMoney),
            isHpNum: Number(formParam.isHpNum),
            isSpHand: Number(formParam.isSpHand)
          };
          if (pfSet.isHpMoney == 1) {
            pfSet.hpMoney = formParam.hpMoney;
          }
          if (pfSet.isHpNum == 1) {
            pfSet.hpNum = formParam.hpNum;
          }
          if (pfSet.isSpHand == 1) {
            pfSet.spHand = formParam.spHand;
          }
          let pfRemark = _this.form.paySet.pfRemark;
          let pfApplyRemark = _this.form.paySet.pfApplyRemark;
          _this.ajaxRequest({
            url: DFshop.activeAPI.mallWholesaleSaveSet_post,
            data: {
              pfSet: JSON.stringify(pfSet),
              pfRemark: pfRemark,
              pfApplyRemark: pfApplyRemark
            },
            success: function(data) {
              _this.$message({
                message: "保存设置成功",
                type: "success"
              });
              _this.mallSetWholesale();
            }
          });
        }
      });
    },
    /*查看详情 */
    viewDetails(name, company, tel, remark) {
      this.dialogViewDetails = true;
      this.detailName = name;
      this.detailCompanyName = company;
      this.detailTelphone = tel;
      this.detailRemark = remark;
    },
    openDisable(id, isUse) {
      //批发商启用、禁用
      let openOrDisable = -1;
      if (isUse == 1) {
        openOrDisable = 1;
      }
      this.mallWholesalersUpdateStatus(id, openOrDisable, "");
    },
    checkExamine(status) {
      //审核通过、不通过事件
      let _this = this;
      let ids = [];
      if (_this.multipleSelection.length > 0) {
        let pifaList = _this.pifaData.page.subList;
        for (let i = 0; i < _this.multipleSelection.length; i++) {
          let selectionObj = _this.multipleSelection[i];
          for (let j = 0; j < pifaList.length; j++) {
            let pifa = pifaList[j];
            if (pifa == 0) {
              ids.push(selectionObj.id);
            }
          }
        }
        if (ids == null || ids.length == 0) {
          _this.$message.error("您还没有未审核的批发商");
          return;
        }
        _this.mallWholesalersUpdateStatus(ids.toString(), "", status);
      }
    },
    checkStatus(status, obj) {
      let _this = this;
      let msg = status == 1 ? "通过" : "不通过";
      this.$confirm("确认要" + msg + "此批发商?", "审核批发商", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.mallWholesalersUpdateStatus(obj.id, "", status);
      });
    },
    synData() {
      //同步批发商成交数量/金额
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallWholesaleSyncOrderPifa_post,
        success: function(data) {
          _this.$message({
            message: "同步成功",
            type: "success"
          });
          _this.mallPifaShangList(1);
        }
      });
    },
    //批发列表
    mallWholesaleList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallWholesaleList_post,
        data: {
          curPage: pageNum,
          type: _this.type,
          shopId: _this.shopId
        },
        success: function(data) {
          _this.goodsData = data.data;
          _this.path = data.path;
          _this.imgUrl = data.imgUrl;
          _this.webPath = data.webPath;
          _this.videourl = data.videourl;
          $.each(_this.goodsData.page.subList, function(i) {
            let oldTime = this.createTime;
            this.createTime = Lib.M.format(oldTime);
          });
          //console.log(_this.goodsData,'_this.goodsData');
        }
      });
    },
    //使批发失效、删除方法
    mallWholesaleDelete(id, type) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallWholesaleDelete_post,
        data: {
          id: id,
          type: type
        },
        success: function(data) {
          _this.mallWholesaleList(_this.goodsData.page.curPage);
          //_this.goodsData = data.data;
          //console.log(_this.goodsData,'_this.goodsData');
        }
      });
    },
    //批发商管理列表
    mallPifaShangList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPifaShangList_post,
        data: {
          curPage: pageNum,
          keyword: _this.keyword
        },
        success: function(data) {
          _this.pifaData = data.data;
          //_this.goodsData = data.data;
          //console.log(_this.goodsData,'_this.goodsData');
        }
      });
    },
    //批发商审核通过、不通过、启用、禁用方法
    mallWholesalersUpdateStatus(id, isUse, status) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallWholesalersUpdateStatus_post,
        data: {
          ids: id,
          isUse: isUse,
          status: status
        },
        success: function(data) {
          _this.mallPifaShangList(_this.pifaData.page.curPage);
          //_this.goodsData = data.data;
          //console.log(_this.goodsData,'_this.goodsData');
        }
      });
    },
    //批发设置
    mallSetWholesale() {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallSetWholesale_post,
        success: function(data) {
          _this.form = data.data;
          _this.form.pfSet.isHpMoney = !!data.data.pfSet.isHpMoney;
          _this.form.pfSet.isHpNum = !!data.data.pfSet.isHpNum;
          _this.form.pfSet.isSpHand = !!data.data.pfSet.isSpHand;
          console.log(_this.form, "_this.form");
        }
      });
    },
    //预览
    preview(obj) {
      let _this = this;
      // console.log(obj, "obj", _this.imgUrl + imgUrl);
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.webPath,
        pageLink:
          "/goods/details/" +
          obj.shopId +
          "/" +
          obj.userId +
          "/1/" +
          obj.productId +
          "/" +
          obj.id
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
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
    if(_this.activeName == 1){
        _this.mallWholesaleList(1);
    }else if(_this.activeName ==2){
       _this.mallPifaShangList(1);
    }else if(_this.activeName ==3){
      _this.mallSetWholesale();
    } 
  }
};
</script>

<style lang="less" >
@import "../../../less/style.less";
.table-expand2 {
  p {
    padding: 10px 0;
    .labelss {
      display: inline-block;
      width: 90px;
      color: #99a9bf;
      text-align: right;
    }
  }
}
</style>
