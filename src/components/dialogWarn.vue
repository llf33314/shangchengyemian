<template>
<!-- 使用方法
* let msg ={
    //不写为默认值
    dialogType: 'warn',//warn--提示(默认)，success--成功倒计时；
    dialogLink:'',//success -- 跳转地址 默认空
    dialogTitle:'我是消息标题？',//文本标题
    dialogMsg: '我是消息内容？',//warn-文本内容 success-返回页面名称
    callback: {
        btnOne: ''//确定按钮事件
    },
    time: 3,//秒数（默认3）
  }
  _this.$root.$refs.dialog.showDialog(msg);//调用方法
-->
<el-dialog
    title="提示"
    :visible.sync="dialogWarn"
    :size="dialog"
    :before-close="handleClose">
    <div class="dialog-list " style="height: 180px">
        <span class="dialog-title">
            <i class="el-icon-circle-check"
                v-if="dialogType == 'success'"></i>
            <i class="el-icon-warning"
                v-else></i>
        </span>
        <div class="dialog-text">
            <p v-text="dialogTitle"></p>
            <span v-if="dialogType == 'success'" v-text="time+' 秒后返回“'+dialogMsg+'”'"></span>
            <span v-text="dialogMsg"
                    v-else> </span>
        </div>
    </div>
    <div class="dialog-list shop-textr">
        <el-button type="primary" v-if="dialogType == 'success'">继续新建</el-button>
        <el-button type="primary" @click="dialogConfirm" v-else>确定</el-button>
        <el-button @click="handleClose()">取消</el-button>
    </div>
</el-dialog> 
</template>
<script>
import Lib from 'assets/js/Lib';
export default {
    data: function () {
      return {
        dialogWarn: false,
        close: false,
        dialogType: 'warn',//warn--提示(默认)，success--成功倒计时；
        dialogLink:'',//success -- 跳转地址
        dialogTitle:'我是消息标题？',//文本标题
        dialogMsg: '我是消息内容？',//warn-文本内容 success-返回页面名称
        callback: {
          btnOne: ''//确定按钮事件
        },
        time: '',//秒数（默认3）
        dialog: 'tiny',
      }
    },
    methods: {
        //确定
        dialogConfirm() {
            this.dialogWarn = false;
            if(this.callback !== undefined &&　this.callback　!== ''){
                return this.callback.btnOne && !this.callback.btnOne();
            }
        },
        /**
        * 成功倒计时
        * 
        */
        countDown(){
            let _this = this;
            let initialTime = _this.time;
            let timer = initialTime;
            let interval = setInterval(()=>{
                _this.time = timer--;
                if(timer < 0 ){
                    clearInterval(interval);
                    _this.dialogWarn = false;
                    if(!_this.close){
                        window.location.href = window.location.origin+window.location.pathname + '#' + _this.dialogLink;
                    }
                    setTimeout(()=>{
                        _this.time = initialTime;
                    },1000);
                     
                }
            },1000);
               
        },
        showDialog(msg) {
            let vm = this;
            vm.dialogType = msg.dialogType || '' ;
            vm.dialogLink = msg.dialogLink || '';
            vm.dialogTitle = msg.dialogTitle || '';
            vm.dialogMsg = msg.dialogMsg || '';
            vm.time = msg.time || 3,
            vm.callback = msg.callback;
            vm.dialogWarn = true;
            vm.close = false;
            let width = document.body.clientWidth;
            if(width <= 1500) vm.dialog = 'small';
            if(msg.dialogType == 'success'){
                 this.countDown();
            }
        },
        handleClose(){
            this.close = true ;
            this.dialogWarn = false;
        }
    },
    mounted () {
    }
  }  
</script>

<style lang="less" scoped>
@import '../assets/css/base.less';
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


