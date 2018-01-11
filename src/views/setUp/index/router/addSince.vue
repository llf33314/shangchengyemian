<template>
<div class="addLogistics-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/logistics/since' }">上门自提</el-breadcrumb-item>
      <el-breadcrumb-item v-if="ruleForm.id ==''">新增自提点</el-breadcrumb-item>
      <el-breadcrumb-item v-else>修改自提点</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="addLogistics-main">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
    <el-form-item label="自提点名称 :" prop="visitName">
      <el-input v-model.trim="ruleForm.visitName" placeholder="请输入自提点名称" class="add-input"></el-input>
    </el-form-item>
    <el-form-item label="自提点地址 :" class="icon-warn" prop="visit">
      <el-select v-model="ruleForm.visitProvinceId" placeholder="省份"  style="width:100px" @change="getCityOrArea('city')">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in provinces"></el-option>
      </el-select>
      <el-select v-model="ruleForm.visitCityId" placeholder="城市" style="width:100px" @change="getCityOrArea('area')">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in citys" ></el-option>
      </el-select>
      <el-select v-model="ruleForm.visitAreaId" placeholder="区县" style="width:100px">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in areas" ></el-option>
      </el-select> 
      <el-input v-model.trim="ruleForm.visitAddress" :readonly="true" placeholder="请点击选择自提地址" class="add-input"></el-input>
      <img  @click="dialogVisible = true" title="点击选择地址" style="width:20px;cursor: pointer;" alt="" :src="png1"  >
    </el-form-item>
    <el-form-item label="联系电话 ：" prop="visitContactNumber">
        <el-input v-model.trim="ruleForm.visitContactNumber" placeholder="请输入联系电话"   class="add-input"></el-input>
    </el-form-item>
    <el-form-item label="接待时间 :" prop="timeList">
       <time-list :timeList.sync="ruleForm.timeList" ref="timeComp"></time-list>
    </el-form-item>
    <el-form-item label="自提点图片 :" prop="imageList">
      <div class="shop-IDImg">
        <div  class="shop-IDUpload" v-if="ruleForm.imageList.length >0 "
              style="margin-bottom:10px;"
              v-for=" (img,index) in ruleForm.imageList"
              :key="index">
          <div class="material-square">
            <img class="img" :src="img.imageUrl" />
            <div class="delete"  @click.stop="deleteImg(index)">
              <i class="el-icon-view" @click.stop="showBigImg(img.imageUrl)"></i>
              <i class="el-icon-delete2" @click.stop="deleteImg(index)"></i>
            </div>
          </div>
        </div>
        <div class="shop-IDUpload" v-if="ruleForm.imageList.length < 5 ">
          <div class="material-square border" @click="materiallayer()" >
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>

    </el-form-item>
    <el-form-item label="自提点备注 :">
        <el-input class="add-input" type="textarea" :rows="2"
            placeholder="请输入内容"  v-model.trim="ruleForm.visitRemark">
        </el-input>
    </el-form-item>
    <el-form-item label="是否同时作为线下门店接待 :" >
        <el-radio-group v-model="ruleForm.isStoreReception">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
    </el-form-item>
     <el-form-item label="是否允许到店支付 :" >
        <el-radio-group v-model="ruleForm.isStorePay">
            <el-radio :label="0">开启</el-radio>
            <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
        <p class="addLogistics-warn">如关闭到店支付就只能微信支付，开启到店支付既能到店支付也能微信支付。</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <img width="100%" :src="largeSrc" alt="" class="img">
    </el-dialog>
  </div>
  <el-dialog title="我的位置"  :visible.sync="dialogVisible">
    <template>
        <my-map :longitude.sync="ruleForm.visitLongitude" :latitude.sync="ruleForm.visitLatitude" :address.sync="ruleForm.visitAddress"  ></my-map>
    </template>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
 import imgUpload from 'components/imgUpload.vue';
 import timeList from "../../components/timeList";
 import myMap from 'components/myMap';
 import addressPng from '../../../../assets/img/address.png' //地址图标
 import Lib from 'assets/js/Lib';
export default {
  components:{
      imgUpload,timeList,myMap
  },
  data() {
    var formVisit = (rule, value, callback) => {
      if (this.ruleForm.visitProvinceId  == '' || this.ruleForm.visitCityId  == ''||
        this.ruleForm.visitAreaId  == ''|| this.ruleForm.visitAddress  == '') {
        return callback(new Error('请输入自提点地址'));
      } else{
        callback();
      }
    };
    const cityOptions = [
         {name:'周一',checked:true,id:1}
        ,{name:'周二',checked:true,id:2}
        ,{name:'周三',checked:true,id:3}
        ,{name:'周四',checked:true,id:4}
        ,{name:'周五',checked:true,id:5}
        ,{name:'周六',checked:true,id:6}
        ,{name:'周日',checked:true,id:7}
      ];
    return {
      ruleForm: {
        id:'',
        isStorePay:1,
        isStoreReception:0,
        visitRemark:'',
        imageList:[],
        timeList:[],
        visitContactNumber:'',
        visitAddress:'',
        visitAddressDetail:'',
        visitAreaId:'',
        visitCityId:'',
        visitProvinceId:'',
        visitName:'',
        startTime:'',
        endTime:'',
        visitLongitude:'',
        visitLatitude:'',
      },
      png1:addressPng,
      cities: cityOptions,
      rules: {
        visitName: [
          { required: true, message: '自提名称不能为空', trigger: 'blur' }
        ],
        visit:[
          { validator: formVisit, trigger: 'blur,change'},
        ],
        visitContactNumber: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        imageList: [
          { type: 'array', required: true, message: '请上传自提点图片', trigger: 'change' }
        ],
        timeList: [
          { type: 'array', required: true, message: '请编辑接待时间', trigger: 'change,blur' }
        ],
      },
      provinces:"",//省份列表
      citys:"", //城市列表
      areas:"",//区县列表
      editCityId:'', //修改时 存放选中城市id
      editAreaId:'',//修改时 存放选中区县ID
      materialLargeSrcVisible: false,//查看大图
      largeSrc: '',//查看大图的图片
      dialogVisible:false

    }
  },
  watch: {
    "ruleForm.timeList"(a, b) {
      this.$refs.ruleForm.validate(valid => {});
    },
    'materialLargeSrcVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    },
    'dialogVisible'(a){
      if(a){
        parent.window.postMessage("openMask()", "*");
      }else{
        parent.window.postMessage("closeMask()", "*");
      }
    }
  },
  methods: {
     /**调用素材库 */
    materiallayer(){
      let _this = this;
      parent.window.postMessage("openMask()", "*");
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
          let _add = true;//重复排除条件
          _this.ruleForm.imageList.forEach((item,i) => {
            val.forEach((test,j)=>{
              //重复添加提示
              if(_add && test.url == item.imageUrl) {
                  _this.$message({
                  message: '请不要重复添加',
                  type: 'warning'
                });
                return _add = false;
              }
            });
          });
          if(!_add)return;//重复不添加
          let oLength = _this.ruleForm.imageList.length;
          val.forEach((test,j)=>{
              let image={
                assType:3,
                imageUrl:test.url,
                assSort:_this.ruleForm.imageList.length
              }
              if((oLength+j)<5){
                  _this.ruleForm.imageList.push(image);
              }else{
                _this.$message({
                  message: '已选择图片超过5张,系统默认筛选您所选的前五张',
                  type: 'warning'
                });
              }
          }); 
          _this.$refs['ruleForm'].validate();
          parent.window.postMessage("closeMask()", "*");
      }).catch(function (error) {
        parent.window.postMessage("closeMask()", "*");
          //取消
      })
    },
    /*
    * 删除图片
    * */
    deleteImg(num) {
      let  _this = this;
      _this.ruleForm.imageList.pop([num]);
      _this.$refs['ruleForm'].validate();
    },
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },
 
    submitForm(formName) {
      let _this = this;
      let timeValid = this.$refs.timeComp.validateData();
    console.log(this.$refs[formName].model);
      this.$refs[formName].validate((valid) => {
        if (valid&& timeValid) {
          let paramsForm = this.$refs[formName].model;
          let imageList =_this.ruleForm.imageList;
          let timeList = _this.ruleForm.timeList;
          //将接待天数数组转成字符串
          timeList.forEach((time,j)=>{
            let days="";
            time.visitDays.forEach((day,m)=>{
              if(days != ""){ days+=',';}
                days+=day;
            });
           time.visitDays=days;
          });
          //去除域名
          imageList.forEach((image,m)=>{
              var img = image.imageUrl.split("/upload/")[1];
              image.imageUrl=img;
          });
          let param = {};
          param.take = paramsForm;
          param.take.imagesUrl=imageList[0].imageUrl;
          param.imageList =JSON.stringify(imageList);
          param.timeList = JSON.stringify(timeList);
          // console.log(param)
 
          _this.ajaxRequest({
            'url': DFshop.activeAPI.mallFreightTakeSave_post,
            'data':param,
            'success':function (data){
              _this.$message({
                message: '保存成功',
                type: 'success'
              });
              _this.jumpRouter('/logistics/since');
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
      this.jumpRouter('/logistics/since');
    },
    /**获取自提点信息 */
    mallTakeInfo(id){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.mallFreightTakeInfo_post,
          'data':{
            id :id 
          },
          'success':function (data){
            _this.editCityId= data.data.visitCityId;
            _this.editAreaId= data.data.visitAreaId;
            _this.ruleForm = data.data;
            //添加域名
            _this.ruleForm.imageList.forEach((image,m)=>{
              image.imageUrl=data.imgUrl+image.imageUrl;
            });
          }
      });
    },
    /**获取自提点信息 */
    selectMainShop(){
      let _this = this;
      _this.ajaxRequest({
          'url': DFshop.activeAPI.selectMainShop_post,
          'success':function (data){
            _this.ruleForm.visitProvinceId = Number(data.data.province);
            _this.ruleForm.visitAddress = data.data.address;
            // _this.ruleForm.visitAddressDetail = data.data.address;
            _this.ruleForm.visitLongitude=data.data.longitude;
            _this.ruleForm.visitLatitude=data.data.latitude;
            _this.editCityId= Number(data.data.city);
            _this.editAreaId= Number(data.data.district);

     
          }
      });
    },
    /**城市数据级联 */
    getCityOrArea(name){
      let _this =this;
      let  id="";
      if(name === 'city'){
        id = _this.ruleForm.visitProvinceId;
        _this.ruleForm.visitCityId='';
        _this.ruleForm.visitAreaId='';
          _this.citys=[];
          _this.areas=[];
      }else{
        id = _this.ruleForm.visitCityId;
          _this.ruleForm.visitAreaId='';
          _this.areas=[];
      }
      this.$refs.ruleForm.validate(valid => {});
      _this.getAreaList({
        'cityId':id,
        'success':function(data){
          let options = data.data;
          if(name === 'city'){
            _this.citys = options;
             if(_this.editCityId != ""){
              _this.ruleForm.visitCityId = _this.editCityId;
             }
          }else{
            _this.areas = options;
            if(_this.editAreaId !=""){
              _this.ruleForm.visitAreaId = _this.editAreaId;
            }
          }
        }
      })
    }
  },
  mounted(){
    if(this.$route.params.id != 0 && this.$route.params.id !='undefined'){
      this.mallTakeInfo(this.$route.params.id);
    }else{
      this.selectMainShop();
    }
    let _this =this;
    _this.isMaterialUrl();
    //获取省级数据列表
    _this.getAreaList({
      'cityId':"",
      'success':function(data){
        let options = data.data;
        _this.provinces=options;
        _this.citys=[];
        _this.areas=[];
      }
    })
  }, 
}
</script>

<style lang="less" scoped>
@import '../../less/addLogistics.less';
.el-checkbox-button__inner,.el-checkbox-button__inner{
 border-left: 1px solid #bfcbd9;
}
 .shop-IDUpload,.shop-img {
    vertical-align: top;
    width: 50px;
    height: 50px;
    background: #fbfdff;
    display: inline-block;
    margin-right: 15px;
}

.addLogistics-wrapper{
    width: 100%;
    .addBanner-img{
        width: 54px;
        height: 54px;
        display: inline-block;
    }
    a{
        color: #20a0ff;
        cursor: pointer;
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
    height: 50px;
    width: 50px;
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
