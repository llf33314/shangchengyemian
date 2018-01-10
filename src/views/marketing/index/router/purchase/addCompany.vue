<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
               <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/purchase/3' }">对外报价</el-breadcrumb-item>
              <el-breadcrumb-item v-if="ruleForm.id ==''">新增公司模板</el-breadcrumb-item>
               <el-breadcrumb-item v-else>修改公司模板</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="addBond-main">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="公司名称 :" prop="companyName">
                  <el-input v-model.trim="ruleForm.companyName" placeholder="请输入公司名称" class="max-input" ></el-input>
              </el-form-item>
              <el-form-item label="公司电话 :" prop="companyTel">
                  <el-input v-model.trim="ruleForm.companyTel" placeholder="请输入公司官网" class="max-input" ></el-input>
              </el-form-item>
              <el-form-item label="公司官网 :" prop="companyInternet">
                  <el-input v-model.trim="ruleForm.companyInternet" placeholder="请输入公司官网" class="max-input" ></el-input>
              </el-form-item>
              <el-form-item label="公司地址 :" prop="companyAddress">
                <el-input class="max-input" type="textarea" :rows="4" placeholder="请输入公司地址" v-model.trim="ruleForm.companyAddress"></el-input>
                <img  @click="dialogVisible = true" title="点击选择地址" style="width:20px;cursor: pointer;" alt="" :src="png1"  >
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
          </el-form>
      </div>
      <el-dialog title="我的位置"  :visible.sync="dialogVisible"  >
       <template>
           <my-map :longitude.sync="ruleForm.longitude" :latitude.sync="ruleForm.latitude" :address.sync="ruleForm.companyAddress"  ></my-map>
        </template>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
       </el-dialog>
  </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import myMap from 'components/myMap'
import addressPng from '../../../../../assets/img/address.png' //地址图标
export default {
  components:{
    myMap
  },
  data() {
    var companyTel = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('公司电话不能为空'));
      }else if(!this.checkTel(value) && !Lib.M.validPhone(value)) {
          return callback(new Error('公司联系电话有误'));
      }else{
         callback();
      }
    };
    var companyInternet = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('公司官网不能为空'));
      }else if(!this.checkUrl(value) ) {
          return callback(new Error('公司官网链接有误'));
      }else{
         callback();
      }
    };
    var companyAddress = (rule, value, callback) => {
      if (value == ''|| this.ruleForm.longitude === '' || this.ruleForm.latitude === '') {
        return callback(new Error('公司地址不能为空'));
      }else{
         callback();
      }
    };
    return {
      ruleForm: {
        id:'',
        companyName:'',
        companyTel: '',
        companyInternet:'',
        longitude:'',
        latitude:'',
        companyAddress:''
      },
      png1:addressPng,
      dialogVisible:false,
      editorOption: {},
      rules: {
        companyName:[
           { required: true, message: '公司名称不能为空', trigger: 'blur' },
        ],
        companyTel: [
           { validator: companyTel, trigger: 'blur' },
        ],
        companyInternet: [
         { validator: companyInternet, trigger: 'blur' },
        ],
        companyAddress: [
            { validator: companyAddress, trigger: 'blur' }, 
        ]
      },
    }
  },
  watch: {
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
  },
  methods: {
    checkUrl(urlString) {
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (urlString == "" || !reg.test(urlString)) {
            return false;
        }
        return true;
    },
    checkTel(tel) {
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
            return false;
        }
        return true;
    },
     checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    },
    //编辑框发生变化
    onEditorReady({ editor, html, text }) {
      this.$refs['ruleForm'].validate('text');
    },
    submitForm(formName) {
      let _this = this;
    //    console.log(_this.ruleForm,"_this.ruleForm.");
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(_this.ruleForm,"_this.ruleForm.");
          _this.ajaxRequest({
              'url': DFshop.activeAPI.purchaseCompanySave_post,
              'data':_this.ruleForm,
              'success':function (data){
                  _this.$message({
                      message: '保存公司模拟成功',
                      type: 'success'
                  });
                  _this.jumpRouter('/purchase/3');
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
      this.jumpRouter('/purchase/3');
    },
    /**获取公司模板信息 */
    purchaseCompanyInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseCompanyInfo_post,
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
    //修改模板时
    if(_this.$route.params.id != undefined && _this.$route.params.id != ''){
    //   console.log(this.$route.params.id);
      _this.purchaseCompanyInfo(this.$route.params.id);
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
</style>


