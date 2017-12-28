<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
               <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/purchase/2' }">对外报价</el-breadcrumb-item>
              <el-breadcrumb-item v-if="ruleForm.id ==''">新增合同</el-breadcrumb-item>
               <el-breadcrumb-item v-else>修改合同</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="addBond-main">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="合同标题 :" prop="contractTitle">
                  <el-input v-model.trim="ruleForm.contractTitle" placeholder="请输入合同标题" class="max-input"></el-input>
              </el-form-item>
              <el-form-item label="合同内容 :" prop="contractContent">
                <div class="edit_container">
                  <quill-editor v-model.trim="ruleForm.contractContent"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption"
                          @change="onEditorReady($event)">
                  </quill-editor>
                </div>
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
export default {
  data() {
    return {
      ruleForm: {
        id:'',
        contractTitle:'',
        contractContent: ''
      },
      editorOption: {},
      rules: {
        contractTitle:[
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        contractContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ]
      },
    }
  },
 computed: {
   editor() {
    return this.$refs.myQuillEditor.quill
   }
  },
  methods: {
    //编辑框发生变化
    onEditorReady({ editor, html, text }) {
      this.$refs['ruleForm'].validate('text');
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(_this.ruleForm,"_this.ruleForm.");
          _this.ajaxRequest({
              'url': DFshop.activeAPI.purchaseContractSave_post,
              'data':_this.ruleForm,
              'success':function (data){
                  _this.$message({
                      message: '保存合同成功',
                      type: 'success'
                  });
                  _this.jumpRouter('/purchase/2');
              }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.jumpRouter('/purchase/2');
    },
    /**获取合同信息 */
    purchaseContractInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseContractInfo_post,
        'data':{
            id : id
        },
        'success':function (data){
            if(data.code == 0){
               _this.ruleForm = data.data; 
            }
        }
        });
    },
  },
  mounted() {
    let _this = this;
    this.isMarketingUrl();
    //修改合同时
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){
      console.log(this.$route.params.id);
      _this.purchaseContractInfo(this.$route.params.id);
    }
  }   
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

// .quill-editor {
//    height: 745px;
// .ql-container{
//     height: 85%;
//   }
// }
</style>


