<template>
  <div class="danbao-wrapper">
    <div class="danbao-header">
      <p :style="{color:isColor}">
        <i class="el-icon-circle-check"></i>
        <span v-if="isColor == '#cacaca'">待加入</span>
        <span v-else>已加入</span>
      </p>
      担保交易
    </div>
    <div class="danbao-main">
      <div class="danbao-item">
        <p class="danbao-title">什么是担保交易</p>
        <div class="danbao-content">
          <p>多粉担保交易，是一项提供给买卖双方消费保障的服务，享受全方面的交易保障；</p>
          <p>加入担保交易后，每条订单均进入担保周期，售后时间完毕后，系统自动结算到商家可结算余额账户中。 </p>
        </div>
      </div>
      <div class="danbao-item">
        <p class="danbao-title">参加担保的好处 :</p>
        <div class="danbao-content shop-box">
          <el-row :gutter="20">
            <el-col :span="7">
              <div class="danbao-txt">
              1. 买卖双方资金得到多粉的权威保障
              </div>
            </el-col>
             <el-col :span="7">
              <div class="danbao-txt">
              2. “担保交易”安全标识，买家购物更加放心
              </div>
            </el-col>
             <el-col :span="7">
              <div class="danbao-txt">
              3.交易周期内，多粉提供方位售后支持
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="danbao-item danbao-warn">
         <el-row :gutter="20">
            商家通过参加担保交易，多粉实现全方位监督和保障，资金按周期结 <br/>
            要求没有自有微信支付平台账户的商家必须参加担保交易，否则多粉平台不予提供支持
         </el-row>
      </div>
      <el-button type="primary" v-if="isColor == '#cacaca'" @click="mallSecuritytradeAdd()">立即加入担保交易</el-button>
      <el-button @click="exitGuarantee()"  v-else>退出担保交易</el-button>
    </div>

    <el-dialog title="退出担保交易" :visible.sync="dialogFormVisible">
      <div class="index-shopInfo" style="padding: 10px 20px;margin-bottom:20px;">
        <p>申请退出多粉微商城担保交易</p>
        <p>为改进并提升我们的服务，请告知您的退出理由</p>
      </div>
      <el-form >
        <el-form-item label="退出理由 :" :label-width="formLabelWidth">
          <el-select v-model="itemKey" placeholder="请选择活动区域">
            <el-option :label="op.item_value" :value="op.item_key" v-for="(op,index) in form" :key="op.item_key"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="补充意见 :" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="生效时间 :" :label-width="formLabelWidth" class="fontRed">
          审核成功后，新增订单将不再享受多粉任何交易保护
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitExit()">确 定</el-button>
        <el-button  @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
export default {
  components: {
  },
  data () {
    return {
        isColor:'',//待加入状态--颜色
        dialogFormVisible:false,
        form: {},
        itemKey:'',
        textarea:'',
        formLabelWidth: '120px'
    }
  },
  methods: {
    mallSecuritytradeAdd(){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallSecuritytradeAdd_post,
        'success':function (data){
          console.log(data);
          _this.$message({
            message: '加入成功',
            type: 'success'
          });
          _this.mallIsSecuritytrade();
        }
      });
    },
    mallIsSecuritytrade(){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIsSecuritytrade_post,
        'success':function (data){
          console.log(data);
          if(data.data.isSecuritytrade){
            _this.isColor = '#34d063';//已加入状态--颜色
          }else{
            _this.isColor = '#cacaca';//待加入状态--颜色
          }
        }
      });
    },
    mallQuitDanbaoReasonList(){
      let _this= this;
      _this.form = '';
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallQuitDanbaoReasonList_post,
        'success':function (data){
          console.log(data.data);
          _this.form = data.data;
        }
      });
    },
    exitGuarantee(){
      this.dialogFormVisible = true;
      this.mallQuitDanbaoReasonList();
    },
    mallSecuritytradeSave(){
      let _this= this;
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallSecuritytradeSave_post,
        'data':{
          quitReasonId:_this.itemKey,
          remark:_this.textarea
        },
        'success':function (data){
          console.log(data);
          _this.$message({
            message: '退出成功',
            type: 'success'
          });
          _this.dialogFormVisible = false;
          _this.mallIsSecuritytrade();
        }
      });
    },
    submitExit(){
      this.mallSecuritytradeSave();
    }
  },
  mounted(){
     this.mallIsSecuritytrade();
     //this.isColor = '#34d063';
  }
}
</script>

<style lang="less" scoped>
@import '../../less/danbao.less';
</style>
