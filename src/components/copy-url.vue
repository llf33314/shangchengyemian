<template>
<!-- 使用方法
* let msg ={
    //必写
    'title':'',//标题
    'imgUrl':'',//二维码图片链接
    'urlQR':'',//请求接口--二维码
    'pageLink':''//页面链接
    },
  }
  _this.$root.$refs.dialogQR.showDialog(msg);//调用方法
-->
  <section>
    <el-dialog :title="title" :visible.sync="copyUrlVisible" size="cope-link">
      <el-form label-width="120px">
        <el-form-item label="页面二维码:">
          <img class="erwema" :src="erweima" v-if="erweima !=''" />
          <span class= "erwema-no"  v-else>正在生成二维码...</span>
          <el-button type="primary" class="down" @click="down">下载二维码</el-button>
        </el-form-item>
        <el-form-item label="页面链接:" v-if="pageLink != ''">
          <el-input class="el-input" 
                    v-model="pageLink" 
                    id="gtLongUrl"   
                    :value="pageLink" 
                    :disabled="true"></el-input>
          <el-button type="primary" data-clipboard-target="#gtLongUrl" aria-label="复制成功！" @click="copy(0)" id="gtLongUrlCopy" 
          >复制</el-button>
        </el-form-item>
        <!-- <el-form-item label="短信链接:" v-if="copeData.shortUrl != ''">
          <el-input class="el-input" 
                    v-model="copeData.shortUrl" 
                    id="gtShortUrl" 
                    :value="copeData.shortUrl" 
                    :disabled="true"></el-input>
          <el-button type="primary" data-clipboard-target="#gtShortUrl" aria-label="复制成功！" @click="copy(1)" id="gtShortUrlCopy" >复制</el-button>
        </el-form-item> -->
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  // 加载复制js
  import Lib from 'assets/js/Lib';
  export default {
    data(){
      return {
        copyUrlVisible: false,
        // copeData:{//请求返回内容
        //   erweima:'',
        //   longUrl:'正在生成链接...',//页面链接
        //   shortUrl:'正在生成链接...',//短信链接
        //   downUrl: ''
        // },
        erweima:'',//二维码
        title:'',//标题
        //urlLink:'',//请求接口--链接
        //urlData:'',//请求参数
        pageLink:'',//页面链接
        shortUrl:'正在生成链接...',
      }
    },
    methods:{
      down(){
        let _this = this;
        window.location.href = DFshop.activeAPI.mallDownQr_get+"?url="+this.pageLink;
      },
      /*
       * 复制链接
       * */
      copy(type){
        var self = this;
        if(type === 0){
          var clipboard = new Lib.Clipboard("#gtLongUrlCopy");
          clipboard.on('success', function(e) {
            self.$message({
              message: e.trigger.getAttribute('aria-label'),
              type: 'success'
            });
            clipboard.destroy();
          });

        }else if(type === 1){
          var clipboard = new Lib.Clipboard("#gtShortUrlCopy");
          clipboard.on('success', function(e) {
            self.$message({
              message: e.trigger.getAttribute('aria-label'),
              type: 'success'
            });
            clipboard.destroy();
          });
        }
      },
      showDialog: function (msg) {
        let vm = this;
        vm.title = msg.title || '' ;
        vm.pageLink = msg.pageLink|| '';
        vm.imgUrl = msg.imgUrl || ''
        //vm.urlData = .urlData || '';
        //vm.urlLink = msg.urlLink || '';
        vm.copyUrlVisible = true;
        if(msg.imgUrl != ''){
          vm.erweima = msg.imgUrl;
        }else{
          vm.erweima = msg.urlQR+"?url="+msg.pageLink;//生成二维码链接
        }
        //vm.linkAjax(msg.urlLink,msg.urlData);
      },
      /**
       * 链接请求
       * @param url  //请求接口
       * @param data  //请求参数
       *
      linkAjax(url,data){
        let _this = this;
          Lib.M.ajax({
          'url': url,
          'data':{
            pageId: data 
          },
          'success':function (data){
              _this.copeData.longUrl= data.data.storeLink;
              _this.copeData.shortUrl= data.data.smsLink;
              _this.copeData.erweima = _this.urlQR+"?url="+data.data.storeLink;
          }
        });
      },*/
    }
  }
</script>

<style  type="text/css" scoped>
.el-dialog--cope-link{
  width: 640px;
}
.el-dialog--cope-link .el-input {
  width: 320px;
  float: left;
  margin-right: 20px;
}
.el-dialog--cope-link .erwema,
.el-dialog--cope-link .erwema-no {
  width: 160px;
  height: 160px;
  margin-right: 20px;
  float: left;
}
.el-dialog--cope-link .erwema-no {
    line-height: 160px;
    text-align: center;
    border: 1px solid #c0c0c0;
}
.el-dialog--cope-link .down{
  margin-top: 124px;
}
</style>
