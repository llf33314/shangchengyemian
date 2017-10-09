<template>
<div class="addLogistics-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/logistics' }">上门自提</el-breadcrumb-item>
      <el-breadcrumb-item>新增自提点</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="addLogistics-main">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="demo-ruleForm">
    <el-form-item label="自提点名称 :" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入自提点名称" class="add-input"></el-input>
      <p class="addLogistics-warn">物流名称限制20字数，1个汉字等于2个数字，符号。</p>
    </el-form-item>
    <el-form-item label="自提点地址 :" prop="region" class="icon-warn">
      <el-select v-model="ruleForm.region" placeholder="省份"  style="width:100px" >
        <el-option :label="option.name" :value="option.value" :key="option.value" v-for="option in options" ></el-option>
        <!-- <el-option label="申通" value="shanghai"></el-option>
        <el-option label="中通" value="beijing"></el-option> -->
      </el-select>
      <el-select v-model="ruleForm.region" placeholder="城市" style="width:100px" >
        <el-option :label="option.name" :value="option.value" :key="option.value" v-for="option in options" ></el-option>
        <!-- <el-option label="申通" value="shanghai"></el-option>
        <el-option label="中通" value="beijing"></el-option> -->
      </el-select>
      <el-select v-model="ruleForm.region" placeholder="区县" style="width:100px" >
        <el-option :label="option.name" :value="option.value" :key="option.value" v-for="option in options" ></el-option>
        <!-- <el-option label="申通" value="shanghai"></el-option>
        <el-option label="中通" value="beijing"></el-option> -->
      </el-select>
      <el-input v-model="ruleForm.name" placeholder="请点击选择自提地址" class="add-input block"></el-input>
    </el-form-item>
    <el-form-item label="联系电话 ：" prop="shop" >
        <el-input v-model="ruleForm.shop" placeholder="请点击选择自提地址"   class="add-input"></el-input>
    </el-form-item>
    <el-form-item label="接待时间 :" prop="resource">
      <el-checkbox-group v-model="ruleForm.checkboxGroup">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
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
    <el-form-item label=" 自提点图片 :" prop="money">
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
            v-model="ruleForm.textarea">
        </el-input>
    </el-form-item>
    <el-form-item label="是否同时作为线下门店接待 :" >
        <el-radio-group v-model="ruleForm.resource">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
        </el-radio-group>
    </el-form-item>
     <el-form-item label="是否允许到店支付 :" >
        <el-radio-group v-model="ruleForm.resource">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
        </el-radio-group>
        <p class="addLogistics-warn">如关闭到店支付就只能微信支付，开启到店支付既能到店支付也能微信支付。</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
  </div>
  <el-dialog
  title="选择可配送区域"
  :visible.sync="dialogVisible"
  size="small">
    <div class="dialog-main">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        :right-default-checked="[1]"
        v-model="value2"
        :data="data2"
        @change="handleChange">
      </el-transfer>
      <div class="shop-textr">
        <el-button type="primary">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
 import imgUpload from 'components/imgUpload.vue'
  export default {
    components:{
        imgUpload
    },
    data() {
      var checkRegion = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择快递公司'));
        }
      };
      var checkshop = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择所属店铺'));
        }
      };
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都',];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      const cityOptions = ['周一', '周二', '周三', '周四','周五', '周六','周日'];
      return {
        ruleForm: {
          name: '',
          region: '',
          shop:'',
          money:'',
          resource: '1',
          delivery:false,
          desc:'',
          checkboxGroup:[],
          table:{
            table1:'',
            table2:'',
            table3:'',
          },
          model:{
            shop:'',
            aa:''
          },
          textarea: ''
        },
        cities: cityOptions,
        startTime: '',
        endTime: '',
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' }
          ],
          region: [
            { validator: checkRegion, trigger: 'change' }   
          ],
          shop: [
            { validator: checkshop, trigger: 'change' }
          ],
          money: [
            { required: true, message: '请输入运费', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请填计价方式', trigger: 'change' }
          ]
        },
        tableData: [{
            dels: '北京,上海,北京,上海,北京,上海',
            freight: '',
            num: '',
            money:''
          }, {
            dels: '北京,上海,北京,上海',
            name: '王小虎',
            num: '',
            money:''
        }],
        options:[{
          name: '北京',
          value: 1,
          aa:'哈哈'
        },
        {
          name: 'b',
          value: 2,
          aa:'嘻嘻'
        },
        {
          name: 'a',
          value: 3,
          aa:'LAL'
        }],
        dialogVisible : false,
        Data: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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
        // this.tableData[0].dels = ;
        console.log(dels,'所选地址');
      },
      aaa(e,index){
        // let _aa = this.options[e].aa
        console.log(e,e);
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../../less/addLogistics.less';
</style>
