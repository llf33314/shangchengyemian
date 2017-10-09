<template>
<div class="addbj-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">商城营销</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dwbj' }">对外报价 </el-breadcrumb-item>
            <el-breadcrumb-item > 新增报价单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addbj-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="标题 :" prop="region">
               <el-input  
                    v-model="ruleForm.region" 
                    class="addbj-input"
                    placeholder="请输入报价单标题"
                ></el-input>
            </el-form-item>
            <el-form-item label="所属公司 :" prop="name">
                <el-select v-model="ruleForm.region" placeholder="请选择所属公司" class="addbj-input">
                    <el-option 
                      :label="option.lable" 
                      :value="option.value"
                      :key="option.key"
                      v-for="option in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款方式 :" prop="delivery">
                 <el-radio-group v-model="ruleForm.delivery">
                    <el-radio :label="1">全款</el-radio>
                    <el-radio :label="2">分期</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否在线签合同 :" prop="date">
                <el-radio-group v-model="ruleForm.date">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="合同 :" prop="desc">
                <el-select v-model="ruleForm.desc" placeholder="请选择活动区域" class="addbj-input">
                    <el-option 
                      :label="option.lable" 
                      :value="option.value"
                      :key="option.key"
                      v-for="option in options">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对外报价是否含税 :" prop="desc">
                <el-radio-group v-model="ruleForm.off">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="报价单描述 :" >
                <el-input  
                    v-model="ruleForm.desc" 
                    class="addbj-input"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
             <el-form-item label="报价单说明 :" >
                 <el-input  
                    v-model="ruleForm.desc" 
                    class="addbj-input"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
             <el-form-item label="报价单备注 :">
                 <el-input  
                    v-model="ruleForm.desc" 
                    class="addbj-input"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
            <el-form-item label="底部二维码 :" prop="desc">
                <div class="addbj-img">
                    <img-upload></img-upload>
                </div>
                <p class="p-warn ">建议尺寸：300*300px<br/>
                （可上传公众号二维码或小程序体验码）</p>
               
            </el-form-item>
             <el-form-item label="轮播图设置 :" prop="desc">
                <el-button type="primary">添加图片</el-button>
                <span class="p-warn">建议尺寸：350*150px（最多可上传3张轮播图）</span>
                  <el-table
                    :data="gridData"
                    style="width: 100%;margin-top:20px;">
                    <el-table-column
                        label="序号">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                                placeholder="序号"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="图片">
                        <template scope="scope">
                            <div class="addbj-min-img">
                                <img-upload></img-upload>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="链接">
                        <template scope="scope">
                            <el-input placeholder="请输入跳转链接" v-model="input3">
                            <template slot="prepend">Http://</template>
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                        <el-button >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
             <el-form-item label="商品设置 :" prop="desc">
                <el-button type="primary">添加商品</el-button>
                <el-table
                    :data="gridData"
                    style="width: 100%;margin-top:20px;">
                    <el-table-column
                        label="商品图片"
                        min-width="120">
                        <template scope="scope">
                            <div class="p-box" style="margin:10px 0;">
                                <div class="addbj-min-img">
                                    <default-img></default-img>
                                </div>
                            <p v-text="scope.row.name" 
                                style="width: 65%;
                                padding-left: 15px;">
                            </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="原价（元）" prop="date">
                    </el-table-column>
                    <el-table-column
                        label="优惠价（元）">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="数量">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="人工费（元）">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="安装费（元）">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="小计（元）">
                    </el-table-column>
                    <el-table-column
                        label="运费（元）">
                        <template scope="scope">
                            <el-input  
                                v-model="scope.row.desc" 
                                class="mix-input"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                        <el-button >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="table-footer">
                    总运费
                    <el-input 
                        v-model="input3"
                        style="width: 90px;">
                        <template slot="prepend">¥</template>
                    </el-input> 
                    <span>合计：￥5800.00</span>
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
import imgUpload from 'components/imgUpload'
import defaultImg from 'components/defaultImg'
export default {
  components:{
      imgUpload,defaultImg
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
          {  required: true, message: '活动时间不能为空', trigger: 'blur' }
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
      //this.$refs.goodsDialog.isShow=true;
    }
  },
}
</script>


<style lang="less" scoped>
@import '../../../less/style.less';
.addbj-main{
    padding:40px 4%;
    .addbj-input{
        width: 220px
    }
    p.p-warn{
        display: inline-block;
        width: 220px;
    }
    .addbj-img{
        width: 70px;
        height: 70px;
        display: inline-block;
    }
    .addbj-min-img{
        width: 60px;
        height: 60px;
    }
    .table-footer{
        width: 100%;
        border: 1px solid #dfe6ec;
        border-top:0;
        text-align: right;
        padding: 5px 30px;
        span{
            margin-left: 15px; 
        }
    }
}
</style>


