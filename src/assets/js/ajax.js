import axios from 'axios';
import Vue from 'vue'

Vue.mixin({
    methods:{

    /**
     * isAdminUser
     * @param success  //强求后执行方法
     */
    isAdminUser(opt){
        this.ajaxRequest({
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
            curPage:opt.curPage
          },
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
                "Content-type": "application/json;charset=UTF-8"
            },
            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
            //"baseURL": window.h5App.api,//打包时注释
            "timeout": opts.time || 10 * 1000,
            "responseType": opts.dataType || 'json'
        }).then(function (res) {
            if (res.status == 200) {

                if (opts.success) {
                    
                    //需要登陆（需要跳转）todo
                    if(res.data.code == 1001){
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