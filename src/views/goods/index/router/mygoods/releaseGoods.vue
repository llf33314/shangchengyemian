<template>
  <div class="mygoods-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/goodspage' }">我的商品</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mygoods-main">
        <div class="shop-steps">
            <el-steps :active="active"  center  >
                <el-step title="编辑商品基本信息">
                </el-step>
                <el-step title="编辑商品详情页"></el-step>
                <el-step title="发布商品成功"></el-step>
            </el-steps>
        </div>
        <div class="mygoods-content" v-if="isOnePage">
            <div class="mygoods-item">
                <div class="item-title">基本信息</div>
                <div class="item-content">
                   <el-form :model="basicsInfo"  ref="basicsInfo" label-width="105px" class="demo-ruleForm">
                    <el-form-item label="选择店铺 :" prop="shop" :rules="rules.shop">
                       <el-select v-model="data.pro.shopId" placeholder="请选择店铺">
                        <el-option
                            v-for="item in shopList"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品分组 :" prop="grouping" :rules="rules.grouping">
                        <!-- <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions2"
                            @change="handleChange">
                        </el-cascader> -->
                        <el-select v-model="fromSelected.grouping" multiple placeholder="请选择分组信息" @change="grouping(fromSelected.grouping)">
                            <el-option
                            v-for="item in data.proGroupList"
                            :key="item.groupPId"
                            :label="item.groupName"
                            :value="item.groupPId">
                            </el-option>
                        </el-select>
                        <span class="fontBlue">新建分组</span>
                    </el-form-item>
                     <el-form-item label="商品类型 :" prop="goodsStatus">
                         <el-radio-group v-model="data.pro.proTypeId">
                            <el-radio :label="0" class="item-radio">实物商品</el-radio>
                            <el-radio :label="1" class="item-radio">虚拟商品（非会员卡，无需物流）</el-radio>
                            <el-radio :label="2" class="item-radio">虚 拟商品（会员卡，无需物流）</el-radio>
                            <el-radio :label="3" class="item-radio">虚拟商品（流量包，无需物流）</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="mygoods-item">
                <div class="item-title">库存/规格</div>
                <div class="item-content">
                   <el-form :model="ruleForm" ref="ruleForm" label-width="105px" class="demo-ruleForm">
                        <el-form-item label="商品规格 :" prop="name">
                            <template>
                                <tableSpec :tableData="basicsInfo"></tableSpec>
                            </template>
                        </el-form-item>
                        <el-form-item label="商品库存 :">
                            <template>
                                <tableList :tablelists="basicsInfo"></tableList>
                            </template>
                        </el-form-item>
                        <el-form-item label="商品参数 :" prop="region" :inline="true">
                            <el-select v-model="formInline.region" placeholder="请选择商品参数名">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-select v-model="formInline.region" placeholder="请选择商品参数值">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="总库存 :" :rules="rules.region" prop="region">
                            <div class="item-inline">
                                <el-input v-model="formInline.user"></el-input>
                            </div>
                            <span>
                                <el-checkbox v-model="checked2">页面不显示商品库存</el-checkbox>
                            </span>
                            <p class="shop-prompt">总库存为 0 时，会上架到【已售罄的商品】列表里</p>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商品编码 ：" prop="name">
                            <div style="width:220px">
                                <el-input v-model="ruleForm.name"></el-input>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="mygoods-item">
                <div class="item-title">商品信息</div>
                <div class="item-content">
                   <el-form :model="ruleForm" ref="ruleForm" label-width="105px" class="demo-ruleForm">
                        <el-form-item label="商品名称 :" prop="name" :rules="rules.name">
                            <div style="width:460px;" class="item-inline">
                                <el-input v-model="formInline.user"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="价格 :" prop="region" :inline="true" :rules="rules.name">
                            <div class="item-inline">
                                <el-input v-model="input3">
                                    <template slot="prepend">¥</template>
                                </el-input>
                            </div>
                            <div class="item-inline" style="width:180px;color:#999;">
                                <p class="">原价：￥99.99</p>
                                该原价价格只作展示作用
                            </div>
                        </el-form-item>
                        <el-form-item label="商品图片 :" :rules="rules.region" prop="region">
                            <div class="item-img">
                                <imgUpload></imgUpload>
                            </div>
                            <p class="shop-prompt">图片尺寸：870px*716px；您可以拖拽图片调整图片顺序；第一张图片为主图</p>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商品标签 ：" prop="name">
                            <div class="item-inline">
                                <el-input v-model="ruleForm.name"></el-input>
                            </div>
                            <p class="shop-prompt">商品标签最多输入2个字符串</p>
                        </el-form-item>
                        <el-form-item label="商品重量 ：" prop="name" >
                            <div class="item-inline">
                                <el-input v-model="ruleForm.name"></el-input>
                            </div>
                            <div class="item-inline">
                                g
                            </div>
                            <p class="shop-prompt">商品重量最多只能输入大于0的六位小数，如：30.00</p>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="mygoods-item">
                <div class="item-title">物流</div>
                <div class="item-content">
                   <el-form :model="ruleForm" ref="ruleForm" label-width="105px" class="demo-ruleForm">
                        <el-form-item label="运费设置 :" prop="name" :rules="rules.name">
                            <div style="margin-bottom:30px;">
                                <div class="item-inline" style="width:auto">
                                    <el-radio class="radio" v-model="radio" label="1">统一邮费</el-radio>
                                </div>
                                <div class="item-inline">
                                    <el-input v-model="input3">
                                        <template slot="prepend">¥</template>
                                    </el-input>
                                </div>
                            </div>
                            <div>
                                <div class="item-inline" style="width:auto">
                                <el-radio class="radio" v-model="radio" label="1">运费模板</el-radio>
                                </div>
                                <div class="item-inline" style="width:220px">
                                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                        <el-option label="广东谷通科技" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </div>
                                <div class="item-inline" style="width:auto">
                                    <span class="fontBlue">刷新</span>
                                    <span class="fontBlue">新建</span>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="mygoods-item">
                <div class="item-title">其他</div>
                <div class="item-content">
                   <el-form :model="ruleForm" ref="ruleForm" label-width="105px" class="demo-ruleForm">
                        <el-form-item label="每人限购 :" prop="name">
                            <div  class="item-inline">
                                <el-input v-model="formInline.user"></el-input>
                            </div>
                             <p class="shop-prompt">0代表不限购</p>
                        </el-form-item>
                        <el-form-item label="会员折扣 :" prop="region" >
                            <el-checkbox v-model="checked3">参加会员折扣</el-checkbox>
                        </el-form-item>
                        <el-form-item label="使用优惠券 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">开启</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="积分抵扣 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">开启</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="粉币抵扣 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">开启</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="粉币兑换商品 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">开启</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="显示浏览量 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">开启</el-radio>
                            <el-radio class="radio" v-model="radio" label="2">关闭</el-radio>
                        </el-form-item>
                        <el-form-item label="发票 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">有 </el-radio>
                            <el-radio class="radio" v-model="radio" label="2">无 </el-radio>
                        </el-form-item>
                        <el-form-item label="保修 :" prop="region">
                            <el-radio class="radio" v-model="radio" label="1">有 </el-radio>
                            <el-radio class="radio" v-model="radio" label="2">无 </el-radio>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="mygoods-content" v-if="isTowPage">
            编辑商品详情页
        </div>
        <div class="mygoods-content" v-if="isThreePage">
             <div class="shop-addSuccess">
                <i class="el-icon-circle-check"></i>
                <p>发布商品成功</p>
            </div>
        </div>
        <el-button style="margin-top: 12px;" @click="next" v-if="isOnePage">下一步</el-button>
        <el-button type="primary" v-if="isTowPage">保存</el-button>
        <el-button style="margin-top: 12px;"v-if="!isThreePage">返回</el-button>
        <div class="shop-textc" v-if="isThreePage" >
            <el-button type="primary">继续添加</el-button>
            <el-button style="margin-top: 12px;" >返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload'
import tableList from '../../components/tableList'
import tableSpec from '../../components/tableSpec'
export default {
  components: {
      imgUpload,tableList,tableSpec
  },
  data () {
    return {
        title:'发布',
        goodsId:'',//商品id
        data:{},//填充数据
        shopList:{},//店铺列表
        input3:'',
        active: 1,//步骤页初始，
        checked1:true,
        checked2:false,
        checked3:false,
        addoption:false,
        basicsInfo:{
            goodsStatus:'',
            shopOptions: [{ //商品分租
                value: '选项1',
                label: '广东谷通科技'
            }, {
                value: '选项2',
                label: '广东谷通'
            }, {
                value: '选项3',
                label: '广东谷通科技有限公司'
            }],
            grouping:[{ //分租信息
                value: '选项1',
                label: '日用品'
            }, {
                value: '选项2',
                label: '衣服'
            }, {
                value: '选项3',
                label: '电器'
            }, {
                value: '选项4',
                label: '零食'
            }],
            spec:{
                options:[{
                    value: '选项1',
                    label: '日用品'
                }, {
                    value: '选项2',
                    label: '衣服'
                }, {
                    value: '选项3',
                    label: '电器'
                }, {
                    value: '选项4',
                    label: '零食'    
                }],
            }
        },
        fromSelected:{//选中的内容
            shop: '',//店铺
            grouping: [],//分组
            goodsStatus: '',//商品类型
            spec:[]//规格
        },
        formInline: {
            user: '',
            region: ''
            },
        radio: 2,
        ruleForm: {
            shop: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        rules: {
            shop: [
            { required: true, message: '请选择店铺', trigger: 'blur' },
            ],
            grouping: [
            { required: true, message: '没有你所选的分组,请新建', trigger: 'blur' }
            ],
            date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
        },
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: [],
        tableData: [{
            date: '2016-05-02',
            name: ['上','xia'],
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: ['王小虎','王小虎','王小虎'],
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        isOnePage:true,
        isTowPage:false,
        isThreePage:false,
    }
  },
  methods: {
    /**
      下一页跳转
     */
    next(){
      console.log(this.active);
      if(this.active == 1)this.isOnePage =false,this.isTowPage=true;
      if(this.active == 2)this.isTowPage=false,this.isPassPage =false,this.isThreePage=true;
      if(this.active++ > 2) this.active = 1;
    },
    showAddoption(e){
        e?this.addoption = false:this.addoption = true;
    },
    /** 
     *  编辑请求
     */
    editAjax(){
        let _this = this;
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallProductToEdit_post,
            'data':{
                id:_this.goodsId
            },
            'success':function (data){
                console.log(data,'编辑请求数据');
                _this.data = data.data;
                _this.groupListAjax({
                    data:{
                        shopId: _this.data.pro.shopId ,
                        proId: _this.data.pro.id,
                        groups:'',
                    },
                    success(data){
                        console.log(data,'分组');
                        _this.groupListData = data.data.groupList
                    }
                })
            }
        });
    },
    /** 
     *  新增请求
     */
    addAjax(){
        let _this = this;
        let data={};
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallProductAdd_post,
            'data':data,
            'success':function (data){
                    
            }
        });
    },
  },
  mounted(){
    console.log(this.$route.params.id)
    if(this.$route.params.type == 'add'){

    }else{
        this.title = '编辑'
        this.goodsId = this.$route.params.id;
        this.editAjax();
    }
    let _this = this;
    _this.storeList({
        'success'(data) {
            console.log(data,'店铺列表')
            _this.shopList = data.data;
        }
    })
  }
}
</script>

<style lang="less">
@import '../../../less/mygoods.less';
</style>