<template>
  <div class="setup-wrapper">
   <el-form ref="form" :model="form" :rules="rules" label-width="175px" v-if="form!=''">
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
      <!-- <el-form-item label="评价审核 :" v-if="form.set.isComment ==1">
        <el-radio-group v-model="form.set.isCommentCheck" >
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="评价送礼 :" v-if="form.set.isComment ==1">
        <el-radio-group v-model="form.set.isCommentGive" >
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
        <div style="border: 1px solid #e1e1e1; padding: 20px; width: 38%;" v-if="form.set.isCommentGive == 1">
          <table border="0" cellspacing="0" cellpadding="0" width="100%" class="give_tab">
            <tbody>
              <tr v-for="(row , index) in giveList" :key="index">
                  <td class="text-overflow">
                        <el-checkbox v-model="row.isEnable"></el-checkbox>
                        <span v-if="row.giveStatus ==1">好评</span>
                        <span v-else-if="row.giveStatus ==-1">差评</span>
                        <span v-else-if="row.giveStatus ==0">中评</span>
                  </td>
                  <td style="text-align: left;">
                    送 <el-select v-model="row.giveType" placeholder="请选择" style="width:160px;">
                            <el-option label="积分" :value="1"></el-option>
                            <el-option label="粉币" :value="2"></el-option>
                    </el-select>
                    <el-input v-model.number="row.num" placeholder="请输入数量" style="width:160px;"></el-input> 个
                  </td>
              </tr>
            </tbody>
          </table>
           <el-button type="primary" @click="onSaveGive" style="margin-top:10px;">保存</el-button>
        </div>
      </el-form-item>
      <el-form-item label="待付款订单取消时间设置 :" prop="orderCancel">
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
      <el-form-item label="支付成功提醒内容 :" prop="paySuccessText" v-if="form.set.isSmsMember == 1">
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
      <el-form-item label="接收申请审核手机 :" prop="checkSellerPhone"  v-if="form.set.isCheckSeller == 1 && form.set.isSeller == 1">
         <el-select v-model="areacode" placeholder="国家区号"  style="width:110px;">
            <el-option  v-for="item in areaPhones" :key="item.areacode" :label="item.country+'+'+item.areacode" :value="item.areacode"></el-option>
          </el-select>
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
      <el-form-item label="店铺导航 :" prop="foorerObj" v-if="form.set.isFooter == 1">
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
      var formOrderCancel = (rule, value, callback) => {
        if (this.form.set.orderCancel  == '' ||this.form.set.orderCancel  == undefined) {
          return callback(new Error('请输入取消时间设置'));
        } else if(this.form.set.orderCancel <30){
           return callback(new Error('自动取消订单时间最少30分钟'));
        }else{
          callback();
        }
      };
      var formPaySuccessText = (rule, value, callback) => {
        if (value  == '' || value  == undefined) {
          return callback(new Error('支付成功提醒内容不能为空'));
        } else if(value.length>70){
           return callback(new Error('支付成功提醒内容不能超过70字'));
        }else{
          callback();
        }
      };
      var formCheckSellerPhone = (rule, value, callback) => {
        if (this.form.set.checkSellerPhone  == "" ||this.form.set.checkSellerPhone  == undefined) {
          return callback(new Error('接收申请审核手机不能为空'));
        } else if(!Lib.M.validPhone(this.form.set.checkSellerPhone)){
           return callback(new Error('审核手机格式不正确'));
        }else{
          callback();
        }
      };
      return {
        giveList:[{"giveType":1,"giveStatus":"1","num":0,"isEnable":true},
                {"giveType":1,"giveStatus":"0","num":0,"isEnable":true},
                {"giveType":1,"giveStatus":"-1","num":0,"isEnable":true}
        ],
        form:{
          foorerObj:{},
          set:{
            isComment:1,
            isDeliveryPay:1,
            isTakeTheir:1,
            isDaifu:1,
            isCommentCheck:0,
            isCommentGive:0,
            isMessage:0,
            isPresale:1,
            isPresaleGive:1,
            messageJson:'',
            isSmsMember:1,
            smsMessage:'',
            isPf:1,
            isPfCheck:1,
            isSeller:1,
            isCheckSeller:1,
            footerJson:'',
            orderCancel:30,
            busMessageJson:'',
            isFooter:1,
            checkSellerPhone:''
          }
        } ,
        rules:{
           orderCancel:[
              { validator: formOrderCancel, trigger: 'blur,change'},
            ],
            paySuccessText: [
               { validator: formPaySuccessText, trigger: 'blur,change'}
            ],
            checkSellerPhone: [
              { validator: formCheckSellerPhone, trigger: 'blur,change'},
            ],
        },
        areaPhones:[],
        areacode:'86',
      }
    },
    mounted(){
      this.mallPaySetPaySetInfo();
      this.mallCommentGiveInfo();
      this.areaPhoneList();
    },
    methods: {
      //评论送礼验证
      validateData() {
        let _this = this;
        let isValidate = true;
        if(_this.form.set.isComment == 1 && _this.form.set.isCommentGive == 1){
          for (let i = 0; i < _this.giveList.length; i++) {
            let obj = _this.giveList[i];
  
            if (obj.isEnable) {
              let reg = /^[1-9]\d{0,5}$/;
              let status="";
              if(obj.giveStatus ==-1){
                status="差评"
              }else if(obj.giveStatus ==0){
                status="中评"
              }else if(obj.giveStatus ==1){
                status="好评"
              }
              if(obj.num =="" ||obj.num ==0){
                this.$message({
                  showClose: true,
                  message: status+"的数量须大于0",
                  type: "error"
                });
                isValidate=false;
                break;
              } else if (!reg.test(obj.num)) {
                this.$message({
                  showClose: true,
                  message: status+"的数量有误(最长6位)",
                  type: "error"
                });
                isValidate=false;
                break;
              }
            }
          }
        }
        return isValidate;
      },
      //保存送礼判断
      onSaveGive(){
        let _this = this;
        let giveData=_this.validateData();
        if(giveData){
          _this.saveGive(1);
        }
      },
       //保存评论送礼
      saveGive(type){
        let _this = this;
        let _giveList = [];
        for (var k = 0; k < _this.giveList.length; k++) {
          let obj = _this.giveList[k];
          let arr = {
            id: obj.id || null,
            giveType: obj.giveType,
            giveStatus: obj.giveStatus,
            num: obj.num,
            isEnable: Number(obj.isEnable)
          };
          _giveList.push(arr);
        }
        let give = {};
        give.giveList=JSON.stringify(_giveList);
        _this.ajaxSave({
          'url': DFshop.activeAPI.mallCommentSaveGive_post,
          'data':give,
          'success':function (data){
            if(type==1){
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
            }
            _this.mallCommentGiveInfo();
          }
        });
          
      },
      onSubmit() {//保存设置
        let _this = this;
        let giveData=_this.validateData();
        
        this.$refs['form'].validate((valid) => {
          if (valid&&giveData) {
            let f = this.$refs.form.model.foorerObj;
            let paramsForm = this.$refs.form.model.set;
            let smsMsg = {};
            smsMsg[1] = this.$refs.form.model.paySuccessText;
            let param =JSON.parse(JSON.stringify(paramsForm));
            if(param.isSeller ==1 && param.isCheckSeller ==1){
              param.checkSellerPhone=this.areacode+","+paramsForm.checkSellerPhone;
            }
            let footerMenu = {};
            footerMenu.home = Number(f.home)||0;
            footerMenu.group = Number(f.group)||0;
            footerMenu.cart = Number(f.cart)||0;
            footerMenu.my = Number(f.my)||0;
            param.footerJson = JSON.stringify(footerMenu);
            param.smsMessage = JSON.stringify(smsMsg);
            param.messageJson = paramsForm.messageJson;
            param.pfRemark = paramsForm.pfRemark;
            param.pfApplyRemark = paramsForm.pfApplyRemark;
            param.busMessageJson = paramsForm.busMessageJson;
             if(_this.form.set.isComment == 1 && _this.form.set.isCommentGive == 1){
              _this.saveGive(2);
             }

             //防止多次点击重复提交数据
            if(!Lib.C.ajax_manage) return false;
            Lib.C.ajax_manage = false;
            // console.log(param,"3232423");
            // return false;
            _this.ajaxSave({
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
          }
        });
      },
      mallPaySetPaySetInfo(){//获取设置信息
        let _this = this;
        // _this.form = '';
        _this.ajaxRequest({
          'url': DFshop.activeAPI.mallPaySetPaySetInfo_post,
          'success':function (data){
            if(data.data.set != null){
              _this.form = data.data;
              if(_this.form.set.checkSellerPhone!=null){
                let phone=_this.form.set.checkSellerPhone.split(",");
                if(phone.length>1){
                  _this.form.set.checkSellerPhone=phone[1];
                  _this.areacode=phone[0];
                } 
              }
            }
 
            if(data.data.foorerObj !=null){
              _this.form.foorerObj.home = !!data.data.foorerObj.home;
              _this.form.foorerObj.group = !!data.data.foorerObj.group;
              _this.form.foorerObj.cart = !!data.data.foorerObj.cart;
              _this.form.foorerObj.my = !!data.data.foorerObj.my;
            }
            // console.log(_this.form);
          }
        });
      },
      mallCommentGiveInfo(){//获取设置信息
        let _this = this;
        _this.ajaxRequest({
          'url': DFshop.activeAPI.mallCommentGiveInfo_post,
          'success':function (data){
            if(data.data!=null &&data.data.length>0){
              _this.giveList=data.data;
              _this.giveList.forEach((e,i)=>{
                e.isEnable=!!e.isEnable;
              })
              
            }
           
          }
        });
      },
      areaPhoneList(){//获取国家区号列表
        let _this = this;
        _this.ajaxRequest({
          'url': DFshop.activeAPI.areaPhoneList_post,
          'success':function (data){
            if(data.data!=null){
              _this.areaPhones=data.data;
            }
           
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
.give_tab{
  tr{
    height: 50px;;
  }
}

</style>