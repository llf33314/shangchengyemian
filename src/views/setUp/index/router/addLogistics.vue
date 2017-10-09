<template>
<div class="addLogistics-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/logistics' }">物流管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="addLogistics-main">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="模板名称 :" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入模板名字" class="add-input"></el-input>
      <p class="addLogistics-warn">物流名称限制20字数，1个汉字等于2个数字，符号。</p>
    </el-form-item>
    <el-form-item label="默认快递公司 :" prop="region" class="icon-warn">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="add-input" >
        <el-option :label="option.name" :value="option.value" :key="option.value" v-for="option in options" ></el-option>
        <!-- <el-option label="申通" value="shanghai"></el-option>
        <el-option label="中通" value="beijing"></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item label="所属店铺：" prop="shop" class="icon-warn">
       <el-select v-model="ruleForm.shop" placeholder="请输入所属店铺" class="add-input" @click="aaa(ruleForm.shop)">
        <el-option :label="option.name" :value="option.value" :key="option.value" :aa='option.aa' v-for="option in options"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="计价方式 :" prop="resource">
      <el-radio-group v-model="ruleForm.resource" >
        <el-radio label="1">统一运费</el-radio>
        <el-radio label="2">按件数</el-radio>
        <el-radio label="3">按重量</el-radio>
        <el-radio label="4">按公斤</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="运费 :" prop="money">
      <el-input  v-model="ruleForm.money" class="add-input" v-if="ruleForm.resource == 1">
        <template slot="prepend">¥</template>
      </el-input>
      <el-table
        :data="Data"
        style="width: 100%"
        v-else>
        <el-table-column
          prop="date"
          label="日期">
          <template scope="scope">
            <el-input  v-model="scope.row.freight" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
          <template scope="scope">
            <el-input  v-model="scope.row.freight" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template scope="scope">
            <el-input  v-model="scope.row.freight" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template scope="scope">
            <el-input  v-model="scope.row.freight" style="width:88px"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="配送区域和运费 :" >
      <el-switch on-text="开启" off-text="关闭" v-model="ruleForm.delivery" class="add-input"></el-switch>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-if="ruleForm.delivery">
        <el-table-column
          label="可配送区域">
          <template scope="scope">
            <div class="tabal-region">
              <p>{{ scope.row.dels }}</p>
              <p>
                <a @click="addRegion(scope.row.dels)">编辑</a>
                <a>删除</a>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="运费（元）">
          <template scope="scope">
            <el-input  v-model="scope.row.freight" style="width:88px"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="包邮数量">
          <template scope="scope">
            满  <el-input  v-model="scope.row.num" style="width:88px"></el-input> 件包邮
          </template>
        </el-table-column>
        <el-table-column
          label="包邮价格">
          <template scope="scope">
            满  <el-input  v-model="scope.row.money" style="width:88px">
              <template slot="prepend">¥</template>
              </el-input>  包邮
          </template>
        </el-table-column>
      </el-table>
      <p class="table-button" v-if="ruleForm.delivery" @click="addTable"><a>指定可配送区域和运费</a></p>
    </el-form-item>
    <el-form-item label="包邮数量 :">
      满 <el-input  v-model="ruleForm.desc" style="width:220px"></el-input> 件包邮
      <p class="addLogistics-warn">不填写代表没有包邮数量</p>
    </el-form-item>
    <el-form-item label="包邮价格 :" >
      满 <el-input  v-model="ruleForm.desc" style="width:220px">
         <template slot="prepend">¥</template>
         </el-input> 包邮
      <p class="addLogistics-warn">不填写代表没有包邮价格</p>
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

  export default {
    
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
      return {
        ruleForm: {
          name: '',
          region: '',
          shop:'',
          money:'',
          resource: '1',
          delivery:false,
          desc:'',
          table:{
            table1:'',
            table2:'',
            table3:'',
          },
          model:{
            shop:'',
            aa:''
          }
        },
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
