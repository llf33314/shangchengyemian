
(function () {
  'use strict';

  /**
   * 父类
   * @namespace Configs
   */
  const DFshop = {};

  DFshop.api = "/api";
  // h5App.api ="";


  DFshop.activeAPI = {
    /*调用素材库*/
    materialUrl: 'https://suc.deeptel.com.cn/common/material.do?retUrl=+',
    /*判断是否是管理员*/
    isAdminUser_post:  '/mall/E9lM9uM4ct/isAdminUser',
    /*商城概况*/
    mallCount_post:  '/mall/E9lM9uM4ct/count',
    /*店铺列表 （分页）*/
    mallStoreList_post:  '/mallStore/E9lM9uM4ct/list',
    /*获取配色风格列表*/
    mallStoreGetStyleList_post:  '/mallStore/E9lM9uM4ct/getStyleList',
    /*页面列表（分页）*/
    mallPageNewlist_post:  '/mallPage/E9lM9uM4ct/list',
    /*店铺二维码生成*/
    mallStoreGenerateQRCode_get: '/mallStore/E9lM9uM4ct/generateQRCode',
     /*店铺链接*/
    mallStoreLink_post :'/mallStore/E9lM9uM4ct/link',
     /*下载提取二维码*/
    mallDownQr_get: '/mall/E9lM9uM4ct/downQr',
    /*商家店铺请求*/
    mallStorestoreInfo_post: '/mallStore/E9lM9uM4ct/storeInfo',
    /*可新增店铺门店列表*/
    mallStorGgetShopList_post: '/mallStore/E9lM9uM4ct/getShopList',
    /*保存店铺*/
    mallStoreSave_post: '/mallStore/E9lM9uM4ct/save',
    /*保存店铺配色风格*/
    mallStoreSaveStyle_post:'/mallStore/E9lM9uM4ct/saveStyle',
    /*删除店铺*/
    mallStoreDelete_post:'/mallStore/E9lM9uM4ct/delete',
    /*删除页面*/
    mallPageNewDelete_post:'/mallPage/E9lM9uM4ct/delete',
    /*获取页面信息*/
    mallPageNewPageInfo_post:'/mallPage/E9lM9uM4ct/pageInfo',
    /*获取商家店铺列表  (可用于下拉框)*/
    mallStoreStoreList_post:'/mallStore/E9lM9uM4ct/storeList',
    /*页面类型 (可用于下拉框)*/
    mallPageNewTypeMap_post:'/mallPage/E9lM9uM4ct/typeMap',
    
    /*物流管理列表*/
    mallFreightList_post:'/mallFreight/E9lM9uM4ct/list',
    /*删除物流管理 */
    mallFreightDelete_post:'/mallFreight/E9lM9uM4ct/delete',
    /*编辑物流信息 */
    mallFreightInfo_post:'/mallFreight/E9lM9uM4ct/freightInfo',
    /*获取快递公司信息 */
    mallFreightExpressList_post:'/mallFreight/E9lM9uM4ct/expressList',
    /*获取地区列表 */
    mallGetArea_post:'/mall/E9lM9uM4ct/getArea',
    /*保存物流信息 */
    mallFreightSave_post:'/mallFreight/E9lM9uM4ct/save',
    /*上门自提列表 */
    mallFreightTakeList_post:'/mallFreight/E9lM9uM4ct/take/list',
    /*删除上门自提数据 */
    mallFreightTakeDelete_post:'/mallFreight/E9lM9uM4ct/take/delete',
    /*根据id获取自提信息 */
    mallFreightTakeInfo_post:'/mallFreight/E9lM9uM4ct/take/takeInfo',
    /*保存上门自提信息  */
    mallFreightTakeSave_post:'/mallFreight/E9lM9uM4ct/take/save',

    /*获取商城设置信息 */
    mallPaySetPaySetInfo_post:'/mallPaySet/E9lM9uM4ct/paySetInfo',
    /*保存商城设置 */
    mallPaySetSave_post:'/mallPaySet/E9lM9uM4ct/setSave',
    /*判断有无认证服务号 */
    mallPaySetIsAuthService_post:'/mallPaySet/E9lM9uM4ct/isAuthService',
    /*获取消息模板 */
    mallPaySetGetTemplate_post:'/mallPaySet/E9lM9uM4ct/getTemplate',
    /*设置消息模板*/
    mallPaySetSmsTemplate_post:'/mallPaySet/E9lM9uM4ct/setSmsTemplate',
    /*判断是否加入担保 */
    mallIsSecuritytrade_post:'/mallSecuritytrade/E9lM9uM4ct/isSecuritytrade',
    /*获取退出担保理由列表 */
    mallQuitDanbaoReasonList_post:'/mallSecuritytrade/E9lM9uM4ct/quitReasonMap',
    /*保存退出担保原因 */
    mallSecuritytradeSave_post:'/mallSecuritytrade/E9lM9uM4ct/save',
    /*加入担保 */
    mallSecuritytradeAdd_post:'/mallSecuritytrade/E9lM9uM4ct/add',
    /*保存认证信息*/
    mallStoreCertSave_post:'/mallStore/E9lM9uM4ct/cert/save',
    /*获取认证的店铺类型*/
    mallStoreCertCategoryMap_post:'/mallStore/E9lM9uM4ct/cert/categoryMap',

    /*商品列表 */
    mallProductList_post:'/mallProduct/E9lM9uM4ct/list',
    /**删除、送审、上架、下架商品 */
    mallProductBatchProduct_post:'/mallProduct/E9lM9uM4ct/batchProduct',
    /* 获取各状态下商品数量 */
    mallProductCountStatus_post:'/mallProduct/E9lM9uM4ct/countStatus',

    /*团购列表 */
    mallGroupBuyList_post:'/mallGroupBuy/E9lM9uM4ct/list',
    /* 删除、使活动失效功能 */
    mallGroupBuyDelete_post:'/mallGroupBuy/E9lM9uM4ct/delete',
    /*获取团购信息 */
    mallGroupBuyInfo_post:'/mallGroupBuy/E9lM9uM4ct/groupBuyInfo',
    /*根据店铺id获取活动商品列表 */
    mallGroupBuyGetProduct_post:'/mallGroupBuy/E9lM9uM4ct/getProductByGroup',
    /*根据商品id获取商品规格、库存 */
    mallGetSpecificaByProId_post:'/mallGroupBuy/E9lM9uM4ct/getSpecificaByProId',
    /*保存团购信息 */
    mallGroupBuySave_post:'/mallGroupBuy/E9lM9uM4ct/save',

    /*超级销售员基础设置 */
    mallSellersGetSellerSet_post:'/mallSellers/E9lM9uM4ct/getSellerSet',
    /*保存超级销售员基础设置 */
    mallSellersSaveSellerSet_post:'/mallSellers/E9lM9uM4ct/saveSellerSet',
    /*商品拥金设置列表 */
    mallSellersJoinProduct_post:'/mallSellers/E9lM9uM4ct/joinProduct',
    /*获取商品佣金信息 */
    mallSellersJoinProductInfo_post:'/mallSellers/E9lM9uM4ct/joinProductInfo',
    /*保存商品佣金信息 */
    mallSellerSaveJoinProduct_post:'/mallSellers/E9lM9uM4ct/saveJoinProduct',
    /*删除、启用、禁用商品佣金方法 */
    mallSellerSetJoinProductStatus_post:'/mallSellers/E9lM9uM4ct/setJoinProductStatus',
    /*推荐审核列表 */
    mallSellersCheckList_post:'/mallSellers/E9lM9uM4ct/sellerCheckList',
    /*审核通不通过 */
    mallSellersCheckSeller_post:'/mallSellers/E9lM9uM4ct/checkSeller',
    /*超级销售员列表 */
    mallSellersList_post:'/mallSellers/E9lM9uM4ct/sellerList',
    /*启用、暂停销售员方法 */
    mallSellerStartUseSeller_post:'/mallSellers/E9lM9uM4ct/startUseSeller',
    /*提现列表 */
    mallSellersWithDrawList_post:'/mallSellers/E9lM9uM4ct/withDrawList',

    /*预售管理列表 */
    mallPresaleList_post:'/mallPresale/E9lM9uM4ct/list',
    /*获取预售信息 */ 
    mallPresalePresaleInfo_post:'/mallPresale/E9lM9uM4ct/presaleInfo',
    /*保存预售信息 */
    mallPresaleSave_post:'/mallPresale/E9lM9uM4ct/save',
    /*删除预售、使预售失效 */
    mallPresaleDelete_post:'/mallPresale/E9lM9uM4ct/delete',
    /*定金管理列表 */
    mallPresaleDepositList_post:'/mallPresale/E9lM9uM4ct/deposit/list',
    /*退定金 */
    mallPresaleAgreedReturnDeposit_post:'/mallPresale/E9lM9uM4ct/deposit/agreedReturnDeposit',
    /*预售送礼列表 */
    mallPresaleGiveList_post:'/mallPresale/E9lM9uM4ct/give/list',
    /*预售送礼类型列表 */
    mallPresaleGiveDictList_post:'/mallPresale/E9lM9uM4ct/give/dictList',
    /*删除预售送礼 */
    mallPresaleGiveDelete_post:'/mallPresale/E9lM9uM4ct/give/delete',
    /*保存预售送礼设置 */
    mallPresaleGiveSave_post:'/mallPresale/E9lM9uM4ct/give/save',     
    
    /*拍卖列表 */
    mallAuctionList_post:'/mallAuction/E9lM9uM4ct/list',
    /*获取拍卖信息 */
    mallAuctionAuctionInfo_post:'/mallAuction/E9lM9uM4ct/auctionInfo',
    /*保存拍卖信息 */
    mallAuctionSave_post:'/mallAuction/E9lM9uM4ct/save',
    /*删除、使拍卖活动失效 */
    mallAuctionDelete_post:'/mallAuction/E9lM9uM4ct/delete',
    /*保证金列表 */
    mallAuctionMarginList_post:'/mallAuction/E9lM9uM4ct/margin/list',
    /*拍卖退保证金 */ 
    mallAuctionAgreedReturnMargin_post:'/mallAuction/E9lM9uM4ct/margin/agreedReturnMargin',
    
    /*批发列表 */
    mallWholesaleList_post:'/mallWholesale/E9lM9uM4ct/list',
    /*获取批发信息 */
    mallWholesalePifaInfo_post:'/mallWholesale/E9lM9uM4ct/pifaInfo',
    /*保存批发活动信息 */
    mallWholesaleSave_post:'/mallWholesale/E9lM9uM4ct/save',
    /*使批发失效、删除 */
    mallWholesaleDelete_post:'/mallWholesale/E9lM9uM4ct/delete',
    /*批发商管理列表 */
    mallPifaShangList_post:'/mallWholesale/E9lM9uM4ct/wholesalers/list',
    /*批发审核通过、不通过、启用、禁用 */
    mallWholesalersUpdateStatus_post:'/mallWholesale/E9lM9uM4ct/wholesalers/updateStatus',
    /*同步批发商成交量/金额 */
    mallWholesaleSyncOrderPifa_post:'/mallWholesale/E9lM9uM4ct/wholesalers/syncOrderPifa',
    /*批发设置 */
    mallSetWholesale_post:'/mallWholesale/E9lM9uM4ct/setWholesale',
    /*保存批发设置 */
    mallWholesaleSaveSet_post:'/mallWholesale/E9lM9uM4ct/saveSet',
    
    /*秒杀管理 */
    mallSeckillList_post:'/mallSeckill/E9lM9uM4ct/list',
    /*秒杀管理 删除、使失效 */
    mallSeckillDelete_post:'/mallSeckill/E9lM9uM4ct/delete',
    /*获取秒杀信息 */
    mallSeckillSeckillInfo_post:'/mallSeckill/E9lM9uM4ct/seckillInfo',
    /*保存秒杀 */
    mallSeckillSave_post:'/mallSeckill/E9lM9uM4ct/save',
  };

  /*公共方法***********************************************************************************************************/

  DFshop.method = {
    /**
     * 获取URL参数
     * @param name 参数名
     * @rteurn {String}
     */
    getQueryString: function (name) {
      if (!name)return null;
      return window.location.href.split('?' + name + '=')[1];
      /*var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)'), array = location.search.match(reg);
       return array ? decodeURIComponent(array[2]) : null;*/
    },
    //JSON字符串转json对象
    strToJson: function (str) {
      var json = eval('(' + str + ')');
      return json;
    },
    /**
     * 获取cookie
     * @param {String} key 键
     * @return {String}
     */
    getCookie: function (key) {
      if (!key)return null;
      var reg = new RegExp('(?:; )?' + key + '=([^;]*);?');
      return reg.test(document.cookie) ? decodeURIComponent(RegExp['$1']) : null;
    },

    /**
     * 设置cookie
     * @param {String} key 键
     * @param {String} value 值
     * @param {Int} hours 过期时间(小时),默认3小时
     */
    setCookie: function (key, value, hours) {
      hours = hours || 3;
      if (key && value) {
        var expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + Number(hours) * 3600 * 1000);
        document.cookie = key + '=' + value + '; path=/;expires = ' + expireTime.toGMTString();
      } else {
        return 'no key or value';
      }
    },

    /**
     * 删除cookie
     * @param key 键
     */
    removeCookie: function (key) {
      var expireTime = new Date();
      expireTime.setTime(expireTime.getTime() - 1);
      var value = this.getCookie(key);
      if (value) {
        document.cookie = key + '=' + value + ';path=/;expires=' + expireTime.toGMTString();
      }
    },

    /**
     * 清除所有cookie
     */
    clearCookie: function () {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      return this;
    },
     /**
     * isAdminUser
     * @param success  //强求后执行方法
     */
    isAdminUser(opt){
      common.ajax({
          'url': DFshop.activeAPI.isAdminUser_post,
          'success':function (data){
              if(typeof opt.success == 'function') opt.success(data);
          }
      });
    },
     /**
     * 店铺搜索下拉列表
     * @param success  //成功执行方法
     */
    storeList(opt){
      common.ajax({
          'url': DFshop.activeAPI.mallStoreStoreList_post,
          'success':function (data){
              if(typeof opt.success == 'function') opt.success(data);
          }
      });
    },
    getAreaList(opt){
      common.ajax({
        'url': DFshop.activeAPI.mallGetArea_post,
        'data':{
          pid:opt.cityId
        },
        'success':function (data){
            if(typeof opt.success == 'function') opt.success(data);
        }
      });
    },
    mallGroupBuyGetProduct(opt){
      common.ajax({
        'url': DFshop.activeAPI.mallGroupBuyGetProduct_post,
        'data':{
          defaultProId:opt.defaultProId,
          shopId:opt.shopId,
          proName:opt.proName,
          curPage:opt.curPage
        },
        'success':function (data){
            if(typeof opt.success == 'function') opt.success(data);
        }
      });
    },
    mallGetSpecificaByProId(opt){
      common.ajax({
        'url': DFshop.activeAPI.mallGetSpecificaByProId_post,
        'data':{
          proId:opt.proId
        },
        'success':function (data){
            if(typeof opt.success == 'function') opt.success(data);
        }
      });
    }

  };

  /*end 公共方法***********************************************************************************************************/




  window.DFshop = DFshop;
}());
