<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogQR"
    size="small">
    <div class="dialog-main">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="shop-textr">店铺二维码：</div>
        </el-col>
        <el-col :span="18">
          <div class="dialog-img">
            <div class="dialog-QRcode">
              <img :src="dialogSrc"/>
            </div>
            <el-button type="primary">下载二维码</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="shop-textr" style="padding-top:10px">
            店铺链接：
          </div>
        </el-col>
        <el-col :span="18">
          <div class="dialog-list">
            <div class="dialog-input">
              <el-input v-model="dialogLink" :disabled="true"></el-input>
            </div>
            <el-button 
                type="primary"
                @click="copyLink">
                复制
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
import Lib from 'assets/js/Lib';
// import Clipboard from 'assets/js/clipboard.min.js';
export default {
    data: function () {
      return {
        dialogQR: false,
        dialogTitle:'店铺链接',//弹窗标题
        dialogLink: 'http://192.168.2.66:8800/views/shop/index.html#/',//文本内容
        dialogSrc:'../assets/img/test/qr.jpg',
        dialog: 'tiny',
      }
    },
    methods: {
      //确定
      dialogConfirm: function () {
        console.log(this.$root);
        this.dialogWarn = false;
        if(this.callback !== undefined &&　this.callback　!== ''){
          return this.callback.btnOne && !this.callback.btnOne();
        }
      },
      //复制链接
      copyLink(){
        var link = this.dialogLink;
        
      },
      open2() {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      },
      open4() {
        this.$message.error('复制失败，请手动复制');
      },
      showDialog: function (msg) {
        let vm = this;
        vm.dialogIcon = msg.dialogIcon || vm.dialogIcon ;
        vm.dialogTitle = msg.dialogTitle || '';
        vm.dialogMsg = msg.dialogMsg || '';
        vm.callback = msg.callback;
        vm.dialogQR = true;

        let width = document.body.clientWidth;
        if(width <= 1500) vm.dialog = 'small';
        
      }
    }
  }
/**
* let msg ={
    'countDown' : false,//开启成功倒计时
    'passhref' :'',//倒计时完后跳转地址
*   'dialogIcon':'el-icon-warning',//图标  空值--默认为黄色惊叹号
    'dialogTitle':'',//文本标题
    'dialogMsg': '',//文本内容
    'callback': {
        'btnOne': function(){
            确定后回调方法
        }
    }
  }
  _this.$root.$refs.dialog.showDialog(msg);//调用方法
**/   
</script>
<style lang="less" scoped>
.dialog-main{
    width: 100%;
    padding: 30px 38px;
    &>div{
        margin-bottom: 30px;
    }
    .dialog-img{
        .dialog-QRcode{
            width: 155px;
            height: 155px;
            display: inline-block;
            margin-right: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        button{
            vertical-align: bottom;
        }
    }
    .dialog-input{
        width: 70%;
        display: inline-block;
        margin-right: 20px; 
    }
    .dialog-txt{
        margin-left: 10px;
        vertical-align: top;
        display: inline-block;
        width: 80%;
        text-align: justify;
        
    }
}
</style>


