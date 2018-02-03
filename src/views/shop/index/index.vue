<template>
<div class="index-wrapper">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="店铺概况" name="shop">
      <div class="index-shop" v-if=" activeName =='shop'">
        <div class="index-shopInfo clearfix">
          <div class="shopInfo-img">
            <defaultImg :background="tabelData.userLogo"></defaultImg>
          </div>
          <div class="shopInfo-content" style="width: 92%;">
            <p class="shopInfo-name" v-text="tabelData.userName">商家名称</p>
            <div class="shopInfo-button">
              <el-button type="primary" 
                v-if="tabelData.isShopAdd == 0"
                @click="jumpRouter('shop/addShop')" >新增店铺</el-button>
              <el-button type="primary"
                @click="jumpRouter('shop/addPage/0')">新建微页面</el-button>
                <span style="float: right;">
                  <a :href="tabelData.videourl" target="_blank" v-if="tabelData.videourl!=null">
                    <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
                  </a>
                </span>
            </div>
          </div>
        </div>
        <div class="index-content">
          <el-table :data="tabelData.page.subList"  style="width: 100%" v-if="tabelData.page.pageCount>0">
            <el-table-column label="店铺名称" min-width="220">
              <template slot-scope="scope">
                <div class="index-list-shop">
                  <div class="list-shop-img">
                    <defaultImg :background="imgUrl+scope.row.stoPicture"></defaultImg>
                  </div>
                  <div class="list-shop-dtl">
                    <p v-text="scope.row.stoName"></p>
                     <div class="list-shop-txt">
                      <div :class="{'pass':scope.row.certStoType!=null}" > 
                        <i class="iconfont icon-renzheng"></i> 
                         <span v-if="scope.row.certStoType ==null">个人</span>
                         <span v-else-if="scope.row.certStoType == 0">个人</span>
                         <span v-else>企业</span>认证
                      </div>
                      <div :class="{'pass':isSecuritytrade}">
                        <i class="iconfont icon-renzheng"></i>担保交易
                      </div>
                      <div class="pass">
                          <i class="iconfont icon-renzheng "></i >线下店铺
                      </div>
                      <div :class="{'pass':scope.row.certStoCategoryName!=null}">
                          <i class="iconfont icon-renzheng"></i>
                          <span v-if="scope.row.certStoCategoryName ">{{scope.row.certStoCategoryName}}</span>
                          <span v-else>普通店铺</span>
                      </div>
                    </div> 
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="店铺地址" prop="stoAddress" min-width="150">
            </el-table-column>
            <el-table-column label="联系人" prop="stoLinkman">
            </el-table-column>
            <el-table-column label="联系电话" prop="stoPhone">
            </el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <el-button  size="small" 
                            class="buttonBlue"
                            @click="jumpRouter('shop/edit/'+scope.row.id)">编辑
                </el-button>
                <el-button  size="small"
                            class="buttonBlue"
                            @click="shopLink(scope.row)">链接
                </el-button>
                <el-button  size="small"
                            class="buttonBlue"
                            @click="authentication(scope.row.certId,scope.row)"
                            v-if=" scope.row.certStoType == 1 "
                >认证</el-button>
                <el-button  size="small"
                @click="handleDelete(scope.row.id,'shop')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="页面管理" name="page">
      <div class="index-page" v-if=" activeName =='page'">
        <div class="index-page-choice">
          <el-select v-model="shopSelect" placeholder="请选择店铺" @change="shop_Select()">
            <el-option label="全部" value="">
            </el-option>
            <el-option
              v-for="item in shopOptions"
              :key="item.value"
              :label="item.sto_name"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="page-button">
            <el-button type="primary" @click="jumpRouter('/shop/addPage/0')">新增微页面</el-button>
            <a :href="tabelData.videourl" target="_blank" v-if="tabelData.videourl!=null"  style="float: right;">
              <el-button type="warning" class="video-button"><i class="iconfont icon-cplay1"></i>视频教程</el-button>
            </a>
          </div>
        </div>
        <div class="index-content">
          <el-table :data="tabelData.page.subList"  style="width: 100%" v-if="tabelData.page.pageCount>0">
            <el-table-column label="标题"  prop="pag_name">
            </el-table-column>
            <el-table-column label="创建时间">
               <template slot-scope="scope">
                  {{scope.row.pag_create_time|format}} 
              </template>
            </el-table-column>
            <el-table-column label="所属店铺" prop="business_name">
            </el-table-column>
            <!-- <el-table-column label="访客数/浏览量" prop="flow">
              <template slot-scope="scope">
                  {{scope.row.visitor_num}}/{{scope.row.views_num}}
              </template>
            </el-table-column> -->
             <el-table-column label="是否主页" prop="pag_is_main">
              <template slot-scope="scope">
                  <span v-if="scope.row.pag_is_main == 1">是</span>
                  <span v-else>否</span> 
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button  size="small" 
                            class="buttonBlue"
                            @click="jumpRouter('/shop/addPage/'+scope.row.id)"
                  >修改</el-button>
                <!-- <el-button  size="small"
                            class="buttonBlue"
                  >预览</el-button> -->
                  <el-button  size="small"
                              class="buttonBlue"
                              @click="pageLink(scope.row)"
                  >链接</el-button>
                  <el-button  size="small"
                  @click="handleDelete(scope.row,'page')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="全店风格" name="style">
      <div class="index-style" v-if=" activeName =='style'">
        <div class="index-style-choice clearfix">
          <div class="index-style-title">选择配色方案：</div>
          <div class="index-style-preview">
            <div class="style-box" style="width:475px;">
              <div class="style-card" v-for="(style,index) in styles"
                  @click="styleSelected(style.style,style.item_key,index)"
                  :class="{'selected': index === styleSelect }"
                  :key = "index"
                  >
                <em :style="{background: color}" v-for="(color,i) in style.style "
                    :key="i">
                </em> 
              </div>
            </div>
          </div>
        </div>
         <div class="index-style-content clearfix">
          <div class="index-style-title">当前风格示例：</div>
          <div class="index-style-preview">
            <div class="preview-item style-change1"
                :style="{backgroundImage: 'url(' + bgimg1 + ')'}">
              <div class="module1" :style="{background:isColor[0]}">
              </div>
              <div class="module2" :style="{color:isColor[0]}">
                价格: ￥<span>6,899.</span>00
              </div>
              <div class="module3">
                <span :style="{border:'1px solid'+isColor[0],color:isColor[0]}">收藏商品</span>
                <span :style="{border:'1px solid'+isColor[0],color:isColor[0]}">进店逛逛</span>
              </div>
              <div class="module4" :style="{'border-bottom':'2px solid'+isColor[0],color:isColor[0]}">
                商品详情
              </div>
              <div class="module5 clearfix">
                <div :style="{background:isColor[2]}">
                  <i class="iconfont icon-xiaoxi" :style="{color:isColor[0]}"></i>
                  <p>客服</p>
                  </div>
                <div :style="{background:isColor[2]}">
                  <i class="iconfont icon-yinhang"></i>
                  <p>购物车</p>
                </div>
                <div :style="{background:isColor[1],color:isColor[0]}" v-if="lightColour">
                  加入购物车
                </div>
                <div :style="{background:isColor[1]}" v-else>
                  加入购物车
                </div>
                <div :style="{background:isColor[0]}">
                  立即购买
                </div>
              </div>
            </div>
            <div class="preview-item style-change2"
                :style="{backgroundImage: 'url(' + bgimg2 + ')'}">
              <div class="module1" :style="{color:isColor[0]}">
                ¥ <span>7,199.</span>00
              </div>
              <div class="module2" :style="{background:isColor[0]}">
                玫瑰金
              </div>
              <div class="module3" :style="{background:isColor[0]}">
                256G
              </div>
              <div class="module4">
                <div :style="{background:isColor[1],color:isColor[0]}" v-if="lightColour">
                  加入购物车
                </div>
                <div :style="{background:isColor[1]}" v-else>
                  加入购物车
                </div>
                <div :style="{background:isColor[0]}">
                  立即购买
                </div>
              </div>
            </div>
            <div class="preview-item style-change3"
            :style="{backgroundImage: 'url(' + bgimg3 + ')'}">
              <div class="module1" :style="{color:isColor[0]}">
                ￥<span>7,199.</span>00
              </div>
              <div class="module2" :style="{color:isColor[0]}">￥<span>7,199.</span>00
              </div>
              <div class="module3" :style="{color:isColor[0]}">
                合计：  ￥<span>14,398.</span>00
              </div>
              <div class="module4" :style="{background:isColor[0]}">
                去结算(2)
              </div>
            </div>
          </div>
        </div>
        <div>
            <el-button type="primary" @click="saveStyle()" size="large" :loading="loading">保存</el-button>
        </div>
      </div>
    </el-tab-pane>
    <content-no :show="contentNo" v-if="tabelData.page.rowCount == 0 "></content-no>
    <div class="shop-textr" v-if="tabelData.page.pageCount>1 && activeName != 'style'">
      <el-pagination  background
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="tabelData.page.pageSize"
        layout="prev, pager, next, jumper"
        :total="tabelData.page.rowCount">
      </el-pagination>
    </div>
  </el-tabs>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="680px">
    <div class="dialog-list " style="height: 180px">
        <span class="dialog-title">
            <i class="el-icon-warning"></i>
        </span>
        <div class="dialog-text" >
            <p style="margin-bottom:5px">您需要预先设置收款方式方可完成认证</p>
            <span>收款方式可选择开通多粉钱包，您无需注册微信和支付宝。只需简单几步，即可完成收款方式配置 </span>
        </div>
    </div>
    <div class="dialog-list shop-textr">
        <span style="color:#20a0ff;margin-right: 10px;display:inline-block">已有商户收款方式</span>
        <el-button type="primary" @click="duofengOpen()">开通多粉钱包</el-button>
    </div>
  </el-dialog>
</div>
</template>
 <script>
import Lib from "assets/js/Lib";
import defaultImg from "components/defaultImg";
import contentNo from "components/contentNo";

import bgimg1 from "../img/style1.png";
import bgimg2 from "../img/style2.png";
import bgimg3 from "../img/style4.jpg";
export default {
  components: {
    defaultImg,
    contentNo
  },
  data() {
    return {
      activeName: "shop", //默认打开tab
      tabelData: {
        //列表数据
        page: {
          subList: [],
          pageCount: -1
        }
      },
      imgUrl: "",
      path: "",
      styleSelect: false,
      shopSelect: "", //搜索店铺选中店铺
      isPass1: false, //个人认证通过
      isPass2: false, //担保交易通过
      isPass3: false, //线下店铺通过
      isPass4: false, //旗舰店通过
      currentPage: 1, //默认打开第一页
      isPage: false, //潘墩列表页数多页
      isShopList: true, //判断是否有商铺list数
      isPageList: true, //判断是否有页面list数
      shopOptions: {},
      value: "",
      styles: "",
      style_key: false,
      ajaxStyle_key: false,//请求过的风格 防止重复提交
      isColor: [],
      dialogVisible: false, //二维码弹出框
      contentNo: "shop", //没有数据显示
      isSecuritytrade: "", // 是否加入担保交易   0未加入 1已加入
      bgimg1: bgimg1, //全站风格背景图
      bgimg2: bgimg2,
      bgimg3: bgimg3,
      webPath: "",
      lightColour:false,//是否是浅色
      isWxPayUser:false,//商家是否有支付平台
      dialogVisible:false,//认证弹框
      dialogWidth:'tiny',
      loading:false
    };
  },
  watch: {
    $route(to, from) {
      //console.log(to.path,from,'aaaaa')
      this.activeName = to.path.split("/")[1];
      //console.log(this.activeName,'$$$$$$$')
      this.switchAjax(this.activeName);
    },
    'dialogVisible'(to){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    handleSizeChange(){},
    /**
     * 切换导航
     */
    handleClick(tab, event) {
      let _this = this;
      _this.$router.push({ path: tab.name });
      this.switchAjax(tab.name);
    },
    /**
     * 请求判断
     */
    switchAjax(name) {
      if (name === "shop") {
        this.shopAjax(1);
      } else if (name === "page") {
        this.pageAjax(1);
      } else if (name === "style") {
        this.styleAjax();
      }
    },
    /**
     * 店铺多页请求
     * @param page     请求页数
     */
    shopAjax(Page) {
      let _this = this;
      //清空店铺数据
      this.tabelData = {
        page: {
          subList: [],
          pageCount: -1
        }
      };
      //请求店铺接口
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallStoreList_post,
        data: {
          curPage: Page
        },
        success: function(data) {
          _this.tabelData = data.data;
          _this.imgUrl = data.imgUrl;
          _this.path = data.path;
          _this.webPath = data.webPath;
          _this.isSecuritytrade = data.data.isSecuritytrade;
        }
      });
    },
    /**
     * 认证页跳转
     * @param data      店铺信息
     * @param certId    判断不为空为已认证
     */
    authentication(certId, data) {
      let _this = this;
      
      if(data.certCheckStatus==null){
         _this.jumpRouter("shop/authentication/", data);
      }else{
        console.log(certId, data,'certId, data');
        let msg1="";
        let title = '';
        if(data.certCheckStatus==0){
          title = '认证审核中'
          msg1="请耐心等待1-2个工作日，工作人员会尽快审核";
        }else  if(data.certCheckStatus==1){
          msg1="您的店铺已经通过认证，如果重新发起认证，您提交的店铺认证信息将失效！";
        }else  if(data.certCheckStatus==-1){
          let refuseReason="";
          if(data.certRefuseReason!=null){
              refuseReason=data.certRefuseReason;
          }
          title = '审核不通过'
          msg1="不通过理由："+refuseReason+"请重新发起认证！";
        }else if(!_this.isWxPayUser){
          if(width <= 1500) dialogWidth = 'small';
          _this.dialogVisible = true;
          return
        }
        let _data = data;
        let msg = {
          dialogType: "warn",
          dialogTitle: title,
          dialogMsg: msg1,
          callback: {
            btnOne: function() {
              if(_data.certCheckStatus != 0){
                //认证信息设置失效
                _this.ajaxRequest({
                  url: DFshop.activeAPI.mallStoreCertSetInvalid_post,
                  data: {
                    id: certId
                  },
                  success: function(data) {
                    _this.jumpRouter("shop/authentication/", _data);
                  }
                }); 
              }          
            }
          }
        };
        _this.$root.$refs.dialogWarn.showDialog(msg);
      }
    },
    /**
     *商家是否有支付平台
     @param data 店铺id
     */
    mallIsWxPayUser(){
      let _this = this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIsWxPayUser_post,
        'success':function (data){
          _this.isWxPayUser=data.data;
        }
      });
    },
    /**
     *链接--二维码(店铺)
     @param data 店铺id
     */
    shopLink(shopData) {
      let _this = this;
      let msg = {
            title: "店铺链接",
            path: _this.webPath,
            pageLink: "/index/" + shopData.pageId //商城首页的链接 
          };
          _this.$root.$refs.dialogQR.showDialog(msg);
    },
    /**
     *链接--二维码（页面）
     @param data 店铺id
     */
    pageLink(data) {
      let _this = this;
      let msg = {
        title: "店铺链接",
        urlQR: "",
        path: _this.webPath,
        pageLink: "/index/" + data.id //商城首页的链接 
      };
      _this.$root.$refs.dialogQR.showDialog(msg);
    },
    /**
     * 删除店铺请求
     * @param ids 店铺id
     */
    shopDelete(ids) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallStoreDelete_post,
        data: {
          ids: ids
        },
        contentType: "application/json",
        success: function(data) {
          _this.$message({
            message: "删除成功",
            type: "success"
          });
          _this.shopAjax(1);
        }
      });
    },
    /**
     * 删除页面请求
     * @param ids 店铺id
     */
    pageDelete(ids) {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPageNewDelete_post,
        data: {
          ids: ids.id
        },
        success: function(data) {
          _this.$message({
            message: "删除成功",
            type: "success"
          });
          _this.pageAjax(1);
        }
      });
    },
    /**
     *删除
     *@param ids  请求参数
     *@param type 删除页面/店铺
     */
    handleDelete(ids, type) {
      let _this = this;
      let msg;
      if (type === "shop") {
        msg = {
          dialogTitle: "您确定要删除该店铺吗？",
          dialogMsg: "该店铺下还有相关联的商品、活动等信息，删除店铺后，这些信息都不可以恢复！",
          callback: {
            btnOne: function() {
              _this.shopDelete(ids);
            }
          }
        };
      }
      if (type === "page") {
        msg = {
          dialogTitle: "您确定要删除该页面信息吗？",
          dialogMsg: "点击确定后，删除信息不可以恢复！ ",
          callback: {
            btnOne: function() {
              _this.pageDelete(ids);
            }
          }
        };
      }
      _this.$root.$refs.dialogWarn.showDialog(msg);
    },
    /**
     * 页面管理页请求
     * @param page     请求页数
     */
    pageAjax(Page, shopId) {
      let _this = this;
      //列表数据
      this.tabelData = {
        page: {
          subList: [],
          pageCount: -1
        }
      };

      //初次请求店铺列表
      if (!shopId) {
        _this.storeList({
          success(data) {
            _this.webPath = data.webPath;
            _this.shopOptions = data.data;
          }
        });
      }

      _this.ajaxRequest({
        url: DFshop.activeAPI.mallPageNewlist_post,
        data: {
          curPage: Page,
          shopId: shopId
        },
        success: function(data) {
          _this.tabelData = data.data;
          $.each(_this.tabelData.page.subList, function(i) {
            let oldTime = _this.pag_create_time;
            _this.pag_create_time = Lib.M.format(oldTime);
          });
        }
      });
    },
    /**
     * 店铺选择
     */
    shop_Select() {
      this.pageAjax(1, this.shopSelect);
    },
    /**
     * 全站风格数据请求
     */
    styleAjax() {
      let _this = this;
      _this.ajaxRequest({
        url: DFshop.activeAPI.mallStoreGetStyleList_post,
        success: function(data) {
          _this.styleSelect = data.data.styleKey - 1;
          _this.styles = data.data.styleList;
          _this.isColor = data.data.styleList[_this.styleSelect].style;
          _this.isLightColour();
        }
      });
    },
    /**
     * 选择配色风格
     * @param colors     颜色组
     */
    styleSelected(colors, styleKey, index) {
      index === this.styleSelect?(this.styleSelect = false):(this.styleSelect = index);
      let _this = this;
      _this.styleSelect = index;
      _this.isColor = colors;
      _this.style_key = styleKey;
      _this.isLightColour(colors);
    },
    /** 
     * 是否是浅色
     */
    isLightColour(){
      let _this =  this;
      let flag = false;
      let lightColours = ['#ffe6e9','#f8f0db','#c4eff6'];//浅色
      lightColours.forEach((item,i)=>{
        if(_this.isColor[1] == item && !flag){
          flag = true;
        }
      })
      _this.lightColour = flag;
    },
    /**
     *保存店铺风格 
     */
    saveStyle() {
      let _this = this;
      //防止重复请求
      if(_this.ajaxStyle_key != null && _this.ajaxStyle_key ==  _this.style_key) return false;
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;
      _this.loading = !Lib.C.ajax_manage;

      _this.ajaxRequest({
        url: DFshop.activeAPI.mallStoreSaveStyle_post,
        data: {
          styleKey: _this.style_key
        },
        success: function(data) {
           _this.loading = false;
          _this.$message({
            message: "保存成功",
            type: "success"
          });
          _this.ajaxStyle_key = _this.style_key;
        }
      });
    },
    handleCurrentChange(val) {
      if (this.activeName === "shop") {
        this.shopAjax(val);
      } else if (this.activeName === "page") {
        this.pageAjax(val);
      }
 
    }
  },
  mounted() {
    let _this = this;

    let url=Lib.M.getUrlQuery("url");
    if(url !=''){
      console.log(url ,"url");
      _this.$router.push({ path: url });
      this.switchAjax(url);
    }

    let _href = window.location.hash.split("/")[1];
    _this.activeName = _href;
    _this.isAdminUser({
      success: function(data) {
        if (data.code == -1) return;
        _this.switchAjax(_this.activeName);
      }
    });
    this.mallIsWxPayUser();
  },
  /** 
   * 开通多粉
   */
  duofengOpen(){
    window.href = this.tabelData.openDfPayUrl;
  }
};
</script>

<style lang="less" scoped>
@import "../less/index.less";
.shop-textr {
  padding: 0 4%;
}
.el-dialog{
    .dialog-warn{
        background: #eef1f6;
        padding: 13px 30px;
        text-align: justify;
    }
    .dialog-list{
        width: 100%;
        margin: 20px 0;
        .dialog-title{
            margin: 0 20px;
            i{
                font-size: 36px;
            }
            .el-icon-warning{
                color: #f7ba2a;
            }
            .el-icon-circle-check{
                color: #35d062;
            }
        }
        .dialog-text{
            width: 78%;
            display: inline-block;
            vertical-align: top;
            color: #666;
            font-size: 14px;
            a{
                font-size: 18px;
                color: @blue;
            }
            p{
                color:#333;
            }
        }
    }
}
</style>
