<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/presale' }">预售管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建预售</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop">
                <el-select v-model="ruleForm.region" placeholder="请选择店铺" class="addBond-input">
                    <el-option 
                      :label="option.lable" 
                      :value="option.value"
                      :key="option.key"
                      v-for="option in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品 :" prop="region">
                <el-button type="primary" @click="showDialog">选择商品</el-button>
                <goods-box></goods-box>
                <el-button type="primary" @click="showDialog">替换商品</el-button>
                <p class="p-warn">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="商品价格 :">
               ¥320.00
            </el-form-item>
            <el-form-item label="交纳定金 :" prop="name">
                 <el-input  v-model="ruleForm.name" class="max-input">
                    <template slot="prepend">¥</template>
                </el-input>
            </el-form-item>
            <el-form-item label="预售时间 :" prop="date">
                <el-date-picker
                    v-model="ruleForm.date"
                    type="daterange"
                    placeholder="选择日期范围">
                </el-date-picker>
                 <p class="p-warn">在预售开始时间前，为交纳定金的时间，在活动开始之后为支付尾款时间</p>
            </el-form-item>
            <el-form-item label="价格调整 :" >
                <el-date-picker
                    v-model="ruleForm.date"
                    type="daterange"
                    placeholder="选择日期范围">
                </el-date-picker>
                <el-radio-group v-model="ruleForm.desc">
                    <el-radio :label="3">上涨</el-radio>
                    <el-radio :label="6">下调</el-radio>
                </el-radio-group>
                <el-select v-model="ruleForm.region" placeholder="选择调整方式" style="width: 130px; margin-left: 15px;">
                    <el-option 
                      :label="option.lable" 
                      :value="option.value"
                      :key="option.key"
                      v-for="option in options">
                    </el-option>
                </el-select>
                <el-input  v-model="ruleForm.name" style="width: 130px; margin-left:  15px">
                </el-input> %
                <a class="fontBlue" style="margin-left: 30px">新增</a>
                <a class="fontBlue"  style="margin-left: 20px">清空</a>
                 <p class="p-warn">商品价格从¥300.00上涨到0.00</p>
            </el-form-item>
            <el-form-item label="订货数量 :" >
                <el-input  v-model="ruleForm.name" placeholder="请输入订货数量" class="max-input"></el-input>
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
      ruleForm: {
        shop:'',
        name: '',
        region: '',
        date:'',
        delivery: '',
        type: [],
        resource: '',
        desc: '',
        off:false
      },
      rules: {
        shop:[
          { required: true, message: '所属店铺不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '佣金类型不能为空', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '活动商品不能为空', trigger: 'change' }
        ],
        date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      options:[{
        lable:'广东谷通科技1',
        value:'1'
      },
      {
        lable:'广东谷通科技2',
        value:'2'
      },
      {
        lable:'广东谷通科技3',
        value:'3'
      }],
      gridData: [{
        date: '2016-05-02',
        name: '苹果 iPhone 7 国行全网通4G手机',
        img:'',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '苹果 iPhone 7 国行全网通4G手机',
        img:'',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        img:'',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        img:'',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
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
    }
  },
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
.addBond-main{
    padding:40px 4%;
    .addBond-input{
        width: 220px
    }
}
</style>


