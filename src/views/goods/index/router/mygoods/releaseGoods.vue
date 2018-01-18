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
                        <el-select v-model="form.pro.shopId" placeholder="请选择店铺" @change="changeShopId(form.pro.shopId)" :disabled="$route.params.id !='add'">
                            <el-option
                                v-for="item in shopList"
                                :key="item.id"
                                :label="item.sto_name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品分组 :"  required>
                            <gt-cascader    :width="'200px'"
                                            @change="groupselected"
                                            :value="form.proGroupList"
                                            :ids="{
                                               shopId: form.pro.shopId
                                            }"
                                            ref="cascader">
                            </gt-cascader>
                            <router-link to="/grouping">
                                <span class="fontBlue"
                                style="vertical-align:top" >新建分组</span>
                            </router-link>
                        </el-form-item>
                        <el-form-item label="商品类型 :">
                            <el-radio-group v-model="form.pro.proTypeId" @change="changeTypeId(form.pro.proTypeId)">
                                <el-radio :label="0" class="item-radio">实物商品</el-radio>
                                <el-radio :label="1" class="item-radio">虚拟商品（非会员卡，无需物流）</el-radio>
                                <el-radio :label="2" class="item-radio">虚拟商品（会员卡，无需物流）</el-radio>
                                <!-- <el-radio :label="3" class="item-radio">虚拟商品（卡券包，无需物流）</el-radio> -->
                                <el-radio :label="4" class="item-radio" v-if="isFlowList">虚拟商品（流量包，无需物流）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item 
                            :label="form.pro.proTypeId==2?'会员卡':form.pro.proTypeId==3?'卡券包':'流量包'"
                            v-if="form.pro.proTypeId != 0 && form.pro.proTypeId != 1">
                            <!--会员卡-->
                            <el-radio-group v-if="form.pro.proTypeId == 2" 
                                            v-model.number="form.pro.memberType">
                                <el-radio v-for="card in cardList" 
                                            :label="card.ctId" 
                                            class="item-radio"
                                            :key="card.ctId"
                                        >{{card.ctName}}</el-radio>
                            </el-radio-group>
                            <!--卡券包-->
                            <div v-if="form.pro.proTypeId == 3" >
                                <el-radio-group v-if="form.pro.proTypeId == 3" 
                                                v-model.number="form.pro.cardType" 
                                                @change="changeCardType(form.pro.cardType)">
                                    <el-radio v-for="card in cardReceiveList" 
                                                :label="card.id" 
                                                class="item-radio"
                                                :key="card.id"
                                    >{{card.cardsName}}</el-radio>
                                </el-radio-group>
                                 <el-table :data="cardReceiveItem.messageList"
                                    style="width:500px"
                                    border>
                                    <el-table-column
                                        prop="cardName"
                                        label="卡券名">
                                    </el-table-column>
                                    <el-table-column
                                        prop="num"
                                        label="卡券数量">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!--流量包-->
                            <el-table v-if="form.pro.proTypeId == 4"
                                :data="flowList"
                                style="width:500px"
                                border>
                                 <el-table-column
                                    label="选择"
                                    prop="id"
                                    width="80">
                                        <template scope="scope">
                                            <el-radio class="radio" 
                                                v-model.number="form.pro.flowId" 
                                                :label="Number(scope.row.id)">
                                                &nbsp
                                            </el-radio>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                prop="type"
                                label="流量包名">
                                </el-table-column>
                                <el-table-column
                                prop="count"
                                label="流量包数量">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">库存/规格</div>
                    <div class="item-content">
                            <el-form-item label="商品规格 :"  v-if="form.pro.shopId">
                                <table-spec ref="specForm"
                                            :row="form.specList" 
                                            :shopId="form.pro.shopId" 
                                            :isType="form.pro.isType"
                                            :noUpSpec="form.pro.noUpSpec"
                                            @change="changeSpac"></table-spec>
                            </el-form-item>
                            <el-form-item label="商品库存 :" v-if=" form.specList !='' && form.specList != null && form.invenList.length>0">
                                <table-list ref="invenForm" 
                                            :specList="form.specList" 
                                            :invenList="form.invenList"
                                            :isType="form.pro.isType"
                                            :noUpSpec="form.pro.noUpSpec"   
                                            @stockTotal="changeStock" 
                                            @change="changeInven"></table-list>
                            </el-form-item>
                            <el-form-item label="商品参数 :"  v-if="form.pro.shopId">
                                <gt-param :row="form.paramList" :shopId="form.pro.shopId"  @change="paramSelected"></gt-param>
                            </el-form-item>
                            <el-form-item label="总库存 :" :rules="rules.proStockTotal" prop="pro.proStockTotal" required>
                                <div class="item-inline">
                                    <el-input v-model.number="form.pro.proStockTotal" :disabled=" form.invenList != '' && form.invenList.length>0" placeholder="请输入总库存"></el-input>
                                </div>
                                <span>
                                    <el-checkbox v-model="form.pro.isShowStock">页面不显示商品库存</el-checkbox>
                                </span>
                                <span class="shop-prompt">总库存为 0 时，会上架到【已售罄的商品】列表里</span>
                            </el-form-item>
                            <el-form-item label="商品编码 ：">
                                <div style="width:220px">
                                    <el-input v-model="form.pro.proCode" placeholder="请输入商品编码"></el-input>
                                </div>
                            </el-form-item>
                    </div>
                </div>
                <div class="mygoods-item">
                    <div class="item-title">商品信息</div>
                    <div class="item-content">
                        <el-form-item label="商品名称 :"  :rules="rules.name" prop="pro.proName" required>
                            <div style="width:460px;" class="item-inline">
                                <el-input v-model="form.pro.proName" placeholder="请输入商品名称"></el-input>
                            </div>
                            <span class="shop-prompt">
                                商品名称最多输入100位字符串
                            </span>
                        </el-form-item>
                        <el-form-item label="价格 :" prop="pro.proPrice" :inline="true" :rules="rules.proPrice">
                            <div class="item-inline" style="width:130px">
                                <el-input v-model.number="form.pro.proPrice" placeholder="请输入价格">
                                    <template slot="prepend">¥</template>
                                </el-input>
                            </div>
                            <div class="item-inline" style="width:168px;color:#999;">
                                 <el-input v-model.number="form.pro.proCostPrice" placeholder="99.99">
                                    <template slot="prepend">原价：¥ </template>
                                </el-input>
                            </div>
                            <span class="shop-prompt">该原价价格只作展示作用</span>
                        </el-form-item>
                        <el-form-item label="商品图片 :" required>
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
                                <el-input v-model="form.pro.proLabel"  placeholder="请输入商品标签"></el-input>
                            </div>
                            <span class="shop-prompt">商品标签最多输入2个字符</span>
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
                                <el-input v-model.number="form.pro.proFreightPrice" placeholder="统一邮费">
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
                                <el-select v-model.number="form.pro.proFreightTempId" placeholder="请选择运费模板" @change="selectFreight">
                                    <el-option  v-for="log in logisticsList " 
                                                :key="log.id"
                                                :label="log.name"
                                                :value="log.id">
                                                {{log.name}}
                                    </el-option>
                                    <!-- <el-option  :key="logisticsList.id"
                                                :label="logisticsList.name"
                                                :value="logisticsList.id">
                                    </el-option> -->
                                </el-select>
                            </div>
                            <div class="item-inline" style="width:auto">
                                <span class="fontBlue" @click="freightAjax(form.pro.proFreightTempId)">刷新</span>
                                <span class="fontBlue" @click="addLogistics">新建</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="物流重量 :" v-if=" form.pro.proFreightSet == 2 && selectFreightType == 2 && form.invenList.length>0 && logisticsList.length>0">
                            <tableList :specList="form.specList" :invenList="form.invenList" :type="'logisticsList'"
                                        ref="logisticsForm" ></tableList>
                        </el-form-item>
                        <el-form-item label="物流重量 ：" v-else-if=" form.pro.proFreightSet == 2 && selectFreightType == 2 && (form.invenList.length == 0 || logisticsList.length == 0)">
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
                    <div class="item-title">其他</div>
                    <div class="item-content">
                        <el-form-item label="每人限购 :" >
                            <div  class="item-inline">
                                <el-input v-model="form.pro.proRestrictionNum" placeholder="请输入限购数"></el-input>
                            </div>
                            <span class="shop-prompt">0代表不限购</span>
                        </el-form-item>
                        <el-form-item label="会员折扣 :"  >
                            <el-checkbox v-model.number="form.pro.isMemberDiscount" 
                                        :true-label= "1" :false-label="0" >参加会员折扣</el-checkbox>
                        </el-form-item>
                        <el-form-item label="允许7天退货 :" >
                            <el-radio-group v-model.number="form.pro.isReturn">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="0">关闭</el-radio>
                            </el-radio-group>
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
            <div class="editor-box">
                <div class="editor-goodsinfo">
                    商品信息：
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请输入商品信息"
                        v-model="form.proDetail.productMessage">
                    </el-input>
                </div>
                <div class="editor-goodsinfo">
                    商品简介（微信分享给好友时会显示此文案）
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请输入商品简介"
                        v-model="form.proDetail.productIntrodu">
                    </el-input>
                </div>
                <div class="editor-trigger">
                    <span>商品详情：</span>
                    <div id="editor" v-html="form.proDetail.productDetail" 
                        style="min-height:200px">
                    </div>
                </div>
            </div>
        </div>
        <div class="mygoods-content" v-if="active == 3">
             <div class="shop-addSuccess">
                <i class="el-icon-circle-check"></i>
                <p>发布商品成功</p>
            </div>
        </div>
        <el-button style="margin-top: 12px;" @click="next()" v-if="active == 1">下一步</el-button>
        <el-button type="primary" v-if="active == 2">保存</el-button>
        <el-button type="primary" v-if="active == 2" @click="changeData(2)">预览</el-button>
        <el-button style="margin-top: 12px;" v-if="active == 1 " @click="back_go()">返回</el-button>
        <el-button style="margin-top: 12px;" v-if="active == 2 " @click=" active=1">返回</el-button>
        <div class="shop-textc" v-if="active == 3" >
            <el-button type="primary" @click="to_add()">继续添加</el-button>
            <router-link to='/mygoods'>
                <el-button style="margin-top: 12px;" >返回 </el-button>
            </router-link>
        </div> 
    </div>
  </div>
</template>
<script>

import Lib from 'assets/js/Lib';
import gtMaterial from 'components/material/material' //素材库
import gtParam from './components/param';//选择参数模块
import tableList from './components/tableList' ;//规格列表
import tableSpec from './components/tableSpec';//选择规格
import gtCascader from './components/cascader';//多选分类多级联动下拉框

//import param
export default {
  components: {
    tableList,tableSpec,gtCascader,gtParam,gtMaterial
  },
  data () {
    var formMoney = (rule, value, callback) => {
        let reg =/^[0-9]{1}\d{0,5}(\.\d{1,2})?$/;
        if(this.form.pro.proFreightSet != 1) return callback();
        if(typeof value != 'number'){
            return callback(new Error('请输入统一邮费价'));
        }else if(!reg.test(value)){
            return callback(new Error('价格最多只能输入六位整数+两位小数,如：300000.00'));
        }
        callback()
    };
    return {
        textarea3:'',
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
                isReturn: 1,//允许退款
                isCoupons:1,//使用优惠券
                isIntegralDeduction:0,//积分抵扣
                isFenbiDeduction:0,//粉币抵扣
                isFenbiChangePro:0,//粉币兑换商品
                isShowViews:0,//显示浏览量
                isInvoice:0,//发票
                isWarranty:0,//保修
                memberType:0,//购买会员卡类型 
                cardType:0,//购买卡券包id
                flowId: 0, //流量id，用于流量购买
                flowRecordId: 0, //流量冻结id，用于流量购买
                isSpecifica:0,//是否有规格
                proWeight:0,//商品重量
                proCode:null,//商家编码
            },
            proDetail:{
                productDetail: null,        //商品详情
                productIntrodu: null,       //商品简介 
                productMessage: null,           //商品信息
                pdata: null,                      //数据
                pcss: null  
            },
           imageList:[],
           proGroupList:[],
           invenList:[],
        },//保存填充数据
        selectFreightType:null,
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
                { type: 'number',required: true, message: '请输入商品价格', trigger: 'blur' },
                { validator: formMoney, trigger: 'blur'}
            ],
            proStockTotal: [
                { type: 'number' , required: true, message: '请输入总库存(整数)', trigger: 'blur' }
            ],
            proFreightPrice: [
               { validator: formMoney, trigger: 'blur'}
            ]
        },
        newSpecList:[],//暂存新列表
        newimageList:[],//图片数据

        cardList:[],//会员卡列表
        cardReceiveList:[],//卡券包列表
        cardReceiveItem:{},//卡卷包选择模块
        flowList:[],//流量包列表
        isFlowList:true,//流量包显示
        webPath:'',//手机端域名

        editorOption:{}//编辑器参数
    }
  },
  watch:{
      active(a){
          if(a==2){
              this.$nextTick(()=>{
                let E = window.wangEditor;
                let editor2 = new E('editor')
                editor2.create()
                $('#editor').css({
                    height:'auto'
                })
              })
          }
      }
  },
  methods: {
      back_go(){
          window.history.go(-1);
      },
    /**
      下一页跳转
     */
    next(){
        let _this = this;
        if(this.active == 1){
            let submit = this.submitForm('ruleForm');                   //商品信息验证结果
            let cascaderSubmit = this.$refs.cascader.submitForm();      //分组验证结果
            let imgSubmit= this.IMGRules();              //上传图片验证结果
            if(this.form.pro.proStockTotal == null && _this.form.invenList.length > 0){
                _this.$refs.invenForm.allRules()
            }
        //基本信息验证
            if(submit && cascaderSubmit && imgSubmit){
                //有规格验证和库存验证
                if(_this.form.invenList.length>0  && _this.form.specList.length>0){
                    let specListSubmit = this.$refs.specForm.allRules()    //规格选择列表
                    let invenSubmit = this.$refs.invenForm.allRules();//规格库存列表验证结果
                    if(specListSubmit && invenSubmit){
                        if(this.form.pro.proFreightSet == 2 && this.selectFreightType == 2)  {
                            let logisticsSubmit = this.$refs.logisticsForm.allRules();  //运费物流列表验证结果
                            if(invenSubmit && logisticsSubmit ){
                                this.active = 2;
                            }
                        }else{
                            this.active = 2;
                        }   
                    }else{
                        this.$message({
                            message: '请完善商品的基本信息',
                            type: 'warning'
                        });
                    }
                }else{
                    this.active = 2;
                }
            }else{
                this.$message({
                    message: '请完善商品的基本信息',
                    type: 'warning'
                });
            }
            return
        }
        if(this.active == 2){
            this.changeData(1);
            return
        }
        if(this.active++ > 2) this.active = 1;
    },
    /**
     * 继续添加
     */
    to_add(){
        if(this.$route.params.id === 'add'){
            location.reload()
        }else{
            this.$router.push('/releaseGoods/add')
        }
    },
    /** 
     *排序 
     */
    compare(prop){
        return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }            
        }   
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
     *  编辑数据请求
     */
    editAjax(){
        let _this = this;
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallProductToEdit_post,
            'data':{
                id:_this.goodsId
            },
            'success':function (data){
                console.log(data.data,'aaaaaa')
                _this.form = data.data;
                //初始化处理数据
                _this.invenAdd(_this.form.invenList,_this.form.specList);
                _this.changeSpac(_this.form.specList);
                if(typeof _this.form.proDetail.id == 'undefined'){
                    _this.form.proDetail = {
                        productDetail: null,        //商品详情
                        productIntrodu: null,       //商品简介 
                        productMessage: null,           //商品信息
                    }
                }
                //商品类型会员卡
                if(_this.form.pro.proTypeId == 2){
                    //会员卡
                    _this.ajaxRequest({
                        'url': DFshop.activeAPI.mallCardList_post,
                        'success':function (data){
                            _this.cardList = data.data;
                        }
                    });
                }else if(_this.form.pro.proTypeId == 3){
                    //卡券包
                    _this.ajaxRequest({
                        'url': DFshop.activeAPI.mallCardReceiveList_post,
                        'success':function (data){
                            _this.cardReceiveList = data.data;
                        }
                    });
                }else if(_this.form.pro.proTypeId == 4){
                    //流量包
                    _this.ajaxRequest({
                        'url': DFshop.activeAPI.mallFlowList_post,
                        'data':{
                            productId: _this.form.pro.id,
                            flowId: _this.form.pro.flowId
                        },
                        'success':function (data){
                            _this.flowList = data.data;
                        }
                    });
                }

                //物流
                if(_this.form.pro.proFreightSet  == 2){
                    _this.freightAjax(_this.form.pro.proFreightTempId);
                    
                }
                // if(_this.form.pro.proFreightSet  == 2){
                //     _this.ajaxRequest({
                //         'url': DFshop.activeAPI.mallFreightGetFreightByShopId_post,
                //         'data':{
                //             shopId: _this.form.pro.shopId
                //         },
                //         'success':function (data){
                //             _this.logisticsList = data.data;
                //             _this.form.pro.proFreightTempId = data.data.id;
                            
                //         }
                //     });
                // }
            }
        });
    },
    invenAdd(data1,data2){
        let _this =this;
        this.invenData=[];
        let myArray=new Array();
        data1.forEach((item,i)=>{
            item.specificaIds = item.specificaIds.split(",");
            myArray.push(item);
        })
        myArray.forEach((item,i)=>{
            let arr = []
            item.specificaIds.forEach((test,j)=>{
                data2.forEach((a,b)=>{
                    a.specValues.forEach((c,d)=>{
                        if(test == c.id){
                            arr.push(c.specValueId)
                        }
                    })
                })
            })
            item.specificaIds = arr.toString();
        })
        _this.form.invenList = myArray;
    },
    /** 
     * 保存请求
     * @param data  数据
     * @param type  1新增保存，2新增预览
     */
    dataAjax(type,data){
        let _this = this;

        //防止多次点击重复提交数据
        if(!Lib.C.ajax_manage) return false;
        Lib.C.ajax_manage = false;
        
        if(this.$route.params.id === 'add'){
            //新增
            _this.ajaxRequest({
                'url':  DFshop.activeAPI.mallProductAdd_post,
                'data':data,
                'success':function (data){
                    if(type==1){
                        _this.active = 3;
                    }else{
                        let _pageLink='';
                        if(_this.$route.params.id === 'add'){
                            _pageLink = 'goods/details/'+_this.form.pro.shopId+'/'+data.data.userId+'/0/'+data.data.id+'/0';
                        }else{
                            _pageLink = 'goods/details/'+_this.form.pro.shopId+'/'+_this.form.pro.userId+'/0/'+_this.form.pro.id+'/0';
                        }
                        let msg ={
                            title: '商品预览',
                            path: _this.webPath,
                            pageLink: _pageLink//页面链接
                        };
                        _this.$root.$refs.dialogQR.showDialog(msg);
                    }
                }
            });
        }else{
            //修改
            _this.ajaxRequestJQ({
                'url':  DFshop.activeAPI.mallProductUpdatet_post,
                'data':data,
                'success':function (data){
                    if(type==1){
                        _this.active = 3;
                    }else{
                        let _pageLink='';
                        if(_this.$route.params.id === 'add'){
                            _pageLink = 'goods/details/'+_this.form.pro.shopId+'/'+data.data.userId+'/0/'+data.data.id+'/0';
                        }else{
                            _pageLink = 'goods/details/'+_this.form.pro.shopId+'/'+_this.form.pro.userId+'/0/'+_this.form.pro.id+'/0';
                        }
                        let msg ={
                            title: '商品预览',
                            path: _this.webPath,
                            pageLink: _pageLink//页面链接
                        };
                        _this.$root.$refs.dialogQR.showDialog(msg);
                    }
                }
            });
        }
    },
    /** 
     * 数据请求 --  整理数据
     * @param type 1保存，2预览
    */
    changeData(type){
        let _this = this;
        let imageList =[];
        if(_this.newimageList.length == 0){
            //没有修改新图
            imageList = _this.form.imageList;
            imageList.forEach((item,i)=>{
                if(i==0){
                    item.isMainImages = 1;
                }else{
                    item.isMainImages = 0;
                }
            })
        }else{
            //接受新图片 重新排序
            _this.newimageList = this.newimageList.sort(this.compare("sort"));
            _this.newimageList.forEach((item,i)=>{
                if(item.assId == undefined){
                    //新增图片
                    let img = {
                        imageUrl:item.imageUrl,
                        isMainImages: 0,
                        assType:1,
                        assSort:i,
                    }
                    if(i==0){
                        img.isMainImages = 1;
                    }
                    imageList.push(img)
                }else{
                    if(i==0){
                        item.isMainImages = 1;
                    }else{
                        item.isMainImages = 0;
                    }
                    imageList.push(item)
                }
            })
        }
        let specList=[];
        if(typeof _this.form.specList != 'undefined'){
            _this.form.specList.forEach((item,i)=>{
                item.specValues.forEach((test,j)=>{
                    let _item ={
                        productId: item.productId || null,
                        specificaNameId: item.specNameId,
                        specificaName: item.specName,
                        specificaImgUrl: test.newSpecImage == null?null:'image'+test.newSpecImage.split('/image')[1],
                        specificaValue: test.specValue,
                        specificaValueId: test.specValueId
                    }
                    specList.push(_item);
                })
            })
        }

        let editorText =  $('#editor').html();
        this.form.proDetail.productDetail = editorText;

        let  data={
            product:_this.form.pro,
            imageList: JSON.stringify(imageList),
            groupList:JSON.stringify(this.form.proGroupList),
            detail:JSON.stringify(this.form.proDetail),
            speList:specList.length==0?null:JSON.stringify(specList),
            invenList:_this.form.invenList.length> 0?JSON.stringify(_this.form.invenList):null,
            paramsList:JSON.stringify(_this.form.paramList),
        };
        data.invenList == null ? data.product.isSpecifica = 0:data.product.isSpecifica = 1;
        data.product= JSON.stringify(data.product);
        console.log(data,'修改提交数据')
        this.dataAjax(type,data)
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
        console.log(data,'proGroupList')
    },
    /** 
     * 修改商品类型
     * @param type 类型   0实物商品
     *                    1虚拟商品（非会员卡，无需物流）
     *                    2虚拟商品（会员卡，无需物流）
     *                    3虚拟商品（卡券包，无需物流）
     *                    4虚拟商品（流量包，无需物流）
     */
    changeTypeId(type){
        let _this = this;
        
        if(type ==2){
        //会员卡
            if(this.cardList == ''){
                _this.ajaxRequest({
                    'url': DFshop.activeAPI.mallCardList_post,
                    'success':function (data){
                        _this.cardList = data.data;
                        _this.$nextTick(()=>{
                            _this.$set(_this.form.pro,'memberType',data.data[0].ctId);
                            _this.$set(_this.form.pro,'cardType',null);
                            _this.$set(_this.form.pro,'flowId',null)
                        })
                    }
                });
            }
        }else if(type == 3){
        //卡券包
            if(this.cardReceiveList == ''){
                _this.ajaxRequest({
                    'url': DFshop.activeAPI.mallCardReceiveList_post,
                    'success':function (data){
                        _this.cardReceiveList = data.data;
                        _this.$nextTick(()=>{
                            _this.$set(_this.form.pro,'cardType',data.data[0].id);
                            _this.$set(_this.form.pro,'memberType',null);
                            _this.$set(_this.form.pro,'flowId',null)
                        })
                    }
                });
            }
        }else if(type == 4){
        //流量包
            _this.$set(_this.form.pro,'cardType',_this.flowList[0].id);
            _this.$set(_this.form.pro,'cardType',null);
            _this.$set(_this.form.pro,'memberType',null);
        }
    },
    /** 
     * 修改卡卷包id
     */
    changeCardType(id){
        let _this = this;
        this.cardReceiveList.forEach((item,i)=>{
            if(id == item.id){
                _this.cardReceiveItem = item;
            }
        })
    },
    /** 
     * 选择参数
     * @param data 选中数据
     */
    paramSelected(data){
        this.form.paramList = data;
    },
    /** 
     * 商品规格 接受子组件传统数据
     */
    changeSpac(data){
        //接受数据
        let _this = this;
        if( data.length == 0 ) {
            this.$set(_this.form,'specList',[]);
            this.$set(_this.form,'invenList',[]); 
            return false;
        }
        _this.$set(_this.form,'specList',data);
        _this.form.specList.splice(1,0);
        //数据重组 --传值--specificaIds组合(笛卡尔乘积)
        let listData = [];
        data.forEach((item,i)=>{
            if(item.specValues.length >0){
                listData.push(item);
            }
        })
        
        let result=[];//结果保存到这个数组
        function toResult(arrIndex,aresult,specArr){
            if(arrIndex >= listData.length) {
                let obj = {
                    specificaIds:aresult,
                    specificas:specArr
                }
                result.push(obj);
                return;
            }
            let aArr = listData[arrIndex].specValues;
            if(!aresult) aresult = [];
            if(!specArr) specArr = [];
            for(let i=0; i<aArr.length; i++){
                let theResult = aresult.slice(0,aresult.length);
                let theSpecArr = specArr.slice(0,aresult.length);
                theResult.push(aArr[i].specValueId);
                let specificasData = {
                    specificaNameId:listData[arrIndex].specNameId,      //规格名称ID
                    specificaName:listData[arrIndex].specName,          //规格名称
                    specificaValueId: aArr[i].specValueId,              // 规格值ID
                    specificaValue: aArr[i].specValue,                  //规格值
                    specificaImgUrl: aArr[i].newSpecImage,                  //规格值
                }
                theSpecArr.push(specificasData)
                toResult(arrIndex+1,theResult,theSpecArr);
            }
        }
        toResult(0);
        // 显示数据
        
        let arr=[]
        result.forEach((item,i)=>{
            let data={
                specificas: item.specificas,//请求需要
                id: null,
                productId: this.$route.params.id == 'add' ? null : this.$route.params.id,
                specificaIds: item.specificaIds.toString(),     //规格ID
                invPrice: null,          //库存价格
                invNum:  null,            //库存数量
                invCode: null,         //产品编码
                invSaleNum:  null,       //销量
                isDefault: 0,             //是否默认  0没有 1是
                specificaImgId:  null ,       // 有图片的规格ID
                logisticsWeight: null,    //物流重量
            }
            _this.form.invenList.forEach((test,j)=>{
                if(data.specificaIds == test.specificaIds){
                    data.invPrice = test.invPrice || null;       //库存价格
                    data.invNum =  test.invNum || null;         //库存数量
                    data.invCode =  test.invCode || null;          //产品编码
                    data.invSaleNum =  test.invSaleNum || null;         //销量
                    data.isDefault =  test.isDefault || 0;              //是否默认  0没有 1是
                    data.specificaImgId =  test.specificaImgId || null;         // 有图片的规格ID
                    data.logisticsWeight =  test.logisticsWeight || null;      //物流重量
                }
            })
            arr.push(data);
        })
        _this.$set(_this.form,'invenList',arr); 
    },
    /** 
     * 总库存
     */
    changeStock(val){
        let _this = this;
        // 流量包
        if(this.form.pro.proTypeId == 4){
            _this.flowList.forEach((item,i)=>{
                if(_this.form.pro.flowId == item.id && val>item.count){
                    _this.$message.error('总库存超出了流量包数量');
                }
            })
        }
        this.form.pro.proStockTotal = val;
    },
    /** 
     * 物流id
     */
    proFreightSet(e){
        if(e==2){
            //物流模板id默认
            if(this.logisticsList.length==0  && (this.form.pro.proFreightTempId == 0 || this.form.pro.proFreightTempId == null)){
                this.$message.error('没有运费模板，请新增');
                return
            }
            console.log(this.logisticsList.id,"this.logisticsList.id")
            this.form.pro.proFreightTempId = this.logisticsList[0].id;
            this.form.pro.proFreightPrice = null;
        }else{
            this.form.pro.proFreightTempId = null;
        }
    },
    /** 
     * 表单验证重置
     */
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    /** 
     * 图片排序数据处理
     */
    changeIMG(data){
        let _this = this;
        this.newimageList = data;
        this.isImgno = false;
    },
    /** 
     * 图片验证
     */
    IMGRules(){
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
        if(id == null){
            this.$message({
                message: '运费设置请选中运费模板',
                type: 'warning'
            });
        }
        let _this = this;
        
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallFreightGetFreightByShopId_post,
            'data':{
                shopId: _this.form.pro.shopId
            },
            'success':function (data){
                if(typeof data.data == 'undefined'){
                    _this.logisticsList = [];
                    return
                }
                _this.logisticsList = data.data;
                if(_this.form.pro.proFreightSet == 1) {
                   _this.form.pro.proFreightTempId = null;
                    return
                }
            }
        });
    },
    /** 
     * 新增物流跳转
     */
    addLogistics(){
        let  href = window.location.href.split('views')[0];
        window.location.href = href+'views/setUp/index.html#/logistics/logistics'
    },
    changeInven(val){
        val.forEach((item,i)=>{
            item.specificaIds = item.specificaIds.toString()
        })
        this.form.invenList = val;
    },
    /** 
     * 流量包请求
     */
    flowListAjax(){
        let _this = this;
        _this.ajaxRequest({
            'url': DFshop.activeAPI.mallFlowList_post,
            'success':function (data){
                if(data.data.length == 0){
                    _this.isFlowList = false;
                    return false;
                }
                _this.flowList = data.data;
            }
        });

    },
    selectFreight(data){
        for(let i = 0; i< this.logisticsList.length; i++){
            let _item = this.logisticsList[i];
             if(_item.id == data){
                this.selectFreightType = _item.priceType;
                break;
            }
        }
    }
  },
  mounted(){
    if(this.$route.params.id === 'add'){
        this.form.imageList=[];
        this.flowListAjax();
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
            _this.webPath = data.webPath;
            if(_this.$route.params.id === 'add'){
                _this.form.pro.shopId = _this.shopList[0].id; 
            }
        }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../../less/mygoods.less';
</style>