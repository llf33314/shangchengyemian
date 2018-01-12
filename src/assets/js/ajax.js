import axios from 'axios';
import Vue from 'vue';
import C from './conf';

Vue.mixin({
    methods:{
    /**
     * 判断素材库地址是否存在
     */    
    isMaterialUrl(){
        if(DFshop.activeAPI.materialUrl == ''){
            this.getMaterialUrl();
        }
    },
    /**
     * 获取素材库地址
     */
    getMaterialUrl(){
        let _this=this;
        this.ajaxRequest({
            'url': DFshop.activeAPI.getMaterialUrl_post,
            'success':function (data){
                DFshop.activeAPI.materialUrl=data.data;
                // console.log( DFshop.activeAPI.materialUrl," DFshop.activeAPI.materialUrl");
            }
        });
    }, 
    /**
     * 判断营销地址是否存在
     */    
    isMarketingUrl(){
        if(this.$store.state.marketingUrl == ''){
            this.getMarketingUrl();
        }
    },   
    /**
     * 获取商城营销地址
     */
    getMarketingUrl(){
        let _this=this;
        this.ajaxRequest({
            'url': DFshop.activeAPI.getMarketingUrl_post,
            'success':function (data){
                _this.$store.commit('marketingData',data.data);
            }
        });
    }, 
    /**
     * isAdminUser
     * @param success  //强求后执行方法
     */
    isAdminUser(opt){
        let vm = this;
        this.ajaxRequest({
            'url': DFshop.activeAPI.isAdminUser_post,
            'success':function (data){
                if(data.data){
                 if(typeof opt.success == 'function') opt.success(data);
                }else{
                    // vm.$message({
                    //     message: "您不是管理员，不能操作！",
                    //     type: 'warning'
                    // });
 
                    let href = window.location.href;
                    let path = href.split('views')[0];
                    window.location.href= path+'views/error/index.html';
                    
                }
            }
        });
    }, 
     /**
     * 店铺搜索下拉列表
     * @param success  //成功执行方法
     */
    storeList(opt){
        this.ajaxRequest({
            'url': DFshop.activeAPI.mallStoreStoreList_post,
            'success':function (data){
                if(typeof opt.success == 'function') opt.success(data);
            }
        });
      },
      /*获取地区列表 */
      getAreaList(opt){
        this.ajaxRequest({
          'url': DFshop.activeAPI.mallGetArea_post,
          'data':{
            pid:opt.cityId
          },
          'success':function (data){
              if(typeof opt.success == 'function') opt.success(data);
          }
        });
      },
      /*根据店铺id获取活动商品列表 */
      mallGroupBuyGetProduct(opt){

        this.ajaxRequest({
          'url': DFshop.activeAPI.mallGroupBuyGetProduct_post,
          'data':{
            defaultProId:opt.defaultProId,
            shopId:opt.shopId,
            proName:opt.proName,
            curPage:opt.curPage,
            isCommission:opt.isCommission,
            isIntegral:opt.isIntegral
          },
          'success':function (data){
              if(typeof opt.success == 'function') opt.success(data);
          }
        });
      },
        /** 
         * 分组列表请求(包含下级)
         */
        groupListAjax(opt){
            this.ajaxRequest({
                'url': DFshop.activeAPI.mallProductGetGroups_post,
                'data': opt.data,
                'success':function (data){
                    if(typeof opt.success == 'function') opt.success(data);
                }
            });
        },
      /*根据商品id获取商品规格、库存 */
      mallGetSpecificaByProId(opt){
        this.ajaxRequest({
          'url': DFshop.activeAPI.mallGetSpecificaByProId_post,
          'data':{
            proId:opt.proId
          },
          'success':function (data){
              if(typeof opt.success == 'function') opt.success(data);
          }
        });
      },
        /**
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
      * @param {Function} error		    发送请求前
      * @param {Booleans} status		判断是否执行公用错误请求提示 false不使用 true使用  默认true使用
	  * @param return 
	*/
    ajaxRequestJQ(opt){
        let vm = this;
        let opts = opt || {};
        let status = opt.status || true;
        if (!opts.url) {
            alert('请填写接口地址');
            return false;
        }
        
        //配置请求头
        $.ajax({
            "type": 'post',
            "timeout": opts.time || 10 * 1000,
            "url": window.DFshop.api + opts.url,
            "data": opts.data || {},
            "dataType": opts.dataType || 'json',
            'maxPostSize': 0,
            success: function (res) {//成功
                console.log(res)
                    if (opts.success) {
                        //需要登陆（需要跳转）todo
                        if(res.code == 1001){
                            // location.href = res.data.url;
                            parent.window.postMessage("outLogin()", res.data.url);
                            // vm.$message({
                            //     message: "登陆失效，请前往重新登陆！",
                            //     type: "error"
                            //   });
                            return
                        }
                        if(status){
                            if(res.code != 0 ){
                                vm.$message({
                                    message: res.data.msg,
                                    type: 'warning'
                                });
                                return
                            }
                        }
                        opts.success(res.data, res);
    
                } else {
                    if (res.error) {
                        opts.error(error);
                    } else {
                        if(res.code == 1 ){
                            vm.$message({
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    }
    
                }
            },
            error: function (xhr, textStatus) {//失败
                if (opts.error) {
                    opts.error(error);
                } else {
                    console.log('catch');
                }
            },
            complete: function () {
                
            }
        });
    },
        /**
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
      * @param {Function} error		    发送请求前
      * @param {Booleans} status		判断是否执行公用错误请求提示 false不使用 true使用  默认true使用
	  * @param return 
	*/
	ajaxRequest(opt) {
        let vm = this;
        let opts = opt || {};
        let status = opt.status || true;
        if (!opts.url) {
            alert('请填写接口地址');
            return false;
        }
        //配置请求头
        axios({
            "method": opts.type || 'post',
            "url": window.DFshop.api + opts.url,
            "params": opts.data || {},
            "headers": {
                "Content-type": "application/json;charset=UTF-8",
            },
            'maxContentLength': 0,
            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
            "timeout": opts.time || 10 * 1000,
            "responseType": opts.dataType || 'json'
        }).then(function (res) {
            C.ajax_manage = true;
            if (res.status == 200) {

                if (opts.success) {
                    
                    //需要登陆（需要跳转）todo
                    if(res.data.code == 1001){
                        // location.href = res.data.url;
                        parent.window.postMessage("outLogin()", "*");
                        // vm.$message({
                        //     message: "登陆失效，请前往重新登陆！",
                        //     type: "error"
                        //   });
                        return
                    }
                    
                    if(status){
                        if(res.data.code != 0 ){
                            vm.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                            return
                        }
                    }
                    opts.success(res.data, res);
                }

            } else {
                if (data.error) {
                    opts.error(error);
                } else {
                    console.log('error');
                }

            }

        }).catch(function (error) {
            C.ajax_manage = true;
            console.log(error);
            if (opts.error) {
                opts.error(error);
            } else {
                console.log('catch');
            }
        });

        },
    },
    
})