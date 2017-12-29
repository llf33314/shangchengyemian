<template>
  <div class="addbanner-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
               <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/applet' }">小程序图片设置</el-breadcrumb-item>
              <el-breadcrumb-item v-if="ruleForm.id == ''">新建小程序图片</el-breadcrumb-item>
              <el-breadcrumb-item v-else>修改小程序图片</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="common-main">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="图片链接跳转 :" prop="type">
                  <el-radio-group v-model="ruleForm.type">
                      <el-radio :label="1">商品详情</el-radio>
                      <el-radio :label="0">不跳转</el-radio>
                  </el-radio-group>
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
              </el-form-item>
              <el-form-item label="活动商品 :" prop="name" v-if="ruleForm.type ==1">
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                  <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                  <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
          </el-form>
          <el-dialog v-model="materialLargeSrcVisible" size="small">
            <img width="100%" :src="largeSrc" alt="" class="img">
          </el-dialog>
          <goods-dialog ref="goodsDialog" @dialogData="selectDialogData"></goods-dialog>
      </div>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload';
import goodsBox from '../../components/goodsBox';
import goodsDialog from '../../components/goodsDialog';
export default {
  components:{
    imgUpload,goodsDialog,goodsBox
  },
  data() {
    var formName = (rule, value, callback) => {
      if (this.boxData.id === undefined || this.boxData.id === '') {
        return callback(new Error('请选择活动商品'));
      } else{
        callback();
      }
    };
    return {
      ruleForm: {
        id:'',
        proId:'',
        imageUrl: '',
        type: 1,
      },
      rules: {
        imageUrl: [
          { required: true, message: '图片不能为空', trigger: 'blur' }
        ],
         name: [
          { validator: formName, trigger: 'blur' },
        ],
      },
      imgUrl:'',
      materialLargeSrcVisible: false,//查看大图弹出框
      largeSrc: '',//查看大图 图片地址
      boxData : [],  //选中的商品信息
      isChoicePro : '',  //显示选择商品true 
      isReplacePro : '', //显示替换商品true
    };
  },
  methods: {
    /**打开商品选择窗口 */
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.proId;
    },
    /**活动商品列表弹出框 */
    selectDialogData(data){
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.proId = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      //重新验证表单
      this.$refs.ruleForm.validate(valid => {});
    },
    /**保存 */
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          var img = _this.ruleForm.imageUrl.split("/upload/")[1];
          if(_this.ruleForm.type  == 0){
            _this.ruleForm.proId ='';
          }
          let applet = {
            imageUrl: img, //店铺id
            proId: _this.ruleForm.proId, //商品id
            type: _this.ruleForm.type //跳转类型 
          };
          if (_this.ruleForm.id != null || _this.ruleForm.id != "") {
            applet.id = _this.ruleForm.id || null;
          }

          _this.ajaxRequest({
            url: DFshop.activeAPI.mallAppletSave_post,
            data: applet,
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/applet");
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
    /**获取小程序图片信息 */
    mallAppletInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.mallAppletInfo_post,
        'data':{ id : id},
        'success':function (data){
            if(data.code == 0){
              _this.ruleForm = data.data;
              _this.ruleForm.imageUrl=data.imgUrl+_this.ruleForm.imageUrl;
 
              _this.boxData = {
                id: data.data.proId,  
                pro_price: data.data.proPrice,
                pro_name: data.data.proName,
                image_url: data.imgUrl + data.data.proUrl,
                stockTotal: data.data.proStockTotal
              };
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
      _this.$material({
        imageboxUrl: DFshop.activeAPI.materialUrl,   //地址
        modal: true,       //遮罩
        selecType: true,   //是否多选
        width: 820, //宽度
        height: 500, //高度
        lockScroll: false, //弹出框后是否锁定滚动轴
        closeOnClickModal: false, //点击遮罩是否关闭
        closeOnPressEscape: false
      }).then(function (val) {
        _this.ruleForm.imageUrl =val[0].url;
        _this.$refs['ruleForm'].validate()
      }).catch(function (error) {
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
    // console.log(_this.$route.params.id );
    if(_this.$route.params.id != undefined){
      _this.mallAppletInfo(_this.$route.params.id);
      _this.isReplacePro = true;
    }else{
       _this.isChoicePro = true;
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


