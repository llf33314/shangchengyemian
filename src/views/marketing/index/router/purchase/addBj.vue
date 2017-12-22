<template>
<div class="addbj-wrapper">
    <div class="common-nav">
        <el-breadcrumb separator="/">
             <el-breadcrumb-item ><a :href="$store.state.marketingUrl" style="color: #20a0ff;">商城营销</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/purchase/1' }">对外报价 </el-breadcrumb-item>
            <el-breadcrumb-item v-if="ruleForm.id ==''">新增报价单</el-breadcrumb-item>
            <el-breadcrumb-item v-else>修改报价单</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="addbj-main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="148px" class="demo-ruleForm">
            <el-form-item label="标题 :" prop="orderTitle">
               <el-input v-model="ruleForm.orderTitle" class="addbj-input" placeholder="请输入报价单标题" ></el-input>
            </el-form-item>
            <el-form-item label="所属公司 :" prop="companyId">
                <el-select v-model="ruleForm.companyId" placeholder="请选择公司模板" class="addbj-input">
                    <el-option :label="option.company_name" :value="option.id" :key="option.id" v-for="option in allCompany"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款方式 :" prop="orderType">
                 <el-radio-group v-model="ruleForm.orderType">
                    <el-radio label="0">全款</el-radio>
                    <el-radio label="1">分期</el-radio>
                </el-radio-group>
                <div v-if="ruleForm.orderType ==1" style="margin-top: 10px;">
                      <time-list :rowList.sync="timeList" ref="timeComp"></time-list>
                </div>
            </el-form-item>
            <el-form-item label="是否在线签合同 :" prop="haveContract">
                <el-radio-group v-model="ruleForm.haveContract">
                    <el-radio label="0">签</el-radio>
                    <el-radio label="1">不签</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="合同 :" prop="contractId" v-if="ruleForm.haveContract == 0">
                <el-select v-model="ruleForm.contractId" placeholder="请选择合同" class="addbj-input">
                    <el-option  :label="option.contract_title" :value="option.id" :key="option.id" v-for="option in allContract"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对外报价是否含税 :" prop="haveTax">
                <el-radio-group v-model="ruleForm.haveTax">
                    <el-radio label="0">含</el-radio>
                    <el-radio label="1">不含</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="报价单描述 :"  prop="orderDescribe">
                <el-input  v-model="ruleForm.orderDescribe" class="addbj-input" type="textarea" :rows="2" placeholder="请输入内容" ></el-input>
            </el-form-item>
             <el-form-item label="报价单说明 :" prop="orderExplain">
                <el-input  v-model="ruleForm.orderExplain" class="addbj-input" type="textarea" :rows="2" placeholder="请输入内容" ></el-input>
            </el-form-item>
             <el-form-item label="报价单备注 :" prop="orderRemarks">
                <el-input  v-model="ruleForm.orderRemarks" class="addbj-input" type="textarea" :rows="2" placeholder="请输入内容" ></el-input>
            </el-form-item>
            <el-form-item  label="底部二维码 :" prop="orderQrcode" style="width:40%;height:40%">
                <div class="addbj-img" :class="ruleForm.orderQrcode == '' ? 'border':''">
                    <div class="material-square" @click="materiallayer(1)" >
                        <i class="el-icon-plus"></i>
                        <img class="img"  v-if="ruleForm.orderQrcode!= ''" :src="ruleForm.orderQrcode" />
                        <div class="delete" v-if="ruleForm.orderQrcode != '' " @click.stop="deleteImg">
                            <i class="el-icon-view" @click.stop="showBigImg(ruleForm.orderQrcode)"></i>
                            <i class="el-icon-delete2" @click.stop="deleteImg"></i>
                        </div>  
                    </div>
                </div>
                 <p class="p-warn ">建议尺寸：300*300px<br/>
                （可上传公众号二维码或小程序体验码）</p>
            </el-form-item>
            <el-form-item label="轮播图设置 :">
             <carousel-list :rowList.sync="carouselList" ref="carouselComp"></carousel-list>
            </el-form-item>
            <el-form-item label="商品设置 :" prop="orderDetailLength">
                <el-button type="primary" @click="showDialog">添加商品</el-button>
                <details-list :rowList.sync="orderDetailsList" ref="detailsComp"></details-list>           
                <div class="table-footer">
                    总运费
                    <el-input  v-model="ruleForm.freight" style="width: 90px;">
                        <template slot="prepend">&#65509;</template>
                    </el-input> 
                    <span>合计：&#65509;{{ruleForm.allMoney}}</span>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
         <el-dialog v-model="materialLargeSrcVisible" size="small">
          <img width="100%" :src="largeSrc" alt="" class="img">
        </el-dialog>
        <goods-dialog ref="goodsDialog" @dialogData="selectDialogData"></goods-dialog>
    </div>
</div>
</template>
<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload'
import defaultImg from 'components/defaultImg'
import timeList from "../../components/purchaseOrder/timeList";
import carouselList from "../../components/purchaseOrder/carouselList";
import detailsList from "../../components/purchaseOrder/detailsList";
import goodsDialog from "../../components/purchaseOrder/goodsDialog";
export default {
  components:{
      imgUpload,defaultImg,timeList,carouselList,detailsList,goodsDialog
  },
  data() {
    var companyId = (rule, value, callback) => {
        if (value == '') {
        return callback(new Error('公司模板不能为空'));
        }else {
            callback();
        }
    };
     var contractId = (rule, value, callback) => {
        if (value == '') {
        return callback(new Error('合同不能为空'));
        }else {
            callback();
        }
    };
    var orderDetailLength = (rule, value, callback) => {
        if (value==0) {
        return callback(new Error('商品不能为空'));
        }else {
            callback();
        }
    };
    return {
      ruleForm: {
        id:'',
        companyId:'',
        contractId:'',
        orderTitle: '',
        orderDescribe: '',
        orderExplain:'',
        orderQrcode: '',
        orderType: '0',
        haveContract: '0',
        haveTax: '0',
        freight:0,
        allMoney:0,
        orderStatus:'',
        orderRemarks:'',
        orderDetailLength:0,
      },
      rules: {
        companyId:[
             { validator: companyId, trigger: 'change' },
        ],
        contractId:[
          { validator: contractId, trigger: 'change' },
        ],
        orderDetailLength:[
          { validator: orderDetailLength, trigger: 'blur' },
        ],
        orderTitle: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        orderQrcode: [
          { required: true, message: '底部二维码不能为空', trigger: 'blur' }
        ],
        carouselList: [
          {  type: 'array', required: true, message: '轮播图不能为空', trigger: 'change' }
        ]
      },
      allContract:[],//所有合同列表
      allCompany:[], //所有公司模板列表
      timeList:[],//分期列表
      carouselList:[],//轮播图列表
      orderDetailsList:[],//商品列表
      materialLargeSrcVisible: false,//查看大图弹出框
      largeSrc: ''//查看大图 图片地址
    };
  },
  watch: {
    orderDetailsList(a, b) {
        let _this = this;
        _this.ruleForm.freight=0;
        _this.ruleForm.allMoney=0;
        this.ruleForm.orderDetailLength = a.length;
        if(this.ruleForm.orderDetailLength ==0){
        }else{
            //统计总运费,合计
            a.forEach((e,i)=>{
                if(e.freight != undefined){
                    _this.ruleForm.freight = Number(_this.ruleForm.freight)+Number(e.freight);
                    _this.ruleForm.allMoney = Number(_this.ruleForm.allMoney)+Number(e.allMoney);
                }
            })
            _this.ruleForm.allMoney +=_this.ruleForm.freight;
        }
        _this.$refs['ruleForm'].validate();
    }
  },
  methods: {
        /**
     * 选中商品事件
     */
    selectDialogData(data) {
        let _this = this;
        //封装商品
        let pro={};
        pro.productId=data.id;
        pro.productName=data.pro_name;
        pro.productImg=data.imgPath+data.image_url;
        pro.money=data.pro_price;
        pro.discountMoney=data.pro_price;
        pro.count=1;
        pro.laborCost=0;
        pro.installationFee=0;
        pro.freight=0;
        pro.allMoney=pro.discountMoney*pro.count+pro.laborCost+pro.installationFee;//小计

        //选取的商品是否重复
        let isAdd=true;
        _this.orderDetailsList.forEach((e,i)=>{
            //   console.log(data.id,e.productId,"data.id == e.id");
           if (Number(data.id) == Number(e.productId)) {
                 isAdd=false;
            }
        })
        if(isAdd){
            this.orderDetailsList.push(pro);
        }
    },
    showDialog() {
      //活动商品列表弹出框
      this.$refs.goodsDialog.isShow = true;
    },
    /**调用素材库 */
    materiallayer(item){
      let _this = this;
      console.log(item,'上传');
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
             //确认
            if(item == 1){
              _this.ruleForm.orderQrcode = val[0].url; 
              _this.$refs['ruleForm'].validate()
            } 
            
        }).catch(function (error) {
            //取消
        })
    },
    /*
    * 删除图片
    * */
    deleteImg() {
      let  _this = this;
      _this.ruleForm.orderQrcode='';
     _this.$refs['ruleForm'].validate();
    },
    /** 
     * 查看大图
    */
    showBigImg(img){
      this.materialLargeSrcVisible = true;
      this.largeSrc = img;
    },

    /**获取所有合同信息 */
    purchaseAllcontractList(){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseAllcontractList_post,
        'success':function (data){
            if(data.code == 0){
               _this.allContract = data.data; 
            }
        }
        });
    },
    /**获取所有公司模板信息 */
    purchaseCompanyModeList(){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseCompanyModeList_post,
        'success':function (data){
            if(data.code == 0){
               _this.allCompany = data.data; 
            }
        }
        });
    },
    /**保存 */
    submitForm(formName) {
         let _this = this;
         let isVali =true;
        if(_this.ruleForm.orderType==1){
            isVali = this.$refs.timeComp.validateData();
        }
        let isValc = this.$refs.carouselComp.validateData();
        let isVald = this.$refs.detailsComp.validateData();

        _this.$refs[formName].validate((valid) => {
            if (valid&&isValc &&isVali&&isVald) {
                // alert('submit!');
                console.log(_this.ruleForm);
                console.log(_this.carouselList);
                console.log(_this.orderDetailsList);
                if(_this.ruleForm.haveContract ==1){
                  _this.ruleForm.contractId='';
                }
                let param = {};
                param["order"] = _this.ruleForm;
                param["orderDetailsList"] = JSON.stringify(_this.orderDetailsList);
                param["carouselList"] = JSON.stringify(_this.carouselList);
                if(_this.ruleForm.orderType ==1){
                    param["termList"] = JSON.stringify(_this.timeList);
                }
                console.log(param);
                // return false;
                _this.ajaxRequest({
                    url: DFshop.activeAPI.purchaseOrderSave_post,
                    data: param,
                    success: function(data) {
                        _this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        _this.jumpRouter('/purchase/1');
                    }
                });
            } else {
            console.log('error submit!!');
            return false;
            }
        });
    },
    /**取消 */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.jumpRouter('/purchase/1');
    },
    /**获取报价单信息 */
    purchaseOrderInfo(id){ 
        let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.purchaseOrderInfo_post,
        'data':{
            id : id
        },
        'success':function (data){
            if(data.code == 0){
                _this.carouselList = data.data.carouselList;
                _this.ruleForm = data.data.order; 
                _this.orderDetailsList = data.data.orderdetails;
                if(_this.ruleForm.haveContract == 0){
                  _this.ruleForm.contractId=data.data.orderContract.contract_id;
                }
                if(_this.ruleForm.orderType ==1){
                   _this.timeList = data.data.termList;
                }else{
                    _this.timeList = [];
                }
            }
        }
        });
    },
  },
   mounted() {
       let _this = this;
       this.isMarketingUrl();
       _this.purchaseAllcontractList();
       _this.purchaseCompanyModeList();
       //修改报价单时
       if(_this.$route.params.id != undefined && _this.$route.params.id != ''){     
            _this.purchaseOrderInfo(this.$route.params.id);
       }
   }
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
    height: 100%;
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
      line-height: 77px;
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


