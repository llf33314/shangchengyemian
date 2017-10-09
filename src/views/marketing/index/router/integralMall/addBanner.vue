<template>
<div class="addbanner-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/IntegralMall' }">积分商品</el-breadcrumb-item>
            <el-breadcrumb-item >新建横幅图</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="common-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
            <el-form-item label="图片链接跳转 :" prop="desc">
                <el-radio-group v-model="ruleForm.desc">
                    <el-radio :label="1">跳转</el-radio>
                    <el-radio :label="2">不跳转</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="链接地址 :" prop="name" v-if="ruleForm.desc == 1">
                <el-input v-model="ruleForm.name" style="width:300px;">
                     <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="上传图片 :" prop="date">
                <div class="addBanner-img">
                    <img-upload></img-upload>
                </div>
                <span class="p-warn">图片尺寸：375*82px</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
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
    return {
      ruleForm: {
        shop:'',
        name: '',
        region: '',
        desc: '',
        off:false
      },
      rules: {
        shop:[
          { required: true, message: '所属店铺不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '跳转链接不能为空', trigger: 'blur' },
        ],
        date: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '图片链接未选择', trigger: 'blur' }
        ],
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
.addbanner-wrapper{
    width: 100%;
    .addBanner-img{
        width: 72px;
        height: 72px;
        display: inline-block;
    }
}
</style>


