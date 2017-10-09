<template>
  <div class="message-wrapper"> 
    <div class="message-no" v-if="isShow">
       <div class="message-header">
          <i class="el-icon-warning"></i> 
        亲，您还没有认证服务号哦~ 
      </div>
      <div class="message-warn">
        消息推送功能可以让您通过微信公众号，接收交易和物流相关的提醒消息，包括订单付款成功通知、<br/>确认收货通知、维权等，以提升商家的开店体验，获得更高的订单转化率和复购率。
      </div>
      <p class="fs14">您可以关注多粉微信公众号，收到相关推送，请扫一扫下方二维码关注多粉微信公众号吧~</p>
      <div class="message-QRcode">
        <img src="../../img/QRcode.jpg"/>
        <p class="fs12">关注多粉微信公众号，开启消息模板 </p>
      </div>
      <div class="fs14">您也可以： <el-button type="primary">去注册认证服务号</el-button></div>
    </div>
    <div class="message-main" v-if="!isShow">
      <div class="message-text">
        <p class="message-title">商家消息模板<p>
          <p class="p-warn">
            商家消息推送功能可以让您通过短信和已有的公众号，接收交易和物流相关的提醒消息，包括订单付款成功通知、确认收货通知、维权等，以提升商家的开店体验，更有效地管理交易和订单。短信计费：0.08元/条起，<a>点击详情</a>查看。
          </p>
          <el-button class="buttonBlue" size="small">获取关注链接</el-button>
      </div>
      <div class="message-item-box">
        <div class="message-item">
          <div class="message-switch message-title">
            <p>商家消息模板</p>
            <el-switch
            v-model="value"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
          <p class="p-warn">
            开启后，买家付款成功通过多粉公众号推送给商家。
          </p>
        </div>
      </div>
      <div class="message-text">
        <p class="message-title">商家消息模板<p>
          <p class="p-warn">
            粉丝消息推送功能可以让您通过短信和已有的公众号，给买家推送交易和物流相关的提醒消息，
            包括积分、购物、充值、奖品等，以提升买家的购物体验，获得更高的订单转化率和复购率。短信计费：0.08元/条起，<a>点击详情</a>查看。
            <br/>注意：粉丝首先必须关注您的公众号，否则不能收到相关推送。
          </p> 
          <el-button class="buttonBlue" size="small">获取关注链接</el-button>
      </div>
      <div class="message-item-box">
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">积分变动提醒</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">会员升级通知</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">积分变动提醒</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">会员升级通知</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">积分变动提醒</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">会员升级通知</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">积分变动提醒</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
        <div class="message-item">
          <div class="message-switch ">
            <p class="fs14">会员升级通知</p>
            <el-switch
            v-model="value1"
            on-text="开启"
            off-text="关闭">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';

export default {
  components: {
    
  },
  data () {
    return {
      value: true,
      value1: true,
      isShow: false,
    }
  },
  methods: {


  }
}
</script>

<style lang="less" scoped>
@import '../../less/message.less';
</style>
