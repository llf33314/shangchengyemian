<template>
<div class="addbanner-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mallIntegral/2' }">积分商品</el-breadcrumb-item>
            <el-breadcrumb-item v-if="ruleForm.id == ''">新建横幅图</el-breadcrumb-item>
             <el-breadcrumb-item v-else>修改横幅图</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId">
                <el-select v-model="ruleForm.shopId" placeholder="请选择活动区域" class="addGruop-input" v-bind:disabled="disabledShop" >
                    <el-option class="max-input" v-for="item in shopList"
                        :key="item.id" :label="item.sto_name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片链接跳转 :" prop="type">
                <el-radio-group v-model="ruleForm.type">
                    <el-radio :label="1">跳转</el-radio>
                    <el-radio :label="0">不跳转</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="链接地址 :" prop="returnUrl" v-if="ruleForm.type == 1">
                <el-input v-model.trim="ruleForm.returnUrl" style="width:300px;">
                     <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="上传图片 :" prop="imageUrl">
              <div class="addBanner-img" :class="ruleForm.imageUrl == '' ? 'border':''">
                  <div class="material-square" @click="materiallayer()" >
                      <i class="el-icon-plus"></i>
                      <img class="img"  v-if="ruleForm.imageUrl!= ''" :src="ruleForm.imageUrl" />
                      <div class="delete" v-if="ruleForm.imageUrl != '' " @click.stop="deleteImg">
                          <i class="el-icon-view" @click.stop="showBigImg(ruleForm.imageUrl)"></i>
                          <i class="el-icon-delete2" @click.stop="deleteImg"></i>
                      </div>  
                  </div>
              </div>
              <span class="p-warn">建设图片尺寸：375*82px</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-model="materialLargeSrcVisible" size="small">
          <img width="100%" :src="largeSrc" alt="" class="img">
        </el-dialog>
    </div>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload';
export default {
  components:{
    imgUpload
  },
  data() {
    var formShopId = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择店铺'));
      }else {
          callback();
      }
    };
    var formReturnUrl = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('跳转链接不能为空'));
      }else if (value != "" && !Lib.M.validURL(value)) {
         return callback(new Error('跳转链接格式有误'));
      }else{
          callback();
      }
    };

     
    return {
      ruleForm: {
        id:'',
        shopId:'',
        imageUrl: '',
        type: 1,
        returnUrl: '' 
      },
      rules: {
        shopId:[
          { validator: formShopId, trigger: 'change' }
        ],
        returnUrl: [
         { validator: formReturnUrl, trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '图片链接未选择', trigger: 'blur' }
        ],
      },
      shopList:[],
      imgUrl:'',
      materialLargeSrcVisible: false,//查看大图弹出框
      largeSrc: '',//查看大图 图片地址
      disabledShop : '',//编辑时,店铺不可改
    };
  },
  watch:{
    'materialLargeSrcVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let param =JSON.parse(JSON.stringify(_this.ruleForm));
          // alert('submit!');
          if(param.type == 0){
            param.returnUrl='';
          }
          var img = param.imageUrl.split("/upload/")[1];
          param.imageUrl=img;
          
          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;

          _this.ajaxSave({
            url: DFshop.activeAPI.mallIntegralImageSave_post,
            data: param,
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/mallIntegral/2");
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      //取消按钮（返回上一页）
      window.history.go(-1);
    },
    /**获取积分商城图片信息 */
    mallIntegralImageInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralImageInfo_post,
        'data':{ id : id},
        'success':function (data){
            if(data.code == 0){
              _this.ruleForm = data.data;
              _this.ruleForm.imageUrl=data.imgUrl+_this.ruleForm.imageUrl;
              // console.log(data.data);
            }
        }
        });
    },
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
    },
     /**调用素材库 */
    materiallayer(){
      let _this = this;
      parent.window.postMessage("openMask()", "*");
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: true,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: true, //点击遮罩是否关闭
        closeOnPressEscape: false
      }).then(function (val) {
        _this.ruleForm.imageUrl =val[0].url;
        _this.$refs['ruleForm'].validate();
        parent.window.postMessage("closeMask()", "*");
      }).catch(function (error) {
        parent.window.postMessage("closeMask()", "*");
          //取消
      })
    },
    /*
    * 删除图片
    * */
    deleteImg() {
      let  _this = this;
      _this.ruleForm.imageUrl='';
      _this.$refs['ruleForm'].validate();
    },
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },
  },
   mounted(){
    let _this = this;
    this.storeList({
      'success'(data){
        _this.shopList = data.data;
        _this.imgUrl=data.imgUrl;
        let shopId = _this.ruleForm.shopId; //没有默认选择的店铺
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shopId = _this.shopList[0].id;
 
        }
      }
    });
    if(_this.$route.params.id != 0){
      _this.mallIntegralImageInfo(_this.$route.params.id);
      _this.disabledShop = true;
    }else{
      _this.disabledShop = false;
    } 
    
  }
}
</script>
<style lang="less" scoped>
@import '../../../less/style.less';
.addbanner-wrapper{
    width: 100%;
    .addBanner-img{
        width: 72px;
        height: 72px;
        display: inline-block;
    }
}
 
section{
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
  }
  .material {
    width: 100%;
    height: 450px;
    border: 0;
  }
  .border{
    .border-radius(3px);
    border: 2px dashed #c0ccda;
    
  }
  .material-square {
    .ik-box;
    .ik-box-pack(center);
    .ik-box-align(center);
    background-color: #fbfdff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    .el-icon-plus {
      color: #c0ccda;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover .delete {
      .ik-box;
      .ik-box-pack(center);
      .ik-box-align(center);
    }
    .delete {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      border: 2px solid rgba(0, 0, 0, 0);
      left: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 1;
      color: #fff;
      font-size: 18px;
      line-height: 77px;
      display: none;
    }
  }

  .rectangle {
    width: 220px;
    border-radius: 3px;
  }

  .material-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;
    text-align: center;
    .content {
      background-color: #fff;
      padding: 0 10px 10px;
      overflow: hidden;
      border-radius: 5px;
      min-width: 700px;
      max-width:1000px;
      display: inline-block;
      margin-top:10%;
      .title {
        line-height: 50px;
        height: 50px;
        font-weight: 700;
        text-align: left;
      }
    }
  }

</style>


