<template>
<div class="addLogistics-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/logistics/since' }">上门自提</el-breadcrumb-item>
      <el-breadcrumb-item>新增自提点</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="addLogistics-main">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
    <el-form-item label="自提点名称 :" prop="name">
      <el-input v-model="ruleForm.visitName" placeholder="请输入自提点名称" class="add-input"></el-input>
      <p class="addLogistics-warn">物流名称限制20字数，1个汉字等于2个数字，符号。</p>
    </el-form-item>
    <el-form-item label="自提点地址 :" class="icon-warn">
      <el-select v-model="ruleForm.visitProvinceId" placeholder="省份"  style="width:100px" @change="getCityOrArea('city')">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in provinces"></el-option>
      </el-select>
      <el-select v-model="ruleForm.visitCityId" placeholder="城市" style="width:100px" @change="getCityOrArea('area')">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in citys" ></el-option>
      </el-select>
      <el-select v-model="ruleForm.visitAreaId" placeholder="区县" style="width:100px">
        <el-option :label="option.city_name" :value="option.id" :key="option.id" v-for="option in areas" ></el-option>
      </el-select>
      <el-input v-model="ruleForm.visitAddressDetail" placeholder="请点击选择自提地址" class="add-input block"></el-input>
    </el-form-item>
    <el-form-item label="联系电话 ：" >
        <el-input v-model="ruleForm.visitContactNumber" placeholder="请输入联系电话"   class="add-input"></el-input>
    </el-form-item>
    <el-form-item label="接待时间 :" prop="resource">
      <!-- <el-checkbox-group v-model="ruleForm.checkboxGroup"> -->
        <!-- <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button> -->
        <el-checkbox-button :label="1" :key="1">周一</el-checkbox-button>
        <el-checkbox-button :label="2" :key="2">周二</el-checkbox-button>
        <el-checkbox-button :label="3" :key="3">周三</el-checkbox-button>
        <el-checkbox-button :label="4" :key="4">周四</el-checkbox-button>
        <el-checkbox-button :label="5" :key="5">周五</el-checkbox-button>
        <el-checkbox-button :label="6" :key="6">周六</el-checkbox-button>
        <el-checkbox-button :label="7" :key="7">周日</el-checkbox-button>
      <!-- </el-checkbox-group> -->
        <div class="block">
            <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
            }">
        </el-time-select>
        -
        <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
            }">
        </el-time-select>
        </div>
    </el-form-item>
    <el-form-item label=" 自提点图片 :" prop="imagesUrl">
        <div class="since-img">
            <img-upload></img-upload>
        </div>
    </el-form-item>
    <el-form-item label="自提点备注 :">
        <el-input
            class="add-input"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.visitRemark">
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
  </div>
</div>
</template>

<script>
 import imgUpload from 'components/imgUpload.vue';
 import Lib from 'assets/js/Lib';
  export default {
    components:{
        imgUpload
    },
    data() {
      // var checkRegion = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请选择快递公司'));
      //   }
      // };
      const cityOptions = ['周一', '周二', '周三', '周四','周五', '周六','周日'];
      return {
        ruleForm: {
          isStorePay:'',
          isStoreReception:'',
          visitRemark:'',
          imagesUrlList:'',
          visitContactNumber:'',
          visitAddressDetail:'',
          visitAreaId:'',
          visitCityId:'',
          visitProvinceId:'',
          visitName:'',
        },
        cities: cityOptions,
        startTime: '',
        endTime: '',
        value2: [],
        rules: {
          visitName: [
            { required: true, message: '自提名称不能为空', trigger: 'blur' }
          ],
          // region: [
          //   { validator: checkRegion, trigger: 'blur' }   
          // ],
          resource: [
            { required: true, message: '接待时间不能为空', trigger: 'change' }
          ]
        },
        provinces:"",
        citys:"",
        areas:"",
        dialogVisible : false,
        cityId:''
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            let paramsForm = this.$refs[formName].model;
            let imageList = {};
            let timeList = {};

            let param = {};
            param.take = paramsForm;
            param.imageList = imageList;
            param.timeList = timeList;
            Lib.M.ajax({
              'url': DFshop.activeAPI.mallFreightTakeSave_post,
              'data':param,
              'success':function (data){
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.jumpRouter('/logistics/logistics');
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
      },
      addTable(){
        var newTab = {
            dels: '',
            name: '',
            num: '',
            money:''
        }
        this.tableData.push(newTab);
      },
      addRegion(dels){
        console.log(dels);
        this.dialogVisible = true;
      },
      handleChange(value, direction, movedKeys) {
        //todo
        console.log(value, direction, movedKeys);
        let dels=[];
        for(let i=0; i<value.length;i++){
          dels.push(this.data2[i]);
        }
        console.log(dels,'所选地址');
      },
      aaa(e,index){
        console.log(e,e);
      },
      mallFreightTakeInfo(id){
        let _this = this;
        _this.ruleForm = '';
        Lib.M.ajax({
          'url': DFshop.activeAPI.mallFreightTakeInfo_post,
          'data':{
            id :id 
          },
          'success':function (data){
            _this.ruleForm = data.data;
            console.log(_this.ruleForm);
          }
      });
      },
      getCityOrArea(name){
        let _this =this;
        if(name === 'city'){
          _this.cityId = _this.ruleForm.visitProvinceId;
        }else{
          _this.cityId = _this.ruleForm.visitCityId;
        }
        DFshop.method.getAreaList({
          'cityId':_this.cityId,
          'success':function(data){
            let options = data.data;
            if(name === 'city'){
              _this.citys = options;
            }else{
              _this.areas = options;
            }
          }
        })
      }
    },
    mounted(){
      if(this.$route.params.id != '' && this.$route.params.id !='undefined'){
        this.mallFreightTakeInfo(this.$route.params.id);
      }
      let _this =this;
      DFshop.method.getAreaList({
        'cityId':_this.cityId,
        'success':function(data){
        let options = data.data;
        _this.provinces=options;
        //console.log(_this.provinces)
        }
      })
    }, 
  }
</script>

<style lang="less" scoped>
@import '../../less/addLogistics.less';
</style>
