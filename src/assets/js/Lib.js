require('assets/css/_reset.css');
require('assets/css/common.less');
require('assets/font/iconfont.css');
//Element样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';


//import notice from 'components/notice.vue';//提示
import dialogWarn from 'components/dialogWarn.vue';//弹窗
import copyUrl from 'components/copy-url';//二维码弹窗
//注册时，vux必须放在 import Vue from 'vue'; 之前，否侧打包的体积非常大，估计是vux OR vue 抽风了
//import { AlertPlugin,LoadingPlugin  } from 'vux'

import Vue from 'vue';
//------ VUX UI 注册，如果不需要  VUX UI 请删除以下注册 -------
//Vue.use(AlertPlugin); //全局注册alert事件，注册之后，不需要每个页面都import alert
//Vue.use(LoadingPlugin ); //全局注册alert事件，注册之后，不需要每个页面都import alert
//--- VUX UI 注册 END --
import ui from 'components/gt-ui/index.js'//素材库
Vue.use(ui);
Vue.use(ElementUI);


//全局公用组件
 //通知提示

//Vue.component('notice', notice); 
Vue.component('dialogWarn', dialogWarn);
Vue.component('copyUrl', copyUrl);

import C from './conf';
import M from './common';
import Ajax from './ajax';
import  './config';  //配置文件
import Clipboard from 'clipboard';


import vueFilter from './vueFilter';
import jq from './jquery-2.2.2.min';
	

export default{
	M,C,Clipboard,Ajax
}

Vue.mixin({
    methods: {
        /**
         *路由跳转
        * @param link 路由地址
        */
        jumpHtml(link){
            window.location.href = window.location.origin+window.location.pathname+'#'+link;
        },
        /**
         *路由跳转
        * @param link 路由地址
        */
        jumpRouter(link,row){
            let _this = this;
            if(row){
                _this.$router.push({path:link, query: { data:  JSON.stringify(row)} });
                return;
            }
            _this.$router.push({path:link});
        },
    }
});
