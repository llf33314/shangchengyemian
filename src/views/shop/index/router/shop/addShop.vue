<template>
<div class="shop-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/shop' }">店铺概况</el-breadcrumb-item>
      <el-breadcrumb-item>新增店铺</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="shop-addshop-main">
    <div class="shop-steps">
      <el-steps :active="active" center  >
      <el-step title="选择门店">
      </el-step>
      <el-step title="编辑店铺信息"></el-step>
      <el-step title="成功"></el-step>
    </el-steps>
    </div>
    <div class="shop-addshop-content">
      <div class="shop-addshop-one" v-if="isOnePage">
        <!--selected-->
        <div class="shop-addshop-item clearfix" v-for="(item,index) in  data.data" 
              :class="{'selected': index === selected}"
              @click="selectedItem(index,item)">
          <div class="shop-addshop-img" >
             <defaultImg :background="data.imgUrl+item.imageUrl"></defaultImg>
          </div>
          <div class="shop-addshop-text">
              <p v-text="item.businessName"></p>
              <p v-text="'联系电话：'+item.telephone"></p>
              <p v-text="'地址：'+item.address"></p>
          </div>
          <i class="iconfont icon-selected"></i>
        </div>
      </div>

      <div class="shop-addshop-tow" v-if="isTowPage">
        <el-form ref="form" :model="form" label-width="80px">
           <el-form-item label="店铺头像 :">
            <div class="addshop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <div class="addshop-img" @click="bigImg(data.imgUrl+form.stoHeadImg)" v-if="form.stoHeadImg !==''">
                <small-img :img="data.imgUrl+form.stoHeadImg"></small-img>
              </div>
              <span class="p-warn">图片比例：1:1(必填)</span>
            </div>
          </el-form-item>
          <el-form-item label="联系人 :">
            <el-input v-model="form.stoLinkman" ></el-input>
            <span class="p-warn">(必填)</span>
          </el-form-item>
          <el-form-item label="联系电话 :">
            <el-input v-model="form.telephone"  :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="是否推送 :">
              <el-checkbox v-model="stoIsSms">接收短信推送商城订单信息</el-checkbox>
          </el-form-item>
          <el-form-item label="推送手机 :"  v-if="stoIsSms">
             <el-input v-model="form.stoSmsTelephone" placeholder="请输入推送手机" @blur="phone"></el-input>
             <div class="shop-prompt">请填写正确的手机号码，此手机号码接收商城订单信息的推送；必须勾选是否推送，方可有效</div>
        </el-form-item>
          <el-form-item label="客服QQ :">
              <el-input v-model="form.stoQqCustomer" placeholder="请输入客服QQ" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="shop-addshop-Three" v-if="isThreePage">
        <div class="shop-addSuccess">
          <i class="el-icon-circle-check"></i>
          <p>新增店铺成功</p>
        </div>
      </div>
    </div>
    <el-button style="margin-top: 12px;" @click="next" v-if="isOnePage">下一步</el-button>
    <el-button type="primary" v-if="isTowPage" @click="Submit()">保存</el-button>
    <el-button style="margin-top: 12px;"v-if="!isThreePage">返回</el-button>
    <div class="shop-textc" v-if="isThreePage" >
      <el-button type="primary"@click="next">继续添加</el-button>
      <el-button style="margin-top: 12px;" @click="jumpRouter('/shop')">返回</el-button>
    </div>
     <el-dialog v-model="dialogimg" size="small">
        <img width="100%" :src="dialogImageUrl" alt="" class="img">
    </el-dialog>
  </div>
</div>
</template>

<script>

import Lib from 'assets/js/Lib';
import defaultImg from 'components/defaultImg';
import imgUpload from 'components/imgUpload';
import smallImg from 'components/smallImg';
export default {
  components: {
    defaultImg,imgUpload,smallImg
  },
  data () {
    return {
       active: 1,
       isOnePage:true,
       isTowPage:false,
       isThreePage:false,
       data:{},
       selected: false,
       contentNo:'shop',
       dialogimg:false,
       dialogImageUrl:'',
       form:{},
       stoIsSms: false
    }
  },
  methods: {
    aaa(){
      console.log(this.form.stoIsSms);
    },
    /**
      下一页跳转
     */
    next(){
      if(this.active == 1){
        console.log(this.active)
        if(this.form.id){
          this.isOnePage = false;
          this.isTowPage = true;
          return this.active ++;
        }else{
          this.active = 1;
          this.$message({
              message: '请选择门店',
              type: 'warning'
          });
        }
      };
      if(this.active == 2){
        this.isTowPage=false;
        this.isPassPage =false;
        this.isThreePage=true;
        return this.active ++;
      }
      if(this.active ++> 2) {
        this.isOnePage=true;
        this.isTowPage=false;
        this.isThreePage=false;
        this.selected =false;
        return this.active = 1;
      };
    },
    selectedItem(index,data){
      index === this.selected?this.selected = false:this.selected = index;
      this.form = data;
      this.form.stoIsSms = false;
      this.form.stoHeadImg = data.imageUrl;
    },
    /**
     * 可新增店铺门店请求
     */
    shopAjax(){
      let _this = this;
      Lib.M.ajax({
        'url': DFshop.activeAPI.mallStorGgetShopList_post,
        'success':function (data){
          console.log(data);
          _this.data = data;
        }
      });
    },
    /**
     * @param img 图片路径
     */
    bigImg(img){
        this.dialogImageUrl = img;
        this.dialogimg = true;
    },
    /**
     * 推广手机验证
     */
    phone(){
      console.log(this.form.stoSmsTelephone);
        if(this.stoIsSms == 1 && !this.form.stoSmsTelephone){
          console.log(1);
            this.$message({
                message: '请输入推送手机号码',
                type: 'warning'
            });
            return false;
        }
          return true;
    },
    Submit(){
      let _this = this;
      if(!_this.phone()) return ;
      if(!_this.form.stoHeadImg){
         this.$message({
              message: '请上传店铺头像',
              type: 'warning'
        });
        return
      }
      if(!_this.form.stoLinkman){
         this.$message({
              message: '联系人不能为空',
              type: 'warning'
        });
        return
      }
      let sto = {
          id: '',
          stoName:_this.form.businessName,
          wxShopId: _this.form.id,
          stoHeadImg: _this.form.stoHeadImg,
          stoLinkman: _this.form.stoLinkman,  
          stoPhone: _this.form.telephone, 
          stoPicture: _this.form.imageUrl,
          stoAddress: _this.form.address,
          stoIsSms: Number(_this.stoIsSms),  
          stoSmsTelephone: _this.form.stoSmsTelephone||'', 
          stoQqCustomer: _this.form.stoQqCustomer||''
      }
      console.log(sto);
      Lib.M.ajax({
          'url': DFshop.activeAPI.mallStoreSave_post,
          'data': {
              obj: JSON.stringify(sto)
          },
          'success':function (data){
              console.log('success');
             _this.next()
          }
      });
    },
  },
  mounted() {
    this.shopAjax();
  },
}
</script>

<style lang="less">

</style>
