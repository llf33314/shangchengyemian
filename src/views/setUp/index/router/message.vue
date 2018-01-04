<template>
  <div class="message-wrapper"> 
    <div class="message-no" v-if="isShow == -1">
       <div class="message-header">
          <i class="el-icon-warning"></i> 
        亲，您还没有认证服务号哦~ 
      </div>
      <div class="message-warn">
        消息推送功能可以让您通过微信公众号，接收交易和物流相关的提醒消息，包括订单付款成功通知、
        <br/>确认收货通知、维权等，以提升商家的开店体验，获得更高的订单转化率和复购率。
      </div>
      <p class="fs14">您可以关注多粉微信公众号，收到相关推送，请扫一扫下方二维码关注多粉微信公众号吧~</p>
      <div class="message-QRcode">
        <img :src="duofenTwoCodeUrl" v-if="duofenTwoCodeUrl !=''"/>
        <img style="margin-left:20px;"  :src="busMessageUrl" v-if="busMessageUrl !=''" />
        <p>
          <span class="fs12">关注多粉微信公众号，开启消息模板 </span>
          <span class="fs12" style="margin-left:25px;">扫描二维码，获得商家模板提醒 </span>
        </p>
      </div>
      <!-- <div class="fs14">您也可以： <el-button type="primary">去注册认证服务号</el-button></div> -->
    </div>
    <div class="message-main" v-if=" isShow != -1">
      <div class="message-text">
        <p class="message-title">商家消息模板<p>
          <div v-if="isShow == 1">
            <p class="p-warn">
              商家消息推送功能可以让您通过短信和已有的公众号，接收交易和物流相关的提醒消息，包括订单付款成功通知、确认收货通知、维权等，以提升商家的开店体验，
              更有效地管理交易和订单。短信计费：0.08元/条起，<a target="_blank" :href="domain+'trading/smsRecharge.do?setType=trading'">点击详情</a>查看。
            </p>
          </div>
          <div v-if="isShow == 0">
            <p class="p-warn">
              商家消息推送功能可以让您通过短信和多粉微信公众号，接收交易和物流相关的提醒消息，包括订单付款成功通知、确认收货通知、维权等，以提升商家的开店体验，
              更有效地管理交易和订单。短信计费：0.08元/条起，<a target="_blank" :href="domain+'trading/smsRecharge.do?setType=trading'">点击详情</a>查看。
            </p>
            <el-button @click="dialogVisible = true"  class="buttonBlue" size="small">获取多粉链接</el-button>
          </div>
      </div>
      <div class="message-item-box" >
        <!-- v-for="msg in template.busMsgArr" :key="msg.id" -->
        <!-- <div class="message-item">
          <div class="message-switch message-title">
            <p>买家付款成功通知</p>
            <el-switch 
            v-model="selected1" 
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(1,'买家付款成功通知',selected1,0)">
            </el-switch>
          </div>
          <p class="p-warn">
            开启后，买家付款成功通过多粉公众号推送给商家。
          </p>
        </div>
        <div class="message-item">
          <div class="message-switch message-title">
            <p>买家确认收货通知</p>
            <el-switch
            v-model="selected2"
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(2,'买家确认收货通知',selected2,0)">
            </el-switch>
          </div>
          <p class="p-warn">
            开启后，买家确认收货通过多粉公众号推送给商家。
          </p>
        </div>
        <div class="message-item">
          <div class="message-switch message-title">
            <p>买家发起维权通知</p>
            <el-switch
            v-model="selected3"
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(3,'买家发起维权通知',selected3,0)">
            </el-switch>
          </div>
          <p class="p-warn">
            开启后，买家发起维权通过多粉公众号推送给商家。
          </p>
        </div> -->
        <div class="message-item" v-for="temp in template.busMessages" :key="temp.id">
          <div class="message-switch message-title">
            <p>{{temp.title}}</p>
            <el-switch
            v-model="temp.selected"
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(temp.id,temp.title,temp.selected,0)">
            </el-switch>
          </div>
          <p class="p-warn" v-if="temp.title =='付款成功通知'">
            开启后，买家付款成功通过多粉公众号推送给商家。
          </p>
          <p class="p-warn" v-if="temp.title =='确认收货提醒'">
            开启后，买家确认收货通过多粉公众号推送给商家。
          </p>
          <p class="p-warn" v-if="temp.title =='申请维权通知'">
            开启后，买家发起维权通过多粉公众号推送给商家。
          </p>
        </div>

        <!-- <div class="message-item">
          <div class="message-switch message-title">
            <p>买家提现审核成功</p>
            <el-switch
            v-model="selected4"
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(4,'买家提现审核成功',selected4,0)">
            </el-switch>
          </div>
          <p class="p-warn">
            开启后，买家提现审核成功通过多粉公众号推送给商家。
          </p>
        </div> -->
      </div>
      <div class="message-text">
        <p class="message-title">粉丝消息模板<p>
          <div v-if="isShow == 1">
            <p class="p-warn">
              粉丝消息推送功能可以让您通过短信和已有的公众号，给买家推送交易和物流相关的提醒消息，
              包括积分、购物、充值、奖品等，以提升买家的购物体验，获得更高的订单转化率和复购率。短信计费：0.08元/条起，<a target="_blank" :href="domain+'trading/smsRecharge.do?setType=trading'">点击详情</a>查看。
              <br/>注意：粉丝首先必须关注您的公众号，否则不能收到相关推送。
            </p> 
            <el-button @click="dialogVisible = true"  class="buttonBlue" size="small">获取关注链接</el-button>
          </div>
          <div v-if="isShow == 0">
            <p class="p-warn">
              粉丝消息推送功能可以让您通过短信和多粉公众号，给买家推送交易和物流相关的提醒消息，
              包括积分、购物、充值、奖品等，以提升买家的购物体验，获得更高的订单转化率和复购率。短信计费：0.08元/条起，<a target="_blank" :href="domain+'trading/smsRecharge.do?setType=trading'">点击详情</a>查看。
            </p> 
            <el-button @click="dialogVisible = true"  class="buttonBlue" size="small">获取多粉链接</el-button>
          </div>
      </div>
      <div class="message-item-box">
        <div class="message-item" v-for="temp in template.messageList" :key="temp.id">
          <div class="message-switch ">
            <p class="fs14">{{temp.title}}</p>
            <el-switch
            v-model="temp.selected"
            on-text="开启" on-value="1"
            off-text="关闭" off-value="0" @change="mallPaySetSmsTemplate(temp.id,temp.title,temp.selected,1)">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
    <el-dialog  title="关注链接" :visible.sync="dialogVisible"  class="minDialog">
       <img style="width: 188px;height: 188px;"  :src="busMessageUrl" v-if="busMessageUrl !=''"  />
    </el-dialog>
  </div>
</template>

<script>
import Lib from 'assets/js/Lib';
export default {
  data () {
    return {
      selected:false,
      // selected1:'',
      // selected2:'',
      // selected3:'',
      // selected4:'',
      isShow:'', //-1无认证 0无服务号 1有服务号
      template:[],
      duofenTwoCodeUrl:'',
      busMessageUrl:'',
      dialogVisible:false,
      domain:'',
  
    }
  },
  methods: {
    link(url,params){
      // console.log(url);
        parent.window.postMessage("changeMenus('"+url+"','"+params+"')", "*");
    },
    /**判断有无认证服务号 */
    mallPaySetIsAuthService(){
      let _this = this;
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallPaySetIsAuthService_post,
        'success':function (data){
          _this.isShow = Number(data.data.flag);
          _this.domain=data.data.domain;
          _this.duofenTwoCodeUrl = data.data.duofenTwoCodeUrl;
          //商家消息提醒授权二维码生成
          let url="/grant/"+data.data.busId;
          _this.busMessageUrl = DFshop.activeAPI.mallStoreGenerateQRCode_get +"?url="+ url;//生成二维码链接

          _this.mallPaySetGetTemplate();
        }
      });
    },
    /**获取消息模板 */
    mallPaySetGetTemplate(){
      let _this = this;
      var selected = 'selected';
      _this.template = '';
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallPaySetGetTemplate_post,
        'success':function (data){
            _this.template = data.data;
            // $.each(_this.template.busMsgArr,function(i){
            //   var num = _this.template.busMsgArr[i].id;
            //   if(num == 1){
            //     _this.selected1 = '1';
            //   }else if(num == 2){
            //     _this.selected2 = '1';
            //   }else if(num == 3){
            //     _this.selected3 = '1';
            //   }else{
            //     _this.selected4 = '1';
            //   }
            // });
        }
      });
    },
    /**设置消息模板 */
    mallPaySetSmsTemplate(id,title,selected,type){
      let _this = this;
      let templateJson = {};
      templateJson.title = title;
      templateJson.id = id;
      console.log(templateJson);
      _this.ajaxRequest({
        'url':DFshop.activeAPI.mallPaySetSmsTemplate_post,
        'data':{
          template_json:JSON.stringify(templateJson),
          type : type,
          operation : Number(selected)
        },
        'success':function (data){
          _this.template = data.data;
          console.log(_this.template);
          _this.$message({
            message: '设置成功',
            type: 'success'
          });
          _this.mallPaySetGetTemplate();
        }
      });
    },
  },
  mounted(){
     let _this = this;
    this.mallPaySetIsAuthService();
  }
}
</script>

<style lang="less">
@import '../../less/message.less';
.minDialog{
 .el-dialog--small{
   width:16%;
 }
 .el-dialog__body{
   text-align: center;
 }
}
 
</style>
