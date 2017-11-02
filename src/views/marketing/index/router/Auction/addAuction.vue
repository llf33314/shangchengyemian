<template>
<div class="auction-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/auction' }">拍卖管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建拍卖活动</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="auction-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop">
                <el-select v-model="ruleForm.shop" placeholder="请选择活动区域" v-bind:disabled="disabledShop" class="auction-input">
                    <el-option  :label="option.sto_name"  :value="option.id"
                      :key="option.id" v-for="option in shopList">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="name">
                <el-button type="primary" @click="showDialog" v-if="isChoicePro">选择商品</el-button>
                <goods-box :boxdata="boxData" v-if="isReplacePro"></goods-box>
                <el-button type="primary" @click="showDialog" v-if="isReplacePro">替换商品</el-button>
                <p class="p-warn" v-if="isReplacePro">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="拍卖类型 :" prop="auctiontype">
                <el-radio-group v-model="ruleForm.auctiontype">
                    <el-radio label="3">降价拍</el-radio>
                    <el-radio label="6">升价拍</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要交纳保证金 :" >
                <el-checkbox v-model="ruleForm.checked">拍卖前需要交纳保证金</el-checkbox>
            </el-form-item>
            <el-form-item label="交纳保证金 :" prop="money">
                <el-input  v-model="ruleForm.money" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="起拍价格 :" prop="desc">
                <el-input  v-model="ruleForm.desc" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="开始时间 :" prop="date">
                 <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最低价格 :" prop="floorMoney">
                <el-input  v-model="ruleForm.floorMoney" class="auction-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
             <el-form-item label="降价幅度 :" prop="range">
                每 <el-input  v-model="ruleForm.time" class="mix-input"></el-input>
                分钟下降 <el-input  v-model="ruleForm.range" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="持续时间 :" >
                50分钟 <el-button type="primary">计算持续时间</el-button>
                <p class="p-warn">下降到结束价格后还会持续一个时间周期</p>
            </el-form-item>
             <el-form-item label="商品限购 :">
                开始限购 <el-input  v-model="ruleForm.man" class="max-input"></el-input> 件/人
                <p class="p-warn">不填写则代表该拍卖商品不限购</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <goods-dialog ref="goodsDialog"></goods-dialog>
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
    return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      ruleForm: {
        shop:'',
        name: '',
        money:'',
        date:'',
        auctiontype: '',
        desc: '',
        date:'',
        floorMoney:'',
        range:'',
        time:'',
        man:'',
        checked:false
      },
      rules: {
        // shop:[
        //   { required: true, message: '所属店铺不能为空', trigger: 'change' },
        // ],
        // name: [
        //   { required: true, message: '活动商品不能为空', trigger: 'blur' },
        // ],
        // auctiontype: [
        //   { required: true, message: '拍卖类型不能为空', trigger: 'change' }
        // ],
        // date: [
        //   { type: 'date', required: true, message: '开始时间不能为空', trigger: 'change' }
        // ],
        // money: [
        //   { required: true, message: '交纳保证金不能为空', trigger: 'blur' }
        // ],
        // desc: [
        //   { required: true, message: '起拍价不能为空', trigger: 'blur' }
        // ],
        // floorMoney: [
        //   { required: true, message: '最低价格不能为空', trigger: 'blur' }
        // ],
        // range: [
        //   { required: true, message: '降价不能为空', trigger: 'blur' }
        // ]
      },
      shopList:[],

      isChoicePro : '',
      isReplacePro : '',
      boxData : [],
      disabledShop : '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDialog(){
      this.$refs.goodsDialog.isShow=true;
    },
    mallAuctionAuctionInfo(id){//获取拍卖信息
      let _this = this;
          Lib.M.ajax({
            'url': DFshop.activeAPI.mallAuctionAuctionInfo_post,
            'data':{
                id : id
            },
            'success':function (data){
                _this.baozhengjinData = data.data;
                $.each(_this.baozhengjinData.page.subList,function(i){
                    let oldTime = this.payTime;
                    this.payTime = Lib.M.format(oldTime);
                });
                console.log(_this.baozhengjinData,'_this.baozhengjinData ');
            }
          });
    }
  },
  mounted(){
    let _this = this;
    DFshop.method.storeList({
      'success'(data){
        _this.shopList = data.data;
      }
    });
    if(_this.$route.params.id != 0){
      _this.mallAuctionAuctionInfo(_this.$route.params.id);
      _this.disabledShop = true;
       _this.isReplacePro = true;
    }else{
      _this.disabledShop = false;
      _this.isChoicePro = true;
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
.auction-main{
    padding:40px 4%;
    .auction-input{
        width: 220px
    }
}
</style>


