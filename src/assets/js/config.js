import common from './common';

(function () {
  'use strict';

  /**
   * @namespace DF
   */

  const env = {
    develop: { // 开发环境

      /**
       * debug模式
       * @type {Boolean}
       * @memberof DF.env
       */
      debug: true,

      check_login: false,
      /**
       * 浏览器无痕模式
       * @type {Boolean}
       * @memberof DF.env
       */
      is_private_mode: false,

      /**
       * API地址
       * @type {String}
       * @memberof DF.env
       */
      activeAPI: '/api'
    },
    test: { // 测试环境
      debug: true,
      check_login: false,
      is_private_mode: false,
      activeAPI: window.location.origin
    }
  };

  /**
   * 父类
   * @namespace Configs
   */
  const DFshop = {};


  /**
   * 环境配置
   * @type {env.develop|{debug, API, WXCore, LoginUrl}}
   */
  DFshop.env = env.develop;

  DFshop.activeAPI = {
    /*调用素材库*/
    materialUrl: 'https://suc.deeptel.com.cn/common/material.do?retUrl=+',
    /*判断是否是管理员*/
    isAdminUser_post: DFshop.env.activeAPI + '/mall/isAdminUser',
    /*商城概况*/
    mallCount_post: DFshop.env.activeAPI + '/mall/count',
    /*店铺列表 （分页）*/
    mallStoreList_post: DFshop.env.activeAPI + '/mallStore/list',
    /*获取配色风格列表*/
    mallStoreGetStyleList_post: DFshop.env.activeAPI + '/mallStore/getStyleList',
    /*页面列表（分页）*/
    mallPageNewlist_post: DFshop.env.activeAPI + '/mallPage/new/list',
    /*店铺二维码生成*/
    mallStoreGenerateQRCode_get: DFshop.env.activeAPI +'/mallStore/generateQRCode',
     /*店铺链接*/
    mallStoreLink_post :DFshop.env.activeAPI+'/mallStore/link',
     /*下载提取二维码*/
    mallDownQr_get: DFshop.env.activeAPI+'/mall/downQr',
    /*商家店铺请求*/
    mallStorestoreInfo_post: DFshop.env.activeAPI+'/mallStore/storeInfo',
    /*可新增店铺门店列表*/
    mallStorGgetShopList_post: DFshop.env.activeAPI+'/mallStore/getShopList',
    /*保存店铺*/
    mallStoreSave_post: DFshop.env.activeAPI+'/mallStore/save',
    /*保存店铺配色风格*/
    mallStoreSaveStyle_post:DFshop.env.activeAPI+'/mallStore/saveStyle',
    /*删除店铺*/
    mallStoreDelete_post:DFshop.env.activeAPI+'/mallStore/delete',
    /*删除页面*/
    mallPageNewDelete_post:DFshop.env.activeAPI+'/mallPage/new/delete',
    /*获取页面信息*/
    mallPageNewPageInfo_post:DFshop.env.activeAPI+'/mallPage/new/pageInfo',
    /*获取商家店铺列表  (可用于下拉框)*/
    mallStoreStoreList_post:DFshop.env.activeAPI+'/mallStore/storeList',
    /*页面类型 (可用于下拉框)*/
    mallPageNewTypeMap_post:DFshop.env.activeAPI+'/mallPage/new/typeMap',
    /*物流管理列表*/
    mallFreightList_post:DFshop.env.activeAPI+'/mallFreight/list',
    /*删除物流管理 */
    mallFreightDelete_post:DFshop.env.activeAPI+'/mallFreight/delete',
    /*编辑物流信息 */
    mallFreightInfo_post:DFshop.env.activeAPI+'/mallFreight/freightInfo',
    /*获取快递公司信息 */
    mallFreightExpressList_post:DFshop.env.activeAPI+'/mallFreight/expressList',
    /*获取地区列表 */
    mallGetArea_post:DFshop.env.activeAPI+'/mall/getArea',
    /*保存物流信息 */
    mallFreightSave_post:DFshop.env.activeAPI+'/mallFreight/save',
    /*上门自提列表 */
    mallFreightTakeList_post:DFshop.env.activeAPI+'/mallFreight/take/list',
    /*删除上门自提数据 */
    mallFreightTakeDelete_post:DFshop.env.activeAPI+'/mallFreight/take/delete',
    /*根据id获取自提信息 */
    mallFreightTakeInfo_post:DFshop.env.activeAPI+'/mallFreight/take/takeInfo',
    /*保存上门自提信息  */
    mallFreightTakeSave_post:DFshop.env.activeAPI+'/mallFreight/take/save',

    /*获取商城设置信息 */
    mallPaySetPaySetInfo_post:DFshop.env.activeAPI+'/mallPaySet/paySetInfo',
    /*保存商城设置 */
    mallPaySetSave_post:DFshop.env.activeAPI+'/mallPaySet/setSave',
    /*判断有无认证服务号 */
    mallPaySetIsAuthService_post:DFshop.env.activeAPI+'/mallPaySet/isAuthService',
    /*获取消息模板 */
    mallPaySetGetTemplate_post:DFshop.env.activeAPI+'/mallPaySet/getTemplate',
    /*设置消息模板*/
    mallPaySetSmsTemplate_post:DFshop.env.activeAPI+'/mallPaySet/setSmsTemplate',
    /*判断是否加入担保 */
    mallIsSecuritytrade_post:DFshop.env.activeAPI+'/mallSecuritytrade/isSecuritytrade',
    /*获取退出担保理由列表 */
    mallQuitDanbaoReasonList_post:DFshop.env.activeAPI+'/mallSecuritytrade/quitReasonMap',
    /*保存退出担保原因 */
    mallSecuritytradeSave_post:DFshop.env.activeAPI+'/mallSecuritytrade/save',
    /*加入担保 */
    mallSecuritytradeAdd_post:DFshop.env.activeAPI+'/mallSecuritytrade/add',
    /*保存认证信息*/
    mallStoreCertSave_post:DFshop.env.activeAPI+'/mallStore/cert/save',
    /*获取认证的店铺类型*/
    mallStoreCertCategoryMap_post:DFshop.env.activeAPI+'/mallStore/cert/categoryMap',

    /*商品列表 */
    mallProductList_post:DFshop.env.activeAPI+'/mallProduct/list',
    /**删除、送审、上架、下架商品 */
    mallProductBatchProduct_post:DFshop.env.activeAPI+'/mallProduct/batchProduct',
    /* 获取各状态下商品数量 */
    mallProductCountStatus_post:DFshop.env.activeAPI+'/mallProduct/countStatus',

    /*团购列表 */
    mallGroupBuyList_post:DFshop.env.activeAPI+'/mallGroupBuy/list',
    /* 删除、使活动失效功能 */
    mallGroupBuyDelete_post:DFshop.env.activeAPI+'/mallGroupBuy/delete',
    /*获取团购信息 */
    mallGroupBuyInfo_post:DFshop.env.activeAPI+'/mallGroupBuy/groupBuyInfo',
    /*根据店铺id获取活动商品列表 */
    mallGroupBuyGetProduct_post:DFshop.env.activeAPI+'/mallGroupBuy/getProductByGroup',
    /*根据商品id获取商品规格、库存 */
    mallGetSpecificaByProId_post:DFshop.env.activeAPI+'/mallGroupBuy/getSpecificaByProId',
    /*保存团购信息 */
    mallGroupBuySave_post:DFshop.env.activeAPI+'/mallGroupBuy/save',

    /*超级销售员基础设置 */
    mallSellersGetSellerSet_post:DFshop.env.activeAPI+'/mallSellers/new/getSellerSet',
    /*保存超级销售员基础设置 */
    mallSellersSaveSellerSet_post:DFshop.env.activeAPI+'/mallSellers/new/saveSellerSet',
    /*商品拥金设置列表 */
    mallSellersJoinProduct_post:DFshop.env.activeAPI+'/mallSellers/new/joinProduct',
    /*获取商品佣金信息 */
    mallSellersJoinProductInfo_post:DFshop.env.activeAPI+'/mallSellers/new/joinProductInfo',
    /*保存商品佣金信息 */
    mallSellerSaveJoinProduct_post:DFshop.env.activeAPI+'/mallSellers/new/saveJoinProduct',
    /*删除、启用、禁用商品佣金方法 */
    mallSellerSetJoinProductStatus_post:DFshop.env.activeAPI+'/mallSellers/new/setJoinProductStatus',
    /*推荐审核列表 */
    mallSellersCheckList_post:DFshop.env.activeAPI+'/mallSellers/new/sellerCheckList',
    /*审核通不通过 */
    mallSellersCheckSeller_post:DFshop.env.activeAPI+'/mallSellers/new/checkSeller',
    /*超级销售员列表 */
    mallSellersList_post:DFshop.env.activeAPI+'/mallSellers/new/sellerList',
    /*启用、暂停销售员方法 */
    mallSellerStartUseSeller_post:DFshop.env.activeAPI+'/mallSellers/new/startUseSeller',
    /*提现列表 */
    mallSellersWithDrawList_post:DFshop.env.activeAPI+'/mallSellers/new/withDrawList',

    /*预售管理列表 */
    mallPresaleList_post:DFshop.env.activeAPI+'/mallPresale/list',
    /*获取预售信息 */ 
    mallPresalePresaleInfo_post:DFshop.env.activeAPI+'/mallPresale/presaleInfo',
    /*保存预售信息 */
    mallPresaleSave_post:DFshop.env.activeAPI+'/mallPresale/save',
    /*删除预售、使预售失效 */
    mallPresaleDelete_post:DFshop.env.activeAPI+'/mallPresale/delete',
    /*定金管理列表 */
    mallPresaleDepositList_post:DFshop.env.activeAPI+'/mallPresale/deposit/list',
    /*退定金 */
    mallPresaleAgreedReturnDeposit_post:DFshop.env.activeAPI+'/mallPresale/deposit/agreedReturnDeposit',
    /*预售送礼列表 */
    mallPresaleGiveList_post:DFshop.env.activeAPI+'/mallPresale/give/list',
    /*预售送礼类型列表 */
    mallPresaleGiveDictList_post:DFshop.env.activeAPI+'/mallPresale/give/dictList',
    /*删除预售送礼 */
    mallPresaleGiveDelete_post:DFshop.env.activeAPI+'/mallPresale/give/delete',
    /*保存预售送礼设置 */
    mallPresaleGiveSave_post:DFshop.env.activeAPI+'/mallPresale/give/save',        
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
          // isSpec:opt.isSpec,
          // seckillId:opt.seckillId,
          // type:opt.type
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
