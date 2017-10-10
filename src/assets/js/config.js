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
      activeAPI: 'http://mall.yifriend.net:8080'
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
    }
  };

  /*end 公共方法***********************************************************************************************************/


  /**
   * 全局正则表达式
   * @type {Object}
   * @namespace DF.regEx
   */
  DFshop.regEx = {
    /**
     * 验证手机
     * @type {Boolean}
     * @memberof DF.regEx
     * @default
     */
    phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    /**
     * 验证邮箱
     * @type {Boolean}
     * @memberof DF.regEx
     * @default
     */
    email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
  };

  window.DFshop = DFshop;
}());
