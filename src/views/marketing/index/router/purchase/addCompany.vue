<template>
  <div class="addBond-wrapper">
      <div class="common-nav">
          <el-breadcrumb separator="/">
               <el-breadcrumb-item ><a @click="reFreshpage" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
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
                  <el-input v-model.trim="ruleForm.companyTel" placeholder="请输入公司电话" class="max-input" ></el-input>
              </el-form-item>
              <el-form-item label="公司官网 :" prop="companyInternet">
                  <el-input v-model.trim="ruleForm.companyInternet" placeholder="请输入公司官网" class="max-input" ></el-input>
              </el-form-item>
              <el-form-item label="公司地址 :" prop="companyAddress">
                <input class="max-input"  placeholder="请输入公司地址" autocomplete="false"
                  v-model.trim="ruleForm.companyAddress" id="tipinput"/>
              </el-form-item>
              <el-form-item style="height:400px;">
                   <div id="container" style="height:400px; width:80%;border: 1px solid #bfcbd9;"></div>
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
 
import addressPng from '../../../../../assets/img/address.png' //地址图标
export default {
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
      if (value == '') {
        return callback(new Error('公司地址不能为空'));
      }else if( this.ruleForm.longitude === '' || this.ruleForm.latitude === ''){
         return callback(new Error('公司地址经纬度不能为空'));
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

          //防止多次点击重复提交数据
          if(!Lib.C.ajax_manage) return false;
          Lib.C.ajax_manage = false;
          
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
                _this.$nextTick(function(){
                  _this.loadAMap(_this.ruleForm.companyAddress);
                });
            }
        }
        });
    },
    //高德地图加载
    loadAMap(address){
      let _this = this;
      //地图加载
      var map = new AMap.Map("container", {
          resizeEnable: true
      });
      //输入提示
      var autoOptions = {
          input: "tipinput"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
          map: map
      });  //构造地点查询类
      AMap.event.addListener(auto, "select", function(e) {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);  //关键字查询查询
          // console.log(e.poi,"54654546");
          if(e.poi.location!=null){
            _this.ruleForm.longitude=e.poi.location.lng;
            _this.ruleForm.latitude=e.poi.location.lat;
          }else{
            _this.ruleForm.longitude="";
            _this.ruleForm.latitude="";
          }
          _this.ruleForm.companyAddress=e.poi.district+e.poi.name;
         
      });//注册监听，当选中某条记录时会触发
      if(address !=null){
         placeSearch.search(address);
      }
       var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
      });        
      // map.on('click', function(e) {
      //     // console.log('您在[ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ]的位置点击了地图！');
      //     var  lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]; //已知点坐标
      //      geocoder.getAddress(lnglatXY, function(status, result) {
      //     if (status === 'complete' && result.info === 'OK') {
      //           var address = result.regeocode.formattedAddress; //返回地址描述
      //           _this.ruleForm.companyAddress=address; 
      //           _this.ruleForm.longitude=e.lnglat.getLng();
      //           _this.ruleForm.latitude=e.lnglat.getLat(); 
      //     }
      // });
      // });
    }
    },
  mounted() {
    let _this = this;
    this.loadAMap();
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
.max-input{
  width:360px;
}
#tipinput{
  -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.addBond-main{
    padding:40px 4%;
    .addBond-input{
        width: 220px
    }
}
</style>


