<template>
  <div class="setup-wrapper">
   <el-form ref="form" :model="form" label-width="175px">
      <el-form-item label="商品评价 :">
       <el-radio-group v-model="form.a">
          <el-radio label="1">开启评价</el-radio>
          <el-radio label="2">关闭评价</el-radio>
          <el-radio label="3">关闭评价及买家评价</el-radio>
        </el-radio-group>
        <p class="p-warn" v-if=" form.a == 1">开启评价：粉丝可在商品详情页面看到其他买家的评价。</p>
        <p class="p-warn" v-else-if="form.a == 2">关闭评价：仅在商品详情页关闭显示全部评价内容，但买家依旧可以评价。</p>
        <p class="p-warn" v-else-if="form.a == 3">关闭评价及买家评价：关闭显示商品详情页全部评价内容以及关闭买家评价按钮。</p>
      </el-form-item>
      <el-form-item label="待付款订单取消时间设置 :">
        拍下未付款订单 
        <el-input v-model="form.b" style="width:80px;"></el-input>
        分钟内未付款，自动取消订单
      </el-form-item>
      <el-form-item label="货到付款 :">
         <el-radio-group v-model="form.c">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
         <p class="p-warn">
            启用后买家可选择货到付款下单，您需安排快递配送并告知快递员收款。</br>
            注意：本功能不参与配送服务，需您与快递公司协议完成配送和货款结算。 同时，由于业务特殊性，请勿使用价格虚高商品。
        </p>
      </el-form-item>
      <el-form-item label="找人代付 :">
        <el-radio-group v-model="form.d">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
        <p class="p-warn">
          启用代付功能后，买家下单后，可将订单分享给小伙伴（微信群、微信好友），请他帮忙付款。
        </p>
      </el-form-item>
      <el-form-item label="消息短信提醒粉丝 :">
         <el-radio-group v-model="form.e">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付成功提醒内容 :" v-if="form.e == 1">
        <el-input type="textarea" v-model="form.desc" style="width:418px" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商品预售 :">
        <el-radio-group v-model="form.g">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="预定送礼 :" v-if="form.g == 1">
        <el-radio-group v-model="form.h">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品批发 :">
        <el-radio-group v-model="form.i">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="审核批发 :" v-if="form.i == 1">
      <el-radio-group v-model="form.j">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="超级营销员 :">
        <el-radio-group v-model="form.k">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="超级营销员审核 :"  v-if="form.k == 1">
        <el-radio-group v-model="form.l">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接收申请审核手机 :"  v-if="form.l == 1">
        <el-input v-model="form.m" style="width:180px;"></el-input>
        <p class="p-warn">
          该手机号码用于接收申请成为超级销售员的信息，请填写正确号码。
        </p>
      </el-form-item>
      <el-form-item label="编辑手机端底部菜单 :">
        <el-radio-group v-model="form.n">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
        <p class="p-warn">
          店铺的各个页面可以通过导航串联起来。设置的导航，方便买家在栏目间快速切换，引导买家前往。
        </p>
      </el-form-item>
      <el-form-item label="店铺导航 :"  v-if="form.n == 1">
        <el-checkbox-group v-model="form.o">
          <el-checkbox label="1">首页</el-checkbox>
          <el-checkbox label="2">分类</el-checkbox>
          <el-checkbox label="3">购物车</el-checkbox>
          <el-checkbox label="4">我的</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          a: '',
          b: '',
          c: '',
          d: '',
          e:'',
          f:'',
          g:'',
          h:'',
          i:'',
          j:'',
          k:'',
          l:'',
          m:'',
          n:'',
          o:[]
        }
      }
    },
    mounted(){
      
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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