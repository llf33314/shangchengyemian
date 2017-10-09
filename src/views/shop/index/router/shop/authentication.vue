<template>
<div class="shop-wrapper">
  <div class="common-nav">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/shop' }">店铺</el-breadcrumb-item>
      <el-breadcrumb-item>店铺认证</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="shop-authentication-main">
    <div class="shop-authentication-prompt">
      <p>认证说明：</p>
      <p>个人认证：大陆身份证默认进行实时快速认证，其它证件类型可进行人工认证，审核周期为1个工作日；</p>
      <p>企业认证：适合公司经营者，增加可提现至公司银行账户，审核周期为1个工作日。</p>
    </div>
    <div class="shop-authentication-content">
      <el-form ref="form" :model="form" label-width="175px" :rules="rules">
        <el-form-item label="店铺名称 :" >
          {{data.sto_name}}
        </el-form-item>
        <el-form-item label="主体信息 :">
          <el-radio-group v-model="stoType" >
              <el-radio :label="0" style="margin-right: 15px;">个人</el-radio>
              <el-radio :label="1" >企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="stoType == 0">
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="idNumber">
            <el-input v-model="form.idNumber" placeholder="请输入证件号"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面：">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img1">
                <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
           <el-form-item label="身份证背面：">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img2">
                 <div class="shop-img2" @click="showBigImg(imgID2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="企业名称 :">
            <el-input v-model="form.companyName" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="法人姓名 :">
            <el-input v-model="form.name" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法人证件 :">
            <div class="img-title">身份证正面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img1">
                 <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="法人证件 :">
            <div class="img-title">身份证背面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img2">
                 <div class="shop-img2" @click="showBigImg(imgID2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 营业执照 :">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img3">
                 <div class="shop-img2" @click="showBigImg(imgLicense1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="营业执照号 :">
            <el-input v-model="input" placeholder="请输入营业执照号"></el-input>
          </el-form-item>
          <el-form-item label="请选择需要认证的店铺 :">
            <div class="shop-shoptype">
              <div class="shop-button "
                  v-for="(shop,index) in shoptypes1"
                  @click="choiceShoptype($event,shop.name,shop.shoptypes)"
                  v-text="shop.title"  ></div>
            </div>
          </el-form-item>
          <el-form-item label="请选择可提供的认证信息 :" v-if="isProve">
            <div class="shop-shoptype">
              <div class="shop-button-max"
                  v-for="(shoptype,index) in shoptypes2"
                  @click="choiceProvetype($event,shoptype.name)"
                  v-text="shoptype.title"></div>
            </div>
          </el-form-item>
           <el-form-item label="商标使用许可合同 :" v-if="isContract">
            <div class="img-title" style="text-align:left">非原件照片需加盖公司红色公章并且需要注明商标许可性质为独占性许可</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img5">
                 <div class="shop-img2" @click="showBigImg(imgLicense3)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label="商标注册通知书 :" v-if="isNotice">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img4">
                 <div class="shop-img2" @click="showBigImg(imgLicense2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商标注册证 :" v-if="isCertificate">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img6">
                 <div class="shop-img2" @click="showBigImg(imgLicense4)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上传补充资料 :" v-if="isReplenishNotes">
            <div class="img-title">最多上传5张</div>
            <div class="shop-promptText" style="font-size:14px;">
              1.商标注册人与营业执照公司名或法人不一致，但商标已转让，需要上传<span>“商标转让证明”。</span><br>
              2.商标注册人与营业执照公司名或法人不一致，但公司已更名需要上传<span>“公司更名证明”</span>。<br>
              3.如果出现以上2种情况，需要上传<span>“商标转让证明”</span>和<span>“公司更名证明”</span>。
              <div v-if="isReplenishNotes1">
              4、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>（商标注册人为公司）<a>下载商标独占授权书</a><br>
              5、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>以及<span>“商标注册人的身份证正反面照片”</span>（商标注册人为个人）
              </div>
            </div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 微信渠道授权证书:" v-if="isChannel">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense5)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a>下载模板</a>
            </div>
          </el-form-item>
          <el-form-item label=" 公司总部证明函:" v-if="isCompany">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense5)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a>下载模板</a>
            </div>
          </el-form-item>
          <el-form-item label=" 关系证明函:" v-if="isRelationship">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <imgUpload></imgUpload>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense6)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a>下载模板</a>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="短信验证码：" prop="code">
            <el-input v-model="form.code" placeholder="请输入短信验证码"></el-input>
            <el-button type="primary">获取验证码</el-button>
            <span class="shop-promptText" style="margin-bottom:67px;">验证短信将发送到该店铺绑定的推送手机：+86 {{data.sto_name}} </span>
          </el-form-item>
        <el-form-item>
          <el-button type="primary"@click="submitForm('form')">提交认证</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="dialogimg" size="small">
        <img width="100%" :src="dialogImageUrl" alt="" class="img">
    </el-dialog>
  </div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import imgUpload from 'components/imgUpload';
//图片
import imgID1 from '../../../img/ID1_1.png' //身份证正面
import imgID2 from '../../../img/ID2_1.png' //身份证反面
import imgLicense1 from '../../../img/ID3_1.jpg' //营业执照
import imgLicense2 from '../../../img/ID4_1.jpg' //商标注册通知书
import imgLicense3 from '../../../img/ID5_1.png' //商标使用许可合同
import imgLicense4 from '../../../img/ID6_1.jpg'//商标注册证
import imgLicense5 from '../../../img/ID7_1.png'//微信渠道授权证书
import imgLicense6 from '../../../img/ID8.png'//微信渠道授权证书

export default {
  components: {
    imgUpload
  },
  data () {
    var formName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名字不能为空'));
      }
    };
    var formIdNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      } else {
        let id = Lib.M.validIDnumber(value);
        if(!id){
          return callback(new Error('请输入正确合法的身份证号'));
        }
      }
    };
    var formCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码为空'));
      }
    };
    return {
      data:{},//店铺数据
      stoType: 0,//主体类型, 0个人 1企业
      form: {},
      dialogimg:false,
      dialogImageUrl:'',
      isType: true,//默认显示个人
      shoptypes1:[
        { name:'shop1',
          title:'普通店铺'
        },{
          name:'shop2',
          title:'旗舰店',
          shoptypes:[
          {
            name:'shop6',
            title:'商标注册通知书'
          },{
            name:'shop7',
            title:'商标注册证'
          },{
            name:'shop8',
            title:'商标使用许可合同'
          }]
        },{
          name:'shop3',
          title:'专卖店',
          shoptypes:[
          {
            name:'shop9',
            title:'微信渠道授权书'
          },{
            name:'shop10',
            title:'多粉渠道授权书'
          }]
        },{
          name:'shop4',
          title:'直营店',
          shoptypes:[
          {
            name:'shop11',
            title:'公司总部证明函'
          },{
            name:'shop12',
            title:'关系证明函'
          }]
        },{
          name:'shop5',
          title:'厂家直销',
          shoptypes:[
          {
            name:'shop11',
            title:'公司总部证明函'
          },{
            name:'shop12',
            title:'关系证明函'
          }]
        }
      ],
      shoptypes2:[],
      isProve: false, // 选择可提供认证消息
      isContract: false,//商标使用许可合同
      isNotice: false, //商标注册通知书
      isReplenishNotes: false, //上传补充资料 
      isReplenishNotes1: false, //上传补充多文本
      isCertificate: false, //上传注册证书
      isChannel: false, //渠道授权
      isCompany:false,//公司总部证明函
      isRelationship:false,//关系证明函
      imgID1:imgID1,
      imgID2:imgID2,
      imgLicense1:imgLicense1,
      imgLicense2:imgLicense2,
      imgLicense3:imgLicense3,
      imgLicense4:imgLicense4,
      imgLicense5:imgLicense5,
      imgLicense6:imgLicense6,
      rules: {
        name: [
          { validator: formName, trigger: 'blur' }
        ],
        idNumber: [
          { validator: formIdNumber, trigger: 'blur' }
        ],
        code: [
            { validator: formCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
      选择店铺类型
      @name:店铺
      @shoptypes:子键内容
     */
    choiceShoptype(e,name,shoptypes){
      name == 'shop1' ? this.isProve = false : this.isProve = true;
      $(e.target).siblings().removeClass('shop-button-choice');
      $(e.target).addClass('shop-button-choice');
      this.shoptypes2 = shoptypes;
    },
    /**
     选择认证信息
     */
     choiceProvetype(e,name){
      console.log(e,name);
      $(e.target).siblings().removeClass('shop-button-choice');
      $(e.target).addClass('shop-button-choice');
      this.isContract = false;//商标使用许可合同
      this.isNotice   = false; //商标注册通知书
      this.isReplenishNotes = false; //上传补充资料 
      this.isCertificate = false; //上传注册证书
      this.isChannel = false; //渠道授权
      this.isCompany = false;//公司总部证明函
      this.isRelationship = false;//关系证明函
      switch(name){
        case "shop6":
            this.isNotice = true;
            this.isReplenishNotes = true;
        break;
        case "shop7":
            this.isCertificate = true;
            this.isReplenishNotes = true;
            this.isReplenishNotes1 = true;
        break;
        case "shop8":
            this.isContract = true;
            this.isCertificate = true;
        break;
        case "shop9":
            this.isChannel = true;
        break;
        case "shop10":
            this.isChannel = true;
        break;
        case "shop11":
            this.isCompany = true;
        break;
        case "shop12":
            this.isRelationship = true;
        break;
        default:;
      }
    },
    showBigImg(img){
      this.dialogimg=true;
      this.dialogImageUrl = img;
    },
    /**
     * 提交认证
     */
    submitForm(formName) {
      let _this= this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
           _this.$message({
            message: '恭喜你，保存成功',
            type: 'success'
            });
          _this.jumpRoute('/shop');
          /*Lib.M.ajax({
            'url': DFshop.activeAPI.mallStoreCertSave_post,
            'data':{
               curPage :Page 
             },
             'success':function (data){
                 this.$message({
                 message: '恭喜你，保存成功',
                 type: 'success'
                 });
                _this.jumpRoute('/shop');
            }
          });*/
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.data = JSON.parse(this.$route.query.data);
  },
}
</script>

<style lang="less">

</style>
