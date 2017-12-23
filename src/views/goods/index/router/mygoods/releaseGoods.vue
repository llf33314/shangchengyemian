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
            <el-form ref="ruleForm" :rules="rules" :model="form" label-width="105px" class="demo-ruleForm">
                <div class="mygoods-item">
                    <div class="item-title">基本信息</div>
                    <div class="item-content">
                        <el-form-item label="选择店铺 :"  required>                
                        <el-select v-model="form.pro.shopId" placeholder="请选择店铺" @change="changeShopId(form.pro.shopId)" >
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
                                            @change="groupselected"
                                            :value="form.proGroupList"
                                            ref="cascader">
                            </gt-cascader>
                            <router-link to="/grouping">
                                <span class="fontBlue"
                                style="vertical-align:top" >新建分组</span>
                            </router-link>
                        </el-form-item>
                        <el-form-item label="商品类型 :">
                            <el-radio-group v-model="form.pro.proTypeId">
                                <el-radio :label="0" class="item-radio">实物商品</el-radio>
                                <el-radio :label="1" class="item-radio">虚拟商品（非会员卡，无需物流）</el-radio>
                                <el-radio :label="2" class="item-radio">虚 拟商品（会员卡，无需物流）</el-radio>
                                <el-radio :label="3" class="item-radio">虚拟商品（流量包，无需物流）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">库存/规格</div>
                    <div class="item-content">
                            <el-form-item label="商品规格 :"  v-if="form.pro.shopId">
                                <tableSpec :row="form.specList" :shopId="form.pro.shopId" @change="changeSpac"></tableSpec>
                            </el-form-item>
                            <el-form-item label="商品库存 :" v-if=" form.specList !='' && form.specList != null">
                                <tableList :specList="form.specList" :invenList="form.invenList" ref="specForm"></tableList>
                            </el-form-item>
                            <el-form-item label="商品参数 :"  v-if="form.pro.shopId">
                                <gt-param :row="form.paramList" :shopId="form.pro.shopId"  @change="paramSelected"></gt-param>
                            </el-form-item>
                            <el-form-item label="总库存 :" :rules="rules.proStockTotal" prop="pro.proStockTotal" required>
                                <div class="item-inline">
                                    <el-input v-model.number="form.pro.proStockTotal" :disabled=" form.invenList != null " placeholder="0"></el-input>
                                </div>
                                <span>
                                    <el-checkbox v-model="form.pro.isShowStock">页面不显示商品库存</el-checkbox>
                                </span>
                                <span class="shop-prompt">总库存为 0 时，会上架到【已售罄的商品】列表里</span>
                            </el-form-item>
                            <el-form-item label="商品编码 ：">
                                <div style="width:220px">
                                    <el-input v-model="form.pro.proCode"></el-input>
                                </div>
                            </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">商品信息</div>
                    <div class="item-content">
                        <el-form-item label="商品名称 :"  :rules="rules.name" prop="pro.proName" required>
                            <div style="width:460px;" class="item-inline">
                                <el-input v-model="form.pro.proName" ></el-input>
                            </div>
                            <span class="shop-prompt">
                                商品名称最多输入100位字符串
                            </span>
                        </el-form-item>
                        <el-form-item label="价格 :" prop="pro.proPrice" :inline="true" :rules="rules.proPrice">
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
                        <el-form-item label="商品图片 :" :rules="rules.imageList" prop="imageList">
                            <div class="imgboxUP">
                                <gt-material :path="imgUrl" 
                                            :imgLists="form.imageList" 
                                            :Draggable="true" 
                                            :selecType="true"
                                            @change="changeIMG"></gt-material>
                            </div>
                            <span style="color:#ff4949;font-size:12px" v-if="isImgno">请上传至少一张商品图片</span>
                            <p class="shop-prompt">
                                建议尺寸：700px*700px,您可以拖拽图片顺序,第一张图片为主图
                            </p>
                        </el-form-item>
                        <el-form-item label="商品标签 ：" >
                            <div class="item-inline">
                                <el-input v-model="form.pro.proLabel"></el-input>
                            </div>
                            <span class="shop-prompt">商品标签最多输入2个字符</span>
                        </el-form-item>
                        <el-form-item label="商品重量 ：">
                            <div class="item-inline">
                                <el-input v-model="form.pro.proWeight"></el-input>
                            </div>
                            <span>g</span>
                            <span class="shop-prompt">
                                商品重量最多只能输入大于0的六位小数，如：30.00
                            </span> 
                        </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">物流</div>
                    <div class="item-content">
                        <el-form-item label="运费设置 :" prop="pro.proFreightPrice" :rules="rules.proFreightPrice">
                            <div class="item-inline" style="width:auto">
                                <el-radio-group v-model.number="form.pro.proFreightSet" >
                                    <el-radio class="radio" :label="1"
                                        >统一邮费
                                    </el-radio>
                                </el-radio-group>
                            </div>
                            <div class="item-inline">
                                <el-input v-model.number="form.pro.proFreightPrice">
                                    <template slot="prepend">¥</template>
                                </el-input>
                            </div>
                        </el-form-item>
                        <el-form-item >
                            <div class="item-inline" style="width:auto">
                                <el-radio-group v-model.number="form.pro.proFreightSet" @change="proFreightSet(form.pro.proFreightSet)">
                                    <el-radio class="radio" :label="2"
                                        >运费模板
                                    </el-radio>
                                </el-radio-group>
                            </div>
                            <div class="item-inline" style="width:220px">
                                <el-select v-model="form.pro.proFreightTempId" placeholder="请选择运费模板">
                                    <el-option  :key="logisticsList.id"
                                                :label="logisticsList.name"
                                                :value="logisticsList.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="item-inline" style="width:auto">
                                <span class="fontBlue">刷新</span>
                                <span class="fontBlue">新建</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="物流重量 :" v-if=" form.pro.proFreightSet == 2">
                            <tableList :specList="form.specList" :invenList="form.invenList" :type="'logisticsList'"
                                        ref="logisticsForm"></tableList>
                        </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">其他</div>
                    <div class="item-content">
                        <el-form-item label="每人限购 :" >
                            <div  class="item-inline">
                                <el-input v-model="form.pro.proRestrictionNum"></el-input>
                            </div>
                            <span class="shop-prompt">0代表不限购</span>
                        </el-form-item>
                        <el-form-item label="会员折扣 :"  >
                            <el-checkbox v-model.number="form.pro.isMemberDiscount" 
                                        :true-label= "1" :false-label="0" >参加会员折扣</el-checkbox>
                        </el-form-item>
                        <el-form-item label="使用优惠券 :" >
                            <el-radio-group v-model.number="form.pro.isCoupons">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="积分抵扣 :" >
                            <el-radio-group v-model.number="form.pro.isIntegralDeduction">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="粉币抵扣 :">
                            <el-radio-group v-model.number="form.pro.isFenbiDeduction">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="粉币兑换商品 :" >
                            <el-radio-group v-model.number="form.pro.isFenbiChangePro">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="显示浏览量 :">
                            <el-radio-group v-model.number="form.pro.isShowViews">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="发票 :" >
                            <el-radio-group v-model.number="form.pro.isInvoice">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="保修 :" >
                        <el-radio-group v-model.number="form.pro.isWarranty">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
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
        <el-button style="margin-top: 12px;" @click="next()" v-if="active != 3">下一步</el-button>
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
    var formMoney = (rule, value, callback) => {
        let reg =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;
        if(this.form.pro.proFreightSet != 1) return callback();
        if(!value){
            return callback(new Error('请输入统一邮费价'));
        }else if(!reg.test(value)){
            return callback(new Error('价格最多只能输入六位整数+两位小数,如：300000.00'));
        }
        callback()
    };
    return {
        active: 1,//步骤页初始，
        title:'发布',
        goodsId:'',//商品id
        shopList:[],//店铺列表
        form:{//默认值
            pro:{
               shopId:'',//店铺id
               proTypeId:0,//商品类型
               proStockTotal: null,//总库存
               proFreightSet:1,//物流
               proFreightTempId:'',//物流id
               isMemberDiscount:1,//会员折扣
               isCoupons:1,//使用优惠券
               isIntegralDeduction:0,//积分抵扣
               isFenbiDeduction:0,//粉币抵扣
               isFenbiChangePro:0,//粉币兑换商品
               isShowViews:0,//显示浏览量
               isInvoice:0,//发票
               isWarranty:0,//保修
            },
           imageList:[],
           proGroupList:[]
        },//保存填充数据
        paramList:[],//参数列表
        imgUrl:'',//图片域名
        isImgno:false,//图片验证
        logisticsList:'',//物流数据
        rules: {
            //分组
            name: [
                { required: true, message: '请输入商品名称', trigger: 'blur' },
                { min: 1, max: 100, message: '长度在 100 个字符内', trigger: 'blur' }
            ],
            proPrice: [
                { required: true, message: '请输入商品价格', trigger: 'blur' },
                { validator: formMoney, trigger: 'blur'}
            ],
            proStockTotal: [
                { type: 'number' , required: true, message: '请输入总库存(整数)', trigger: 'blur' }
            ],
            proFreightPrice: [
               { validator: formMoney, trigger: 'blur'}
            ]
        },
        newSpecList:[]//暂存新列表
    }
  },
  methods: {
    /**
      下一页跳转
     */
    next(){
      if(this.active == 1){
        let submit = this.submitForm('ruleForm');                   //商品信息验证结果
        let cascaderSubmit = this.$refs.cascader.submitForm();      //分组验证结果
        let imgSubmit= this.changeIMG();                            //上传图片验证结果
        let specSubmit = this.$refs.specForm.allRules();            //规格库存列表验证结果
        let logisticsSubmit = this.$refs.logisticsForm.allRules();  //运费物流列表验证结果

        if(submit && cascaderSubmit && imgSubmit){
            // this.active == 2;
            console.log(this.form,'this.form')
        }
        return
      }
      if(this.active == 2){
          console.log(this.active,'this.active')
      }
      if(this.active++ > 2) this.active = 1;
    },
    /** 
     * 验证表单
     */
    submitForm(formName) {
        let flag ;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true;
          } else {
            flag = false;
            return false;
          }
        });
        return flag;
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
                //console.log(data,'编辑请求数据');
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
     * 切换店铺id
     */
    changeShopId(shopId){
        this.freightAjax(shopId);
    },
    /** 
     * 选择分组
     * @param data 选中数据
     */
    groupselected(data){
        this.form.proGroupList = data;
        //console.log(data,'选中分组')
    },
    /** 
     * 选择参数
     * @param data 选中数据
     */
    paramSelected(data){
        this.form.paramList = data;
        //console.log(data,'商品参数')
    },
    /** 
     * 商品规格
     */
    changeSpac(data){
        console.log(data,'商品规格specList',data.length);
        let add = false;
        data.forEach((item,i)=>{
            if(item.specValues.length == 0 && add){
                add = true;
            }
        })
        
        console.log(add)
        if(add){
            console.log(this.newSpecList,'this.newSpecList')
            this.form.specList = this.newSpecList;
        }else{
            if( data.length == 0 ) return;
            let _this = this;
            _this.form.specList = data;
            _this.newSpecList = data;
            //请求数据需要
            let _data2={
                specificas:[ {
                    specificaNameId: null,        //规格名称ID
                    specificaName: null,            //规格名称
                    specificaValueId: null,         //规格值ID
                    specificaValue: null,          //规格值
                }] ,
                invPrice: null,          // 价格
                invNum: null,           //数量
                invCode: null,          //商家编码
                isDefault: 0,          //是否默认
                logisticsWeight: null   //重量
            } 
            //数据重组 --传值--specificaIds组合(笛卡尔乘积)
           

            var result=[];//结果保存到这个数组
            function toResult(arrIndex,aresult){
                if(arrIndex >= data.length) {
                    result.push(aresult);
                    return;
                }
                var aArr = data[arrIndex].specValues;
                if(!aresult) aresult = [];
                for(var i=0; i<aArr.length; i++){
                    var theResult = aresult.slice(0,aresult.length);
                    theResult.push(aArr[i].specValueId);
                    toResult(arrIndex+1,theResult);
                }
            }
            toResult(0);
            // 显示数据
            let arr=[]
            //显示列表需要 -- 新增时
            if(_this.$route.params.id === 'add'){
                result.forEach((item,i)=>{
                let data1={
                        id: null,
                        productId: null,
                        specificaIds: null,     //规格ID
                        invPrice: null,          //库存价格
                        invNum: null,            //库存数量
                        invCode: null,         //产品编码
                        invSaleNum: null,       //销量
                        isDefault: 0,             //是否默认  0没有 1是
                        specificaImgId: 0,        // 有图片的规格ID
                        logisticsWeight: null,    //物流重量
                        specList: null
                    }
                    data1.specificaIds = item.toString();
                    arr.push(data1);
                })
                
                _this.$set(_this.form,'invenList',arr) 
            }
            console.log(_this.form.invenList,'商品规格invenList');
        }
    },
    /** 
     * 物流id
     */
    proFreightSet(e){
        if(e==2){
            //物流模板id默认
            this.form.pro.proFreightTempId = this.logisticsList;
            this.form.pro.proFreightPrice = null;
        }else{
            this.form.pro.proFreightTempId = null;
            //this.submitForm('ruleForm');
            //this.resetForm('ruleForm');
        }
    },
    /** 
     * 表单验证清楚
     */
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    /** 
     * 图片验证
     */
    changeIMG(data){
        let flag = true;
        if(this.form.imageList.length>0){
            this.isImgno = false;
        }else{
            this.isImgno = true;
            flag = false;
        }
        return flag;
    },
    /** 
     * 根据店铺ID获取物流信息
     * @param ID 
     */
    freightAjax(id){
        let _this = this;
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallFreightGetFreightByShopId_post,
            'data':{
                shopId: id
            },
            'success':function (data){
                _this.logisticsList = data.data;
                if(_this.form.pro.proFreightSet == 1) {
                   _this.form.pro.proFreightTempId = null;
                    return
                }
            }
        });
    }
  },
  mounted(){
    if(this.$route.params.id === 'add'){
        this.form.imageList=[];
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
                //_this.freightAjax(_this.form.pro.shopId);
            }
        }
    })
    //console.log(_this.form,'form')
  }
}
</script>

<style lang="less">
@import '../../../less/mygoods.less';
</style>