  <template>
  <div class="integralmall-wrapper" >
     <div class="common-nav">
      <el-breadcrumb separator="/">
         <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>预售管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="预售管理" name="1" >
                <div class="common-content">
                <div class="index-shopInfo" v-if="presaleData.isOpenPresale">
                    <div class="index-input-box">
                    <div class="p-box">
                        <div >
                            <span>
                                选择活动状态 :
                                <el-select v-model="presaleType" placeholder="请选择" @change="searchPresale()">
                                    <el-option class="max-input" label="全部" :value="0"></el-option>
                                    <el-option class="max-input" label="进行中" :value="1"></el-option>
                                    <el-option class="max-input" label="未开始" :value="-1"></el-option>
                                    <el-option class="max-input" label="已结束" :value="2"></el-option>
                                </el-select>
                            </span>
                            <span>
                                选择店铺 :
                                <el-select v-model="shopId" placeholder="请选择" @change="searchPresale()">
                                    <el-option class="max-input" label="全部" :value="0"></el-option>
                                    <el-option class="max-input" v-for="item in shopList"
                                        :key="item.id" :label="item.sto_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </span>
                        </div>
                    <span>
                        <a :href="presaleData.videourl" target="_blank" v-if="presaleData.videourl != null">
                            <el-button type="warning" class="video-button" v-if="presaleData.isOpenPresale">
                                <i class="iconfont icon-cplay1"></i>视频教程
                            </el-button>
                        </a>
                    </span>
                    </div>
                    </div>
                    <router-link to="/presale/addpresale/0" v-if="presaleData.isOpenPresale">
                        <el-button  type="primary">新建预售</el-button>
                    </router-link>
                </div>
                <el-table  v-loading.body="loading" element-loading-text="拼命加载中" :data="presaleData.page.subList" style="width: 100%" 
                  v-if="presaleData.page.rowCount > 0 || loading">
                    <el-table-column
                    prop="proName"
                    label="预售商品">
                    </el-table-column>
                    <el-table-column
                    prop="shopName"
                    label="所属店铺">
                    </el-table-column>
                    <el-table-column
                    prop="saleStartTime"
                    label="开售时间">
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
                    <el-table-column label="操作" min-width="120">
                        <template scope="scope">
                            <el-button size="small" class="buttonBlue" @click="jumpRouter('/presale/addpresale/'+scope.row.id)" 
                                v-if="scope.row.status == 0 ||(scope.row.status == 1 && scope.row.joinId == 0)">编辑</el-button>
                            <el-button size="small" class="buttonBlue" @click="invalidDelete(scope.row.id,-2)"
                                v-if="scope.row.status == 0 ||(scope.row.status == 1 && scope.row.joinId == 0)">使失效</el-button>
                            <el-button size="small" class="buttonBlue" @click="preview(scope.row)"
                                v-if="scope.row.status == 0 ||scope.row.status == 1 ">预览</el-button>
                            <el-button size="small" @click="presaleDel(scope.row.id,-1)" v-if="scope.row.status != 1">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="shop-textr" v-if="presaleData.isOpenPresale && presaleData.page.pageCount > 1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="presaleData.page.curPage"
                        :page-size="presaleData.page.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="presaleData.page.rowCount">
                    </el-pagination>
                </div>
                <content-no :show="contentNo" v-if=" presaleData.page.rowCount == 0"></content-no>
                </div>
            </el-tab-pane>
            <el-tab-pane label="定金管理" name="2">
                <div class="common-content">
                    <el-table :data="dingJinData.page.subList" style="width: 100%" v-if="dingJinData.page.rowCount > 0">
                        <el-table-column
                        prop="proName"
                        label="预售商品">
                        </el-table-column>
                        <el-table-column
                        prop="shopName"
                        label="所属店铺">
                        </el-table-column>
                        <el-table-column
                        prop="depositNo"
                        label="竞拍编号">
                        </el-table-column>
                        <el-table-column
                        label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.presaleStatus === 1" >进行中</span>
                            <span v-if="scope.row.presaleStatus === 0" >未开始</span>
                            <span v-if="scope.row.presaleStatus === -1" >已结束</span>
                            <span v-if="scope.row.presaleStatus === -2 " >已失效</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="定金金额"
                        prop="depositMoney">
                        </el-table-column>
                        <el-table-column
                        label="定金状态">
                        <template scope="scope">
                            <span v-if="scope.row.depositStatus === 1">已支付</span>
                            <span v-if="scope.row.depositStatus === 0">未支付</span>
                            <span v-if="scope.row.depositStatus === -1">已返还</span>
                            <span v-if="scope.row.depositStatus === -2">不返还</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="支付时间"
                        prop="payTime">
                        </el-table-column>
                        <el-table-column
                        label="返还时间"
                        prop="returnTime">
                        <template scope="scope">
                              <div>{{scope.row.returnTime|format}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="120">
                        <template scope="scope">
                            <el-button size="small" class="buttonBlue" 
                            v-if="scope.row.depositStatus == 1 && (scope.row.presaleStatus == -1 ||scope.row.presaleStatus == -2) && scope.row.isSubmit == 0"
                            @click="comeDownShow(scope.row.depositMoney,scope.row.id,scope.row.payWay,scope.row.depositNo)">退定金</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div class="shop-textr" v-if="dingJinData.page.pageCount > 1">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="dingJinData.page.curPage"
                            :page-size="dingJinData.page.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="dingJinData.page.rowCount">
                        </el-pagination>
                    </div>
                    <content-no v-if="dingJinData.page.rowCount == 0"></content-no>
                    <el-dialog title="退定金" :visible.sync="dialogVisible" size="tiny">
                        <p>退款金额：<span>¥{{dingJin}}</span></p>
                        <p v-if="payWay === 3" style="margin-top:10px;color:red;">*建议您复制退款链接并用IE浏览器打开进行退款</p>
                        <span slot="footer" class="dialog-footer">
                            <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                            <el-button type="primary" @click="comeDown()" v-if="payWay === 1 || payWay === 2">退定金</el-button>
                            <a :href="alipayUrl" target="_blank" v-if="payWay === 3">
                                <el-button type="primary">退定金</el-button>
                            </a>
                            <!-- <button class="btn" id="gtLongUrlCopy"  @click="copyLink()" data-clipboard-text="http://www.hbcloudwide.com/oss/video/7">点击复制</button>   -->
                            <el-button type="primary" @click="copyLink()" v-if="payWay === 3"
                                id="gtLongUrlCopy" :data-clipboard-text="alipayUrl">复制退款链接</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="预售送礼设置" name="3">
                <div class="common-content" v-if="isPresaleGive">
                    <el-form :model="form" ref="form" :rules="rules" class="add_form" label-position="right" label-width="80px">
                        <div class="index-shopInfo">
                            <el-button type="primary" @click="addPresaleGift()">新建预售送礼</el-button>
                        </div>
                        <table border="1" cellspacing="0" cellpadding="0" width="100%" class="order_tab" v-if="form.presaleGiftsData != null">
                            <tbody>
                                <tr class="order_tab_header">
                                    <th width="15%">送礼名次</th>
                                    <th width="15%">礼品类型</th>
                                    <th width="15%">礼品名称</th>
                                    <th width="18%">礼品数量</th>
                                    <th width="11%">操作</th>
                                </tr>
                                <tr v-for="(row , index) in form.presaleGiftsData" :key="index">
                                    <td>
                                        <el-form-item 
                                            :prop="'presaleGiftsData.'+index+'.giveRanking'"
                                            label-width="0"
                                            :rules="[
                                                { required: true, trigger: 'blur',  type: 'number',  message: '请输入送礼名次' }, 
                                                { min: 1, max: 100, trigger: 'blur', type: 'number', message: '送礼名次最多只能输入5位数'}
                                            ]">
                                            <el-input class="mix-input" v-model.number="row.giveRanking" style="width:160px;" 
                                                 @blur="blurSaveGift(row,row.giveRanking,index)">
                                                <template slot="prepend">前</template>
                                                <template slot="append">名</template>
                                            </el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item>
                                            <el-select v-model="row.giveType" placeholder="请选择"  style="width:100px;"
                                                @change="blurSaveGift(row,row.giveType,index)">
                                                <el-option v-for="item in giftDictList"
                                                    :key="item.item_key" :label="item.item_value" :value="item.item_key">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                    <td >
                                        <el-form-item :prop="'presaleGiftsData.'+index+'.giveName'" required  label-width="0"
                                        :rules="[
                                            { required: true, trigger: 'blur', message: '请输入礼品名称' },
                                            { max: 100, trigger: 'blur', message: '礼品名称的字数长度不能超过100' }
                                        ]"
                                        >
                                            <el-input v-model="row.giveName" class="mix-input" style="width:150px;"
                                            @blur="blurSaveGift(row,row.giveName,index)"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item :prop="'presaleGiftsData.'+index+'.giveNum'" required  label-width="0"
                                            :rules="[
                                                { required: true, trigger: 'blur', type: 'number', message: '请输入礼品数量' },
                                                { min:1, max: 99999, trigger: 'blur', type: 'number', message: '礼品数量最多只能输入5位数' }
                                            ]"
                                        >
                                            <el-input v-model.number="row.giveNum" class="mix-input " style="width:150px;" 
                                                @blur="blurSaveGift(row,row.giveNum,index)"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-button size="small" @click="handleDelete(row.id,index)">删除</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="shop-textr" v-if="presaleGiftsData.page.pageCount > 1">
                            <el-pagination  @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
                                :current-page.sync="presaleGiftsData.page.curPage"
                                :page-size="presaleGiftsData.page.pageSize"
                                layout="prev, pager, next, jumper" :total="presaleGiftsData.page.rowCount">
                            </el-pagination>
                        </div>
                        <content-no v-if="presaleGiftsData.page.rowCount == 0"></content-no>
                        <el-dialog title="新建预售送礼" :visible.sync="dialogVisibleGift" size="tiny">
                            <el-form-item label="送礼名次" prop="giveRanking" >
                                <el-input v-model.number="form.giveRanking" class="mix-input" style="width:200px;">
                                <template slot="prepend">前</template>  
                                <template slot="append">名</template>    
                                </el-input>
                            </el-form-item>
                            <el-form-item label="礼品类型" prop="giveType" >
                                <el-select v-model="form.giveType" placeholder="请选择" >
                                    <el-option class="max-input" v-for="item in giftDictList"
                                        :key="item.item_key" :label="item.item_value" :value="item.item_key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="礼品名称" prop="giveName">
                                <el-input v-model.trim="form.giveName" class="mix-input" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item label="礼品数量" prop="giveNum">
                                <el-input v-model.number="form.giveNum" class="mix-input" style="width:200px;"></el-input>
                            </el-form-item>
                            <el-form-item min-width="120">
                                <el-button type="primary" size="small" @click="saveAddPresale('form')">保存</el-button>
                            </el-form-item>
                        </el-dialog>
                    </el-form>
                </div>
                 <content-no :show="contentNo1" v-else></content-no>
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
    return {
      contentNo: "ysgl",
      contentNo1: "openPresaleGive",
      activeName: "3", //todo
      dialogVisible: false,
      dialogVisibleGift: false,
      presaleType: "",
      shopId: "",
      isPresaleGive:'',
      presaleData: {
        isOpenPresale: "",
        videourl: "",
        page: {
          rowCount: 0,
          subList: []
        }
      },
      shopList: [],
      dingJinData: {
        page: {
          rowCount: 0,
          subList: []
        }
      },
      presaleGiftsData: {
        page: {
          rowCount: 0,
          subList: []
        }
      },
      input: "",
      dingJin: 0,
      dingJinId: "",
      imgUrl: "",
      giftDictList: [],
      flag: true,
      payWay: "",
      alipayUrl: "",
      busId: "",
      form: {
        giveType: 1,
        giveName: "",
        giveNum: "",
        giveRanking: "",
        presaleGiftsData: []
      },
      rules: {
        giveName: [
          { required: true, trigger: "blur", message: "请输入礼品名称" },
          { max: 100, trigger: "blur", message: "礼品名称的字数长度不能超过100" }
        ],
        giveNum: [
          {
            required: true,
            trigger: "blur",
            type: "number",
            message: "请输入礼品数量"
          },
          {
            min: 1,
            max: 99999,
            type: "number",
            trigger: "blur",
            message: "礼品数量最多只能输入5位数"
          }
        ],
        giveRanking: [
          {
            required: true,
            trigger: "blur",
            type: "number",
            message: "请输入送礼名次"
          },
          {
            min: 0,
            max: 99999,
            trigger: "blur",
            type: "number",
            message: "送礼名次最多只能输入5位数"
          }
        ]
      },
      webPath: "",
      loading: false,
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
    'dialogVisibleGift'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
  },
  methods: {
    //复制退定金链接
    copyLink() {
      var self = this;
      var clipboard = new Lib.Clipboard("#gtLongUrlCopy");
      clipboard.on("success", function(e) {
        self.$message({
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy();
      });
    },
    searchPresale() {
      this.mallPresaleList(1);
    },
    handleSizeChange(val) {
      //this.pageNum = val;
      this.mallPresaleList(val);
    },
    handleCurrentChange(val) {
      //this.pageNum = val;
      this.mallPresaleList(val);
    },
    handleSizeChange1(val) {
      //this.pageNum1 = val;
      this.mallPresaleDepositList(val);
    },
    handleCurrentChange1(val) {
      //this.pageNum1 = val;
      this.mallPresaleDepositList(val);
    },
    handleSizeChange2(val) {
      //this.pageNum1 = val;
      this.mallPresaleGiveList(val);
    },
    handleCurrentChange2(val) {
      //this.pageNum1 = val;
      this.mallPresaleGiveList(val);
    },
    handleClick(tab, event) {
       let _this = this;
      let _activeName = tab.name;
      this.$router.push(_activeName);
      if(_activeName == 1){
        _this.mallPresaleList(1);
      }else if(_activeName ==2){
        _this.mallPresaleDepositList(1);
      }else if(_activeName ==3){
        _this.mallPresaleGiveList();
      }
    },
    //商品预售删除弹出框
    presaleDel(id, type) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要删除此预售商品？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.mallPresaleDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    //商品预售送礼删除弹出框
    handleDelete(id, index) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要删除此预售送礼？", //文本标题
        dialogMsg: "", //文本内容
        callback: {
          btnOne: function() {
            _this.ajaxRequest({
              url: DFshop.activeAPI.mallPresaleGiveDelete_post,
              data: {
                id: id
              },
              success: function(data) {
                _this.mallPresaleGiveList(_this.presaleGiftsData.page.curPage);
              }
            });
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    //商品预售失效弹出框
    invalidDelete(id, type) {
      let _this = this;
      let msg = {
        dialogTitle: "您确定要将此商品失效吗？", //文本标题
        dialogMsg: "失效后不能再进行交易", //文本内容
        callback: {
          btnOne: function() {
            _this.mallPresaleDelete(id, type);
          }
        }
      };
      _this.$root.$refs.dialog.showDialog(msg);
    },
    //退定金弹出框
    comeDownShow(dingJin, id, payWay, depositNo) {
      let _this = this;
      this.dialogVisible = true;
      this.dingJin = dingJin;
      this.dingJinId = id;
      this.payWay = payWay;
      _this.alipayUrl="";
      if(payWay == 3){//支付宝
        _this.ajaxRequest({
          url: DFshop.activeAPI.mallPresaleDepositRefundUrl_post,
          data: {
            depositId: id
          },
          success: function(data) {
            _this.alipayUrl=data.data;
            console.log(_this.alipayUrl,"_this.alipayUrl");
          }
        });
      }
    },
    //退定金事件
    comeDown() {
      this.mallPresaleAgreedReturnDeposit(this.dingJinId);
    },
    //预售管理列表
    mallPresaleList(pageNum) {
      let _this = this;
      _this.loading = true;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleList_post,
        data: {
          curPage: pageNum,
          shopId: _this.shopId,
          type: _this.presaleType
        },
        success: function(data) {
          _this.loading = false;
          if (data.data.isOpenPresale) {
            _this.contentNo="ysgl";
            console.log(data, "data");
            _this.presaleData = data.data;
            _this.imgUrl = data.imgUrl;
            _this.webPath = data.webPath;
            if (data.data.page.rowCount) {
              _this.presaleData.page.rowCount = Number(data.data.page.rowCount);
            }
            $.each(_this.presaleData.page.subList, function(i) {
              let oldTime = this.createTime;
              this.createTime = Lib.M.format(oldTime);
            });
            console.log(_this.presaleData, "presaleData");
          }else{
            _this.contentNo="openPresale";
          }
        }
      });
    },
    //预售定金管理
    mallPresaleDepositList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleDepositList_post,
        data: {
          curPage: pageNum
        },
        success: function(data) {
          _this.dingJinData = data.data;
          _this.busId = data.data.busId;
          _this.dingJinData.page.rowCount = data.data.page.rowCount;
          $.each(_this.dingJinData.page.subList, function(i) {
            if (this.payTime != "" && this.payTime != undefined) {
              let oldPayTime = this.payTime;
              this.payTime = Lib.M.format(oldPayTime);
            }
          });
          // console.log(_this.dingJinData, "dingJinData");
        }
      });
    },
    //预售送礼设置列表
    mallPresaleGiveList(pageNum) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleGiveList_post,
        data: {
          curPage: pageNum
        },
        success: function(data) {
           _this.isPresaleGive=data.data.isPresaleGive;
          if(_this.isPresaleGive){
            let myData = data.data;
            _this.presaleGiftsData.page.rowCount = myData.page.rowCount;
            _this.presaleGiftsData = myData;
            _this.form.presaleGiftsData = myData.page.subList;
            _this.mallPresaleGiveDictList();
            // console.log(_this.form.presaleGiftsData, "presaleGiftsData");
          }
        }
      });
    },
    //退定金方法
    mallPresaleAgreedReturnDeposit(id) {
      console.log(id, "id");
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleAgreedReturnDeposit_post,
        data: {
          depositId: id
        },
        success: function(data) {
          _this.dialogVisible=false;
          _this.$message({
            message: '退定金成功',
            type: "success"
          });
          _this.mallPresaleDepositList(_this.dingJinData.page.curPage);
        }
      });
    },
    //使预售商品失效、删除方法
    mallPresaleDelete(id, type) {
      let _this = this;
      let msg = "";
      if (type === -1) {
        msg = "删除成功";
      } else {
        msg = "已失效";
      }
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleDelete_post,
        data: {
          id: id,
          type: type
        },
        success: function(data) {
          _this.$message({
            message: msg,
            type: "success"
          });
          _this.mallPresaleList(_this.presaleData.page.curPage);
        }
      });
    },
    //预售预览方法
    preview(obj) {
      let _this = this;
      let msg = {
        title: "预览",
        urlQR: "",
        path: _this.webPath,
        pageLink:
          "/goods/details/" +
          obj.shopId +
          "/" +
          obj.userId +
          "/6/" +
          obj.productId +
          "/" +
          obj.id
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    //预售送礼类型列表方法
    mallPresaleGiveDictList() {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleGiveDictList_post,
        success: function(data) {
            _this.giftDictList = data.data;
            $.each(_this.giftDictList, function(i) {
              this.item_key = Number(this.item_key);
            });
        }
      });
    },
    //添加预售送礼
    addPresaleGift() {
      let _this = this;
      _this.dialogVisibleGift = true;
      _this.form.giveRanking="";
      _this.form.giveType=1;
      _this.form.giveName="";
      _this.form.giveNum="";
    },
    //保存预售送礼设置
    mallPresaleGiveSave(param) {
      let _this = this;

      //防止多次点击重复提交数据
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;

      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPresaleGiveSave_post,
        data: {
          presaleSet: param
        },
        success: function(data) {
          _this.$message({
            message: "保存成功",
            type: "success"
          });
          _this.dialogVisibleGift = false;
          _this.mallPresaleGiveList(1);
        }
      });
    },
    /**
     * 保存预售送礼及判断
     * type 1 送礼名次 2礼品数量
     */
    blurSaveGift(obj, val, index) {
      let _this = this;
      let gift = "";
      let reg = /^[0-9]+\.+[0-9]*$/;
      if (val != null && val != "") {
        if (reg.test(val)) {
          this.$message.error("只能输入数字哦！");
          return;
        }
      }
      if(obj.giveRanking != "" && obj.giveType != "" && obj.giveName != "" && obj.giveNum != "" ){
          let param = {
            giveRanking: obj.giveRanking,
            giveType: obj.giveType,
            giveName: obj.giveName,
            giveNum: obj.giveNum,
            id: obj.id || null
          };
          // console.log(param,"param");
          _this.mallPresaleGiveSave(param);
      }
        
       
    },
    //新建预售送礼保存按钮事件
    saveAddPresale(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        console.log(valid, "valid");
        if (valid) {
          let gift = _this.$refs["form"].model;
          let param = {};
          param.giveRanking = gift.giveRanking;
          param.giveType = gift.giveType;
          param.giveName = gift.giveName;
          param.giveNum = gift.giveNum;
          _this.mallPresaleGiveSave(param);
        }
      });
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
      _this.mallPresaleList(1);
    }else if(_this.activeName ==2){
       _this.mallPresaleDepositList(1);
    }else if(_this.activeName ==3){
      _this.mallPresaleGiveList();
    }  
    
  }
};
</script>
<style lang="less">
.order_tab {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__error {
    position: relative;
  }
}
</style>

<style lang="less" scoped>
@import "../../../less/style.less";
.order_tab td, .order_tab th {
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-right: 0px;
    font-size: 14px;
}
</style>
