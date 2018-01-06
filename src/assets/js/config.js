
(function () {
  'use strict';

  /**
   * 父类
   * @namespace Configs
   */
  const DFshop = {};
  /**
   * 开发启用代理api
   * 打包注释DFshop.api（不需要）
   */
  /**
   * 生产build
   */
  //DFshop.api ="";
  //DFshop.face = '/images/activity/miniscene/phone/face/' 
  /**
   * 开发dev
   */
  DFshop.api = "/api";
  DFshop.face = '/static/arclist/' 

  //get请求   接口前加上 DFshop.api

  /*start 请求接口***********************************************************************************************************/
  
  DFshop.activeAPI = {
    /*素材库地址*/
    materialUrl: '',
    /*判断是否是管理员*/
    isAdminUser_post: '/mall/E9lM9uM4ct/isAdminUser',
    /*商城概况*/
    mallCount_post: '/mall/E9lM9uM4ct/count',
    /*获取商城营销地址*/
    getMarketingUrl_post: '/mall/E9lM9uM4ct/getMarketingUrl',
     /*获取素材库地址*/
    getMaterialUrl_post: '/mall/E9lM9uM4ct/getMaterialUrl',
    /**
     * 店铺管理相关接口
     */
    /*店铺列表 （分页）*/
    mallStoreList_post: '/mallStore/E9lM9uM4ct/list',
    /*获取配色风格列表*/
    mallStoreGetStyleList_post: '/mallStore/E9lM9uM4ct/getStyleList',
    /*页面列表（分页）*/
    mallPageNewlist_post: '/mallPage/E9lM9uM4ct/list',
    /*店铺二维码生成*/
    mallStoreGenerateQRCode_get: DFshop.api+'/mallStore/E9lM9uM4ct/generateQRCode',
    /*店铺链接*/
    mallStoreLink_post: '/mallStore/E9lM9uM4ct/link',
    /*下载提取二维码*/
    mallDownQr_get: DFshop.api+'/mall/E9lM9uM4ct/downQr',
    /*商家店铺请求*/
    mallStorestoreInfo_post: '/mallStore/E9lM9uM4ct/storeInfo',
    /*可新增店铺门店列表*/
    mallStorGgetShopList_post: '/mallStore/E9lM9uM4ct/getShopList',
    /*保存店铺*/
    mallStoreSave_post: '/mallStore/E9lM9uM4ct/save',
    /*保存店铺配色风格*/
    mallStoreSaveStyle_post: '/mallStore/E9lM9uM4ct/saveStyle',
    /*删除店铺*/
    mallStoreDelete_post: '/mallStore/E9lM9uM4ct/delete',
    /*删除页面*/
    mallPageNewDelete_post: '/mallPage/E9lM9uM4ct/delete',
    /*获取页面信息*/
    mallPageNewPageInfo_post: '/mallPage/E9lM9uM4ct/pageInfo',
    /*保存页面信息*/
    mallPageSave_post: '/mallPage/E9lM9uM4ct/save',
    /*获取商家店铺列表  (可用于下拉框)*/
    mallStoreStoreList_post: '/mallStore/E9lM9uM4ct/storeList',
    /*页面类型 (可用于下拉框)*/
    mallPageNewTypeMap_post: '/mallPage/E9lM9uM4ct/typeMap',
    /*根据店铺id查询页面id*/
    getPageIdByShopId_get: '/mallPage/E9lM9uM4ct/getPageIdByShopId',
    /*获取短信验证码 */
    mallStoreCertGetValCode_post: '/mallStore/E9lM9uM4ct/cert/getValCode',


    /*物流管理列表*/
    mallFreightList_post: '/mallFreight/E9lM9uM4ct/list',
    /*删除物流管理 */
    mallFreightDelete_post: '/mallFreight/E9lM9uM4ct/delete',
    /*编辑物流信息 */
    mallFreightInfo_post: '/mallFreight/E9lM9uM4ct/freightInfo',
    /*获取快递公司信息 */
    mallFreightExpressList_post: '/mallFreight/E9lM9uM4ct/expressList',
    /*获取地区列表 */
    mallGetArea_post: '/mall/E9lM9uM4ct/getArea',
    /*保存物流信息 */
    mallFreightSave_post: '/mallFreight/E9lM9uM4ct/save',
    /*上门自提列表 */
    mallFreightTakeList_post: '/mallFreight/E9lM9uM4ct/take/list',
    /*删除上门自提数据 */
    mallFreightTakeDelete_post: '/mallFreight/E9lM9uM4ct/take/delete',
    /*根据id获取自提信息 */
    mallFreightTakeInfo_post: '/mallFreight/E9lM9uM4ct/take/takeInfo',
    /*保存上门自提信息  */
    mallFreightTakeSave_post: '/mallFreight/E9lM9uM4ct/take/save',
    /*上门自提功能开启/关闭  */
    mallTakeSetTakeTheir_post: '/mallFreight/E9lM9uM4ct/take/setTakeTheir',

    /*获取商城设置信息 */
    mallPaySetPaySetInfo_post: '/mallPaySet/E9lM9uM4ct/paySetInfo',
    /*保存商城设置 */
    mallPaySetSave_post: '/mallPaySet/E9lM9uM4ct/setSave',
    /*判断有无认证服务号 */
    mallPaySetIsAuthService_post: '/mallPaySet/E9lM9uM4ct/isAuthService',
    /*获取消息模板 */
    mallPaySetGetTemplate_post: '/mallPaySet/E9lM9uM4ct/getTemplate',
    /*设置消息模板*/
    mallPaySetSmsTemplate_post: '/mallPaySet/E9lM9uM4ct/setSmsTemplate',
    /*判断是否加入担保 */
    mallIsSecuritytrade_post: '/mallSecuritytrade/E9lM9uM4ct/isSecuritytrade',
    /*判断商家是否有商户支付平台 */
    mallIsWxPayUser_post: '/mall/E9lM9uM4ct/isWxPayUser',
    /*获取退出担保理由列表 */
    mallQuitDanbaoReasonList_post: '/mallSecuritytrade/E9lM9uM4ct/quitReasonMap',
    /*保存退出担保原因 */
    mallSecuritytradeSave_post: '/mallSecuritytrade/E9lM9uM4ct/save',
    /*加入担保 */
    mallSecuritytradeAdd_post: '/mallSecuritytrade/E9lM9uM4ct/add',
    /*保存认证信息*/
    mallStoreCertSave_post: '/mallStore/E9lM9uM4ct/cert/save',
    /*获取认证的店铺类型*/
    mallStoreCertCategoryMap_post: '/mallStore/E9lM9uM4ct/cert/categoryMap',
    /*认证信息设置失效*/
    mallStoreCertSetInvalid_post: '/mallStore/E9lM9uM4ct/cert/setInvalid',

    /**
     * 商品管理相关接口
     */
    /*商品列表 */
    mallProductList_post: '/mallProduct/E9lM9uM4ct/list',
    /**删除、送审、上架、下架商品 */
    mallProductBatchProduct_post: '/mallProduct/E9lM9uM4ct/batchProduct',
    /* 获取各状态下商品数量 */
    mallProductCountStatus_post: '/mallProduct/E9lM9uM4ct/countStatus',
    /*编辑商品 */
    mallProductToEdit_post:'/mallProduct/E9lM9uM4ct/to_edit',
    /*新增商品 */
    mallProductAdd_post:'/mallProduct/E9lM9uM4ct/add',
    /*修改商品*/
    mallProductUpdatet_post: '/mallProduct/E9lM9uM4ct/update',
    /*获取商品分组列表 (包含下级) */
    mallProductGetGroups_post:'/mallProduct/E9lM9uM4ct/group/getGroups',
    /*获取商品分组信息*/
    mallProductGroupInfo_post:'/mallProduct/E9lM9uM4ct/group/groupInfo',
    /*分组列表*/
    mallProductGroupList_post:'/mallProduct/E9lM9uM4ct/group/list',
    /*删除分组*/
    mallProductGroupDelete_post:'/mallProduct/E9lM9uM4ct/group/delete',
    /*推荐分组*/
    mallProductGroupRecommend_post:'/mallProduct/E9lM9uM4ct/group/recommend',
    /*保存分组信息 */
    mallProductGroupSave_post:'/mallProduct/E9lM9uM4ct/group/save',
    /*商品页模板列表（分页） */
    mallProductTemplateList_post:'/mallProduct/E9lM9uM4ct/template/list',
    /*删除商品页模板 */
    mallProductTemplateDelete_post:'/mallProduct/E9lM9uM4ct/template/delete',
    /*保存商品页模板 */
    mallProductTemplateSave_post:'/mallProduct/E9lM9uM4ct/template/save',
    /*获取商品页模板信息 */
    mallProductTemplateInfo_post:'/mallProduct/E9lM9uM4ct/template/templateInfo',
    /*获取规格名称和值 */
    mallProductSpecificaList_post:'/mallProduct/E9lM9uM4ct/spec/getSpecificaList',
    /*获取规格名称和值*/
    mallProductSpecaddSpecifica_post: '/mallProduct/E9lM9uM4ct/spec/addSpecifica',
    /*根据店铺ID获取物流信息*/
    mallFreightGetFreightByShopId_post: '/mallFreight/E9lM9uM4ct/getFreightByShopId',
    /*获取会员卡列表*/
    mallCardList_post: '/mall/E9lM9uM4ct/cardList',
    /*获取卡券包列表*/
    mallCardReceiveList_post: '/mall/E9lM9uM4ct/cardReceiveList',
    /*获取商家流量列表*/
    mallFlowList_post: '/mall/E9lM9uM4ct/flowList',


    /*团购列表 */
    mallGroupBuyList_post: '/mallGroupBuy/E9lM9uM4ct/list',
    /* 删除、使活动失效功能 */
    mallGroupBuyDelete_post: '/mallGroupBuy/E9lM9uM4ct/delete',
    /*获取团购信息 */
    mallGroupBuyInfo_post: '/mallGroupBuy/E9lM9uM4ct/groupBuyInfo',
    /*根据店铺id获取活动商品列表 */
    mallGroupBuyGetProduct_post: '/mallGroupBuy/E9lM9uM4ct/getProductByGroup',
    /*根据商品id获取商品规格、库存 */
    mallGetSpecificaByProId_post: '/mallGroupBuy/E9lM9uM4ct/getSpecificaByProId',
    /*保存团购信息 */
    mallGroupBuySave_post: '/mallGroupBuy/E9lM9uM4ct/save',

    /*超级销售员基础设置 */
    mallSellersGetSellerSet_post: '/mallSellers/E9lM9uM4ct/getSellerSet',
    /*保存超级销售员基础设置 */
    mallSellersSaveSellerSet_post: '/mallSellers/E9lM9uM4ct/saveSellerSet',
    /*商品拥金设置列表 */
    mallSellersJoinProduct_post: '/mallSellers/E9lM9uM4ct/joinProduct',
    /*获取商品佣金信息 */
    mallSellersJoinProductInfo_post: '/mallSellers/E9lM9uM4ct/joinProductInfo',
    /*保存商品佣金信息 */
    mallSellerSaveJoinProduct_post: '/mallSellers/E9lM9uM4ct/saveJoinProduct',
    /*删除、启用、禁用商品佣金方法 */
    mallSellerSetJoinProductStatus_post: '/mallSellers/E9lM9uM4ct/setJoinProductStatus',
    /*推荐审核列表 */
    mallSellersCheckList_post: '/mallSellers/E9lM9uM4ct/sellerCheckList',
    /*审核通不通过 */
    mallSellersCheckSeller_post: '/mallSellers/E9lM9uM4ct/checkSeller',
    /*超级销售员列表 */
    mallSellersList_post: '/mallSellers/E9lM9uM4ct/sellerList',
    /*启用、暂停销售员方法 */
    mallSellerStartUseSeller_post: '/mallSellers/E9lM9uM4ct/startUseSeller',
    /*提现列表 */
    mallSellersWithDrawList_post: '/mallSellers/E9lM9uM4ct/withDrawList',

    /*预售管理列表 */
    mallPresaleList_post: '/mallPresale/E9lM9uM4ct/list',
    /*获取预售信息 */
    mallPresalePresaleInfo_post: '/mallPresale/E9lM9uM4ct/presaleInfo',
    /*保存预售信息 */
    mallPresaleSave_post: '/mallPresale/E9lM9uM4ct/save',
    /*删除预售、使预售失效 */
    mallPresaleDelete_post: '/mallPresale/E9lM9uM4ct/delete',
    /*定金管理列表 */
    mallPresaleDepositList_post: '/mallPresale/E9lM9uM4ct/deposit/list',
    /*退定金 */
    mallPresaleAgreedReturnDeposit_post: '/mallPresale/E9lM9uM4ct/deposit/agreedReturnDeposit',
    /*预售送礼列表 */
    mallPresaleGiveList_post: '/mallPresale/E9lM9uM4ct/give/list',
    /*预售送礼类型列表 */
    mallPresaleGiveDictList_post: '/mallPresale/E9lM9uM4ct/give/dictList',
    /*删除预售送礼 */
    mallPresaleGiveDelete_post: '/mallPresale/E9lM9uM4ct/give/delete',
    /*保存预售送礼设置 */
    mallPresaleGiveSave_post: '/mallPresale/E9lM9uM4ct/give/save',

    /*拍卖列表 */
    mallAuctionList_post: '/mallAuction/E9lM9uM4ct/list',
    /*获取拍卖信息 */
    mallAuctionAuctionInfo_post: '/mallAuction/E9lM9uM4ct/auctionInfo',
    /*保存拍卖信息 */
    mallAuctionSave_post: '/mallAuction/E9lM9uM4ct/save',
    /*删除、使拍卖活动失效 */
    mallAuctionDelete_post: '/mallAuction/E9lM9uM4ct/delete',
    /*保证金列表 */
    mallAuctionMarginList_post: '/mallAuction/E9lM9uM4ct/margin/list',
    /*拍卖退保证金 */
    mallAuctionAgreedReturnMargin_post: '/mallAuction/E9lM9uM4ct/margin/agreedReturnMargin',

    /*批发列表 */
    mallWholesaleList_post: '/mallWholesale/E9lM9uM4ct/list',
    /*获取批发信息 */
    mallWholesalePifaInfo_post: '/mallWholesale/E9lM9uM4ct/pifaInfo',
    /*保存批发活动信息 */
    mallWholesaleSave_post: '/mallWholesale/E9lM9uM4ct/save',
    /*使批发失效、删除 */
    mallWholesaleDelete_post: '/mallWholesale/E9lM9uM4ct/delete',
    /*批发商管理列表 */
    mallPifaShangList_post: '/mallWholesale/E9lM9uM4ct/wholesalers/list',
    /*批发审核通过、不通过、启用、禁用 */
    mallWholesalersUpdateStatus_post: '/mallWholesale/E9lM9uM4ct/wholesalers/updateStatus',
    /*同步批发商成交量/金额 */
    mallWholesaleSyncOrderPifa_post: '/mallWholesale/E9lM9uM4ct/wholesalers/syncOrderPifa',
    /*批发设置 */
    mallSetWholesale_post: '/mallWholesale/E9lM9uM4ct/setWholesale',
    /*保存批发设置 */
    mallWholesaleSaveSet_post: '/mallWholesale/E9lM9uM4ct/saveSet',

    /*秒杀管理 */
    mallSeckillList_post: '/mallSeckill/E9lM9uM4ct/list',
    /*秒杀管理 删除、使失效 */
    mallSeckillDelete_post: '/mallSeckill/E9lM9uM4ct/delete',
    /*获取秒杀信息 */
    mallSeckillSeckillInfo_post: '/mallSeckill/E9lM9uM4ct/seckillInfo',
    /*保存秒杀 */
    mallSeckillSave_post: '/mallSeckill/E9lM9uM4ct/save',

    /**获取收入金额列表*/
    getCountListByDate_post:'/mallCountIncome/E9lM9uM4ct/getCountListByDate',
    /**获取交易记录的营业额统计*/
    getTurnoverCount_post:'/mallCountIncome/E9lM9uM4ct/getTurnoverCount',
    /**交易记录列表*/
    tradeList_post:'/mallOrder/E9lM9uM4ct/tradeList',
    /**导出交易记录订单*/
    exportTradeOrder_get: DFshop.api+'/mallOrder/E9lM9uM4ct/exportTradeOrder',

    /**
     * 评论管理相关接口
     */
    /**评论列表*/
    mallCommentList_post:'/mallComment/E9lM9uM4ct/list',
    /**回复评论*/
    mallCommentReply_post:'/mallComment/E9lM9uM4ct/reply',
    /**获取评论送礼设置*/
    mallCommentGiveInfo_post:'/mallComment/E9lM9uM4ct/giveInfo',
    /**保存评论送礼信息*/
    mallCommentSaveGive_post:'/mallComment/E9lM9uM4ct/saveCommentGive',

    /**
    * 订单管理相关接口
    */
    /**订单管理列表 */
    mallOrderList_post:'/mallOrder/E9lM9uM4ct/list',
    /**获取订单详情*/
    orderInfo_post:'/mallOrder/E9lM9uM4ct/orderInfo',
    /**修改状态 */
    updateStatus_post:'/mallOrder/E9lM9uM4ct/updateStatus',
    /**获取取消订单理由列表 */
    cancelReasonMap_post:'/mallOrder/E9lM9uM4ct/cancelReasonMap',
    /**修改退款状态 */
    updateReturn_post:'/mallOrder/E9lM9uM4ct/updateReturn',
    /**打印订单*/
    exportMallOrderr_post:'/mallOrder/E9lM9uM4ct/toPrintMallOrder',
    /**导出订单记录订单*/
    exportMallOrderr_get: DFshop.api+'/mallOrder/E9lM9uM4ct/exportMallOrder',

    /**
     * 对外报价相关接口
     */
    /**报价单列表 */ 
    purchaseOrderList_post:'/purchase/E9lM9uM4ct/order/list',
    /**获取所有店铺的商品*/
    purchaseOrderGetProductAll_post:'/purchase/E9lM9uM4ct/order/getProductAll',
    /**保存报价单 */
    purchaseOrderSave_post:'/purchase/E9lM9uM4ct/order/save',
    /**获取报价单信息 */
    purchaseOrderInfo_post:'/purchase/E9lM9uM4ct/order/orderInfo',
    /**修改报价单状态 */
    purchaseOrderUpdateStatus_post:'/purchase/E9lM9uM4ct/order/updateStatus',
    /**获取收款详情列表 */
    purchaseReceivablesDetails_post:'/purchase/E9lM9uM4ct/order/receivablesDetails',
    /**获取收款详情列表 */
    purchaseStatisticsList_post:'/purchase/E9lM9uM4ct/order/statisticsList',
    /**获取留言列表 */
    purchaseLanguageList_post:'/purchase/E9lM9uM4ct/order/languageList',
    /**获取留言详情列表 */
    purchaseLanguageDetails_post:'/purchase/E9lM9uM4ct/order/languageDetails',
    /**商家回复买家的留言 */
    purchaseReplyLanguage_post:'/purchase/E9lM9uM4ct/order/replyLanguage',

    /**合同列表 */
    purchaseContractList_post:'/purchase/E9lM9uM4ct/contract/list',
    /**保存合同 */
    purchaseContractSave_post:'/purchase/E9lM9uM4ct/contract/save',
    /**获取合同信息 */
    purchaseContractInfo_post:'/purchase/E9lM9uM4ct/contract/contractInfo',
    /**删除合同 */
    purchaseContractDelete_post:'/purchase/E9lM9uM4ct/contract/delete',
    /**查询所有的合同 */
    purchaseAllcontractList_post:'/purchase/E9lM9uM4ct/contract/contractList',

    /**公司模板列表 */
    purchaseCompanyList_post:'/purchase/E9lM9uM4ct/company/list',
    /**保存公司模板 */
    purchaseCompanySave_post:'/purchase/E9lM9uM4ct/company/save',
    /**获取公司模板信息 */
    purchaseCompanyInfo_post:'/purchase/E9lM9uM4ct/company/companyInfo',
    /**删除公司模板 */
    purchaseCompanyDelete_post:'/purchase/E9lM9uM4ct/company/delete',
    /**查询所有的公司模板 */
    purchaseCompanyModeList_post:'/purchase/E9lM9uM4ct/company/companyModeList',

    /**
     * 积分商城相关接口
     */
    /**积分列表 */
    mallIntegralList_post:'/mallIntegral/E9lM9uM4ct/list',
    /**获取积分商品信息 */
    mallIntegralInfo_post:'/mallIntegral/E9lM9uM4ct/integralInfo',
    /**保存积分商品 */
    mallIntegralSave_post:'/mallIntegral/E9lM9uM4ct/save',
    /**设置积分的状态（删除，失效 ，启用） */
    mallIntegralSetStatus_post:'/mallIntegral/E9lM9uM4ct/setStatus',

    /**积分商城图片列表 */
    mallIntegralImageList_post:'/mallIntegral/E9lM9uM4ct/image/list',
    /**获取积分商城图片信息 */
    mallIntegralImageInfo_post:'/mallIntegral/E9lM9uM4ct/image/imageInfo',
    /**保存积分商城图片 */
    mallIntegralImageSave_post:'/mallIntegral/E9lM9uM4ct/image/save',
    /**设置积分的状态（删除，失效 ，启用） */
    mallIntegralImageSetStatus_post:'/mallIntegral/E9lM9uM4ct/image/setStatus',
    
    /**小程序图片管理列表 */
    mallAppletList_post:'/mallApplet/E9lM9uM4ct/list',
    /**小程序图片 删除，显示，不显示 */
    mallAppletDelete_post:'/mallApplet/E9lM9uM4ct/delete',
    /**保存小程序图片 */
    mallAppletSave_post:'/mallApplet/E9lM9uM4ct/save',
    /**获取小程序图片信息 */
    mallAppletInfo_post:'/mallApplet/E9lM9uM4ct/appletInfo',

    /**H5商城列表 */
    mallHtmlList_post:'/mallHtml/E9lM9uM4ct/list',
    /**获取h5商城信息 */
    mallHtmlInfo_post:'/mallHtml/E9lM9uM4ct/htmlInfo',
    /**获取模板列表 */
    mallHtmlModelList_post:'/mallHtml/E9lM9uM4ct/modelList',
    /**添加h5商城选中的模板 */
    mallHtmlSetMallHtml_post:'/mallHtml/E9lM9uM4ct/setMallHtml',
    /**保存修改信息（修改页面名称、介绍） */
    mallHtmlUpdate_post:'/mallHtml/E9lM9uM4ct/update',
    /**保存背景图 */
    mallHtmlUpdateImage_post:'/mallHtml/E9lM9uM4ct/updateImage',
    /**获取h5商城表单列表 */
    mallHtmlFromList_post:'/mallHtml/E9lM9uM4ct/htmlFromList',
    /**查看h5表单详情 */
    mallHtmlFromView_post:'/mallHtml/E9lM9uM4ct/htmlFromView',
    /**删除h5商城 */
    mallHtmlDelete_post:'/mallHtml/E9lM9uM4ct/delete',
    /**获取播放器样式列表 */
    mallHtmlPlayList_post:'/mallHtml/E9lM9uM4ct/playList',
    /**表单页面设计保存 */
    mallHtmlHtmlSave_post:'/mallHtml/E9lM9uM4ct/htmlSave',
  };


  /*end 请求接口***********************************************************************************************************/

  window.DFshop = DFshop;
}());
