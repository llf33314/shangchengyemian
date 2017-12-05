<template>
<div class="index-wrapper">
    <el-tabs v-model="activeName1" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="All">
      </el-tab-pane>
      <el-tab-pane label="维权订单" name="rights">
      </el-tab-pane>
      <el-tab-pane label="评价管理" name="comment">
      </el-tab-pane>
    </el-tabs>
    <div class="index-main" v-if="isShow">
      <div class="index-shopInfo">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item class="input-all">
            <el-input v-model="formInline.user" placeholder="订单号/姓名/联系电话"></el-input>
          </el-form-item>
           <el-form-item >
              <span class="demonstration" 
                    style="font-size:13px;">下单时间 :</span>
              <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item >
          <div>
            <el-form-item >
              <el-form-item label="订单类型 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单来源 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item >
          </div>
          <div>
            <el-form-item >
              <el-form-item label="付款方式 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物流方式 :">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择店铺 :">
                <el-select v-model="formInline.region" placeholder="选择店铺">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item >
          </div>
            <el-button type="primary">筛选</el-button>
            <el-button type="primary">批量导出</el-button>
        </el-form>
      </div>
      <div class="index-content" v-if="isTable">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="All"></el-tab-pane>
          <el-tab-pane label="待付款" name="pay"></el-tab-pane>
          <el-tab-pane label="待发货" name="notShipped"></el-tab-pane>
          <el-tab-pane label="已发货" name="shipped"></el-tab-pane>
          <el-tab-pane label="已完成" name="completed"></el-tab-pane>
          <el-tab-pane label="已关闭" name="closed"></el-tab-pane>
          <el-tab-pane label="退款中" name="refund"></el-tab-pane>
        </el-tabs>
        <div class="index-table" v-if="isIndex !== 'comment'">
          <div class="table-header">
            <div class="table-th col-2">所属店铺</div>
            <div class="table-th col-4">商品</div>
            <div class="table-th col-1">单价</div>
            <div class="table-th col-1">数量</div>
            <div class="table-th col-3">售后</div>
            <div class="table-th col-2">买家</div>
            <div class="table-th col-2">下单时间</div>
            <div class="table-th col-2">订单状态</div>
            <div class="table-th col-2">实付金额</div>
            <div class="table-th col-3">订单来源</div>
          </div>
          <div class="table-content-box">
            <div class="table-content">
              <div class="table-tr shop-box-justify table-top">
                <p>订单号：SC1496736195903
                  <span>微信安全支付</span>
                </p>
                <p>
                  <a>订单详情</a>
                  <a>打印订单</a>
                  <a>备注</a>
                </p>
              </div>
              <div class="table-tr " >
                <div class="table-td border-r col-2">
                    谷通科技
                </div>
                <div class=" col-4">
                  <div class="clearfix table-item">
                    <div class="table-img">
                      <defaultImg></defaultImg>
                    </div>
                    <div class="table-text">苹果 iPhone 7 国行全网通4G手机
                      <p>64G</p>
                    </div>
                  </div>
                  <div class="clearfix table-item">
                    <div class="table-img">
                      <defaultImg></defaultImg>
                    </div>
                    <div class="table-text">苹果 iPhone 7 国行全网通4G手机
                      <p>64G</p>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="table-item">5800.00</div>
                  <div class="table-item">5800.00</div>
                </div>
                <div class=" border-r col-1">
                  <div class="table-item">1</div>
                  <div class="table-item">1</div>
                </div>
                <div class="table-td border-r col-3">
                </div>
                <div class="table-td border-r col-2">微信昵称
                </div>
                <div class="table-td border-r col-2">2017-06-30 14:22:01
                </div>
                <div class="table-td border-r col-2">
                  <p>待发货</p>
                  <el-button type="primary" size="small"
                             @click="dialogVisible=true">发货</el-button>
                </div>
                <div class="table-td border-r col-2">5800.00
                </div>
                <div class="table-td border-r col-3">微商城
                </div>
              </div>
              <div class="table-tr shop-box-justify table-footer">买家留言：
              </div>
            </div>
            <div class="table-content">
              <div class="table-tr shop-box-justify table-top">
                <p>订单号：SC1496736195903
                  <span>微信安全支付</span>
                </p>
                <p>
                  <a>订单详情</a>
                  <a>打印订单</a>
                  <a>备注</a>
                </p>
              </div>
              <div class="table-tr " >
                <div class="table-td border-r col-2">
                  谷通科技
                </div>
                <div class="col-4 ">
                  <div class="clearfix table-item">
                    <div class="table-img">
                      <defaultImg></defaultImg>
                    </div>
                    <div class="table-text">苹果 iPhone 7 国行全网通4G手机
                      <p>64G</p>
                    </div>
                  </div>
                </div>
                <div class=" col-1">
                  <div class="table-item">5800.00
                  </div>
                </div>
                <div class="border-r col-1">
                  <div class="table-item">
                    1
                  </div>
                </div>
                <div class="table-td border-r col-3"> 
                </div>
                <div class="table-td border-r col-2">微信昵称
                </div>
                <div class="table-td border-r col-2">2017-06-30 14:22:01
                </div>
                <div class="table-td border-r col-2">
                  <p>待发货</p>
                  <el-button type="primary" size="small">发货</el-button>
                </div>
                <div class="table-td border-r col-2">5800.00
                </div>
                <div class="table-td border-r col-3">微商城
                </div>
              </div>
              <div class="table-tr shop-box-justify table-footer">买家留言：
              </div>
            </div>
          </div>
        </div>
        <div class="index-table-comment" v-if="isIndex === 'comment'">
          <div class="table-header">
            <div class="table-th col-3">评论内容</div>
            <div class="table-th col-2">商品</div>
            <div class="table-th col-2">订单号</div>
            <div class="table-th col-2">所属店铺</div>
            <div class="table-th col-2">评论时间</div>
            <div class="table-th col-1">状态</div>
          </div>
          <div class="table-content-box">
            <div class="table-content">
              <div class="table-tr" >
                <div class="table-td  col-3">
                  <p>[好评]   一切都好，商品很给力。一切都好，商品很给力一切都好，商品很给力！！</p>
                </div>
                <div class="table-td col-2">
                  <p>苹果 iPhone 7 国行全网通4G手机  64G</p>
                </div>
                <div class="table-td col-2">
                  <p>SC1496736197801</p>
                </div>
                <div class="table-td col-2">
                  <p>谷通科技</p>
                </div>
                <div class="table-td col-2">
                  <p>2017-06-30 14:22:01</p>
                </div>
                <div class="table-td col-1">
                  <p>未回复</p>
                </div>
              </div>
              <div class="table-tr" >
               <div class="comment-img">
                 <defaultImg></defaultImg>
               </div>
               <div class="comment-img">
                 <defaultImg></defaultImg>
               </div>
               <div class="comment-img">
                 <defaultImg></defaultImg>
               </div>
              </div>
              <div class="table-footer">
                <p>回复：谢谢你的评价，我们会努力做好服务，欢迎你的下次光临。 拷贝</p>
                <el-input placeholder="请输入内容" v-model="input5">
                  <template slot="prepend">
                    <i class="iconfont icon-biaoqing"></i>
                  </template>
                  <el-button slot="append" >回复</el-button>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="block shop-textr" v-if="isPage">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
      <contentNo v-else></contentNo>
    </div> 
    <contentNo :show="contentNo" v-else></contentNo>
    <el-dialog
      title="商品发货"
      :visible.sync="dialogVisible"
      size="small">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column
          label="商品发货 "
          width="300">
          <template scope="scope">
            <div v-for="goods in  scope.row.goods" style="padding:5px 0"
            class="text-overflow">{{ goods }} 
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="单价(元)">
          <template scope="scope">
            <div v-for="name in scope.row.name" style="padding:5px 0">{{ name }} 
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="数量">
            <template scope="scope">
            <div v-for="number in scope.row.number" style="padding:5px 0">{{ number }} 
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="statu"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="money"
          label="实付现金">
        </el-table-column>
      </el-table>
      <div class="dialog-list">
        <span>收货信息 :</span>
        广东省惠州市东平大道赛格假日广场10楼01号房，陈小姐(收)，13625089966
      </div>
      <div class="dialog-list">
        <span>发货方式  :</span>
        <el-radio class="radio" v-model="ruleForm.radio" label="1">需要物流</el-radio>
        <el-radio class="radio" v-model="ruleForm.radio" label="2">无需物流</el-radio>
      </div>
      <div class="dialog-list">
        <el-form :inline="true" class="demo-form-inline" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="88px" label-position="left">
          <el-form-item label="发货方式:">
            <el-select v-model="ruleForm.dh"  placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              <el-option value="其他" label="其他">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流名称 :" v-if=" ruleForm.dh === '其他'" prop="valueWL">
            <el-input v-model="ruleForm.inputWL" placeholder="0/6"  ></el-input>
          </el-form-item>
          <el-form-item label="快递单号 :" prop="inputWL" >
            <el-input v-model="ruleForm.inputWL" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-list shop-textr">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
import Lib from 'assets/js/Lib';
import contentNo from 'components/contentNo';
import defaultImg from 'components/defaultImg';
export default {
  components: {
    contentNo,defaultImg
  },
  data () {
    return {
        contentNo:'order',
        isShow: true,
        isTable: true,//是否有数据
        isPage: true,//潘墩列表页数多页
        isIndex:true,//评论页显示
        activeName1: 'All',//默认首页显示
        activeName2: 'all',
        dialogVisible:false,
        options:[],
        // radioWL: 1, //物流需求
        // valueWL:'',//物流公司
        // optionsWL:'',//物流公司
        // inputWL:'',//快递单号
        formInline: {
          user: '',
          region: ''
        },
        input5:'',
        pickerOptions2: {
          shortcuts: [{
            text: '近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        tableData: [{
          date: '2016-08-42',
          goods:[
            '中国有嘻哈中国有嘻哈中国有嘻哈中国有嘻哈中国有嘻哈',
            '中国有嘻哈中国有嘻哈中国有嘻哈中国有嘻哈中国有嘻哈'
          ],
          name: ['PGone','1000'],
          number: [
            '1',
            '1'
          ],
          money:'¥720.00',
          statu:'进行中'
        }, {
          date: '2016-08-42',
          goods:['july',''],
          name: ['小白',''],
          number: ['1',''],
          money: '¥5800.00',
          statu:'进行中'
        }],
        ruleForm: {
          radio:'',
          valueWL: '',
          inputWL:'',
          dh: ''
        },
       rules: {
        dh: [
          { required: true, message: '请选择物流公司', trigger: 'blur' },
        ],
        valueWL: [
          { required: true, message: '请输入物流名称', trigger: 'blur' },
        ],
        inputWL: [
          { required: true, message: '请输入订单号', trigger: 'blur' },
        ]
      }
    }
  },
  watch:{
    '$route'(a,b){
      //this.$router.push({path:b.path})
    }
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
      this.$router.push({path:tab.name})
      this.isIndex = tab.name;
    },
    handleDelete(index, data){
      console.log(index,data);
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
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
      this.ruleForm.dh = '';
      this.ruleForm.radio ='';
      this.$refs[formName].resetFields();
      this.dialogVisible =false;
    }
  },
  mounted(){
    let _href = window.location.hash.split('/')[1];
    this.activeName1 = _href;
  }
}
</script>

<style lang="less">
 
</style>

