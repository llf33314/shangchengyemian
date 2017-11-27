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
          <el-radio-group v-model="stoType" @change="resetForm('form')">
              <el-radio :label="0" style="margin-right: 15px;">个人</el-radio>
              <el-radio :label="1" >企业</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="stoType == 0">
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：" prop="idNumber">
            <el-input v-model="form.idNumber" placeholder="请输入证件号"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面：" prop="IDImg1">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('idCardFront')" :class="idCardFront == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="idCardFront != ''" :src="idCardFront" />
                  <div class="delete" v-if="idCardFront != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(idCardFront)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('idCardFront')"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img1">
                <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
           <el-form-item label="身份证背面：" prop="IDImg2">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('idCardBack')" :class="idCardBack == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="idCardBack != ''" :src="idCardBack" />
                  <div class="delete" v-if="idCardBack != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('idCardBack')"></i>
                  </div>
                </div>
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
        <div v-show="stoType == 1">
          <el-form-item label="企业名称 :" prop="companyName">
            <el-input v-model="form.companyName" placeholder="请输入企业名称" ></el-input>
          </el-form-item>
          <el-form-item label="法人姓名 :" prop="name">
            <el-input v-model="form.name" placeholder="请输入法人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法人证件 :" prop="IDImg1">
            <div class="img-title">身份证正面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('idCardFront')" :class="idCardFront == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="idCardFront != ''" :src="idCardFront" />
                  <div class="delete" v-if="idCardFront != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(idCardFront)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('idCardFront')"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img1">
                 <div class="shop-img2" @click="showBigImg(imgID1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="法人证件 :" prop="IDImg2">
            <div class="img-title">身份证背面</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('idCardBack')" :class="idCardBack == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="idCardBack != ''" :src="idCardBack" />
                  <div class="delete" v-if="idCardBack != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('idCardBack')"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img2">
                 <div class="shop-img2" @click="showBigImg(imgID2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 营业执照 :" prop="imgLicense1">
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('busLicenseImg')" :class="busLicenseImg == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="busLicenseImg != ''" :src="busLicenseImg" />
                  <div class="delete" v-if="busLicenseImg != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(idCardBack)"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('idCardBack')"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img3">
                 <div class="shop-img2" @click="showBigImg(imgLicense1)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="营业执照号 :" prop="busLicenseNo">
            <el-input v-model="form.busLicenseNo" placeholder="请输入营业执照号"></el-input>
          </el-form-item>
          <el-form-item label="请选择需要认证的店铺 :">
            <div class="shop-shoptype">
              <div class="shop-button "
                  v-for="(shop,index) in shoptypes1"
                  @click="choiceShoptype(index,shop.childList,shop.item_key)"
                  :class="{'shop-button-choice': index === button1 }"
                  v-text="shop.value"
                  ></div>
            </div>
          </el-form-item>
          <el-form-item label="请选择可提供的认证信息 :" v-if="isProve">
            <div class="shop-shoptype">
              <div class="shop-button-max"
                  v-for="(shoptype,index) in shoptypes2"
                  @click="choiceProvetype(index,shoptype.id)"
                  :class="{'shop-button-choice': index === button2 }"
                  v-text="shoptype.title"></div>
            </div>
          </el-form-item>
          <div v-if="isShow">
           <el-form-item label="商标使用许可合同 :" v-if="isMapTwo == 8"  prop="imgLicense3">
            <div class="img-title" style="text-align:left">非原件照片需加盖公司红色公章并且需要注明商标许可性质为独占性许可</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('certImgUrls',0)" :class="certImgUrls[0] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[0] != ''" :src="certImgUrls[0]" />
                  <div class="delete" v-if="certImgUrls[0] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[0])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',0)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img5">
                 <div class="shop-img2" @click="showBigImg(imgLicense3)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/商标许可使用协议.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label="商标注册通知书 :" v-if="isMapTwo == 6" prop="imgLicense2">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('certImgUrls',1)" :class=" certImgUrls[1] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[1] != ''" :src="certImgUrls[1]" />
                  <div class="delete" v-if="certImgUrls[1] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[1])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',1)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img4">
                 <div class="shop-img2" @click="showBigImg(imgLicense2)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商标注册证 :" v-if="isMapTwo == 7 || isMapTwo == 8 "  prop="imgLicense4">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <div class="material-square" @click="materiallayer('certImgUrls',2)" :class="certImgUrls[2] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[2] != ''" :src="certImgUrls[2]" />
                  <div class="delete" v-if="certImgUrls[2] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[2])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',2)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img6">
                 <div class="shop-img2" @click="showBigImg(imgLicense4)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="上传补充资料 :" v-if="isMapOne == 2 " >
            <div class="img-title">最多上传5张</div>
            <div class="shop-promptText" style="font-size:14px;">
              1.商标注册人与营业执照公司名或法人不一致，但商标已转让，需要上传<span>“商标转让证明”。</span><br>
              2.商标注册人与营业执照公司名或法人不一致，但公司已更名需要上传<span>“公司更名证明”</span>。<br>
              3.如果出现以上2种情况，需要上传<span>“商标转让证明”</span>和<span>“公司更名证明”</span>。
              <div v-if="isMapTwo == 7">
              4、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>（商标注册人为公司）
              <a :href="require('../../../docx/商标许可使用协议.docx')" >下载商标独占授权书</a><br>
              5、商标独占性授权的情况，需要上传<span>“商标注册证”</span>和<span>“商标独占授权书”</span>以及<span>“商标注册人的身份证正反面照片”</span>（商标注册人为个人）
              </div>
            </div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                <gt-material  ></gt-material>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 微信渠道授权证书:" v-if="isMapTwo == 9 || isMapTwo == 10" prop="imgLicense5">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer('certImgUrls',3)" :class=" certImgUrls[3] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[3] != ''" :src="certImgUrls[3]" />
                  <div class="delete" v-if="certImgUrls[3] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[3])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',3)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense5)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/渠道授权书.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label=" 公司总部证明函:" v-if="isMapTwo == 11 " prop="imgLicense6">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer('certImgUrls',4)" :class=" certImgUrls[4] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[4] != ''" :src="certImgUrls[4]" />
                  <div class="delete" v-if="certImgUrls[4] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[4])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',4)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense6)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/关系证明函.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          <el-form-item label=" 关系证明函:" v-if="isMapTwo == 12" prop="imgLicense6">
            <div class="img-title">非原件照片需加盖公司红色公章</div>
            <div class="shop-IDImg">
              <div class="shop-IDUpload">
                 <div class="material-square" @click="materiallayer('certImgUrls',5)" :class=" certImgUrls[5] == '' ? 'border':''">
                  <i class="el-icon-plus"></i>
                  <img class="img"  v-if="certImgUrls[5] != ''" :src="certImgUrls[5]" />
                  <div class="delete" v-if="certImgUrls[5] != '' " @click.stop="stopDelete">
                    <i class="el-icon-view" @click.stop="showBigImg(certImgUrls[5])"></i>
                    <i class="el-icon-delete2" @click.stop="deleteImg('certImgUrls',5)"></i>
                  </div>
                </div>
              </div>
              <span>示例 :</span>
              <div class="shop-img ID-img7">
                 <div class="shop-img2" @click="showBigImg(imgLicense6)">
                  <i class="el-icon-view"></i>
                </div>
              </div>
              <a style="vertical-align: bottom;"
                :href="require('../../../docx/关系证明函.docx')" >下载模板 </a>
            </div>
          </el-form-item>
          </div >
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

    <el-dialog v-model="materialLargeSrcVisible" size="small">
        <img width="100%" :src="largeSrc" alt="" class="img">
    </el-dialog>

    <el-dialog
      title="素材库"
      :visible.sync="materialvisible"
      class="material-dialog"
      size="small">
      <div>
        <iframe :src="materialUrl" class="material"></iframe>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import Lib from 'assets/js/Lib';
import gtMaterial from 'components/material/material'
//图片
import imgID1 from '../../../img/ID1_1.png' //身份证正面
import imgID2 from '../../../img/ID2_1.png' //身份证反面
import imgLicense1 from '../../../img/ID3_1.jpg' //营业执照
import imgLicense2 from '../../../img/ID4_1.jpg' //商标注册通知书
import imgLicense3 from '../../../img/ID5_1.png' //商标使用许可合同
import imgLicense4 from '../../../img/ID6_1.jpg'//商标注册证
import imgLicense5 from '../../../img/ID7_1.png'//微信渠道授权证书
import imgLicense6 from '../../../img/ID8.png'//关系认证书


export default {
  components: {
    gtMaterial
  },
  data () {
    var formName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名字不能为空'));
      }else {
          callback();
      }
      
    };
    var formIdNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'));
      } else {
        let id = Lib.M.validIDnumber(value);
        if(!id){
          return callback(new Error('请输入正确合法的身份证号'));
        }else{
          callback();
        }
      }
    };
    var formCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码为空'));
      }else{
        callback();
      }
    };
    var formCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('企业名称不为空'));
      }else{
        callback();
      }
    };
    var formBusLicenseNo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('营业执照号不为空'));
      }else{
        callback();
      }
    };formBusLicenseNo
    var formIDImg1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传身份证正面图片'));
      }else{
        callback();
      }
    };
    var formIDImg2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传身份证反面图片'));
      }else{
        callback();
      }
    };
    var formImgLicense1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传营业执照图片'));
      }else{
        callback();
      }
    };
    var formImgLicense2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传商标注册通知书图片'));
      }else{
        callback();
      }
    };
    var formImgLicense3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传商标使用许可合同图片'));
      }else{
        callback();
      }
    };
    var formImgLicense4 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传商标注册证图片'));
      }else{
        callback();
      }
    };
    var formImgLicense5 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传微信渠道授权证书图片'));
      }else{
        callback();
      }
    };
    var formImgLicense6 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请上传证件图片'));
      }else{
        callback();
      }
    };
    return {
      data:{},//店铺数据
      stoType: 1,//主体类型, 0个人 1企业
      form: {},
      dialogimg:false,
      dialogImageUrl:'',
      shoptypes1:[],
      shoptypes2:[],
      isShow: false,
      isProve: false, // 选择可提供认证消息
      isMapOne:'',// 请选择需要认证的店铺
      isMapTwo:'',// 请选择可提供的认证信息
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
      idCardFront:'',//身份证正面
      idCardBack:'',//身份证反面
      busLicenseImg:'',//营业执照号
      certImgUrls:["","","","","",""],//商标注册通知书,商标注册证，商标使用许可合同，渠道授权书，证明函文件
      docImg:[],//补充资料的图片地址
      rules: {
        name: [
          { validator: formName, trigger: 'blur' }
        ],
        idNumber: [
          { validator: formIdNumber, trigger: 'blur' }
        ],
        code: [
          { validator: formCode, trigger: 'blur' }
        ],
        companyName:[
          { validator: formCompanyName, trigger: 'blur' }
        ],
        busLicenseNo:[
          { validator: formBusLicenseNo, trigger: 'blur' }
        ],
        IDImg1:[
          { validator: formIDImg1, trigger: 'blur' }
        ],
        IDImg2:[
          { validator: formIDImg2, trigger: 'blur' }
        ],
        imgLicense1:[
          { validator: formImgLicense1, trigger: 'blur' }
        ],
        imgLicense2:[
          { validator: formImgLicense2, trigger: 'blur' }
        ],
        imgLicense3:[
          { validator: formImgLicense3, trigger: 'blur' }
        ],
        imgLicense4:[
          { validator: formImgLicense4, trigger: 'blur' }
        ],
        imgLicense5:[
          { validator: formImgLicense5, trigger: 'blur' }
        ],
        imgLicense6:[
          { validator: formImgLicense6, trigger: 'blur' }
        ],
      },
      button1: false,
      button2: false,
      materialvisible: false,
      materialUrl: '',
      square: true,
      materialLargeSrcVisible: false,
      largeSrc: '',
      img:'',
      itemImg:'',
      itemNum:''
    }
  },
  
  methods: {
    /**
      选择店铺类型
      @name:店铺
      @shoptypes:子键内容
     */
    choiceShoptype(index,shoptypes,key){
      this.button1 = index;
      this.button2 = false;
      this.isShow = false;
      this.isMapOne = key;
      this.certImgUrls=["","","","","",""]
      if(!shoptypes){
        this.isProve = false;
        return;
      }
      this.isProve = true;
      this.shoptypes2 = shoptypes;
    },
    /**
     选择认证信息
     */
     choiceProvetype(index,id){
      this.button2 = index;
      this.isShow = true;
      this.isMapTwo = id;
      console.log(this.isMapTwo,'isMapTwo');
    },
    showBigImg(img){
      this.materialLargeSrcVisible=true;
      this.largeSrc = img;
    },
    /**
     * 提交认证
     */
    submitForm(formName) {
      let _this= this; 
      console.log(_this.form,'form');
      console.log(_this.certImgUrls)
      let _data ={
            stoType: _this.stoType,        //主体类型, 0个人 1企业
            stoId: _this.data,            //店铺ID
            name: _this.form.name,        //姓名或法人
            companyName: _this.form.name, //,企业名称
            idNumber: _this.form.idNumber,//身份证号码
            idCardFront: '/image'+ _this.idCardFront.split("image")[1],//身份证正面
            idCardBack: '/image'+_this.idCardBack.split("image")[1],  //身份证反面
            busLicenseImg: '/image'+_this.busLicenseImg.split("image")[1],            //营业执照
            busLicenseNo: '',             //营业执照号
            stoCategory: _this.isMapOne,  //店铺类型
            certType:  _this.isMapTwo,    //认证类型
            certImgUrl: '',               //商标注册通知书,商标注册证，商标使用许可合同，渠道授权书，证明函文件
            isCertDoc: '',                //是否有补充资料  0无 1有
            docImg:''  ,                  //补充资料的图片地址  多个用逗号隔开
            code: ''                      //验证码
          }
          console.log(_data)
    //   _this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //        _this.$message({
    //         message: '恭喜你，保存成功',
    //         type: 'success'
    //         });
    //       _this.jumpRoute('/shop');
    //       let _data ={
    //         stoType: _this.stoType,        //主体类型, 0个人 1企业
    //         stoId: _this.data,            //店铺ID
    //         name: _this.form.name,        //姓名或法人
    //         companyName: _this.form.name, //,企业名称
    //         idNumber: _this.form.idNumber,//身份证号码
    //         idCardFront: _this.idCardFront,//身份证正面
    //         idCardBack: _this.idCardBack,  //身份证反面
    //         busLicenseImg: '',            //营业执照
    //         busLicenseNo: '',             //营业执照号
    //         stoCategory: _this.isMapOne,  //店铺类型
    //         certType:  _this.isMapTwo,    //认证类型
    //         certImgUrl: '',               //商标注册通知书,商标注册证，商标使用许可合同，渠道授权书，证明函文件
    //         isCertDoc: '',                //是否有补充资料  0无 1有
    //         docImg:''  ,                  //补充资料的图片地址  多个用逗号隔开
    //         code: ''                      //验证码
    //       }
    //       console.log(_data)
    //       /*_this.ajaxRequest({
    //         'url': DFshop.activeAPI.mallStoreCertSave_post,
    //         'data': _data,
    //          'success':function (data){
    //              this.$message({
    //              message: '恭喜你，保存成功',
    //              type: 'success'
    //              });
    //             _this.jumpRoute('/shop');
    //         }
    //       });*/
    //     } else {
    //       return false;
    //     }
    //   });
     },
    /**
     * 获取认证的店铺类型
     */
    mallStoreMapAjax(){
      let _this = this;
        _this.ajaxRequest({
        'url': DFshop.activeAPI.mallStoreCertCategoryMap_post,
        'success':function (data){
          console.log(data.data);
          _this.shoptypes1 = data.data
        }
      });
    },
    resetForm(formName) {
      this.form = {};
      this.idCardFront = '';//身份证正面
      this.idCardBack = '' ;//身份证反面
      this.$refs[formName].resetFields();
    },
    materiallayer(item,num) {
        let _this =this;
        let _link = DFshop.activeAPI.materialUrl + window.location.href;
        _this.materialUrl = _link;
        _this.materialvisible = true;
        _this.itemImg = item;
        _this.itemNum = num || '';
    },
    /*
    * 删除图片
    * */
    deleteImg(data,num) {
      let  _this = this;
      _this.itemNum = num || '';
      this.imgUpload(data,_this.itemNum);
    },
    /**
     * 判断图片上传
     * @param 上传图片地址
     */
    imgUpload(obj,num,img){
      console.log(obj,num,img)
      if(obj == 'idCardFront'){
          this.idCardFront = img || '';
      }
      if(obj == 'idCardBack'){
          this.idCardBack = img || '';
      }
      if(obj == 'busLicenseImg'){
        this.busLicenseImg = img || '';
      }
      if( obj == 'certImgUrls'){
        console.log(this.certImgUrls,'index1')
        this.certImgUrls.forEach((item,index)=>{
          if( num == index){
            console.log(this.certImgUrls[index],'index1')
            this.certImgUrls[index] = img ||  '';
            this.itemNum = '';
            console.log(this.certImgUrls,'index2')
          }
        })
        console.log(this.certImgUrls,'index2')
      }
    }
    
  },
  mounted() {
    this.data = JSON.parse(this.$route.query.data);
    console.log(this.data);
    this.mallStoreMapAjax();
    let _this = this,imgUpload;
      window.addEventListener("message", function (e) {
        console.log(e,'aaa');
        const num = e.data.length - 1;
        if (!num) return false;
        var newList = [];
        e.data.substring(6, num).split(',').forEach((item) => {
          newList.push(item.substring(1, (item.length - 1)))
        })
        _this.materialvisible = false;
        if(newList == ""){
          imgUpload = '';
        }else{
           //_this.img = newList[1];
           //imgUpload = '/image'+ _this.img.split("image")[1];
           imgUpload = newList[1];
        }
        _this.imgUpload(_this.itemImg,_this.itemNum,imgUpload);
        console.log(_this.itemImg,_this.itemNum,imgUpload);
      });
  },
}
</script>

<style lang="less">
@import '../../../../../assets/css/mixins.less';
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
