<template>
<div class="addBond-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dwbj' }">预售管理</el-breadcrumb-item>
            <el-breadcrumb-item >新增合同</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addBond-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="合同标题 :" prop="title">
                 <el-input  
                    v-model="ruleForm.title" 
                    placeholder="请输入合同标题"
                    class="max-input"
                ></el-input>
            </el-form-item>
            <el-form-item label="合同内容 :" prop="text">
                调文本编辑器
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
export default {

  data() {
    return {
      ruleForm: {
        title:'',
        text: '',
      },
      rules: {
        title:[
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        text: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ]
      },
    }
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


