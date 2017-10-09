<template>
<div class="addGruop-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/group' }">团购管理</el-breadcrumb-item>
            <el-breadcrumb-item >新建团购</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addGruop-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属店铺 :" prop="shop">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="addGruop-input">
                    <el-option 
                      :label="option.lable" 
                      :value="option.value"
                      :key="option.key"
                      v-for="option in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动商品 :" prop="region">
                <el-button type="primary" @click="showDialog">选择商品</el-button>
                <goods-box></goods-box>
                <el-button type="primary" @click="showDialog">替换商品</el-button>
                <p class="p-warn">如需修改商品信息，请在商品管理中更新</p>
            </el-form-item>
            <el-form-item label="活动名称 :" prop="name">
                <el-input v-model="ruleForm.name" class="addGruop-input"></el-input>
                <p class="p-warn">最多可输入50位汉字或100位字符</p>
            </el-form-item>
            <el-form-item label="团购价 :" prop="delivery">
                 <el-input v-model="ruleForm.delivery " class="addGruop-input">
                     <template slot="prepend">¥</template>
                 </el-input>
                 <p class="p-warn">0/8</p>
            </el-form-item>
            <el-form-item label="活动时间 :" prop="date">
                <el-date-picker
                    v-model="ruleForm.data"
                    type="daterange"
                    placeholder="选择日期范围">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="参团人数 :" prop="desc">
                <el-input  v-model="ruleForm.desc" class="addGruop-input"></el-input>
                <p class="p-warn">0/8</p>
            </el-form-item>
             <el-form-item label="商品限购 :" >
                <el-switch on-text="开启" off-text="关闭" v-model="ruleForm.off"></el-switch>
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
          { required: true, message: '所属店铺不能为空', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '活动商品不能为空', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '活动时间不能为空', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '活动名称不能为空', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '参团人数不能为空', trigger: 'blur' }
        ],
        delivery: [
          { required: true, message: '团购价不能为空', trigger: 'blur' }
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
@import '../../../../../assets/css/mixins.less';
.addGruop-main{
    padding:40px 4%;
    .addGruop-input{
        width: 220px
    }
}
</style>


