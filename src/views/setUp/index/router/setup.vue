<template>
  <div class="setup-wrapper">
   <el-form ref="form" :model="form" label-width="175px" v-if="form!=''">
      <el-form-item label="商品评价 :">
       <el-radio-group v-model="form.set.isComment">
          <el-radio :label="1">开启评价</el-radio>
          <el-radio :label="0">关闭评价</el-radio>
          <el-radio :label="2">关闭评价及买家评价</el-radio>
        </el-radio-group>
        <p class="p-warn" v-if="form.set.isComment == 1">开启评价：粉丝可在商品详情页面看到其他买家的评价。</p>
        <p class="p-warn" v-else-if="form.set.isComment == 0">关闭评价：仅在商品详情页关闭显示全部评价内容，但买家依旧可以评价。</p>
        <p class="p-warn" v-else-if="form.set.isComment == 2">关闭评价及买家评价：关闭显示商品详情页全部评价内容以及关闭买家评价按钮。</p>
      </el-form-item>
      <el-form-item label="待付款订单取消时间设置 :">
        拍下未付款订单 
        <el-input v-model.number="form.set.orderCancel" style="width:80px;"></el-input>
        分钟内未付款，自动取消订单
      </el-form-item>
      <el-form-item label="货到付款 :">
         <el-radio-group v-model="form.set.isDeliveryPay">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
         <p class="p-warn">
            启用后买家可选择货到付款下单，您需安排快递配送并告知快递员收款。</br>
            注意：本功能不参与配送服务，需您与快递公司协议完成配送和货款结算。 同时，由于业务特殊性，请勿使用价格虚高商品。
        </p>
      </el-form-item>
      <el-form-item label="找人代付 :">
        <el-radio-group v-model="form.set.isDaifu">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <p class="p-warn">
          启用代付功能后，买家下单后，可将订单分享给小伙伴（微信群、微信好友），请他帮忙付款。
        </p>
      </el-form-item>
      <el-form-item label="消息短信提醒粉丝 :">
         <el-radio-group v-model="form.set.isSmsMember">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付成功提醒内容 :" v-if="form.set.isSmsMember == 1">
        <el-input type="textarea" v-model.trim="form.paySuccessText" style="width:418px" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品预售 :">
        <el-radio-group v-model="form.set.isPresale">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预定送礼 :" v-if="form.set.isPresale == 1">
        <el-radio-group v-model="form.set.isPresaleGive">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品批发 :">
        <el-radio-group v-model="form.set.isPf">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="审核批发 :" v-if="form.set.isPf == 1">
      <el-radio-group v-model="form.set.isPfCheck">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="超级营销员 :">
        <el-radio-group v-model="form.set.isSeller">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="超级营销员审核 :"  v-if="form.set.isSeller == 1">
        <el-radio-group v-model="form.set.isCheckSeller">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接收申请审核手机 :"  v-if="form.set.isCheckSeller == 1 && form.set.isSeller == 1">
        <el-input v-model.number="form.set.checkSellerPhone" style="width:180px;"></el-input>
        <p class="p-warn">
          该手机号码用于接收申请成为超级销售员的信息，请填写正确号码。
        </p>
      </el-form-item>
      <el-form-item label="编辑手机端底部菜单 :">
        <el-radio-group v-model="form.set.isFooter">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <p class="p-warn">
          店铺的各个页面可以通过导航串联起来。设置的导航，方便买家在栏目间快速切换，引导买家前往。
        </p>
      </el-form-item>
      <el-form-item label="店铺导航 :"  v-if="form.set.isFooter == 1">
        <!-- <el-checkbox-group v-model="form.foorerObj"> -->
        <el-checkbox v-model="form.foorerObj.home">首页</el-checkbox>
        <el-checkbox v-model="form.foorerObj.group">分类</el-checkbox>
        <el-checkbox v-model="form.foorerObj.cart">购物车</el-checkbox>
        <el-checkbox v-model="form.foorerObj.my">我的</el-checkbox>
        <!-- </el-checkbox-group> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Lib from 'assets/js/Lib';
  export default {
    data() {
      return {
        form: ''
      }
    },
    mounted(){
      this.mallPaySetPaySetInfo();
    },
    methods: {
      onSubmit() {//保存设置
        let _this = this;
        let f = this.$refs.form.model.foorerObj;
        let paramsForm = this.$refs.form.model.set;
        let smsMsg = {};
        smsMsg[1] = this.$refs.form.model.paySuccessText;
        let param = paramsForm;
        let footerMenu = {};
        footerMenu.home = Number(f.home);
        footerMenu.group = Number(f.group);
        footerMenu.cart = Number(f.cart);
        footerMenu.my = Number(f.my);
        param.footerJson = footerMenu;
        param.smsMessage = JSON.stringify(smsMsg);
        param.messageJson = paramsForm.messageJson;
        param.pfRemark = paramsForm.pfRemark;
        param.pfApplyRemark = paramsForm.pfApplyRemark;
        param.busMessageJson = paramsForm.busMessageJson;
        _this.ajaxRequest({
              'url': DFshop.activeAPI.mallPaySetSave_post,
              'data':param,
              'success':function (data){
                _this.$message({
                  message: '设置成功',
                  type: 'success'
                });
                _this.mallPaySetPaySetInfo();
              }
            });
      },
      mallPaySetPaySetInfo(){//获取设置信息
        let _this = this;
        _this.form = '';
        _this.ajaxRequest({
          'url': DFshop.activeAPI.mallPaySetPaySetInfo_post,
          'success':function (data){
            _this.form = data.data;
            _this.form.foorerObj.home = !!data.data.foorerObj.home;
            _this.form.foorerObj.group = !!data.data.foorerObj.group;
            _this.form.foorerObj.cart = !!data.data.foorerObj.cart;
            _this.form.foorerObj.my = !!data.data.foorerObj.my;
            console.log(_this.form);
          }
        });
      }
    }
  }
</script>

<style lang="less">
.setup-wrapper{
  width: 100%;
  padding: 40px 30px;
}

</style>