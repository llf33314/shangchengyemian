<template>
  <div class="mygoods-wrapper">
    <div class="common-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mygoods' }">我的商品</el-breadcrumb-item>
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
        <div class="mygoods-content" v-if="active == 1">
            <div class="mygoods-item">
                <div class="item-title">基本信息</div>
                <div class="item-content">
                   <el-form ref="ruleForm" :rules="rules" :model="form" label-width="105px" class="demo-ruleForm">
                    <el-form-item label="选择店铺 :"  required>
                       <el-select v-model="form.pro.shopId" placeholder="请选择店铺">
                        <el-option
                            v-for="item in shopList"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品分组 :"  required >
                        <gt-cascader    :width="'200px'"
                                        @change="groupselected(index)"
                                        :value="form.proGroupList"
                                        ref="cascader">
                        </gt-cascader>
                        <router-link to="/grouping">
                            <span class="fontBlue"
                            style="vertical-align:top" >新建分组</span>
                        </router-link>
                    </el-form-item>
                     <el-form-item label="商品类型 :" prop="goodsStatus">
                         <el-radio-group v-model="form.pro.proTypeId">
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
                            <tableSpec :row="form.specList" :shopId="form.pro.shopId"></tableSpec>
                        </el-form-item>
                        <el-form-item label="商品库存 :" v-if=" form.specList !='' && form.specList !=null">
                            <tableList :specList="form.specList" :invenList="form.invenList"></tableList>
                        </el-form-item>
                        <el-form-item label="商品参数 :" prop="region" >
                            <gt-param :row="form.paramList" :shopId="form.pro.shopId"  @change="paramSelected"></gt-param>
                        </el-form-item>
                        <el-form-item label="总库存 :" :rules="rules.region" prop="region">
                            <div class="item-inline">
                                <el-input v-model="form.pro.proStockTotal" :disabled="true" placeholder="0"></el-input>
                            </div>
                            <span>
                                <el-checkbox v-model="form.pro.isShowStock">页面不显示商品库存</el-checkbox>
                            </span>
                            <p class="shop-prompt">总库存为 0 时，会上架到【已售罄的商品】列表里</p>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商品编码 ：" prop="name">
                            <div style="width:220px">
                                <el-input v-model="form.pro.proCode"></el-input>
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
                                <el-input v-model="form.pro.proName"></el-input>
                                
                            </div>
                            <span class="shop-prompt">
                                商品标签最多输入200个字符
                            </span>
                        </el-form-item>
                        <el-form-item label="价格 :" prop="region" :inline="true" :rules="rules.name">
                            <div class="item-inline">
                                <el-input v-model="form.pro.proPrice">
                                    <template slot="prepend">¥</template>
                                </el-input>
                            </div>
                            <div class="item-inline" style="width:135px;color:#999;">
                                <p style="width:100%">原价：￥99.99</p>
                            
                            </div>
                            <span class="shop-prompt">该原价价格只作展示作用</span>
                        </el-form-item>
                        <el-form-item label="商品图片 :" :rules="rules.region" prop="region">
                            <div class="imgboxUP">
                                <gt-material :path="imgUrl" 
                                             :imgLists="form.imageList" 
                                             :Draggable="true" 
                                             :selecType="true"></gt-material>
                            </div>
                            <p class="shop-prompt">
                                建议尺寸：700px*700px,您可以拖拽图片顺序,第一张图片为主图
                            </p>
                        </el-form-item>
                        <el-form-item label="商品标签 ：" prop="name">
                            <div class="item-inline">
                                <el-input v-model="form.pro.proLabel"></el-input>
                            </div>
                            <span class="shop-prompt">商品标签最多输入2个字符</span>
                        </el-form-item>
                        <el-form-item label="商品重量 ：" prop="name" >
                            <div class="item-inline">
                                <el-input v-model="form.pro.proWeight"></el-input>
                            </div>
                            <span>g</span>
                            <span class="shop-prompt">
                                商品重量最多只能输入大于0的六位小数，如：30.00
                            </span>
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
                                    <el-radio class="radio" v-model.number="form.pro.proFreightSet" :label="1">统一邮费{{form.pro.proFreightSet}}</el-radio>
                                </div>
                                <div class="item-inline">
                                    <el-input v-model="form.pro.proFreightPrice">
                                        <template slot="prepend">¥</template>
                                    </el-input>
                                </div>
                            </div>
                            <div>
                                <div class="item-inline" style="width:auto">
                                <el-radio class="radio" v-model.number="form.pro.proFreightSet" :label="2">运费模板</el-radio>
                                </div>
                                <div class="item-inline" style="width:220px">
                                    <el-select v-model="form.pro.proFreightTempId" placeholder="请选择活动区域">
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
                        <el-form-item label="物流重量 :" v-if="form.specList !='' && form.pro.proFreightSet == 2">
                            <tableList :specList="form.specList" :invenList="form.invenList"></tableList>
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
                                <el-input v-model="form.pro.proRestrictionNum"></el-input>
                            </div>
                             <span class="shop-prompt">0代表不限购</span>
                        </el-form-item>
                        <el-form-item label="会员折扣 :" prop="region" >
                            <el-checkbox v-model.number="form.pro.isMemberDiscount" 
                                        :true-label= "1" :false-label="0" >参加会员折扣</el-checkbox>
                        </el-form-item>
                        <el-form-item label="使用优惠券 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isCoupons">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="积分抵扣 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isIntegralDeduction">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="粉币抵扣 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isFenbiDeduction">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="粉币兑换商品 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isFenbiChangePro">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="显示浏览量 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isShowViews">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="发票 :" prop="region">
                            <el-radio-group v-model.number="form.pro.isInvoice">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="保修 :" prop="region">
                           <el-radio-group v-model.number="form.pro.isWarranty">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="mygoods-content" v-if="active == 2">
            编辑商品详情页
        </div>
        <div class="mygoods-content" v-if="active == 3">
             <div class="shop-addSuccess">
                <i class="el-icon-circle-check"></i>
                <p>发布商品成功</p>
            </div>
        </div>
        <el-button style="margin-top: 12px;" @click="next" v-if="active != 3">下一步</el-button>
        <el-button type="primary" v-if="active == 2">保存</el-button>
        <el-button style="margin-top: 12px;" v-if="active != 3">返回</el-button>
        <div class="shop-textc" v-if="active == 3" >
            <el-button type="primary">继续添加</el-button>
            <el-button style="margin-top: 12px;" >返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import gtParam from './components/param';//选择参数模块
import tableList from './components/tableList' ;//规格列表
import tableSpec from './components/tableSpec';//选择规格
import gtCascader from './components/cascader';//多选分类多级联动下拉框
import gtMaterial from 'components/material/material' 
//import param
export default {
  components: {
    tableList,tableSpec,gtCascader,gtParam,gtMaterial
  },
  data () {
    return {
        active: 1,//步骤页初始，
        title:'发布',
        goodsId:'',//商品id
        shopList:[],//店铺列表
        form:{
            pro:{
               shopId:'',
               proTypeId:0,
           },
           proGroupList:[]
        },//保存填充数据
        paramList:[],//参数列表
        imgUrl:'',//图片域名
        aaa:1,
        ruleForm: {
            grouping: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        rules: {
            //分组
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
    }
  },
  methods: {
    /**
      下一页跳转
     */
    next(){
      if(this.active == 1)this.isOnePage =false,this.isTowPage=true;
      if(this.active == 2)this.isTowPage=false,this.isPassPage =false,this.isThreePage=true;
      if(this.active++ > 2) this.active = 1;
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
                _this.form = data.data;
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
    /** 
     * 选择分组
     * @param data 选中数据
     */
    groupselected(data){
        this.form.proGroupList = data;
    },
    /** 
     * 选择参数
     * @param data 选中数据
     */
    paramSelected(data){
        this.form.paramList = data;
    },
  },
  mounted(){
    if(this.$route.params.id === 'add'){
        
    }else{
        this.title = '编辑'
        this.goodsId = this.$route.params.id;
        this.editAjax();
    }
    let _this = this;
    _this.storeList({
        'success'(data) {
            _this.shopList = data.data;
            _this.imgUrl = data.imgUrl;
            if(_this.$route.params.id === 'add'){
                _this.form.pro.shopId = _this.shopList[0].id;
            }
        }
    })
    console.log(_this.form,'form')
  }
}
</script>

<style lang="less">
@import '../../../less/mygoods.less';
</style>