<template>
<div class="addGruop-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mallIntegral/1' }">积分商品</el-breadcrumb-item>
            <el-breadcrumb-item v-if="ruleForm.id ==''">新建积分商品</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改积分商品</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addGruop-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shopId">
                <el-select v-model="ruleForm.shopId" placeholder="请选择店铺" v-bind:disabled="disabledShop" class="addGruop-input" @change="changeShop">
                    <el-option class="max-input" v-for="item in shopList"
                        :key="item.id" :label="item.sto_name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="name">
               <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
            </el-form-item>
            <el-form-item label="积分 :" prop="money">
                <el-input v-model="ruleForm.money" class="addGruop-input"></el-input>
                <!-- <p class="p-warn">0/8</p> -->
            </el-form-item>
            <el-form-item label="活动时间 :" prop="startTime" required>
                 <el-date-picker v-model="ruleForm.startTime" type="datetimerange" :picker-options="pickerOptions" align="right" :editable="false"
                  placeholder="请选择活动时间"  >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <goods-dialog ref="goodsDialog" @dialogData="selectDialogData"></goods-dialog>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import goodsBox from '../../components/goodsBox';
import goodsDialog from '../../components/goodsDialog';
export default {
  components:{
    goodsBox,goodsDialog
  },
  data() {
    var formShopId = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择店铺'));
      }else {
          callback();
      }
    };
    var formName = (rule, value, callback) => {
      if (this.boxData.id === undefined || this.boxData.id === '') {
        return callback(new Error('请选择活动商品'));
      } else{
        callback();
      }
    };
    var formStartTime = (rule, value, callback) => {
      if (value =="") {
        return callback(new Error('请选择时间'));
      }else {
          callback();
      }
    };
    var formMoney = (rule, value, callback) => {
      let reg = /^[0-9]{1,6}(\.\d{1,2})?$/;
      if (value === "") {
        return callback(new Error("积分不能为空"));
      } else if (!reg.test(value) || value <= 0) {
        return callback(new Error("积分最多只能是大于0的6位小数"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      ruleForm: {
        id:'',
        productId: '',
        money: '',
        startTime:"",
        endTime: "",
        shopId: '',
        name:''
      },
      rules: {
        shopId:[
          { validator: formShopId, trigger: 'change' }
        ],
        name: [
          { validator: formName, trigger: 'blur' },
        ],
        productId: [
          { required: true, message: '商品不能为空', trigger: 'blur' },
        ],
        money: [
          { validator: formMoney, trigger: "blur" }  
        ],
        startTime: [
           { validator: formStartTime, trigger: 'change,blur', message: "请选择活动时间", }
        ]
      },
      boxData : [],  //选中的商品信息
      isChoicePro : '',  //显示选择商品true 
      isReplacePro : '', //显示替换商品true
      disabledShop : '',//编辑时,店铺不可改
      shopList:[],//店铺列表
      selectShopId: 0 //选中的店铺,用于改变店铺时进行判断
    };
  },
  methods: {
     //改变店铺，清空选择的商品
    changeShop(val) {
      //重新选择店铺清空选择的商品和规格
      if (this.selectShopId > 0 && this.ruleForm.productId > 0) {
          this.selectShopId = this.ruleForm.shopId;
          this.isChoicePro = true;
          this.isReplacePro = false;
          this.boxData = [];
          this.ruleForm.choicePro = null;
          this.ruleForm.productId = null;
          this.$refs.ruleForm.validate(valid => {});
      }
    },
    /**活动商品列表弹出框 */
     selectDialogData(data){
      this.isChoicePro = data.isChoicePro;
      this.isReplacePro = data.isReplacePro;
      this.ruleForm.productId = data.id;
      this.boxData = data;
      this.boxData.image_url = data.imgPath + data.image_url;
      this.selectShopId=this.ruleForm.shopId;
      //重新验证表单
      this.$refs.ruleForm.validate(valid => {});
     
    },
    /**保存 */
    submitForm(formName) {
       let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let time = _this.ruleForm.startTime;
          let integral = {
            shopId: _this.ruleForm.shopId, //店铺id
            productId: _this.ruleForm.productId, //商品id
            startTime: Lib.M.format(new Date(time[0])), //开始时间
            endTime: Lib.M.format(new Date(time[1])), //结束时间
            money: _this.ruleForm.money //积分
          };

          if (_this.ruleForm.id != null || _this.ruleForm.id != "") {
            integral.id = _this.ruleForm.id || null;
          }
 
          let param = {};
          param["integral"] = integral;

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
          _this.ajaxSave({
            url: DFshop.activeAPI.mallIntegralSave_post,
            data: param,
            success: function(data) {
              _this.$message({
                message: "保存成功",
                type: "success"
              });
              _this.jumpRouter("/mallIntegral/1");
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      //取消按钮（返回上一页）
      window.history.go(-1);
    },
    /**打开商品选择窗口 */
    showDialog(){
      let shopId = this.ruleForm.shopId;
      if (shopId == null || shopId == "" || shopId == 0) {
        this.$message({
          message: "请选择所属店铺",
          type: "warning"
        });
        return;
      }
      this.$refs.goodsDialog.isShow=true;
      this.$refs.goodsDialog.shopId = this.ruleForm.shopId;
      this.$refs.goodsDialog.defaultProId = this.ruleForm.productId;
      this.$refs.goodsDialog.isIntegral = true;
    },
    /**获取积分商品信息 */
    mallIntegralInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.mallIntegralInfo_post,
        'data':{ id : id},
        'success':function (data){
            if(data.code == 0){
              _this.ruleForm = data.data; 
              _this.ruleForm.startTime = [data.data.startTime, data.data.endTime];
              _this.boxData = {
                id: data.data.productId,  
                pro_price: data.data.proPrice,
                pro_name: data.data.proName,
                image_url: data.imgUrl + data.data.imageUrl,
                stockTotal: data.data.proStockTotal
              };
            }
        }
        });
    },
  },
  mounted(){
    let _this = this;
    if(_this.$route.params.id != 0){
      _this.mallIntegralInfo(_this.$route.params.id);
      _this.disabledShop = true;
      _this.isReplacePro = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
 
    this.storeList({
      'success'(data){
        _this.shopList = data.data;

        let shopId = _this.ruleForm.shopId; //没有默认选择的店铺
        console.log(shopId);
        if (shopId == null || shopId == "" || shopId == 0) {
          //默认选中第一个店铺
          _this.ruleForm.shopId = _this.shopList[0].id;
 
        }
      }
    });
    
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/css/mixins.less';
.addGruop-main{
    padding:40px 4%;
    .addGruop-input{
        width: 220px
    }
}
</style>


