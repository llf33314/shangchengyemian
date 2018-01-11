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
      <div class="shop-addshop-one" v-if="active == 1">
        <!--selected-->
        <div class="shop-addshop-item clearfix" v-for="(item,index) in  data.data" 
              :class="{'selected': index === selected}"
              @click="selectedItem(index,item)"
              :key="index">
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

      <div class="shop-addshop-tow" v-if="active == 2">
        <el-form ref="form" :model="form" label-width="80px">
           <el-form-item label="店铺头像 :">
            <div class="addshop-IDImg">
              <div class="shop-IDUpload" >
               <gt-material @change="newImgData" 
                            :img="addshopImg">
              </gt-material>
              </div>
              <span class="p-warn">图片比例：1:1(必填)</span>
            </div>
          </el-form-item>
          <el-form-item label="联系人 :">
            <el-input v-model.trim="form.stoLinkman" ></el-input>
            <span class="p-warn">(必填)</span>
          </el-form-item>
          <el-form-item label="联系电话 :">
            <el-input v-model="form.telephone"  :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="是否推送 :">
              <el-checkbox v-model="stoIsSms">接收短信推送商城订单信息</el-checkbox>
          </el-form-item>
          <el-form-item label="推送手机 :"
                    v-if="stoIsSms==1">
            <div class="telephone-box">
                <div class="telephone-list" 
                        v-for="(Telephone,index) in Telephones"
                        :key="index">
                    <el-input   class="el-telephone"
                                v-model="Telephone.phone" 
                                placeholder="请输入推送手机">
                    </el-input>
                    <i class="el-i el-icon-circle-cross" v-show=" Telephones.length>1" @click="deleteTelephone(index,Telephones)"></i>
                    <a class="fontBlue" v-if="Telephones.length === index+1 &&Telephones.length < 5" @click="addTelephone(Telephone.phone)">新增</a>
                </div>
            </div>
            <div class="shop-prompt">请填写正确的手机号码，此手机号码接收商城订单信息的推送；必须勾选是否推送，方可有效</div>
          </el-form-item>
          <el-form-item label="客服QQ :">
              <el-input v-model="form.stoQqCustomer" placeholder="请输入客服QQ" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="shop-addshop-Three" v-if="active == 3">
        <div class="shop-addSuccess">
          <i class="el-icon-circle-check"></i>
          <p>新增店铺成功</p>
        </div>
      </div>
    </div>
    <el-button style="margin-top: 12px;" @click="next" v-if=" active == 1">下一步</el-button>
    <el-button type="primary" v-if="active == 2" @click="Submit()">保存</el-button>
    <el-button style="margin-top: 12px;" v-if="active !== 3" @click="Back">返回</el-button>
    <div class="shop-textc" v-if="active == 3" >
      <el-button type="primary" v-if="data.length >1"  @click="next">继续添加</el-button>
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
import gtMaterial from 'components/material/material'
export default {
  components: {
    defaultImg,gtMaterial
  },
  data () {
    return {
       active: 1,
       data:{},
       selected: false,
       contentNo:'shop',
       dialogimg:false,
       dialogImageUrl:'',
       form:{},
       stoIsSms: false,
       Telephones:[{
            phone:''
        }],
      addshopImg:''
    }
  },
  watch:{
    'dialogimg'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    /**
     * 上一页跳转
     */
    Back(){
      this.active == 2? this.active --:this.jumpRouter('/shop');
    },
    /**
      下一页跳转
     */
    next(){
      if(this.active == 1){
        if(this.form.id){
          return this.active ++;
        }else{
          this.$message({
              message: '请选择门店',
              type: 'warning'
          });
          this.active = 1;
          return
        }
      };
      if(this.active == 2){
        return this.active ++;
      }
      if(this.active ++> 2) {
         this.shopAjax();
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
      _this.ajaxRequest({
        'url': DFshop.activeAPI.mallStorGgetShopList_post,
        'success':function (data){
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
    Submit(){
      let _this = this;
      if(!_this.addshopImg){
         this.$message({
              message: '请上传店铺头像',
              type: 'warning'
        });
        return
      }

      let addshopImg = '/image/'+_this.addshopImg.split('/image/')[1];

      if(!_this.form.stoLinkman){
         this.$message({
              message: '联系人不能为空',
              type: 'warning'
        });
        return
      }
      let arr = [ ];
  　　for (let i in this.Telephones){
      　　var str = this.Telephones[i].phone
          if(_this.stoIsSms){
            if(!_this.phone(str)) return;
              _this.phone(str);
          }
      　　arr.push(str);
  　　}
      arr = arr.join(";")
      let sto = {
          id: '',
          stoName:_this.form.businessName,
          wxShopId: _this.form.id,
          stoHeadImg: addshopImg,
          stoLinkman: _this.form.stoLinkman,  
          stoPhone: _this.form.telephone, 
          stoPicture: _this.form.imageUrl,
          stoAddress: _this.form.address,
          stoIsSms: Number(_this.stoIsSms),  
          stoSmsTelephone: arr||'', 
          stoQqCustomer: _this.form.stoQqCustomer||''
      }

      //防止多次点击重复提交数据
      if(!Lib.C.ajax_manage) return false;
      Lib.C.ajax_manage = false;
      
      _this.ajaxRequest({
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
    /**
     * 推广手机验证
     */
    phone(phone){
      if(!phone){
          this.$message({
              message: '请输入推送手机号码',
              type: 'warning'
          });
          return false;
      }else if(!Lib.M.validPhone(phone)){
          this.$message({
              message: '请正确的手机号码',
              type: 'warning'
          });
          return false;
      }else{
        return true;
      }
    },
    /**
     * 增添推广人手机
     */
    addTelephone(tel){
        if(this.phone(tel)){
            let newA ={
                phone: ''
            }
            this.Telephones.push(newA);
        }
    },
    /**
     * 删除手机
     */
    deleteTelephone(index,data){
        data.splice(index, 1);
    },
    /** 
     * 素材库图片
    */
    newImgData(value){
      this.addshopImg = value;
    }
  },
  mounted() {
    this.isMaterialUrl();
    this.shopAjax();
  },
}
</script>

<style lang="less">
@import '../../../less/shop.less';
.el-telephone{
    margin-bottom:5px;
    width: 220px;
}
.el-i{
    color: #bbb;
}
</style>
